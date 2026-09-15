// Node side: WCAG 2 contrast from sRGB triples. Page side: a helper that
// paints any CSS color onto a canvas so the engine does the color-space
// conversion and gamut mapping, and returns the sRGB quadruple (alpha
// included, since a transparent fill is itself a colour the engine can
// resolve, in whatever syntax the author wrote it in).

function channel(c) {
	c /= 255;
	return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function luminance([r, g, b]) {
	return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrast(a, b) {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
}

/** Inject with page.addInitScript or page.evaluate before use. */
export const PAGE_HELPERS = `
window.__yeti = {
	rgb(color) {
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = 1;
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, 1, 1);
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 1, 1);
		const d = ctx.getImageData(0, 0, 1, 1).data;
		return [d[0], d[1], d[2], d[3]];
	},
	bg(selector) { return this.rgb(getComputedStyle(document.querySelector(selector)).backgroundColor); },
	fg(selector) { return this.rgb(getComputedStyle(document.querySelector(selector)).color); },
};
`;
