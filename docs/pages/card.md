---
title: Card
description: Cards are a popular and flexible UI component.
sass: scss/components/_card.scss
tags:
  - card
flex: true
---

## Basics

A card is just an element with a `.card` class applied. You can put any kind of content inside.
Make sure you wrap your content in a `.card-section` element in order to achieve the traditional card look.

A card container has no padding, allowing you to place full-bleed images inside. Use the `.card-divider` and `.card-section` classes to sub-divide a card.

```html_example
<div class="card" style="width: 300px;">
  <div class="card-divider">
    This is a header
  </div>
  <img src="assets/img/generic/rectangle-1.jpg">
  <div class="card-section">
    <h4>This is a card.</h4>
    <p>It has an easy to override visual style, and is appropriately subdued.</p>
  </div>
</div>
```

---

### Card Divider

You can also include a `.card-divider` element as a title, footer or to break up content.

```html_example
<div class="card" style="width: 300px;">
  <div class="card-divider">
    <h4>I'm featured</h4>
  </div>
  <img src="assets/img/generic/rectangle-1.jpg">
  <div class="card-section">
    <p>This card makes use of the card-divider element.</p>
  </div>
</div>
```

---

### Images

Images play nicely with cards. Simply include one outside of the `.card-section` element to span nicely to the edges. Or move the image inside the `.card-section` to have padding around the image.

```html
<!-- image has no padding -->
<div class="card">
  <img src="assets/img/generic/rectangle-1.jpg">
  <div class="card-section">
    <p>This is a simple card with an image.</p>
  </div>
</div>

<!-- image has padding -->
<div class="card">
  <div class="card-section">
    <img src="assets/img/generic/rectangle-1.jpg">
  </div>
  <div class="card-section">
    <p>This is a simple card with an image inside a `.card-section`.</p>
  </div>
</div>
```

<div class="row small-up-3">
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <p>This is a simple card with an image.</p>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <div class="card-section">
        <img src="assets/img/generic/rectangle-1.jpg">
      </div>
      <div class="card-section">
        <p>This is a simple card with an image inside a `.card-section`.</p>
      </div>
    </div>
  </div>
</div>

```html
<div class="card">
  <div class="card-section">
    <p>Images work just fine below the content too!</p>
  </div>
  <img src="assets/img/generic/rectangle-1.jpg">
</div>
```

<div class="row small-up-3">
  <div class="column">
    <div class="card">
      <div class="card-section">
        <p>Images work just fine below the content too!</p>
      </div>
      <img src="assets/img/generic/rectangle-1.jpg">
    </div>
  </div>
</div>

---

## Sizing

You can either set the width of cards with custom css or add them into the Foundation grid.

```html_example
<div class="row small-up-2 medium-up-3">
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>This is a card.</h4>
        <p>It has an easy to override visual style, and is appropriately subdued.</p>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>This is a card.</h4>
        <p>It has an easy to override visual style, and is appropriately subdued.</p>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>This is a card.</h4>
        <p>It has an easy to override visual style, and is appropriately subdued.</p>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="medium-4 columns">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>This is a card.</h4>
        <p>It has an easy to override visual style, and is appropriately subdued.</p>
      </div>
    </div>
  </div>
  <div class="medium-5 columns">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>This is a card.</h4>
        <p>It has an easy to override visual style, and is appropriately subdued.</p>
      </div>
    </div>
  </div>
  <div class="medium-3 columns">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>This is a card.</h4>
        <p>It has an easy to override visual style, and is appropriately subdued.</p>
      </div>
    </div>
  </div>
</div>
```
