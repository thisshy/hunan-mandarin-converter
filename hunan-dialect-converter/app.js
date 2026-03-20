const STORAGE_KEY = "hunan_lexicon_v2";

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
  "什么": "么子",
  "哪里": "哪凯",
  "这儿": "这凯",
  "那儿": "那凯",
  "怎么": "啷个",
  "为什么": "做么子",
  "干什么": "搞么子",
  "干嘛": "搞么子",
  "是不是": "是啵",
  "不是": "不是咯",
  "不要": "莫",
  "不": "莫",
  "没有": "冒得",
  "没得": "冒得",
  "有": "有咯",
  "知道": "晓得",
  "明白": "门清",
  "好": "蛮好",
  "很好": "蛮灵泛",
  "不错": "还蛮扎实",
  "厉害": "霸蛮",
  "漂亮": "标致",
  "聪明": "灵醒",
  "傻": "哈戳戳",
  "小气": "抠搜",
  "麻烦": "恼火",
  "生气": "冒火",
  "开心": "欢喜",
  "难受": "作孽",
  "尴尬": "蛮拐",
  "舒服": "巴适得很",
  "饿": "肚子咕咕叫",
  "吃饭": "恰饭",
  "喝水": "喝口水先",
  "聊天": "扯白",
  "说话": "港话",
  "骗人": "扯卵谈",
  "开玩笑": "打哈哈",
  "吹牛": "扯卵筋",
  "吵架": "呷架",
  "打架": "搞架",
  "快点": "搞快点",
  "慢一点": "慢点搞",
  "马上": "立马",
  "现在": "而家",
  "刚刚": "哈子",
  "等一下": "等哈子",
  "今天": "今朝",
  "昨天": "昨朝",
  "明天": "明朝",
  "早上": "清早八晨",
  "中午": "晌午",
  "晚上": "夜里头",
  "回家": "归屋",
  "出去": "出去耍",
  "进来": "进来咯",
  "走": "走起",
  "来": "来咯",
  "去": "切",
  "看": "瞄",
  "听": "听哈",
  "想": "想得起",
  "喜欢": "稀罕",
  "讨厌": "烦得很",
  "爱": "疼你",
  "朋友": "老倌",
  "兄弟": "老弟",
  "姐妹": "姊妹伙",
  "小伙子": "伢子",
  "男孩子": "细伢子",
  "女孩子": "妹陀",
  "孩子": "崽崽",
  "老人": "老倌子",
  "老师": "先生",
  "老板": "老细",
  "同事": "搭子",
  "同学": "同窗",
  "工作": "做事",
  "上班": "做工",
  "下班": "散工",
  "上学": "读书去",
  "学习": "搞学习",
  "考试": "赶考",
  "问题": "岔子",
  "办法": "路数",
  "可能": "怕是",
  "可以": "要得",
  "不行": "要不得",
  "行": "行得通",
  "非常": "蛮扎实",
  "有点": "有滴",
  "一点": "滴点",
  "很多": "蛮多",
  "全部": "一哈子",
  "经常": "老是",
  "偶尔": "间或",
  "真的": "港真",
  "真的吗": "港真啵",
  "假的": "鬼扯",
  "事情": "事体",
  "消息": "信儿",
  "味道": "口味",
  "辣": "辣得跳",
  "甜": "甜滋滋",
  "咸": "咸口",
  "便宜": "划算",
  "贵": "贵得很",
  "排队": "扎堆等",
  "堵车": "塞车",
  "下雨": "落雨",
  "刮风": "起风",
  "天气": "天色",
  "累": "困得慌",
  "困": "瞌睡来了",
  "睡觉": "困觉",
  "起床": "起铺",
  "洗澡": "冲凉",
  "洗衣服": "洗衫",
  "手机": "电话机",
  "电脑": "机子",
  "网络": "网路",
  "直播": "开播",
  "视频": "片片",
  "照片": "相片子",
  "玩": "耍",
  "逛街": "上街耍",
  "买东西": "买家伙",
  "不靠谱": "不登对",
  "别担心": "莫急莫慌",
  "谢谢": "多谢咯",
  "没关系": "冒关系",
  "再见": "回见",
  "赶紧": "麻利点",
  "太好了": "好得板",
  "真离谱": "太拐哒",
  "别说了": "莫港哒",
  "好吃": "好恰",
  "难吃": "不好恰"
};

let lexicon = loadLexicon();
let mode = "m2h";

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

function replaceByDictionary(text, dictionary) {
  let output = text;
  const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  keys.forEach((key) => {
    output = output.replace(new RegExp(escapeRegex(key), "g"), dictionary[key]);
  });
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
    ? replaceByDictionary(source, lexicon)
    : replaceByDictionary(source, reverseLexicon);
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
    inputText.placeholder = "例如：你咯今朝去哪凯？恰饭冒得？";
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
