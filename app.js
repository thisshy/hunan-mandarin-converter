const STORAGE_KEY = "hunan_lexicon_v3";

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

const defaultLexicon = {
  "你": "你咯",
  "你们": "你哒",
  "我们": "我哒",
  "他们": "渠哒",
  "她们": "渠哒",
  "大家": "伙计们",
  "爷爷": "嗲嗲",
  "外公": "嗲嗲",
  "奶奶": "娭毑",
  "外婆": "娭毑",
  "阿姨": "娭毑",
  "叔叔": "满哥",
  "男生": "满哥",
  "年轻男子": "满哥",
  "男孩子": "细伢子",
  "女孩子": "妹陀",
  "小孩子": "伢子",
  "孩子": "崽崽",
  "朋友": "老倌",
  "小伙子": "伢子",
  "姐妹": "姊妹伙",
  "兄弟": "老弟",

  "什么": "么子",
  "为什么": "做么子",
  "怎么": "啷个",
  "怎么会": "哦得会",
  "哪里": "哪凯",
  "这儿": "这凯",
  "那儿": "那凯",
  "这里": "这凯",
  "那里": "那凯",
  "这个": "咯杂",
  "那个": "嘎杂",
  "哪个": "哪个杂",
  "谁": "哪个",
  "是不是": "是啵",
  "是的": "嗯咯",
  "好吧": "要得咯",
  "可以": "要得",
  "不可以": "要不得",
  "不行": "要不得",
  "行": "行得通",
  "可能": "怕么",
  "知道": "晓得",
  "不懂": "搞驼不清",
  "不明白": "搞驼不清",
  "了解": "门清",

  "不要": "莫",
  "别": "莫",
  "没有": "冒得",
  "没得": "冒得",
  "不是": "不是咯",
  "不": "莫",
  "不理你": "不次你",
  "讨厌": "不带爱相",
  "骗子": "撮巴子",
  "诈骗犯": "撮巴子",
  "诈骗": "撮汤锅子",
  "骗": "撮",

  "说": "港",
  "说话": "港话",
  "聊天": "扯白",
  "吹牛": "扯卵筋",
  "骗人胡扯": "扯卵谈",
  "开玩笑": "打哈哈",
  "啰嗦": "七里八里",
  "啰里啰嗦": "七里八里",
  "吵": "仅叫",
  "吵死人": "仅叫的",
  "吵架": "呷架",
  "打架": "搞架",

  "吃": "恰",
  "吃饭": "恰饭",
  "好吃": "好恰",
  "难吃": "不好恰",
  "嚼": "qiò",
  "喝水": "喝口水先",
  "辣": "辣得跳",
  "甜": "甜滋滋",
  "咸": "咸口",
  "味道": "口味",
  "恶心": "透人",

  "去": "克",
  "来": "来咯",
  "走": "走起",
  "回家": "归屋",
  "出去": "出去耍",
  "过来": "过来咯",
  "进来": "进来咯",
  "快点": "搞快点",
  "慢一点": "慢点搞",
  "等一下": "等哈",
  "等会儿": "等哈",
  "马上": "立马",
  "现在": "而家",
  "刚刚": "哈子",
  "今天": "今朝",
  "昨天": "昨朝",
  "明天": "明朝",
  "早上": "清早八晨",
  "中午": "晌午",
  "晚上": "夜里头",
  "总是": "时刻子",
  "经常": "老是",
  "偶尔": "间或",

  "看": "瞄",
  "听": "听哈",
  "想": "想得起",
  "喜欢": "稀罕",
  "爱": "疼你",
  "生气": "冒火",
  "累": "lia",
  "困": "瞌睡来了",
  "睡觉": "困觉",
  "起床": "起铺",
  "舒服": "了瞥",
  "爽快": "了瞥",
  "吓人": "黑人",
  "搞笑": "斗霸",
  "滚开": "弹开",
  "暗示": "丢驼",
  "出错": "筐瓢",
  "解决": "了难",
  "过于勉强": "霸蛮",
  "很厉害": "霸蛮",
  "厉害": "恩杂",
  "很胖": "垒壮的",
  "专心致志": "昧心昧意",
  "不收拾": "冒点检十",
  "剥": "蔑",
  "掉": "跌",
  "丢": "跌",
  "鼻涕": "鼻斗龙",

  "工作": "做事",
  "上班": "做工",
  "下班": "散工",
  "学习": "搞学习",
  "上学": "读书去",
  "考试": "赶考",
  "问题": "岔子",
  "办法": "路数",
  "事情": "事体",
  "消息": "信儿",
  "真的": "港真",
  "真的吗": "港真啵",
  "假的": "鬼扯",
  "有点": "有滴",
  "一点": "滴点",
  "很多": "蛮多",
  "非常": "蛮扎实",
  "很": "蛮",
  "全部": "一哈子",

  "便宜": "划算",
  "贵": "贵得很",
  "排队": "扎堆等",
  "堵车": "塞车",
  "下雨": "落雨",
  "刮风": "起风",
  "天气": "天色",
  "洗澡": "冲凉",
  "洗衣服": "洗衫",
  "手机": "电话机",
  "电脑": "机子",
  "网络": "网路",
  "视频": "片片",
  "照片": "相片子",
  "直播": "开播",
  "玩": "耍",
  "逛街": "上街耍",
  "买东西": "买家伙",
  "无所事事到处闲逛": "打流",

  "不靠谱": "冇得屁眼",
  "干净": "索索利利",
  "破烂": "稀撕挎烂",
  "倒霉": "背扎大时",
  "话痨": "屎少屁多",
  "怀疑一下": "一扎鬼呢",
  "真离谱": "太拐哒",
  "太好了": "好得板",
  "别说了": "莫港哒",
  "别担心": "莫急莫慌",
  "谢谢": "多谢咯",
  "没关系": "冒关系",
  "再见": "回见"
};

const PENDING_STORAGE_KEY = "hunan_lexicon_pending_v1";
const DIALECT_STORAGE_KEY = "hunan_dialect_mode_v1";
const SCENE_STORAGE_KEY = "hunan_scene_mode_v1";
const EVALUATION_STORAGE_KEY = "hunan_eval_records_v1";

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
    tip: "会优先启用“上课、下课、食堂、作业、考试”等校园场景词条。",
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

let lexicon = loadLexicon();
let mode = "m2h";
const pinyinCache = new Map();
let pendingQueue = loadPendingQueue();
let selectedDialect = loadPreference(DIALECT_STORAGE_KEY, "changsha");
let selectedScene = loadPreference(SCENE_STORAGE_KEY, "daily");
let evaluations = loadEvaluations();
let currentCandidates = [];

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
    .replace(/"/g, "&quot;")
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

function loadLexicon() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultLexicon };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ...defaultLexicon };
    }
    return parsed;
  } catch (error) {
    return { ...defaultLexicon };
  }
}

function saveLexicon() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lexicon));
}

function loadPendingQueue() {
  try {
    const raw = localStorage.getItem(PENDING_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function savePendingQueue() {
  localStorage.setItem(PENDING_STORAGE_KEY, JSON.stringify(pendingQueue));
}

function loadEvaluations() {
  try {
    const raw = localStorage.getItem(EVALUATION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveEvaluations() {
  localStorage.setItem(EVALUATION_STORAGE_KEY, JSON.stringify(evaluations));
}

function getDialectProfile() {
  return DIALECT_PROFILES[selectedDialect] || DIALECT_PROFILES.changsha;
}

function getSceneProfile() {
  return SCENE_PROFILES[selectedScene] || SCENE_PROFILES.daily;
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

function enqueueReview(action) {
  pendingQueue.push({
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    ...action
  });
  savePendingQueue();
  renderPendingQueue();
}

function applyAction(action) {
  if (action.type === "upsert") {
    lexicon[action.mandarin] = action.hunan;
  } else if (action.type === "delete") {
    delete lexicon[action.mandarin];
  }
}

function approveAction(actionId) {
  const action = pendingQueue.find((item) => item.id === actionId);
  if (!action) return;
  applyAction(action);
  pendingQueue = pendingQueue.filter((item) => item.id !== actionId);
  savePendingQueue();
  saveLexicon();
  renderPendingQueue();
  renderEntries();
  convert();
}

function rejectAction(actionId) {
  pendingQueue = pendingQueue.filter((item) => item.id !== actionId);
  savePendingQueue();
  renderPendingQueue();
}

function approveAllActions() {
  pendingQueue.forEach((action) => applyAction(action));
  pendingQueue = [];
  savePendingQueue();
  saveLexicon();
  renderPendingQueue();
  renderEntries();
  convert();
}

function rejectAllActions() {
  pendingQueue = [];
  savePendingQueue();
  renderPendingQueue();
}

function renderPendingQueue() {
  if (!pendingList || !pendingCountInfo) return;
  pendingCountInfo.textContent = `待审核：${pendingQueue.length}`;

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

function createReverseMap(source) {
  const result = {};
  Object.entries(source).forEach(([mandarin, hunan]) => {
    result[hunan] = mandarin;
  });
  return result;
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
    const base = replaceByDictionaryWithPinyinFallbackDetailed(
      baseRuleResult.text,
      lexicon,
      { usePinyin: true }
    );

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
  const base = replaceByDictionaryWithPinyinFallbackDetailed(
    baseRuleResult.text,
    baseReverseLexicon,
    { usePinyin: true }
  );

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
      explainBox.textContent = "将展示匹配词条数量、拼音容错命中数和规则命中情况。";
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
    sceneTip.textContent = `当前场景：${scene.name}。${scene.tip}`;
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
    entryList.innerHTML = `<div class="entry-empty">没有匹配词条，可新增一条。</div>`;
    return;
  }

  entryList.innerHTML = entries
    .map(([mandarin, hunan]) => `
      <div class="entry-row">
        <span>${escapeHtml(mandarin)}</span>
        <span>${escapeHtml(hunan)}</span>
        <button class="entry-delete" type="button" data-key="${encodeURIComponent(mandarin)}">删除</button>
      </div>
    `)
    .join("");
}

function addOrUpdateEntry(event) {
  event.preventDefault();
  const mandarin = mandarinInput.value.trim();
  const hunan = hunanInput.value.trim();
  if (!mandarin || !hunan) return;

  enqueueReview({
    type: "upsert",
    mandarin,
    hunan
  });

  mandarinInput.value = "";
  hunanInput.value = "";
  mandarinInput.focus();
}

function removeEntry(event) {
  const button = event.target.closest(".entry-delete");
  if (!button) return;
  const key = decodeURIComponent(button.dataset.key || "");
  if (!key || !lexicon[key]) return;

  enqueueReview({
    type: "delete",
    mandarin: key
  });
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

function exportLexicon() {
  downloadJson(lexicon, "hunan-lexicon.json");
}

function importLexiconFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        alert("导入失败：JSON 结构不正确。");
        return;
      }

      const cleaned = {};
      Object.entries(data).forEach(([k, v]) => {
        const key = String(k).trim();
        const value = String(v).trim();
        if (key && value) cleaned[key] = value;
      });

      if (!Object.keys(cleaned).length) {
        alert("导入失败：词库为空。");
        return;
      }

      lexicon = cleaned;
      pendingQueue = [];
      savePendingQueue();
      saveLexicon();
      renderPendingQueue();
      renderEntries();
      convert();
      alert("词库导入成功。");
    } catch (error) {
      alert("导入失败：请检查 JSON 文件。");
    } finally {
      importFile.value = "";
    }
  };
  reader.readAsText(file, "utf-8");
}

function resetLexicon() {
  lexicon = { ...defaultLexicon };
  pendingQueue = [];
  savePendingQueue();
  saveLexicon();
  renderPendingQueue();
  renderEntries();
  convert();
}

function clampScore(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 3;
  return Math.min(5, Math.max(1, Math.round(parsed)));
}

function saveEvaluation(event) {
  event.preventDefault();
  const source = inputText.value.trim();
  const output = outputText.value.trim();

  if (!source || !output) {
    alert("请先输入并完成一次转换，再保存评测。");
    return;
  }

  const record = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    mode,
    dialect: selectedDialect,
    scene: selectedScene,
    source,
    output,
    accuracy: clampScore(scoreAccuracy.value),
    naturalness: clampScore(scoreNaturalness.value),
    understandability: clampScore(scoreUnderstandability.value),
    comment: evaluationComment.value.trim()
  };

  evaluations.unshift(record);
  if (evaluations.length > 200) {
    evaluations = evaluations.slice(0, 200);
  }
  saveEvaluations();
  renderEvaluationStats();
  renderEvaluationList();
  evaluationComment.value = "";
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
    return;
  }

  const total = evaluations.length;
  const sum = evaluations.reduce((acc, item) => {
    acc.accuracy += item.accuracy || 0;
    acc.naturalness += item.naturalness || 0;
    acc.understandability += item.understandability || 0;
    return acc;
  }, { accuracy: 0, naturalness: 0, understandability: 0 });

  evaluationStats.textContent =
    `共${total}条评测｜准确性 ${(sum.accuracy / total).toFixed(2)}｜自然度 ${(sum.naturalness / total).toFixed(2)}｜可理解性 ${(sum.understandability / total).toFixed(2)}`;
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

function exportEvaluations() {
  downloadJson(evaluations, "hunan-evaluation-records.json");
}

function clearEvaluations() {
  if (!confirm("确定清空全部评测记录吗？此操作不可撤销。")) return;
  evaluations = [];
  saveEvaluations();
  renderEvaluationStats();
  renderEvaluationList();
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

addForm.addEventListener("submit", addOrUpdateEntry);
entryList.addEventListener("click", removeEntry);
pendingList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;
  const actionId = button.dataset.id;
  if (action === "approve") approveAction(actionId);
  if (action === "reject") rejectAction(actionId);
});
searchInput.addEventListener("input", renderEntries);
exportBtn.addEventListener("click", exportLexicon);
importBtn.addEventListener("click", () => importFile.click());
importFile.addEventListener("change", () => {
  const file = importFile.files && importFile.files[0];
  if (file) importLexiconFromFile(file);
});
resetBtn.addEventListener("click", resetLexicon);
approveAllBtn.addEventListener("click", approveAllActions);
rejectAllBtn.addEventListener("click", rejectAllActions);

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
  evaluationForm.addEventListener("submit", saveEvaluation);
}
if (exportEvaluationBtn) {
  exportEvaluationBtn.addEventListener("click", exportEvaluations);
}
if (clearEvaluationBtn) {
  clearEvaluationBtn.addEventListener("click", clearEvaluations);
}

syncLabels();
syncContextState();
renderPendingQueue();
renderEntries();
renderEvaluationStats();
renderEvaluationList();
renderCandidateList([]);
