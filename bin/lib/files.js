import fs from 'node:fs';
import path from 'node:path';

/** Every file under dir, recursively, as absolute paths in sorted order. */
export function walkFiles(dir) {
	const out = [];
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) out.push(...walkFiles(full));
		else out.push(full);
	}
	return out.sort();
}
