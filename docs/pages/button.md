---
title: Button
description: Buttons are convenient tools when you need more traditional actions. To that end, Foundation has many easy to use button styles that you can customize or override to fit your needs.
sass: scss/components/_button.scss
tags:
  - dropdown button
---

## Basics

A basic button can be created with minimal markup. Because buttons can be used for many purposes, it's important to use the right tag.

- Use the `<a>` tag if the button is a link to another page, or a link to an anchor within a page. Generally anchors don't require JavaScript to work.
- Use the `<button>` tag if the button performs an action that changes something on the current page. `<button>` elements almost always require JavaScript to function.

<div class="primary callout">
  <p>Add the attribute <code>type="button"</code> to <code>&lt;button&gt;</code> elements, unless the button submits a form, in which case you use <code>type="submit"</code></p>
</div>

```html_example
<!-- Anchors (links) -->
<a href="about.html" class="button">Learn More</a>
<a href="#features" class="button">View All Features</a>

<!-- Buttons (actions) -->
<button type="button" class="success button">Save</button>
<button type="button" class="alert button">Delete</button>
```

---

## Sizing

Additional classes can be added to your button to change its size and shape.

```html_example
<a class="tiny button" href="#">So Tiny</a>
<a class="small button" href="#">So Small</a>
<a class="button" href="#">So Basic</a>
<a class="large button" href="#">So Large</a>
<a class="expanded button" href="#">Such Expand</a>
<a class="small expanded button" href="#">Wow, Small Expand</a>
```

---

## Coloring

Give a button additional meaning by adding a coloring class, or `.disabled` to create a faded appearance.

<div class="primary callout">
  <p>The <code>.disabled</code> class is a purely visual style, and won't actually disable a control. For <code>&lt;button&gt;</code> elements, you can add the <code>disabled</code> attribute to disable it. If you want to disable a link, you should add the `aria-disabled` attribute to mark it as disabled for assistive technology.</p>
</div>

```html_example
<a class="secondary button" href="#">Secondary Color</a>
<a class="success button" href="#">Success Color</a>
<a class="alert button" href="#">Alert Color</a>
<a class="warning button" href="#">Warning Color</a>
<a class="disabled button" href="#">Disabled Button</a>
```

---

## Hollow Style

Add the `.hollow` class to a button to give it a hollow style. Change the `$button-fill` variable in your settings file to `hollow` to make this the default style. Changing this setting will remove the `.hollow` class from your CSS.

```html_example
<button class="hollow button" href="#">Primary Color</button>
<button class="secondary hollow button" href="#">Secondary Color</button>
<button class="success hollow button" href="#">Success Color</button>
<button class="alert hollow button" href="#">Alert Color</button>
<button class="warning hollow button" href="#">Warning Color</button>
```

---

## Dropdown Arrows

Add a dropdown arrow to your button with the `.dropdown` class.

<div class="primary callout">
  <p>This doesn't add dropdown functionality automatically. To do that, you can attach our <a href="dropdown.html">Dropdown plugin</a>.</p>
</div>

```html_example
<button class="tiny dropdown button">Dropdown Button</button>
<button class="small dropdown button">Dropdown Button</button>
<button class="dropdown button">Dropdown Button</button>
<button class="large dropdown button">Dropdown Button</button>
<button class="expanded dropdown button">Dropdown Button</button>
```

---

## Accessibility

Make sure that the text of the button is descriptive. If for some reason, your button contains no readable text (for example, just a symbol or icon), add screen reader-only text to the button to clarify it's purpose. The symbol or icon should be wrapped in an element with the attribute `aria-hidden="true"`, to prevent screen readers from trying to pronounce the symbol.

Use the `.show-for-sr` class to define screen reader-only text.

```html_example
<button class="button" type="button">
  <!-- Screen readers will see "close" -->
  <span class="show-for-sr">Close</span>
  <!-- Visual users will see the X, but not the "Close" text -->
  <span aria-hidden="true"><i class="fi-x"></i></span>
</button>
```
