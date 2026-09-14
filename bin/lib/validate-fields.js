import fs from 'node:fs';
import path from 'node:path';
import { walkFiles } from './files.js';
import { parseHtml, walkElements, classList, attributes, elementChildren } from './html.js';
import { extractHtmlBlocks } from './markdown.js';

export const FIELD_MESSAGE = '.field: the label must reference the control with for, and the control must carry that id';

/** Every .field pairs its label with its control by for/id (or is a fieldset with a legend). */
export function validateFields(entries, docsDir, fixturesDir) {
	const errors = [];
	const sources = [];
	for (const entry of entries) {
		sources.push({ file: path.join(entry.dir, 'example.html'), html: fs.readFileSync(path.join(entry.dir, 'example.html'), 'utf8'), line: 0 });
		const docsFile = path.join(entry.dir, 'docs.md');
		if (fs.existsSync(docsFile)) for (const b of extractHtmlBlocks(fs.readFileSync(docsFile, 'utf8'))) sources.push({ file: docsFile, html: b.html, line: b.line - 1 });
	}
	if (fs.existsSync(docsDir)) {
		for (const file of walkFiles(docsDir).filter((f) => f.endsWith('.md'))) {
			for (const b of extractHtmlBlocks(fs.readFileSync(file, 'utf8'))) sources.push({ file, html: b.html, line: b.line - 1 });
		}
	}
	if (fixturesDir && fs.existsSync(fixturesDir)) {
		for (const file of walkFiles(fixturesDir).filter((f) => f.endsWith('.html'))) {
			sources.push({ file, html: fs.readFileSync(file, 'utf8'), line: 0 });
		}
	}
	for (const { file, html, line } of sources) {
		walkElements(parseHtml(html), (el) => {
			if (!classList(el).includes('field')) return;
			const kids = elementChildren(el);
			if (el.tagName === 'fieldset') {
				if (kids.filter((k) => k.tagName === 'legend').length !== 1) errors.push({ file, line: line + el.sourceCodeLocation.startLine, message: '.field on a fieldset needs exactly one legend' });
				return;
			}
			const label = kids.find((k) => k.tagName === 'label');
			const controls = kids.flatMap((k) => classList(k).includes('affix') ? elementChildren(k).filter((g) => ['input', 'select'].includes(g.tagName)) : (['input', 'select', 'textarea'].includes(k.tagName) ? [k] : []));
			const forId = label && attributes(label).get('for');
			const named = controls.filter((c) => attributes(c).get('id') === forId);
			if (!label || !forId || controls.length === 0 || named.length !== 1) {
				errors.push({ file, line: line + el.sourceCodeLocation.startLine, message: FIELD_MESSAGE });
			}
		});
	}
	return errors;
}
