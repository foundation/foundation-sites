import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { stampVersion, checkGitState } from '../../bin/release.js';
import { makeTree } from './helpers.js';

test('stampVersion replaces only the version and keeps two-space formatting', () => {
	const input = '{\n  "name": "yeti-css",\n  "version": "7.0.0-alpha.0",\n  "license": "MIT"\n}\n';
	assert.equal(stampVersion(input, '7.0.0-beta.1'), '{\n  "name": "yeti-css",\n  "version": "7.0.0-beta.1",\n  "license": "MIT"\n}\n');
});

test('stampVersion rejects malformed versions', () => {
	assert.throws(() => stampVersion('{"version":"1.0.0"}', 'v7'), /invalid version "v7"/);
	assert.throws(() => stampVersion('{"version":"1.0.0"}', '7.0'), /invalid version "7.0"/);
});

test('checkGitState requires a clean tree on a release/* branch', () => {
	const root = makeTree({ 'a.txt': 'a\n' });
	const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
	git('init', '-q', '-b', 'develop');
	git('-c', 'user.email=t@example.com', '-c', 'user.name=t', 'add', '.');
	git('-c', 'user.email=t@example.com', '-c', 'user.name=t', 'commit', '-q', '-m', 'init');
	assert.deepEqual(checkGitState(root), ['must run on a release/* branch (on develop)']);
	git('checkout', '-q', '-b', 'release/7.0.0');
	assert.deepEqual(checkGitState(root), []);
	fs.writeFileSync(path.join(root, 'a.txt'), 'changed\n');
	assert.deepEqual(checkGitState(root), ['working tree is not clean']);
});
