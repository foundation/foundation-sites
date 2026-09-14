import fs from 'node:fs';
import path from 'node:path';
import { walkFiles } from './files.js';
import { stripComments } from './imports.js';
import { loadSchema } from './manifest.js';
import { loadCatalogue } from './tokens.js';

/** Blanks url(...) contents and quoted strings, preserving length, so a semicolon or colon
 *  inside a token's value (a data: URL, say) is never mistaken for a declaration or
 *  property-name boundary. Only property names are checked, so values may be replaced. */
export function sanitizeDeclarations(text) {
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
