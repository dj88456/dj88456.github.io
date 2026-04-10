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
const ICON_MOON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`;
const ICON_SUN = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3"/>
  <line x1="12" y1="21" x2="12" y2="23"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
  <line x1="1" y1="12" x2="3" y2="12"/>
  <line x1="21" y1="12" x2="23" y2="12"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
</svg>`;

const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;
const saved = localStorage.getItem("theme") || "light";
root.setAttribute("data-theme", saved);
if (themeBtn) {
  themeBtn.innerHTML = saved === "dark" ? ICON_SUN : ICON_MOON;
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    themeBtn.innerHTML = next === "dark" ? ICON_SUN : ICON_MOON;
    localStorage.setItem("theme", next);
  });
}

// ── 滚动淡入 ──
const fadeObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
  { threshold: 0.1 }
);
document.querySelectorAll(".fade-in").forEach(el => fadeObserver.observe(el));

// ── 汉堡菜单 + Mega dropdown ──
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function closeAll() {
  if (hamburger) hamburger.classList.remove("open");
  if (navLinks) navLinks.classList.remove("open");
  document.querySelectorAll(".has-dropdown").forEach(d => d.classList.remove("open"));
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Mobile: drop-toggle opens sub-accordion
  navLinks.querySelectorAll(".drop-toggle").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const li = btn.closest(".has-dropdown");
      const isOpen = li.classList.contains("open");
      // Close siblings
      navLinks.querySelectorAll(".has-dropdown").forEach(d => d.classList.remove("open"));
      if (!isOpen) li.classList.add("open");
    });
  });

  // Close hamburger when a non-toggle link is clicked
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      closeAll();
    });
  });

  document.addEventListener("click", e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeAll();
    }
  });
}

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
