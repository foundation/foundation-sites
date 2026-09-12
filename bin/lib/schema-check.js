// A validator for the subset of JSON Schema (draft 2020-12) that
// schema/manifest.schema.json uses. Deliberately small: any keyword outside
// KEYWORDS throws, so the schema cannot grow past what this code checks.

const ANNOTATIONS = new Set(['$schema', '$id', '$comment', 'title', 'description', '$defs', 'default', 'examples']);
const KEYWORDS = new Set([
	'$ref', 'type', 'enum', 'const', 'required', 'properties', 'additionalProperties',
	'items', 'pattern', 'minItems', 'uniqueItems', 'minimum',
]);

export function checkSchema(schema, value, options = {}) {
	const root = options.root ?? schema;
	const path = options.path ?? '$';

	for (const key of Object.keys(schema)) {
		if (!KEYWORDS.has(key) && !ANNOTATIONS.has(key)) {
			throw new Error(`Unsupported schema keyword "${key}" at ${path}`);
		}
	}
	if (schema.$ref !== undefined) {
		return checkSchema(resolveRef(root, schema.$ref), value, { root, path });
	}

	const errors = [];

	if (schema.type !== undefined) {
		const types = Array.isArray(schema.type) ? schema.type : [schema.type];
		if (!types.some((t) => matchesType(t, value))) {
			errors.push({ path, message: `expected ${types.join(' or ')}, got ${typeName(value)}` });
			return errors;
		}
	}
	if (schema.enum !== undefined && !schema.enum.some((v) => deepEqual(v, value))) {
		const list = schema.enum.map((v) => JSON.stringify(v)).join(', ');
		errors.push({ path, message: `expected one of ${list}, got ${JSON.stringify(value)}` });
	}
	if (schema.const !== undefined && !deepEqual(schema.const, value)) {
		errors.push({ path, message: `expected ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}` });
	}
	if (typeof value === 'string' && schema.pattern !== undefined && !new RegExp(schema.pattern).test(value)) {
		errors.push({ path, message: `"${value}" does not match ${schema.pattern}` });
	}
	if (typeof value === 'number' && schema.minimum !== undefined && value < schema.minimum) {
		errors.push({ path, message: `${value} is below the minimum ${schema.minimum}` });
	}
	if (Array.isArray(value)) {
		if (schema.minItems !== undefined && value.length < schema.minItems) {
			errors.push({ path, message: `expected at least ${schema.minItems} items, got ${value.length}` });
		}
		if (schema.uniqueItems && new Set(value.map((v) => JSON.stringify(v))).size !== value.length) {
			errors.push({ path, message: 'items must be unique' });
		}
		if (schema.items !== undefined) {
			value.forEach((item, i) => errors.push(...checkSchema(schema.items, item, { root, path: `${path}[${i}]` })));
		}
	}
	if (isPlainObject(value)) {
		for (const key of schema.required ?? []) {
			if (!(key in value)) errors.push({ path, message: `missing required property "${key}"` });
		}
		const props = schema.properties ?? {};
		for (const [key, sub] of Object.entries(props)) {
			if (key in value) errors.push(...checkSchema(sub, value[key], { root, path: `${path}.${key}` }));
		}
		if (schema.additionalProperties !== undefined) {
			for (const key of Object.keys(value)) {
				if (key in props) continue;
				if (schema.additionalProperties === false) {
					errors.push({ path, message: `unexpected property "${key}"` });
				} else if (isPlainObject(schema.additionalProperties)) {
					errors.push(...checkSchema(schema.additionalProperties, value[key], { root, path: `${path}.${key}` }));
				}
			}
		}
	}
	return errors;
}

function resolveRef(root, ref) {
	if (!ref.startsWith('#/')) throw new Error(`Unsupported $ref "${ref}" (only #/ references are supported)`);
	let node = root;
	for (const part of ref.slice(2).split('/')) {
		node = node?.[part];
		if (node === undefined) throw new Error(`Unresolvable $ref "${ref}"`);
	}
	return node;
}

function matchesType(type, value) {
	switch (type) {
		case 'null': return value === null;
		case 'array': return Array.isArray(value);
		case 'object': return isPlainObject(value);
		case 'integer': return Number.isInteger(value);
		case 'number': return typeof value === 'number' && Number.isFinite(value);
		case 'string': return typeof value === 'string';
		case 'boolean': return typeof value === 'boolean';
		default: throw new Error(`Unsupported type "${type}"`);
	}
}

function typeName(value) {
	if (value === null) return 'null';
	if (Array.isArray(value)) return 'array';
	return typeof value;
}

function isPlainObject(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function deepEqual(a, b) {
	return JSON.stringify(a) === JSON.stringify(b);
}
