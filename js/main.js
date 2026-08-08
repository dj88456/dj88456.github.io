// ── Theme ──────────────────────────────────────────────────
// Light by default; whichever the visitor picks is remembered.
const root = document.documentElement;
const themeMeta = document.getElementById("themeColorMeta");
const PAPER = { light: "#fbfbfd", dark: "#0a0a0c" };

const ICON = `<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
  <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.2"/>
  <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor"/>
</svg>`;

function applyTheme(t) {
  root.setAttribute("data-theme", t);
  if (themeMeta) themeMeta.setAttribute("content", PAPER[t]);
}

applyTheme(localStorage.getItem("theme") === "dark" ? "dark" : "light");

const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.innerHTML = ICON;
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

// ── Mobile menu ────────────────────────────────────────────
const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    const open = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", e => {
    if (!siteNav.contains(e.target) && !menuBtn.contains(e.target)) {
      siteNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      siteNav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// ── Reveal on scroll ───────────────────────────────────────
// The animation is decoration; the content must never depend on it.
// If the observer has produced nothing after a second, show everything.
const revealables = [...document.querySelectorAll(".reveal")];
const showAll = () => revealables.forEach(el => el.classList.add("in"));

if (revealables.length) {
  if (!("IntersectionObserver" in window)) {
    showAll();
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        obs.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    revealables.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`;
      io.observe(el);
    });

    setTimeout(() => {
      if (!revealables.some(el => el.classList.contains("in"))) showAll();
    }, 1000);
  }
}

// ── Header shadow once the page has scrolled ───────────────
const head = document.querySelector(".site-head");
if (head) {
  let ticking = false;
  const sync = () => {
    head.classList.toggle("scrolled", window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(sync);
  }, { passive: true });
  sync();
}

// ── Reading progress (article pages) ───────────────────────
const bar = document.getElementById("progress-bar");
if (bar) {
  const update = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    bar.style.width = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 + "%" : "0%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}
