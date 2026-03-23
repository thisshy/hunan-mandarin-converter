"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

let PgPool = null;
try {
  ({ Pool: PgPool } = require("pg"));
} catch (error) {
  PgPool = null;
}

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 8080);
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "change-me-admin-token";
const DATABASE_URL = String(process.env.DATABASE_URL || "").trim();
const STORAGE_MODE = DATABASE_URL ? "postgres" : "file";
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "server", "data");
const CORS_ORIGINS = String(process.env.CORS_ORIGINS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);
const CORS_ALLOW_ALL = CORS_ORIGINS.includes("*");

const ROOT_DIR = __dirname;
const BUNDLED_DEFAULT_LEXICON_FILE = path.join(ROOT_DIR, "server", "data", "default-lexicon.json");
const DEFAULT_LEXICON_FILE = path.join(DATA_DIR, "default-lexicon.json");
const DB_FILE = path.join(DATA_DIR, "db.json");

const STATIC_FILE_MAP = {
  "/": path.join(ROOT_DIR, "index.html"),
  "/index.html": path.join(ROOT_DIR, "index.html"),
  "/style.css": path.join(ROOT_DIR, "style.css"),
  "/app.js": path.join(ROOT_DIR, "app.js"),
  "/config.js": path.join(ROOT_DIR, "config.js")
};

const CONTENT_TYPE = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

let defaultLexicon = {};
let pool = null;
let db = {
  lexicon: {},
  pending: [],
  evaluations: [],
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(text);
}

function parseJsonText(raw) {
  const normalized = String(raw || "").replace(/^\uFEFF/, "").trim();
  if (!normalized) {
    return {};
  }
  return JSON.parse(normalized);
}

function getPostgresPool() {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!PgPool) {
    throw new Error("pg dependency is missing. Run npm install (or ensure Render installs dependencies).");
  }
  if (!pool) {
    pool = new PgPool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

function applyCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (!origin) {
    return { ok: true, origin: "" };
  }

  const allowed = CORS_ALLOW_ALL || CORS_ORIGINS.includes(origin);
  if (!allowed) {
    return { ok: false, origin };
  }

  res.setHeader("Access-Control-Allow-Origin", CORS_ALLOW_ALL ? "*" : origin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,x-admin-token");
  res.setHeader("Vary", "Origin");
  return { ok: true, origin };
}

function clampScore(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 3;
  return Math.min(5, Math.max(1, Math.round(num)));
}

function cleanLexiconObject(input) {
  const cleaned = {};
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return cleaned;
  }

  Object.entries(input).forEach(([key, value]) => {
    const k = String(key || "").trim();
    const v = String(value || "").trim();
    if (k && v) {
      cleaned[k] = v;
    }
  });

  return cleaned;
}

function sortByNewest(items) {
  return [...items].sort((a, b) => {
    const t1 = new Date(a.createdAt || 0).getTime();
    const t2 = new Date(b.createdAt || 0).getTime();
    return t2 - t1;
  });
}

function computeEvaluationStats(records) {
  if (!records.length) {
    return {
      total: 0,
      accuracy: 0,
      naturalness: 0,
      understandability: 0
    };
  }

  const sum = records.reduce(
    (acc, item) => {
      acc.accuracy += Number(item.accuracy || 0);
      acc.naturalness += Number(item.naturalness || 0);
      acc.understandability += Number(item.understandability || 0);
      return acc;
    },
    { accuracy: 0, naturalness: 0, understandability: 0 }
  );

  const total = records.length;
  return {
    total,
    accuracy: Number((sum.accuracy / total).toFixed(2)),
    naturalness: Number((sum.naturalness / total).toFixed(2)),
    understandability: Number((sum.understandability / total).toFixed(2))
  };
}

function applyPendingAction(action) {
  if (action.type === "upsert") {
    db.lexicon[action.mandarin] = action.hunan;
  } else if (action.type === "delete") {
    delete db.lexicon[action.mandarin];
  }
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error("Request body too large"));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error("Invalid JSON payload"));
      }
    });

    req.on("error", (error) => reject(error));
  });
}

function ensureDefaultLexiconFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DEFAULT_LEXICON_FILE)) {
    if (fs.existsSync(BUNDLED_DEFAULT_LEXICON_FILE)) {
      fs.copyFileSync(BUNDLED_DEFAULT_LEXICON_FILE, DEFAULT_LEXICON_FILE);
    } else {
      fs.writeFileSync(DEFAULT_LEXICON_FILE, "{}\n", "utf8");
    }
  }
}

function loadDefaultLexicon() {
  ensureDefaultLexiconFile();

  try {
    const rawDefault = fs.readFileSync(DEFAULT_LEXICON_FILE, "utf8");
    defaultLexicon = cleanLexiconObject(parseJsonText(rawDefault));
    return;
  } catch (error) {
    // fallback to bundled
  }

  try {
    const rawBundled = fs.readFileSync(BUNDLED_DEFAULT_LEXICON_FILE, "utf8");
    defaultLexicon = cleanLexiconObject(parseJsonText(rawBundled));
  } catch (error) {
    defaultLexicon = {};
  }
}

function persistDbToFile() {
  db.metadata.updatedAt = new Date().toISOString();
  const tempFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), "utf8");
  fs.renameSync(tempFile, DB_FILE);
}

function initFileStorage() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(DB_FILE)) {
    db.lexicon = { ...defaultLexicon };
    db.pending = [];
    db.evaluations = [];
    db.metadata = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    persistDbToFile();
    return;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = parseJsonText(raw);
    db.lexicon = cleanLexiconObject(parsed.lexicon);
    db.pending = Array.isArray(parsed.pending) ? parsed.pending : [];
    db.evaluations = Array.isArray(parsed.evaluations) ? parsed.evaluations : [];
    db.metadata = {
      createdAt:
        parsed.metadata && parsed.metadata.createdAt
          ? parsed.metadata.createdAt
          : new Date().toISOString(),
      updatedAt:
        parsed.metadata && parsed.metadata.updatedAt
          ? parsed.metadata.updatedAt
          : new Date().toISOString()
    };
  } catch (error) {
    db.lexicon = { ...defaultLexicon };
    db.pending = [];
    db.evaluations = [];
    db.metadata = {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    persistDbToFile();
  }
}

async function ensurePostgresSchema() {
  const postgres = getPostgresPool();
  await postgres.query(`
    CREATE TABLE IF NOT EXISTS lexicon_entries (
      mandarin TEXT PRIMARY KEY,
      hunan TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await postgres.query(`
    CREATE TABLE IF NOT EXISTS change_requests (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      mandarin TEXT NOT NULL,
      hunan TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL
    );
  `);
  await postgres.query(`
    CREATE TABLE IF NOT EXISTS evaluations (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL,
      mode TEXT NOT NULL,
      dialect TEXT NOT NULL,
      scene TEXT NOT NULL,
      source TEXT NOT NULL,
      output TEXT NOT NULL,
      accuracy INT NOT NULL,
      naturalness INT NOT NULL,
      understandability INT NOT NULL,
      comment TEXT NOT NULL DEFAULT ''
    );
  `);
  await postgres.query(`
    CREATE TABLE IF NOT EXISTS app_meta (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function readDbFromPostgres() {
  const postgres = getPostgresPool();
  const [lexiconRows, pendingRows, evaluationRows, metaRows] = await Promise.all([
    postgres.query("SELECT mandarin, hunan FROM lexicon_entries"),
    postgres.query("SELECT id, type, mandarin, hunan, status, created_at FROM change_requests ORDER BY created_at DESC"),
    postgres.query("SELECT id, created_at, mode, dialect, scene, source, output, accuracy, naturalness, understandability, comment FROM evaluations ORDER BY created_at DESC"),
    postgres.query("SELECT value FROM app_meta WHERE key = 'metadata' LIMIT 1")
  ]);

  const lexicon = {};
  lexiconRows.rows.forEach((row) => {
    lexicon[row.mandarin] = row.hunan;
  });

  const pending = pendingRows.rows.map((row) => ({
    id: row.id,
    type: row.type,
    mandarin: row.mandarin,
    hunan: row.hunan,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString()
  }));

  const evaluations = evaluationRows.rows.map((row) => ({
    id: row.id,
    createdAt: new Date(row.created_at).toISOString(),
    mode: row.mode,
    dialect: row.dialect,
    scene: row.scene,
    source: row.source,
    output: row.output,
    accuracy: Number(row.accuracy),
    naturalness: Number(row.naturalness),
    understandability: Number(row.understandability),
    comment: row.comment || ""
  }));

  let metadata = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (metaRows.rows.length) {
    const value = metaRows.rows[0].value;
    metadata = {
      createdAt: value && value.createdAt ? String(value.createdAt) : metadata.createdAt,
      updatedAt: value && value.updatedAt ? String(value.updatedAt) : metadata.updatedAt
    };
  }

  return {
    lexicon,
    pending,
    evaluations,
    metadata
  };
}

async function persistDbToPostgres() {
  db.metadata.updatedAt = new Date().toISOString();

  const postgres = getPostgresPool();
  const client = await postgres.connect();
  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM lexicon_entries");
    for (const [mandarin, hunan] of Object.entries(db.lexicon)) {
      await client.query(
        "INSERT INTO lexicon_entries (mandarin, hunan, updated_at) VALUES ($1, $2, NOW())",
        [mandarin, hunan]
      );
    }

    await client.query("DELETE FROM change_requests");
    for (const item of db.pending) {
      await client.query(
        "INSERT INTO change_requests (id, type, mandarin, hunan, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
        [item.id, item.type, item.mandarin, item.hunan || "", item.status || "pending", item.createdAt]
      );
    }

    await client.query("DELETE FROM evaluations");
    for (const item of db.evaluations) {
      await client.query(
        "INSERT INTO evaluations (id, created_at, mode, dialect, scene, source, output, accuracy, naturalness, understandability, comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [
          item.id,
          item.createdAt,
          item.mode,
          item.dialect,
          item.scene,
          item.source,
          item.output,
          clampScore(item.accuracy),
          clampScore(item.naturalness),
          clampScore(item.understandability),
          item.comment || ""
        ]
      );
    }

    await client.query(
      "INSERT INTO app_meta (key, value, updated_at) VALUES ('metadata', $1::jsonb, NOW()) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()",
      [JSON.stringify(db.metadata)]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function persistDb() {
  if (STORAGE_MODE === "postgres") {
    await persistDbToPostgres();
  } else {
    persistDbToFile();
  }
}

async function initPostgresStorage() {
  await ensurePostgresSchema();

  const postgres = getPostgresPool();
  const lexiconCount = await postgres.query("SELECT COUNT(*)::int AS count FROM lexicon_entries");

  if (!Number(lexiconCount.rows[0].count)) {
    db = {
      lexicon: { ...defaultLexicon },
      pending: [],
      evaluations: [],
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
    await persistDbToPostgres();
  }

  db = await readDbFromPostgres();
}

async function initStorage() {
  loadDefaultLexicon();
  if (STORAGE_MODE === "postgres") {
    await initPostgresStorage();
  } else {
    initFileStorage();
  }
}

function isAdminAuthorized(req) {
  const token = req.headers["x-admin-token"];
  return typeof token === "string" && token === ADMIN_TOKEN;
}

function requireAdmin(req, res) {
  if (isAdminAuthorized(req)) {
    return true;
  }
  sendJson(res, 401, {
    error: "UNAUTHORIZED",
    message: "Admin token is required for this endpoint."
  });
  return false;
}

function buildChangeRequest(payload) {
  const type = payload.type === "delete" ? "delete" : payload.type === "upsert" ? "upsert" : "";
  const mandarin = String(payload.mandarin || "").trim();
  const hunan = String(payload.hunan || "").trim();

  if (!type) {
    throw new Error("type must be upsert or delete");
  }
  if (!mandarin) {
    throw new Error("mandarin is required");
  }
  if (type === "upsert" && !hunan) {
    throw new Error("hunan is required when type is upsert");
  }

  return {
    id: randomUUID(),
    type,
    mandarin,
    hunan: type === "upsert" ? hunan : "",
    status: "pending",
    createdAt: new Date().toISOString()
  };
}

function handleStatic(pathname, res) {
  if (pathname === "/admin") {
    res.writeHead(302, { Location: "/index.html?admin=1" });
    res.end();
    return;
  }

  const filePath = STATIC_FILE_MAP[pathname];
  if (!filePath) {
    sendText(res, 404, "Not Found");
    return;
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      "Content-Type": CONTENT_TYPE[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  } catch (error) {
    sendText(res, 500, "Failed to load static file");
  }
}

async function handleApi(req, res, pathname, urlObj) {
  if (pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, {
      ok: true,
      storageMode: STORAGE_MODE,
      now: new Date().toISOString(),
      lexiconCount: Object.keys(db.lexicon).length,
      pendingCount: db.pending.length,
      evaluationCount: db.evaluations.length
    });
    return;
  }

  if (pathname === "/api/lexicon" && req.method === "GET") {
    sendJson(res, 200, {
      lexicon: db.lexicon,
      count: Object.keys(db.lexicon).length
    });
    return;
  }

  if (pathname === "/api/change-requests" && req.method === "POST") {
    try {
      const payload = await parseRequestBody(req);
      const record = buildChangeRequest(payload);
      db.pending.unshift(record);
      await persistDb();
      sendJson(res, 201, {
        message: "Submitted for review",
        pendingCount: db.pending.length,
        request: record
      });
    } catch (error) {
      sendJson(res, 400, {
        error: "BAD_REQUEST",
        message: error.message
      });
    }
    return;
  }

  if (pathname === "/api/evaluations" && req.method === "GET") {
    const limitRaw = Number(urlObj.searchParams.get("limit") || 20);
    const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(Math.floor(limitRaw), 1), 500) : 20;
    const records = sortByNewest(db.evaluations).slice(0, limit);
    sendJson(res, 200, {
      records,
      stats: computeEvaluationStats(db.evaluations)
    });
    return;
  }

  if (pathname === "/api/evaluations" && req.method === "POST") {
    try {
      const payload = await parseRequestBody(req);
      const source = String(payload.source || "").trim();
      const output = String(payload.output || "").trim();

      if (!source || !output) {
        throw new Error("source and output are required");
      }

      const record = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        mode: payload.mode === "h2m" ? "h2m" : "m2h",
        dialect: String(payload.dialect || "changsha"),
        scene: String(payload.scene || "daily"),
        source,
        output,
        accuracy: clampScore(payload.accuracy),
        naturalness: clampScore(payload.naturalness),
        understandability: clampScore(payload.understandability),
        comment: String(payload.comment || "").trim()
      };

      db.evaluations.unshift(record);
      if (db.evaluations.length > 2000) {
        db.evaluations = db.evaluations.slice(0, 2000);
      }
      await persistDb();

      sendJson(res, 201, {
        message: "Evaluation saved",
        record,
        stats: computeEvaluationStats(db.evaluations)
      });
    } catch (error) {
      sendJson(res, 400, {
        error: "BAD_REQUEST",
        message: error.message
      });
    }
    return;
  }

  if (pathname.startsWith("/api/admin/")) {
    if (!requireAdmin(req, res)) {
      return;
    }

    if (pathname === "/api/admin/change-requests" && req.method === "GET") {
      const status = urlObj.searchParams.get("status") || "pending";
      const records = status === "all"
        ? sortByNewest(db.pending)
        : sortByNewest(db.pending.filter((r) => r.status === "pending"));
      sendJson(res, 200, {
        records,
        pendingCount: db.pending.filter((r) => r.status === "pending").length
      });
      return;
    }

    if (pathname === "/api/admin/change-requests/approve-all" && req.method === "POST") {
      const toApprove = db.pending.filter((item) => item.status === "pending");
      toApprove.forEach(applyPendingAction);
      db.pending = [];
      await persistDb();
      sendJson(res, 200, {
        message: `Approved ${toApprove.length} request(s)`,
        applied: toApprove.length,
        lexiconCount: Object.keys(db.lexicon).length
      });
      return;
    }

    if (pathname === "/api/admin/change-requests/reject-all" && req.method === "POST") {
      const count = db.pending.filter((item) => item.status === "pending").length;
      db.pending = [];
      await persistDb();
      sendJson(res, 200, {
        message: `Rejected ${count} request(s)`,
        rejected: count
      });
      return;
    }

    const approveMatch = pathname.match(/^\/api\/admin\/change-requests\/([^/]+)\/approve$/);
    if (approveMatch && req.method === "POST") {
      const requestId = approveMatch[1];
      const record = db.pending.find((item) => item.id === requestId);
      if (!record) {
        sendJson(res, 404, {
          error: "NOT_FOUND",
          message: "Change request not found"
        });
        return;
      }
      applyPendingAction(record);
      db.pending = db.pending.filter((item) => item.id !== requestId);
      await persistDb();
      sendJson(res, 200, {
        message: "Approved",
        lexiconCount: Object.keys(db.lexicon).length,
        pendingCount: db.pending.length
      });
      return;
    }

    const rejectMatch = pathname.match(/^\/api\/admin\/change-requests\/([^/]+)\/reject$/);
    if (rejectMatch && req.method === "POST") {
      const requestId = rejectMatch[1];
      const exists = db.pending.some((item) => item.id === requestId);
      if (!exists) {
        sendJson(res, 404, {
          error: "NOT_FOUND",
          message: "Change request not found"
        });
        return;
      }
      db.pending = db.pending.filter((item) => item.id !== requestId);
      await persistDb();
      sendJson(res, 200, {
        message: "Rejected",
        pendingCount: db.pending.length
      });
      return;
    }

    if (pathname === "/api/admin/import" && req.method === "POST") {
      try {
        const payload = await parseRequestBody(req);
        const cleaned = cleanLexiconObject(payload.lexicon);
        if (!Object.keys(cleaned).length) {
          throw new Error("lexicon is empty or invalid");
        }
        db.lexicon = cleaned;
        if (payload.clearPending !== false) {
          db.pending = [];
        }
        await persistDb();
        sendJson(res, 200, {
          message: "Lexicon imported",
          lexiconCount: Object.keys(db.lexicon).length,
          pendingCount: db.pending.length
        });
      } catch (error) {
        sendJson(res, 400, {
          error: "BAD_REQUEST",
          message: error.message
        });
      }
      return;
    }

    if (pathname === "/api/admin/reset-lexicon" && req.method === "POST") {
      db.lexicon = { ...defaultLexicon };
      db.pending = [];
      await persistDb();
      sendJson(res, 200, {
        message: "Lexicon reset to defaults",
        lexiconCount: Object.keys(db.lexicon).length
      });
      return;
    }

    if (pathname === "/api/admin/evaluations" && req.method === "DELETE") {
      db.evaluations = [];
      await persistDb();
      sendJson(res, 200, {
        message: "All evaluations cleared"
      });
      return;
    }

    if (pathname === "/api/admin/export" && req.method === "GET") {
      const payload = JSON.stringify(db, null, 2);
      res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": "attachment; filename=backend-export.json",
        "Cache-Control": "no-store"
      });
      res.end(payload);
      return;
    }

    sendJson(res, 404, {
      error: "NOT_FOUND",
      message: "Unknown admin endpoint"
    });
    return;
  }

  sendJson(res, 404, {
    error: "NOT_FOUND",
    message: "Unknown endpoint"
  });
}

function createAppServer() {
  return http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const pathname = urlObj.pathname;
    const cors = applyCorsHeaders(req, res);

    if (req.method === "OPTIONS") {
      if (!cors.ok) {
        sendJson(res, 403, {
          error: "CORS_FORBIDDEN",
          message: `Origin not allowed: ${cors.origin}`
        });
        return;
      }
      res.writeHead(204, {
        Allow: "GET,POST,DELETE,OPTIONS"
      });
      res.end();
      return;
    }

    try {
      if (pathname.startsWith("/api/")) {
        if (!cors.ok) {
          sendJson(res, 403, {
            error: "CORS_FORBIDDEN",
            message: `Origin not allowed: ${cors.origin}`
          });
          return;
        }
        await handleApi(req, res, pathname, urlObj);
        return;
      }

      handleStatic(pathname, res);
    } catch (error) {
      sendJson(res, 500, {
        error: "INTERNAL_SERVER_ERROR",
        message: error.message
      });
    }
  });
}

async function start() {
  await initStorage();

  const server = createAppServer();
  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Storage mode: ${STORAGE_MODE}`);
    console.log(`Admin token: ${ADMIN_TOKEN}`);
    console.log(
      `CORS origins: ${
        CORS_ALLOW_ALL ? "*" : CORS_ORIGINS.length ? CORS_ORIGINS.join(", ") : "(same-origin only)"
      }`
    );
  });
}

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
