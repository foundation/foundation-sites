---
title: Reveal
description: Modal dialogs, or pop-up windows, are handy for prototyping and production. Foundation includes Reveal our jQuery modal plugin, to make this easy for you.
sass: scss/components/_reveal.scss
---

## Basics

A modal is just an empty container, so you can put any kind of content inside it, from text to forms to a whole grid.

```html_example
<p><a data-open="exampleModal1">Click me for a modal</a></p>

<div class="reveal docs-example-modal" id="exampleModal1" data-reveal>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
</div>
```

---

## Sizing

On small screens, a modal is always 100% of the width of the screen. On medium-sized screens and larger, the width changes to 80%. This width can be overridden by adding a sizing class.

```html_example
<p><a data-open="exampleModal2">Click me for a tiny modal</a></p>

<div class="tiny reveal" id="exampleModal2" data-reveal>
  <p>OH I'M SO TIIINY</p>
</div>
```

These sizing classes are built-in:
- `.tiny`: 30% wide
- `.small`: 40% wide
- `.medium`: 60% wide
- `.large`: 30% wide
- `.xlarge`: 30% wide

---

## Full-screen

A full-screen modal is 100% of the width *and* height of the window. Add the `.full` class to make it go.

```html_example
<p><a data-open="exampleModal3">Click me for a full-screen modal</a></p>

<div class="full reveal" id="exampleModal3" data-reveal>
  <p>OH I'M SO FUUUUL</p>
</div>
```

---

## No Overlay

To remove the overlay, add the attribute `data-overlay="false"` to the modal.

```html_example
<p><a data-open="exampleModal3">Click me for an overlay-lacking modal</a></p>

<div class="reveal" id="exampleModal3" data-reveal data-overlay="false">
  <p>I feel so free!</p>
</div>
```

---

## Accessibility

