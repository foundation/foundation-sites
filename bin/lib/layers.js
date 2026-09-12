// The one definition of Yeti's cascade layer order. validate.js checks
// src/layers.css against it and the browser smoke test asserts it in CSSOM.
export const LAYER_NAMES = [
  'yeti.reset',
  'yeti.base',
  'yeti.layouts',
  'yeti.components',
  'yeti.utilities',
];

export const LAYER_STATEMENT = `@layer ${LAYER_NAMES.join(', ')};`;
