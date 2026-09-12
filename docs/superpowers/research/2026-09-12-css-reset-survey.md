# CSS reset survey

**Date:** 2026-09-12
**Purpose:** Input to the phase 1 reset. Surveys published resets, tabulates consensus, and draws the line between reset (undo surprising UA defaults) and base styling (design decisions). Yeti's reset is written from this synthesis, with every rule carrying its reason; nothing here is copied verbatim.
**Confidence:** Andy Bell, Comeau, Elly Loel, Coyier, sanitize.css, and modern-normalize were read from source. Open Props and Tailwind Preflight are from fetch-tool summaries. Keith J. Grant's post could not be fetched and is excluded.

## Sources

| Reset | Stated goal | Distinctive rules | Obsolete under Baseline 2025 |
|---|---|---|---|
| Andy Bell, "A (more) Modern CSS Reset" (piccalil.li) | Sensible minimal defaults | `text-size-adjust: none`; only `margin-block-end: 0` on body and headings so block-start survives; `ul[role='list']` scoping so list semantics are only stripped where the author signals it; `text-wrap: balance` on headings; `textarea:not([rows])` min-height; `:target { scroll-margin-block: 5ex }` | none |
| Josh Comeau, "My Custom CSS Reset" | Fix personal pain points | `*:not(dialog) { margin: 0 }` so dialog's native centering survives; `interpolate-size: allow-keywords` behind reduced-motion; `-webkit-font-smoothing: antialiased`; `#root, #__next { isolation: isolate }` | font-smoothing (macOS changed OS-wide in 2018); the `#root` rule is app-specific |
| Elly Loel | Synthesis of Comeau, Bell, Argyle with `:where()` everywhere | Fluid line-height `calc(0.25rem + 1em + 0.25rem)` on `*`; blanket border and background reset except fieldset, progress, meter; SVG fill and stroke defaults; `cursor: pointer` and `touch-action: manipulation` on interactive elements; `user-select: none` on buttons; removed `scrollbar-gutter: stable` pending a Chromium bug | the cursor and user-select rules are UX opinion, not reset |
| Kevin Powell (fork of Bell's original) | Teaching-friendly minimal reset | `html, body { overflow-x: hidden }`; unguarded `scroll-behavior: smooth`; `text-rendering: optimizeSpeed` | optimizeSpeed is a legacy perf hack; unguarded smooth scroll is an accessibility regression |
| Chris Coyier, "The Coyier CSS Starter" | An opinionated starter, explicitly not a reset, all in `@layer`, logical properties only | `color-scheme: light dark`; `field-sizing: content` on textarea; `@view-transition { navigation: auto }` behind reduced-motion; `Canvas` and `CanvasText` system colors for buttons; `input:not(:where([type=submit], …)) { inline-size: 100% }`; `label:has(input[disabled])` | none; most forward-leaning source |
| Open Props normalize | Theme-aware normalize paired with Open Props tokens | Imports theme and brand, then a `prefers-color-scheme: dark` block recolors form controls, dialog surfaces, placeholder | wrong shape for a neutral reset; presumes a token system |
| Tailwind Preflight v4 | Aggressive reset so utilities behave predictably | Removes all margins on every element; strips button and input backgrounds, radius, appearance; bundles system font stacks; relies on `@layer base` rather than `:where()` | keeps iOS and Safari fixes (tap highlight, date and time inputs) that are still needed |
| sanitize.css v13 | Best-practice defaults plus browser-bug fixes, `:where()` throughout | `nav li::before { content: "\200B"; float: left }` to keep VoiceOver list semantics when list-style is removed; `fieldset { border: 1px solid #a0a0a0 }`; `[aria-busy="true"] { cursor: progress }`; `[aria-hidden="false"][hidden]` handling | `-moz-tab-size` prefix and duplicated `text-size-adjust` lines are redundant |
| modern-normalize v3 | normalize.css minus IE and old Edge | Non-inherited `box-sizing` on `*, ::before, ::after` (cites OddBird); `tab-size: 4`; system font stack baked in; WebKit spin-button, search-decoration, file-upload fixes | the WebKit fixes are still needed for desktop Safari |

No 2025 or 2026 reset with verifiable traction surfaced. Searches returned content-farm articles without an identifiable author, excluded.

## Consensus table

Rule presence across the nine resets. Partial means scoped or a different value.

| Rule | Bell | Comeau | Loel | Powell | Coyier | Open Props | Tailwind | sanitize | modern-norm |
|---|---|---|---|---|---|---|---|---|---|
| `box-sizing: border-box` universal | yes | yes | yes | yes | yes | ? | yes | yes | yes |
| Margin reset (broad) | partial | yes | yes | yes | partial | ? | all | body only | body only |
| Body `line-height: 1.5` | yes | yes | fluid | yes | 1.4 | ? | yes | yes | 1.15 |
| Tighter heading and control line-height | yes | no | no | no | yes | ? | no | no | no |
| `text-wrap: balance` on headings | yes | yes | no | no | yes | ? | no | no | no |
| `text-wrap: pretty` on paragraphs | no | yes | no | no | yes | ? | no | no | no |
| Media block and `max-width: 100%` | yes | yes | yes | img only | yes | ? | yes | no | no |
| Form controls `font: inherit` | yes | yes | yes | yes | yes | ? | yes | no | yes |
| `overflow-wrap: break-word` | no | yes | yes | no | no | ? | no | yes | no |
| List-style removal, scoped | role | no | role | no | no | ? | no | nav | no |
| Link `currentColor` or `text-decoration-skip-ink` | yes | no | skip-ink | no | no | ? | no | no | no |
| Text-size-adjust prevention | yes | no | yes | no | no | ? | yes | yes | yes |
| `:focus-visible` handling | no | no | yes | no | yes | ? | yes | no | no |
| Reduced-motion guard | no | yes | yes | yes | yes | ? | no | no | no |
| `scroll-behavior: smooth` | no | no | guarded | unguarded | guarded | ? | no | no | no |
| Table border-collapse and color | no | no | no | no | yes | ? | no | yes | partial |
| code and pre `font-size: 1em` | no | no | no | no | partial | ? | no | yes | yes |
| sub and sup fix | no | no | no | no | yes | ? | no | yes | yes |
| fieldset and legend fix | no | no | no | no | no | ? | no | border only | yes |
| Button and input appearance fix | no | no | partial | no | no | ? | yes | yes | yes |
| SVG `fill: currentColor` | no | no | yes | no | yes | ? | no | yes | no |
| `dialog` handling | no | margin exempt | no | no | no | dark colors | no | yes | no |
| `:where()` for zero specificity | no | no | yes | no | no | no | no | yes | no |

## Twists worth a judgment

- **`field-sizing: content` on textarea** (Coyier): adopt, behind `@supports`. Zero JS, no accessibility downside.
- **`interpolate-size: allow-keywords`** (Comeau): adopt behind `@supports` and reduced-motion. Not Baseline, pure enhancement.
- **`color-scheme: light dark`** (Coyier): adopt on `:root`. Already in our token plan.
- **`*:not(dialog) { margin: 0 }`** (Comeau): adopt the exemption idea if we do a broad margin reset; dialog's native centering must survive.
- **`ul[role='list']` scoping** (Bell, Loel): adopt. Matches our semantics-first rule; list styling is only removed where the author has declared the list decorative.
- **Fluid line-height on `*`** (Loel): reject as a blanket; our line-height derives from the scale in the base layer instead.
- **`overflow-x: hidden` on html and body** (Powell): reject. Masks bugs.
- **`#root { isolation: isolate }`** (Comeau): reject. App-specific.
- **`nav li::before` zero-width space** (sanitize): skip unless the Safari VoiceOver bug is re-verified against current Safari.
- **Theme-aware normalize** (Open Props): reject the shape; theming stays in tokens, not the reset.

## Contested rules

- **Body line-height**: 1.5 is the majority and the accessibility guidance; 1.15 is a normalize.css holdover. Ours derives from the scale but should land near 1.5 for body copy.
- **`text-size-adjust`**: `none` (Bell, Loel) versus `100%` (sanitize, modern-normalize). `none` is the newer recommendation.
- **Smooth scroll**: only the reduced-motion-guarded form is acceptable. Bell, Comeau, and sanitize omit it entirely, which is also fine.
- **Margin scope**: full `* { margin: 0 }` (Comeau, Loel, Tailwind) versus a curated list (Bell: block-end only; Coyier: body and heading block-start only). Full reset is simpler but destroys native spacing that then has to be rebuilt. Given our spacing-ownership rule (layouts inject rhythm, components ship spacing-agnostic), a broad reset with the dialog exemption fits our model, and the base layer restores prose rhythm on unclassed content.

## Reset versus base: where the line is

The test: does the rule undo an inconsistent or surprising user-agent default, or does it impose a design decision?

Belongs in `yeti.reset`: box-sizing, margin reset, text-size-adjust, media block display and max width, form control font inheritance, appearance fixes for WebKit controls, sub and sup, table border model, scoped list-style removal, `[hidden]` honoured, reduced-motion guard for anything the reset itself animates.

Belongs in `yeti.base`, not the reset: any font family, fluid root type, link colors, measure, `text-wrap: balance` and `pretty`, `color-scheme`, focus ring style, button and input visual styling including system colors, full-width inputs, fieldset border color, dark-mode control colors, smooth scroll.

The reset should be swappable without touching the framework's visual identity.
