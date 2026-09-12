# Yeti Phase 0: Repo Transition and Skeleton Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the Foundation for Sites 6 repository into the Yeti repository: cleared tree, source skeleton, cascade layer declaration, manifest schema, the validate/build/gen-docs tooling with tests, a browser smoke test, CI, and the written artifacts for the announcement.

**Architecture:** Plain Node 22 ES modules under `bin/` with one responsibility per file in `bin/lib/`. `validate.js` is the gate everything else calls first. `build.js` concatenates, never transforms. `gen-docs.js` renders Markdown from the merged manifest. Tests use `node:test` against temporary directories built from inline fixtures, plus one Playwright smoke test served by a twenty-line static server.

**Tech Stack:** Node 22, npm, `node:test`, `parse5`, Playwright, `@axe-core/playwright`. No Sass, no bundler, no other dependencies.

**Spec:** `docs/superpowers/specs/2026-09-12-yeti-phase-0-repo-transition-design.md` (parent: `docs/superpowers/specs/2026-09-12-yeti-architecture-design.md`)

## Global Constraints

- **Commit each task on `feature/yeti-phase-0` with the message the task gives. Never push, merge, tag, or publish.** Joe reviews and merges the branch. (Joe authorized per-task commits on 2026-09-12.)
- Never add `Co-Authored-By: Claude` or any Claude trailer to any commit message you suggest.
- Node `>=22`. Package manager is npm. `package-lock.json` is committed.
- Dev dependencies are exactly `playwright`, `@axe-core/playwright`, `parse5`. Adding any other dependency is out of scope; stop and report instead.
- Tooling imports only `node:fs`, `node:path`, `node:os`, `node:url`, `node:http`, `node:child_process`, `parse5`, and web-standard globals. No other Node-only packages.
- All tooling output lines are `<relative file>[:<line>]: <message>`. Scripts exit non-zero on any error and report every error, not just the first.
- The cascade layer statement is exactly `@layer yeti.reset, yeti.base, yeti.layouts, yeti.components, yeti.utilities;`.
- Package name `yeti-css`, version `7.0.0-alpha.0`, license MIT, homepage `https://foundationcss.com/yeti/`, repository `github:foundation/yeti`.
- No CSS other than `src/layers.css` and `src/yeti.css` is written in this phase.
- `docs/superpowers/` is never deleted or modified by tooling. `gen-docs.js` only touches top-level `docs/*.md` files it generated.
- Test fixtures use fictional names (`rail`, `pill`). Do not use real Yeti component names in fixtures; naming is decided in phase 2.
- Run only the test file for the task at hand while working. Run the full suite only in Task 14.
- Deviation from spec §5, recorded here: fixtures are built inline by `test/tools/helpers.js` (`makeTree`, `validTree`) instead of checked-in `test/fixtures/` folders. Each test states its own inputs, which is easier to read and impossible to leave stale.

---

## File map

| Path | Responsibility |
|---|---|
| `src/layers.css` | The single `@layer` statement. |
| `src/yeti.css` | Entry point. Imports `layers.css` first, then everything else as phases add it. |
| `schema/manifest.schema.json` | JSON Schema for one component manifest. |
| `bin/lib/layers.js` | Exports the layer names and statement so validate, tests, and the smoke test share one definition. |
| `bin/lib/schema-check.js` | JSON Schema subset validator. `checkSchema(schema, value) -> [{ path, message }]`. |
| `bin/lib/manifest.js` | Load every manifest, cross-check against folder and schema, merge. |
| `bin/lib/html.js` | parse5 wrapper: parse, walk, class list, attributes, child counting for the child-selector subset. |
| `bin/lib/imports.js` | `@import` splitting and recursive resolution with cycle detection. Also `stripComments`. |
| `bin/lib/front-matter.js` | Emit Proton-style YAML front matter. |
| `bin/validate.js` | Orchestrates all checks. Exports `validate()` and individual check functions. CLI. |
| `bin/build.js` | Bundle, copy, merge manifest to `dist/`. Exports `build()` and `bundle()`. CLI. |
| `bin/gen-docs.js` | Render `docs/<name>.md` per manifest; orphan cleanup. Exports `generateDocs()` and `renderPage()`. CLI. |
| `bin/release.js` | Skeleton: version stamp, build, docs, zip. Exports `stampVersion()`. CLI. |
| `test/tools/helpers.js` | `makeTree()`, `validManifest()`, `validTree()`, path constants. |
| `test/tools/*.test.js` | One test file per module above. |
| `test/browser/serve.js` | Static file server for Playwright. |
| `test/browser/smoke.html`, `smoke.spec.js` | The layer-order and axe assertions. |
| `playwright.config.js` | Three engines, web server, base URL. |
| `.github/workflows/ci.yml` | `tools` and `browser` jobs. |
| `README.md`, `CONTRIBUTING.md`, `.github/ISSUE_TEMPLATE/*.md` | Rewritten for Yeti. |
| `docs/superpowers/drafts/*.md` | Announcement issue and release note text for Joe to publish. |

---

### Task 1: Feature branch and cleared tree

**Files:**
- Delete: everything listed in spec §4
- Create: `.gitignore` (replaced)

**Interfaces:**
- Produces: a branch `feature/yeti-phase-0` whose tree contains only the kept files plus `docs/superpowers/`.

- [ ] **Step 1: Confirm the tracked tree is clean**

Run: `git status --porcelain --untracked-files=no`
Expected: empty output. `docs/superpowers/` is untracked and is expected; it becomes part of this branch. If `package.json` or `yarn.lock` show as modified, STOP and report: Joe must first commit the shelljs bump to `v6` or discard it (spec §3 step 1). Do not stash or discard it yourself.

- [ ] **Step 2: Confirm `v6` exists**

Run: `git branch --list v6 && git ls-remote --heads origin v6`
Expected: both print `v6`. If either is empty, STOP and report: Joe must create and push `v6` from `develop` (spec §3 step 2) before the tree is cleared.

- [ ] **Step 3: Create the feature branch**

Run: `git checkout -b feature/yeti-phase-0 develop`
Expected: `Switched to a new branch 'feature/yeti-phase-0'`

- [ ] **Step 4: Remove the Foundation 6 tree**

```bash
git rm -r -q --ignore-unmatch \
  .babelrc .browserslistrc .commitlintrc.yml .eslintrc .husky .sass-lint.yml \
  .sonarcloud.properties .versions .npmignore _build _vendor assets bower.json browserstack.json \
  composer.json customizer dist docs/assets docs/layout docs/pages docs/partials docs/search.yml \
  gulp gulpfile.js js meteor-README.md package.js package.nuspec patches rollup.config.js \
  sache.json scss test webpack.config.js yarn.lock .github/workflows/main.yml .github/ISSUE_TEMPLATE.md
rm -rf .sass-cache _build dist node_modules .DS_Store customizer scss js test docs/assets docs/layout docs/pages docs/partials
```

- [ ] **Step 5: Verify what remains**

Run: `git ls-files | grep -v '^docs/superpowers/' && ls -a`
Expected `git ls-files` output, exactly:

```
.editorconfig
.github/ISSUE_TEMPLATE/1-bug-report.md
.github/ISSUE_TEMPLATE/2-feature-request.md
.github/ISSUE_TEMPLATE/3-documentation.md
.github/ISSUE_TEMPLATE/4-maintainance.md
.github/PULL_REQUEST_TEMPLATE.md
.gitignore
CONTRIBUTING.md
LICENSE
README.md
SECURITY.md
code-of-conduct.md
package.json
```

`docs/superpowers/` is untracked and must still be on disk. Stage it now with `git add docs/superpowers` so the specs, research, and this plan travel with the branch. If anything else is listed, remove it; if anything from this list is missing, restore it with `git checkout develop -- <path>`.

- [ ] **Step 6: Disarm the old git hooks**

Husky pointed git at `.husky/` and an older husky version wrote hook scripts into `.git/hooks/`. With `.husky/` gone, unset the path and remove any husky-generated hooks so commits and pushes run no legacy checks:

```bash
git config --unset core.hooksPath
grep -l "husky" .git/hooks/* 2>/dev/null | xargs rm -f
```

Run: `git config --get core.hooksPath; ls .git/hooks | grep -v '\.sample$'`
Expected: both print nothing.

- [ ] **Step 7: Replace `.gitignore`**

```
node_modules/
dist/
test-results/
playwright-report/
*.zip
.DS_Store
```

- [ ] **Step 8: Commit**

```bash
git add -A
git add docs/superpowers
git commit -m "chore: clear the Foundation 6 tree for Yeti"
```
Report the `git status --short` summary. Do not commit.

---

### Task 2: Package, Node pin, source skeleton, shared constants

**Files:**
- Create: `package.json` (replace), `.nvmrc`, `src/yeti.css`, `src/layers.css`, `src/tokens/.gitkeep`, `src/base/.gitkeep`, `src/layouts/.gitkeep`, `src/components/.gitkeep`, `src/utilities/.gitkeep`, `docs/guides/.gitkeep`, `bin/lib/layers.js`, `test/tools/helpers.js`
- Create: `package-lock.json` (by `npm install`)

**Interfaces:**
- Produces: `LAYER_NAMES: string[]`, `LAYER_STATEMENT: string` from `bin/lib/layers.js`. `makeTree(files: Record<string, string|object>) -> string tmpDir`, `validManifest(overrides?) -> object`, `validTree(extra?) -> Record<string,string|object>`, `REPO_ROOT`, `SCHEMA_PATH` from `test/tools/helpers.js`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "yeti-css",
  "version": "7.0.0-alpha.0",
  "description": "Yeti: a CSS-first, native, zero-build layout and styling framework by Foundation.",
  "license": "MIT",
  "type": "module",
  "homepage": "https://foundationcss.com/yeti/",
  "repository": "github:foundation/yeti",
  "engines": {
    "node": ">=22"
  },
  "files": [
    "dist",
    "LICENSE",
    "README.md"
  ],
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

- [ ] **Step 2: Write `.nvmrc`**

```
22
```

- [ ] **Step 3: Install dependencies**

Run: `node --version && npm install`
Expected: Node prints `v22.x.x`. npm creates `package-lock.json` and `node_modules/` with exactly those three top-level dev dependencies (`npm ls --depth=0` shows three entries). If Node is not 22, run `nvm use 22` first.

- [ ] **Step 4: Install Playwright browsers locally**

Run: `npx playwright install`
Expected: downloads Chromium, Firefox, and WebKit. This is a one-time local step; CI does it with `--with-deps`.

- [ ] **Step 5: Write `src/layers.css`**

```css
/* The cascade layer order for Yeti. Declared once, here, and imported first.
   Every rule Yeti ships lives inside one of these sublayers. A user's plain,
   unlayered CSS beats all of them by default. */
@layer yeti.reset, yeti.base, yeti.layouts, yeti.components, yeti.utilities;
```

- [ ] **Step 6: Write `src/yeti.css`**

```css
/* Yeti entry point. layers.css must come first so the layer order is fixed
   before any rule is parsed. Later phases append @import lines below it. */
@import "layers.css";
```

- [ ] **Step 7: Create the empty folders**

Run: `mkdir -p src/tokens src/base src/layouts src/components src/utilities docs/guides && touch src/tokens/.gitkeep src/base/.gitkeep src/layouts/.gitkeep src/components/.gitkeep src/utilities/.gitkeep docs/guides/.gitkeep`

- [ ] **Step 8: Write `bin/lib/layers.js`**

```js
// The one definition of Yeti's cascade layer order. validate.js checks
// src/layers.css against it and the browser smoke test asserts it in CSSOM.
export const LAYER_NAMES = [
  'yeti.reset',
  'yeti.base',
  'yeti.layouts',
  'yeti.components',
  'yeti.utilities',
];

export const LAYER_STATEMENT = `@layer ${LAYER_NAMES.join(', ')};`;
```

- [ ] **Step 9: Write `test/tools/helpers.js`**

```js
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAYER_STATEMENT } from '../../bin/lib/layers.js';

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const SCHEMA_PATH = path.join(REPO_ROOT, 'schema/manifest.schema.json');

/** Writes a map of relative path -> content (string or JSON-able object) into a fresh temp dir. */
export function makeTree(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yeti-'));
  for (const [rel, content] of Object.entries(files)) {
    const file = path.join(dir, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, typeof content === 'string' ? content : JSON.stringify(content, null, 2) + '\n');
  }
  return dir;
}

/** A complete, valid manifest for a fictional layout called "rail". */
export function validManifest(overrides = {}) {
  return {
    $schema: '../../../schema/manifest.schema.json',
    name: 'rail',
    kind: 'layout',
    description: 'A horizontal rail of items with a shared gap.',
    class: 'rail',
    attributes: [
      { name: 'data-gap', type: 'enum', values: ['s', 'm', 'l'], default: 'm', description: 'Gap between items.' },
      { name: 'data-wrap', type: 'boolean', description: 'Allow items to wrap.' },
      { name: 'data-count', type: 'number', description: 'Expected item count, for testing number attributes.' },
    ],
    classes: [],
    children: [{ selector: '> *', min: 1, max: null, description: 'The items.' }],
    tokens: [
      { name: '--rail-gap', public: true, description: 'The gap between items.' },
      { name: '--rail-internal', public: false },
    ],
    a11y: { requiredAttributes: [], keyboard: [] },
    js: null,
    support: { unguarded: ['flexbox'], guarded: [] },
    since: '7.0.0',
    example: 'example.html',
    ...overrides,
  };
}

/** A minimal valid repo tree (relative paths) containing the rail layout. */
export function validTree(extra = {}) {
  return {
    'schema/manifest.schema.json': fs.readFileSync(SCHEMA_PATH, 'utf8'),
    'src/layers.css': `${LAYER_STATEMENT}\n`,
    'src/yeti.css': '@import "layers.css";\n@import "layouts/rail/rail.css";\n',
    'src/layouts/rail/manifest.json': validManifest(),
    'src/layouts/rail/rail.css':
      '@layer yeti.layouts {\n  .rail { display: flex; }\n  .rail > * + * { margin-inline-start: var(--rail-gap, 1rem); }\n}\n',
    'src/layouts/rail/example.html': '<div class="rail" data-gap="l"><p>One</p><p>Two</p></div>\n',
    ...extra,
  };
}
```

Note: `validTree()` reads the real schema, which does not exist until Task 4. That is fine; nothing in Task 2 or 3 calls `validTree()`.

- [ ] **Step 10: Sanity check the module loads**

Run: `node -e "import('./bin/lib/layers.js').then(m => console.log(m.LAYER_STATEMENT))"`
Expected: `@layer yeti.reset, yeti.base, yeti.layouts, yeti.components, yeti.utilities;`

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: add Yeti package, layer declaration, and source skeleton"
```

---

### Task 3: JSON Schema subset validator

**Files:**
- Create: `bin/lib/schema-check.js`
- Test: `test/tools/schema-check.test.js`

**Interfaces:**
- Produces: `checkSchema(schema: object, value: unknown, options?: { root?: object, path?: string }) -> Array<{ path: string, message: string }>`. Throws `Error` on an unsupported schema keyword, unsupported `type`, or unresolvable `$ref`.

- [ ] **Step 1: Write the failing tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSchema } from '../../bin/lib/schema-check.js';

test('a valid value produces no errors', () => {
  const schema = { type: 'object', required: ['a'], properties: { a: { type: 'string' } } };
  assert.deepEqual(checkSchema(schema, { a: 'x' }), []);
});

test('type mismatch is reported with the JSON path', () => {
  const schema = { type: 'object', properties: { n: { type: 'integer' } } };
  assert.deepEqual(checkSchema(schema, { n: 'x' }), [{ path: '$.n', message: 'expected integer, got string' }]);
  assert.deepEqual(checkSchema(schema, { n: 1.5 }), [{ path: '$.n', message: 'expected integer, got number' }]);
});

test('required and additionalProperties: false', () => {
  const schema = { type: 'object', required: ['a'], additionalProperties: false, properties: { a: { type: 'string' } } };
  const messages = checkSchema(schema, { b: 1 }).map((e) => e.message).sort();
  assert.deepEqual(messages, ['missing required property "a"', 'unexpected property "b"']);
});

test('enum and const', () => {
  assert.equal(checkSchema({ enum: ['x', 'y'] }, 'z')[0].message, 'expected one of "x", "y", got "z"');
  assert.deepEqual(checkSchema({ enum: ['x', 'y'] }, 'y'), []);
  assert.equal(checkSchema({ const: true }, false)[0].message, 'expected true, got false');
});

test('pattern applies to strings only', () => {
  assert.equal(checkSchema({ type: 'string', pattern: '^[a-z]+$' }, 'AB')[0].message, '"AB" does not match ^[a-z]+$');
  assert.deepEqual(checkSchema({ pattern: '^[a-z]+$' }, 42), []);
});

test('array items, minItems, uniqueItems', () => {
  const schema = { type: 'array', items: { type: 'string' }, minItems: 1, uniqueItems: true };
  assert.deepEqual(checkSchema(schema, []), [{ path: '$', message: 'expected at least 1 items, got 0' }]);
  assert.deepEqual(checkSchema(schema, ['a', 'a']), [{ path: '$', message: 'items must be unique' }]);
  assert.deepEqual(checkSchema(schema, ['a', 1]), [{ path: '$[1]', message: 'expected string, got number' }]);
});

test('minimum on numbers', () => {
  assert.deepEqual(checkSchema({ type: 'integer', minimum: 0 }, -1), [{ path: '$', message: '-1 is below the minimum 0' }]);
});

test('a type array allows null and skips object checks for null', () => {
  const schema = { type: ['object', 'null'], required: ['m'], properties: { m: { type: 'string' } } };
  assert.deepEqual(checkSchema(schema, null), []);
  assert.equal(checkSchema(schema, {})[0].message, 'missing required property "m"');
  assert.equal(checkSchema(schema, 'x')[0].message, 'expected object or null, got string');
});

test('$ref resolves into $defs', () => {
  const schema = {
    type: 'object',
    properties: { item: { $ref: '#/$defs/thing' } },
    $defs: { thing: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } } },
  };
  assert.deepEqual(checkSchema(schema, { item: { id: 'a' } }), []);
  assert.deepEqual(checkSchema(schema, { item: {} }), [{ path: '$.item', message: 'missing required property "id"' }]);
});

test('an additionalProperties schema is applied to extra keys', () => {
  const schema = { type: 'object', properties: {}, additionalProperties: { type: 'number' } };
  assert.deepEqual(checkSchema(schema, { x: 'no' }), [{ path: '$.x', message: 'expected number, got string' }]);
});

test('unsupported keywords throw so the subset cannot silently grow', () => {
  assert.throws(() => checkSchema({ maxLength: 3 }, 'abc'), /Unsupported schema keyword "maxLength" at \$/);
  assert.throws(() => checkSchema({ type: 'date' }, 'x'), /Unsupported type "date"/);
  assert.throws(() => checkSchema({ $ref: '#/$defs/nope' }, {}), /Unresolvable \$ref/);
});

test('annotation keywords are ignored', () => {
  assert.deepEqual(checkSchema({ $schema: 'x', $id: 'y', title: 't', description: 'd', type: 'string', default: 'a', examples: ['b'] }, 'z'), []);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/tools/schema-check.test.js`
Expected: FAIL, `Cannot find module '.../bin/lib/schema-check.js'`

- [ ] **Step 3: Write `bin/lib/schema-check.js`**

```js
// A validator for the subset of JSON Schema (draft 2020-12) that
// schema/manifest.schema.json uses. Deliberately small: any keyword outside
// KEYWORDS throws, so the schema cannot grow past what this code checks.

const ANNOTATIONS = new Set(['$schema', '$id', '$comment', 'title', 'description', '$defs', 'default', 'examples']);
const KEYWORDS = new Set([
  '$ref', 'type', 'enum', 'const', 'required', 'properties', 'additionalProperties',
  'items', 'pattern', 'minItems', 'uniqueItems', 'minimum',
]);

export function checkSchema(schema, value, options = {}) {
  const root = options.root ?? schema;
  const path = options.path ?? '$';

  for (const key of Object.keys(schema)) {
    if (!KEYWORDS.has(key) && !ANNOTATIONS.has(key)) {
      throw new Error(`Unsupported schema keyword "${key}" at ${path}`);
    }
  }
  if (schema.$ref !== undefined) {
    return checkSchema(resolveRef(root, schema.$ref), value, { root, path });
  }

  const errors = [];

  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((t) => matchesType(t, value))) {
      errors.push({ path, message: `expected ${types.join(' or ')}, got ${typeName(value)}` });
      return errors;
    }
  }
  if (schema.enum !== undefined && !schema.enum.some((v) => deepEqual(v, value))) {
    const list = schema.enum.map((v) => JSON.stringify(v)).join(', ');
    errors.push({ path, message: `expected one of ${list}, got ${JSON.stringify(value)}` });
  }
  if (schema.const !== undefined && !deepEqual(schema.const, value)) {
    errors.push({ path, message: `expected ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}` });
  }
  if (typeof value === 'string' && schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
    errors.push({ path, message: `"${value}" does not match ${schema.pattern}` });
  }
  if (typeof value === 'number' && schema.minimum !== undefined && value < schema.minimum) {
    errors.push({ path, message: `${value} is below the minimum ${schema.minimum}` });
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      errors.push({ path, message: `expected at least ${schema.minItems} items, got ${value.length}` });
    }
    if (schema.uniqueItems && new Set(value.map((v) => JSON.stringify(v))).size !== value.length) {
      errors.push({ path, message: 'items must be unique' });
    }
    if (schema.items !== undefined) {
      value.forEach((item, i) => errors.push(...checkSchema(schema.items, item, { root, path: `${path}[${i}]` })));
    }
  }
  if (isPlainObject(value)) {
    for (const key of schema.required ?? []) {
      if (!(key in value)) errors.push({ path, message: `missing required property "${key}"` });
    }
    const props = schema.properties ?? {};
    for (const [key, sub] of Object.entries(props)) {
      if (key in value) errors.push(...checkSchema(sub, value[key], { root, path: `${path}.${key}` }));
    }
    if (schema.additionalProperties !== undefined) {
      for (const key of Object.keys(value)) {
        if (key in props) continue;
        if (schema.additionalProperties === false) {
          errors.push({ path, message: `unexpected property "${key}"` });
        } else if (isPlainObject(schema.additionalProperties)) {
          errors.push(...checkSchema(schema.additionalProperties, value[key], { root, path: `${path}.${key}` }));
        }
      }
    }
  }
  return errors;
}

function resolveRef(root, ref) {
  if (!ref.startsWith('#/')) throw new Error(`Unsupported $ref "${ref}" (only #/ references are supported)`);
  let node = root;
  for (const part of ref.slice(2).split('/')) {
    node = node?.[part];
    if (node === undefined) throw new Error(`Unresolvable $ref "${ref}"`);
  }
  return node;
}

function matchesType(type, value) {
  switch (type) {
    case 'null': return value === null;
    case 'array': return Array.isArray(value);
    case 'object': return isPlainObject(value);
    case 'integer': return Number.isInteger(value);
    case 'number': return typeof value === 'number' && Number.isFinite(value);
    case 'string': return typeof value === 'string';
    case 'boolean': return typeof value === 'boolean';
    default: throw new Error(`Unsupported type "${type}"`);
  }
}

function typeName(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test test/tools/schema-check.test.js`
Expected: all 12 tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(tools): add JSON Schema subset validator"
```

---

### Task 4: Manifest schema and loader

**Files:**
- Create: `schema/manifest.schema.json`, `bin/lib/manifest.js`
- Test: `test/tools/manifest.test.js`

**Interfaces:**
- Consumes: `checkSchema` from Task 3; `makeTree`, `validManifest`, `validTree`, `SCHEMA_PATH` from Task 2.
- Produces: `KIND_DIRS = { layouts: 'layout', components: 'component', utilities: 'utility' }`, `KIND_TO_DIR = { layout: 'layouts', component: 'components', utility: 'utilities' }`, `loadSchema(schemaPath) -> object`, `loadManifests(srcDir, schema) -> { entries: Array<{ dir, file, kind, name, manifest }>, errors: Array<{ file, message }> }`, `mergeManifests(entries) -> { merged: Record<name, manifest>, errors }`, `loadAndMerge(srcDir, schema) -> { entries, merged, errors }`. All `file` values are absolute paths.

- [ ] **Step 1: Write `schema/manifest.schema.json`**

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://foundationcss.com/yeti/schema/manifest.json",
  "title": "Yeti component manifest",
  "description": "Describes one Yeti layout, component, or utility: its identity class, configuration attributes, expected children, tokens, accessibility contract, optional JS module, and browser support notes.",
  "type": "object",
  "additionalProperties": false,
  "required": ["name", "kind", "description", "class", "attributes", "classes", "children", "tokens", "a11y", "js", "support", "since", "example"],
  "properties": {
    "$schema": { "type": "string" },
    "name": { "type": "string", "pattern": "^[a-z][a-z0-9-]*$", "description": "Must equal the folder name. Unique across the framework." },
    "kind": { "enum": ["layout", "component", "utility"] },
    "description": { "type": "string", "pattern": "\\S", "description": "One sentence, used verbatim in docs and the MCP server." },
    "class": { "type": "string", "pattern": "^[a-z][a-z0-9-]*$", "description": "The identity class. Must equal name." },
    "attributes": { "type": "array", "items": { "$ref": "#/$defs/attribute" } },
    "classes": { "type": "array", "items": { "$ref": "#/$defs/modifierClass" } },
    "children": { "type": "array", "items": { "$ref": "#/$defs/child" } },
    "tokens": { "type": "array", "items": { "$ref": "#/$defs/token" } },
    "a11y": {
      "type": "object",
      "additionalProperties": false,
      "required": ["requiredAttributes", "keyboard"],
      "properties": {
        "role": { "type": "string" },
        "requiredAttributes": { "type": "array", "items": { "type": "string" }, "uniqueItems": true },
        "keyboard": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "required": ["key", "action"],
            "properties": { "key": { "type": "string" }, "action": { "type": "string" } }
          }
        },
        "notes": { "type": "string" }
      }
    },
    "js": {
      "type": ["object", "null"],
      "additionalProperties": false,
      "required": ["module", "optional"],
      "properties": {
        "module": { "type": "string", "description": "Path relative to the component folder." },
        "optional": { "const": true }
      }
    },
    "support": {
      "type": "object",
      "additionalProperties": false,
      "required": ["unguarded", "guarded"],
      "properties": {
        "unguarded": { "type": "array", "items": { "type": "string" } },
        "guarded": { "type": "array", "items": { "type": "string" } }
      }
    },
    "since": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
    "example": { "const": "example.html" }
  },
  "$defs": {
    "attribute": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "type", "description"],
      "properties": {
        "name": { "type": "string", "pattern": "^data-[a-z][a-z0-9-]*$" },
        "type": { "enum": ["enum", "boolean", "number", "string"] },
        "values": { "type": "array", "items": { "type": "string" }, "minItems": 1, "uniqueItems": true },
        "default": { "type": ["string", "number", "boolean"] },
        "description": { "type": "string" }
      }
    },
    "modifierClass": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "type", "description"],
      "properties": {
        "name": { "type": "string", "pattern": "^[a-z][a-z0-9-]*$" },
        "type": { "const": "boolean" },
        "description": { "type": "string" }
      }
    },
    "child": {
      "type": "object",
      "additionalProperties": false,
      "required": ["selector"],
      "properties": {
        "selector": { "type": "string", "description": "Relative to the root: '> *', '> tag', '> .class', '> tag.class', or the same without '>' for descendants." },
        "min": { "type": "integer", "minimum": 0 },
        "max": { "type": ["integer", "null"], "minimum": 0 },
        "description": { "type": "string" }
      }
    },
    "token": {
      "type": "object",
      "additionalProperties": false,
      "required": ["name", "public"],
      "properties": {
        "name": { "type": "string", "pattern": "^--[a-z][a-z0-9-]*$" },
        "public": { "type": "boolean", "description": "Public tokens are the theming API and appear in docs. Internal ones may change between minors." },
        "description": { "type": "string" }
      }
    }
  }
}
```

- [ ] **Step 2: Write the failing tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { loadSchema, loadAndMerge } from '../../bin/lib/manifest.js';
import { makeTree, validManifest, validTree, SCHEMA_PATH } from './helpers.js';

const schema = () => loadSchema(SCHEMA_PATH);
const load = (files) => {
  const dir = makeTree(files);
  return { dir, ...loadAndMerge(path.join(dir, 'src'), schema()) };
};
const messages = (result) => result.errors.map((e) => e.message);

test('the real schema itself only uses supported keywords', () => {
  assert.doesNotThrow(() => loadAndMerge(makeTree(validTree()) + '/src', schema()));
});

test('a valid tree loads one entry and merges it by name', () => {
  const r = load(validTree());
  assert.deepEqual(r.errors, []);
  assert.equal(r.entries.length, 1);
  assert.equal(r.entries[0].kind, 'layout');
  assert.equal(r.merged.rail.class, 'rail');
});

test('an empty src produces no entries and no errors', () => {
  const r = load({ 'src/yeti.css': '' });
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.merged, {});
});

test('missing files in a component folder are reported together', () => {
  const r = load({ 'src/layouts/rail/manifest.json': validManifest() });
  assert.deepEqual(messages(r), ['missing rail.css, example.html']);
});

test('invalid JSON is reported', () => {
  const r = load(validTree({ 'src/layouts/rail/manifest.json': '{ not json' }));
  assert.match(messages(r)[0], /^invalid JSON: /);
});

test('schema violations carry the JSON path', () => {
  const r = load(validTree({ 'src/layouts/rail/manifest.json': validManifest({ since: 'seven', extra: 1 }) }));
  assert.deepEqual(messages(r).sort(), ['$.since: "seven" does not match ^\\d+\\.\\d+\\.\\d+$', '$: unexpected property "extra"']);
});

test('name must equal the folder name', () => {
  const r = load(validTree({ 'src/layouts/rail/manifest.json': validManifest({ name: 'track', class: 'track' }) }));
  assert.deepEqual(messages(r), ['name "track" must equal folder name "rail"']);
});

test('kind must match the parent folder', () => {
  const r = load(validTree({ 'src/layouts/rail/manifest.json': validManifest({ kind: 'component' }) }));
  assert.deepEqual(messages(r), ['kind "component" must be "layout" inside layouts/']);
});

test('class must equal name', () => {
  const r = load(validTree({ 'src/layouts/rail/manifest.json': validManifest({ class: 'rails' }) }));
  assert.deepEqual(messages(r), ['class "rails" must equal name "rail"']);
});

test('enum attributes need values and non-enum attributes must not have them', () => {
  const attributes = [
    { name: 'data-a', type: 'enum', description: 'no values' },
    { name: 'data-b', type: 'boolean', values: ['x'], description: 'has values' },
    { name: 'data-c', type: 'enum', values: ['x'], default: 'y', description: 'bad default' },
  ];
  const r = load(validTree({ 'src/layouts/rail/manifest.json': validManifest({ attributes }) }));
  assert.deepEqual(messages(r), [
    'attribute data-a: enum type requires values',
    'attribute data-b: values is only allowed for enum type',
    'attribute data-c: default "y" is not one of its values',
  ]);
});

test('js.module must exist', () => {
  const r = load(validTree({ 'src/layouts/rail/manifest.json': validManifest({ js: { module: 'rail.js', optional: true } }) }));
  assert.deepEqual(messages(r), ['js.module "rail.js" does not exist']);
});

test('duplicate names across kinds are rejected', () => {
  const r = load(validTree({
    'src/components/rail/manifest.json': validManifest({ kind: 'component' }),
    'src/components/rail/rail.css': '',
    'src/components/rail/example.html': '<div class="rail"><p>x</p></div>',
  }));
  assert.equal(messages(r).length, 1);
  assert.match(messages(r)[0], /^duplicate name "rail"/);
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `node --test test/tools/manifest.test.js`
Expected: FAIL, `Cannot find module '.../bin/lib/manifest.js'`

- [ ] **Step 4: Write `bin/lib/manifest.js`**

```js
import fs from 'node:fs';
import path from 'node:path';
import { checkSchema } from './schema-check.js';

export const KIND_DIRS = { layouts: 'layout', components: 'component', utilities: 'utility' };
export const KIND_TO_DIR = { layout: 'layouts', component: 'components', utility: 'utilities' };

export function loadSchema(schemaPath) {
  return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
}

/** Loads every manifest under srcDir/{layouts,components,utilities}/<name>/ and cross-checks it. */
export function loadManifests(srcDir, schema) {
  const entries = [];
  const errors = [];

  for (const [dirName, kind] of Object.entries(KIND_DIRS)) {
    const kindDir = path.join(srcDir, dirName);
    if (!fs.existsSync(kindDir)) continue;
    const folders = fs.readdirSync(kindDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .sort();

    for (const folder of folders) {
      const dir = path.join(kindDir, folder);
      const file = path.join(dir, 'manifest.json');
      const missing = ['manifest.json', `${folder}.css`, 'example.html'].filter((f) => !fs.existsSync(path.join(dir, f)));
      if (missing.length) {
        errors.push({ file: dir, message: `missing ${missing.join(', ')}` });
        continue;
      }

      let manifest;
      try {
        manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
      } catch (e) {
        errors.push({ file, message: `invalid JSON: ${e.message}` });
        continue;
      }

      const schemaErrors = checkSchema(schema, manifest);
      for (const e of schemaErrors) errors.push({ file, message: `${e.path}: ${e.message}` });
      if (schemaErrors.length) continue;

      if (manifest.name !== folder) errors.push({ file, message: `name "${manifest.name}" must equal folder name "${folder}"` });
      if (manifest.kind !== kind) errors.push({ file, message: `kind "${manifest.kind}" must be "${kind}" inside ${dirName}/` });
      if (manifest.class !== manifest.name) errors.push({ file, message: `class "${manifest.class}" must equal name "${manifest.name}"` });

      for (const attr of manifest.attributes) {
        if (attr.type === 'enum' && !attr.values) {
          errors.push({ file, message: `attribute ${attr.name}: enum type requires values` });
        } else if (attr.type !== 'enum' && attr.values) {
          errors.push({ file, message: `attribute ${attr.name}: values is only allowed for enum type` });
        } else if (attr.type === 'enum' && attr.default !== undefined && !attr.values.includes(attr.default)) {
          errors.push({ file, message: `attribute ${attr.name}: default "${attr.default}" is not one of its values` });
        }
      }

      if (manifest.js && !fs.existsSync(path.join(dir, manifest.js.module))) {
        errors.push({ file, message: `js.module "${manifest.js.module}" does not exist` });
      }

      entries.push({ dir, file, kind, name: manifest.name, manifest });
    }
  }
  return { entries, errors };
}

/** Merges entries into one object keyed by name, rejecting duplicate names and classes. */
export function mergeManifests(entries) {
  const merged = {};
  const errors = [];
  const byName = new Map();
  const byClass = new Map();

  for (const entry of entries) {
    const { name, class: cls } = entry.manifest;
    if (byName.has(name)) {
      errors.push({ file: entry.file, message: `duplicate name "${name}" (also declared in ${byName.get(name)})` });
      continue;
    }
    if (byClass.has(cls)) {
      errors.push({ file: entry.file, message: `duplicate class "${cls}" (also declared in ${byClass.get(cls)})` });
      continue;
    }
    byName.set(name, entry.file);
    byClass.set(cls, entry.file);
    merged[name] = entry.manifest;
  }
  return { merged, errors };
}

export function loadAndMerge(srcDir, schema) {
  const loaded = loadManifests(srcDir, schema);
  const { merged, errors } = mergeManifests(loaded.entries);
  return { entries: loaded.entries, merged, errors: [...loaded.errors, ...errors] };
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test test/tools/manifest.test.js`
Expected: all 12 tests pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(tools): add manifest schema and loader"
```

---

### Task 5: HTML helpers

**Files:**
- Create: `bin/lib/html.js`
- Test: `test/tools/html.test.js`

**Interfaces:**
- Consumes: `parse5`.
- Produces: `parseHtml(html) -> parse5 DocumentFragment` (parsed with `sourceCodeLocationInfo`, so every element carries `sourceCodeLocation.startLine`), `walkElements(node, fn(el))`, `elementChildren(el) -> el[]`, `classList(el) -> string[]`, `attributes(el) -> Map<string,string>` (bare attributes map to `''`), `matchesSimple(el, simple) -> boolean` for `*`, `tag`, `.class`, `tag.class`, `.a.b`, and `countMatches(el, selector) -> number` where a leading `>` counts direct children and no `>` counts all descendants.

- [ ] **Step 1: Write the failing tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHtml, walkElements, elementChildren, classList, attributes, matchesSimple, countMatches } from '../../bin/lib/html.js';

const root = () => parseHtml('<div class="rail  wide" data-gap="l" data-wrap><p>One</p><p class="last">Two</p><span><p class="last deep"></p></span></div>');
const div = () => root().childNodes[0];

test('walkElements visits every element in document order', () => {
  const tags = [];
  walkElements(root(), (el) => tags.push(el.tagName));
  assert.deepEqual(tags, ['div', 'p', 'p', 'span', 'p']);
});

test('classList splits on whitespace and drops empties', () => {
  assert.deepEqual(classList(div()), ['rail', 'wide']);
  assert.deepEqual(classList(elementChildren(div())[0]), []);
});

test('attributes maps bare attributes to the empty string', () => {
  const a = attributes(div());
  assert.equal(a.get('data-gap'), 'l');
  assert.equal(a.get('data-wrap'), '');
  assert.equal(a.has('data-nope'), false);
});

test('matchesSimple handles *, tag, .class, tag.class, and multiple classes', () => {
  const [p1, p2, span] = elementChildren(div());
  assert.equal(matchesSimple(p1, '*'), true);
  assert.equal(matchesSimple(p1, 'p'), true);
  assert.equal(matchesSimple(p1, 'span'), false);
  assert.equal(matchesSimple(p2, '.last'), true);
  assert.equal(matchesSimple(p2, 'p.last'), true);
  assert.equal(matchesSimple(p1, 'p.last'), false);
  assert.equal(matchesSimple(elementChildren(span)[0], '.last.deep'), true);
});

test('countMatches with > counts direct children only', () => {
  assert.equal(countMatches(div(), '> *'), 3);
  assert.equal(countMatches(div(), '> p'), 2);
  assert.equal(countMatches(div(), '> .last'), 1);
  assert.equal(countMatches(div(), '> span'), 1);
  assert.equal(countMatches(div(), '> h1'), 0);
});

test('countMatches without > counts all descendants', () => {
  assert.equal(countMatches(div(), 'p'), 3);
  assert.equal(countMatches(div(), '.last'), 2);
  assert.equal(countMatches(div(), 'p.deep'), 1);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/tools/html.test.js`
Expected: FAIL, `Cannot find module '.../bin/lib/html.js'`

- [ ] **Step 3: Write `bin/lib/html.js`**

```js
// Thin wrapper over parse5 for the validator. Examples are HTML fragments.
// The selector subset supported by countMatches is deliberately small:
//   '> X'  direct children matching X
//   'X'    all descendants matching X
// where X is '*', 'tag', '.class', 'tag.class', or '.a.b'.
import { parseFragment } from 'parse5';

export function parseHtml(html) {
  // Source locations let the validator report the line of the offending element.
  return parseFragment(html, { sourceCodeLocationInfo: true });
}

export function walkElements(node, fn) {
  for (const child of node.childNodes ?? []) {
    if (child.tagName) fn(child);
    walkElements(child, fn);
  }
}

export function elementChildren(el) {
  return (el.childNodes ?? []).filter((c) => c.tagName);
}

export function classList(el) {
  const attr = el.attrs.find((a) => a.name === 'class');
  return attr ? attr.value.split(/\s+/).filter(Boolean) : [];
}

export function attributes(el) {
  return new Map(el.attrs.map((a) => [a.name, a.value]));
}

export function matchesSimple(el, simple) {
  if (simple === '*') return true;
  const [tag, ...classes] = simple.split('.');
  if (tag && el.tagName !== tag) return false;
  const list = classList(el);
  return classes.every((c) => list.includes(c));
}

export function countMatches(el, selector) {
  const s = selector.trim();
  if (s.startsWith('>')) {
    const simple = s.slice(1).trim();
    return elementChildren(el).filter((c) => matchesSimple(c, simple)).length;
  }
  let count = 0;
  walkElements(el, (d) => { if (matchesSimple(d, s)) count += 1; });
  return count;
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test test/tools/html.test.js`
Expected: all 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(tools): add HTML helpers over parse5"
```

---

### Task 6: Import resolution

**Files:**
- Create: `bin/lib/imports.js`
- Test: `test/tools/imports.test.js`

**Interfaces:**
- Consumes: `makeTree` from Task 2.
- Produces: `stripComments(css) -> string` (comments replaced by spaces, newlines kept, so line numbers survive), `splitImports(css, file) -> { imports: Array<{ href, line }>, rest: string, errors: Array<{ file, line, message }> }`, `resolveImports(entryPath) -> { files: Array<{ path: absolute, css: string }>, errors: Array<{ file, line, message }> }` with files in CSS cascade order (imports before the importer's own rules), each file included once.

- [ ] **Step 1: Write the failing tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { stripComments, splitImports, resolveImports } from '../../bin/lib/imports.js';
import { makeTree } from './helpers.js';

test('stripComments keeps line numbers intact', () => {
  const out = stripComments('a /* one\ntwo */ b');
  assert.equal(out.split('\n').length, 2);
  assert.equal(out.replace(/\s+/g, ' ').trim(), 'a b');
});

test('splitImports accepts string and url() forms and returns the rest', () => {
  const css = '/* header */\n@import "a.css";\n@import url("b.css");\n@import url(\'c.css\');\n.x { color: red; }\n';
  const r = splitImports(css, 'entry.css');
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.imports, [{ href: 'a.css', line: 2 }, { href: 'b.css', line: 3 }, { href: 'c.css', line: 4 }]);
  assert.equal(r.rest.trim(), '.x { color: red; }');
});

test('splitImports rejects conditions, absolute paths, and late imports', () => {
  const css = '@import "a.css" layer(x);\n@import "/abs.css";\n@import "https://x/y.css";\n.x {}\n@import "late.css";\n';
  const r = splitImports(css, 'entry.css');
  assert.deepEqual(r.imports, []);
  assert.deepEqual(r.errors.map((e) => `${e.line}: ${e.message}`), [
    '1: @import conditions are not supported ("layer(x)")',
    '2: only relative @import paths are supported ("/abs.css")',
    '3: only relative @import paths are supported ("https://x/y.css")',
    '5: @import must come before all rules',
  ]);
});

test('resolveImports returns files in cascade order, each once', () => {
  const dir = makeTree({
    'yeti.css': '@import "layers.css";\n@import "a/a.css";\n@import "b.css";\n.entry {}\n',
    'layers.css': '@layer x;\n',
    'a/a.css': '@import "../shared.css";\n.a {}\n',
    'b.css': '@import "shared.css";\n.b {}\n',
    'shared.css': '.shared {}\n',
  });
  const r = resolveImports(path.join(dir, 'yeti.css'));
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.files.map((f) => path.relative(dir, f.path)), ['layers.css', 'shared.css', 'a/a.css', 'b.css', 'yeti.css']);
  assert.equal(r.files.at(-1).css.trim(), '.entry {}');
});

test('resolveImports reports a missing file against the importer', () => {
  const dir = makeTree({ 'yeti.css': '@import "nope.css";\n' });
  const r = resolveImports(path.join(dir, 'yeti.css'));
  assert.equal(r.files.length, 1);
  assert.deepEqual(r.errors.map((e) => `${path.basename(e.file)}:${e.line}: ${e.message}`), ['yeti.css:1: imported file "nope.css" does not exist']);
});

test('resolveImports reports a cycle naming the files', () => {
  const dir = makeTree({ 'a.css': '@import "b.css";\n', 'b.css': '@import "a.css";\n' });
  const r = resolveImports(path.join(dir, 'a.css'));
  assert.equal(r.errors.length, 1);
  assert.equal(r.errors[0].message, 'import cycle: a.css -> b.css -> a.css');
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/tools/imports.test.js`
Expected: FAIL, `Cannot find module '.../bin/lib/imports.js'`

- [ ] **Step 3: Write `bin/lib/imports.js`**

```js
// @import handling for build.js. Only the plain, relative, unconditional forms
// are supported, and only where the CSS spec allows them: before any rule.
import fs from 'node:fs';
import path from 'node:path';

const IMPORT_RE = /^@import\s+(?:url\(\s*)?(["'])([^"']+)\1\s*\)?\s*([^;]*);/;

/** Replaces every comment with spaces of the same length, so offsets and line numbers are unchanged. */
export function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

function lineAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

export function splitImports(css, file) {
  const stripped = stripComments(css);
  const imports = [];
  const errors = [];
  let pos = 0;

  for (;;) {
    pos += stripped.slice(pos).match(/^\s*/)[0].length;
    const m = stripped.slice(pos).match(IMPORT_RE);
    if (!m) break;
    const line = lineAt(stripped, pos);
    const href = m[2];
    const conditions = m[3].trim();
    if (conditions) {
      errors.push({ file, line, message: `@import conditions are not supported ("${conditions}")` });
    } else if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('/') || href.startsWith('data:')) {
      errors.push({ file, line, message: `only relative @import paths are supported ("${href}")` });
    } else {
      imports.push({ href, line });
    }
    pos += m[0].length;
  }

  const rest = css.slice(pos);
  const late = stripped.slice(pos).match(/@import\b/);
  if (late) errors.push({ file, line: lineAt(stripped, pos + late.index), message: '@import must come before all rules' });

  return { imports, rest, errors };
}

export function resolveImports(entryPath) {
  const files = [];
  const errors = [];
  const stack = [];

  const visit = (abs) => {
    if (stack.includes(abs)) {
      const cycle = [...stack.slice(stack.indexOf(abs)), abs].map((f) => path.basename(f)).join(' -> ');
      errors.push({ file: abs, line: 1, message: `import cycle: ${cycle}` });
      return;
    }
    if (files.some((f) => f.path === abs)) return;

    stack.push(abs);
    const css = fs.readFileSync(abs, 'utf8');
    const { imports, rest, errors: splitErrors } = splitImports(css, abs);
    errors.push(...splitErrors);
    for (const imp of imports) {
      const target = path.resolve(path.dirname(abs), imp.href);
      if (!fs.existsSync(target)) {
        errors.push({ file: abs, line: imp.line, message: `imported file "${imp.href}" does not exist` });
        continue;
      }
      visit(target);
    }
    files.push({ path: abs, css: rest });
    stack.pop();
  };

  visit(path.resolve(entryPath));
  return { files, errors };
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test test/tools/imports.test.js`
Expected: all 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(tools): add @import resolution with cycle detection"
```

---

### Task 7: The validator

**Files:**
- Create: `bin/validate.js`
- Test: `test/tools/validate.test.js`

**Interfaces:**
- Consumes: `LAYER_STATEMENT` (Task 2), `loadSchema`, `loadAndMerge` (Task 4), `parseHtml`, `walkElements`, `classList`, `attributes`, `countMatches` (Task 5), `stripComments` (Task 6), helpers (Task 2).
- Produces: `validate({ root }) -> { errors: Array<{ file, line?, message }>, count: number }`, `formatError(root, error) -> string` in `<relative file>[:<line>]: <message>` form, and the individual checks `validateElementTree(root, merged, file, lineOffset = 0)`, `validateExamples(entries, merged)`, `extractHtmlBlocks(markdown) -> Array<{ html, line }>`, `validateGuides(docsDir, merged)`, `findBareMargin(css, className) -> number[]`, `validateSpacing(entries)`, `validateLayers(srcDir)`. CLI: `node bin/validate.js [--quiet]` from the repo root, exit 1 on any error.

- [ ] **Step 1: Write the failing tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {
  validate, formatError, validateElementTree, extractHtmlBlocks, findBareMargin, validateLayers,
} from '../../bin/validate.js';
import { parseHtml } from '../../bin/lib/html.js';
import { makeTree, validManifest, validTree, REPO_ROOT } from './helpers.js';

const run = (files) => {
  const root = makeTree(files);
  const r = validate({ root });
  return { root, ...r, lines: r.errors.map((e) => formatError(root, e)) };
};
const example = (html) => validTree({ 'src/layouts/rail/example.html': html });

test('a valid tree validates with no errors and counts components', () => {
  const r = run(validTree());
  assert.deepEqual(r.lines, []);
  assert.equal(r.count, 1);
});

test('formatError prints file, optional line, and message relative to root', () => {
  assert.equal(formatError('/r', { file: '/r/src/a.css', line: 3, message: 'bad' }), 'src/a.css:3: bad');
  assert.equal(formatError('/r', { file: '/r/src/a.css', message: 'bad' }), 'src/a.css: bad');
});

test('unknown data attributes on a framework class are reported with the line', () => {
  const r = run(example('<div class="rail"\n  data-nope="1"><p>x</p></div>'));
  assert.deepEqual(r.lines, ['src/layouts/rail/example.html:1: .rail <div>: unknown attribute data-nope']);
});

test('enum, boolean, and number attribute values are checked', () => {
  const r = run(example('<div class="rail" data-gap="xl" data-wrap="yes" data-count="many"><p>x</p></div>'));
  assert.deepEqual(r.errors.map((e) => e.message), [
    '.rail <div>: data-gap="xl" is not one of s, m, l',
    '.rail <div>: data-wrap is a boolean attribute and takes no value',
    '.rail <div>: data-count="many" is not a number',
  ]);
});

test('child minimums and maximums are enforced', () => {
  const tree = validTree({
    'src/layouts/rail/manifest.json': validManifest({ children: [{ selector: '> p', min: 1, max: 2 }] }),
  });
  const none = run({ ...tree, 'src/layouts/rail/example.html': '<div class="rail"><span>x</span></div>' });
  assert.deepEqual(none.errors.map((e) => e.message), ['.rail <div>: expected at least 1 of "> p", found 0']);
  const many = run({ ...tree, 'src/layouts/rail/example.html': '<div class="rail"><p>1</p><p>2</p><p>3</p></div>' });
  assert.deepEqual(many.errors.map((e) => e.message), ['.rail <div>: expected at most 2 of "> p", found 3']);
});

test('required accessibility attributes are enforced', () => {
  const r = run(validTree({
    'src/layouts/rail/manifest.json': validManifest({ a11y: { role: 'list', requiredAttributes: ['role'], keyboard: [] } }),
  }));
  assert.deepEqual(r.errors.map((e) => e.message), ['.rail <div>: missing required attribute role']);
});

test('user classes and non-data attributes are ignored', () => {
  const r = run(example('<div class="rail my-thing" id="x" aria-label="Rail" data-gap="s"><p>x</p></div>'));
  assert.deepEqual(r.lines, []);
});

test('an example that never uses its component is reported', () => {
  const r = run(example('<div class="other"><p>x</p></div>'));
  assert.deepEqual(r.errors.map((e) => e.message), ['example does not use .rail']);
});

test('elements without a framework class are never checked', () => {
  const errors = validateElementTree(parseHtml('<div data-anything="1"></div>'), { rail: validManifest() }, 'f.html');
  assert.deepEqual(errors, []);
});

test('extractHtmlBlocks returns each fenced html block with its starting line', () => {
  const md = '# Guide\n\n```html\n<div class="rail"><p>x</p></div>\n```\n\ntext\n\n```css\n.x{}\n```\n\n```html\n<b>y</b>\n```\n';
  assert.deepEqual(extractHtmlBlocks(md), [
    { html: '<div class="rail"><p>x</p></div>', line: 4 },
    { html: '<b>y</b>', line: 14 },
  ]);
});

test('fenced html blocks in docs/guides are validated with the right line', () => {
  const r = run(validTree({
    'docs/guides/layouts.md': '# Layouts\n\n```html\n<div class="rail" data-gap="huge"><p>x</p></div>\n```\n',
  }));
  assert.deepEqual(r.lines, ['docs/guides/layouts.md:4: .rail <div>: data-gap="huge" is not one of s, m, l']);
});

test('findBareMargin flags margin on the bare identity selector only', () => {
  assert.deepEqual(findBareMargin('.rail { margin: 0; }', 'rail'), [1]);
  assert.deepEqual(findBareMargin('@layer yeti.layouts {\n  .rail {\n    display: flex;\n    margin-block-end: 1rem;\n  }\n}', 'rail'), [2]);
  assert.deepEqual(findBareMargin('.rail > * + * { margin-inline-start: 1rem; }', 'rail'), []);
  assert.deepEqual(findBareMargin('.rail {\n  display: flex;\n  & > * + * { margin-block-start: 1rem; }\n}', 'rail'), []);
  assert.deepEqual(findBareMargin('.rail { /* margin: 0; */ padding: 0; }', 'rail'), []);
  assert.deepEqual(findBareMargin('.rail-item { margin: 0; }\n.rail { padding: 0; }', 'rail'), []);
});

test('a component setting its own margin fails the spacing rule', () => {
  const r = run(validTree({ 'src/layouts/rail/rail.css': '.rail {\n  margin-inline: auto;\n}\n' }));
  assert.deepEqual(r.lines, ['src/layouts/rail/rail.css:1: .rail sets its own margin; spacing belongs to the parent layout (architecture §6.6)']);
});

test('the layer statement must match exactly and yeti.css must import it first', () => {
  const wrongOrder = run(validTree({ 'src/layers.css': '@layer yeti.base, yeti.reset, yeti.layouts, yeti.components, yeti.utilities;\n' }));
  assert.equal(wrongOrder.lines.length, 1);
  assert.match(wrongOrder.lines[0], /^src\/layers\.css:1: must contain exactly: @layer yeti\.reset/);
  const noImport = run(validTree({ 'src/yeti.css': '.x {}\n' }));
  assert.deepEqual(noImport.lines, ['src/yeti.css:1: must begin with @import "layers.css";']);
  const commented = run(validTree({ 'src/layers.css': '/* order */\n@layer yeti.reset,\n  yeti.base, yeti.layouts, yeti.components, yeti.utilities;\n' }));
  assert.deepEqual(commented.lines, []);
});

test('the real src/ passes the layer check', () => {
  assert.deepEqual(validateLayers(path.join(REPO_ROOT, 'src')), []);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/tools/validate.test.js`
Expected: FAIL, `Cannot find module '.../bin/validate.js'`

- [ ] **Step 3: Write `bin/validate.js`**

```js
#!/usr/bin/env node
// The gate. Checks manifests against the schema and their folders, examples
// and guide snippets against the manifests, component CSS against the
// spacing-ownership rule, and the layer files against the layer contract.
// Reports every problem it finds, then exits non-zero if there were any.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAYER_STATEMENT } from './lib/layers.js';
import { loadSchema, loadAndMerge } from './lib/manifest.js';
import { parseHtml, walkElements, classList, attributes, countMatches } from './lib/html.js';
import { stripComments } from './lib/imports.js';

const MARGIN_RE = /(?:^|[;\s{])margin(?:-block|-inline)?(?:-start|-end)?\s*:/;

export function formatError(root, e) {
  return `${path.relative(root, e.file)}${e.line ? `:${e.line}` : ''}: ${e.message}`;
}

function walkFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out.sort();
}

/** Checks every element carrying a framework identity class against that component's contract. */
export function validateElementTree(root, merged, file, lineOffset = 0) {
  const errors = [];
  const byClass = new Map(Object.values(merged).map((m) => [m.class, m]));

  walkElements(root, (el) => {
    for (const cls of classList(el)) {
      const m = byClass.get(cls);
      if (!m) continue;
      const line = el.sourceCodeLocation ? el.sourceCodeLocation.startLine + lineOffset : undefined;
      const push = (message) => errors.push({ file, line, message: `.${cls} <${el.tagName}>: ${message}` });
      const attrs = attributes(el);
      const declared = new Map(m.attributes.map((a) => [a.name, a]));

      for (const [name, value] of attrs) {
        if (!name.startsWith('data-')) continue;
        const decl = declared.get(name);
        if (!decl) { push(`unknown attribute ${name}`); continue; }
        if (decl.type === 'enum' && !decl.values.includes(value)) push(`${name}="${value}" is not one of ${decl.values.join(', ')}`);
        if (decl.type === 'boolean' && value !== '') push(`${name} is a boolean attribute and takes no value`);
        if (decl.type === 'number' && (value.trim() === '' || !Number.isFinite(Number(value)))) push(`${name}="${value}" is not a number`);
      }
      for (const required of m.a11y.requiredAttributes) {
        if (!attrs.has(required)) push(`missing required attribute ${required}`);
      }
      for (const child of m.children) {
        const found = countMatches(el, child.selector);
        const min = child.min ?? 0;
        const max = child.max ?? null;
        if (found < min) push(`expected at least ${min} of "${child.selector}", found ${found}`);
        if (max !== null && found > max) push(`expected at most ${max} of "${child.selector}", found ${found}`);
      }
    }
  });
  return errors;
}

export function validateExamples(entries, merged) {
  const errors = [];
  for (const entry of entries) {
    const file = path.join(entry.dir, 'example.html');
    const tree = parseHtml(fs.readFileSync(file, 'utf8'));
    errors.push(...validateElementTree(tree, merged, file));
    let used = false;
    walkElements(tree, (el) => { if (classList(el).includes(entry.manifest.class)) used = true; });
    if (!used) errors.push({ file, message: `example does not use .${entry.manifest.class}` });
  }
  return errors;
}

export function extractHtmlBlocks(markdown) {
  const blocks = [];
  const re = /```html[^\n]*\n([\s\S]*?)\n```/g;
  let m;
  while ((m = re.exec(markdown)) !== null) {
    blocks.push({ html: m[1], line: markdown.slice(0, m.index).split('\n').length + 1 });
  }
  return blocks;
}

export function validateGuides(docsDir, merged) {
  const errors = [];
  if (!fs.existsSync(docsDir)) return errors;
  for (const file of walkFiles(docsDir).filter((f) => f.endsWith('.md'))) {
    const markdown = fs.readFileSync(file, 'utf8');
    for (const block of extractHtmlBlocks(markdown)) {
      errors.push(...validateElementTree(parseHtml(block.html), merged, file, block.line - 1));
    }
  }
  return errors;
}

/**
 * Returns the line of every block whose selector is exactly `.className` and whose own
 * declarations (not nested blocks) set a margin. Handles native nesting and @layer wrappers.
 */
export function findBareMargin(css, className) {
  const text = stripComments(css);
  const hits = [];
  const stack = [];
  let selector = '';
  let line = 1;

  for (const ch of text) {
    if (ch === '{') {
      stack.push({ selector: selector.trim(), decls: '', line });
      selector = '';
    } else if (ch === '}') {
      const block = stack.pop();
      if (block && block.selector === `.${className}` && MARGIN_RE.test(block.decls)) hits.push(block.line);
      selector = '';
    } else if (ch === ';') {
      if (stack.length) stack[stack.length - 1].decls += ch;
      selector = '';
    } else {
      if (stack.length) stack[stack.length - 1].decls += ch;
      selector += ch;
    }
    if (ch === '\n') line += 1;
  }
  return hits;
}

export function validateSpacing(entries) {
  const errors = [];
  for (const entry of entries) {
    const file = path.join(entry.dir, `${entry.name}.css`);
    for (const line of findBareMargin(fs.readFileSync(file, 'utf8'), entry.manifest.class)) {
      errors.push({ file, line, message: `.${entry.manifest.class} sets its own margin; spacing belongs to the parent layout (architecture §6.6)` });
    }
  }
  return errors;
}

export function validateLayers(srcDir) {
  const errors = [];
  const layersFile = path.join(srcDir, 'layers.css');
  const entryFile = path.join(srcDir, 'yeti.css');

  if (!fs.existsSync(layersFile)) {
    errors.push({ file: layersFile, message: 'missing' });
  } else {
    const text = stripComments(fs.readFileSync(layersFile, 'utf8')).replace(/\s+/g, ' ').trim();
    if (text !== LAYER_STATEMENT) errors.push({ file: layersFile, line: 1, message: `must contain exactly: ${LAYER_STATEMENT}` });
  }
  if (!fs.existsSync(entryFile)) {
    errors.push({ file: entryFile, message: 'missing' });
  } else {
    const text = stripComments(fs.readFileSync(entryFile, 'utf8')).trim();
    if (!/^@import\s+(?:url\(\s*)?["']layers\.css["']\s*\)?\s*;/.test(text)) {
      errors.push({ file: entryFile, line: 1, message: 'must begin with @import "layers.css";' });
    }
  }
  return errors;
}

export function validate({ root }) {
  const srcDir = path.join(root, 'src');
  const docsDir = path.join(root, 'docs', 'guides');
  const schema = loadSchema(path.join(root, 'schema', 'manifest.schema.json'));
  const { entries, merged, errors } = loadAndMerge(srcDir, schema);
  const all = [
    ...errors,
    ...validateExamples(entries, merged),
    ...validateGuides(docsDir, merged),
    ...validateSpacing(entries),
    ...validateLayers(srcDir),
  ];
  return { errors: all, count: Object.keys(merged).length };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = process.cwd();
  const { errors, count } = validate({ root });
  for (const e of errors) console.error(formatError(root, e));
  if (errors.length) {
    console.error(`validate: ${errors.length} problem${errors.length === 1 ? '' : 's'}`);
    process.exit(1);
  }
  if (!process.argv.includes('--quiet')) console.log(`validate: ok (${count} component${count === 1 ? '' : 's'})`);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test test/tools/validate.test.js`
Expected: all 15 tests pass.

- [ ] **Step 5: Run the CLI against the real, empty repo**

Run: `npm run validate`
Expected: `validate: ok (0 components)` and exit 0.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(tools): add the validator"
```

---

### Task 8: The build

**Files:**
- Create: `bin/build.js`
- Test: `test/tools/build.test.js`

**Interfaces:**
- Consumes: `resolveImports` (Task 6), `loadSchema`, `loadAndMerge` (Task 4), `validate`, `formatError` (Task 7).
- Produces: `readPackage(root) -> object`, `bundle({ root, pkg }) -> { css: string|null, errors }`, `build({ root, pkg? }) -> { errors, outputs: string[] }`. CLI: `node bin/build.js` from the repo root.

- [ ] **Step 1: Write the failing tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { bundle, build } from '../../bin/build.js';
import { makeTree, validManifest, validTree } from './helpers.js';

const pkg = { name: 'yeti-css', version: '7.0.0-alpha.0', license: 'MIT', homepage: 'https://foundationcss.com/yeti/' };
const treeWithPkg = (extra = {}) => validTree({ 'package.json': pkg, ...extra });

test('bundle writes a header and each file in cascade order with source comments', () => {
  const root = makeTree(treeWithPkg());
  const r = bundle({ root, pkg });
  assert.deepEqual(r.errors, []);
  assert.ok(r.css.startsWith('/*! yeti-css 7.0.0-alpha.0 | MIT | https://foundationcss.com/yeti/ */\n'));
  const layers = r.css.indexOf('/* src/layers.css */');
  const rail = r.css.indexOf('/* src/layouts/rail/rail.css */');
  const entry = r.css.indexOf('/* src/yeti.css */');
  assert.ok(layers > 0 && layers < rail && rail < entry);
  assert.ok(r.css.includes('@layer yeti.reset, yeti.base, yeti.layouts, yeti.components, yeti.utilities;'));
  assert.ok(!r.css.includes('@import'));
});

test('build writes dist/ with the bundle, a verbatim css tree, js modules, and the merged manifest', () => {
  const root = makeTree(treeWithPkg({
    'src/layouts/rail/manifest.json': validManifest({ js: { module: 'rail.js', optional: true } }),
    'src/layouts/rail/rail.js': 'export default 1;\n',
    'src/tokens/.gitkeep': '',
  }));
  const r = build({ root });
  assert.deepEqual(r.errors, []);
  const dist = (p) => path.join(root, 'dist', p);
  assert.ok(fs.existsSync(dist('yeti.css')));
  assert.equal(fs.readFileSync(dist('css/layouts/rail/rail.css'), 'utf8'), fs.readFileSync(path.join(root, 'src/layouts/rail/rail.css'), 'utf8'));
  assert.equal(fs.readFileSync(dist('css/yeti.css'), 'utf8'), fs.readFileSync(path.join(root, 'src/yeti.css'), 'utf8'));
  assert.ok(!fs.existsSync(dist('css/tokens/.gitkeep')));
  assert.equal(fs.readFileSync(dist('js/rail.js'), 'utf8'), 'export default 1;\n');
  const manifest = JSON.parse(fs.readFileSync(dist('yeti.manifest.json'), 'utf8'));
  assert.equal(manifest.framework, 'yeti');
  assert.equal(manifest.version, '7.0.0-alpha.0');
  assert.match(manifest.generated, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(manifest.components.rail.class, 'rail');
  assert.ok(r.outputs.includes('yeti.css') && r.outputs.includes('js/rail.js') && r.outputs.includes('yeti.manifest.json'));
});

test('build refuses to run on validation errors and writes nothing', () => {
  const root = makeTree(treeWithPkg({ 'src/layouts/rail/example.html': '<div class="rail" data-gap="huge"><p>x</p></div>' }));
  const r = build({ root });
  assert.equal(r.errors.length, 1);
  assert.ok(!fs.existsSync(path.join(root, 'dist')));
});

test('build reports import errors', () => {
  const root = makeTree(treeWithPkg({ 'src/yeti.css': '@import "layers.css";\n@import "missing.css";\n' }));
  const r = build({ root });
  assert.equal(r.errors[0].message, 'imported file "missing.css" does not exist');
  assert.ok(!fs.existsSync(path.join(root, 'dist')));
});

test('a rebuild replaces a stale dist', () => {
  const root = makeTree(treeWithPkg());
  fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
  fs.writeFileSync(path.join(root, 'dist', 'stale.txt'), 'old');
  build({ root });
  assert.ok(!fs.existsSync(path.join(root, 'dist', 'stale.txt')));
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test test/tools/build.test.js`
Expected: FAIL, `Cannot find module '.../bin/build.js'`

- [ ] **Step 3: Write `bin/build.js`**

```js
#!/usr/bin/env node
// Produces dist/: one readable bundle, the source tree verbatim, per-component
// JS modules, and the merged manifest. Concatenation only. No transforms.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveImports } from './lib/imports.js';
import { loadSchema, loadAndMerge } from './lib/manifest.js';
import { validate, formatError } from './validate.js';

export function readPackage(root) {
  return JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
}

function walkFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(full));
    else out.push(full);
  }
  return out.sort();
}

export function bundle({ root, pkg }) {
  const { files, errors } = resolveImports(path.join(root, 'src', 'yeti.css'));
  if (errors.length) return { css: null, errors };
  const header = `/*! ${pkg.name} ${pkg.version} | ${pkg.license} | ${pkg.homepage} */\n`;
  const body = files.map((f) => `\n/* ${path.relative(root, f.path)} */\n${f.css.trim()}\n`).join('');
  return { css: header + body, errors: [] };
}

export function build({ root, pkg = readPackage(root) }) {
  const checked = validate({ root });
  if (checked.errors.length) return { errors: checked.errors, outputs: [] };
  const bundled = bundle({ root, pkg });
  if (bundled.errors.length) return { errors: bundled.errors, outputs: [] };

  const srcDir = path.join(root, 'src');
  const distDir = path.join(root, 'dist');
  const outputs = [];
  const write = (rel, content) => {
    const file = path.join(distDir, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
    outputs.push(rel);
  };

  fs.rmSync(distDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });

  write('yeti.css', bundled.css);

  fs.cpSync(srcDir, path.join(distDir, 'css'), {
    recursive: true,
    filter: (src) => !path.basename(src).startsWith('.'),
  });
  outputs.push('css/');

  for (const file of walkFiles(srcDir).filter((f) => f.endsWith('.js'))) {
    const rel = `js/${path.basename(file)}`;
    fs.copyFileSync(file, path.join(distDir, rel));
    outputs.push(rel);
  }

  const schema = loadSchema(path.join(root, 'schema', 'manifest.schema.json'));
  const { merged } = loadAndMerge(srcDir, schema);
  write('yeti.manifest.json', `${JSON.stringify({
    framework: 'yeti',
    version: pkg.version,
    generated: new Date().toISOString().slice(0, 10),
    components: merged,
  }, null, 2)}\n`);

  return { errors: [], outputs };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = process.cwd();
  const { errors, outputs } = build({ root });
  for (const e of errors) console.error(formatError(root, e));
  if (errors.length) {
    console.error(`build: aborted, ${errors.length} problem${errors.length === 1 ? '' : 's'}`);
    process.exit(1);
  }
  console.log(`build: wrote dist/ (${outputs.length} entries)`);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test test/tools/build.test.js`
Expected: all 5 tests pass.

- [ ] **Step 5: Build the real, empty repo**

Run: `npm run build && cat dist/yeti.css`
Expected: `build: wrote dist/ (3 entries)`, and the bundle is the header line, a `/* src/layers.css */` comment, the layer statement with its comment, and a `/* src/yeti.css */` comment with nothing after it. The entry file's own comment sits before its `@import` and is dropped along with the import prelude; that is expected. `dist/` is gitignored, so `git status` shows nothing new.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(tools): add the build"
```

---

### Task 9: Front matter and docs generation

**Files:**
- Create: `bin/lib/front-matter.js`, `bin/gen-docs.js`
- Test: `test/tools/front-matter.test.js`, `test/tools/gen-docs.test.js`

**Interfaces:**
- Consumes: `loadSchema`, `loadAndMerge`, `KIND_TO_DIR` (Task 4), `formatError` (Task 7).
- Produces: `frontMatter(fields: Record<string, string|number|boolean>) -> string`, `GENERATED_MARK = '<!-- Generated by bin/gen-docs.js'`, `renderPage({ manifest, exampleHtml, navOrder }) -> string`, `generateDocs({ root }) -> { written: string[], deleted: string[], errors }`. CLI: `node bin/gen-docs.js`.

- [ ] **Step 1: Write the failing front-matter test**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frontMatter } from '../../bin/lib/front-matter.js';

test('frontMatter emits Proton-style YAML with quoted strings and bare booleans and numbers', () => {
  const out = frontMatter({ raw: true, title: 'A "quoted" title', description: 'One: two', nav_group: 'Layouts', nav_order: 2 });
  assert.equal(out, '---\nraw: true\ntitle: "A \\"quoted\\" title"\ndescription: "One: two"\nnav_group: "Layouts"\nnav_order: 2\n---\n');
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test test/tools/front-matter.test.js`
Expected: FAIL, `Cannot find module '.../bin/lib/front-matter.js'`

- [ ] **Step 3: Write `bin/lib/front-matter.js`**

```js
// Front matter in the shape foundationcss.com already consumes for Proton and
// Inky: strings double-quoted (JSON quoting is valid YAML), booleans and
// numbers bare, keys in insertion order.
export function frontMatter(fields) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(fields)) lines.push(`${key}: ${formatValue(value)}`);
  lines.push('---');
  return `${lines.join('\n')}\n`;
}

function formatValue(value) {
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  return JSON.stringify(String(value));
}
```

- [ ] **Step 4: Run it to verify it passes**

Run: `node --test test/tools/front-matter.test.js`
Expected: 1 test passes.

- [ ] **Step 5: Write the failing gen-docs tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { renderPage, generateDocs, GENERATED_MARK } from '../../bin/gen-docs.js';
import { makeTree, validManifest, validTree } from './helpers.js';

const exampleHtml = '<div class="rail" data-gap="l"><p>One</p><p>Two</p></div>\n';

test('renderPage starts with front matter and the generated mark', () => {
  const page = renderPage({ manifest: validManifest(), exampleHtml, navOrder: 3 });
  assert.ok(page.startsWith(
    '---\nraw: true\ntitle: "Rail"\ndescription: "A horizontal rail of items with a shared gap."\nnav_group: "Layouts"\nnav_order: 3\n---\n'
    + `${GENERATED_MARK} from src/layouts/rail/manifest.json. Do not edit. -->\n`,
  ));
});

test('renderPage includes every section with the manifest content', () => {
  const page = renderPage({ manifest: validManifest(), exampleHtml, navOrder: 1 });
  for (const heading of ['# Rail', '## Example', '## Attributes', '## Children', '## Tokens', '## Accessibility', '## Browser support', '## JavaScript']) {
    assert.ok(page.includes(`\n${heading}\n`), `missing ${heading}`);
  }
  assert.ok(page.includes('```html\n<div class="rail" data-gap="l"><p>One</p><p>Two</p></div>\n```'));
  assert.ok(page.includes('| `data-gap` | enum | `s`, `m`, `l` | `m` | Gap between items. |'));
  assert.ok(page.includes('| `data-wrap` | boolean |  |  | Allow items to wrap. |'));
  assert.ok(page.includes('- `> *`: at least 1. The items.'));
  assert.ok(page.includes('| `--rail-gap` | The gap between items. |'));
  assert.ok(page.includes('<details><summary>Internal tokens'));
  assert.ok(page.includes('- `--rail-internal`'));
  assert.ok(page.includes('- Used without guards: flexbox'));
  assert.ok(page.includes('None. This component is CSS only.'));
  assert.ok(page.includes('Available since 7.0.0.'));
});

test('renderPage handles roles, keyboard, js, and multi-word names', () => {
  const manifest = validManifest({
    name: 'tab-strip', class: 'tab-strip', kind: 'component',
    a11y: { role: 'tablist', requiredAttributes: ['aria-label'], keyboard: [{ key: 'ArrowRight', action: 'Next tab' }], notes: 'Labels are required.' },
    js: { module: 'tab-strip.js', optional: true },
    support: { unguarded: [], guarded: ['anchor positioning'] },
  });
  const page = renderPage({ manifest, exampleHtml, navOrder: 1 });
  assert.ok(page.includes('title: "Tab Strip"'));
  assert.ok(page.includes('nav_group: "Components"'));
  assert.ok(page.includes('- Role: `tablist`'));
  assert.ok(page.includes('- Required attributes: `aria-label`'));
  assert.ok(page.includes('| `ArrowRight` | Next tab |'));
  assert.ok(page.includes('Optional enhancement: `components/tab-strip/tab-strip.js`. The component works without it.'));
  assert.ok(page.includes('- Behind `@supports`: anchor positioning'));
});

test('generateDocs writes a page per component, removes orphans, and leaves hand-written files alone', () => {
  const root = makeTree(validTree({
    'docs/guides/.gitkeep': '',
    'docs/hand-written.md': '# Mine\n',
    'docs/stale.md': `---\ntitle: "Old"\n---\n${GENERATED_MARK} from src/layouts/old/manifest.json. Do not edit. -->\n`,
  }));
  const r = generateDocs({ root });
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.written.map((f) => path.relative(root, f)), ['docs/rail.md']);
  assert.deepEqual(r.deleted.map((f) => path.relative(root, f)), ['docs/stale.md']);
  assert.ok(fs.existsSync(path.join(root, 'docs/hand-written.md')));
  assert.ok(fs.readFileSync(path.join(root, 'docs/rail.md'), 'utf8').includes('nav_order: 1'));
  const again = generateDocs({ root });
  assert.deepEqual(again.deleted, []);
});

test('generateDocs refuses to run on manifest errors', () => {
  const root = makeTree(validTree({ 'src/layouts/rail/manifest.json': validManifest({ since: 'x' }) }));
  const r = generateDocs({ root });
  assert.equal(r.errors.length, 1);
  assert.deepEqual(r.written, []);
});
```

- [ ] **Step 6: Run them to verify they fail**

Run: `node --test test/tools/gen-docs.test.js`
Expected: FAIL, `Cannot find module '.../bin/gen-docs.js'`

- [ ] **Step 7: Write `bin/gen-docs.js`**

```js
#!/usr/bin/env node
// Renders one Markdown page per layout or component into docs/, in the front
// matter shape foundationcss.com consumes. Only files carrying GENERATED_MARK
// are ever deleted; hand-written guides are never touched.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { frontMatter } from './lib/front-matter.js';
import { loadSchema, loadAndMerge, KIND_TO_DIR } from './lib/manifest.js';
import { formatError } from './validate.js';

export const GENERATED_MARK = '<!-- Generated by bin/gen-docs.js';
const GROUPS = { layout: 'Layouts', component: 'Components', utility: 'Utilities' };

const titleCase = (name) => name.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
const cell = (v) => String(v ?? '').replace(/\|/g, '\\|');
const code = (v) => `\`${v}\``;
const table = (headers, rows) => [
  `| ${headers.join(' | ')} |`,
  `| ${headers.map(() => '---').join(' | ')} |`,
  ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`),
].join('\n');

function range(child) {
  const min = child.min ?? 0;
  const max = child.max ?? null;
  if (max === null) return min === 0 ? 'any number' : `at least ${min}`;
  if (min === max) return `exactly ${min}`;
  return `${min} to ${max}`;
}

export function renderPage({ manifest: m, exampleHtml, navOrder }) {
  const title = titleCase(m.name);
  const dir = KIND_TO_DIR[m.kind];
  const out = [];

  // trimEnd so the join below adds exactly one newline before the generated mark
  out.push(frontMatter({ raw: true, title, description: m.description, nav_group: GROUPS[m.kind], nav_order: navOrder }).trimEnd());
  out.push(`${GENERATED_MARK} from src/${dir}/${m.name}/manifest.json. Do not edit. -->`, '', `# ${title}`, '', m.description, '');

  out.push('## Example', '', '```html', exampleHtml.trim(), '```', '');

  out.push('## Attributes', '');
  out.push(m.attributes.length
    ? table(['Attribute', 'Type', 'Values', 'Default', 'Description'], m.attributes.map((a) => [
      code(a.name), a.type, (a.values ?? []).map(code).join(', '), a.default === undefined ? '' : code(a.default), a.description,
    ]))
    : 'None. This is configured through its children and tokens only.');
  out.push('');

  if (m.classes.length) {
    out.push('## Modifier classes', '', table(['Class', 'Description'], m.classes.map((c) => [code(`.${c.name}`), c.description])), '');
  }

  out.push('## Children', '');
  out.push(m.children.length
    ? m.children.map((c) => `- ${code(c.selector)}: ${range(c)}${c.description ? `. ${c.description}` : ''}`).join('\n')
    : 'No structural requirements.');
  out.push('');

  const publicTokens = m.tokens.filter((t) => t.public);
  const internalTokens = m.tokens.filter((t) => !t.public);
  out.push('## Tokens', '');
  out.push(publicTokens.length ? table(['Token', 'Description'], publicTokens.map((t) => [code(t.name), t.description ?? ''])) : 'No public tokens.');
  if (internalTokens.length) {
    out.push('', '<details><summary>Internal tokens (may change between minor versions)</summary>', '', internalTokens.map((t) => `- ${code(t.name)}`).join('\n'), '', '</details>');
  }
  out.push('');

  out.push('## Accessibility', '');
  const a11y = [];
  if (m.a11y.role) a11y.push(`- Role: ${code(m.a11y.role)}`);
  if (m.a11y.requiredAttributes.length) a11y.push(`- Required attributes: ${m.a11y.requiredAttributes.map(code).join(', ')}`);
  if (m.a11y.notes) a11y.push(`- ${m.a11y.notes}`);
  out.push(a11y.length ? a11y.join('\n') : 'No special requirements beyond semantic HTML.');
  if (m.a11y.keyboard.length) out.push('', table(['Key', 'Action'], m.a11y.keyboard.map((k) => [code(k.key), k.action])));
  out.push('');

  out.push('## Browser support', '');
  out.push(`- Used without guards: ${m.support.unguarded.length ? m.support.unguarded.join(', ') : 'nothing beyond the Baseline 2025 floor'}`);
  out.push(`- Behind ${code('@supports')}: ${m.support.guarded.length ? m.support.guarded.join(', ') : 'nothing'}`);
  out.push('');

  out.push('## JavaScript', '');
  out.push(m.js
    ? `Optional enhancement: ${code(`${dir}/${m.name}/${m.js.module}`)}. The component works without it.`
    : 'None. This component is CSS only.');
  out.push('', `Available since ${m.since}.`, '');

  return out.join('\n');
}

export function generateDocs({ root }) {
  const srcDir = path.join(root, 'src');
  const docsDir = path.join(root, 'docs');
  const schema = loadSchema(path.join(root, 'schema', 'manifest.schema.json'));
  const { entries, merged, errors } = loadAndMerge(srcDir, schema);
  if (errors.length) return { written: [], deleted: [], errors };

  fs.mkdirSync(docsDir, { recursive: true });
  const written = [];
  const byKind = {};
  for (const entry of entries) (byKind[entry.kind] ??= []).push(entry);
  for (const group of Object.values(byKind)) {
    group.sort((a, b) => a.name.localeCompare(b.name));
    group.forEach((entry, i) => {
      const exampleHtml = fs.readFileSync(path.join(entry.dir, 'example.html'), 'utf8');
      const file = path.join(docsDir, `${entry.name}.md`);
      fs.writeFileSync(file, renderPage({ manifest: entry.manifest, exampleHtml, navOrder: i + 1 }));
      written.push(file);
    });
  }

  const deleted = [];
  for (const name of fs.readdirSync(docsDir)) {
    if (!name.endsWith('.md')) continue;
    const file = path.join(docsDir, name);
    if (!fs.statSync(file).isFile()) continue;
    const head = fs.readFileSync(file, 'utf8').slice(0, 600);
    if (head.includes(GENERATED_MARK) && !(name.slice(0, -3) in merged)) {
      fs.unlinkSync(file);
      deleted.push(file);
    }
  }
  return { written, deleted, errors: [] };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = process.cwd();
  const { written, deleted, errors } = generateDocs({ root });
  for (const e of errors) console.error(formatError(root, e));
  if (errors.length) {
    console.error('docs: aborted');
    process.exit(1);
  }
  console.log(`docs: wrote ${written.length}, removed ${deleted.length}`);
}
```

- [ ] **Step 8: Run them to verify they pass**

Run: `node --test test/tools/gen-docs.test.js`
Expected: all 5 tests pass.

- [ ] **Step 9: Run the CLI on the real, empty repo**

Run: `npm run docs && git status --short docs/`
Expected: `docs: wrote 0, removed 0` and no changes under `docs/`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(tools): add docs generation from the manifest"
```

---

### Task 10: Release script skeleton

**Files:**
- Create: `bin/release.js`
- Test: `test/tools/release.test.js`

**Interfaces:**
- Consumes: `build` (Task 8), `generateDocs` (Task 9), `formatError` (Task 7).
- Produces: `VERSION_RE`, `stampVersion(packageJsonText, version) -> string`, `checkGitState(root) -> string[]` (problems, empty when clean and on a `release/*` branch). CLI: `node bin/release.js <version>`.

- [ ] **Step 1: Write the failing tests**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { stampVersion, checkGitState } from '../../bin/release.js';
import { makeTree } from './helpers.js';

test('stampVersion replaces only the version and keeps two-space formatting', () => {
  const input = '{\n  "name": "yeti-css",\n  "version": "7.0.0-alpha.0",\n  "license": "MIT"\n}\n';
  assert.equal(stampVersion(input, '7.0.0-beta.1'), '{\n  "name": "yeti-css",\n  "version": "7.0.0-beta.1",\n  "license": "MIT"\n}\n');
});

test('stampVersion rejects malformed versions', () => {
  assert.throws(() => stampVersion('{"version":"1.0.0"}', 'v7'), /invalid version "v7"/);
  assert.throws(() => stampVersion('{"version":"1.0.0"}', '7.0'), /invalid version "7.0"/);
});

test('checkGitState requires a clean tree on a release/* branch', () => {
  const root = makeTree({ 'a.txt': 'a\n' });
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
  git('init', '-q', '-b', 'develop');
  git('-c', 'user.email=t@example.com', '-c', 'user.name=t', 'add', '.');
  git('-c', 'user.email=t@example.com', '-c', 'user.name=t', 'commit', '-q', '-m', 'init');
  assert.deepEqual(checkGitState(root), ['must run on a release/* branch (on develop)']);
  git('checkout', '-q', '-b', 'release/7.0.0');
  assert.deepEqual(checkGitState(root), []);
  fs.writeFileSync(path.join(root, 'a.txt'), 'changed\n');
  assert.deepEqual(checkGitState(root), ['working tree is not clean']);
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test test/tools/release.test.js`
Expected: FAIL, `Cannot find module '.../bin/release.js'`

- [ ] **Step 3: Write `bin/release.js`**

```js
#!/usr/bin/env node
// Release preparation. Stamps the version, builds dist/, regenerates docs/,
// and zips dist/. It never commits, tags, or publishes; those stay manual
// git-flow steps so a human reviews the diff first. Completed in phase 5.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';
import { generateDocs } from './gen-docs.js';
import { formatError } from './validate.js';

export const VERSION_RE = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

export function stampVersion(packageJsonText, version) {
  if (!VERSION_RE.test(version)) throw new Error(`invalid version "${version}"`);
  const pkg = JSON.parse(packageJsonText);
  pkg.version = version;
  return `${JSON.stringify(pkg, null, 2)}\n`;
}

export function checkGitState(root) {
  const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  const problems = [];
  if (git('status', '--porcelain')) problems.push('working tree is not clean');
  const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
  if (!branch.startsWith('release/')) problems.push(`must run on a release/* branch (on ${branch})`);
  return problems;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = process.cwd();
  const version = process.argv[2];
  if (!version) {
    console.error('usage: node bin/release.js <version>');
    process.exit(2);
  }
  const problems = checkGitState(root);
  for (const p of problems) console.error(`release: ${p}`);
  if (problems.length) process.exit(1);

  const pkgPath = path.join(root, 'package.json');
  fs.writeFileSync(pkgPath, stampVersion(fs.readFileSync(pkgPath, 'utf8'), version));

  const built = build({ root });
  for (const e of built.errors) console.error(formatError(root, e));
  if (built.errors.length) process.exit(1);

  const docs = generateDocs({ root });
  for (const e of docs.errors) console.error(formatError(root, e));
  if (docs.errors.length) process.exit(1);

  const zip = `yeti-${version}.zip`;
  fs.rmSync(path.join(root, zip), { force: true });
  execFileSync('zip', ['-qr', zip, 'dist'], { cwd: root });

  console.log(`release: ${version} stamped, dist/ built, ${docs.written.length} docs written, ${zip} created`);
  console.log('release: nothing committed. Review the diff, commit, then finish the git-flow release.');
}
```

- [ ] **Step 4: Run them to verify they pass**

Run: `node --test test/tools/release.test.js`
Expected: all 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(tools): add release script skeleton"
```

---

### Task 11: Browser smoke test

**Files:**
- Create: `test/browser/serve.js`, `test/browser/smoke.html`, `test/browser/smoke.spec.js`, `playwright.config.js`

**Interfaces:**
- Consumes: `LAYER_NAMES` (Task 2), `src/yeti.css` and `src/layers.css` (Task 2).
- Produces: `npm run test:browser` passing in Chromium, Firefox, and WebKit.

- [ ] **Step 1: Write `test/browser/serve.js`**

```js
// A static file server for the browser tests, so stylesheets load over http
// and CSSOM is readable (file:// sheets are opaque to scripts in Chromium).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT ?? 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = path.join(root, path.normalize(pathname));
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => console.log(`serving ${root} on http://localhost:${port}`));
```

- [ ] **Step 2: Write `test/browser/smoke.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Yeti smoke test</title>
  <link rel="stylesheet" href="../../src/yeti.css">
</head>
<body>
  <main>
    <h1>Yeti smoke test</h1>
    <p>This page links the unbuilt source tree directly. The test reads the cascade layer order from CSSOM and runs an accessibility audit.</p>
  </main>
</body>
</html>
```

- [ ] **Step 3: Write `test/browser/smoke.spec.js`**

```js
import { test, expect } from 'playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LAYER_NAMES } from '../../bin/lib/layers.js';

test.describe('unbuilt source tree', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test/browser/smoke.html');
  });

  test('loads and declares the cascade layers in order', async ({ page }) => {
    const names = await page.evaluate(() => {
      let rule = document.styleSheets[0].cssRules[0];
      while (rule instanceof CSSImportRule) rule = rule.styleSheet.cssRules[0];
      return rule instanceof CSSLayerStatementRule ? Array.from(rule.nameList) : null;
    });
    expect(names).toEqual(LAYER_NAMES);
  });

  test('has no accessibility violations', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});
```

- [ ] **Step 4: Write `playwright.config.js`**

```js
import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  testDir: 'test/browser',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  reporter: process.env.CI ? 'github' : 'list',
  webServer: {
    command: 'node test/browser/serve.js',
    url: 'http://localhost:4173/test/browser/smoke.html',
    reuseExistingServer: !process.env.CI,
  },
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

- [ ] **Step 5: Run the browser tests**

Run: `npm run test:browser`
Expected: 6 passed (2 tests in each of 3 projects). If `playwright/test` cannot be resolved, the `playwright` package is older than expected; check `npm ls playwright` shows 1.x and that `node_modules/playwright/test.js` exists before doing anything else.

- [ ] **Step 6: Prove the layer assertion is real**

Temporarily edit `src/layers.css` to swap `yeti.reset` and `yeti.base`, run `npm run test:browser`, and confirm 3 failures with the received array showing the swapped order. Restore the file and confirm `git diff src/` is empty.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "test: add browser smoke test for the layer contract"
```

---

### Task 12: CI

**Files:**
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: the npm scripts from Task 2.
- Produces: green `tools` and `browser` checks on push and pull request.

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
  pull_request:

jobs:
  tools:
    name: Validate, test, build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run validate
      - run: npm run test:tools
      - run: npm run build

  browser:
    name: Browser smoke
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:browser
```

- [ ] **Step 2: Dry-run the same commands locally in order**

Run: `npm ci && npm run validate && npm run test:tools && npm run build && npm run test:browser`
Expected: every command exits 0. `npm ci` must succeed from `package-lock.json` alone; if it complains the lockfile is out of sync, run `npm install` and check the lockfile diff is only the three dependencies and their transitive tree.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "ci: replace the Foundation 6 workflow with tools and browser jobs"
```

Note for Joe: the workflow only runs once the branch is pushed; the PR for this branch is the first real CI run.

---

### Task 13: Written artifacts

**Files:**
- Create: `README.md` (replace), `CONTRIBUTING.md` (replace), `.github/ISSUE_TEMPLATE/1-bug-report.md`, `2-feature-request.md`, `3-documentation.md`, `4-maintenance.md` (replace all four; delete the misspelled `4-maintainance.md`), `docs/superpowers/drafts/2026-09-12-announcement-issue.md`, `docs/superpowers/drafts/2026-09-12-v6.9.0-release-note.md`

**Interfaces:**
- Produces: text for Joe to edit and publish. Nothing else depends on these files.

- [ ] **Step 1: Write `README.md`**

````markdown
# Yeti

**A CSS-first, native, zero-build layout and styling framework for web designers. By [Foundation](https://foundationcss.com).**

> **Foundation for Sites 6 users:** this repository is now Yeti, the successor to Foundation for Sites. Version 6 continues on the [`v6` branch](https://github.com/foundation/yeti/tree/v6) with bug fixes, and `foundation-sites` on npm keeps publishing 6.x from it. Read the [announcement](https://github.com/foundation/yeti/issues) for the full story.

## Status

Yeti is in development at `7.0.0-alpha`. Nothing here is stable yet: class names, attributes, and tokens can change between commits until the beta. Follow the announcement issue for milestones.

## What Yeti is

Yeti gives a designer the structure and the visual system to build a coherent site fast, with markup a human can read and an agent can write. It is one stylesheet:

```html
<link rel="stylesheet" href="/css/yeti.css">
```

- **CSS-first and native.** Container queries, cascade layers, native nesting, `light-dark()`, `dialog`, `popover`, and scroll-snap do the work that used to need JavaScript or a preprocessor.
- **Zero build, ever.** No Sass, no Node, no bundler required to use it. It composes into your build if you have one, but never demands it.
- **Named layouts, not utility soup.** Intent-based layout primitives and composed recipes, configured with a few data attributes.
- **One token scale.** Type and space derive from one base and one ratio at runtime. Change the ratio and the whole system recomputes.
- **Accessible by default.** Correct focus handling and ARIA on every component, checked in CI.
- **Legible to agents.** A machine-readable manifest describes every component, and the docs, type hints, and an MCP server are generated from it.

## What Yeti is not

Not a web component library. Not a utility framework. Not a build-time system. No polyfills. No full-featured slider in core. Nothing that exists only to work around CSS that no longer needs working around.

## Browser support

Yeti targets **Baseline 2025**. Anything that reached Baseline by the end of 2025 is used without guards; newer features sit behind `@supports` with a working fallback. If you need to support browsers older than that, Yeti is probably not your tool.

## Try it today

There is no CSS to try yet beyond the cascade layer declaration. To run the tooling:

```bash
git clone https://github.com/foundation/yeti
cd yeti
npm ci
npx playwright install
npm test
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Questions go to [Discussions](https://github.com/foundation/yeti/discussions); bugs and proposals go to Issues using the templates.

## License

MIT. See [LICENSE](LICENSE).
````

- [ ] **Step 2: Write `CONTRIBUTING.md`**

````markdown
# Contributing to Yeti

Thanks for helping. Yeti is small on purpose, so most of this document is about what we do not add.

## Running things

```bash
npm ci                   # install the three dev dependencies
npx playwright install   # once, for the browser tests
npm run validate         # manifests, examples, spacing rule, layer contract
npm run test:tools       # node:test suite for the tooling
npm run test:browser     # Playwright smoke and accessibility checks
npm run build            # writes dist/ (gitignored)
npm run docs             # regenerates docs/*.md from the manifests
npm test                 # validate, tools, browser
```

Node 22 or later. There is nothing to compile.

## The rules that shape every change

**No build step, ever.** Nothing a user needs can depend on Node, Sass, or a bundler. The source tree under `src/` must load in a browser as-is; the build only concatenates.

**No new dependencies.** The dev dependencies are Playwright, axe, and parse5. A pull request that adds one needs an issue first explaining why the job cannot be done without it.

**Manifest first.** Every layout or component lands in one pull request with its `manifest.json`, its CSS, its `example.html`, a browser fixture, and the generated docs page. `npm run validate` must pass. If the manifest and the CSS disagree, the manifest is right and the CSS is wrong.

**Spacing belongs to layouts.** A component never sets its own outer margin. Layouts own the gaps between their children. The validator enforces this on the identity selector.

**Naming.** Identity is a plain class (`.card`). Configuration is a `data-` attribute with a short shared vocabulary (`data-variant`, `data-size`, `data-gap`). State is native or ARIA (`[open]`, `[aria-current]`), never invented. Boolean attributes are bare. Anything not in the manifest is the user's and is ignored.

**Progressive enhancement, no polyfills.** Baseline 2025 is the floor. Newer features go behind `@supports` with a fallback that works.

**Accessibility is part of the contract.** Every component's manifest states its role, required attributes, and keyboard behaviour, and the fixture tests them.

## Branches

We use git-flow. Work happens on `feature/*` branches cut from `develop` and merged back by pull request. Releases go through `release/*` to `master` and are tagged `v7.x.y`. Foundation for Sites 6 maintenance happens on `v6`.

## Commit messages

Conventional commits, short and specific: `feat(tools): add the validator`, `fix(reset): keep dialog centering`, `docs: explain the token scale`.

## Code of conduct

See [code-of-conduct.md](code-of-conduct.md).
````

- [ ] **Step 3: Write the four issue templates**

`.github/ISSUE_TEMPLATE/1-bug-report.md`:

```markdown
---
name: "Bug report"
about: Something in Yeti is broken or behaves unexpectedly
labels: bug
---

<!-- Questions and help requests go to Discussions: https://github.com/foundation/yeti/discussions -->

**Yeti version**
<!-- e.g. 7.0.0-alpha.3, or the commit hash -->

**Browser and version**
<!-- e.g. Safari 26.1 on iOS 26, Chrome 142 on macOS -->

**Reduced case**
<!-- A CodePen link, or a fenced html block. Only the markup and CSS needed to show the problem. -->

**Expected**

**Actual**
```

`.github/ISSUE_TEMPLATE/2-feature-request.md`:

```markdown
---
name: "Feature request"
about: Propose a layout, component, attribute, or token
labels: enhancement
---

<!-- Questions and help requests go to Discussions: https://github.com/foundation/yeti/discussions -->

**The problem**
<!-- What can you not do today, or what is harder than it should be? -->

**Proposed markup**
<!-- Show the HTML you would like to write. Class, data attributes, children. -->

**Why it belongs in core**
<!-- Yeti is deliberately small. Say why this is the 80% case and not an add-on. See the non-goals in the README. -->
```

`.github/ISSUE_TEMPLATE/3-documentation.md`:

```markdown
---
name: "Documentation"
about: A mistake, gap, or confusing passage in the docs or README
labels: documentation
---

**Page**
<!-- URL or file path. Note that docs/*.md pages are generated from manifests; the fix may belong in the manifest. -->

**What is wrong or missing**

**Suggested wording** (optional)
```

`.github/ISSUE_TEMPLATE/4-maintenance.md`:

```markdown
---
name: "Maintenance"
about: Tooling, tests, CI, dependencies, repository housekeeping
labels: maintenance
---

**Area**
<!-- validate, build, gen-docs, tests, CI, packaging, repo -->

**What should change and why**
```

Then: `git rm -q .github/ISSUE_TEMPLATE/4-maintainance.md`

- [ ] **Step 4: Write `docs/superpowers/drafts/2026-09-12-announcement-issue.md`**

````markdown
# Draft: pinned announcement issue

Title: **Foundation for Sites is becoming Yeti**

---

Foundation for Sites 6 has had a long run. It was built for a web where CSS could not do layout on its own, and it papered over those gaps well. That web is gone. Container queries, cascade layers, native nesting, `dialog`, `popover`, `light-dark()`, and scroll-snap now cover most of what Foundation's Sass and JavaScript used to do.

So the next major version is not a port. It is a reimagining on the modern substrate, and it gets a new name to go with it: **Yeti**. The Yeti has been Foundation's mascot for years. Now it is the framework, and Foundation is the home for Yeti, [Inky](https://github.com/foundation/inky), and [Proton](https://github.com/foundation/proton).

## What Yeti is

A CSS-first, native, zero-build layout and styling framework. One `<link>` tag and you're done. Named layouts instead of a column grid or utility classes. One token scale for type and space that recomputes at runtime. Dark mode and theming designed in from the first commit. Accessibility checked in CI. A machine-readable manifest that generates the docs, editor hints, and an MCP server so agents write correct markup.

No Sass. No required build step. No polyfills. Baseline 2025 browsers.

## What this means for you

- **If you use Foundation for Sites 6:** nothing breaks. Version 6 lives on the [`v6`](https://github.com/foundation/yeti/tree/v6) branch and keeps getting bug fixes. The `foundation-sites` npm package continues to publish 6.x from that branch. v6.9.0 is the final planned feature release.
- **The `develop` branch is now Yeti 7** and is unstable until the beta. Do not build on it yet.
- **This repository will be renamed** from `foundation-sites` to `yeti`. GitHub redirects the old URL and git remotes, so existing clones and links keep working. Stars, forks, issues, and history all stay.
- **Yeti ships as `yeti-css` on npm** when it reaches beta, versioned 7.0.0 to continue the sequence.
- **Open issues and pull requests against 6.x** are still welcome; retarget them at `v6`.

## Following along

The architecture and every phase spec live in this repository under `docs/superpowers/`. Progress is tracked in milestones. Questions go in Discussions; this issue stays pinned for announcements only.

Thank you to everyone who has built with Foundation over the years. Yeti is what Foundation would have been if CSS had been ready sooner.
````

- [ ] **Step 5: Write `docs/superpowers/drafts/2026-09-12-v6.9.0-release-note.md`**

```markdown
# Draft: text to prepend to the v6.9.0 GitHub release

> **This is the final planned feature release of Foundation for Sites 6.** Bug fixes continue on the `v6` branch. The successor is Yeti; see the announcement: https://github.com/foundation/yeti/issues/<number>
```

- [ ] **Step 6: Check the Markdown renders and links resolve**

Run: `node -e "for (const f of ['README.md','CONTRIBUTING.md']) { const t = require('fs').readFileSync(f,'utf8'); for (const m of t.matchAll(/\]\(([^)]+)\)/g)) { const l = m[1]; if (!/^https?:/.test(l) && !require('fs').existsSync(l.split('#')[0])) console.log(f, 'broken local link:', l); } }"`
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "docs: rewrite README, contributing guide, and issue templates for Yeti"
```

Remind Joe that the two drafts under `docs/superpowers/drafts/` are for him to edit and publish at spec steps 3 and 6.

---

### Task 14: Final verification

**Files:** none created.

- [ ] **Step 1: Run the whole suite from a clean install**

Run: `rm -rf node_modules && npm ci && npm test`
Expected: `validate: ok (0 components)`, all tooling tests pass (65 tests across nine files: schema-check 12, manifest 12, html 6, imports 6, validate 15, build 5, front-matter 1, gen-docs 5, release 3), and 6 browser tests pass.

- [ ] **Step 2: Build and inspect the bundle**

Run: `npm run build && cat dist/yeti.css && cat dist/yeti.manifest.json`
Expected: the bundle is the header, the layers file, and the entry file's comment; the manifest has `"components": {}` and the alpha version.

- [ ] **Step 3: Confirm the tree matches the spec**

Run: `git status --short && git ls-files --others --exclude-standard`
Expected: staged deletions from Task 1, and new files exactly matching the file map at the top of this plan plus `docs/superpowers/`. No `dist/`, no `node_modules/`, no zip.

- [ ] **Step 4: Confirm nothing licensed leaked in**

Run: `grep -ril "every-layout\|piccalil" --exclude-dir=node_modules --exclude-dir=docs . ; grep -ril "every-layout\|piccalil" docs --exclude-dir=superpowers`
Expected: no output from either command. (Mentions inside `docs/superpowers/` are the research notes and are expected.)

- [ ] **Step 5: Stop and report**

Report: test totals, the bundle contents, and `git log --oneline v6..HEAD`. Do not push. Then hand back to spec §3 step 5: Joe reviews and merges `feature/yeti-phase-0` into `develop`, publishes the announcement, and renames the repository.
