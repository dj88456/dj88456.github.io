# personal-site

Alex Dai's personal site. Plain static HTML, CSS and JS — **no build step, no
package.json, no framework.** The git remote is `dj88456/dj88456.github.io`,
so a push to `main` publishes straight to GitHub Pages.

**Ask before committing and before pushing.** Pushing is a deploy.

## Layout

15 pages, all hand-written, all sharing one stylesheet and three scripts.

```
index.html                     home — signature, hero diagram, figures,
                               projects, writing, dark stack band, closing call
work.html  writing.html        the two index pages
experience.html  about.html  contact.html  resume.html
projects/{devflow,insightboard,chatcontext,designtoken}.html
articles/{lowcode,llm-rag,performance,growth}.html
css/shared.css                 the entire design system, one file
js/main.js                     theme, mobile menu, reveal, header shadow, progress bar
js/icons.js                    stroke icon set, injected into [data-icon]
js/covers.js                   schematic cover art, injected into [data-cover]
favicon.svg                    the gradient mark, same as the header wordmark
```

Page filenames under `projects/` and `articles/` are historical and do **not**
match their titles (`devflow.html` is the Azure Landing Zone, `llm-rag.html` is
the Exchange migration). Don't rename them — inbound links may exist.

Nav and footer are duplicated in every page on purpose. When you change one,
change all 15; a small Node script over the file list is the reliable way.

## The rule that will bite you

`css/shared.css`, `js/main.js`, `js/icons.js` and `js/covers.js` are linked with
a `?v=<date>` query in every page. **Bump it on every change to those files**, or
returning visitors get a stale stylesheet. One regex pass over the three
`src=`/`href=` attributes across all 15 pages does it.

## Design system

Everything lives in `css/shared.css`. There are no page-local `<style>` blocks
any more, and there should not be new ones.

**Type.** Headings and the wordmark are Cabinet Grotesk (Fontshare's own free
CDN — *not* on Google Fonts). Body is Plus Jakarta Sans, labels and dates are
Geist Mono, and the name on the home page is Caveat set as a signature (both
Google). Two font hosts means two sets of `<link rel="preconnect">` in every
head.

**Colour.** Light is the default theme; the choice is remembered in
`localStorage` and applied by an inline script in `<head>` so there is no flash.
Seven subject hues (`blue teal indigo green orange pink purple`) are selected
with a `data-hue` attribute on any container — it rebinds `--accent` for that
subtree, which drives icon frames, tags, hover states and section markers. Each
project and article owns one hue and keeps it everywhere it appears.

**Measure.** `--w-prose: 36rem` puts long-form copy at ~74 characters per full
line. It was 42rem and running at 86, which is too long. Don't widen it without
re-measuring.

## Conventions

- **No emoji anywhere.** Icons are the SVG set in `js/icons.js`.
- **Copy is plain.** State what the work was. No aphorisms, no clever section
  headings, no paragraph that closes on a turn of phrase — section headings are
  the section's name. This was a specific, repeated request.
- **Artwork has to mean something.** Every cover in `js/covers.js` is a
  schematic of the thing it sits above. A previous version had a bar chart whose
  heights encoded nothing; it was replaced with a real timeline. Don't add
  decoration that only looks technical — no fake coordinates, no invented
  telemetry.
- **No fabricated likeness.** About carries no portrait at all — the drawn
  stand-in card was removed on the user's instruction, and inventing a face is
  not an option. Don't reintroduce a placeholder; only a real photograph the
  user supplies belongs there.

## Traps this repo has already fallen into

**A `padding` shorthand wipes out `.wrap`'s inline padding.** `section.band` set
`padding: X 0`, which beat `.wrap { padding: 0 var(--pad) }` on specificity, so
every list section ran to the screen edge on a phone. Use `padding-block`.

**Deleting a page-local `<style>` orphans its markup.** The old per-page style
blocks were consolidated into `shared.css`, and twice something was left behind
with no rules at all — the RBAC table in `articles/performance.html`, and the
`.career-timeline` in `articles/growth.html`. If you remove styles from a page,
grep its class names against `shared.css` first.

**`.reveal` must fail open.** Content starts at `opacity: 0` and is revealed by
an IntersectionObserver. `main.js` carries a one-second failsafe that shows
everything if the observer produced nothing, plus an `@media (scripting: none)`
rule. Keep both — without them a JS failure renders a blank page.

**`.entry` is a four-column grid** (`mark`, content, `cover-thumb`, `aside`).
Adding a child puts it in the wrong slot; the thumbnail has to sit between the
content span and `.entry-aside` in source order.

## Verifying changes

The embedded browser pane is often hidden, and when it is: screenshots time out,
`requestAnimationFrame` never fires, IntersectionObserver never fires, CSS
transitions never advance, and `document.documentElement.clientWidth` reads 0 —
so any measurement taken against the live pane is garbage.

What works instead: load each page into a **fixed-width iframe**, then

- append `*{transition:none !important}` before measuring anything animated,
- add `.in` to every `.reveal` by hand,
- append a unique query string — the pane caches HTML aggressively and a plain
  reload will silently serve the previous version.

Check per page: horizontal overflow at 375 and 1280, no leftover
`i[data-icon]`, every visible `[data-cover]` has an `svg` with real height, and
`data-theme` is what you expect.
