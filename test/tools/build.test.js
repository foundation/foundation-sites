import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { bundle, build } from '../../bin/build.js';
import { makeTree, validManifest, validTree } from './helpers.js';

const pkg = { name: 'yeti-css', version: '7.0.0-alpha.0', license: 'MIT', homepage: 'https://foundationcss.com/yeti/' };
const treeWithPkg = (extra = {}) => validTree({ 'package.json': pkg, ...extra });

test('bundle writes a header and each file in cascade order with source comments', () => {
	const root = makeTree(treeWithPkg());
	const r = bundle({ root, pkg });
	assert.deepEqual(r.errors, []);
	assert.ok(r.css.startsWith('/*! yeti-css 7.0.0-alpha.0 | MIT | https://foundationcss.com/yeti/ */\n'));
	const layers = r.css.indexOf('/* src/layers.css */');
	const rail = r.css.indexOf('/* src/layouts/rail/rail.css */');
	const entry = r.css.indexOf('/* src/yeti.css */');
	assert.ok(layers > 0 && layers < rail && rail < entry);
	assert.ok(r.css.includes('@layer yeti.reset, yeti.base, yeti.layouts, yeti.components, yeti.utilities;'));
	assert.ok(!r.css.includes('@import'));
});

test('build writes dist/ with the bundle, a verbatim css tree, js modules, and the merged manifest', () => {
	const root = makeTree(treeWithPkg({
		'src/layouts/rail/manifest.json': validManifest({ js: { module: 'rail.js', optional: true } }),
		'src/layouts/rail/rail.js': 'export default 1;\n',
		'src/tokens/.gitkeep': '',
	}));
	const r = build({ root });
	assert.deepEqual(r.errors, []);
	const dist = (p) => path.join(root, 'dist', p);
	assert.ok(fs.existsSync(dist('yeti.css')));
	assert.equal(fs.readFileSync(dist('css/layouts/rail/rail.css'), 'utf8'), fs.readFileSync(path.join(root, 'src/layouts/rail/rail.css'), 'utf8'));
	assert.equal(fs.readFileSync(dist('css/yeti.css'), 'utf8'), fs.readFileSync(path.join(root, 'src/yeti.css'), 'utf8'));
	assert.ok(!fs.existsSync(dist('css/tokens/.gitkeep')));
	assert.equal(fs.readFileSync(dist('js/rail.js'), 'utf8'), 'export default 1;\n');
	const manifest = JSON.parse(fs.readFileSync(dist('yeti.manifest.json'), 'utf8'));
	assert.equal(manifest.framework, 'yeti');
	assert.equal(manifest.version, '7.0.0-alpha.0');
	assert.match(manifest.generated, /^\d{4}-\d{2}-\d{2}$/);
	assert.equal(manifest.components.rail.class, 'rail');
	assert.ok(r.outputs.includes('yeti.css') && r.outputs.includes('js/rail.js') && r.outputs.includes('yeti.manifest.json'));
});

test('build refuses to run on validation errors and writes nothing', () => {
	const root = makeTree(treeWithPkg({ 'src/layouts/rail/example.html': '<div class="rail" data-gap="huge"><p>x</p></div>' }));
	const r = build({ root });
	assert.equal(r.errors.length, 1);
	assert.ok(!fs.existsSync(path.join(root, 'dist')));
});

test('build reports import errors', () => {
	const root = makeTree(treeWithPkg({ 'src/yeti.css': '@import "layers.css";\n@import "missing.css";\n' }));
	const r = build({ root });
	assert.equal(r.errors[0].message, 'imported file "missing.css" does not exist');
	assert.ok(!fs.existsSync(path.join(root, 'dist')));
});

test('a rebuild replaces a stale dist', () => {
	const root = makeTree(treeWithPkg());
	fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
	fs.writeFileSync(path.join(root, 'dist', 'stale.txt'), 'old');
	build({ root });
	assert.ok(!fs.existsSync(path.join(root, 'dist', 'stale.txt')));
});

test('build ships the tokens catalogue when present', () => {
	const root = makeTree(treeWithPkg({
		'schema/tokens.schema.json': fs.readFileSync(path.join(process.cwd(), 'schema/tokens.schema.json'), 'utf8'),
		'src/tokens/scale.css': '@layer yeti.base { :root { --yeti-base-min: 1rem; } }\n',
		'src/tokens/tokens.json': [{ name: '--yeti-base-min', group: 'scale', public: true, default: '1rem', description: 'x' }],
		'src/base/reset.css': '',
		'src/yeti.css': '@import "layers.css";\n@import "tokens/scale.css";\n@import "base/reset.css";\n@import "layouts/rail/rail.css";\n',
	}));
	const r = build({ root });
	assert.deepEqual(r.errors, []);
	const shipped = JSON.parse(fs.readFileSync(path.join(root, 'dist/yeti.tokens.json'), 'utf8'));
	assert.equal(shipped.framework, 'yeti');
	assert.equal(shipped.tokens[0].name, '--yeti-base-min');
	assert.ok(r.outputs.includes('yeti.tokens.json'));
});
