---
raw: true
title: "Theming"
description: "Set a few inputs and every color and size in Yeti follows: hues, chroma, base, and ratio, in light and dark."
nav_group: "Guides"
nav_order: 2
---

# Theming

Yeti is themed by setting tokens, not by editing CSS. Every public token is a custom property named `--yeti-<group>-<name>`; the full list is on the [Tokens](../tokens.md) page. Set them on `:root` in your own stylesheet, after Yeti's, and everything that reads them follows.

```html
<link rel="stylesheet" href="/css/yeti.css">
<style>
	:root {
		--yeti-hue-primary: 160;
		--yeti-ratio: 1.25;
		--yeti-font-sans: "Inter", system-ui, sans-serif;
	}
</style>
```

## Hues in, colors out

Color inputs are hues: `--yeti-hue-primary`, `-secondary`, `-success`, `-warning`, `-alert`, and `-neutral`, plus one `--yeti-chroma` for how saturated accents are. From those, Yeti derives every color role at runtime: `--yeti-color-primary`, its `-subtle`, `-soft`, `-strong`, and `-text` variants, `--yeti-on-primary` for text placed on it, and the page roles `--yeti-color-surface`, `-text`, `-border`, and their variants.

That is why hues and colors have different group names. A hue is something you set. A color is something Yeti works out, in both light and dark, from the hue.

You can still override any derived color directly. `--yeti-color-primary: #0a7;` wins over the derivation for that one role, and every role that reads it, like `--yeti-color-focus`, follows.

Two things to know about where you set tokens. Hues, chroma, and the scale inputs only take effect on `:root`, because Yeti computes every derived token there. Forcing a color scheme, and overriding a derived token such as `--yeti-color-primary`, work on any element, so to give one section a different accent, set its derived colors on that section rather than its hue.

## Reading an oklch value

Yeti writes colors as `oklch(lightness chroma hue)`.

- **Lightness** runs from 0 (black) to 1 (white) and, unlike hex or HSL, looks evenly spaced to the eye. Two colors with the same lightness feel equally bright whatever their hue.
- **Chroma** is saturation: 0 is gray, and around 0.15 is a clear but not shouting accent. Above 0.2 some hues cannot be displayed on ordinary screens and the browser pulls them back into range.
- **Hue** is an angle: 25 red, 80 amber, 145 green, 250 blue, 300 violet.

The comment beside each color token in `yeti.css` gives its hex equivalent in light mode, so you can match it against a value you already know.

## Light and dark

`:root` declares `color-scheme: light dark`, so Yeti follows the visitor's preference and every color token is written once with `light-dark()`. To force one scheme for a whole page or a single panel, set `color-scheme: light` or `color-scheme: dark` on that element; everything inside it flips.

## The scale

Type and space share one geometric scale. Two knobs cover most needs:

```css
:root {
	--yeti-base: 1.0625rem;  /* body size, every viewport */
	--yeti-ratio: 1.25;      /* each step is 1.25 times the last */
}
```

Left alone, both are fluid: the base grows from `--yeti-base-min` at `--yeti-viewport-min` to `--yeti-base-max` at `--yeti-viewport-max`, and the ratio from `--yeti-ratio-min` to `--yeti-ratio-max`, so headings open up more than body text on wide screens. Set the six `-min`, `-max`, and `-viewport-` tokens to shape that, or the two knobs above to switch it off.

Sizes are named `xs sm md lg xl 2xl 3xl`, with `md` as the base step, and the same names mean the same step for space (`--yeti-space-lg`), text (`--yeti-text-lg`), and radius (`--yeti-radius-lg`). Each space token also has a `-static` twin for the rare gap that must not scale.

## Fonts

Yeti ships no web fonts. `--yeti-font-sans` and `--yeti-font-mono` default to the system stacks; set them to yours and load the font files however you prefer.

## Make a theme

Everything above sets tokens inline, in your own `<style>` block. A theme is the same idea moved into its own file: a stylesheet of token values on `:root` and nothing else, loaded after `yeti.css` so its values win.

```html
<link rel="stylesheet" href="/css/yeti.css">
<link rel="stylesheet" href="/css/themes/soft.css">
```

A theme file has no selectors but `:root` (optionally split by `@media (prefers-color-scheme: …)` for a value that should only change in one scheme), and no properties but `--yeti-*` public tokens — the validator refuses a theme that sets a class, an element, or a token it doesn't recognise. Beyond the hues, chroma, and scale already covered above, each component publishes a few tokens of its own as its skin surface: `--yeti-button-radius`, `--yeti-card-padding`, `--yeti-badge-radius`, and the rest are listed on the [Tokens](../tokens.md) page. Setting those, rather than editing a component's CSS, is what makes a theme portable: it is data, not code, so it survives an upgrade to a newer Yeti untouched.

A small theme can change a lot. This one shifts the accent hue, opens up the corners, and turns buttons into pills:

```css
:root {
	--yeti-hue-primary: 30;
	--yeti-radius-md: 1rem;
	--yeti-radius-lg: 1.5rem;
	--yeti-button-radius: var(--yeti-radius-full);
}
```

Yeti ships two such files in `dist/themes/` as worked examples: `soft`, round and warm with pill buttons and roomy cards, and `sharp`, square and mono with thick borders. Neither needs any markup beyond ordinary Yeti classes — a theme changes what a component looks like, never what element or attribute you reach for to use it.
