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

Instead of `data-toggler`, add the attribute `data-animate`. The value of the attribute is the *in animation* you want, followed by the *out animation*.

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

---

### Toggle on focus

The `data-toggle` attribute only toggles classes/visibility on click. You can also have the toggle fire when an element is *focused* or *unfocused* using `data-toggle-focus`.

```html_example
<input type="text" data-toggle-focus="form-callout" placeholder="Click in here to reveal extra content">

<div class="secondary callout is-hidden" id="form-callout" data-toggler="is-hidden">
  <p>This is only visible when the above field has focus.</p>
</div>
```

---

## Multiple Targets

The `data-toggle`, `data-close`, and `data-open` attributes can now target multiple elements! The syntax is simple; just pass a *space* separated list to the `data-x` attribute like so:
```html
<button class="button" data-toggle="foo bar baz">Toggle things</button>
```
Then the elements with ids of `foo`, `bar`, and `baz` will be toggled any time your button, (or any other element you choose), is clicked.

<button class="button primary" data-toggle="thumb1 thumb2 thumb3">Toggle All These</button>
<div class="row">
  <div class="small-4 columns">
    <img class="thumbnail" id="thumb1" data-toggler data-animate="hinge-in-from-top spin-out" src="assets/img/thumbnail/01.jpg" alt="Photo of Uranus.">
  </div>
  <div class="small-4 columns">
    <img class="thumbnail" id="thumb2" data-toggler data-animate="hinge-in-from-top spin-out" src="assets/img/thumbnail/02.jpg" alt="Photo of Uranus.">
  </div>
  <div class="small-4 columns">
    <img class="thumbnail" id="thumb3" data-toggler data-animate="hinge-in-from-top spin-out" src="assets/img/thumbnail/03.jpg" alt="Photo of Uranus.">
  </div>
</div>
