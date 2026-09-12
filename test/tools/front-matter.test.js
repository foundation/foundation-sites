import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frontMatter } from '../../bin/lib/front-matter.js';

test('frontMatter emits Proton-style YAML with quoted strings and bare booleans and numbers', () => {
  const out = frontMatter({ raw: true, title: 'A "quoted" title', description: 'One: two', nav_group: 'Layouts', nav_order: 2 });
  assert.equal(out, '---\nraw: true\ntitle: "A \\"quoted\\" title"\ndescription: "One: two"\nnav_group: "Layouts"\nnav_order: 2\n---\n');
});
