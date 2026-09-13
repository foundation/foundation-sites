// Thin wrapper over parse5 for the validator. Examples are HTML fragments,
// except that some (the shell's) wrap their content in a real <body> to show
// the recipe on the page's outermost element. parse5's fragment parser
// special-cases a literal <body> tag and drops it (spec behavior for
// innerHTML-style parsing): the wrapper's own class and attributes vanish and
// only its children survive. So a leading <body> is parsed as a full
// document instead, and the real body element (which carries the source
// locations and attributes the fragment parser threw away) is unwrapped back
// into the same one-element-array shape parseFragment would have returned.
// The selector subset supported by countMatches is deliberately small:
//   '> X'  direct children matching X
//   'X'    all descendants matching X
// where X is '*', 'tag', '.class', 'tag.class', or '.a.b'.
import { parseFragment, parse } from 'parse5';

export function parseHtml(html) {
	// Source locations let the validator report the line of the offending element.
	if (/^\s*<body[\s>]/i.test(html)) {
		const document = parse(html, { sourceCodeLocationInfo: true });
		const body = document.childNodes.find((n) => n.tagName === 'html')
			?.childNodes.find((n) => n.tagName === 'body');
		return { childNodes: [body] };
	}
	return parseFragment(html, { sourceCodeLocationInfo: true });
}

export function walkElements(node, fn) {
	for (const child of node.childNodes ?? []) {
		if (child.tagName) fn(child);
		walkElements(child, fn);
	}
}

export function elementChildren(el) {
	return (el.childNodes ?? []).filter((c) => c.tagName);
}

export function classList(el) {
	const attr = el.attrs.find((a) => a.name === 'class');
	return attr ? attr.value.split(/\s+/).filter(Boolean) : [];
}

export function attributes(el) {
	return new Map(el.attrs.map((a) => [a.name, a.value]));
}

export function matchesSimple(el, simple) {
	if (simple === '*') return true;
	// Split off [attr] or [attr="value"] parts, then tag and classes.
	const attrs = [...simple.matchAll(/\[([a-z0-9-]+)(?:="([^"]*)")?\]/g)].map((m) => [m[1], m[2]]);
	const rest = simple.replace(/\[[^\]]+\]/g, '');
	const [tag, ...classes] = rest.split('.');
	if (tag && tag !== '*' && el.tagName !== tag) return false;
	const list = classList(el);
	if (!classes.every((c) => list.includes(c))) return false;
	const have = attributes(el);
	return attrs.every(([n, v]) => have.has(n) && (v === undefined || have.get(n) === v));
}

export function countMatches(el, selector) {
	const s = selector.trim();
	if (s.startsWith('>')) {
		const simple = s.slice(1).trim();
		return elementChildren(el).filter((c) => matchesSimple(c, simple)).length;
	}
	let count = 0;
	walkElements(el, (d) => { if (matchesSimple(d, s)) count += 1; });
	return count;
}
