# Yeti inspiration notes

**Date:** 2026-09-12
**Purpose:** Joe's bookmarked resources and design thoughts, summarized for the planning phases. These are our own notes; the underlying sources are linked, not reproduced.

## Local reference archives (licensed, personal use)

Two paid resources are archived locally, outside this repo. They are for reading and consulting during design, not for copying.

- Every Layout (Heydon Pickering, Andy Bell): `~/Developer/every-layout/`. The layout primitive catalogue that the brief names as the philosophical base for §4 of the architecture spec.
- Complete CSS (Piccalilli): `~/Developer/complete-css/`. A 51-lesson course on CSS architecture, fluid type and space, composition, and progressive enhancement.

Rule: techniques and concepts inform our design; every line of prose and CSS that ships in Yeti is written from scratch. Never commit either archive or quote from it in docs.

## Decisions taken from Joe's notes

1. **Layout names are ours.** Every Layout's primitives are the starting point for what to build, and their intent-based naming is the model for how to name. We choose our own names for each, and reuse an Every Layout name only where it is truly the best or only option. Naming is a phase 2 deliverable, decided per primitive with the reason recorded in its manifest description.
2. **oklch stays.** The perceptual uniformity and the clean derivation of tints and shades outweigh the unfamiliar numbers. Mitigation is in the docs: the theming guide explains lightness, chroma, and hue in one short section with a visual, and every palette token shows its hex equivalent in a comment so people can map it to what they know.
3. **The reset is researched, not inherited.** Many authors publish resets with one distinctive twist each. Phase 1 synthesizes them (see the companion research file) into a reset that is protective rather than opinionated, and records why each rule is there.

## Bookmarks

### graffiti-ui.com

A minimal CSS toolkit, zero JavaScript, native-HTML-first: `dialog`, `details`, and popover before any script. Styles unclassed semantic elements by default, with classes as opt-in. Uses `light-dark()`, oklch, container queries, and scroll-snap. Four documentation tiers: base, utilities, elements, UI blocks.

Worth taking:
- **A public token contract.** Tokens are marked public or internal. Public ones are the theming API and are documented; internal derived tokens are implementation detail and may change. Our manifest should carry the same flag on each token so the docs and the MCP server only advertise what is safe to override.
- **Sensible bare-element styling.** Semantic HTML with no classes should already look coherent. That is in our base layer and worth stating as a promise in the docs.
- Confirms the same bets we are making: native-first interactivity, `light-dark()`, oklch, no build.

### blog.master.dev, The Coyier CSS Starter

Chris Coyier's personal starter sheet: not a reset, an "opinionated starter" of things he almost wishes were browser defaults. All inside `@layer`, logical properties only, no custom properties, light.

Rules to weigh for our reset and base layers:
- `color-scheme: light dark` on the root, unlocking `light-dark()`.
- Fluid root font with `clamp()`, in a system font stack, keeping user font-size preferences intact.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body text, a max measure in `ch`.
- Media elements: `max-inline-size: 100%` and `block-size: auto`.
- Forms inherit typography, labels are block, text inputs fill the row, buttons use `Canvas` and `CanvasText` system colors.
- Focus visible via `outline-offset`; `[hidden]` honoured; a screen-reader-only utility.
- View transitions and smooth scrolling gated behind `prefers-reduced-motion: no-preference`.
- Table captions at the bottom, collapsed borders, and the accessible scroll-region pattern.

His line between reset and starter is useful for us: reset removes hazards; base adds defaults. We keep those in separate sublayers.

### a11ymyths.com

Twenty-two myths with corrections. The ones that translate into framework defaults or docs:
- Automated tools find only a fraction of issues, so our axe pass in CI is a floor, not a pass mark. Keyboard and screen-reader checks stay in the fixture tests.
- Semantic HTML first, ARIA as supplement. Matches §7 of the spec: state is native or ARIA, never invented.
- Accessibility is cheapest when designed in. Our per-component `a11y` manifest block is the mechanism.
- Overlays do not fix anything. The docs should say so plainly where we discuss accessibility.
- It benefits everyone. Worth a paragraph in the accessibility guide, since the framework's target audience builds client sites and needs the argument for their clients.

Docs deliverable for phase 5: an accessibility guide that covers focus styles, hiding content correctly, contrast, motion preferences, and the ARIA-versus-semantics rule, with the framework's defaults for each.
