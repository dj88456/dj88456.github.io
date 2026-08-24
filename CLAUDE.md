# CLAUDE.md
> 完整原文：`./docs/CLAUDE-full.md`
# personal-site
- *Ask before committing and before pushing
## Layout
## The rule that will bite you
## Design system
- *Type
- *Colour
- *Measure
## Conventions
- No emoji anywhere
- Copy is plain
- Artwork has to mean something
- No fabricated likeness
## Traps this repo has already fallen into
- *A `padding` shorthand wipes out `.wrap`'s inline padding
- *Deleting a page-local `<style>` orphans its markup
- *`.reveal` must fail open
- *`.entry` is a four-column grid (`mark`, content, `cover-thumb`, `aside`).
## Verifying changes
- append `*{transition:none !important}` before measuring anything animated,
- add `.in` to every `.reveal` by hand,
- append a unique query string — the pane caches HTML aggressively and a plain
