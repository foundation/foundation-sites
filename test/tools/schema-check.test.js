import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkSchema } from '../../bin/lib/schema-check.js';

test('a valid value produces no errors', () => {
  const schema = { type: 'object', required: ['a'], properties: { a: { type: 'string' } } };
  assert.deepEqual(checkSchema(schema, { a: 'x' }), []);
});

test('type mismatch is reported with the JSON path', () => {
  const schema = { type: 'object', properties: { n: { type: 'integer' } } };
  assert.deepEqual(checkSchema(schema, { n: 'x' }), [{ path: '$.n', message: 'expected integer, got string' }]);
  assert.deepEqual(checkSchema(schema, { n: 1.5 }), [{ path: '$.n', message: 'expected integer, got number' }]);
});

test('required and additionalProperties: false', () => {
  const schema = { type: 'object', required: ['a'], additionalProperties: false, properties: { a: { type: 'string' } } };
  const messages = checkSchema(schema, { b: 1 }).map((e) => e.message).sort();
  assert.deepEqual(messages, ['missing required property "a"', 'unexpected property "b"']);
});

test('enum and const', () => {
  assert.equal(checkSchema({ enum: ['x', 'y'] }, 'z')[0].message, 'expected one of "x", "y", got "z"');
  assert.deepEqual(checkSchema({ enum: ['x', 'y'] }, 'y'), []);
  assert.equal(checkSchema({ const: true }, false)[0].message, 'expected true, got false');
});

test('pattern applies to strings only', () => {
  assert.equal(checkSchema({ type: 'string', pattern: '^[a-z]+$' }, 'AB')[0].message, '"AB" does not match ^[a-z]+$');
  assert.deepEqual(checkSchema({ pattern: '^[a-z]+$' }, 42), []);
});

test('array items, minItems, uniqueItems', () => {
  const schema = { type: 'array', items: { type: 'string' }, minItems: 1, uniqueItems: true };
  assert.deepEqual(checkSchema(schema, []), [{ path: '$', message: 'expected at least 1 items, got 0' }]);
  assert.deepEqual(checkSchema(schema, ['a', 'a']), [{ path: '$', message: 'items must be unique' }]);
  assert.deepEqual(checkSchema(schema, ['a', 1]), [{ path: '$[1]', message: 'expected string, got number' }]);
});

test('minimum on numbers', () => {
  assert.deepEqual(checkSchema({ type: 'integer', minimum: 0 }, -1), [{ path: '$', message: '-1 is below the minimum 0' }]);
});

test('a type array allows null and skips object checks for null', () => {
  const schema = { type: ['object', 'null'], required: ['m'], properties: { m: { type: 'string' } } };
  assert.deepEqual(checkSchema(schema, null), []);
  assert.equal(checkSchema(schema, {})[0].message, 'missing required property "m"');
  assert.equal(checkSchema(schema, 'x')[0].message, 'expected object or null, got string');
});

test('$ref resolves into $defs', () => {
  const schema = {
    type: 'object',
    properties: { item: { $ref: '#/$defs/thing' } },
    $defs: { thing: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } } },
  };
  assert.deepEqual(checkSchema(schema, { item: { id: 'a' } }), []);
  assert.deepEqual(checkSchema(schema, { item: {} }), [{ path: '$.item', message: 'missing required property "id"' }]);
});

test('an additionalProperties schema is applied to extra keys', () => {
  const schema = { type: 'object', properties: {}, additionalProperties: { type: 'number' } };
  assert.deepEqual(checkSchema(schema, { x: 'no' }), [{ path: '$.x', message: 'expected number, got string' }]);
});

test('unsupported keywords throw so the subset cannot silently grow', () => {
  assert.throws(() => checkSchema({ maxLength: 3 }, 'abc'), /Unsupported schema keyword "maxLength" at \$/);
  assert.throws(() => checkSchema({ type: 'date' }, 'x'), /Unsupported type "date"/);
  assert.throws(() => checkSchema({ $ref: '#/$defs/nope' }, {}), /Unresolvable \$ref/);
});

test('annotation keywords are ignored', () => {
  assert.deepEqual(checkSchema({ $schema: 'x', $id: 'y', title: 't', description: 'd', type: 'string', default: 'a', examples: ['b'] }, 'z'), []);
});
