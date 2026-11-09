# Yuri artwork

The Agent icon (`agent.icon`) and plugin-card icon (`package.json`'s
`magpie.icon`) embed the same original transparent SVG, without redrawing or recoloring:

- Source: `packages/ui/src/assets/brand/yuri-mark-white.svg` in
  [yee94/yuri](https://github.com/yee94/yuri).
- The unchanged source is included as `assets/yuri.svg`, with no background shapes.
- SHA-256: `b059c19e3a9671572f781258397a2d3ded2cf4dd99a604d61753b9d62cc39e33`.
- Both surfaces use the same SVG data URI; neither needs a network connection.
- Magpie's native `toneCheck` recognizes the white monochrome artwork and draws
  it through `maskSpan` in `currentColor`. This follows the host's light/dark
  theme, including manual overrides, without extra Agent fields, theme listeners
  or system-only SVG media queries.
- `npm run sync:icon` regenerates the two embedded copies from the source SVG;
  installation requires no build step. Tests verify byte equality and provenance.

The source repository's MIT license is reproduced in `LICENSE-YURI`.
