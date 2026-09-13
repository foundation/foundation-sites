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
import { stripComments, splitImports } from './lib/imports.js';
import { walkFiles } from './lib/files.js';
import { declaredTokens, loadCatalogue } from './lib/tokens.js';

const MARGIN_RE = /(?:^|[;\s{])margin(?:-block|-inline)?(?:-start|-end)?\s*:/;

export function formatError(root, e) {
	return `${path.relative(root, e.file)}${e.line ? `:${e.line}` : ''}: ${e.message}`;
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
				if (members.includes(`.${className}`) && MARGIN_RE.test(block.decls)) hits.push(block.line);
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

const IMPORT_ORDER_MESSAGE = 'imports must come in the order layers.css, tokens/*, base/reset.css, base/*, then everything else';

/** Enforces the phase 1 import order once src/tokens exists. */
export function validateImportOrder(srcDir) {
	const tokensDir = path.join(srcDir, 'tokens');
	const entryFile = path.join(srcDir, 'yeti.css');
	if (!fs.existsSync(tokensDir) || !fs.existsSync(entryFile)) return [];
	const errors = [];
	const { imports } = splitImports(fs.readFileSync(entryFile, 'utf8'), entryFile);
	const hrefs = imports.map((i) => i.href.replace(/^\.\//, ''));
	const rank = (href) => {
		if (href === 'layers.css') return 0;
		if (href.startsWith('tokens/')) return 1;
		if (href === 'base/reset.css') return 2;
		if (href.startsWith('base/')) return 3;
		return 4;
	};
	const groupName = ['layers.css', 'tokens/', 'base/reset.css', 'base/', 'the rest'];
	// Report the first import that has something of a lower group after it.
	for (let i = 0; i < imports.length; i++) {
		const later = imports.slice(i + 1).find((imp) => rank(imp.href) < rank(imports[i].href));
		if (later) {
			errors.push({ file: entryFile, line: imports[i].line, message: `${IMPORT_ORDER_MESSAGE} (found "${imports[i].href}" before all of ${groupName[rank(later.href)]})` });
			break;
		}
	}
	const tokenFiles = fs.readdirSync(tokensDir).filter((f) => f.endsWith('.css')).map((f) => `tokens/${f}`);
	for (const f of tokenFiles) {
		if (!hrefs.includes(f)) errors.push({ file: entryFile, message: `${f} is not imported` });
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
export function validateTokens(root) {
	const catalogueFile = path.join(root, 'src', 'tokens', 'tokens.json');
	if (!fs.existsSync(catalogueFile)) return [];
	const schema = loadSchema(path.join(root, 'schema', 'tokens.schema.json'));
	const { entries, errors } = loadCatalogue(catalogueFile, schema);
	if (errors.length) return errors;

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
		...validateImportOrder(srcDir),
		...validateImportant(srcDir),
		...validateTokens(root),
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
