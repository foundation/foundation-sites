/** Fenced ```html blocks out of a markdown string, each with the line it starts on. */
export function extractHtmlBlocks(markdown) {
	const blocks = [];
	const re = /```html[^\n]*\n([\s\S]*?)\n```/g;
	let m;
	while ((m = re.exec(markdown)) !== null) {
		blocks.push({ html: m[1], line: markdown.slice(0, m.index).split('\n').length + 1 });
	}
	return blocks;
}
