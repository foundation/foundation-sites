---
title: Reveal
description: Modal dialogs, or pop-up windows, are handy for prototyping and production. Foundation includes Reveal our jQuery modal plugin, to make this easy for you.
sass: scss/components/_reveal.scss
js: js/foundation.reveal.js
tags:
  - modal
---

<!-- <div class="reveal-overlay" style="display: block;">
  <div class="reveal" style="display: block;">
    <h1>Test Modal</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit consequuntur, soluta dolorum eos cum beatae velit et praesentium, quidem laborum distinctio earum ipsa nesciunt fugiat. Commodi, obcaecati vitae ipsum error.</p>
  </div>
</div> -->

## Basics

A modal is just an empty container, so you can put any kind of content inside it, from text to forms to a whole grid.

```html_example
<p><a data-toggle="exampleModal1">Click me for a modal</a></p>

<div class="reveal" id="exampleModal1" data-reveal data-close-on-click='false' data-close-on-esc='true', data-animation-in-delay='777'data-multi-opened='true' data-overlay='false'>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
</div>
```

---

## Sizing

On small screens, a modal is always 100% of the width of the screen. On medium-sized screens and larger, the width changes to 80%. This width can be overridden by adding a sizing class.

#### Tiny
```html_example
<p><a data-toggle="exampleModal2" aria-controls='exampleModal2'>Click me for a tiny modal</a></p>

<div class="tiny reveal" id="exampleModal2" data-reveal>
  <p>OH I'M SO TIIINY</p>
</div>
```
#### Small
```html_example
<p><a data-toggle="exampleModal21">Click me for a small modal</a></p>

<div class="small reveal" id="exampleModal21" data-reveal>
  <p>I may be small, but I've got a big heart!</p>
</div>
```
#### Large
```html_example
<p><a data-toggle="exampleModal22">Click me for a large modal</a></p>

<div class="large reveal" id="exampleModal22" data-reveal>
  <p>I'm big, like bear!</p>
</div>
```
These sizing classes are built-in:
- `.tiny`: 30% wide
- `.small`: 40% wide
- `.medium`: 60% wide
- `.large`: 80% wide - *default*, if no class is selected, this is the size that gets applied.
- `.xlarge`: 90% wide
- `.full`: 100% width *and* height, defaults the <code>escClose</code> option to true, as well as creates a close button.

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
<p><a data-open="exampleModal4">Click me for an overlay-lacking modal</a></p>

<div class="reveal" id="exampleModal4" data-reveal data-overlay="false">
  <p>I feel so free!</p>
</div>
```

---

## Animations

To use animations from the Motion UI library, include the <code>data-toggler-animate</code> attribute.
## Accessibility

Mostly handled by Foundation JS now...
