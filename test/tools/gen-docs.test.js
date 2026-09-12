import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { renderPage, generateDocs, isGenerated, GENERATED_MARK } from '../../bin/gen-docs.js';
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

test('isGenerated requires the mark right after the front matter, not anywhere in the file', () => {
  assert.equal(isGenerated(`---\ntitle: "X"\n---\n${GENERATED_MARK} from src/layouts/x/manifest.json. Do not edit. -->\n`), true);
  assert.equal(isGenerated(`---\ntitle: "Guide"\n---\n\n# About the generator\n\n\`\`\`html\n${GENERATED_MARK} from src/layouts/x/manifest.json. Do not edit. -->\n\`\`\`\n`), false);
  assert.equal(isGenerated(`# No front matter\n${GENERATED_MARK}`), false);
});

test('generateDocs keeps a hand-written page that quotes the generated mark', () => {
  const root = makeTree(validTree({
    'docs/about-docs.md': `---\ntitle: "About"\n---\n\nGenerated pages begin with:\n\n\`\`\`html\n${GENERATED_MARK} from src/layouts/x/manifest.json. Do not edit. -->\n\`\`\`\n`,
  }));
  const r = generateDocs({ root });
  assert.deepEqual(r.deleted, []);
  assert.ok(fs.existsSync(path.join(root, 'docs/about-docs.md')));
});

test('generateDocs refuses to overwrite a hand-written page with a component name', () => {
  const root = makeTree(validTree({ 'docs/rail.md': '# My own rail page\n' }));
  const r = generateDocs({ root });
  assert.equal(r.errors.length, 1);
  assert.match(r.errors[0].message, /refusing to overwrite/);
  assert.equal(fs.readFileSync(path.join(root, 'docs/rail.md'), 'utf8'), '# My own rail page\n');
});

test('generateDocs refuses to run on manifest errors', () => {
  const root = makeTree(validTree({ 'src/layouts/rail/manifest.json': validManifest({ since: 'x' }) }));
  const r = generateDocs({ root });
  assert.equal(r.errors.length, 1);
  assert.deepEqual(r.written, []);
});
