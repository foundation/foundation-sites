# Yeti Architecture Design

**Date:** 2026-09-12
**Status:** Draft for review
**Scope:** The framework only. This is the master architecture spec. Each build phase (see §11) gets its own spec and implementation plan when it begins. Stacks integration, Stacks Pro themes, and Swatches remain out of scope, as in the brief.
**Source brief:** `foundation-7-framework-brief.md` (direction settled there under the working title Yeti; this document turns it into decisions and adopts the final name, Yeti)

---

## 1. Summary

Yeti is a CSS-first, native, zero-build layout and styling framework, published by Foundation alongside Inky and Proton. It is a ground-up reimagining of Foundation for Sites 6 on the modern CSS substrate: cascade layers, custom properties, container queries, native nesting, `dialog`, `popover`, and scroll-snap replace Sass, jQuery, and most of the JavaScript.

The one-line test for every decision: does this keep the framework legible, owned, and free of things that break on someone else's schedule?

This spec fixes the decisions that everything else depends on: repo transition, source and dist layout, cascade layers, the token system, the naming contract, the manifest, JavaScript policy, browser floor, testing, release, and the phase order.

## 2. Decisions made during planning

These were open in the brief and are now settled.

| Decision | Choice | Reason |
|---|---|---|
| Name | Yeti, by Foundation. Repo becomes `foundation/yeti`, npm package `yeti-css`, docs at foundationcss.com/yeti. Version continues at 7.0.0. | Foundation becomes the publisher brand for Yeti, Inky, and Proton. "Foundation" alone reads as legacy; the Yeti is the long-standing mascot. Versioning continues from 6.x because the repo already carries v2 through v6 tags, and a restart at 1.0 would collide with them from 2.0 onward. |
| Branching | Keep git-flow. Cut `v6` from `develop`. Rebuild on `develop`. Release to `master` via release branches. | Least churn; existing release tooling and contributor habits carry over. |
| Dev tooling runtime | Node 22, near-zero dependencies, `node:test`, Playwright as the one heavy dev dependency. | Familiar to contributors, first-class MCP SDK, and users never touch it. |
| Naming | Plain class for identity, `data-*` attributes for configuration, native or ARIA attributes for state. Hybrids allowed where they earn it. | Structural scoping, enforced single-choice options, unambiguous validation. See §6. |
| Browser floor | Baseline 2025. | Popover API is Baseline 2025 and is important. By launch, 2025 features are near or past the 30-month "widely available" mark. See §9. |
| Scale math | `pow()` unguarded. | Exponential functions are Widely Available (Baseline 2023). Chained multiplication is unnecessary. |
| Bundling | Concatenate only. A dependency-free Node script inlines `@import`. No minifier at launch. | Shipped CSS equals source. Readability is a feature. Lightning CSS is documented as a user-side option, never a repo dependency. |
| Manifest format | `manifest.json` per component, validated against a checked-in JSON Schema, merged at build. | Native to Node and every downstream consumer. |
| npm | Published as a new CSS-only package, `yeti-css`. No dependencies, no scripts. `foundation-sites` stays at 6.x and is deprecated with a pointer when 7.0 ships. | A new name needs a new package. jsDelivr serves versioned URLs from it. The `@foundation` scope is being pursued separately; if obtained, `yeti-css` becomes an alias. |
| Docs hosting | Generated Markdown committed to `docs/` with Proton-style front matter. foundationcss.com fetches `docs/` at its build. | Matches how Proton and Inky docs already work. Docs version with the manifest. |
| Plan shape | This architecture spec, then one spec and plan per phase. | The rebuild is too large for a single spec; early decisions would invalidate late detail. |
| Layout naming | Our own names for every primitive and recipe. Reuse an Every Layout name only where it is truly the best or only option. | The framework should be its own thing, and names are the API. Every Layout remains the model for intent-based naming. |
| Color format | oklch for all palette tokens, with a beginner explainer and hex equivalents in the docs. | Perceptual uniformity and clean tint and shade derivation. The unfamiliar numbers are a docs problem, not a design problem. |
| Reset | Synthesized from a survey of published resets, protective not opinionated, every rule with a recorded reason. | Many good resets exist, each with one twist. Ours should take the consensus and the best twists, and explain itself. |

## 3. Repo transition (Phase 0)

Sequence on the existing `foundation/foundation-sites` repo, in this order. The repo keeps its stars, forks, issues, and redirects through the rename, provided no new repo is ever created under the old name.

1. **Cut `v6` from `develop`.** All future 6.x fixes land there and release to `master` via git-flow until 7.0.0 ships.
2. **Mark the final 6.x state.** The `v6.9.0` tag and GitHub release already exist and are the immutable snapshot. Add a note to that release naming it the final planned 6.x feature release. Do not create a new tag.
3. **Announce and rename together, before removing anything.** Add a "Foundation for Sites is becoming Yeti" section to the README on `develop`, open a pinned announcement issue describing the new name, the branch changes, and where 6.x fixes go, then rename the GitHub repository to `foundation/yeti` the same day. Old URLs and clone remotes redirect. Never create a new `foundation-sites` repo afterward.
4. **Clear `develop`.** Remove: `scss/`, `js/`, `gulp/`, `gulpfile.js`, `rollup.config.js`, `webpack.config.js`, `.babelrc`, `.browserslistrc`, `.sass-lint.yml`, `.sass-cache/`, `customizer/`, `_build/`, `_vendor/`, `assets/`, `bower.json`, `package.js`, `package.nuspec`, `meteor-README.md`, `sache.json`, `browserstack.json`, `composer.json`, `patches/`, `test/`, everything in `docs/` except `docs/superpowers/`, `.husky/`, `.commitlintrc.yml`, `.eslintrc`, `yarn.lock`, and the current `package.json`. Keep: `LICENSE`, `code-of-conduct.md`, `SECURITY.md`, `.editorconfig`, `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`. Rewrite `README.md` and `CONTRIBUTING.md`.
5. **Lay down the skeleton and CI** per §4 and §10. `develop` carries version `7.0.0-alpha.0`.

The uncommitted `shelljs` dependency bump in the working tree is not part of this work. If it is wanted, it belongs on `v6`.

## 4. Source and dist layout

```
src/
  yeti.css                  entry: imports layers.css, then every token, base, layout, component, utility file
  layers.css                the single @layer declaration (see §5)
  tokens/
    scale.css               --base, --ratio, --step-N (pow), fluid variants
    color.css               light-dark() palettes, color-scheme
    space.css               --space-N aliases onto the scale
    type.css                --text-N aliases, line-height, measure
    radius.css
  base/
    reset.css
    typography.css          body, headings, measure, rhythm defaults
  layouts/<name>/
    <name>.css
    manifest.json
    example.html
  components/<name>/
    <name>.css
    manifest.json
    example.html
    <name>.js               only if the component has a JS enhancement (see §8)
  utilities/
    utilities.css           deliberately short: visually-hidden, and little else
bin/
  build.js                  inlines @import into dist/yeti.css, copies src tree to dist/css, merges manifests
  validate.js               validates every manifest.json against the schema, and every example.html against the merged manifest
  gen-docs.js               writes docs/<name>.md per layout and component from manifest + example
  gen-types.js              writes dist/yeti.d.ts (phase 5)
  release.js                version stamp, build, zip, regenerate docs (phase 0 skeleton, completed by phase 5)
schema/
  manifest.schema.json
test/
  bin/                    node:test for build, validate, generators
  browser/                  Playwright fixtures and specs
docs/
  <generated component pages>.md
  guides/                   hand-written: installation, responsive mental model, migrating from 6, theming
  superpowers/specs/        design specs (this file and per-phase specs)
  superpowers/plans/        implementation plans
dist/                       built on release only, gitignored
  yeti.css                  readable bundle
  css/                      every source file verbatim, same tree as src
  js/                       per-component ES modules
  yeti.manifest.json
  yeti.d.ts
package.json                name yeti-css, version, files: ["dist"], no dependencies, devDependencies: playwright, @axe-core/playwright
```

Source CSS uses native `@import`, so the `src/` tree is loadable directly in a browser during development with no build. The build script only inlines imports for the bundle and copies files.

## 5. Cascade layers

One top-level layer with sublayers, declared once in `src/layers.css` and imported first:

```css
@layer yeti.reset, yeti.base, yeti.layouts, yeti.components, yeti.utilities;
```

Rules:

- Every rule the framework ships is inside one of these sublayers. Nothing is unlayered.
- Token declarations on `:root` live in `yeti.base`.
- A user's plain unlayered CSS beats every framework rule by default. No `!important` anywhere in the framework.
- Users who want to participate in the layer system declare their own layers after `yeti`, for example `@layer yeti, theme, app;`.
- `@supports` blocks and container queries nest inside their component's layer; they never introduce new layers.

## 6. Tokens

### 6.1 One scale

Two inputs, one geometric progression, derived at runtime:

```css
:root {
  --base: 1rem;
  --ratio: 1.25;
  --step--2: calc(var(--base) / pow(var(--ratio), 2));
  --step--1: calc(var(--base) / var(--ratio));
  --step-0: var(--base);
  --step-1: calc(var(--base) * var(--ratio));
  --step-2: calc(var(--base) * pow(var(--ratio), 2));
  --step-3: calc(var(--base) * pow(var(--ratio), 3));
  --step-4: calc(var(--base) * pow(var(--ratio), 4));
  --step-5: calc(var(--base) * pow(var(--ratio), 5));
}
```

Overriding `--ratio` or `--base` in a user stylesheet or in devtools recomputes the entire system.

### 6.2 Type and space read off the scale

- `--text-N` aliases `--step-N` for font sizes. Body is `--text-0`. Headings step up.
- `--space-N` aliases the same steps for gaps and padding, with named sizes (`xs`, `s`, `m`, `l`, `xl`) mapped onto steps so that `data-gap="l"` is legible.
- Line-height is derived from the scale so vertical rhythm is proportional to type size.
- Measure defaults to `65ch` on prose containers.

### 6.3 Fluid by default

Type and space each have a fluid variant using `clamp()` between a minimum and maximum viewport width. Fluid is the default that base typography and layouts consume; the static steps remain available for cases that must not scale.

### 6.4 Color

- All color tokens are declared with `light-dark()` and `color-scheme: light dark` on `:root` from the first commit. Dark mode is a token concern, never a component concern.
- Palettes are authored in `oklch()`. Derived tints and shades use `color-mix()` or relative color syntax so a user overriding one hue gets a coherent family.
- Coverage at launch: surface, text, border, primary, secondary, success, warning, alert, plus focus ring.
- Each palette token carries a comment with its hex equivalent, and the theming guide explains lightness, chroma, and hue in one short section, so oklch is approachable for people who only know hex.
- Tokens are flagged public or internal in the manifest (§10.1). Public tokens are the theming API and are documented; internal derived tokens may change between minor versions.

### 6.5 Registered properties

Numeric and color tokens that components animate or validate are registered with `@property`, giving them a syntax and initial value.

### 6.6 Spacing ownership

Spacing is a property of layout, not of components. Component CSS never sets outer margin on itself. Layouts own `gap` and inter-child spacing. This is a hard rule enforced by review and by a lint check in `validate.js` that flags `margin` on a component's root selector.

## 7. Naming and the component contract

- **Identity is a class.** `.stack`, `.cluster`, `.card`, `.button`. One class per thing, plain English, no prefix.
- **Configuration is a data attribute.** `data-variant`, `data-size`, `data-gap`, `data-align`, `data-columns`, drawn from a short shared vocabulary reused across components. Boolean options are bare attributes: `data-inset`, not `data-inset="true"`.
- **State is native or ARIA.** `[open]`, `:popover-open`, `[aria-current]`, `[aria-selected]`, `[aria-expanded]`, `[disabled]`, `[inert]`. The framework never invents a state attribute where a native one exists.
- **User classes are free.** Anything not in the manifest is ignored by the validator and never collides with framework selectors.
- **Every layout and component has a contract** in its `manifest.json`: class, allowed attributes and their enumerated values, required child structure, tokens it reads, accessibility requirements, browser notes, and which JS module (if any) enhances it.

Hybrids are permitted case by case where a modifier class is clearly better (for example a small set of composable typographic classes on prose). Each such exception is recorded in the manifest as a class-typed option rather than an attribute, so the validator still knows about it.

**Follow-up, not decided now:** dropping the `data-` prefix (`size="l"`). Revisit when typed `attr()` reaches Safari, and only for names checked against the HTML attribute registry to avoid collisions such as `size` on `input` and `select`.

## 8. JavaScript policy

- **CSS-only is the default state.** Every component works with no script loaded. Accordion uses `details`/`summary` (with `name` for exclusive groups), modal uses `dialog`, dropdowns and tooltips use `popover`, the mobile menu is a `dialog` or `details` panel, and the carousel is scroll-snap.
- **JS is per-component, optional, dependency-free ES modules** in `dist/js/<component>.js`, loaded with `<script type="module">`. No bundle, no global, no jQuery, no init call. Each module finds its own elements by component class and enhances them, and is safe to load on pages with none present.
- **The JS budget for 7.0 is two modules:** `tabs.js` (roving tabindex, arrow-key navigation, ARIA state) and `dialog.js` (open triggers via `data-open`, focus return, optional close-on-backdrop). Anything beyond this needs a stated reason in its phase spec.
- **Positioning needs no JS.** Popovers use anchor positioning inside `@supports`. Where unsupported, the browser's top-layer default (centered in the viewport) is the fallback and is acceptable.
- **Progressive enhancement is tested, not assumed.** Each interactive fixture runs once with its module and once without (see §10).

## 9. Browser support

**Floor: Baseline 2025.** Any feature that reached Baseline "newly available" on or before 2025-12-31 may be used unguarded. The installation guide states this plainly and tells users who need older browsers that this is not their tool.

Verified as of 2026-09-11 (sources: web.dev Baseline, webstatus.dev, MDN):

**Unguarded (Widely Available or Baseline 2025 or earlier):** cascade layers, native nesting, container size queries, subgrid, `:has()`, `clamp()`/`min()`/`max()`, exponential math (`pow()` etc.), `round()`/`mod()`/`rem()`, `oklch()`, `color-mix()`, relative color syntax, `light-dark()`, `@property`, `dialog` and `::backdrop`, Popover API, `inert`, `:focus-visible`, scroll-snap, `dvh`/`svh`/`lvh`, `@starting-style` and `transition-behavior: allow-discrete`, `text-wrap: balance`, `scrollbar-gutter`, `content-visibility`, `details` `name` attribute and `::details-content`, `font-size-adjust`.

**Behind `@supports`, with a working fallback:** anchor positioning and `position-area` (fallback: top-layer centered popover), `@scope` (fallback: descendant selectors, which are the primary authoring form anyway), container style queries on custom properties, `field-sizing: content`, `sibling-index()`, `text-wrap: pretty`, native masonry (fallback: column-based approximation), scroll-driven animations (fallback: static).

**Not used in 7.0:** typed `attr()`, `if()`, `@function`, `interpolate-size`, `::scroll-button()`/`::scroll-marker`, `reading-flow`, `accent-color` (not Baseline due to Safari contrast concerns; use explicit form styling instead).

No polyfills. `@supports` is the only mechanism.

## 10. Manifest and generated outputs

### 10.1 Schema

`schema/manifest.schema.json` defines a component entry:

```
name            string, matches the folder and the class
kind            "layout" | "component" | "utility"
description     one sentence
class           the identity class
attributes[]    { name, type: "enum" | "boolean" | "number" | "string", values[], default, description }
classes[]       hybrid modifier classes, same shape, only where §7 permits
children        required or expected child structure, expressed as selectors and cardinality
tokens[]        custom properties the component reads, each { name, public: boolean }
a11y            { role, requiredAttributes[], keyboard[], notes }
js              { module, optional: true } or null
support         { unguarded[], guarded[] } feature notes for the docs
since           framework version
```

### 10.2 Validation

`bin/validate.js`:

1. Validates every `manifest.json` against the schema.
2. Merges them into one object, failing on duplicate names or classes.
3. Parses every `example.html` and every fenced HTML block in `docs/guides/`, and checks each element that carries a framework class: unknown `data-*` attributes on it, values outside the enum, missing required children, and missing required ARIA. Unknown classes are ignored. Any failure fails CI.
4. Lints component CSS for outer `margin` on the root selector (§6.6).

The same validation logic is what the MCP server exposes in phase 6.

### 10.3 Generated docs

`bin/gen-docs.js` writes one Markdown file per layout and component into `docs/`, with front matter in the Proton convention (`title`, `description`, `nav_group`, `nav_order`), containing: description, the example markup, an attribute table, tokens read, accessibility notes, browser notes, and the JS module if any. Generated files carry a header comment saying they are generated. They are committed, because foundationcss.com fetches `docs/` at its build.

**Open item:** how foundationcss.com loads the Yeti CSS so that examples render live rather than as static code blocks. To be resolved with the site before phase 2 docs land.

### 10.4 Types and MCP

`bin/gen-types.js` (phase 5) emits `dist/yeti.d.ts` with unions of class names and attribute values for editor tooling. The MCP server (phase 6) lives in `bin/mcp/` or its own repo, reads `yeti.manifest.json` at runtime, and exposes list, describe, and validate tools.

## 11. Testing and CI

Three tiers, all run by one GitHub Actions workflow on Node 22 for push and pull request:

1. **Tooling tests** (`node:test`): build, validate, generators. No browser.
2. **Manifest conformance** (`bin/validate.js`): schema validity plus every example and docs snippet validated. A hallucinated class or attribute fails CI.
3. **Browser fixtures** (Playwright in Chromium, WebKit, Firefox): renders each `example.html`, asserts computed styles (the Switcher switches at its threshold, a Stack's gap equals its token, tokens recompute when `--ratio` changes), runs an axe-core pass, exercises keyboard navigation on interactive components, and runs each interactive fixture with and without its JS module.

Screenshot regression is deferred until the beta API freeze (phase 5), because visual churn during phases 1 through 4 would make it noise.

BrowserStack, mocha, and the Sass tests are removed in phase 0.

## 12. Release and versioning

- `develop` carries `7.0.0-alpha.N` through phases 1 to 4, `7.0.0-beta.N` from the phase 5 API freeze, then `7.0.0`.
- Releases follow git-flow: release branch, merge to `master`, tag `v7.x.y`. `master` stays at 6.9.0 until 7.0.0 is real. Tag numbering continues the existing sequence, so the repo's v2 through v6 history never collides with Yeti releases.
- `bin/release.js` stamps the version into `package.json`, the manifest, and the CSS header comment, builds `dist/`, zips it, and regenerates `docs/`.
- The GitHub release carries the zip. npm publishes `dist/` as the CSS-only `yeti-css` package. jsDelivr serves versioned URLs from npm; the docs describe CDN as prototyping-only and self-hosting as the production path.
- Semantic versioning is strict: any change to a class name, attribute name, enumerated value, required child structure, or token name is a major.

## 13. Phases

Each phase begins with its own spec and implementation plan. Order follows the brief with the manifest pulled forward so nothing is retrofitted.

| Phase | Deliverable | Exit criterion |
|---|---|---|
| 0 | Repo transition (§3), skeleton (§4), layers file, manifest schema, `build.js`, `validate.js`, `gen-docs.js` stub, CI | CI green on an empty framework; `v6` branch exists; announcement published |
| 1 | Tokens (§6), reset synthesized from the reset survey in `docs/superpowers/research/`, base typography and spacing defaults, bare semantic HTML looking coherent with no classes | Scale recomputes live from `--ratio`; light and dark render from one token set; measure and rhythm defaults documented; every reset rule has a recorded reason |
| 2 | Layout primitives covering the Every Layout set (stack, cluster, sidebar, switcher, cover, grid, reel, frame, imposter, box, center), each given our own name, then composed recipes (page shell, media object, masonry, split hero, sticky footer, container, card recipe) | All with manifests, fixtures, generated docs; every layout is zero-media-query; each name's reason recorded in its manifest |
| 3 | Styled essentials: buttons and groups, cards, forms, tables, badges | Same, plus container-query behavior on card and media object |
| 4 | Navigation and interactive: nav bar, mobile menu, breadcrumbs, pagination, accordion, tabs, dropdown, modal, tooltip, alerts, progress, scroll-snap carousel | JS budget (§8) spent and no more; menu variations shipped as recipes, not components |
| 5 | Educational guides (responsive mental model, migrating from 6, theming), `gen-types.js`, screenshot tests, API freeze | `7.0.0-beta.0`; API declared stable |
| 6 | MCP server, one-time token generator in a separate directory, `7.0.0` | Downstream Stacks and theme work may begin |

Phase 0 and phase 1 specs are written next, immediately after this document is approved.

## 14. Open items carried forward

- Dropping the `data-` prefix (§7), revisited when typed `attr()` is Baseline.
- Lightning CSS documented as a user-side option in the installation guide, never a repo dependency.
- Screenshot regression tests, added at the phase 5 API freeze.
- Live rendering of examples on foundationcss.com (§10.3), to be resolved before phase 2 docs land.
- The `@foundation` npm scope: Joe is contacting its holder. If obtained, publish scoped packages and keep `yeti-css` as an alias.
- Downstream naming (Yeti Stacks, themes) is out of scope here but should be settled before the announcement so both names land together.

## 15. Reference material

Design inputs, summarized in `docs/superpowers/research/2026-09-12-inspiration-notes.md`:

- Every Layout and Complete CSS, archived locally under `~/Developer/` from paid licenses. Consulted for techniques and naming philosophy. Nothing from them is copied into this repo; all Yeti prose and CSS is original.
- Graffiti UI (public token contract, classless base styling), the Coyier CSS starter (protective defaults, reset versus base distinction), and a11ymyths.com (accessibility guide content).
- The reset survey in `docs/superpowers/research/2026-09-12-css-reset-survey.md` is the input to the phase 1 reset. It fixes the line between `yeti.reset` (undo surprising user-agent defaults) and `yeti.base` (design decisions).

## 16. Non-goals restated

Not a web component library. Not a utility framework. No required build step, ever. No Sass. No polyfills. No full-featured slider in core. Nothing that exists purely to work around CSS that no longer needs working around.
