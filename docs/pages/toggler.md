---
title: Toggler
description: Toggler makes it easy to toggle CSS or animate any element with a click.
js: js/foundation.toggler.js
mui: true
---

## Toggle a CSS class

To setup a class toggle, start by adding the attribute `data-toggler` to an element. The value of `data-toggler` is the class you want to toggle. Also give the element a unique ID so it can be targeted.

```html
<ul class="menu" id="menuBar" data-toggler=".expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

Then, add `data-toggle` to any element, with the ID of the target as the value of the attribute. Now, any time you click on this element, the class will toggle on and off on the target.

```html
<p><a data-toggle="menuBar">Expand!</a></p>
```

<p><a data-toggle="menuBar">Expand!</a></p>

<ul class="menu" id="menuBar" data-toggler=".expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>

---

## Toggle with Animation

Instead of toggling a class, you can also toggle visibility. When toggled, the element comes into or out of view using a Motion UI class.

Instead of `data-toggler`, add the attribute `data-toggler-animate`. The value of the attribute is the *in animation* you want, followed by the *out animation*.

```html_example
<p><a data-toggle="panel">Toggle Panel</a></p>

<div class="callout" id="panel" data-toggler data-animate="hinge-in-from-top spin-out">
  <h4>Hello!</h4>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quas optio alias voluptas nobis iusto mollitia asperiores incidunt reprehenderit doloribus voluptatibus officiis minus, inventore, quasi nisi. Consequuntur, quidem. Sint, dicta?</p>
</div>
```

---

## Mark as Closable

To create an element that can be closed once, add the attribute `data-closable`. Then add a click trigger inside the element using `data-close`.

```html_example
<div class="callout" data-closable>
  <button class="close-button" data-close>&times;</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium sint alias dolorum qui vel quaerat, libero consequatur non esse asperiores veritatis commodi, odit eum ipsam nemo dicta iste aliquam.</p>
</div>
```

---

### With Alternate Animation

`data-closable` can be configured with a custom exit animation.

```html_example
<div class="callout" data-closable="slide-out-right">
  <button class="close-button" data-close>&times;</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium sint alias dolorum qui vel quaerat, libero consequatur non esse asperiores veritatis commodi, odit eum ipsam nemo dicta iste aliquam.</p>
</div>
```
