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

let lexicon = loadLexicon();
let mode = "m2h";
const pinyinCache = new Map();

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

function createReverseMap(source) {
  const result = {};
  Object.entries(source).forEach(([mandarin, hunan]) => {
    result[hunan] = mandarin;
  });
  return result;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

function replaceByDictionaryWithPinyinFallback(text, dictionary) {
  const entries = buildEntries(dictionary);
  let index = 0;
  let output = "";

  while (index < text.length) {
    let matched = false;

    for (const entry of entries) {
      const segment = text.slice(index, index + entry.length);
      if (segment.length !== entry.length) continue;

      if (segment === entry.key) {
        output += entry.value;
        index += entry.length;
        matched = true;
        break;
      }

      if (!entry.pinyin || !isChineseText(segment)) continue;
      const segmentPinyin = getPinyinNormalized(segment);
      if (segmentPinyin && isPinyinNear(segmentPinyin, entry.pinyin)) {
        output += entry.value;
        index += entry.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      output += text[index];
      index += 1;
    }
  }

  return output;
}

function convert() {
  const source = inputText.value.trim();
  if (!source) {
    outputText.value = "";
    return;
  }

  const reverseLexicon = createReverseMap(lexicon);
  outputText.value = mode === "m2h"
    ? replaceByDictionaryWithPinyinFallback(source, lexicon)
    : replaceByDictionaryWithPinyinFallback(source, reverseLexicon);
}

function syncLabels() {
  if (mode === "m2h") {
    modeLabel.textContent = "普通话 → 湖南方言";
    inputLabel.textContent = "输入（普通话）";
    outputLabel.textContent = "输出（湖南方言）";
    inputText.placeholder = "例如：你今天去哪里？吃饭了吗？";
  } else {
    modeLabel.textContent = "湖南方言 → 普通话";
    inputLabel.textContent = "输入（湖南方言）";
    outputLabel.textContent = "输出（普通话）";
    inputText.placeholder = "例如：你咯今朝克哪凯？恰饭冒得？";
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
        <span>${mandarin}</span>
        <span>${hunan}</span>
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

  lexicon[mandarin] = hunan;
  saveLexicon();
  renderEntries();
  convert();

  mandarinInput.value = "";
  hunanInput.value = "";
  mandarinInput.focus();
}

function removeEntry(event) {
  const button = event.target.closest(".entry-delete");
  if (!button) return;
  const key = decodeURIComponent(button.dataset.key || "");
  if (!key || !lexicon[key]) return;

  delete lexicon[key];
  saveLexicon();
  renderEntries();
  convert();
}

function exportLexicon() {
  const blob = new Blob([JSON.stringify(lexicon, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hunan-lexicon.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
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
      saveLexicon();
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
  saveLexicon();
  renderEntries();
  convert();
}

swapBtn.addEventListener("click", () => {
  mode = mode === "m2h" ? "h2m" : "m2h";
  inputText.value = "";
  outputText.value = "";
  syncLabels();
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
searchInput.addEventListener("input", renderEntries);
exportBtn.addEventListener("click", exportLexicon);
importBtn.addEventListener("click", () => importFile.click());
importFile.addEventListener("change", () => {
  const file = importFile.files && importFile.files[0];
  if (file) importLexiconFromFile(file);
});
resetBtn.addEventListener("click", resetLexicon);

syncLabels();
renderEntries();
