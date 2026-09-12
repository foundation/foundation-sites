import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { walkFiles } from '../../bin/lib/files.js';
import { makeTree } from './helpers.js';

test('walkFiles lists every file recursively, sorted, as absolute paths', () => {
  const dir = makeTree({ 'b.txt': '', 'a/z.txt': '', 'a/c/y.txt': '' });
  assert.deepEqual(walkFiles(dir).map((f) => path.relative(dir, f)), ['a/c/y.txt', 'a/z.txt', 'b.txt']);
  assert.ok(walkFiles(dir).every((f) => path.isAbsolute(f)));
});
