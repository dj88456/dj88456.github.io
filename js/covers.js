// ── Cover artwork ──────────────────────────────────────────
// One drawing per project and article, each a schematic of the thing
// it sits above rather than decoration. Inline SVG so it inherits the
// page's accent hue and themes with it.
// Usage: <div data-cover="landing-zone"></div>

const box = (x, y, w, h, cls = "c-box") =>
  `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;

const COVERS = {
  /* management groups → subscriptions → hub and spoke */
  "landing-zone": `
    <g class="c-line">
      <path d="M96 62v22M96 84H40v18M96 84h56v18M96 84v18"/>
      <path d="M300 96h44M420 96h-32M420 96h44M420 62v22M420 130v-22"/>
      <path d="M376 96h-32"/>
    </g>
    ${box(70, 40, 52, 22, "c-box c-fill")}
    ${box(16, 102, 48, 22)}
    ${box(72, 102, 48, 22)}
    ${box(128, 102, 48, 22)}
    <g class="c-line c-dash"><path d="M196 82h84"/></g>
    ${box(344, 74, 52, 44, "c-box c-fill")}
    ${box(456, 84, 40, 24)}
    ${box(400, 30, 40, 24)}
    ${box(400, 138, 40, 24)}
    <g class="c-dot">
      <circle cx="370" cy="96" r="5"/>
    </g>
    <g class="c-label">
      <text x="96" y="30">management groups</text>
      <text x="96" y="140">subscriptions</text>
      <text x="420" y="182">hub and spoke</text>
    </g>`,

  /* on-premises → waves → cloud */
  migration: `
    ${box(24, 62, 66, 68)}
    <g class="c-line">
      <path d="M36 80h42M36 96h42M36 112h42"/>
    </g>
    <g class="c-wave">
      <rect x="118" y="112" width="20" height="18" rx="2"/>
      <rect x="146" y="104" width="20" height="26" rx="2"/>
      <rect x="174" y="94"  width="20" height="36" rx="2"/>
      <rect x="202" y="86"  width="20" height="44" rx="2"/>
      <rect x="230" y="78"  width="20" height="52" rx="2"/>
      <rect x="258" y="72"  width="20" height="58" rx="2"/>
      <rect x="286" y="68"  width="20" height="62" rx="2"/>
      <rect x="314" y="64"  width="20" height="66" rx="2"/>
    </g>
    <g class="c-line c-dash"><path d="M96 96h16M340 96h20"/></g>
    <g class="c-line c-accent">
      <path d="M366 96a44 44 0 0 1 44-30 34 34 0 0 1 8 66h-52a20 20 0 0 1 0-36"/>
    </g>
    <g class="c-label">
      <text x="57" y="150">exchange 2016</text>
      <text x="226" y="150">eight weekly waves</text>
      <text x="404" y="150">exchange online</text>
    </g>`,

  /* dev → test → prod, with reporting hanging off it */
  platform: `
    ${box(30, 56, 96, 52)}
    ${box(178, 56, 96, 52)}
    ${box(326, 56, 96, 52, "c-box c-fill")}
    <g class="c-line"><path d="M126 82h44M274 82h44"/></g>
    <g class="c-dot"><circle cx="152" cy="82" r="4"/><circle cx="300" cy="82" r="4"/></g>
    <g class="c-line c-dash"><path d="M374 108v26h-84"/></g>
    <g class="c-wave">
      <rect x="240" y="140" width="12" height="20" rx="1.5"/>
      <rect x="258" y="130" width="12" height="30" rx="1.5"/>
      <rect x="276" y="146" width="12" height="14" rx="1.5"/>
    </g>
    <g class="c-label">
      <text x="78" y="40">dev</text>
      <text x="226" y="40">test</text>
      <text x="374" y="40">production</text>
      <text x="264" y="178">power bi</text>
    </g>`,

  /* twelve properties, one core */
  sites: `
    <g class="c-line">
      <path d="M226 96 82 52M226 96 82 96M226 96 82 140M226 96 370 52M226 96 370 96M226 96 370 140"/>
    </g>
    ${box(196, 74, 60, 44, "c-box c-fill")}
    <g class="c-box">
      <rect x="46" y="40" width="26" height="24" rx="2"/><rect x="46" y="84" width="26" height="24" rx="2"/>
      <rect x="46" y="128" width="26" height="24" rx="2"/>
      <rect x="8"  y="40" width="26" height="24" rx="2"/><rect x="8"  y="84" width="26" height="24" rx="2"/>
      <rect x="8"  y="128" width="26" height="24" rx="2"/>
      <rect x="380" y="40" width="26" height="24" rx="2"/><rect x="380" y="84" width="26" height="24" rx="2"/>
      <rect x="380" y="128" width="26" height="24" rx="2"/>
      <rect x="418" y="40" width="26" height="24" rx="2"/><rect x="418" y="84" width="26" height="24" rx="2"/>
      <rect x="418" y="128" width="26" height="24" rx="2"/>
    </g>
    <g class="c-label">
      <text x="226" y="146">site-to-site vpn</text>
      <text x="226" y="30">twelve properties</text>
    </g>`,

  /* nested privilege tiers */
  rbac: `
    <g class="c-line">
      <rect x="60" y="26" width="332" height="140" rx="4"/>
      <rect x="106" y="46" width="240" height="100" rx="4"/>
      <rect x="152" y="66" width="148" height="60" rx="4"/>
    </g>
    ${box(196, 84, 60, 24, "c-box c-fill")}
    <g class="c-dot">
      <circle cx="86"  cy="96" r="4"/><circle cx="132" cy="96" r="4"/><circle cx="178" cy="96" r="4"/>
    </g>
    <g class="c-label">
      <text x="226" y="18">reader</text>
      <text x="226" y="186">contributor · owner · pim</text>
    </g>`,

  /* the actual sequence of roles, with the two employers behind it —
     a timeline, not a bar chart of nothing */
  steps: {
    vb: "0 0 560 176",
    art: `
      ${box(30, 34, 92, 22)}
      ${box(130, 34, 400, 22, "c-box c-fill")}

      <g class="c-line c-dash"><path d="M30 116h500"/></g>
      <g class="c-line">
        <path d="M56 116V96M168 116V96M280 116V96M392 116V96M496 116V96"/>
      </g>
      <g class="c-dot">
        <circle cx="56"  cy="116" r="5"/><circle cx="168" cy="116" r="5"/>
        <circle cx="280" cy="116" r="5"/><circle cx="392" cy="116" r="5"/>
        <circle cx="496" cy="116" r="5"/>
      </g>

      <g class="c-label">
        <text x="76"  y="49">sunrise</text>
        <text x="330" y="49">wcb-alberta</text>

        <text x="56"  y="88">team lead</text>
        <text x="168" y="88">it specialist</text>
        <text x="280" y="88">specialist ii</text>
        <text x="392" y="88">it architect</text>
        <text x="496" y="88">architect ii</text>

        <text x="56"  y="142">2017</text>
        <text x="168" y="142">2019</text>
        <text x="280" y="142">2020</text>
        <text x="392" y="142">2022</text>
        <text x="496" y="142">2023</text>
      </g>`,
  },
};

/* three ways to reach a person, drawn the way the page lists them */
COVERS.reach = `
  <g class="c-line">
    <path d="M136 96h44M180 96V50h60M180 96h60M180 96v46h60"/>
  </g>
  ${box(66, 74, 60, 44, "c-box c-fill")}
  ${box(240, 32, 84, 36)}
  ${box(240, 78, 84, 36)}
  ${box(240, 124, 84, 36)}
  <g class="c-dot"><circle cx="180" cy="96" r="4"/></g>
  <g class="c-label">
    <text x="96" y="140">edmonton</text>
    <text x="282" y="55">email</text>
    <text x="282" y="101">linkedin</text>
    <text x="282" y="147">github</text>
  </g>`;

document.querySelectorAll("[data-cover]").forEach(node => {
  const entry = COVERS[node.dataset.cover];
  if (!entry) return;
  const { vb = "0 0 452 196", art } =
    typeof entry === "string" ? { art: entry } : entry;

  const holder = document.createElement("div");
  holder.innerHTML =
    `<svg class="cover-art" viewBox="${vb}" fill="none" ` +
    `preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">` +
    art +
    `</svg>`;
  node.appendChild(holder.firstElementChild);
});
