// A static file server for the browser tests, so stylesheets load over http
// and CSSOM is readable (file:// sheets are opaque to scripts in Chromium).
// The root serves an index of every fixture, for browsing them by hand.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT ?? 4173);
const fixturesDir = path.join(root, 'test', 'browser', 'fixtures');

/** The <title> of a fixture, or its file name. */
function titleOf(file) {
	const m = fs.readFileSync(file, 'utf8').match(/<title>([^<]*)<\/title>/);
	return m ? m[1].replace(/ fixture$/i, '') : path.basename(file, '.html');
}

/** Fixture pages grouped into sections: the top-level files, then each folder. */
function fixtureGroups() {
	const entries = fs.readdirSync(fixturesDir, { withFileTypes: true });
	const files = entries.filter((e) => e.isFile() && e.name.endsWith('.html')).map((e) => e.name).sort();
	const folders = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
	const group = (name, dir, names) => ({
		name,
		pages: names.map((n) => ({ href: `/test/browser/fixtures/${dir ? `${dir}/` : ''}${n}`, title: titleOf(path.join(fixturesDir, dir, n)) })),
	});
	return [
		group('Tokens and base', '', files),
		...folders.map((f) => group(f[0].toUpperCase() + f.slice(1), f, fs.readdirSync(path.join(fixturesDir, f)).filter((n) => n.endsWith('.html')).sort())),
	];
}

const escape = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/** An index of every fixture, laid out with Yeti itself. */
function indexPage() {
	const sections = fixtureGroups().map((g) => `
			<section class="stack" data-gap="sm">
				<h2>${escape(g.name)}</h2>
				<ul class="grid" data-min="xs" data-gap="sm" role="list">
					${g.pages.map((p) => `<li class="box" data-border data-gap="sm"><a href="${p.href}">${escape(p.title)}</a></li>`).join('\n\t\t\t\t\t')}
				</ul>
			</section>`).join('\n');
	return `<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Yeti fixtures</title>
	<link rel="stylesheet" href="/src/yeti.css">
</head>
<body>
	<main class="center" data-max="xl">
		<div class="stack" data-gap="lg">
			<h1>Yeti fixtures</h1>
			<p>Every browser-test page, served from <code>test/browser/fixtures/</code>. Resize the window to watch the layouts respond to their container.</p>
${sections}
		</div>
	</main>
</body>
</html>
`;
}
const types = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.json': 'application/json',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
};

http.createServer((req, res) => {
	try {
		const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
		if (pathname === '/' || pathname === '/index.html') {
			res.writeHead(200, { 'content-type': types['.html'] });
			res.end(indexPage());
			return;
		}
		const file = path.join(root, path.normalize(pathname));
		if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
			res.writeHead(404);
			res.end('not found');
			return;
		}
		res.writeHead(200, { 'content-type': types[path.extname(file)] ?? 'application/octet-stream' });
		fs.createReadStream(file).pipe(res);
	} catch {
		res.writeHead(400);
		res.end('bad request');
		return;
	}
}).listen(port, '127.0.0.1', () => console.log(`serving ${root} on http://localhost:${port}`));
