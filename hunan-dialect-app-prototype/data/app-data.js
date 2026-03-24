(function () {
  const APP_DATA = {
    appMeta: {
      name: "湘言通",
      subtitle: "湖南方言与普通话互转工作台",
      description:
        "面向方言转换、词库审核和效果评测的一体化原型数据，适合移动端工作台展示。",
      version: "prototype-1.0"
    },

    navTabs: [
      {
        key: "translate",
        title: "转译",
        subtitle: "普通话 / 方言互转",
        summary: "支持场景化转译、候选结果对比和一键应用。",
        badge: "核心"
      },
      {
        key: "scene",
        title: "场景",
        subtitle: "日常 / 校园 / 文旅 / 视频",
        summary: "按使用场景组织高频词句，提升语境命中率。",
        badge: "推荐"
      },
      {
        key: "lexicon",
        title: "词库",
        subtitle: "审核 / 导入 / 维护",
        summary: "保留词条审核流，方便集中维护湖南方言词库。",
        badge: "后台"
      },
      {
        key: "insights",
        title: "评测",
        subtitle: "效果趋势 / 记录",
        summary: "展示准确率、自然度和可理解性等核心指标。",
        badge: "分析"
      }
    ],

    scenePackages: [
      {
        key: "daily",
        name: "日常交流",
        title: "高频口语包",
        description: "覆盖聊天、问路、提醒、回应等日常高频表达，适合快速转译。",
        tone: "自然、直接、口语化",
        useCases: ["聊天", "接话", "日常提醒"],
        highlight: "优先匹配短句和高频词组"
      },
      {
        key: "campus",
        name: "校园沟通",
        title: "校园场景包",
        description: "围绕上课、食堂、作业、考试等校园语境构建可用表达。",
        tone: "明确、轻快、适合学生端",
        useCases: ["上课下课", "宿舍交流", "作业提醒"],
        highlight: "更适合高频名词和固定句式"
      },
      {
        key: "travel",
        name: "文旅问路",
        title: "出行场景包",
        description: "覆盖景区、交通、路线和服务咨询，适合游客端和导览端。",
        tone: "礼貌、清晰、信息导向",
        useCases: ["问路", "买票", "找景点"],
        highlight: "加强地名、交通词与问句模板"
      },
      {
        key: "video",
        name: "短视频文案",
        title: "传播场景包",
        description: "面向标题、口播、弹幕和评论语境，突出节奏感和情绪表达。",
        tone: "更有传播感，适合内容创作",
        useCases: ["标题生成", "口播台词", "评论互动"],
        highlight: "强化情绪词和短句节奏"
      }
    ],

    dialectRegions: [
      {
        key: "changsha",
        name: "长沙",
        area: "长沙口语",
        intro: "作为默认主区域，适合做首屏转换和词库基准样本。",
        strengths: ["覆盖面广", "用户识别度高", "适合作为默认词库"],
        sampleStyle: "更偏日常口语和表达节奏"
      },
      {
        key: "xiangtan",
        name: "湘潭",
        area: "湘潭口语",
        intro: "适合展示近邻城市的词形差异和同义替换能力。",
        strengths: ["邻近地域", "词形差异明显", "便于对比展示"],
        sampleStyle: "适合突出词汇映射"
      },
      {
        key: "zhuzhou",
        name: "株洲",
        area: "株洲口语",
        intro: "适合承载出行、工业和生活类表达，强调实用性。",
        strengths: ["生活场景强", "短句适配高", "便于效果评测"],
        sampleStyle: "更适合高频生活词"
      }
    ],

    recommendedPhrases: [
      "你莫急，先把话讲清楚。",
      "这个意思要怎么用方言说？",
      "先看场景，再选词库版本。",
      "这句转得蛮自然，能直接用。",
      "问路、吃饭、聊天都可以试试。",
      "词库已更新，建议重新跑一遍。",
      "评测结果显示自然度更高了。",
      "这条表达更适合短视频口播。"
    ],

    evaluationRecords: [
      {
        id: "eval-01",
        createdAt: "2026-03-20T09:15:00+08:00",
        mode: "m2h",
        dialect: "changsha",
        scene: "daily",
        source: "你今天去哪里，吃饭了吗？",
        output: "你今朝克哪凯，恰饭哒冇？",
        accuracy: 4.8,
        naturalness: 4.6,
        understandability: 4.7,
        comment: "日常口语命中稳定，整体表达自然。"
      },
      {
        id: "eval-02",
        createdAt: "2026-03-20T14:40:00+08:00",
        mode: "m2h",
        dialect: "xiangtan",
        scene: "campus",
        source: "下课以后去食堂还是图书馆？",
        output: "下堂以后克食堂还是图书馆？",
        accuracy: 4.4,
        naturalness: 4.2,
        understandability: 4.5,
        comment: "校园词条比较集中，适合做场景包模板。"
      },
      {
        id: "eval-03",
        createdAt: "2026-03-21T10:05:00+08:00",
        mode: "h2m",
        dialect: "zhuzhou",
        scene: "travel",
        source: "你克哪凯？地铁站啷个走？",
        output: "你去哪里？地铁站怎么走？",
        accuracy: 4.7,
        naturalness: 4.3,
        understandability: 4.6,
        comment: "问路句式清晰，适合文旅场景。"
      },
      {
        id: "eval-04",
        createdAt: "2026-03-22T19:30:00+08:00",
        mode: "m2h",
        dialect: "changsha",
        scene: "video",
        source: "兄弟们点个赞，马上开播！",
        output: "老弟们点个赞，立马开播咯！",
        accuracy: 4.5,
        naturalness: 4.8,
        understandability: 4.4,
        comment: "短视频语气更强，适合做传播型内容。"
      }
    ],

    stats: {
      totalLexicon: 1286,
      pendingReview: 38,
      dailyConversions: 214,
      evaluationAvgAccuracy: 4.63,
      evaluationAvgNaturalness: 4.41,
      evaluationAvgUnderstandability: 4.58,
      sceneCoverage: 4,
      dialectCoverage: 3,
      reviewPassRate: 0.87
    },

    trendSeries: [
      { label: "Mon", accuracy: 4.2, naturalness: 4.0, understandability: 4.1 },
      { label: "Tue", accuracy: 4.3, naturalness: 4.1, understandability: 4.2 },
      { label: "Wed", accuracy: 4.4, naturalness: 4.2, understandability: 4.4 },
      { label: "Thu", accuracy: 4.5, naturalness: 4.3, understandability: 4.5 },
      { label: "Fri", accuracy: 4.6, naturalness: 4.4, understandability: 4.6 },
      { label: "Sat", accuracy: 4.7, naturalness: 4.5, understandability: 4.7 }
    ]
  };

  window.APP_DATA = APP_DATA;
})();
