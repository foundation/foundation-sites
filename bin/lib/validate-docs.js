import fs from 'node:fs';
import path from 'node:path';
import { parseHtml, walkElements, classList } from './html.js';
import { extractHtmlBlocks } from './markdown.js';

export const BUILT_FROM_MESSAGE = 'recipes must show the same result built from primitives under a "## Built from primitives" heading with a fenced html block';

/** The text of one `## Heading` section, up to the next `## `. Empty string when absent. */
export function markdownSection(markdown, heading) {
	const re = new RegExp(`^## ${heading}\\s*$`, 'm');
	const m = re.exec(markdown);
	if (!m) return { text: '', offset: 0 };
	const start = m.index + m[0].length;
	const next = /^## /m.exec(markdown.slice(start));
	return { text: markdown.slice(start, next ? start + next.index : undefined), offset: start };
}

const ACCESSIBILITY_MESSAGE = 'components must document accessibility under a "## Accessibility" heading';

/** Every layout, recipe, and component ships a docs.md; layouts and recipes explain their
 *  name, recipes also show the composed form, and components document accessibility. */
export function validateDocsFragments(entries) {
	const errors = [];
	for (const entry of entries.filter((e) => e.kind !== 'utility')) {
		const file = path.join(entry.dir, 'docs.md');
		if (!fs.existsSync(file)) {
			errors.push({ file: entry.dir, message: entry.kind === 'component' ? `${entry.kind}s must have a docs.md with a "## Accessibility" heading` : `${entry.kind}s must have a docs.md with a "## Why this name" heading` });
			continue;
		}
		const markdown = fs.readFileSync(file, 'utf8');
		if (entry.kind === 'recipe') {
			const section = markdownSection(markdown, 'Built from primitives');
			const blocks = extractHtmlBlocks(section.text);
			if (!blocks.length) {
				errors.push({ file, message: BUILT_FROM_MESSAGE });
			} else {
				const lineOffset = markdown.slice(0, section.offset).split('\n').length - 1;
				for (const block of blocks) {
					walkElements(parseHtml(block.html), (el) => {
						if (classList(el).includes(entry.manifest.class)) {
							errors.push({ file, line: block.line + lineOffset + (el.sourceCodeLocation ? el.sourceCodeLocation.startLine - 1 : 0), message: `the composed form must not use the recipe's own class .${entry.manifest.class}` });
						}
					});
				}
			}
		}
		if (entry.kind === 'component') {
			if (!/^## Accessibility\s*$/m.test(markdown)) errors.push({ file, message: ACCESSIBILITY_MESSAGE });
		} else if (!/^## Why this name\s*$/m.test(markdown)) {
			errors.push({ file, message: 'layouts must explain their name under a "## Why this name" heading' });
		}
	}
	return errors;
}
