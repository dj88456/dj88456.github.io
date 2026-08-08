// ── Inline SVG icon set ────────────────────────────────────
// Stroke icons on a 24×24 grid, drawn in currentColor.
// Usage: <i data-icon="cloud"></i>  →  replaced with inline <svg>.
// Decorative only — nothing here carries meaning the text doesn't.

const PATHS = {
  cloud:    '<path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 11.3 3.5 3.5 0 0 0 7 19z"/>',
  mail:     '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
  chart:    '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  shield:   '<path d="M12 3l7 3v5.5c0 4-2.9 7.7-7 9-4.1-1.3-7-5-7-9V6z"/><path d="m9.5 12 1.8 1.8L15 10"/>',
  network:  '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="19" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="M12 7.2v4.3M12 11.5 6 16.9M12 11.5l6 5.4"/>',
  server:   '<rect x="3" y="4" width="18" height="7" rx="1.2"/><rect x="3" y="13" width="18" height="7" rx="1.2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  database: '<ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3"/>',
  lock:     '<rect x="4.5" y="10.5" width="15" height="10" rx="1.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="m7 9.5 3 2.5-3 2.5M13 15h4"/>',
  layers:   '<path d="m12 3 8.5 4.5L12 12 3.5 7.5z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5"/>',
  branch:   '<circle cx="7" cy="5" r="2.2"/><circle cx="7" cy="19" r="2.2"/><circle cx="17" cy="9" r="2.2"/><path d="M7 7.2v9.6M17 11.2c0 3.2-3 3.4-5 4.2"/>',
  activity: '<path d="M2 12h4l3 8 6-16 3 8h4"/>',
  globe:    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>',
  cpu:      '<rect x="7" y="7" width="10" height="10" rx="1"/><path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3"/>',
  key:      '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3.5M15.5 12v2.5"/>',
  users:    '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.5a3.2 3.2 0 0 1 0 6.2M17.5 20a6.4 6.4 0 0 0-2.2-4.8"/>',
  compass:  '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 6.5V12l3.5 2"/>',
  pin:      '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  pen:      '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M15.5 5.5l3 3"/>',
  book:     '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v18H5.5A1.5 1.5 0 0 1 4 19.5z"/><path d="M8 3v18"/>',
  github:   '<path d="M9 19c-4 1.3-4-2.2-6-2.7m12 5.2v-3.6a3.1 3.1 0 0 0-.9-2.4c2.9-.3 6-1.4 6-6.4a5 5 0 0 0-1.4-3.4 4.6 4.6 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.6 0C5.9 1.9 4.8 2.2 4.8 2.2a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 3.3 9.1c0 5 3.1 6.1 6 6.4a3.1 3.1 0 0 0-.9 2.4V21.5"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10v7M7.5 7.2v.01M11.5 17v-4a2.5 2.5 0 0 1 5 0v4"/>',
  arrow:    '<path d="M6 18 18 6M9 6h9v9"/>',
};

const ICON_ATTRS =
  'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ' +
  'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

document.querySelectorAll("[data-icon]").forEach(node => {
  const body = PATHS[node.dataset.icon];
  if (!body) return;
  const cls = ["icon", ...node.classList].join(" ");
  const holder = document.createElement("div");
  holder.innerHTML = `<svg class="${cls}" ${ICON_ATTRS}>${body}</svg>`;
  node.replaceWith(holder.firstElementChild);
});
