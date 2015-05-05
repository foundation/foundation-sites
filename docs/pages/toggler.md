---
title: Toggler
description: Toggler makes it easy to swap CSS classes on any element on click.
js: js/foundation.toggler.js
---

## Toggle a CSS class

```html_example
<p><a 
  data-toggle="menuBar"
  data-ontext="Un-expand!"
  data-offtext="Expand!">Expand!</a></p>

<ul class="menu-bar" id="menuBar" data-toggler=".expand">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

## Toggle with Animation

```html_example
<p><a data-toggle="panel">Toggle Panel</a></p>

<div class="callout" id="panel" data-toggler-animate="hingeInFromTop spinOut">
  <h4>Hello!</h4>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quas optio alias voluptas nobis iusto mollitia asperiores incidunt reprehenderit doloribus voluptatibus officiis minus, inventore, quasi nisi. Consequuntur, quidem. Sint, dicta?</p>
</div>
```
