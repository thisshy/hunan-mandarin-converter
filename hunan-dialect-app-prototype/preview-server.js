"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = Number(process.env.PORT || 4173);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT = path.resolve(__dirname, "..");
const FILES = new Set([
  "index.html", "style.css", "app.js", "config.js",
  "assets/design-system.css", "assets/theme.js", "assets/xiang-river.png", "assets/icons.svg",
  "hunan-dialect-app-prototype/index.html", "hunan-dialect-app-prototype/style.css",
  "hunan-dialect-app-prototype/app.js", "hunan-dialect-app-prototype/data/app-data.js",
  "hunan-dialect-app-prototype/data/default-lexicon.js"
]);
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml" };

http.createServer((req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  if (pathname === "/") {
    res.writeHead(302, { Location: "/hunan-dialect-app-prototype/index.html" });
    res.end();
    return;
  }
  const file = pathname.slice(1);
  if (!FILES.has(file)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
    return;
  }
  fs.readFile(path.join(ROOT, file), (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
    res.end(data);
  });
}).listen(PORT, HOST, () => console.log(`App preview: http://${HOST}:${PORT}`));
