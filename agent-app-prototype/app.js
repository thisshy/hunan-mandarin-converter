const appData = {
  agents: [
    {
      badge: "T",
      name: "翻译 Agent",
      summary: "负责普通话与湖南方言的主结果生成，继承现有词库与双向转换能力。",
      state: "运行中"
    },
    {
      badge: "F",
      name: "纠错 Agent",
      summary: "承接网页原型中的拼音近似匹配与容错，生成候选表达并减少错字影响。",
      state: "辅助中"
    },
    {
      badge: "L",
      name: "词库 Agent",
      summary: "跟踪新增词条、删除申请和场景词汇，向人工审核中心提交建议。",
      state: "待复核"
    },
    {
      badge: "E",
      name: "评测 Agent",
      summary: "汇总准确性、自然度、可理解性评分，反向推动词库和规则优化。",
      state: "已同步"
    }
  ],
  flow: [
    "用户选择方言和使用场景，输入一句普通话或方言文本。",
    "翻译 Agent 根据基础词库、场景词库和方向规则生成主结果。",
    "纠错 Agent 做拼音近似匹配，补出更自然的候选表达。",
    "词库 Agent 记录命中薄弱处，沉淀为新增词条或审核建议。",
    "评测 Agent 接收用户评分，更新近 7 日效果洞察。"
  ],
  scenes: {
    daily: "适合家常聊天与口语交流，优先使用高频生活表达。",
    campus: "强化上课、下课、食堂、作业和考试等校园词汇。",
    travel: "聚焦问路、景点、交通和城市服务等文旅交流。",
    video: "偏向口语化和情绪化表达，适合短视频标题与台词。"
  },
  translations: {
    changsha: {
      daily: {
        main: "你今朝克哪凯，恰饭了啵？",
        exact: 4,
        fuzzy: 1,
        candidates: [
          { title: "主推荐", text: "你今朝克哪凯，恰饭了啵？" },
          { title: "更口语", text: "你今朝克哪凯咯，恰饭冒得？" },
          { title: "更稳妥", text: "你今天去哪里，吃饭了吗？" }
        ]
      },
      campus: {
        main: "你今朝下堂以后克堂子恰饭不？",
        exact: 5,
        fuzzy: 0,
        candidates: [
          { title: "校园推荐", text: "你今朝下堂以后克堂子恰饭不？" },
          { title: "同学口吻", text: "你今朝下课后克食堂恰饭啵？" },
          { title: "普通表达", text: "你今天下课后去食堂吃饭吗？" }
        ]
      },
      travel: {
        main: "请问橘子洲在哪凯，地铁啷个坐？",
        exact: 4,
        fuzzy: 1,
        candidates: [
          { title: "问路推荐", text: "请问橘子洲在哪凯，地铁啷个坐？" },
          { title: "更自然", text: "橘子洲在哪凯咯，地铁咋个坐？" },
          { title: "书面回译", text: "请问橘子洲在哪里，地铁怎么坐？" }
        ]
      },
      video: {
        main: "兄弟们点个赞咯，立马开播。",
        exact: 3,
        fuzzy: 1,
        candidates: [
          { title: "短视频推荐", text: "兄弟们点个赞咯，立马开播。" },
          { title: "更热闹", text: "各位老铁点个赞咯，马上开播。" },
          { title: "标准表达", text: "大家点个赞，马上开始直播。" }
        ]
      }
    },
    xiangtan: {
      daily: {
        main: "你今朝克哪凯，恰饭了冒？",
        exact: 4,
        fuzzy: 1,
        candidates: [
          { title: "主推荐", text: "你今朝克哪凯，恰饭了冒？" },
          { title: "柔和语气", text: "你今朝去哪凯咯，饭恰了冒？" },
          { title: "普通表达", text: "你今天去哪里，吃饭了吗？" }
        ]
      },
      campus: {
        main: "你下堂后克堂子恰饭不咯？",
        exact: 5,
        fuzzy: 0,
        candidates: [
          { title: "校园推荐", text: "你下堂后克堂子恰饭不咯？" },
          { title: "更轻松", text: "下堂后一道克食堂恰饭不？" },
          { title: "普通表达", text: "下课后一起去食堂吃饭吗？" }
        ]
      },
      travel: {
        main: "劳驾问哈，岳麓山在哪凯，公交啷个搭？",
        exact: 4,
        fuzzy: 1,
        candidates: [
          { title: "问路推荐", text: "劳驾问哈，岳麓山在哪凯，公交啷个搭？" },
          { title: "更生活化", text: "岳麓山在哪凯咯，公交咋搭？" },
          { title: "普通表达", text: "请问岳麓山在哪里，公交怎么坐？" }
        ]
      },
      video: {
        main: "伙计们点个赞，马上开播咯。",
        exact: 3,
        fuzzy: 1,
        candidates: [
          { title: "短视频推荐", text: "伙计们点个赞，马上开播咯。" },
          { title: "更活跃", text: "伙计们帮我点个赞，立马开播。" },
          { title: "普通表达", text: "大家点个赞，马上开始直播。" }
        ]
      }
    },
    zhuzhou: {
      daily: {
        main: "你今朝克哪凯，呷饭了不？",
        exact: 4,
        fuzzy: 1,
        candidates: [
          { title: "主推荐", text: "你今朝克哪凯，呷饭了不？" },
          { title: "更株洲", text: "你今朝到哪凯克咯，呷饭没？" },
          { title: "普通表达", text: "你今天去哪里，吃饭了吗？" }
        ]
      },
      campus: {
        main: "你下堂后去堂子呷饭不？",
        exact: 5,
        fuzzy: 0,
        candidates: [
          { title: "校园推荐", text: "你下堂后去堂子呷饭不？" },
          { title: "同学口吻", text: "下堂以后一道克堂子呷饭不？" },
          { title: "普通表达", text: "下课后一起去食堂吃饭吗？" }
        ]
      },
      travel: {
        main: "请问神农城在哪凯，地铁怎么坐咯？",
        exact: 4,
        fuzzy: 1,
        candidates: [
          { title: "问路推荐", text: "请问神农城在哪凯，地铁怎么坐咯？" },
          { title: "更顺口", text: "神农城在哪凯，地铁啷个坐？" },
          { title: "普通表达", text: "请问神农城在哪里，地铁怎么坐？" }
        ]
      },
      video: {
        main: "伙计们点个赞，立马开播。",
        exact: 3,
        fuzzy: 1,
        candidates: [
          { title: "短视频推荐", text: "伙计们点个赞，立马开播。" },
          { title: "更热情", text: "各位点个赞，马上开播咯。" },
          { title: "普通表达", text: "大家点个赞，马上开始直播。" }
        ]
      }
    }
  },
  terms: [
    {
      label: "高频建议",
      word: "食堂",
      mapping: "堂子",
      note: "校园场景命中率高，建议优先保留。"
    },
    {
      label: "用户新增",
      word: "直播",
      mapping: "开播",
      note: "短视频场景中已稳定出现，适合保留。"
    },
    {
      label: "争议词条",
      word: "哪里",
      mapping: "哪凯",
      note: "多地区通用，但语气强弱需要人工再审。"
    }
  ],
  reviews: [
    {
      scene: "校园",
      content: "普通话“下课后去食堂吗”建议转为“下堂后克堂子恰饭不？”",
      meta: "来源：新增词条建议 / 提交于 10:24",
      score: "通过率 92%"
    },
    {
      scene: "文旅",
      content: "“景区游客中心”当前回译偏硬，建议补充更自然的问路表达。",
      meta: "来源：评测反馈 / 提交于 09:18",
      score: "待复核"
    },
    {
      scene: "短视频",
      content: "“点个赞咯”与“点个赞啵”两种表达竞争，需要按地区细分。",
      meta: "来源：热门候选分歧 / 提交于 昨日",
      score: "需分流"
    }
  ],
  evaluations: [
    {
      title: "长沙口语 / 日常交流",
      score: "准确性 5 / 自然度 4 / 可理解性 5",
      note: "口语感强，适合熟人聊天。"
    },
    {
      title: "校园沟通 / 食堂场景",
      score: "准确性 4 / 自然度 5 / 可理解性 4",
      note: "校园词汇比旧网页版本更聚焦。"
    },
    {
      title: "文旅问路 / 地铁路线",
      score: "准确性 4 / 自然度 4 / 可理解性 5",
      note: "路线表达清晰，适合游客模式。"
    }
  ]
};

const screenTitle = document.getElementById("screenTitle");
const agentList = document.getElementById("agentList");
const flowList = document.getElementById("flowList");
const sceneTip = document.getElementById("sceneTip");
const candidateList = document.getElementById("candidateList");
const termList = document.getElementById("termList");
const reviewList = document.getElementById("reviewList");
const evalList = document.getElementById("evalList");
const mainResult = document.getElementById("mainResult");
const agentSummaryTranslate = document.getElementById("agentSummaryTranslate");
const agentSummaryFuzzy = document.getElementById("agentSummaryFuzzy");
const sourceInput = document.getElementById("sourceInput");
const dialectSelect = document.getElementById("dialectSelect");
const sceneSelect = document.getElementById("sceneSelect");
const convertBtn = document.getElementById("convertBtn");
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const screens = Array.from(document.querySelectorAll(".screen"));

function renderAgents() {
  agentList.innerHTML = appData.agents
    .map(
      (agent) => `
        <article class="agent-card">
          <div class="agent-badge">${agent.badge}</div>
          <div class="agent-copy">
            <h3>${agent.name}</h3>
            <p>${agent.summary}</p>
          </div>
          <span class="agent-state">${agent.state}</span>
        </article>
      `
    )
    .join("");
}

function renderFlow() {
  flowList.innerHTML = appData.flow.map((step) => `<li>${step}</li>`).join("");
}

function renderCandidates(items) {
  candidateList.innerHTML = items
    .map(
      (item, index) => `
        <article class="candidate-item">
          <span class="candidate-index">#${index + 1}</span>
          <div class="candidate-copy">
            <span>${item.title}</span>
            <strong>${item.text}</strong>
          </div>
          <button class="candidate-btn" type="button" data-text="${item.text}">采用</button>
        </article>
      `
    )
    .join("");
}

function renderTerms() {
  termList.innerHTML = appData.terms
    .map(
      (item) => `
        <article class="term-row">
          <span>${item.label}</span>
          <strong>${item.word} → ${item.mapping}</strong>
          <p>${item.note}</p>
        </article>
      `
    )
    .join("");
}

function renderReviews() {
  reviewList.innerHTML = appData.reviews
    .map(
      (item) => `
        <article class="review-item">
          <span>${item.scene}</span>
          <strong>${item.content}</strong>
          <div class="review-meta">
            <span>${item.meta}</span>
            <span>${item.score}</span>
          </div>
          <div class="review-actions">
            <button class="review-action" type="button">通过</button>
            <button class="review-action secondary" type="button">驳回</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderEvaluations() {
  evalList.innerHTML = appData.evaluations
    .map(
      (item) => `
        <article class="eval-row">
          <span>${item.title}</span>
          <strong>${item.score}</strong>
          <p>${item.note}</p>
        </article>
      `
    )
    .join("");
}

function updateTranslation() {
  const dialect = dialectSelect.value;
  const scene = sceneSelect.value;
  const snapshot = appData.translations[dialect][scene];

  sceneTip.textContent = appData.scenes[scene];
  mainResult.textContent = snapshot.main;
  agentSummaryTranslate.textContent = `词条命中 ${snapshot.exact} 次`;
  agentSummaryFuzzy.textContent = `容错补偿 ${snapshot.fuzzy} 次`;
  renderCandidates(snapshot.candidates);

  if (!sourceInput.value.trim()) {
    sourceInput.value = "你今天去哪里，吃饭了吗？";
  }
}

function activateScreen(target) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === target);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.target === target);
  });

  const activeItem = navItems.find((item) => item.dataset.target === target);
  if (activeItem) {
    screenTitle.textContent = activeItem.textContent;
  }
}

candidateList.addEventListener("click", (event) => {
  const button = event.target.closest(".candidate-btn");
  if (!button) return;
  mainResult.textContent = button.dataset.text || "";
});

convertBtn.addEventListener("click", updateTranslation);
dialectSelect.addEventListener("change", updateTranslation);
sceneSelect.addEventListener("change", updateTranslation);

navItems.forEach((item) => {
  item.addEventListener("click", () => activateScreen(item.dataset.target));
});

renderAgents();
renderFlow();
renderTerms();
renderReviews();
renderEvaluations();
updateTranslation();
