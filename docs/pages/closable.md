---
title: Closable

---

## Basics

Add the attribute `data-closable` to a container to make it close. On an element inside the container, use the `data-close` attribute to create the close trigger. This will cause the container to close when the element is clicked.

```html_example
<div id="motionTest" class="success callout" data-closable>
  <button class="close-button" data-close>&times;</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium sint alias dolorum qui vel quaerat, libero consequatur non esse asperiores veritatis commodi, odit eum ipsam nemo dicta iste aliquam.</p>
</div>
```

---

## Changing the Animation

You can insert a custom motion class to play as the element closes, by adding the class to the `data-closable` attribute.

```html_example
<div id="motionTest" class="success callout" data-closable="slideOutRight">
  <button class="close-button" data-close>&times;</button>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore praesentium sint alias dolorum qui vel quaerat, libero consequatur non esse asperiores veritatis commodi, odit eum ipsam nemo dicta iste aliquam.</p>
</div>
```
