---
title: Callout
description: Callouts combine panels and alerts from Foundation 5 into one generic container component.
sass: scss/components/_callout.scss
tags:
  - panel
  - alert
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

## Sizing

Callouts can be sized using the `.small` and `.large` classes. These will affect the padding around content to be smaller and larger respectively.

```html_example
<div class="callout small">
  <h5>This is a secondary panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>

<div class="callout large">
  <h5>This is a secondary panel</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
  <a href="#">It's dangerous to go alone, take this.</a>
</div>
```

---

## Making Closable

Pair the callout with the [close button](close-button.html) component and `data-closable` attribute to create a dismissable alert box.

<div class="primary callout">
  <p>Any element can be used as a close trigger, not just close button. Adding the attribute <code>data-close</code> to any element within the callout will turn it into a close trigger.</p>
  <p>When using the <code>data-closable</code> attribute, you can optionally add <a href="http://foundation.zurb.com/sites/docs/motion-ui.html">Motion UI</a> classes to the attribute to change the closing animation. If no class is added, the plugin defaults to jQuery's <code>.fadeOut()</code> function.</p>
</div>

```html_example
<div class="alert callout" data-closable>
  <h5>This is Important!</h5>
  <p>But when you're done reading it, click the close button in the corner to dismiss this alert.</p>
  <p>I'm using the default <code>data-closable</code> parameters, and simply fade out.</p>
  <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="success callout" data-closable="slide-out-right">
  <h5>This a friendly message.</h5>
  <p>And when you're done with me, I close using a Motion UI animation.</p>
  <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```
