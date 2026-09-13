import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseHtml, walkElements, elementChildren, classList, attributes, matchesSimple, countMatches } from '../../bin/lib/html.js';

const root = () => parseHtml('<div class="rail  wide" data-gap="l" data-wrap><p>One</p><p class="last">Two</p><span><p class="last deep"></p></span></div>');
const div = () => root().childNodes[0];

test('walkElements visits every element in document order', () => {
	const tags = [];
	walkElements(root(), (el) => tags.push(el.tagName));
	assert.deepEqual(tags, ['div', 'p', 'p', 'span', 'p']);
});

test('classList splits on whitespace and drops empties', () => {
	assert.deepEqual(classList(div()), ['rail', 'wide']);
	assert.deepEqual(classList(elementChildren(div())[0]), []);
});

test('attributes maps bare attributes to the empty string', () => {
	const a = attributes(div());
	assert.equal(a.get('data-gap'), 'l');
	assert.equal(a.get('data-wrap'), '');
	assert.equal(a.has('data-nope'), false);
});

test('matchesSimple handles *, tag, .class, tag.class, and multiple classes', () => {
	const [p1, p2, span] = elementChildren(div());
	assert.equal(matchesSimple(p1, '*'), true);
	assert.equal(matchesSimple(p1, 'p'), true);
	assert.equal(matchesSimple(p1, 'span'), false);
	assert.equal(matchesSimple(p2, '.last'), true);
	assert.equal(matchesSimple(p2, 'p.last'), true);
	assert.equal(matchesSimple(p1, 'p.last'), false);
	assert.equal(matchesSimple(elementChildren(span)[0], '.last.deep'), true);
});

test('countMatches with > counts direct children only', () => {
	assert.equal(countMatches(div(), '> *'), 3);
	assert.equal(countMatches(div(), '> p'), 2);
	assert.equal(countMatches(div(), '> .last'), 1);
	assert.equal(countMatches(div(), '> span'), 1);
	assert.equal(countMatches(div(), '> h1'), 0);
});

test('countMatches without > counts all descendants', () => {
	assert.equal(countMatches(div(), 'p'), 3);
	assert.equal(countMatches(div(), '.last'), 2);
	assert.equal(countMatches(div(), 'p.deep'), 1);
});

test('matchesSimple handles attribute selectors', () => {
	const frag = parseHtml('<div><p data-center>a</p><p class="x" data-split>b</p><span>c</span></div>');
	const [p1, p2, span] = elementChildren(frag.childNodes[0]);
	assert.equal(matchesSimple(p1, '[data-center]'), true);
	assert.equal(matchesSimple(p2, '[data-center]'), false);
	assert.equal(matchesSimple(p2, 'p[data-split]'), true);
	assert.equal(matchesSimple(p2, '.x[data-split]'), true);
	assert.equal(matchesSimple(span, 'span[data-split]'), false);
	assert.equal(countMatches(frag.childNodes[0], '> [data-center]'), 1);
});

test('matchesSimple handles valued and *-prefixed attribute selectors', () => {
	const frag = parseHtml('<div><p data-center>a</p><p class="x" data-split>b</p><span>c</span></div>');
	const [, p2] = elementChildren(frag.childNodes[0]);
	assert.equal(matchesSimple(p2, '[data-split=""]'), true);
	assert.equal(matchesSimple(p2, '[data-split="x"]'), false);
	assert.equal(matchesSimple(p2, '*[data-split]'), true);
});
