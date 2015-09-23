---
title: Card
description: A card is a rectangular container that holds your content, making it easy to digest, and separating it from other similar content.
sass: scss/components/_card.scss
---

## Basics

A card container has no padding, allowing you to place full-bleed images inside. Use the `.card-divider` and `.card-section` classes to sub-divide a card.

```html
<div class="card">
  <img src="http://placekitten.com/g/400/200">
  <div class="card-divider">
    This is a header
  </div>
  <div class="card-section">
    <h5>Look at This Swag Card</h5>
    <p>I drink a boost for breakfast, and ensure for dessert. Somebody ordered pancakes I just sip the sizzurp</p>
  </div>
</div>
```

<div class="row">
  <div class="medium-6 large-4 columns">
    <div class="card">
      <img src="http://placekitten.com/g/300/150">
      <div class="card-divider">
        This is a header
      </div>
      <div class="card-section">
        <h5>Look at This Swag Card</h5>
        <p>I drink a boost for breakfast, and ensure for dessert. Somebody ordered pancakes I just sip the sizzurp</p>
      </div>
    </div>
  </div>
</div>

---

## Card Colors

Cards can be colored with the core coloring classes: `.secondary`, `.success`, `.warning`, and `.alert`.

```html
<div class="success card">
  <img src="http://placekitten.com/g/400/200">
  <div class="card-divider">
    This is a header
  </div>
  <div class="card-section">
    <h5>Look at This Swag Card</h5>
    <p>I drink a boost for breakfast, and ensure for dessert. Somebody ordered pancakes I just sip the sizzurp</p>
  </div>
</div>
```

<div class="row up-1 medium-up-2 large-up-4">
  <div class="column">
    <div class="secondary card">
      <img src="http://placekitten.com/g/400/200">
      <div class="card-divider">
        This is a header
      </div>
      <div class="card-section">
        <h5>Dirt</h5>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="success card">
      <img src="http://placekitten.com/g/400/200">
      <div class="card-divider">
        This is a header
      </div>
      <div class="card-section">
        <h5>Apple</h5>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="warning card">
      <img src="http://placekitten.com/g/400/200">
      <div class="card-divider">
        This is a header
      </div>
      <div class="card-section">
        <h5>Orange</h5>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="alert card">
      <img src="http://placekitten.com/g/400/200">
      <div class="card-divider">
        This is a header
      </div>
      <div class="card-section">
        <h5>Strawberry</h5>
      </div>
    </div>
  </div>
</div>
