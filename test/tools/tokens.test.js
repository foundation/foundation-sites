import { test } from 'node:test';
import assert from 'node:assert/strict';
import { declaredTokens } from '../../bin/lib/tokens.js';

test('declaredTokens lists public declarations once, in order, ignoring internals and references', () => {
	const css = `
		/* --yeti-in-comment: 0; */
		@layer yeti.base {
			:root {
				--yeti-base-min: var(--yeti-base, 1rem);
				--_yeti-t: 0;
				--yeti-space-md: var(--_yeti-step-0);
				--yeti-base-min: 2rem;
			}
		}`;
	assert.deepEqual(declaredTokens(css), ['--yeti-base-min', '--yeti-space-md']);
});
