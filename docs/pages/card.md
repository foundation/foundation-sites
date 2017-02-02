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

## Card columns

Cards can be organized into <a href="http://masonry.desandro.com/" target="_blank">Masonry-like</a> columns with just CSS by wrapping them in .card-columns. Cards are built with <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns/Using_multi-column_layouts" target="_blank">CSS column</a> properties instead of flexbox for easier alignment. Cards are ordered from top to bottom and left to right.

Heads up! Your mileage with card columns may vary. To prevent cards breaking across columns, we must set them to `display: inline-block` as `column-break-inside: avoid` isn’t a bulletproof solution yet.

```html_example
<div class="card-columns">
  <div class="card">
    <img src="http://placehold.it/350x250">
    <div class="card-section">
      <h4>Card title that wraps to a new line</h4>
      <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
  </div>
  <div class="card">
    <div class="card-section">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <p><small>Updated: 10 min ago</small></p>
    </div>
  </div>
  <div class="card">
    <img src="http://placehold.it/350x250">
    <div class="card-section">
      <h4>Card title</h4>
      <p>This card has supporting text below as a natural lead-in to additional content.</p>
      <p><small>Updated: 10 min ago</small></p>
    </div>
  </div>
  <div class="card text-center" style="color: #fff; background: dodgerblue;">
    <div class="card-section">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
      <p><small>Updated: 10 min ago</small></p>
    </div>
  </div>
  <div class="card text-center">
    <div class="card-section">
      <h4>Card title.</h4>
      <p>This card has supporting text below as a natural lead-in to additional content.</p>
      <p><small>Updated: 10 min ago</small></p>
    </div>
  </div>
  <div class="card">
    <img src="http://placehold.it/300x350">
  </div>
  <div class="card">
    <div class="card-section">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
      <p><small>Updated: 10 min ago</small></p>
    </div>
  </div>
  <div class="card">
    <img src="http://placehold.it/350x250">
    <div class="card-section">
      <h4>Card title</h4>
      <p>This card has supporting text below as a natural lead-in to additional content.</p>
      <p><small>Updated: 10 min ago</small></p>
    </div>
  </div>
</div>
```

Card columns can also be extended and customized with some additional code. Shown below is an extension of the `.card-columns` class using the same CSS we use—CSS columns— to generate a set of responsive tiers for changing the number of columns.

```scss
.card-columns {
  @include breakpoint(large) {
    column-count: 4;
  }
  @include breakpoint(xlarge) {
    column-count: 5;
  }
}
```
