function resolveApiBase() {
  const config = window.APP_CONFIG || {};
  const raw = typeof config.API_BASE_URL === "string" ? config.API_BASE_URL.trim() : "";
  if (!raw) return "/api";
  return raw.replace(/\/+$/, "");
}

const API_BASE = resolveApiBase();
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const modeLabel = document.getElementById("modeLabel");
const inputLabel = document.getElementById("inputLabel");
const outputLabel = document.getElementById("outputLabel");
const swapBtn = document.getElementById("swapBtn");
const convertBtn = document.getElementById("convertBtn");
const sampleBtns = document.querySelectorAll(".chip");

const addForm = document.getElementById("addForm");
const mandarinInput = document.getElementById("mandarinInput");
const hunanInput = document.getElementById("hunanInput");
const searchInput = document.getElementById("searchInput");
const entryList = document.getElementById("entryList");
const countInfo = document.getElementById("countInfo");
const exportBtn = document.getElementById("exportBtn");
const importBtn = document.getElementById("importBtn");
const importFile = document.getElementById("importFile");
const resetBtn = document.getElementById("resetBtn");
const pendingList = document.getElementById("pendingList");
const pendingCountInfo = document.getElementById("pendingCountInfo");
const approveAllBtn = document.getElementById("approveAllBtn");
const rejectAllBtn = document.getElementById("rejectAllBtn");
const dialectSelect = document.getElementById("dialectSelect");
const sceneSelect = document.getElementById("sceneSelect");
const candidateList = document.getElementById("candidateList");
const explainBox = document.getElementById("explainBox");
const sceneTip = document.getElementById("sceneTip");
const evaluationForm = document.getElementById("evaluationForm");
const scoreAccuracy = document.getElementById("scoreAccuracy");
const scoreNaturalness = document.getElementById("scoreNaturalness");
const scoreUnderstandability = document.getElementById("scoreUnderstandability");
const evaluationComment = document.getElementById("evaluationComment");
const evaluationStats = document.getElementById("evaluationStats");
const evaluationList = document.getElementById("evaluationList");
const exportEvaluationBtn = document.getElementById("exportEvaluationBtn");
const clearEvaluationBtn = document.getElementById("clearEvaluationBtn");
const pageModeLabel = document.getElementById("pageModeLabel");
const adminToggleLink = document.getElementById("adminToggleLink");
const secondaryAction = document.getElementById("secondaryAction");
const heroTitle = document.getElementById("heroTitle");
const heroDesc = document.getElementById("heroDesc");
const heroSubDesc = document.getElementById("heroSubDesc");
const heroMiddleMetricValue = document.getElementById("heroMiddleMetricValue");
const heroMiddleMetricLabel = document.getElementById("heroMiddleMetricLabel");
const workspaceTitle = document.getElementById("workspaceTitle");
const workspaceDesc = document.getElementById("workspaceDesc");
const workspaceNote = document.getElementById("workspaceNote");
const contributeTitle = document.getElementById("contributeTitle");
const contributeDesc = document.getElementById("contributeDesc");
const contributeNote = document.getElementById("contributeNote");
const submissionHeading = document.getElementById("submissionHeading");
const submissionMeta = document.getElementById("submissionMeta");
const explorerHeading = document.getElementById("explorerHeading");
const qualityTitle = document.getElementById("qualityTitle");
const qualityDesc = document.getElementById("qualityDesc");
const opsTitle = document.getElementById("opsTitle");
const opsDesc = document.getElementById("opsDesc");
const pendingMetric = document.getElementById("pendingMetric");
const datasetFlowText = document.getElementById("datasetFlowText");
const reviewMeta = document.getElementById("reviewMeta");
const maintenanceMeta = document.getElementById("maintenanceMeta");
const adminOnlyBlocks = document.querySelectorAll("[data-admin-only]");
const lexiconStatTargets = document.querySelectorAll('[data-stat="lexicon"]');
const evaluationStatTargets = document.querySelectorAll('[data-stat="evaluations"]');

const DIALECT_STORAGE_KEY = "hunan_dialect_mode_v1";
const SCENE_STORAGE_KEY = "hunan_scene_mode_v1";
const ADMIN_TOKEN_STORAGE_KEY = "hunan_admin_token_v1";

const DIALECT_PROFILES = {
  changsha: {
    name: "长沙口语",
    lexicon: {
      "朋友": "老倌",
      "小孩子": "伢子"
    }
  },
  xiangtan: {
    name: "湘潭口语",
    lexicon: {
      "什么": "么里子",
      "快点": "快点子",
      "朋友": "伙计"
    }
  },
  zhuzhou: {
    name: "株洲口语",
    lexicon: {
      "吃饭": "呷饭",
      "小孩子": "小伢子",
      "厉害": "蛮扎实"
    }
  }
};

const SCENE_PROFILES = {
  daily: {
    name: "日常交流",
    tip: "优先转换日常高频口语表达，适合聊天和家庭沟通。",
    sampleM2H: "例如：你今天去哪里？吃饭了吗？",
    sampleH2M: "例如：你咯今朝克哪凯？恰饭冒得？",
    lexiconM2H: {},
    lexiconH2M: {},
    rulesM2H: [],
    rulesH2M: []
  },
  campus: {
    name: "校园沟通",
    tip: "会优先启用上课、下课、食堂、作业、考试等校园场景词条。",
    sampleM2H: "例如：我们下课后去食堂，然后去图书馆。",
    sampleH2M: "例如：我哒下堂后克堂子，再克图书馆。",
    lexiconM2H: {
      "上课": "上堂",
      "下课": "下堂",
      "食堂": "堂子",
      "作业": "作业",
      "考试": "赶考"
    },
    lexiconH2M: {
      "上堂": "上课",
      "下堂": "下课",
      "堂子": "食堂",
      "赶考": "考试"
    },
    rulesM2H: [
      { name: "校园问候", pattern: /老师您好/g, replacement: "老师好咯" },
      { name: "去上课短句", pattern: /去上课/g, replacement: "克上堂" }
    ],
    rulesH2M: [
      { name: "校园问候回译", pattern: /老师好咯/g, replacement: "老师您好" },
      { name: "去上课短句回译", pattern: /克上堂/g, replacement: "去上课" }
    ]
  },
  travel: {
    name: "文旅问路",
    tip: "会强化问路、景点和交通相关词句，适合游客交流。",
    sampleM2H: "例如：请问橘子洲在哪里？地铁怎么坐？",
    sampleH2M: "例如：请问橘子洲在哪凯？地铁啷个坐？",
    lexiconM2H: {
      "景区": "景点",
      "地铁": "地铁",
      "公交车": "公交",
      "导航": "导航"
    },
    lexiconH2M: {
      "哪凯": "哪里",
      "公交": "公交车"
    },
    rulesM2H: [
      { name: "问路句式", pattern: /请问(.+?)在哪里/g, replacement: "请问$1在哪凯" },
      { name: "路线询问", pattern: /怎么走/g, replacement: "啷个走" }
    ],
    rulesH2M: [
      { name: "问路句式回译", pattern: /在哪凯/g, replacement: "在哪里" },
      { name: "路线询问回译", pattern: /啷个走/g, replacement: "怎么走" }
    ]
  },
  video: {
    name: "短视频文案",
    tip: "会偏向口语化、情绪化表达，适合短视频标题和台词草稿。",
    sampleM2H: "例如：兄弟们点个赞，马上开播！",
    sampleH2M: "例如：兄弟们点个赞咯，立马开播！",
    lexiconM2H: {
      "点赞": "点个赞",
      "评论": "留言",
      "直播": "开播",
      "马上": "立马"
    },
    lexiconH2M: {
      "开播": "直播",
      "留言": "评论"
    },
    rulesM2H: [
      { name: "视频开场", pattern: /大家好/g, replacement: "各位老铁好咯" },
      { name: "互动引导", pattern: /点个赞/g, replacement: "点个赞咯" }
    ],
    rulesH2M: [
      { name: "视频开场回译", pattern: /各位老铁好咯/g, replacement: "大家好" },
      { name: "互动引导回译", pattern: /点个赞咯/g, replacement: "点个赞" }
    ]
  }
};

const COMMON_RULES = {
  m2h: [
    { name: "高频句式-你在干什么", pattern: /你在干(嘛|吗|什么)/g, replacement: "你在搞么子" },
    { name: "高频句式-怎么办", pattern: /怎么办/g, replacement: "啷个搞" },
    { name: "高频句式-真的假的", pattern: /真的假的/g, replacement: "港真啵" },
    { name: "高频句式-别着急", pattern: /别着急/g, replacement: "莫急莫慌" },
    { name: "高频句式-快一点", pattern: /快一点/g, replacement: "搞快点" },
    { name: "高频句式-没关系", pattern: /没关系/g, replacement: "冒关系" }
  ],
  h2m: [
    { name: "高频句式回译-搞么子", pattern: /你在搞么子/g, replacement: "你在干什么" },
    { name: "高频句式回译-啷个搞", pattern: /啷个搞/g, replacement: "怎么办" },
    { name: "高频句式回译-港真啵", pattern: /港真啵/g, replacement: "真的假的" },
    { name: "高频句式回译-莫急莫慌", pattern: /莫急莫慌/g, replacement: "别着急" },
    { name: "高频句式回译-搞快点", pattern: /搞快点/g, replacement: "快一点" },
    { name: "高频句式回译-冒关系", pattern: /冒关系/g, replacement: "没关系" }
  ]
};

const query = new URLSearchParams(window.location.search);
const IS_ADMIN_MODE = query.get("admin") === "1";

const EXPERIENCE_COPY = {
  public: {
    pageModeLabel: "公众模式",
    toggleHref: "?admin=1",
    toggleText: "进入后台审核",
    heroTitle: "湘言通",
    heroDesc: "湖南方言开放数据库与普通话互转平台",
    heroSubDesc: "",
    secondaryAction: "上传方言词条",
    secondaryActionHref: "#lexiconSection",
    workspaceTitle: "即时转换实验区",
    workspaceDesc: "",
    workspaceNote: "当前优先支持三种方言试点，并按日常交流、校园沟通、文旅问路和短视频文案组织词条与句式。",
    contributeTitle: "开放数据库入口与词库面板",
    contributeDesc: "",
    contributeNote: "管理员模式下，这里会展开审核队列、导入导出和词库维护能力，方便把数据工作流真正做起来。",
    submissionHeading: "词条上传入口",
    submissionMeta: "每次提交都会进入审核流程。",
    explorerHeading: "开放数据库浏览",
    qualityTitle: "转换效果评测记录",
    qualityDesc: "",
    datasetFlowText: "",
    reviewMeta: "管理员审核通过后，词条会写入公开数据库并用于后续转换与共享。",
    maintenanceMeta: "",
    opsTitle: "把数据工作流真正做成长期资产",
    opsDesc: "公开用户带来真实表达，管理员负责校准与发布，评测结果又会反过来帮助规则优化，三者共同推动平台质量不断提升。"
  },
  admin: {
    pageModeLabel: "后台审核模式",
    toggleHref: "./",
    toggleText: "返回公众视图",
    heroTitle: "湘言通",
    heroDesc: "后台审核与词库工作台",
    heroSubDesc: "",
    secondaryAction: "查看审核队列",
    secondaryActionHref: "#pendingList",
    workspaceTitle: "转换规则校验区",
    workspaceDesc: "",
    workspaceNote: "当前后台管理围绕三种方言试点展开，并统一处理上传、审核、发布与评测回看。",
    contributeTitle: "审核队列与开放词库维护",
    contributeDesc: "",
    contributeNote: "管理员模式优先突出数据处理与审核流，而不是单纯的公开展示。",
    submissionHeading: "快速录入或补充词条",
    submissionMeta: "录入内容同样走审核流程，便于保留发布轨迹。",
    explorerHeading: "已发布词库浏览与维护",
    qualityTitle: "质量回看与评测数据",
    qualityDesc: "",
    datasetFlowText: "",
    reviewMeta: "这里优先处理待审核上传内容，审核通过后将即时写入公开数据库。",
    maintenanceMeta: "",
    opsTitle: "后台把开放平台的可信度维护起来",
    opsDesc: "管理员负责审核、发布和回看质量，使公开数据库既保持开放，也保持可用与可共享。"
  }
};

let lexicon = {};
let mode = "m2h";
let pendingQueue = [];
let evaluations = [];
let selectedDialect = loadPreference(DIALECT_STORAGE_KEY, "changsha");
let selectedScene = loadPreference(SCENE_STORAGE_KEY, "daily");
let currentCandidates = [];
const pinyinCache = new Map();

if (!DIALECT_PROFILES[selectedDialect]) {
  selectedDialect = "changsha";
}
if (!SCENE_PROFILES[selectedScene]) {
  selectedScene = "daily";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadPreference(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw || fallback;
  } catch (error) {
    return fallback;
  }
}

function savePreference(key, value) {
  localStorage.setItem(key, value);
}

function getAdminToken() {
  try {
    return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) || "";
  } catch (error) {
    return "";
  }
}

function setAdminToken(token) {
  try {
    localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
  } catch (error) {
    // no-op
  }
}

function promptAdminToken(message) {
  const next = window.prompt(message || "请输入管理员令牌：", getAdminToken());
  if (!next) return "";
  const trimmed = next.trim();
  if (!trimmed) return "";
  setAdminToken(trimmed);
  return trimmed;
}

function hideElement(target) {
  if (target) {
    target.hidden = true;
  }
}

function showElement(target) {
  if (target) {
    target.hidden = false;
  }
}

function setText(target, value) {
  if (!target) return;
  const next = typeof value === "string" ? value : "";
  target.textContent = next;
  target.hidden = next.trim().length === 0;
}

function setGroupText(targets, value) {
  targets.forEach((target) => {
    target.textContent = value;
  });
}

function applyModeCopy() {
  const copy = IS_ADMIN_MODE ? EXPERIENCE_COPY.admin : EXPERIENCE_COPY.public;
  setText(pageModeLabel, copy.pageModeLabel);
  setText(heroTitle, copy.heroTitle);
  setText(heroDesc, copy.heroDesc);
  setText(heroSubDesc, copy.heroSubDesc);
  setText(workspaceTitle, copy.workspaceTitle);
  setText(workspaceDesc, copy.workspaceDesc);
  setText(workspaceNote, copy.workspaceNote);
  setText(contributeTitle, copy.contributeTitle);
  setText(contributeDesc, copy.contributeDesc);
  setText(contributeNote, copy.contributeNote);
  setText(submissionHeading, copy.submissionHeading);
  setText(submissionMeta, copy.submissionMeta);
  setText(explorerHeading, copy.explorerHeading);
  setText(qualityTitle, copy.qualityTitle);
  setText(qualityDesc, copy.qualityDesc);
  setText(opsTitle, copy.opsTitle);
  setText(opsDesc, copy.opsDesc);
  setText(datasetFlowText, copy.datasetFlowText);
  setText(reviewMeta, copy.reviewMeta);
  setText(maintenanceMeta, copy.maintenanceMeta);

  if (adminToggleLink) {
    adminToggleLink.href = copy.toggleHref;
    adminToggleLink.textContent = copy.toggleText;
  }

  if (secondaryAction) {
    secondaryAction.textContent = copy.secondaryAction;
    secondaryAction.setAttribute("href", copy.secondaryActionHref || "#lexiconSection");
  }
}

function renderPlatformMetrics() {
  const lexiconTotal = Object.keys(lexicon).length;
  const evaluationTotal = evaluations.length;
  setGroupText(lexiconStatTargets, String(lexiconTotal));
  setGroupText(evaluationStatTargets, String(evaluationTotal));
  if (IS_ADMIN_MODE) {
    setText(heroMiddleMetricValue, String(pendingQueue.length));
    setText(heroMiddleMetricLabel, "待审核词条");
    setText(pendingMetric, `待审核 ${pendingQueue.length} 条`);
  } else {
    setText(heroMiddleMetricValue, "3");
    setText(heroMiddleMetricLabel, "方言试点");
    setText(pendingMetric, "专业审核中");
  }
}

function applyAccessUi() {
  document.body.classList.toggle("is-admin", IS_ADMIN_MODE);
  adminOnlyBlocks.forEach((block) => {
    if (IS_ADMIN_MODE) {
      showElement(block);
    } else {
      hideElement(block);
    }
  });

  if (!IS_ADMIN_MODE) {
    hideElement(exportBtn);
    hideElement(importBtn);
    hideElement(resetBtn);
    hideElement(approveAllBtn);
    hideElement(rejectAllBtn);
    hideElement(clearEvaluationBtn);
  } else {
    showElement(exportBtn);
    showElement(importBtn);
    showElement(resetBtn);
    showElement(approveAllBtn);
    showElement(rejectAllBtn);
    showElement(clearEvaluationBtn);
    if (!getAdminToken()) {
      promptAdminToken("进入后台模式，请输入管理员令牌：");
    }
  }

  applyModeCopy();
  renderPlatformMetrics();
}

async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    body,
    admin = false,
    retryOnAuth = true
  } = options;

  const headers = {};
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (admin) {
    const token = getAdminToken();
    if (token) {
      headers["x-admin-token"] = token;
    }
  }

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
  } catch (error) {
    const runningFromFile = window.location.protocol === "file:";
    const runningOnGithubPages = window.location.hostname.endsWith("github.io");
    const relativeApiBase = API_BASE.startsWith("/");
    const hint = runningFromFile
      ? "检测到你正在用 file:// 直接打开页面。请先在项目目录运行 npm start，然后通过 http://127.0.0.1:8080 打开。"
      : runningOnGithubPages && relativeApiBase
        ? "当前在 GitHub Pages 上运行，但 API_BASE_URL 仍是相对路径。请在 config.js 中把 API_BASE_URL 改为你的线上后端地址（例如 https://your-backend.example.com/api）。"
        : "后端接口不可达。请确认后端服务已启动且 API_BASE_URL 配置正确。";
    throw new Error(`无法连接后端接口 ${API_BASE}${path}。${hint}`);
  }

  const raw = await response.text();
  let data = {};
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch (error) {
      data = { message: raw };
    }
  }

  if (admin && response.status === 401 && retryOnAuth && IS_ADMIN_MODE) {
    const token = promptAdminToken("管理员令牌无效，请重新输入：");
    if (token) {
      return apiRequest(path, {
        method,
        body,
        admin,
        retryOnAuth: false
      });
    }
  }

  if (!response.ok) {
    throw new Error(data.message || `请求失败：${response.status}`);
  }

  return data;
}

function getDialectProfile() {
  return DIALECT_PROFILES[selectedDialect] || DIALECT_PROFILES.changsha;
}

function getSceneProfile() {
  return SCENE_PROFILES[selectedScene] || SCENE_PROFILES.daily;
}

function createReverseMap(source) {
  const result = {};
  Object.entries(source).forEach(([mandarin, hunan]) => {
    result[hunan] = mandarin;
  });
  return result;
}

function getActiveForwardLexicon() {
  const dialectLexicon = getDialectProfile().lexicon || {};
  const sceneLexicon = getSceneProfile().lexiconM2H || {};
  return {
    ...lexicon,
    ...dialectLexicon,
    ...sceneLexicon
  };
}

function getActiveReverseLexicon() {
  const forward = getActiveForwardLexicon();
  return {
    ...createReverseMap(forward),
    ...(getSceneProfile().lexiconH2M || {})
  };
}

function isChineseText(text) {
  return /[\u4e00-\u9fff]/.test(text);
}

function getPinyinNormalized(text) {
  if (!text) return "";
  if (pinyinCache.has(text)) return pinyinCache.get(text);
  if (typeof window.pinyinPro === "undefined") return "";

  const array = window.pinyinPro.pinyin(text, {
    toneType: "none",
    type: "array",
    nonZh: "consecutive"
  });

  const normalized = array
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  pinyinCache.set(text, normalized);
  return normalized;
}

function normalizeSyllable(syllable) {
  return syllable
    .replace(/^zh/, "z")
    .replace(/^ch/, "c")
    .replace(/^sh/, "s")
    .replace(/ing$/g, "in")
    .replace(/eng$/g, "en");
}

function levenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i += 1) dp[i][0] = i;
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

function isPinyinNear(aPinyin, bPinyin) {
  if (!aPinyin || !bPinyin) return false;
  if (aPinyin === bPinyin) return true;

  const aList = aPinyin.split(" ");
  const bList = bPinyin.split(" ");
  if (aList.length !== bList.length) return false;

  let diffCount = 0;
  for (let i = 0; i < aList.length; i += 1) {
    const aSyl = normalizeSyllable(aList[i]);
    const bSyl = normalizeSyllable(bList[i]);
    if (aSyl === bSyl) continue;

    const dist = levenshteinDistance(aSyl, bSyl);
    if (dist > 1) return false;

    diffCount += 1;
    if (diffCount > 1) return false;
  }

  return true;
}

function buildEntries(dictionary) {
  return Object.keys(dictionary)
    .sort((a, b) => b.length - a.length)
    .map((key) => ({
      key,
      value: dictionary[key],
      length: key.length,
      pinyin: getPinyinNormalized(key)
    }));
}

function applyRulesWithTrace(text, rules) {
  let output = text;
  const traces = [];

  rules.forEach((rule) => {
    let hitCount = 0;
    output = output.replace(rule.pattern, (...args) => {
      hitCount += 1;
      return typeof rule.replacement === "function"
        ? rule.replacement(...args)
        : rule.replacement;
    });

    if (hitCount > 0) {
      traces.push(`${rule.name}×${hitCount}`);
    }
  });

  return {
    text: output,
    traces
  };
}

function replaceByDictionaryWithPinyinFallbackDetailed(text, dictionary, options = {}) {
  const { usePinyin = true } = options;
  const entries = buildEntries(dictionary);
  let index = 0;
  let output = "";
  let exactHits = 0;
  let pinyinHits = 0;

  while (index < text.length) {
    let matched = false;

    for (const entry of entries) {
      const segment = text.slice(index, index + entry.length);
      if (segment.length !== entry.length) continue;

      if (segment === entry.key) {
        output += entry.value;
        index += entry.length;
        exactHits += 1;
        matched = true;
        break;
      }

      if (!usePinyin || !entry.pinyin || !isChineseText(segment)) continue;
      const segmentPinyin = getPinyinNormalized(segment);
      if (segmentPinyin && isPinyinNear(segmentPinyin, entry.pinyin)) {
        output += entry.value;
        index += entry.length;
        pinyinHits += 1;
        matched = true;
        break;
      }
    }

    if (!matched) {
      output += text[index];
      index += 1;
    }
  }

  return {
    text: output,
    exactHits,
    pinyinHits
  };
}

function uniqueCandidates(candidates) {
  const seen = new Set();
  return candidates.filter((item) => {
    const normalized = item.text.trim();
    if (!normalized || seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

function buildCandidateResults(source) {
  const scene = getSceneProfile();
  const dialect = getDialectProfile();
  const commonRules = mode === "m2h" ? COMMON_RULES.m2h : COMMON_RULES.h2m;
  const sceneRules = mode === "m2h" ? scene.rulesM2H : scene.rulesH2M;
  const allRules = [...commonRules, ...sceneRules];

  if (mode === "m2h") {
    const primaryRuleResult = applyRulesWithTrace(source, allRules);
    const primary = replaceByDictionaryWithPinyinFallbackDetailed(
      primaryRuleResult.text,
      getActiveForwardLexicon(),
      { usePinyin: true }
    );
    const strict = replaceByDictionaryWithPinyinFallbackDetailed(
      primaryRuleResult.text,
      getActiveForwardLexicon(),
      { usePinyin: false }
    );
    const baseRuleResult = applyRulesWithTrace(source, commonRules);
    const base = replaceByDictionaryWithPinyinFallbackDetailed(baseRuleResult.text, lexicon, {
      usePinyin: true
    });

    return {
      primary: primary.text,
      candidates: uniqueCandidates([
        { name: "主推荐（场景+容错）", text: primary.text },
        { name: "严格映射（无拼音容错）", text: strict.text },
        { name: "通用口语版（基础词库）", text: base.text }
      ]),
      meta: {
        dialect: dialect.name,
        scene: scene.name,
        exactHits: primary.exactHits,
        pinyinHits: primary.pinyinHits,
        ruleHits: primaryRuleResult.traces
      }
    };
  }

  const activeReverseLexicon = getActiveReverseLexicon();
  const baseReverseLexicon = createReverseMap(lexicon);
  const primaryRuleResult = applyRulesWithTrace(source, allRules);
  const primary = replaceByDictionaryWithPinyinFallbackDetailed(
    primaryRuleResult.text,
    activeReverseLexicon,
    { usePinyin: true }
  );
  const strict = replaceByDictionaryWithPinyinFallbackDetailed(
    primaryRuleResult.text,
    activeReverseLexicon,
    { usePinyin: false }
  );
  const baseRuleResult = applyRulesWithTrace(source, commonRules);
  const base = replaceByDictionaryWithPinyinFallbackDetailed(baseRuleResult.text, baseReverseLexicon, {
    usePinyin: true
  });

  return {
    primary: primary.text,
    candidates: uniqueCandidates([
      { name: "主推荐（场景+容错）", text: primary.text },
      { name: "严格映射（无拼音容错）", text: strict.text },
      { name: "通用回译版（基础词库）", text: base.text }
    ]),
    meta: {
      dialect: dialect.name,
      scene: scene.name,
      exactHits: primary.exactHits,
      pinyinHits: primary.pinyinHits,
      ruleHits: primaryRuleResult.traces
    }
  };
}

function renderCandidateList(candidates) {
  if (!candidateList) return;
  currentCandidates = candidates;

  if (!candidates.length) {
    candidateList.innerHTML = `<div class="candidate-empty">暂无候选表达。</div>`;
    return;
  }

  candidateList.innerHTML = candidates
    .map((item, index) => `
      <div class="candidate-row">
        <span class="candidate-rank">#${index + 1}</span>
        <span class="candidate-text">${escapeHtml(item.name)}：${escapeHtml(item.text)}</span>
        <button class="candidate-apply" type="button" data-index="${index}">使用</button>
      </div>
    `)
    .join("");
}

function renderExplain(meta) {
  if (!explainBox) return;
  const ruleText = meta.ruleHits.length ? meta.ruleHits.join("、") : "无";
  explainBox.innerHTML = `
    <div>当前方向：${mode === "m2h" ? "普通话 → 方言" : "方言 → 普通话"}</div>
    <div>方言子区域：${escapeHtml(meta.dialect)}｜场景：${escapeHtml(meta.scene)}</div>
    <div>精确命中：${meta.exactHits} 次｜拼音容错命中：${meta.pinyinHits} 次</div>
    <div>规则命中：${escapeHtml(ruleText)}</div>
  `;
}

function convert() {
  const source = inputText.value.trim();
  if (!source) {
    outputText.value = "";
    renderCandidateList([]);
    if (explainBox) {
      explainBox.textContent = "输入后显示转换依据。";
    }
    return;
  }

  const result = buildCandidateResults(source);
  outputText.value = result.primary;
  renderCandidateList(result.candidates);
  renderExplain(result.meta);
}

function syncLabels() {
  const dialectName = getDialectProfile().name;
  const scene = getSceneProfile();

  if (mode === "m2h") {
    modeLabel.textContent = `普通话 → ${dialectName}`;
    inputLabel.textContent = "输入（普通话）";
    outputLabel.textContent = `输出（${dialectName}）`;
    inputText.placeholder = scene.sampleM2H;
  } else {
    modeLabel.textContent = `${dialectName} → 普通话`;
    inputLabel.textContent = `输入（${dialectName}）`;
    outputLabel.textContent = "输出（普通话）";
    inputText.placeholder = scene.sampleH2M;
  }
}

function syncContextState() {
  const scene = getSceneProfile();
  if (dialectSelect) dialectSelect.value = selectedDialect;
  if (sceneSelect) sceneSelect.value = selectedScene;
  if (sceneTip) {
    sceneTip.textContent = `当前场景：${scene.name}`;
  }
}

function getFilteredEntries() {
  const keyword = searchInput.value.trim();
  const entries = Object.entries(lexicon).sort((a, b) => a[0].localeCompare(b[0], "zh-CN"));
  if (!keyword) return entries;
  return entries.filter(([mandarin, hunan]) => mandarin.includes(keyword) || hunan.includes(keyword));
}

function renderEntries() {
  const entries = getFilteredEntries();
  countInfo.textContent = `词条数量：${Object.keys(lexicon).length}`;

  if (!entries.length) {
    entryList.innerHTML = `<div class="entry-empty">没有匹配词条。你可以继续搜索，或在左侧提交一条新表达。</div>`;
    return;
  }

  entryList.innerHTML = entries
    .map(([mandarin, hunan]) => {
      const deleteButton = IS_ADMIN_MODE
        ? `<button class="entry-delete" type="button" data-key="${encodeURIComponent(mandarin)}">提交删除审核</button>`
        : "";
      return `
        <div class="entry-row">
          <span>${escapeHtml(mandarin)}</span>
          <span>${escapeHtml(hunan)}</span>
          ${deleteButton}
        </div>
      `;
    })
    .join("");
}

function renderPendingQueue() {
  if (!pendingList || !pendingCountInfo) return;

  if (!IS_ADMIN_MODE) {
    pendingCountInfo.textContent = "待审核：仅后台可见";
    pendingList.innerHTML = "";
    renderPlatformMetrics();
    return;
  }

  pendingCountInfo.textContent = `待审核：${pendingQueue.length}`;
  renderPlatformMetrics();

  if (!pendingQueue.length) {
    pendingList.innerHTML = `<div class="pending-empty">暂无待审核变更。</div>`;
    return;
  }

  pendingList.innerHTML = pendingQueue
    .map((item) => {
      const tag = item.type === "delete" ? "删除" : "新增/修改";
      const rightText = item.type === "delete" ? "-" : item.hunan;
      return `
        <div class="pending-row">
          <span class="pending-tag">${tag}</span>
          <span>${escapeHtml(item.mandarin)}</span>
          <span>${escapeHtml(rightText)}</span>
          <button class="pending-approve" type="button" data-action="approve" data-id="${item.id}">通过</button>
          <button class="pending-reject" type="button" data-action="reject" data-id="${item.id}">驳回</button>
        </div>
      `;
    })
    .join("");
}

function clampScore(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 3;
  return Math.min(5, Math.max(1, Math.round(parsed)));
}

function formatTime(isoString) {
  try {
    return new Date(isoString).toLocaleString("zh-CN", { hour12: false });
  } catch (error) {
    return isoString;
  }
}

function renderEvaluationStats() {
  if (!evaluationStats) return;

  if (!evaluations.length) {
    evaluationStats.textContent = "暂无评测记录";
    renderPlatformMetrics();
    return;
  }

  const total = evaluations.length;
  const sum = evaluations.reduce(
    (acc, item) => {
      acc.accuracy += Number(item.accuracy || 0);
      acc.naturalness += Number(item.naturalness || 0);
      acc.understandability += Number(item.understandability || 0);
      return acc;
    },
    { accuracy: 0, naturalness: 0, understandability: 0 }
  );

  evaluationStats.textContent =
    `共${total}条评测｜准确性 ${(sum.accuracy / total).toFixed(2)}｜自然度 ${(sum.naturalness / total).toFixed(2)}｜可理解性 ${(sum.understandability / total).toFixed(2)}`;
  renderPlatformMetrics();
}

function renderEvaluationList() {
  if (!evaluationList) return;

  if (!evaluations.length) {
    evaluationList.innerHTML = `<div class="entry-empty">暂无历史评测。</div>`;
    return;
  }

  evaluationList.innerHTML = evaluations
    .slice(0, 20)
    .map((item) => {
      const dialectName = DIALECT_PROFILES[item.dialect]
        ? DIALECT_PROFILES[item.dialect].name
        : item.dialect;
      const sceneName = SCENE_PROFILES[item.scene]
        ? SCENE_PROFILES[item.scene].name
        : item.scene;
      const comment = item.comment ? `备注：${escapeHtml(item.comment)}` : "备注：无";
      return `
        <div class="evaluation-row">
          <div class="evaluation-meta">${escapeHtml(formatTime(item.createdAt))}｜${item.mode === "m2h" ? "普通话→方言" : "方言→普通话"}｜${escapeHtml(dialectName)}｜${escapeHtml(sceneName)}</div>
          <div class="evaluation-score">准确性 ${item.accuracy} / 自然度 ${item.naturalness} / 可理解性 ${item.understandability}</div>
          <div class="evaluation-comment-text">${comment}</div>
        </div>
      `;
    })
    .join("");
}

function downloadJson(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function refreshLexicon() {
  const data = await apiRequest("/lexicon");
  lexicon = data.lexicon && typeof data.lexicon === "object" ? data.lexicon : {};
  renderEntries();
  renderPlatformMetrics();
  convert();
}

async function refreshPendingQueue() {
  if (!IS_ADMIN_MODE) {
    pendingQueue = [];
    renderPendingQueue();
    renderPlatformMetrics();
    return;
  }

  const data = await apiRequest("/admin/change-requests?status=pending", { admin: true });
  pendingQueue = Array.isArray(data.records) ? data.records : [];
  renderPendingQueue();
  renderPlatformMetrics();
}

async function refreshEvaluations() {
  const data = await apiRequest("/evaluations?limit=200");
  evaluations = Array.isArray(data.records) ? data.records : [];
  renderEvaluationStats();
  renderEvaluationList();
  renderPlatformMetrics();
}

async function addOrUpdateEntry(event) {
  event.preventDefault();

  const mandarin = mandarinInput.value.trim();
  const hunan = hunanInput.value.trim();
  if (!mandarin || !hunan) return;

  await apiRequest("/change-requests", {
    method: "POST",
    body: {
      type: "upsert",
      mandarin,
      hunan
    }
  });

  mandarinInput.value = "";
  hunanInput.value = "";
  mandarinInput.focus();

  if (IS_ADMIN_MODE) {
    await refreshPendingQueue();
  }

  alert("已提交到开放数据库审核队列。审核通过后会自动生效。");
}

async function removeEntry(event) {
  const button = event.target.closest(".entry-delete");
  if (!button) return;

  const key = decodeURIComponent(button.dataset.key || "");
  if (!key || !lexicon[key]) return;

  await apiRequest("/change-requests", {
    method: "POST",
    body: {
      type: "delete",
      mandarin: key
    }
  });

  await refreshPendingQueue();
  alert("删除申请已提交到审核队列。");
}

async function approveAction(actionId) {
  if (!actionId) return;
  await apiRequest(`/admin/change-requests/${encodeURIComponent(actionId)}/approve`, {
    method: "POST",
    admin: true
  });
  await Promise.all([refreshPendingQueue(), refreshLexicon()]);
}

async function rejectAction(actionId) {
  if (!actionId) return;
  await apiRequest(`/admin/change-requests/${encodeURIComponent(actionId)}/reject`, {
    method: "POST",
    admin: true
  });
  await refreshPendingQueue();
}

async function approveAllActions() {
  await apiRequest("/admin/change-requests/approve-all", {
    method: "POST",
    admin: true
  });
  await Promise.all([refreshPendingQueue(), refreshLexicon()]);
}

async function rejectAllActions() {
  await apiRequest("/admin/change-requests/reject-all", {
    method: "POST",
    admin: true
  });
  await refreshPendingQueue();
}

async function exportLexicon() {
  const data = await apiRequest("/admin/export", { admin: true });
  const exported = data.lexicon && typeof data.lexicon === "object" ? data.lexicon : {};
  downloadJson(exported, "hunan-lexicon.json");
}

async function importLexiconFromFile(file) {
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      const data = parsed.lexicon && typeof parsed.lexicon === "object" ? parsed.lexicon : parsed;
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new Error("JSON 结构不正确");
      }

      await apiRequest("/admin/import", {
        method: "POST",
        admin: true,
        body: {
          lexicon: data,
          clearPending: true
        }
      });

      await Promise.all([refreshLexicon(), refreshPendingQueue()]);
      alert("后端词库导入成功。");
    } catch (error) {
      alert(`导入失败：${error.message}`);
    } finally {
      importFile.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

async function resetLexicon() {
  const ok = window.confirm("确定恢复后端默认词库吗？这会清空待审核队列。");
  if (!ok) return;

  await apiRequest("/admin/reset-lexicon", {
    method: "POST",
    admin: true
  });
  await Promise.all([refreshLexicon(), refreshPendingQueue()]);
}

async function saveEvaluation(event) {
  event.preventDefault();

  const source = inputText.value.trim();
  const output = outputText.value.trim();

  if (!source || !output) {
    alert("请先输入并完成一次转换，再保存评测。");
    return;
  }

  await apiRequest("/evaluations", {
    method: "POST",
    body: {
      mode,
      dialect: selectedDialect,
      scene: selectedScene,
      source,
      output,
      accuracy: clampScore(scoreAccuracy.value),
      naturalness: clampScore(scoreNaturalness.value),
      understandability: clampScore(scoreUnderstandability.value),
      comment: evaluationComment.value.trim()
    }
  });

  evaluationComment.value = "";
  await refreshEvaluations();
}

function exportEvaluations() {
  downloadJson(evaluations, "hunan-evaluation-records.json");
}

async function clearEvaluations() {
  if (!IS_ADMIN_MODE) return;

  const ok = window.confirm("确定清空全部评测记录吗？此操作不可撤销。");
  if (!ok) return;

  await apiRequest("/admin/evaluations", {
    method: "DELETE",
    admin: true
  });
  await refreshEvaluations();
}

function onAsyncError(error) {
  const message = error && error.message ? error.message : String(error);
  alert(`操作失败：${message}`);
}

swapBtn.addEventListener("click", () => {
  mode = mode === "m2h" ? "h2m" : "m2h";
  inputText.value = "";
  outputText.value = "";
  renderCandidateList([]);
  syncLabels();
  convert();
});

convertBtn.addEventListener("click", convert);
inputText.addEventListener("input", convert);

sampleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    inputText.value = btn.dataset.text || "";
    convert();
  });
});

addForm.addEventListener("submit", (event) => {
  addOrUpdateEntry(event).catch(onAsyncError);
});

entryList.addEventListener("click", (event) => {
  removeEntry(event).catch(onAsyncError);
});

pendingList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const actionId = button.dataset.id;

  if (action === "approve") {
    approveAction(actionId).catch(onAsyncError);
  }

  if (action === "reject") {
    rejectAction(actionId).catch(onAsyncError);
  }
});

searchInput.addEventListener("input", renderEntries);

exportBtn.addEventListener("click", () => {
  exportLexicon().catch(onAsyncError);
});

importBtn.addEventListener("click", () => importFile.click());

importFile.addEventListener("change", () => {
  const file = importFile.files && importFile.files[0];
  if (file) {
    importLexiconFromFile(file).catch(onAsyncError);
  }
});

resetBtn.addEventListener("click", () => {
  resetLexicon().catch(onAsyncError);
});

approveAllBtn.addEventListener("click", () => {
  approveAllActions().catch(onAsyncError);
});

rejectAllBtn.addEventListener("click", () => {
  rejectAllActions().catch(onAsyncError);
});

if (dialectSelect) {
  dialectSelect.addEventListener("change", () => {
    selectedDialect = dialectSelect.value;
    savePreference(DIALECT_STORAGE_KEY, selectedDialect);
    syncLabels();
    syncContextState();
    convert();
  });
}

if (sceneSelect) {
  sceneSelect.addEventListener("change", () => {
    selectedScene = sceneSelect.value;
    savePreference(SCENE_STORAGE_KEY, selectedScene);
    syncLabels();
    syncContextState();
    convert();
  });
}

if (candidateList) {
  candidateList.addEventListener("click", (event) => {
    const button = event.target.closest(".candidate-apply");
    if (!button) return;
    const index = Number(button.dataset.index);
    if (!Number.isInteger(index) || !currentCandidates[index]) return;
    outputText.value = currentCandidates[index].text;
  });
}

if (evaluationForm) {
  evaluationForm.addEventListener("submit", (event) => {
    saveEvaluation(event).catch(onAsyncError);
  });
}

if (exportEvaluationBtn) {
  exportEvaluationBtn.addEventListener("click", exportEvaluations);
}

if (clearEvaluationBtn) {
  clearEvaluationBtn.addEventListener("click", () => {
    clearEvaluations().catch(onAsyncError);
  });
}

async function bootstrap() {
  if (window.location.protocol === "file:") {
    alert("当前是 file:// 打开方式，无法连接后端 API。请先运行 npm start，然后访问 http://127.0.0.1:8080 。");
    return;
  }

  applyAccessUi();
  syncLabels();
  syncContextState();
  renderPendingQueue();
  renderEntries();
  renderEvaluationStats();
  renderEvaluationList();
  renderCandidateList([]);
  renderPlatformMetrics();

  await refreshLexicon();
  await refreshEvaluations();
  if (IS_ADMIN_MODE) {
    await refreshPendingQueue();
  }
}

bootstrap().catch((error) => {
  onAsyncError(error);
});
