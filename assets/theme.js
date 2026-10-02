(function () {
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  let preference = null;
  try { preference = localStorage.getItem("xiangyantong-theme"); } catch (_) { /* Storage may be unavailable. */ }
  function apply() {
    const dark = preference ? preference === "dark" : system.matches;
    root.dataset.theme = dark ? "dark" : "light";
    document.querySelectorAll(".theme-toggle").forEach(button => {
      button.textContent = dark ? "浅色外观" : "深色外观";
      button.setAttribute("aria-label", dark ? "切换为浅色外观" : "切换为深色外观");
    });
  }
  apply();
  system.addEventListener("change", apply);
  document.addEventListener("DOMContentLoaded", () => {
    apply();
    document.querySelectorAll(".theme-toggle").forEach(button => button.addEventListener("click", () => {
      preference = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("xiangyantong-theme", preference); } catch (_) { /* Session-only theme is enough. */ }
      apply();
    }));
  });
  let toastTimer;
  window.showUiMessage = function (message) {
    let toast = document.querySelector(".ui-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "ui-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  };
  window.copyUiText = async function (text) {
    if (!text.trim()) return window.showUiMessage("先输入一句话，生成转换结果。");
    try { await navigator.clipboard.writeText(text); window.showUiMessage("已复制转换结果"); }
    catch (_) { window.showUiMessage("暂时无法复制，请选中结果手动复制。"); }
  };
})();
