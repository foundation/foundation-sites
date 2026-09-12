// Front matter in the shape foundationcss.com already consumes for Proton and
// Inky: strings double-quoted (JSON quoting is valid YAML), booleans and
// numbers bare, keys in insertion order.
export function frontMatter(fields) {
	const lines = ['---'];
	for (const [key, value] of Object.entries(fields)) lines.push(`${key}: ${formatValue(value)}`);
	lines.push('---');
	return `${lines.join('\n')}\n`;
}

function formatValue(value) {
	if (typeof value === 'boolean' || typeof value === 'number') return String(value);
	return JSON.stringify(String(value));
}
