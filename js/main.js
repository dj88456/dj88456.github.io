// ── 阅读进度条 ──
const bar = document.getElementById("progress-bar");
if (bar) {
  window.addEventListener("scroll", () => {
    const doc = document.documentElement;
    const pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = pct + "%";
  });
}

// ── 暗色模式 ──
const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;
const saved = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", saved);
if (themeBtn) {
  themeBtn.textContent = saved === "dark" ? "☀️" : "🌙";
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    themeBtn.textContent = next === "dark" ? "☀️" : "🌙";
    localStorage.setItem("theme", next);
  });
}

// ── 滚动淡入 ──
const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
  { threshold: 0.1 }
);
document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));

// ── 技能条动画 ──
const skillBars = document.getElementById("skillBars");
if (skillBars) {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".skill-bar-fill").forEach(b => {
          b.style.width = b.dataset.width + "%";
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  barObserver.observe(skillBars);
}
