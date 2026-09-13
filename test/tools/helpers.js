import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LAYER_STATEMENT } from '../../bin/lib/layers.js';

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const SCHEMA_PATH = path.join(REPO_ROOT, 'schema/manifest.schema.json');
export const TOKENS_SCHEMA_PATH = path.join(REPO_ROOT, 'schema/tokens.schema.json');

const created = [];
process.on('exit', () => {
	for (const dir of created) fs.rmSync(dir, { recursive: true, force: true });
});

/** Writes a map of relative path -> content (string or JSON-able object) into a fresh temp dir. */
export function makeTree(files) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'yeti-'));
	created.push(dir);
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
