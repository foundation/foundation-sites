#!/usr/bin/env node
// The gate. Checks manifests against the schema and their folders, examples
// and guide snippets against the manifests, component CSS against the
// spacing-ownership rule, and the layer files against the layer contract.
// Reports every problem it finds, then exits non-zero if there were any.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAYER_STATEMENT } from './lib/layers.js';
import { loadSchema, loadAndMerge, loadVocabulary } from './lib/manifest.js';
import { parseHtml, walkElements, classList, attributes, countMatches, elementChildren } from './lib/html.js';
import { stripComments, splitImports } from './lib/imports.js';
import { walkFiles } from './lib/files.js';
import { declaredTokens, loadCatalogue } from './lib/tokens.js';

const MARGIN_RE = /(?:^|[;\s{])margin(?:-block|-inline)?(?:-start|-end)?\s*:\s*([^;]*)/g;

export function formatError(root, e) {
	return `${path.relative(root, e.file)}${e.line ? `:${e.line}` : ''}: ${e.message}`;
}

/** Checks every element carrying a framework identity class against that component's contract. */
export function validateElementTree(root, merged, file, lineOffset = 0) {
	const errors = [];
	const byClass = new Map(Object.values(merged).map((m) => [m.class, m]));

	// A child marker such as data-split or data-center is declared by the PARENT
	// layout's children contract, so it is legal on any element, including one
	// that is itself a layout. The parent's min/max still counts them.
	const childMarkers = new Set();
	for (const m of Object.values(merged)) {
		for (const child of m.children ?? []) {
			for (const found of child.selector.matchAll(/\[(data-[a-z0-9-]+)\]/g)) childMarkers.add(found[1]);
		}
	}

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
				if (!decl) {
					if (!childMarkers.has(name)) push(`unknown attribute ${name}`);
					continue;
				}
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

export function validateGuides(docsDir, merged, entries = []) {
	const errors = [];
	if (fs.existsSync(docsDir)) {
		for (const file of walkFiles(docsDir).filter((f) => f.endsWith('.md'))) {
			const markdown = fs.readFileSync(file, 'utf8');
			for (const block of extractHtmlBlocks(markdown)) {
				errors.push(...validateElementTree(parseHtml(block.html), merged, file, block.line - 1));
			}
		}
	}
	for (const entry of entries) {
		const file = path.join(entry.dir, 'docs.md');
		if (!fs.existsSync(file)) continue;
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
	// Blank string literals too, preserving length, so "margin" inside a
	// content: or url() string never counts as a declaration.
	const text = stripComments(css).replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, (m) => ' '.repeat(m.length));
	const hits = [];
	const stack = [];
	let selector = '';
	let selectorLine = 1;
	let line = 1;

	for (const ch of text) {
		if (ch === '{') {
			stack.push({ selector: selector.trim(), decls: '', line: selectorLine });
			selector = '';
		} else if (ch === '}') {
			const block = stack.pop();
			if (block) {
				const members = block.selector.split(',').map((s) => s.trim());
				if (block && members.includes(`.${className}`)) {
					for (const m of block.decls.matchAll(MARGIN_RE)) {
						if (m[1].trim().split(/\s+/).every((v) => v === 'auto')) continue;
						hits.push(block.line);
						break;
					}
				}
			}
			selector = '';
		} else if (ch === ';') {
			if (stack.length) stack[stack.length - 1].decls += ch;
			selector = '';
		} else {
			if (stack.length) stack[stack.length - 1].decls += ch;
			if (selector.trim() === '' && !/\s/.test(ch)) selectorLine = line;
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
		// A leading @charset is legal before @import; imports.js skips it too.
		const text = stripComments(fs.readFileSync(entryFile, 'utf8')).replace(/^\s*@charset\s+"[^"]*"\s*;/, '').trim();
		if (!/^@import\s+(?:url\(\s*)?["']layers\.css["']\s*\)?\s*;/.test(text)) {
			errors.push({ file: entryFile, line: 1, message: 'must begin with @import "layers.css";' });
		}
	}
	return errors;
}

const IMPORT_ORDER_MESSAGE = 'imports must come in the order layers.css, tokens/*, base/reset.css, base/*, layouts/attributes.css, layouts/*, recipes/*, components/*, then everything else';

/** Enforces the import order and that every tokens/base/layouts file is imported. */
export function validateImportOrder(srcDir) {
	const tokensDir = path.join(srcDir, 'tokens');
	const entryFile = path.join(srcDir, 'yeti.css');
	const attrFile = path.join(srcDir, 'layouts', 'attributes.css');
	if (!fs.existsSync(entryFile) || (!fs.existsSync(tokensDir) && !fs.existsSync(attrFile))) return [];
	const errors = [];
	const raw = splitImports(fs.readFileSync(entryFile, 'utf8'), entryFile).imports;
	// Normalise once so "./tokens/x.css" and "tokens/x.css" rank and match alike.
	const imports = raw.map((i) => ({ ...i, href: i.href.replace(/^\.\//, '') }));
	const hrefs = imports.map((i) => i.href);
	const rank = (href) => {
		if (href === 'layers.css') return 0;
		if (href.startsWith('tokens/')) return 1;
		if (href === 'base/reset.css') return 2;
		if (href.startsWith('base/')) return 3;
		if (href === 'layouts/attributes.css') return 4;
		if (href.startsWith('layouts/')) return 5;
		if (href.startsWith('recipes/')) return 6;
		if (href.startsWith('components/')) return 7;
		return 8;
	};
	const groupName = ['layers.css', 'tokens/', 'base/reset.css', 'base/', 'layouts/attributes.css', 'layouts/', 'recipes/', 'components/', 'the rest'];
	// Report the first import that has something of a lower group after it.
	for (let i = 0; i < imports.length; i++) {
		const later = imports.slice(i + 1).find((imp) => rank(imp.href) < rank(imports[i].href));
		if (later) {
			errors.push({ file: entryFile, line: imports[i].line, message: `${IMPORT_ORDER_MESSAGE} (found "${imports[i].href}" before all of ${groupName[rank(later.href)]})` });
			break;
		}
	}
	if (fs.existsSync(tokensDir)) {
		const tokenFiles = fs.readdirSync(tokensDir).filter((f) => f.endsWith('.css')).map((f) => `tokens/${f}`);
		for (const f of tokenFiles) {
			if (!hrefs.includes(f)) errors.push({ file: entryFile, message: `${f} is not imported` });
		}
	}

	const baseDir = path.join(srcDir, 'base');
	if (fs.existsSync(baseDir)) {
		const baseFiles = fs.readdirSync(baseDir).filter((f) => f.endsWith('.css')).map((f) => `base/${f}`);
		for (const f of baseFiles) {
			if (!hrefs.includes(f)) errors.push({ file: entryFile, message: `${f} is not imported` });
		}
	}

	const layoutsDir = path.join(srcDir, 'layouts');
	if (fs.existsSync(layoutsDir)) {
		if (fs.existsSync(path.join(layoutsDir, 'attributes.css')) && !hrefs.includes('layouts/attributes.css')) {
			errors.push({ file: entryFile, message: 'layouts/attributes.css is not imported' });
		}
		for (const name of fs.readdirSync(layoutsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
			const f = `layouts/${name}/${name}.css`;
			if (fs.existsSync(path.join(srcDir, f)) && !hrefs.includes(f)) errors.push({ file: entryFile, message: `${f} is not imported` });
		}
	}

	const recipesDir = path.join(srcDir, 'recipes');
	if (fs.existsSync(recipesDir)) {
		for (const name of fs.readdirSync(recipesDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
			const f = `recipes/${name}/${name}.css`;
			if (fs.existsSync(path.join(srcDir, f)) && !hrefs.includes(f)) errors.push({ file: entryFile, message: `${f} is not imported` });
		}
	}

	const componentsDir = path.join(srcDir, 'components');
	if (fs.existsSync(componentsDir)) {
		for (const name of fs.readdirSync(componentsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)) {
			const f = `components/${name}/${name}.css`;
			if (fs.existsSync(path.join(srcDir, f)) && !hrefs.includes(f)) errors.push({ file: entryFile, message: `${f} is not imported` });
		}
	}
	return errors;
}

/** !important is banned everywhere except the [hidden] rule in base/reset.css. */
export function validateImportant(srcDir) {
	const errors = [];
	for (const file of walkFiles(srcDir).filter((f) => f.endsWith('.css'))) {
		const text = stripComments(fs.readFileSync(file, 'utf8'))
			.replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, (m) => ' '.repeat(m.length));
		for (const m of text.matchAll(/!important/g)) {
			const before = text.slice(0, m.index);
			const selector = before.slice(before.lastIndexOf('{', before.lastIndexOf('{') - 1) + 1, before.lastIndexOf('{')).trim();
			const allowed = path.relative(srcDir, file) === path.join('base', 'reset.css') && /\[hidden\]/.test(selector);
			if (!allowed) errors.push({ file, line: before.split('\n').length, message: '!important is not allowed (only the [hidden] rule in base/reset.css may use it)' });
		}
	}
	return errors;
}

/** The catalogue and src/tokens/*.css must agree exactly. */
export function validateTokens(root, manifestEntries = []) {
	const catalogueFile = path.join(root, 'src', 'tokens', 'tokens.json');
	if (!fs.existsSync(catalogueFile)) return [];
	const schema = loadSchema(path.join(root, 'schema', 'tokens.schema.json'));
	const { entries, errors } = loadCatalogue(catalogueFile, schema);
	if (errors.length) return errors;

	const tokensComponent = manifestEntries.find((e) => e.name === 'tokens');
	if (tokensComponent) {
		errors.push({ file: tokensComponent.file, message: 'a component cannot be named "tokens"; docs/tokens.md is the generated token reference' });
	}

	const declaredIn = new Map();
	const tokensDir = path.join(root, 'src', 'tokens');
	for (const file of walkFiles(tokensDir).filter((f) => f.endsWith('.css'))) {
		for (const name of declaredTokens(fs.readFileSync(file, 'utf8'))) {
			if (!declaredIn.has(name)) declaredIn.set(name, file);
		}
	}
	const listed = new Map(entries.map((e) => [e.name, e]));
	for (const [name, file] of declaredIn) {
		if (!listed.has(name)) errors.push({ file, message: `${name} is declared but not in tokens.json` });
	}

	const srcDir = path.join(root, 'src');
	const themesDir = path.join(root, 'src', 'themes');
	for (const file of walkFiles(srcDir).filter((f) => f.endsWith('.css') && !f.startsWith(tokensDir + path.sep) && !f.startsWith(themesDir + path.sep))) {
		for (const name of declaredTokens(fs.readFileSync(file, 'utf8'))) {
			errors.push({ file, message: `${name} is a public token declared outside src/tokens/; public tokens live in src/tokens/ and the catalogue` });
		}
	}

	for (const entry of entries) {
		const declared = entry.declared !== false;
		if (declared && !declaredIn.has(entry.name)) {
			errors.push({ file: catalogueFile, message: `${entry.name} is in the catalogue but not declared in src/tokens/*.css` });
		}
		if (!declared && declaredIn.has(entry.name)) {
			errors.push({ file: catalogueFile, message: `${entry.name} is marked declared: false but src/tokens/*.css declares it` });
		}
	}
	return errors;
}

const MAPPED = {
	'data-gap': 'gap', 'data-align': 'align', 'data-justify': 'justify', 'data-threshold': 'width',
	'data-width': 'width', 'data-min': 'width-or-none', 'data-max': 'width', 'data-ratio': 'ratio', 'data-columns': 'columns',
	'data-align-self': 'align', 'data-justify-self': 'self',
	'data-variant': 'variant', 'data-size': 'size-control',
};

// Read directly by their own layout's CSS, so they have no attributes.css rule.
const READ_DIRECTLY = new Set(['data-side', 'data-limit', 'data-emphasis', 'data-shape', 'data-edge']);

/** Every value of every mapped vocabulary must have a rule in layouts/attributes.css,
 *  and every manifest attribute that references a vocabulary must be checked against
 *  the right one (or explicitly exempted as read directly by its own layout's CSS). */
export function validateVocabulary(root, entries = []) {
	const vocabFile = path.join(root, 'schema', 'vocabulary.json');
	const attrFile = path.join(root, 'src', 'layouts', 'attributes.css');
	if (!fs.existsSync(vocabFile) || !fs.existsSync(attrFile)) return [];
	const vocabulary = loadVocabulary(vocabFile);
	const css = stripComments(fs.readFileSync(attrFile, 'utf8'));
	const present = new Set([...css.matchAll(/\[(data-[a-z-]+)="([^"]+)"\]/g)].map((m) => `${m[1]}=${m[2]}`));
	const errors = [];
	for (const [attr, vocab] of Object.entries(MAPPED)) {
		for (const value of vocabulary[vocab] ?? []) {
			if (!present.has(`${attr}=${value}`)) errors.push({ file: attrFile, message: `${attr}="${value}" (vocabulary ${vocab}) has no rule` });
		}
	}

	for (const entry of entries) {
		for (const attr of entry.manifest.attributes) {
			if (!attr.vocabulary || READ_DIRECTLY.has(attr.name)) continue;
			if (!(attr.name in MAPPED)) {
				errors.push({ file: entry.file, message: `attribute ${attr.name} references vocabulary "${attr.vocabulary}" but validate does not check it; add it to MAPPED or READ_DIRECTLY in bin/validate.js` });
			} else if (MAPPED[attr.name] !== attr.vocabulary) {
				errors.push({ file: entry.file, message: `attribute ${attr.name} uses vocabulary "${attr.vocabulary}" but validate checks it against "${MAPPED[attr.name]}"` });
			}
		}
	}
	return errors;
}

/** Layouts respond to their container, never the viewport. */
export function validateNoMediaQueries(srcDir) {
	const errors = [];
	const dirs = ['layouts', 'recipes', 'components'].map((d) => path.join(srcDir, d)).filter((d) => fs.existsSync(d));
	for (const file of dirs.flatMap((d) => walkFiles(d)).filter((f) => f.endsWith('.css'))) {
		const text = stripComments(fs.readFileSync(file, 'utf8'));
		const m = text.match(/@media\b/);
		if (m) errors.push({ file, line: text.slice(0, m.index).split('\n').length, message: 'layouts are intrinsic; use container-relative techniques, not media queries' });
	}
	return errors;
}

const BUILT_FROM_MESSAGE = 'recipes must show the same result built from primitives under a "## Built from primitives" heading with a fenced html block';

/** The text of one `## Heading` section, up to the next `## `. Empty string when absent. */
function markdownSection(markdown, heading) {
	const re = new RegExp(`^## ${heading}\\s*$`, 'm');
	const m = re.exec(markdown);
	if (!m) return { text: '', offset: 0 };
	const start = m.index + m[0].length;
	const next = /^## /m.exec(markdown.slice(start));
	return { text: markdown.slice(start, next ? start + next.index : undefined), offset: start };
}

const ACCESSIBILITY_MESSAGE = 'components must document accessibility under a "## Accessibility" heading';

/** Every layout, recipe, and component ships a docs.md; layouts and recipes explain their
 *  name, recipes also show the composed form, and components document accessibility. */
export function validateDocsFragments(entries) {
	const errors = [];
	for (const entry of entries.filter((e) => e.kind !== 'utility')) {
		const file = path.join(entry.dir, 'docs.md');
		if (!fs.existsSync(file)) {
			errors.push({ file: entry.dir, message: entry.kind === 'component' ? `${entry.kind}s must have a docs.md with a "## Accessibility" heading` : `${entry.kind}s must have a docs.md with a "## Why this name" heading` });
			continue;
		}
		const markdown = fs.readFileSync(file, 'utf8');
		if (entry.kind === 'recipe') {
			const section = markdownSection(markdown, 'Built from primitives');
			const blocks = extractHtmlBlocks(section.text);
			if (!blocks.length) {
				errors.push({ file, message: BUILT_FROM_MESSAGE });
			} else {
				const lineOffset = markdown.slice(0, section.offset).split('\n').length - 1;
				for (const block of blocks) {
					walkElements(parseHtml(block.html), (el) => {
						if (classList(el).includes(entry.manifest.class)) {
							errors.push({ file, line: block.line + lineOffset + (el.sourceCodeLocation ? el.sourceCodeLocation.startLine - 1 : 0), message: `the composed form must not use the recipe's own class .${entry.manifest.class}` });
						}
					});
				}
			}
		}
		if (entry.kind === 'component') {
			if (!/^## Accessibility\s*$/m.test(markdown)) errors.push({ file, message: ACCESSIBILITY_MESSAGE });
		} else if (!/^## Why this name\s*$/m.test(markdown)) {
			errors.push({ file, message: 'layouts must explain their name under a "## Why this name" heading' });
		}
	}
	return errors;
}

const FIELD_MESSAGE = '.field: the label must reference the control with for, and the control must carry that id';

/** Every .field pairs its label with its control by for/id (or is a fieldset with a legend). */
export function validateFields(entries, docsDir, fixturesDir) {
	const errors = [];
	const sources = [];
	for (const entry of entries) {
		sources.push({ file: path.join(entry.dir, 'example.html'), html: fs.readFileSync(path.join(entry.dir, 'example.html'), 'utf8'), line: 0 });
		const docsFile = path.join(entry.dir, 'docs.md');
		if (fs.existsSync(docsFile)) for (const b of extractHtmlBlocks(fs.readFileSync(docsFile, 'utf8'))) sources.push({ file: docsFile, html: b.html, line: b.line - 1 });
	}
	if (fs.existsSync(docsDir)) {
		for (const file of walkFiles(docsDir).filter((f) => f.endsWith('.md'))) {
			for (const b of extractHtmlBlocks(fs.readFileSync(file, 'utf8'))) sources.push({ file, html: b.html, line: b.line - 1 });
		}
	}
	if (fixturesDir && fs.existsSync(fixturesDir)) {
		for (const file of walkFiles(fixturesDir).filter((f) => f.endsWith('.html'))) {
			sources.push({ file, html: fs.readFileSync(file, 'utf8'), line: 0 });
		}
	}
	for (const { file, html, line } of sources) {
		walkElements(parseHtml(html), (el) => {
			if (!classList(el).includes('field')) return;
			const kids = elementChildren(el);
			if (el.tagName === 'fieldset') {
				if (kids.filter((k) => k.tagName === 'legend').length !== 1) errors.push({ file, line: line + el.sourceCodeLocation.startLine, message: '.field on a fieldset needs exactly one legend' });
				return;
			}
			const label = kids.find((k) => k.tagName === 'label');
			const controls = kids.flatMap((k) => classList(k).includes('input-group') ? elementChildren(k).filter((g) => ['input', 'select'].includes(g.tagName)) : (['input', 'select', 'textarea'].includes(k.tagName) ? [k] : []));
			const forId = label && attributes(label).get('for');
			if (!label || !forId || controls.length !== 1 || attributes(controls[0]).get('id') !== forId) {
				errors.push({ file, line: line + el.sourceCodeLocation.startLine, message: FIELD_MESSAGE });
			}
		});
	}
	return errors;
}

/** Blanks url(...) contents and quoted strings, preserving length, so a semicolon or colon
 *  inside a token's value (a data: URL, say) is never mistaken for a declaration or
 *  property-name boundary. Only property names are checked, so values may be replaced. */
function sanitizeDeclarations(text) {
	return text
		.replace(/url\(([^)]*)\)/g, (m, inner) => `url(${' '.repeat(inner.length)})`)
		.replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/g, (m) => ' '.repeat(m.length));
}

/** A theme is :root blocks of --yeti-* public tokens, nothing else. */
export function validateThemes(root) {
	const themesDir = path.join(root, 'src', 'themes');
	const catalogueFile = path.join(root, 'src', 'tokens', 'tokens.json');
	if (!fs.existsSync(themesDir) || !fs.existsSync(catalogueFile)) return [];
	const schema = loadSchema(path.join(root, 'schema', 'tokens.schema.json'));
	const { entries } = loadCatalogue(catalogueFile, schema);
	const publicNames = new Set(entries.filter((e) => e.public).map((e) => e.name));
	const errors = [];
	for (const file of walkFiles(themesDir).filter((f) => f.endsWith('.css'))) {
		const text = stripComments(fs.readFileSync(file, 'utf8'));
		const stack = [];
		let selector = '';
		let line = 1;
		let selectorLine = 1;
		let decls = '';
		for (const ch of text) {
			if (ch === '{') {
				const sel = selector.trim();
				if (/^@media\s*\(\s*prefers-color-scheme:\s*(light|dark)\s*\)$/.test(sel) && !(stack.length && stack.at(-1).kind === 'media')) {
					stack.push({ kind: 'media' });
				} else if (sel === ':root' && (stack.length === 0 || stack.at(-1).kind === 'media')) {
					stack.push({ kind: 'root', line: selectorLine });
				} else {
					errors.push({ file, line: selectorLine, message: `themes may only set --yeti-* tokens on :root (found "${sel}")` });
					stack.push({ kind: 'other' });
				}
				selector = ''; decls = '';
			} else if (ch === '}') {
				const block = stack.pop();
				if (block?.kind === 'root') {
					for (const d of sanitizeDeclarations(decls).split(';')) {
						const [prop] = d.split(':').map((s) => s.trim());
						if (!prop) continue;
						if (!prop.startsWith('--yeti-')) errors.push({ file, line: block.line, message: `themes may only set --yeti-* tokens (found "${prop}")` });
						else if (!publicNames.has(prop)) errors.push({ file, line: block.line, message: `theme sets "${prop}", which is not a public token` });
					}
				}
				selector = ''; decls = '';
			} else {
				if (stack.length && stack.at(-1).kind === 'root') decls += ch; else selector += ch;
				if (ch === '\n') { line++; if (!selector.trim()) selectorLine = line; }
			}
		}
		// A statement at-rule (@import …; or @layer x;) never opens a block, so the
		// char loop above never sees it: it just keeps accumulating in `selector`
		// until the file ends. Catch that leftover text here.
		if (selector.trim()) {
			errors.push({ file, line: selectorLine, message: `themes may only set --yeti-* tokens on :root (found "${selector.trim()}")` });
		}
	}
	return errors;
}

export function validate({ root }) {
	const srcDir = path.join(root, 'src');
	const docsDir = path.join(root, 'docs', 'guides');
	const schema = loadSchema(path.join(root, 'schema', 'manifest.schema.json'));
	const vocabFile = path.join(root, 'schema', 'vocabulary.json');
	const vocabulary = fs.existsSync(vocabFile) ? loadVocabulary(vocabFile) : {};
	const { entries, merged, errors } = loadAndMerge(srcDir, schema, vocabulary);
	const all = [
		...errors,
		...validateExamples(entries, merged),
		...validateGuides(docsDir, merged, entries),
		...validateSpacing(entries),
		...validateLayers(srcDir),
		...validateImportOrder(srcDir),
		...validateImportant(srcDir),
		...validateTokens(root, entries),
		...validateVocabulary(root, entries),
		...validateNoMediaQueries(srcDir),
		...validateDocsFragments(entries),
		...validateFields(entries, docsDir, path.join(root, 'test', 'browser', 'fixtures')),
		...validateThemes(root),
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
