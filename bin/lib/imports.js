// @import handling for build.js. Only the plain, relative, unconditional forms
// are supported, and only where the CSS spec allows them: before any rule.
import fs from 'node:fs';
import path from 'node:path';

const IMPORT_RE = /^@import\s+(?:url\(\s*)?(["'])([^"']+)\1\s*\)?\s*([^;]*);/;

/** Replaces every comment with spaces of the same length, so offsets and line numbers are unchanged. */
export function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

function lineAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

export function splitImports(css, file) {
  const stripped = stripComments(css);
  const imports = [];
  const errors = [];
  let pos = 0;

  for (;;) {
    pos += stripped.slice(pos).match(/^\s*/)[0].length;
    const m = stripped.slice(pos).match(IMPORT_RE);
    if (!m) break;
    const line = lineAt(stripped, pos);
    const href = m[2];
    const conditions = m[3].trim();
    if (conditions) {
      errors.push({ file, line, message: `@import conditions are not supported ("${conditions}")` });
    } else if (/^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith('/') || href.startsWith('data:')) {
      errors.push({ file, line, message: `only relative @import paths are supported ("${href}")` });
    } else {
      imports.push({ href, line });
    }
    pos += m[0].length;
  }

  const rest = css.slice(pos);
  const late = stripped.slice(pos).match(/@import\b/);
  if (late) errors.push({ file, line: lineAt(stripped, pos + late.index), message: '@import must come before all rules' });

  return { imports, rest, errors };
}

export function resolveImports(entryPath) {
  const files = [];
  const errors = [];
  const stack = [];

  const visit = (abs) => {
    if (stack.includes(abs)) {
      const cycle = [...stack.slice(stack.indexOf(abs)), abs].map((f) => path.basename(f)).join(' -> ');
      errors.push({ file: abs, line: 1, message: `import cycle: ${cycle}` });
      return;
    }
    if (files.some((f) => f.path === abs)) return;

    stack.push(abs);
    const css = fs.readFileSync(abs, 'utf8');
    const { imports, rest, errors: splitErrors } = splitImports(css, abs);
    errors.push(...splitErrors);
    for (const imp of imports) {
      const target = path.resolve(path.dirname(abs), imp.href);
      if (!fs.existsSync(target)) {
        errors.push({ file: abs, line: imp.line, message: `imported file "${imp.href}" does not exist` });
        continue;
      }
      visit(target);
    }
    files.push({ path: abs, css: rest });
    stack.pop();
  };

  visit(path.resolve(entryPath));
  return { files, errors };
}
