# Yeti Phase 0: Repo Transition and Skeleton

**Date:** 2026-09-12
**Status:** Draft for review
**Parent:** `2026-09-12-yeti-architecture-design.md` (§3 repo transition, §4 layout, §5 layers, §10 manifest, §11 testing, §12 release)
**Exit criterion:** CI is green on an empty framework, `v6` exists and is pushed, the repo is renamed `foundation/yeti`, the announcement is published, and `develop` is at `7.0.0-alpha.0`.

---

## 1. Purpose

Phase 0 turns the Foundation for Sites 6 repository into the Yeti repository without losing its history, stars, or the ability to ship 6.x fixes. It lays down the source tree, the cascade layer declaration, the manifest schema, the three tooling scripts, the test harness, and CI, so that every later phase adds content into a structure that already validates and publishes itself.

Phase 0 ships no CSS beyond the layer declaration. That is deliberate: the tooling must be proven on nothing before it is trusted on something.

## 2. Decisions specific to this phase

These are routine calls made while writing this spec. Each is reversible; flag any you disagree with.

| Decision | Choice | Reason |
|---|---|---|
| Package manager | npm, with `package-lock.json` committed. `yarn.lock` removed. | Node's default. Fewer moving parts for contributors, and the dependency list is tiny. |
| Node version | 22, pinned in `.nvmrc` and `engines`. | Current LTS. Built-in test runner, `fs.glob`, fetch. |
| Dev dependencies | `playwright`, `@axe-core/playwright`, `parse5`. Nothing else. | Playwright and axe are the one heavy dependency the architecture spec allows. `parse5` is a zero-dependency, spec-compliant HTML parser; hand-rolling one is the wrong place to spend effort. |
| JSON Schema validation | A hand-written validator for the subset of JSON Schema the manifest uses (`type`, `enum`, `required`, `properties`, `additionalProperties`, `items`, `pattern`, `const`). No ajv. | ajv brings four dependencies. The subset is about a hundred lines and is itself tested. The schema file stays standard so editors can use it. |
| Browser tests in phase 0 | Yes, one smoke fixture. | Proves the Playwright install and the "src tree loads unbuilt" promise before any CSS exists. |
| Working branch | `feature/yeti-phase-0`, per git-flow, merged to `develop` only after `v6` is cut. | Keeps `develop` at 6.9.0 until the cut is safe. |
| Tooling portability | Scripts use only `node:fs`, `node:path`, `node:child_process`, and web-standard APIs. No Node-only packages. | So the runtime can be swapped later with a one-line CI change. |
| Script folder | `bin/` for the executables, `bin/lib/` for their shared modules. | Matches Proton and Inky, and it is what Joe uses. Everything that never ships lives in one folder. |
| Old docs | Not migrated. They live on `v6` and on the existing site. | Yeti docs are generated from the manifest; nothing from the Panini docs carries over. |

## 3. Sequence

Steps marked **Joe** are manual actions on GitHub or npm that only an org owner can take. Steps marked **Claude** are file changes on the feature branch, delivered for review, never committed or pushed without instruction.

| # | Who | Step | Notes |
|---|---|---|---|
| 1 | Joe | Decide the fate of the uncommitted `shelljs` bump in `package.json` and `yarn.lock`. | Commit it on `v6` after step 2, or discard it. It must not be on the phase 0 branch. |
| 2 | Joe | `git branch v6 develop` and push it. Set branch protection to match `master`. | This is the 6.x maintenance line. Nothing else changes for 6.x. |
| 3 | Joe | Edit the v6.9.0 GitHub release: add the "final planned 6.x feature release" note (text in §9.3). | The tag is the immutable snapshot. No new tag. |
| 4 | Claude | On `feature/yeti-phase-0`: clear the tree (§4), lay down the skeleton (§5), tooling (§6), tests (§7), CI (§8), and the rewritten README, CONTRIBUTING, templates, and announcement issue text (§9). | Delivered as a reviewable diff. |
| 5 | Joe | Review and merge `feature/yeti-phase-0` into `develop`. | CI must be green on the PR first. |
| 6 | Joe | Publish the pinned announcement issue (§9.2) using the drafted text. | Same day as step 7. |
| 7 | Joe | Rename the repository to `foundation/yeti` in GitHub settings. Update the local remote. | GitHub redirects the old URL and clone remotes. Never create a new `foundation-sites` repo. |
| 8 | Joe | Set `develop` as the default branch if it is not already, and confirm the repo description and topics read Yeti. | Cosmetic but visible. |
| 9 | Claude | Verify: fresh clone from the new URL, `npm ci`, `npm test`, all green. Verify the old URL redirects. | Phase 0 exit check. |

The npm side is untouched in phase 0. `foundation-sites` keeps publishing 6.x from `v6`. `yeti-css` is registered on npm at step 7 as an empty placeholder version `0.0.0` so the name is held, and gets its first real publish at `7.0.0-beta.0`.

## 4. What is removed from the tree

Everything below is deleted on the feature branch. It all survives on `v6` and in history.

```
.babelrc  .browserslistrc  .commitlintrc.yml  .eslintrc  .husky/  .sass-cache/  .sass-lint.yml
.sonarcloud.properties  .versions  _build/  _vendor/  assets/  bower.json  browserstack.json
composer.json  customizer/  dist/  docs/assets/  docs/layout/  docs/pages/  docs/partials/  docs/search.yml
gulp/  gulpfile.js  js/  meteor-README.md  package.js  package.nuspec  patches/  rollup.config.js
sache.json  scss/  test/  webpack.config.js  yarn.lock  .npmignore  .github/workflows/main.yml
```

Kept and unchanged: `LICENSE`, `code-of-conduct.md`, `SECURITY.md`, `.editorconfig`, `.github/PULL_REQUEST_TEMPLATE.md`, `docs/superpowers/`.

Kept and rewritten: `README.md`, `CONTRIBUTING.md`, `package.json`, `.gitignore`, `.github/ISSUE_TEMPLATE/*`. The `files` field in package.json replaces `.npmignore`.

Open item on `LICENSE`: it reads "Copyright © 2011-2020 ZURB, Inc." Adding a second line for the current copyright holder is Joe's call; the spec does not change the file.

## 5. Skeleton

```
.nvmrc                         22
.gitignore                     node_modules/, dist/, test-results/, playwright-report/, .DS_Store
package.json                   see §5.1
package-lock.json
playwright.config.js
README.md  CONTRIBUTING.md  LICENSE  SECURITY.md  code-of-conduct.md  .editorconfig
.github/
  ISSUE_TEMPLATE/              rewritten for Yeti (§9.4)
  PULL_REQUEST_TEMPLATE.md
  workflows/ci.yml             see §8
src/
  yeti.css                     @import "layers.css"; then nothing else yet
  layers.css                   @layer yeti.reset, yeti.base, yeti.layouts, yeti.components, yeti.utilities;
  tokens/  base/  layouts/  components/  utilities/    empty, each holding a .gitkeep
schema/
  manifest.schema.json         see §6.1
bin/
  build.js  validate.js  gen-docs.js  release.js
  lib/
    schema-check.js            the JSON Schema subset validator
    manifest.js                load, merge, and index manifests
    html.js                    parse5 wrapper: walk elements, read class list and attributes
    imports.js                 @import resolution for build.js
    front-matter.js            emit Proton-style front matter
test/
  bin/                       node:test files, one per tool or lib module
  fixtures/
    manifests/                 valid and invalid manifest examples
    examples/                  valid and invalid example.html files
    css/                       import graphs including a cycle
  browser/
    smoke.spec.js
    smoke.html                 links ../../src/yeti.css
docs/
  superpowers/                 specs, plans, research (already present)
  guides/                      empty, .gitkeep; installation guide arrives in phase 1
```

### 5.1 package.json

```json
{
  "name": "yeti-css",
  "version": "7.0.0-alpha.0",
  "description": "Yeti: a CSS-first, native, zero-build layout and styling framework by Foundation.",
  "license": "MIT",
  "type": "module",
  "homepage": "https://foundationcss.com/yeti/",
  "repository": "github:foundation/yeti",
  "engines": { "node": ">=22" },
  "files": ["dist", "LICENSE", "README.md"],
  "style": "dist/yeti.css",
  "exports": {
    ".": "./dist/yeti.css",
    "./css/*": "./dist/css/*",
    "./js/*": "./dist/js/*",
    "./manifest": "./dist/yeti.manifest.json"
  },
  "scripts": {
    "build": "node bin/build.js",
    "validate": "node bin/validate.js",
    "docs": "node bin/gen-docs.js",
    "test": "npm run validate && npm run test:tools && npm run test:browser",
    "test:tools": "node --test test/tools/",
    "test:browser": "playwright test",
    "release": "node bin/release.js"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4",
    "parse5": "^7",
    "playwright": "^1"
  }
}
```

No `main`. The package is CSS. `exports` lets bundler users import `yeti-css` and get the stylesheet, or reach individual files.

## 6. Tooling

All scripts are ES modules, exit non-zero on any failure, print one line per problem in `file:line: message` form, and take no arguments except `--quiet`.

### 6.1 Manifest schema

`schema/manifest.schema.json` is JSON Schema draft 2020-12, restricted to the subset in §2. It describes one layout or component. The `$id` is `https://foundationcss.com/yeti/schema/manifest.json` and every `manifest.json` carries `"$schema"` pointing at it for editor support.

| Field | Type | Rules |
|---|---|---|
| `name` | string | `^[a-z][a-z0-9-]*$`. Must equal the folder name. Unique across the framework. |
| `kind` | `"layout"` \| `"component"` \| `"utility"` | Must match the folder's parent (`layouts/`, `components/`, `utilities/`). |
| `description` | string | One sentence. Used verbatim in docs and the MCP server. |
| `class` | string | The identity class. Must equal `name`. Unique across the framework. Hybrid modifier classes live in `classes`, never here. |
| `attributes` | array of Attribute | Configuration options. May be empty. |
| `classes` | array of Attribute | Hybrid modifier classes permitted by architecture §7. `type` must be `"boolean"`. May be empty. |
| `children` | array of Child | Expected child structure. May be empty. |
| `tokens` | array of `{ name, public, description? }` | Custom properties the CSS reads. `name` matches `^--[a-z][a-z0-9-]*$`. |
| `a11y` | `{ role?, requiredAttributes[], keyboard[], notes? }` | `requiredAttributes` are ARIA or native attributes the validator enforces on the root element. `keyboard` is a list of `{ key, action }` for the docs. |
| `js` | `{ module, optional: true }` \| `null` | If set, `module` is a path under `src/<kind>s/<name>/` and the file must exist. `optional` is always true in 7.0. |
| `support` | `{ unguarded[], guarded[] }` | Feature names as strings, for the docs' browser notes. |
| `since` | string | Semver of first release. `"7.0.0"` for everything in this cycle. |
| `example` | string | Path to the example file, always `"example.html"`. Present so consumers can find it. |

Attribute:

| Field | Type | Rules |
|---|---|---|
| `name` | string | `^data-[a-z][a-z0-9-]*$` for attributes; `^[a-z][a-z0-9-]*$` for classes. |
| `type` | `"enum"` \| `"boolean"` \| `"number"` \| `"string"` | Boolean attributes are bare (`data-inset`), never `="true"`. |
| `values` | array of string | Required when `type` is `"enum"`, forbidden otherwise. Non-empty, unique. |
| `default` | string \| number \| boolean | Optional. Must be one of `values` for enums. |
| `description` | string | One sentence. |

Child:

| Field | Type | Rules |
|---|---|---|
| `selector` | string | A CSS selector relative to the root, e.g. `> *`, `> .card-body`, `> summary`. |
| `min` | integer | Minimum count. Default 0. |
| `max` | integer \| null | Maximum count. `null` means unbounded. Default null. |
| `description` | string | Optional. |

`additionalProperties` is false at every level. Unknown fields fail validation, which is what stops the manifest drifting from the schema.

### 6.2 validate.js

Runs in this order and reports every problem before exiting, rather than stopping at the first.

1. **Schema.** Every `src/{layouts,components,utilities}/*/manifest.json` is loaded and checked against the schema with `bin/lib/schema-check.js`. Folder name, `kind`, and `name` are cross-checked.
2. **Merge.** Manifests are merged into one object keyed by `name`. Duplicate names or duplicate `class` values fail. `js.module` paths are checked to exist. Every folder under `src/layouts`, `src/components`, and `src/utilities` must contain a `manifest.json`, a `<name>.css`, and an `example.html`.
3. **Examples.** Every `example.html`, and every fenced `html` block in `docs/guides/**/*.md`, is parsed with parse5. For each element that carries a framework identity class (the merged manifest's `class` set), the validator checks: every `data-*` attribute on the element is declared in that component's `attributes`; every declared enum attribute holds one of its `values`; boolean attributes have no value; `a11y.requiredAttributes` are present; every `children` entry's `min` and `max` are satisfied by counting matches of `selector` relative to the element. Unknown non-`data-` attributes and unknown classes are ignored, because they belong to the user.
4. **Spacing lint.** Every `<name>.css` is scanned for a `margin` declaration (including `margin-block`, `margin-inline`, and their `-start` and `-end` forms) inside a rule whose selector is exactly the identity class with no combinator. That is the component setting its own outer spacing and is forbidden by architecture §6.6. Rules with combinators (`.stack > * + *`) are the layout's job and are allowed.
5. **Layer check.** `src/layers.css` contains exactly one `@layer` statement naming the five sublayers in order, and no other rule. `src/yeti.css` imports `layers.css` first.

In phase 0 there are no components, so steps 1 through 4 run over the test fixtures only in the test suite, and over an empty `src` in CI. Step 5 runs for real.

### 6.3 build.js

1. Reads `src/yeti.css` and resolves `@import` statements recursively with `bin/lib/imports.js`. Only relative-path imports with the `@import "path";` or `@import url("path");` forms are supported, and only at the top of a file before any rule, matching the CSS spec. Anything else is an error. Cycles are an error naming the cycle.
2. Writes `dist/yeti.css`: a header comment with the package name, version, license, and repo URL, then `layers.css` content, then every imported file in order, each preceded by a comment naming its source path. No minification, no transformation.
3. Copies the entire `src/` tree to `dist/css/` verbatim, so cherry-pickers get files identical to source.
4. Copies every `src/**/*.js` to `dist/js/<name>.js`.
5. Merges manifests (via `bin/lib/manifest.js`, the same code validate.js uses) into `dist/yeti.manifest.json`, adding a top-level `{ "framework": "yeti", "version": "<package.json version>", "generated": "<ISO date>", "components": { ... } }`.
6. `dist/` is gitignored. `build.js` runs `validate.js` first and refuses to build on validation failure.

### 6.4 gen-docs.js

1. Loads the merged manifest.
2. For each entry, writes `docs/<name>.md` with Proton-style front matter and a body assembled from the manifest and the example. Front matter fields: `raw: true`, `title`, `description`, `nav_group` (`Layouts`, `Components`, or `Utilities`), `nav_order` (position within the group, alphabetical for now). The body: description, a fenced `html` block containing `example.html`, an attributes table, a classes table if any, children, tokens (public only, with internal ones listed under a collapsed note), accessibility (role, required attributes, keyboard table, notes), browser support (unguarded and guarded lists), and the JS module if any.
3. Every generated file starts with an HTML comment: `<!-- Generated by bin/gen-docs.js from src/<kind>s/<name>/manifest.json. Do not edit. -->`.
4. Files in `docs/` that start with that comment but no longer correspond to a manifest are deleted, so renames do not leave orphans. Files without the comment (hand-written guides) are never touched.
5. In phase 0 the script runs, finds nothing, and writes nothing. The page template is exercised by the test suite against fixture manifests.

Open item carried from the architecture spec: confirm with the foundationcss.com build what `raw: true` means and whether generated pages need any other field. Proton and Inky both set it on every page, so Yeti does the same until told otherwise.

### 6.5 release.js (skeleton)

Phase 0 implements only: read the version argument, verify the working tree is clean and on a `release/*` branch, stamp `package.json`, run `build.js` and `gen-docs.js`, and zip `dist/` to `yeti-<version>.zip`. It does not tag, commit, or publish; those remain manual git-flow steps. Completed in phase 5.

## 7. Tests

### 7.1 Tooling tests (`node --test test/tools/`)

One file per module. Each test uses fixtures under `test/fixtures/` and a temporary directory, never `src/`.

- `schema-check.test.js`: each supported keyword accepted and rejected correctly; unknown keyword in a schema throws (so we notice if the schema grows past the subset).
- `manifest.test.js`: valid fixture loads; each field rule in §6.1 has a failing fixture and the error message names the field; duplicate name and duplicate class across two fixtures fail; folder and `kind` mismatch fails.
- `html.test.js`: element walk returns class list and attributes; boolean attribute with a value is reported.
- `validate.test.js`: a valid example passes; unknown `data-*` fails; enum violation fails; missing required child fails; extra child over `max` fails; missing `a11y.requiredAttributes` fails; unknown user class is ignored; `margin` on a bare identity selector fails while `.x > * + *` passes; fenced `html` blocks in a guide are validated; the layer check passes on the real `src/layers.css` and fails on a fixture with the wrong order.
- `imports.test.js`: nested imports resolve in order; `url()` form works; an import after a rule is an error; a cycle is an error naming both files.
- `build.test.js`: builds a fixture tree to a temp dir; bundle header carries the version; source comments appear in order; `dist/css` mirrors `src`; the manifest JSON has the wrapper fields.
- `gen-docs.test.js`: fixture manifest produces expected front matter and section headings; orphan cleanup deletes a stale generated file and leaves a hand-written one alone.

### 7.2 Browser smoke (`playwright test`)

`playwright.config.js` runs Chromium, WebKit, and Firefox, serving the repo root with Playwright's built-in static server. `smoke.spec.js` opens `test/browser/smoke.html`, which links `../../src/yeti.css` directly, and asserts that the first rule of the first stylesheet is a `CSSLayerStatementRule` whose `nameList` is exactly the five `yeti.*` layers in order. That single assertion proves the unbuilt source tree loads in all three engines and that the layer contract is what the architecture says.

An axe pass runs on the same page and must report zero violations, establishing the CI wiring for phase 1 onward.

## 8. CI

`.github/workflows/ci.yml`, on push and pull request:

```
jobs:
  tools:      ubuntu-latest, node 22, npm ci, npm run validate, npm run test:tools, npm run build
  browser:    ubuntu-latest, node 22, npm ci, npx playwright install --with-deps, npm run test:browser
```

Two jobs so tooling failures report in under a minute without waiting on browser installs. No secrets. No matrix; the tooling is plain Node and the browsers are what Playwright ships. BrowserStack, the Node version matrix, and the OS matrix are gone.

## 9. Written artifacts

Drafted on the feature branch for Joe to edit before publishing.

### 9.1 README.md

Sections, in order: Yeti wordmark and one-line description; a three-line "Foundation for Sites 6 users, read this" box pointing at the announcement issue and `v6`; status ("in development, 7.0.0-alpha, API not stable"); what Yeti is and is not (from architecture §1 and §16, compressed); browser support statement (Baseline 2025); how to try it today (clone, `npm ci`, open `test/browser/smoke.html`, since there is no CSS yet); contributing pointer; license.

### 9.2 Announcement issue (pinned)

Title: "Foundation for Sites is becoming Yeti". Body covers: what is changing and why, in Joe's voice, roughly the reasoning from the architecture spec's Name decision; that 6.x continues on `v6` with bug fixes and `foundation-sites` on npm; that `develop` is now Yeti 7 and unstable; that the repo URL will change and old links redirect; where to follow progress; where to ask questions. Comments enabled.

### 9.3 v6.9.0 release note addition

Two sentences at the top of the existing release: this is the final planned feature release of Foundation for Sites 6; bug fixes continue on the `v6` branch, and the successor is Yeti, with a link to the announcement issue.

### 9.4 Issue templates

Rewritten for Yeti. Bug report asks for Yeti version, browser and version, a reduced case (a link to a CodePen or a fenced HTML block), expected and actual. Feature request asks for the problem, the proposed markup, and why it belongs in core given the non-goals. Documentation and maintenance templates lose their Sass and JavaScript plugin fields. All four link to Discussions for questions. The "Sass" and "JavaScript" labels are retired.

### 9.5 CONTRIBUTING.md

Short. How to run the tests, the no-build promise and what that means for contributors (no Sass, no bundler, no new dev dependencies without discussion), the manifest-first rule (every component lands with its manifest, example, fixture, and generated docs in the same PR), the spacing-ownership rule, the naming rules from architecture §7, and the git-flow branch model.

## 10. Testing the phase itself

Phase 0 is complete when, on a fresh clone of `foundation/yeti` at `develop`:

```
npm ci && npm test
```

exits zero in CI on all three browser engines, `npm run build` produces `dist/yeti.css` containing only the header and the layer statement, `git log` still shows the full history back to 2011, `git ls-remote` for the old URL redirects, and `v6` builds Foundation 6.9.0 exactly as before.

## 11. Out of scope for phase 0

Any token, reset, or base style (phase 1). The `foundation-sites` npm deprecation notice (at 7.0.0). The `@foundation` npm scope (Joe's separate effort). The LICENSE copyright line (Joe's call). Downstream naming for Stacks and themes. The foundationcss.com side of docs ingestion beyond matching the existing front matter.
