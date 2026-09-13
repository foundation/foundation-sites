# Yeti

**A CSS-first, native, zero-build layout and styling framework for web designers. By [Foundation](https://foundationcss.com).**

> **Foundation for Sites 6 users:** this repository is now Yeti, the successor to Foundation for Sites. Version 6 continues on the [`v6` branch](https://github.com/foundation/yeti/tree/v6) with bug fixes, and `foundation-sites` on npm keeps publishing 6.x from it. Read the [announcement](https://github.com/foundation/yeti/issues/15554) for the full story.

## Status

Yeti is in development at `7.0.0-alpha`. Nothing here is stable yet: class names, attributes, and tokens can change between commits until the beta. Follow the announcement issue for milestones.

## What Yeti is

Yeti gives a designer the structure and the visual system to build a coherent site fast, with markup a human can read and an agent can write. It is one stylesheet:

```html
<link rel="stylesheet" href="/css/yeti.css">
```

- **CSS-first and native.** Container queries, cascade layers, native nesting, `light-dark()`, `dialog`, `popover`, and scroll-snap do the work that used to need JavaScript or a preprocessor.
- **Zero build, ever.** No Sass, no Node, no bundler required to use it. It composes into your build if you have one, but never demands it.
- **Named layouts, not utility soup.** Intent-based layout primitives and composed recipes, configured with a few data attributes.
- **One token scale.** Type and space derive from one base and one ratio at runtime. Change the ratio and the whole system recomputes.
- **Accessible by default.** Correct focus handling and ARIA on every component, checked in CI.
- **Legible to agents.** A machine-readable manifest describes every component, and the docs, type hints, and an MCP server are generated from it.

## What Yeti is not

Not a web component library. Not a utility framework. Not a build-time system. No polyfills. No full-featured slider in core. Nothing that exists only to work around CSS that no longer needs working around.

## Browser support

Yeti targets **Baseline 2025**. Anything that reached Baseline by the end of 2025 is used without guards; newer features sit behind `@supports` with a working fallback. If you need to support browsers older than that, Yeti is probably not your tool.

## Try it today

The tokens, reset, base layer, fifteen layout primitives, and three recipes are in; see the [Layouts guide](docs/guides/layouts.md). Link the unbuilt source and write plain HTML:

```html
<link rel="stylesheet" href="src/yeti.css">
```

Or run the fixtures locally:

```bash
git clone https://github.com/foundation/yeti
cd yeti
npm ci
npx playwright install
npm test
npm run fixtures          # then open http://localhost:4173/ to browse every fixture
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Questions go to [Discussions](https://github.com/foundation/yeti/discussions); bugs and proposals go to Issues using the templates.

## License

Yeti is released under the [Functional Source License 1.1, MIT future license](LICENSE) (FSL-1.1-MIT). You can use, copy, modify, and redistribute it for any purpose except offering it as a competing product; each release becomes plain MIT two years after it ships. Foundation for Sites 6 remains MIT.
