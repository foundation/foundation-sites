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
