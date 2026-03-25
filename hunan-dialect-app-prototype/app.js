const FALLBACK_DATA = {
  designGoal:
    "面向日常交流、校园沟通、文旅服务与内容表达的湖南方言互转应用。",
  workflow: [
    "选择方言区域与使用场景。",
    "输入文本并生成推荐表达。",
    "查看候选结果与转换依据。",
    "进入词库与评测页面继续维护。"
  ],
  navTabs: [
    { id: "translate", label: "转译", hint: "双向互转", summary: "普通话与方言双向转换。" },
    { id: "scene", label: "场景", hint: "场景包", summary: "按场景组织常用表达。" },
    { id: "lexicon", label: "词库", hint: "审核", summary: "词条审核与词库维护。" },
    { id: "insights", label: "评测", hint: "反馈", summary: "查看质量评测与趋势。" }
  ],
  scenePacks: [
    {
      id: "daily",
      name: "日常交流",
      accent: "高频口语",
      description: "优先命中问候、吃饭、出门和熟人聊天的表达。",
      tip: "适合聊天和家庭沟通。",
      boostLexicon: { "吃饭": "恰饭", "快点": "搞快点", "哪里": "哪凯", "不要": "莫" },
      rulesM2H: [
        { pattern: "真的吗", replacement: "港真啵" },
        { pattern: "没关系", replacement: "冒关系" }
      ],
      rulesH2M: [
        { pattern: "港真啵", replacement: "真的吗" },
        { pattern: "冒关系", replacement: "没关系" }
      ],
      sample: "你今天去哪里，吃饭了吗？"
    },
    {
      id: "campus",
      name: "校园沟通",
      accent: "课堂与食堂",
      description: "强化上课、下课、食堂、图书馆和作业相关短语。",
      tip: "适合校园聊天、课间沟通和学生社群。",
      boostLexicon: { "上课": "上堂", "下课": "下堂", "食堂": "堂子", "考试": "赶考" },
      rulesM2H: [
        { pattern: "老师您好", replacement: "老师好咯" },
        { pattern: "去上课", replacement: "克上堂" }
      ],
      rulesH2M: [
        { pattern: "老师好咯", replacement: "老师您好" },
        { pattern: "克上堂", replacement: "去上课" }
      ],
      sample: "我们下课后去食堂，然后去图书馆。"
    },
    {
      id: "travel",
      name: "文旅问路",
      accent: "目的地表达",
      description: "突出问路、交通、景点和路线咨询等表达方式。",
      tip: "适合游客咨询、本地导览和路线指引。",
      boostLexicon: { "哪里": "哪凯", "景区": "景点", "公交车": "公交", "去": "克" },
      rulesM2H: [
        { pattern: "请问", replacement: "劳驾问哈" },
        { pattern: "怎么走", replacement: "啷个走" }
      ],
      rulesH2M: [
        { pattern: "劳驾问哈", replacement: "请问" },
        { pattern: "啷个走", replacement: "怎么走" }
      ],
      sample: "请问橘子洲怎么走，地铁在哪里坐？"
    },
    {
      id: "video",
      name: "短视频文案",
      accent: "情绪口语",
      description: "适配标题、开场白和互动引导，让表达更口语化。",
      tip: "适合短视频脚本和直播话术。",
      boostLexicon: { "点赞": "点个赞", "评论": "留言", "直播": "开播", "马上": "立马" },
      rulesM2H: [
        { pattern: "大家好", replacement: "各位老铁好咯" },
        { pattern: "点赞", replacement: "点个赞咯" }
      ],
      rulesH2M: [
        { pattern: "各位老铁好咯", replacement: "大家好" },
        { pattern: "点个赞咯", replacement: "点赞" }
      ],
      sample: "大家好，马上开播，记得点赞评论。"
    }
  ],
  dialectRegions: [
    {
      id: "changsha",
      name: "长沙口语",
      short: "默认区域",
      description: "适合作为词库主轴，保留较完整的口语表达与语气词。",
      lexicon: { "朋友": "老倌", "今天": "今朝", "谢谢": "多谢咯" }
    },
    {
      id: "xiangtan",
      name: "湘潭口语",
      short: "语气更拢",
      description: "保留更紧凑的日常说法，适合校园和熟人交流。",
      lexicon: { "什么": "么里子", "朋友": "伙计", "快点": "快些搞" }
    },
    {
      id: "zhuzhou",
      name: "株洲口语",
      short: "生活场景",
      description: "偏生活语境和出行表达，适合通勤和问路。",
      lexicon: { "吃饭": "呷饭", "哪里": "哪里子", "工作": "做事" }
    }
  ],
  quickPhrases: [
    "你今天去哪里，吃饭了吗？",
    "我们下课后去食堂，然后去图书馆。",
    "请问橘子洲怎么走，地铁在哪里坐？",
    "大家好，马上开播，记得点赞评论。",
    "别担心，这个事情我来处理。",
    "谢谢你，明天见。"
  ],
  reviewQueue: [
    { type: "upsert", mandarin: "图书馆", hunan: "图书馆子", reason: "校园场景新增", state: "待审核" },
    { type: "upsert", mandarin: "导航", hunan: "带路", reason: "文旅场景增强", state: "待审核" },
    { type: "delete", mandarin: "视频", hunan: "片片", reason: "表达过旧", state: "待复核" }
  ],
  evaluationRecords: [
    { scene: "daily", dialect: "changsha", mode: "m2h", accuracy: 4.8, naturalness: 4.6, note: "熟人聊天命中较稳定", time: "03-18 14:30" },
    { scene: "campus", dialect: "xiangtan", mode: "m2h", accuracy: 4.5, naturalness: 4.4, note: "校园词包对课堂表达更有效", time: "03-19 09:12" },
    { scene: "travel", dialect: "zhuzhou", mode: "m2h", accuracy: 4.2, naturalness: 4.3, note: "问路句式还可继续压缩", time: "03-20 19:05" },
    { scene: "video", dialect: "changsha", mode: "m2h", accuracy: 4.7, naturalness: 4.8, note: "情绪口语和互动引导更贴近短视频", time: "03-22 21:14" }
  ],
  kpis: {
    prototype: "App 展示版",
    taskPath: "4 类场景",
    avgScore: "4.6 / 5",
    approvalLatency: "待审核"
  },
  trendSeries: [
    { label: "第1周", value: 62 },
    { label: "第2周", value: 74 },
    { label: "第3周", value: 81 },
    { label: "第4周", value: 78 },
    { label: "第5周", value: 89 },
    { label: "第6周", value: 94 }
  ],
  seedLexicon: {
    "你": "你咯",
    "你们": "你哒",
    "我们": "我哒",
    "朋友": "老倌",
    "谢谢": "多谢咯",
    "哪里": "哪凯",
    "今天": "今朝",
    "明天": "明朝",
    "去": "克",
    "吃饭": "恰饭",
    "快点": "搞快点",
    "不要": "莫"
  }
};

const refs = {
  briefStats: document.getElementById("briefStats"),
  designGoal: document.getElementById("designGoal"),
  flowList: document.getElementById("flowList"),
  moduleStrip: document.getElementById("moduleStrip"),
  bottomNav: document.getElementById("bottomNav"),
  dialectSelect: document.getElementById("dialectSelect"),
  sceneSelect: document.getElementById("sceneSelect"),
  sourceInput: document.getElementById("sourceInput"),
  convertBtn: document.getElementById("convertBtn"),
  swapBtn: document.getElementById("swapBtn"),
  sceneTip: document.getElementById("sceneTip"),
  quickPhrases: document.getElementById("quickPhrases"),
  resultOutput: document.getElementById("resultOutput"),
  candidateList: document.getElementById("candidateList"),
  applyCandidateBtn: document.getElementById("applyCandidateBtn"),
  modeHeadline: document.getElementById("modeHeadline"),
  modeDescription: document.getElementById("modeDescription"),
  resultMeta: document.getElementById("resultMeta"),
  featureScene: document.getElementById("featureScene"),
  sceneGrid: document.getElementById("sceneGrid"),
  regionList: document.getElementById("regionList"),
  lexiconSearch: document.getElementById("lexiconSearch"),
  lexiconCount: document.getElementById("lexiconCount"),
  queueList: document.getElementById("queueList"),
  pendingCount: document.getElementById("pendingCount"),
  lexiconList: document.getElementById("lexiconList"),
  insightStats: document.getElementById("insightStats"),
  trendCaption: document.getElementById("trendCaption"),
  trendChart: document.getElementById("trendChart"),
  recordList: document.getElementById("recordList"),
  statusPill: document.getElementById("statusPill"),
  timePill: document.getElementById("timePill")
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pickArray(raw, keys, fallback) {
  for (const key of keys) {
    if (Array.isArray(raw[key])) {
      return raw[key];
    }
  }
  return fallback;
}

function pickObject(raw, keys, fallback) {
  for (const key of keys) {
    if (raw[key] && typeof raw[key] === "object" && !Array.isArray(raw[key])) {
      return raw[key];
    }
  }
  return fallback;
}

function normalizeData(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const scenePacks = pickArray(source, ["scenePacks", "scenePackages", "scenes"], FALLBACK_DATA.scenePacks).map(
    (item, index) => ({
      id: item.id || item.key || FALLBACK_DATA.scenePacks[index % FALLBACK_DATA.scenePacks.length].id,
      name: item.name || item.title || `场景 ${index + 1}`,
      accent: item.accent || item.tone || item.highlight || "场景包",
      description: item.description || item.tip || item.summary || "",
      tip: item.tip || item.highlight || item.description || "",
      boostLexicon: item.boostLexicon || item.lexiconM2H || {},
      lexiconM2H: item.lexiconM2H || item.boostLexicon || {},
      lexiconH2M: item.lexiconH2M || item.reverseLexicon || {},
      rulesM2H: item.rulesM2H || [],
      rulesH2M: item.rulesH2M || [],
      sample: item.sample || item.highlight || "",
      useCases: item.useCases || []
    })
  );

  const dialectRegions = pickArray(source, ["dialectRegions", "dialects", "regions"], FALLBACK_DATA.dialectRegions).map(
    (item, index) => ({
      id: item.id || item.key || FALLBACK_DATA.dialectRegions[index % FALLBACK_DATA.dialectRegions.length].id,
      name: item.name || item.area || `方言 ${index + 1}`,
      short: item.short || item.area || item.sampleStyle || "区域变体",
      description: item.description || item.intro || item.note || item.sampleStyle || "",
      lexicon: item.lexicon || item.boostLexicon || {},
      strengths: item.strengths || []
    })
  );

  const trendSeries = pickArray(source, ["trendSeries", "trends", "series"], FALLBACK_DATA.trendSeries).map(
    (item, index) => ({
      label: item.label || `阶段 ${index + 1}`,
      value: Number(item.value || item.accuracy || item.naturalness || item.understandability || 0)
    })
  );

  const navTabs = pickArray(source, ["navTabs", "tabs", "modules"], FALLBACK_DATA.navTabs).map((item, index) => ({
    id: item.id || item.key || FALLBACK_DATA.navTabs[index % FALLBACK_DATA.navTabs.length].id,
    label: item.label || item.title || `Tab ${index + 1}`,
    hint: item.hint || item.subtitle || item.badge || "",
    summary: item.summary || item.description || item.subtitle || ""
  }));

  const stats = pickObject(source, ["kpis", "metrics", "stats"], {});
  const normalizedKpis = {
    prototype:
      stats.prototype ||
      (source.appMeta && source.appMeta.version ? String(source.appMeta.version) : FALLBACK_DATA.kpis.prototype),
    taskPath:
      stats.taskPath ||
      `${stats.sceneCoverage || scenePacks.length} 场景 / ${stats.dialectCoverage || dialectRegions.length} 子区`,
    avgScore:
      stats.avgScore ||
      (Number.isFinite(Number(stats.evaluationAvgAccuracy))
        ? `${Number(stats.evaluationAvgAccuracy).toFixed(2)} / 5`
        : FALLBACK_DATA.kpis.avgScore),
    approvalLatency:
      stats.approvalLatency ||
      (Number.isFinite(Number(stats.pendingReview))
        ? `${Number(stats.pendingReview)} 待审核`
        : FALLBACK_DATA.kpis.approvalLatency)
  };

  return {
    designGoal: source.designGoal || FALLBACK_DATA.designGoal,
    workflow: pickArray(source, ["workflow", "flow", "coreFlow"], FALLBACK_DATA.workflow),
    navTabs,
    scenePacks,
    dialectRegions,
    quickPhrases: pickArray(source, ["quickPhrases", "phrases", "recommendedPhrases"], FALLBACK_DATA.quickPhrases),
    reviewQueue: pickArray(source, ["reviewQueue", "pendingQueue", "reviewItems"], FALLBACK_DATA.reviewQueue),
    evaluationRecords: pickArray(source, ["evaluationRecords", "records", "evaluationSamples"], FALLBACK_DATA.evaluationRecords),
    kpis: normalizedKpis,
    trendSeries,
    seedLexicon: pickObject(source, ["seedLexicon", "lexiconSeed"], FALLBACK_DATA.seedLexicon)
  };
}

const APP_DATA = normalizeData(window.APP_DATA || {});

const state = {
  activeTab: "translate",
  mode: "m2h",
  dialect: APP_DATA.dialectRegions[0].id,
  scene: APP_DATA.scenePacks[0].id,
  source: APP_DATA.quickPhrases[0] || "",
  query: "",
  lexicon: {},
  currentCandidates: []
};

function nowTimeText() {
  return new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

function setClock() {
  refs.timePill.textContent = nowTimeText();
}

function createReverseMap(input) {
  const reversed = {};
  Object.entries(input || {}).forEach(([key, value]) => {
    reversed[value] = key;
  });
  return reversed;
}

function getDialect() {
  return APP_DATA.dialectRegions.find((item) => item.id === state.dialect) || APP_DATA.dialectRegions[0];
}

function getScene() {
  return APP_DATA.scenePacks.find((item) => item.id === state.scene) || APP_DATA.scenePacks[0];
}

function getSortedEntries(dictionary) {
  return Object.entries(dictionary || {}).sort((a, b) => b[0].length - a[0].length);
}

function replaceByDictionary(text, dictionary) {
  let output = String(text || "");
  getSortedEntries(dictionary).forEach(([key, value]) => {
    output = output.split(key).join(value);
  });
  return output;
}

function applyRules(text, rules) {
  let output = String(text || "");
  (rules || []).forEach((rule) => {
    const pattern = rule && rule.pattern ? String(rule.pattern) : "";
    if (!pattern) return;
    output = output.split(pattern).join(String(rule.replacement || ""));
  });
  return output;
}

function buildForwardLexicon() {
  return {
    ...state.lexicon,
    ...(getDialect().lexicon || getDialect().boostLexicon || {}),
    ...(getScene().boostLexicon || getScene().lexiconM2H || {})
  };
}

function buildReverseLexicon() {
  const forwardBase = {
    ...state.lexicon,
    ...(getDialect().lexicon || getDialect().boostLexicon || {}),
    ...(getScene().boostLexicon || getScene().lexiconM2H || {})
  };
  return {
    ...createReverseMap(forwardBase),
    ...(getScene().lexiconH2M || getScene().reverseLexicon || {})
  };
}

function buildCandidates(source) {
  const dialect = getDialect();
  const scene = getScene();
  const baseLexicon = state.mode === "m2h" ? state.lexicon : createReverseMap(state.lexicon);
  const fullLexicon = state.mode === "m2h" ? buildForwardLexicon() : buildReverseLexicon();
  const rules = state.mode === "m2h" ? scene.rulesM2H : scene.rulesH2M;

  const recommended = replaceByDictionary(applyRules(source, rules), fullLexicon);
  const literal = replaceByDictionary(source, baseLexicon);
  const sceneFocused = replaceByDictionary(
    applyRules(source, rules),
    state.mode === "m2h"
      ? (scene.boostLexicon || scene.lexiconM2H || {})
      : (scene.lexiconH2M || createReverseMap(scene.boostLexicon || scene.lexiconM2H || {}))
  );
  const dialectFocused = replaceByDictionary(
    source,
    state.mode === "m2h"
      ? (dialect.lexicon || dialect.boostLexicon || {})
      : createReverseMap(dialect.lexicon || dialect.boostLexicon || {})
  );

  const candidates = [
    {
      tag: "首选",
      title: "场景 + 区域融合",
      text: recommended || source
    },
    {
      tag: "直译",
      title: "基础词库映射",
      text: literal || source
    },
    {
      tag: "氛围",
      title: "语境强化表达",
      text: (sceneFocused && sceneFocused !== source ? sceneFocused : dialectFocused) || source
    }
  ];

  const unique = [];
  const seen = new Set();
  candidates.forEach((item) => {
    const key = item.text.trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    unique.push(item);
  });

  return unique;
}

function updateModeCopy() {
  const dialect = getDialect();
  const scene = getScene();
  refs.modeHeadline.textContent =
    state.mode === "m2h" ? `普通话 → ${dialect.name}` : `${dialect.name} → 普通话`;
  refs.modeDescription.textContent = `${scene.name}场景`;
  refs.sceneTip.textContent = `${scene.name}已启用`;
  refs.resultMeta.textContent =
    state.mode === "m2h"
      ? `${dialect.name} · ${scene.name}`
      : `普通话回译 · ${dialect.name}`;
}

function renderCandidates() {
  if (!state.currentCandidates.length) {
    refs.candidateList.innerHTML = `
      <div class="candidate-card" style="animation-delay:0ms">
        <span class="candidate-tag">提示</span>
        <div class="candidate-copy">
          <strong>还没有结果</strong>
          输入一句话后点击“立即转译”。
        </div>
      </div>
    `;
    return;
  }

  refs.candidateList.innerHTML = state.currentCandidates
    .map((item, index) => `
      <div class="candidate-card" style="animation-delay:${index * 70}ms">
        <span class="candidate-tag">${escapeHtml(item.tag)}</span>
        <div class="candidate-copy">
          <strong>${escapeHtml(item.title)}</strong>
          ${escapeHtml(item.text)}
        </div>
        <button class="candidate-btn" type="button" data-index="${index}">使用</button>
      </div>
    `)
    .join("");
}

function convertNow() {
  const source = refs.sourceInput.value.trim();
  state.source = source;

  if (!source) {
    refs.resultOutput.textContent = "点击“立即转译”后在这里显示结果。";
    state.currentCandidates = [];
    renderCandidates();
    return;
  }

  state.currentCandidates = buildCandidates(source);
  refs.resultOutput.textContent = state.currentCandidates[0] ? state.currentCandidates[0].text : source;
  renderCandidates();
}

function renderBrief() {
  const avgFromRecords = APP_DATA.evaluationRecords.length
    ? (
        APP_DATA.evaluationRecords.reduce((sum, item) => sum + Number(item.accuracy || 0), 0) /
        APP_DATA.evaluationRecords.length
      ).toFixed(1)
    : APP_DATA.kpis.avgScore;

  if (refs.designGoal) {
    refs.designGoal.textContent = APP_DATA.designGoal;
  }

  refs.briefStats.innerHTML = `
    <div class="stat-chip">
      <strong>${Object.keys(state.lexicon).length || 0}</strong>
      <span>开放词条</span>
    </div>
    <div class="stat-chip">
      <strong>${APP_DATA.scenePacks.length}</strong>
      <span>核心场景</span>
    </div>
    <div class="stat-chip">
      <strong>${APP_DATA.dialectRegions.length}</strong>
      <span>区域口语</span>
    </div>
    <div class="stat-chip">
      <strong>${avgFromRecords}</strong>
      <span>平均准确度</span>
    </div>
  `;

  if (refs.flowList) {
    refs.flowList.innerHTML = APP_DATA.workflow
      .map((step) => `<div class="flow-step">${escapeHtml(step)}</div>`)
      .join("");
  }

  if (refs.moduleStrip) {
    refs.moduleStrip.innerHTML = APP_DATA.navTabs
      .map((item) => `
        <div class="module-card">
          <strong>${escapeHtml(item.label)}</strong>
          <p>${escapeHtml(item.summary || item.hint || "")}</p>
        </div>
      `)
      .join("");
  }
}

function renderBottomNav() {
  refs.bottomNav.innerHTML = APP_DATA.navTabs
    .map((item) => `
      <button class="nav-btn ${item.id === state.activeTab ? "is-active" : ""}" type="button" data-tab="${item.id}">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.hint || "")}</span>
      </button>
    `)
    .join("");
}

function renderSelects() {
  refs.dialectSelect.innerHTML = APP_DATA.dialectRegions
    .map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`)
    .join("");

  refs.sceneSelect.innerHTML = APP_DATA.scenePacks
    .map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`)
    .join("");

  refs.dialectSelect.value = state.dialect;
  refs.sceneSelect.value = state.scene;
}

function renderQuickPhrases() {
  refs.quickPhrases.innerHTML = APP_DATA.quickPhrases
    .map(
      (item) => `
        <button class="phrase-btn" type="button" data-phrase="${escapeHtml(item)}">
          ${escapeHtml(item)}
        </button>
      `
    )
    .join("");
  refs.sourceInput.value = state.source;
}

function renderSceneTab() {
  const activeScene = getScene();
  refs.featureScene.innerHTML = `
    <span class="block-label">当前主推场景</span>
    <h4>${escapeHtml(activeScene.name)}</h4>
    <p>${escapeHtml(activeScene.description || activeScene.tip || "")}</p>
    <div class="accent-line">
      <span>${escapeHtml(activeScene.accent || "常用表达")}</span>
      <span>${escapeHtml(activeScene.sample || "")}</span>
    </div>
  `;

  refs.sceneGrid.innerHTML = APP_DATA.scenePacks
    .map((scene) => `
      <div class="scene-card">
        <strong>${escapeHtml(scene.name)}</strong>
        <p>${escapeHtml(scene.description || scene.tip || "")}</p>
        <span class="small-pill">${escapeHtml(scene.accent || "场景包")}</span>
      </div>
    `)
    .join("");

  refs.regionList.innerHTML = APP_DATA.dialectRegions
    .map((region) => `
      <div class="region-card">
        <strong>${escapeHtml(region.name)}</strong>
        <p>${escapeHtml(region.description || region.note || "")}</p>
        <span class="small-pill">${escapeHtml(region.short || "区域变体")}</span>
      </div>
    `)
    .join("");
}

function renderLexiconTab() {
  const query = state.query.trim();
  const entries = Object.entries(state.lexicon).filter(([mandarin, hunan]) => {
    if (!query) return true;
    return mandarin.includes(query) || hunan.includes(query);
  });

  refs.lexiconCount.textContent = `词条 ${Object.keys(state.lexicon).length}`;
  refs.pendingCount.textContent = `${APP_DATA.reviewQueue.length} 条`;

  refs.queueList.innerHTML = APP_DATA.reviewQueue
    .map((item) => `
      <div class="queue-item">
        <div class="meta-row">
          <span class="queue-badge">${escapeHtml(item.state || "待审核")}</span>
          <span>${escapeHtml(item.type === "delete" ? "删除申请" : "新增 / 修改")}</span>
        </div>
        <strong>${escapeHtml(item.mandarin)}${item.hunan ? ` → ${escapeHtml(item.hunan)}` : ""}</strong>
        <p>${escapeHtml(item.reason || "等待管理员复核。")}</p>
      </div>
    `)
    .join("");

  refs.lexiconList.innerHTML = entries
    .slice(0, 10)
    .map(([mandarin, hunan]) => `
      <div class="lexicon-item">
        <div class="pair">
          <strong>${escapeHtml(mandarin)}</strong>
          <span>${escapeHtml(hunan)}</span>
        </div>
        <div class="meta-row">
          <span>${escapeHtml(getScene().name)}</span>
          <span>高频词条</span>
        </div>
      </div>
    `)
    .join("");

  if (!entries.length) {
    refs.lexiconList.innerHTML = `
      <div class="lexicon-item">
        <strong>没有匹配词条</strong>
        <p>换一个关键词试试。</p>
      </div>
    `;
  }
}

function renderInsightsTab() {
  const avgNaturalness = APP_DATA.evaluationRecords.length
    ? (
        APP_DATA.evaluationRecords.reduce((sum, item) => sum + Number(item.naturalness || 0), 0) /
        APP_DATA.evaluationRecords.length
      ).toFixed(1)
    : "4.5";

  refs.insightStats.innerHTML = `
    <div class="insight-chip">
      <strong>${escapeHtml(APP_DATA.kpis.prototype || "App 原型")}</strong>
      <span>版本状态</span>
    </div>
    <div class="insight-chip">
      <strong>${escapeHtml(APP_DATA.kpis.taskPath || "4 类场景")}</strong>
      <span>覆盖范围</span>
    </div>
    <div class="insight-chip">
      <strong>${escapeHtml(APP_DATA.kpis.approvalLatency || "< 1 天")}</strong>
      <span>待审核状态</span>
    </div>
    <div class="insight-chip">
      <strong>${avgNaturalness}</strong>
      <span>自然度均值</span>
    </div>
  `;

  refs.trendCaption.textContent = `${APP_DATA.trendSeries.length} 个时间点`;
  const maxValue = Math.max(...APP_DATA.trendSeries.map((item) => Number(item.value) || 0), 1);
  refs.trendChart.innerHTML = APP_DATA.trendSeries
    .map((item) => {
      const height = Math.max(36, Math.round((Number(item.value) / maxValue) * 124));
      return `
        <div class="bar-col">
          <span class="bar-value">${escapeHtml(item.value)}</span>
          <div class="bar" style="height:${height}px"></div>
          <span class="bar-label">${escapeHtml(item.label)}</span>
        </div>
      `;
    })
    .join("");

  refs.recordList.innerHTML = APP_DATA.evaluationRecords
    .map((item) => `
      <div class="record-card">
        <div class="meta-row">
          <span>${escapeHtml(item.time || "最近")}</span>
          <span>${escapeHtml(item.mode === "h2m" ? "方言 → 普通话" : "普通话 → 方言")}</span>
        </div>
        <strong>${escapeHtml(resolveDialectName(item.dialect))} / ${escapeHtml(resolveSceneName(item.scene))}</strong>
        <p>准确度 ${escapeHtml(item.accuracy)}，自然度 ${escapeHtml(item.naturalness)}。${escapeHtml(item.note || "")}</p>
      </div>
    `)
    .join("");
}

function resolveSceneName(sceneId) {
  const item = APP_DATA.scenePacks.find((scene) => scene.id === sceneId);
  return item ? item.name : sceneId;
}

function resolveDialectName(dialectId) {
  const item = APP_DATA.dialectRegions.find((dialect) => dialect.id === dialectId);
  return item ? item.name : dialectId;
}

function renderActiveScreen() {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("is-active", screen.dataset.screen === state.activeTab);
  });
  renderBottomNav();
}

function updateStatus() {
  refs.statusPill.textContent = `词库 ${Object.keys(state.lexicon).length} 条`;
}

function bindEvents() {
  refs.bottomNav.addEventListener("click", (event) => {
    const button = event.target.closest(".nav-btn");
    if (!button) return;
    state.activeTab = button.dataset.tab;
    renderActiveScreen();
  });

  refs.swapBtn.addEventListener("click", () => {
    state.mode = state.mode === "m2h" ? "h2m" : "m2h";
    updateModeCopy();
    convertNow();
  });

  refs.convertBtn.addEventListener("click", convertNow);

  refs.dialectSelect.addEventListener("change", () => {
    state.dialect = refs.dialectSelect.value;
    updateModeCopy();
    renderSceneTab();
    convertNow();
  });

  refs.sceneSelect.addEventListener("change", () => {
    state.scene = refs.sceneSelect.value;
    updateModeCopy();
    renderSceneTab();
    renderLexiconTab();
    convertNow();
  });

  refs.sourceInput.addEventListener("input", () => {
    state.source = refs.sourceInput.value;
  });

  refs.quickPhrases.addEventListener("click", (event) => {
    const button = event.target.closest(".phrase-btn");
    if (!button) return;
    refs.sourceInput.value = button.dataset.phrase || "";
    convertNow();
  });

  refs.candidateList.addEventListener("click", (event) => {
    const button = event.target.closest(".candidate-btn");
    if (!button) return;
    const index = Number(button.dataset.index);
    const candidate = state.currentCandidates[index];
    if (!candidate) return;
    refs.resultOutput.textContent = candidate.text;
  });

  refs.applyCandidateBtn.addEventListener("click", () => {
    if (state.currentCandidates[0]) {
      refs.resultOutput.textContent = state.currentCandidates[0].text;
    }
  });

  refs.lexiconSearch.addEventListener("input", () => {
    state.query = refs.lexiconSearch.value;
    renderLexiconTab();
  });
}

async function loadLexicon() {
  if (window.DEFAULT_LEXICON && typeof window.DEFAULT_LEXICON === "object") {
    state.lexicon = window.DEFAULT_LEXICON;
    return;
  }

  try {
    const response = await fetch("./data/default-lexicon.json");
    if (!response.ok) {
      throw new Error(`lexicon ${response.status}`);
    }
    const payload = await response.json();
    state.lexicon = payload && typeof payload === "object" ? payload : APP_DATA.seedLexicon;
  } catch (error) {
    state.lexicon = { ...APP_DATA.seedLexicon };
  }
}

async function bootstrap() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);
  setClock();
  window.setInterval(setClock, 60000);

  renderSelects();
  renderQuickPhrases();
  renderActiveScreen();
  bindEvents();

  await loadLexicon();

  renderBrief();
  renderSceneTab();
  renderLexiconTab();
  renderInsightsTab();
  updateModeCopy();
  updateStatus();
  convertNow();
  window.setTimeout(() => window.scrollTo(0, 0), 60);
}

bootstrap();
