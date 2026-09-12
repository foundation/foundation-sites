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
