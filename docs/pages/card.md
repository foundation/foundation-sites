---
title: Card
description: Cards are a popular and flexible UI component.
sass: scss/components/_card.scss
tags:
  - card
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

Images play nicely with cards. Simply include one outside of the `.card-section` element to span nicely to the edges.

```html_example
<div class="card" style="width: 300px;">
  <img src="assets/img/generic/rectangle-1.jpg">
  <div class="card-section">
    <p>This is a simple card with an image.</p>
  </div>
</div>
```

```html_example
<div class="card" style="width: 300px;">
  <div class="card-section">
    <p>Images work just fine below the content too!</p>
  </div>
  <img src="assets/img/generic/rectangle-1.jpg">
</div>
```

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
```

---

## Common examples

Cards are very flexible and work seamlessly with other Foundation components.
Here are some common patterns to give you some inspiration!

```html_example
<div class="row small-up-2 medium-up-3">
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>Dreams feel real</h4>
        <p>I'm going to improvise. Listen, there's something you should know about me... about inception.</p>
        <small>Last updated 1 minute ago</small>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>Menus</h4>
        <p>Cards play nicely with menus too! Give them a try.</p>
        <ul class="menu simple">
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
          <li><a href="#">Three</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <div class="card-divider">
        <p>Featured</p>
      </div>
      <div class="card-section">
        <h4>Your title here!</h4>
        <p>An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
      </div>
      <div class="card-divider">
        <small>Last updated 10 minutes ago</small>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>Buttons!</h4>
        <p>Who doesn't love a good button? Buttons work in all of their forms too.</p>
        <a class="button" href="#">I'm a button</a>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card">
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <h4>And button groups...</h4>
        <p>Button groups also work great!</p>
        <div class="button-group">
          <a class="button">One</a>
          <a class="button">Two</a>
          <a class="button">Three</a>
        </div>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="card text-center">
      <div class="card-divider">
        <p>Centered</p>
      </div>
      <img src="assets/img/generic/rectangle-1.jpg">
      <div class="card-section">
        <p>The utility classes like .text-center work great too.</p>
        <a class="button" href="#">Click me</a>
      </div>
    </div>
  </div>
</div>
```