---
title: Callout
description: Callouts combine panels and alerts from Foundation 5 into one generic container component.
sass: scss/components/_callout.scss
---

## Basics

A callout is just an element with a `.callout` class applied. You can put any kind of content inside.

```html_example
<div class="callout">
  <h5>This is a callout.</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>
```

---

## Coloring

Callouts can be colored using the `.secondary`, `.primary`, `.success`, `.warning`, or `.alert` classes. Links inside the callout will be tinted to match the color of the callout.

```html
<div class="callout secondary">
  <h5>This is a secondary panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>
```

<div class="callout secondary">
  <h5>This is a secondary panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>

<div class="primary callout">
  <h5>This is a primary panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>

<div class="success callout">
  <h5>This is a success panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>

<div class="warning callout">
  <h5>This is a warning panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>

<div class="alert callout">
  <h5>This is an alert panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>

---

## Making Closable

Pair the callout with the [Closable plugin](closable.html) to create a dismissable alert box.

```html_example
<div class="alert callout" data-closable>
  <h5>This is Important!</h5>
  <p>But when you're done reading it, click the close button in the corner to dismiss this alert.</p>
  <button class="close-button" data-close aria-label="Dismiss alert">&times;</button>
</div>
```
