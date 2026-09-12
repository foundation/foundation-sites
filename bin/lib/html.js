// Thin wrapper over parse5 for the validator. Examples are HTML fragments.
// The selector subset supported by countMatches is deliberately small:
//   '> X'  direct children matching X
//   'X'    all descendants matching X
// where X is '*', 'tag', '.class', 'tag.class', or '.a.b'.
import { parseFragment } from 'parse5';

export function parseHtml(html) {
  // Source locations let the validator report the line of the offending element.
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
  const [tag, ...classes] = simple.split('.');
  if (tag && el.tagName !== tag) return false;
  const list = classList(el);
  return classes.every((c) => list.includes(c));
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
