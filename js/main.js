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
const ICON_MOON = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M2.9 0.9A6.5 6.5 0 0 0 13.1 11.1 6.5 6.5 0 1 1 2.9 0.9z" fill="currentColor"/>
</svg>`;
const ICON_SUN = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <circle cx="7.5" cy="7.5" r="2.8"/>
  <line x1="7.5" y1="0.8" x2="7.5" y2="2.3"/>
  <line x1="7.5" y1="12.7" x2="7.5" y2="14.2"/>
  <line x1="0.8" y1="7.5" x2="2.3" y2="7.5"/>
  <line x1="12.7" y1="7.5" x2="14.2" y2="7.5"/>
  <line x1="2.9" y1="2.9" x2="3.95" y2="3.95"/>
  <line x1="11.05" y1="11.05" x2="12.1" y2="12.1"/>
  <line x1="12.1" y1="2.9" x2="11.05" y2="3.95"/>
  <line x1="3.95" y1="11.05" x2="2.9" y2="12.1"/>
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
