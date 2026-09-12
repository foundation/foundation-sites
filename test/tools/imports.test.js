import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { stripComments, splitImports, resolveImports } from '../../bin/lib/imports.js';
import { makeTree } from './helpers.js';

test('stripComments keeps line numbers intact', () => {
  const out = stripComments('a /* one\ntwo */ b');
  assert.equal(out.split('\n').length, 2);
  assert.equal(out.replace(/\s+/g, ' ').trim(), 'a b');
});

test('splitImports accepts string and url() forms and returns the rest', () => {
  const css = '/* header */\n@import "a.css";\n@import url("b.css");\n@import url(\'c.css\');\n.x { color: red; }\n';
  const r = splitImports(css, 'entry.css');
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.imports, [{ href: 'a.css', line: 2 }, { href: 'b.css', line: 3 }, { href: 'c.css', line: 4 }]);
  assert.equal(r.rest.trim(), '.x { color: red; }');
});

test('splitImports rejects conditions, absolute paths, and late imports', () => {
  const css = '@import "a.css" layer(x);\n@import "/abs.css";\n@import "https://x/y.css";\n.x {}\n@import "late.css";\n';
  const r = splitImports(css, 'entry.css');
  assert.deepEqual(r.imports, []);
  assert.deepEqual(r.errors.map((e) => `${e.line}: ${e.message}`), [
    '1: @import conditions are not supported ("layer(x)")',
    '2: only relative @import paths are supported ("/abs.css")',
    '3: only relative @import paths are supported ("https://x/y.css")',
    '5: @import must come before all rules',
  ]);
});

test('resolveImports returns files in cascade order, each once', () => {
  const dir = makeTree({
    'yeti.css': '@import "layers.css";\n@import "a/a.css";\n@import "b.css";\n.entry {}\n',
    'layers.css': '@layer x;\n',
    'a/a.css': '@import "../shared.css";\n.a {}\n',
    'b.css': '@import "shared.css";\n.b {}\n',
    'shared.css': '.shared {}\n',
  });
  const r = resolveImports(path.join(dir, 'yeti.css'));
  assert.deepEqual(r.errors, []);
  assert.deepEqual(r.files.map((f) => path.relative(dir, f.path)), ['layers.css', 'shared.css', 'a/a.css', 'b.css', 'yeti.css']);
  assert.equal(r.files.at(-1).css.trim(), '.entry {}');
});

test('resolveImports reports a missing file against the importer', () => {
  const dir = makeTree({ 'yeti.css': '@import "nope.css";\n' });
  const r = resolveImports(path.join(dir, 'yeti.css'));
  assert.equal(r.files.length, 1);
  assert.deepEqual(r.errors.map((e) => `${path.basename(e.file)}:${e.line}: ${e.message}`), ['yeti.css:1: imported file "nope.css" does not exist']);
});

test('resolveImports reports a cycle naming the files', () => {
  const dir = makeTree({ 'a.css': '@import "b.css";\n', 'b.css': '@import "a.css";\n' });
  const r = resolveImports(path.join(dir, 'a.css'));
  assert.equal(r.errors.length, 1);
  assert.equal(r.errors[0].message, 'import cycle: a.css -> b.css -> a.css');
});
