#!/usr/bin/env node
// Produces dist/: one readable bundle, the source tree verbatim, per-component
// JS modules, and the merged manifest. Concatenation only. No transforms.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveImports } from './lib/imports.js';
import { loadSchema, loadAndMerge, loadVocabulary } from './lib/manifest.js';
import { validate, formatError } from './validate.js';
import { walkFiles } from './lib/files.js';

export function readPackage(root) {
	return JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
}

export function bundle({ root, pkg }) {
	const { files, errors } = resolveImports(path.join(root, 'src', 'yeti.css'));
	if (errors.length) return { css: null, errors };
	const header = `/*! ${pkg.name} ${pkg.version} | ${pkg.license} | ${pkg.homepage} */\n`;
	const body = files.map((f) => `\n/* ${path.relative(root, f.path)} */\n${f.css.trim()}\n`).join('');
	return { css: header + body, errors: [] };
}

export function build({ root, pkg = readPackage(root) }) {
	const checked = validate({ root });
	if (checked.errors.length) return { errors: checked.errors, outputs: [] };
	const bundled = bundle({ root, pkg });
	if (bundled.errors.length) return { errors: bundled.errors, outputs: [] };

	const srcDir = path.join(root, 'src');
	const distDir = path.join(root, 'dist');
	const outputs = [];
	const write = (rel, content) => {
		const file = path.join(distDir, rel);
		fs.mkdirSync(path.dirname(file), { recursive: true });
		fs.writeFileSync(file, content);
		outputs.push(rel);
	};

	fs.rmSync(distDir, { recursive: true, force: true });
	fs.mkdirSync(path.join(distDir, 'js'), { recursive: true });

	write('yeti.css', bundled.css);

	fs.cpSync(srcDir, path.join(distDir, 'css'), {
		recursive: true,
		filter: (src) => !path.basename(src).startsWith('.'),
	});
	outputs.push('css/');

	for (const file of walkFiles(srcDir).filter((f) => f.endsWith('.js'))) {
		const rel = `js/${path.basename(file)}`;
		fs.copyFileSync(file, path.join(distDir, rel));
		outputs.push(rel);
	}

	const schema = loadSchema(path.join(root, 'schema', 'manifest.schema.json'));
	const vocabFile = path.join(root, 'schema', 'vocabulary.json');
	const vocabulary = fs.existsSync(vocabFile) ? loadVocabulary(vocabFile) : {};
	const { merged } = loadAndMerge(srcDir, schema, vocabulary);
	write('yeti.manifest.json', `${JSON.stringify({
		framework: 'yeti',
		version: pkg.version,
		generated: new Date().toISOString().slice(0, 10),
		components: merged,
	}, null, 2)}\n`);

	const catalogueFile = path.join(srcDir, 'tokens', 'tokens.json');
	if (fs.existsSync(catalogueFile)) {
		write('yeti.tokens.json', `${JSON.stringify({
			framework: 'yeti',
			version: pkg.version,
			generated: new Date().toISOString().slice(0, 10),
			tokens: JSON.parse(fs.readFileSync(catalogueFile, 'utf8')),
		}, null, 2)}\n`);
	}

	return { errors: [], outputs };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	const root = process.cwd();
	const { errors, outputs } = build({ root });
	for (const e of errors) console.error(formatError(root, e));
	if (errors.length) {
		console.error(`build: aborted, ${errors.length} problem${errors.length === 1 ? '' : 's'}`);
		process.exit(1);
	}
	console.log(`build: wrote dist/ (${outputs.length} entries)`);
}
