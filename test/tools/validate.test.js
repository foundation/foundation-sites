import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
	validate, formatError, validateElementTree, extractHtmlBlocks, findBareMargin, validateLayers, validateImportOrder, validateImportant, validateTokens,
	validateVocabulary, validateNoMediaQueries, validateDocsFragments,
} from '../../bin/validate.js';
import { parseHtml } from '../../bin/lib/html.js';
import { makeTree, validManifest, validTree, REPO_ROOT, TOKENS_SCHEMA_PATH, VOCABULARY_PATH } from './helpers.js';

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
	assert.deepEqual(findBareMargin('.rail, .pill { margin: 0; }', 'rail'), [1]);
	assert.deepEqual(findBareMargin('.pill,\n.rail {\n  margin: 0;\n}', 'rail'), [1]);
	assert.deepEqual(findBareMargin('.rail\n{ margin: 0; }', 'rail'), [1]);
});

test('findBareMargin ignores the word margin inside string values', () => {
	assert.deepEqual(findBareMargin('.rail { content: "set margin: 1px here"; }', 'rail'), []);
	assert.deepEqual(findBareMargin(".rail { content: 'margin: 0'; margin: 0; }", 'rail'), [1]);
});

test('validateLayers tolerates a leading @charset in yeti.css', () => {
	const r = run(validTree({ 'src/yeti.css': '@charset "UTF-8";\n@import "layers.css";\n' }));
	assert.deepEqual(r.lines, []);
});

test('a component setting its own margin fails the spacing rule', () => {
	const r = run(validTree({ 'src/layouts/rail/rail.css': '.rail {\n  margin-block-end: 1rem;\n}\n' }));
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

test('validateImportOrder requires layers, then tokens, then reset, then base', () => {
	const tokensTree = (yetiCss) => validTree({
		'src/tokens/scale.css': ':root { --yeti-base-min: 1rem; }\n',
		'src/tokens/color.css': ':root { --yeti-hue-primary: 250; }\n',
		'src/base/reset.css': '',
		'src/base/typography.css': '',
		'src/yeti.css': yetiCss,
	});
	const ok = run(tokensTree('@import "layers.css";\n@import "tokens/color.css";\n@import "tokens/scale.css";\n@import "base/reset.css";\n@import "base/typography.css";\n@import "layouts/rail/rail.css";\n'));
	assert.deepEqual(ok.lines, []);
	const resetFirst = run(tokensTree('@import "layers.css";\n@import "base/reset.css";\n@import "tokens/scale.css";\n@import "tokens/color.css";\n@import "base/typography.css";\n@import "layouts/rail/rail.css";\n'));
	assert.deepEqual(resetFirst.lines, ['src/yeti.css:2: imports must come in the order layers.css, tokens/*, base/reset.css, base/*, layouts/attributes.css, layouts/*, then everything else (found "base/reset.css" before all of tokens/)']);
	const missingToken = run(tokensTree('@import "layers.css";\n@import "tokens/scale.css";\n@import "base/reset.css";\n@import "base/typography.css";\n@import "layouts/rail/rail.css";\n'));
	assert.deepEqual(missingToken.lines, ['src/yeti.css: tokens/color.css is not imported']);
});

test('validateImportOrder treats a leading ./ as equivalent', () => {
	const tree = validTree({
		'src/tokens/scale.css': ':root { --yeti-base-min: 1rem; }\n',
		'src/base/reset.css': '',
		'src/yeti.css': '@import "layers.css";\n@import "./tokens/scale.css";\n@import "./base/reset.css";\n@import "layouts/rail/rail.css";\n',
	});
	assert.deepEqual(run(tree).lines, []);
});

test('validateImportOrder is silent when src/tokens does not exist', () => {
	assert.deepEqual(run(validTree()).lines, []);
});

test('validateImportant allows only the [hidden] rule in the reset', () => {
	const hidden = run(validTree({ 'src/base/reset.css': '@layer yeti.reset {\n\t[hidden] { display: none !important; }\n}\n' }));
	assert.deepEqual(hidden.lines, []);
	const elsewhere = run(validTree({ 'src/layouts/rail/rail.css': '.rail { display: flex !important; }\n' }));
	assert.deepEqual(elsewhere.lines, ['src/layouts/rail/rail.css:1: !important is not allowed (only the [hidden] rule in base/reset.css may use it)']);
	const wrongRule = run(validTree({ 'src/base/reset.css': 'img { display: block !important; }\n' }));
	assert.deepEqual(wrongRule.lines, ['src/base/reset.css:1: !important is not allowed (only the [hidden] rule in base/reset.css may use it)']);
	const inString = run(validTree({ 'src/layouts/rail/rail.css': '.rail::after { content: "!important"; }\n' }));
	assert.deepEqual(inString.lines, []);
});

const catalogueTree = (extra = {}) => validTree({
	'schema/tokens.schema.json': fs.readFileSync(TOKENS_SCHEMA_PATH, 'utf8'),
	'src/tokens/scale.css': '@layer yeti.base {\n\t:root {\n\t\t--yeti-base-min: var(--yeti-base, 1rem);\n\t\t--_yeti-t: 0;\n\t}\n}\n',
	'src/tokens/tokens.json': [
		{ name: '--yeti-base-min', group: 'scale', public: true, default: '1rem', description: 'Body size at the narrow viewport.' },
		{ name: '--yeti-base', group: 'scale', public: true, declared: false, default: 'unset', description: 'Set to pin both ends.' },
	],
	'src/base/reset.css': '',
	'src/yeti.css': '@import "layers.css";\n@import "tokens/scale.css";\n@import "base/reset.css";\n@import "layouts/rail/rail.css";\n',
	...extra,
});

test('validateTokens passes when the catalogue and the CSS agree', () => {
	assert.deepEqual(run(catalogueTree()).lines, []);
});

test('validateTokens reports drift in both directions and misdeclared override-only inputs', () => {
	const undocumented = run(catalogueTree({ 'src/tokens/scale.css': '@layer yeti.base { :root { --yeti-base-min: 1rem; --yeti-extra: 1; } }\n' }));
	assert.deepEqual(undocumented.lines, ['src/tokens/scale.css: --yeti-extra is declared but not in tokens.json']);
	const phantom = run(catalogueTree({ 'src/tokens/tokens.json': [
		{ name: '--yeti-base-min', group: 'scale', public: true, default: '1rem', description: 'x' },
		{ name: '--yeti-base', group: 'scale', public: true, declared: false, default: 'unset', description: 'x' },
		{ name: '--yeti-ghost', group: 'scale', public: true, default: '0', description: 'x' },
	] }));
	assert.deepEqual(phantom.lines, ['src/tokens/tokens.json: --yeti-ghost is in the catalogue but not declared in src/tokens/*.css']);
	const declaredAnyway = run(catalogueTree({ 'src/tokens/scale.css': '@layer yeti.base { :root { --yeti-base-min: 1rem; --yeti-base: 1rem; } }\n' }));
	assert.deepEqual(declaredAnyway.lines, ['src/tokens/tokens.json: --yeti-base is marked declared: false but src/tokens/*.css declares it']);
});

test('validateTokens is silent without a catalogue', () => {
	assert.deepEqual(run(validTree()).lines, []);
});

test('validateImportOrder requires every src/base/*.css file to be imported', () => {
	const r = run(catalogueTree({ 'src/base/extra.css': '' }));
	assert.deepEqual(r.lines, ['src/yeti.css: base/extra.css is not imported']);
});

test('validateTokens rejects a component named "tokens"', () => {
	const r = run(catalogueTree({
		'src/components/tokens/manifest.json': validManifest({
			name: 'tokens', kind: 'component', class: 'tokens', children: [], tokens: [],
		}),
		'src/components/tokens/tokens.css': '@layer yeti.components {\n\t.tokens { display: block; }\n}\n',
		'src/components/tokens/example.html': '<div class="tokens"></div>\n',
	}));
	assert.deepEqual(r.lines, [
		'src/components/tokens/manifest.json: a component cannot be named "tokens"; docs/tokens.md is the generated token reference',
	]);
});

test('validateTokens flags a public token declared outside src/tokens/', () => {
	const r = run(catalogueTree({
		'src/layouts/rail/rail.css': '@layer yeti.layouts { .rail { --yeti-rail-gap: 1rem; display: flex; } }\n',
	}));
	assert.deepEqual(r.lines, [
		'src/layouts/rail/rail.css: --yeti-rail-gap is a public token declared outside src/tokens/; public tokens live in src/tokens/ and the catalogue',
	]);
});

const layoutTree = (extra = {}) => validTree({
	'schema/vocabulary.json': fs.readFileSync(VOCABULARY_PATH, 'utf8'),
	'src/layouts/attributes.css': '@layer yeti.layouts {\n' + ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'xs-sm', 'xs-md', 'xs-lg', 'xs-xl', 'xs-2xl', 'xs-3xl', 'sm-md', 'sm-lg', 'sm-xl', 'sm-2xl', 'sm-3xl', 'md-lg', 'md-xl', 'md-2xl', 'md-3xl', 'lg-xl', 'lg-2xl', 'lg-3xl', 'xl-2xl', 'xl-3xl', '2xl-3xl'].map((v) => `\t[data-gap="${v}"] { --_yeti-gap: 0; }\n`).join('')
		+ ['start', 'center', 'end', 'stretch', 'baseline'].map((v) => `\t[data-align="${v}"] { --_yeti-align: ${v}; }\n`).join('')
		+ ['start', 'center', 'end', 'between', 'around', 'evenly'].map((v) => `\t[data-justify="${v}"] { --_yeti-justify: ${v}; }\n`).join('')
		+ ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].flatMap((v) => [`\t[data-threshold="${v}"] { --_yeti-threshold: 0; }\n`, `\t[data-width="${v}"] { --_yeti-width: 0; }\n`, `\t[data-max="${v}"] { --_yeti-max: 0; }\n`]).join('')
		+ ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].map((v) => `\t[data-min="${v}"] { --_yeti-min: 0; }\n`).join('')
		+ ['1/1', '4/3', '3/2', '16/9', '21/9'].map((v) => `\t[data-ratio="${v}"] { --_yeti-ratio: ${v}; }\n`).join('')
		+ ['1', '2', '3', '4', '5', '6'].map((v) => `\t[data-columns="${v}"] { --_yeti-column-cap: 0; }\n`).join('')
		+ '}\n',
	'src/yeti.css': '@import "layers.css";\n@import "layouts/attributes.css";\n@import "layouts/rail/rail.css";\n',
	...extra,
});

test('a complete layout tree validates', () => {
	assert.deepEqual(run(layoutTree()).lines, []);
});

test('validateVocabulary reports a mapped value with no attributes.css rule', () => {
	const tree = layoutTree();
	tree['src/layouts/attributes.css'] = tree['src/layouts/attributes.css'].replace('\t[data-gap="lg"] { --_yeti-gap: 0; }\n', '');
	assert.deepEqual(run(tree).lines, ['src/layouts/attributes.css: data-gap="lg" (vocabulary gap) has no rule']);
});

test('media queries are banned in layouts', () => {
	const r = run(layoutTree({ 'src/layouts/rail/rail.css': '@layer yeti.layouts { .rail { display: flex; } @media (width > 40rem) { .rail { gap: 1rem; } } }\n' }));
	assert.deepEqual(r.lines, ['src/layouts/rail/rail.css:1: layouts are intrinsic; use container-relative techniques, not media queries']);
});

test('every layout docs.md must carry the naming heading', () => {
	const missing = run(layoutTree({ 'src/layouts/rail/docs.md': '# Rail\n\nProse.\n' }));
	assert.deepEqual(missing.lines, ['src/layouts/rail/docs.md: layouts must explain their name under a "## Why this name" heading']);
	const absent = run(layoutTree({ 'src/layouts/rail/docs.md': null }));
	assert.deepEqual(absent.lines, ['src/layouts/rail: layouts must have a docs.md with a "## Why this name" heading']);
});

test('fenced html in docs.md is validated against the manifest', () => {
	const r = run(layoutTree({ 'src/layouts/rail/docs.md': '## Why this name\n\nBecause.\n\n```html\n<div class="rail" data-gap="huge"><p>x</p></div>\n```\n' }));
	assert.deepEqual(r.lines, ['src/layouts/rail/docs.md:6: .rail <div>: data-gap="huge" is not one of s, m, l']);
});

test('import order places layouts/attributes.css after base and before layout folders, and requires every layout file', () => {
	const late = run(layoutTree({ 'src/yeti.css': '@import "layers.css";\n@import "layouts/rail/rail.css";\n@import "layouts/attributes.css";\n' }));
	assert.deepEqual(late.lines, ['src/yeti.css:2: imports must come in the order layers.css, tokens/*, base/reset.css, base/*, layouts/attributes.css, layouts/*, then everything else (found "layouts/rail/rail.css" before all of layouts/attributes.css)']);
	const missing = run(layoutTree({ 'src/yeti.css': '@import "layers.css";\n@import "layouts/attributes.css";\n' }));
	assert.deepEqual(missing.lines, ['src/yeti.css: layouts/rail/rail.css is not imported']);
});

test('findBareMargin ignores auto-only margins', () => {
	assert.deepEqual(findBareMargin('.center { margin-inline: auto; }', 'center'), []);
	assert.deepEqual(findBareMargin('.center { margin: 0 auto; }', 'center'), [1]);
});
