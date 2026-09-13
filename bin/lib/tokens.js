// Reads token declarations out of CSS. Used by validate (catalogue drift)
// and by nothing else; it deliberately knows nothing about the catalogue.
import fs from 'node:fs';
import { stripComments } from './imports.js';
import { checkSchema } from './schema-check.js';

const DECLARATION_RE = /(--yeti-[a-z0-9-]+)\s*:/g;

/** Unique public token names declared in css, in order of first appearance. */
export function declaredTokens(css) {
	const seen = new Set();
	const out = [];
	for (const m of stripComments(css).matchAll(DECLARATION_RE)) {
		if (!seen.has(m[1])) {
			seen.add(m[1]);
			out.push(m[1]);
		}
	}
	return out;
}

/** Loads and schema-checks the catalogue. Returns { entries, errors } with absolute file paths in errors. */
export function loadCatalogue(file, schema) {
	let entries;
	try {
		entries = JSON.parse(fs.readFileSync(file, 'utf8'));
	} catch (e) {
		return { entries: [], errors: [{ file, message: `invalid JSON: ${e.message}` }] };
	}
	const errors = checkSchema(schema, entries).map((e) => ({ file, message: `${e.path}: ${e.message}` }));
	const names = new Set();
	for (const entry of entries) {
		if (names.has(entry.name)) errors.push({ file, message: `duplicate token "${entry.name}"` });
		names.add(entry.name);
	}
	return { entries, errors };
}
