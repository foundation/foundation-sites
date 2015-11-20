---
title: Reveal
description: Modal dialogs, or pop-up windows, are handy for prototyping and production. Foundation includes Reveal, our jQuery modal plugin, to make this easy for you.
sass: scss/components/_reveal.scss
js: js/foundation.reveal.js
mui: true
tags:
  - modal
---


## Basics

A modal is just an empty container, so you can put any kind of content inside it, from text to forms to a whole grid.

<div class="callout primary">
  <p>Please note that we removed the option for AJAX loaded modals in Foundation 6. We did make it very easy to implement on your own though, check out a sample in the <span><a href="#advanced">Advanced</a></span> section.</p>
</div>

```html_example
<p><a data-open="exampleModal1">Click me for a modal</a></p>

<div class="reveal" id="exampleModal1" data-reveal>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```

---

## Modals in Modals!

A modal is just an empty container, until you put another modal in it, then the party starts

```html_example
<p><a data-toggle="exampleModal11">Click me for a modal</a></p>

<div class="reveal" id="exampleModal11" data-reveal>
  <h1>Awesome!</h1>
  <p class="lead">I have another modal inside of me!</p>
  <a class='button' data-toggle='exampleModal111'>Click me for another modal!</a>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class='reveal' id='exampleModal111' data-reveal>
  <h2>ANOTHER MODAL!!!</h2>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```

---

## Video

Yep, video too

```html_example
<p><a data-toggle="exampleModal12">Click me for a modal</a></p>

<div class="reveal" id="exampleModal12" data-reveal data-reset-on-close='true'>
  <h2 id="videoModalTitle">This modal has video</h2>
  <div class="flex-video widescreen vimeo">
    <iframe width="1280" height="720" src="//www.youtube-nocookie.com/embed/wnXCopXXblE?rel=0" frameborder="0" allowfullscreen></iframe>
  </div>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
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
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```
#### Small
```html_example
<p><a data-toggle="exampleModal21">Click me for a small modal</a></p>

<div class="small reveal" id="exampleModal21" data-reveal>
  <p>I may be small, but I've got a big heart!</p>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```
#### Large
```html_example
<p><a data-toggle="exampleModal22">Click me for a large modal</a></p>

<div class="large reveal" id="exampleModal22" data-reveal>
  <p>I'm big, like bear!</p>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```
These sizing classes are built-in, but currently inaccurate. They need to be standardized.:
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
<p><a data-toggle="exampleModal3">Click me for a full-screen modal</a></p>

<div class="full reveal" id="exampleModal3" data-reveal>
  <p>OH I'M SO FUUUUL</p>
  <img src="http://placekitten.com/1920/1280" alt="Intropsective Cage">
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```

---

## No Overlay

To remove the overlay, add the attribute `data-overlay="false"` to the modal.

```html_example
<p><a data-toggle="exampleModal4">Click me for an overlay-lacking modal</a></p>

<div class="reveal" id="exampleModal4" data-reveal data-overlay="false">
  <p>I feel so free!</p>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```

---

## Animations

To use animations from the Motion UI library, include the <code>data-animation-in="someAnimationIn"</code> and <code>data-animation-out="someAnimationOut"</code> attributes.

```html_example
<p><a data-toggle="animatedModal1">Click me for a modal</a></p>

<div class="reveal" id="animatedModal1" data-reveal data-close-on-click='true' data-animation-in='spin-in' data-animation-out='spin-out'>
  <h1>Whoa, I'm dizzy!</h1>
  <p class='lead'>There are many options for animating modals, check out the Motion UI library to see them all</p>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```

## Advanced

To use AJAX to load your modal content, use the code snippet below.

```js
var $modal = $('#modal');

$.ajax({'/url'})
  .done(function(resp){
    $modal.html(resp.html).foundation('open');
});
```
## Accessibility

Mostly handled by Foundation JS now...
