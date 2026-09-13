import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { declaredTokens, loadCatalogue } from '../../bin/lib/tokens.js';
import { loadSchema } from '../../bin/lib/manifest.js';
import { makeTree, TOKENS_SCHEMA_PATH } from './helpers.js';

test('declaredTokens lists public declarations once, in order, ignoring internals and references', () => {
	const css = `
		/* --yeti-in-comment: 0; */
		@layer yeti.base {
			:root {
				--yeti-base-min: var(--yeti-base, 1rem);
				--_yeti-t: 0;
				--yeti-space-md: var(--_yeti-step-0);
				--yeti-base-min: 2rem;
			}
		}`;
	assert.deepEqual(declaredTokens(css), ['--yeti-base-min', '--yeti-space-md']);
});

test('loadCatalogue validates entries and rejects duplicates', () => {
	const schema = loadSchema(TOKENS_SCHEMA_PATH);
	const dir = makeTree({
		'ok.json': [{ name: '--yeti-space-md', group: 'space', public: true, default: 'step 0', description: 'Default gap.' }],
		'bad.json': [
			{ name: '--_yeti-step-0', group: 'space', public: true, default: '', description: 'internal' },
			{ name: '--yeti-space-md', group: 'nope', public: true, default: '', description: '' },
			{ name: '--yeti-space-md', group: 'space', public: true, default: '', description: '' },
		],
	});
	assert.deepEqual(loadCatalogue(path.join(dir, 'ok.json'), schema).errors, []);
	const bad = loadCatalogue(path.join(dir, 'bad.json'), schema).errors.map((e) => e.message);
	assert.ok(bad.some((m) => m.startsWith('$[0].name:')));
	assert.ok(bad.some((m) => m.startsWith('$[1].group:')));
	assert.ok(bad.includes('duplicate token "--yeti-space-md"'));
});
