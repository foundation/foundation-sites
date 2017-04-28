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
<a class="button tiny" href="#">So Tiny</a>
<a class="button small" href="#">So Small</a>
<a class="button" href="#">So Basic</a>
<a class="button large" href="#">So Large</a>
<a class="button expanded" href="#">Such Expand</a>
<a class="button small expanded" href="#">Wow, Small Expand</a>
```

---

## Coloring

Add color classes to give buttons additional meaning.

```html_example
<a class="button primary" href="#">Primary</a>
<a class="button secondary" href="#">Secondary</a>
<a class="button success" href="#">Success</a>
<a class="button alert" href="#">Alert</a>
<a class="button warning" href="#">Warning</a>
```

---

### Custom Colors

If you're using the Sass version of Foundation, you can customize the button classes by editing the `$button-palette` map in your settings file. The button palette defaults to `$foundation-palette`.

If you don't need certain colors from the default palette, simply remove them from the list.

```scss
$button-palette: map-remove($foundation-palette, (
    primary,
    secondary
)) !default;
```

Or you can add more colors to the default palette.

```scss
$button-palette: map-merge($foundation-palette, (
    purple: #bb00ff
)) !default;
```

Or you can define your own custom button palette.

```scss
$button-palette: (
    black: #000000,
    red: #ff0000,
    purple: #bb00ff
) !default;
```

---

### Text Colors

The text color for each button class is determined by either `$button-color` or `$button-color-alt`, whichever settings variable has more contrast.

<div class="primary callout">
  <p>The default settings meet WCAG 2.0 level AA contrast requirements. Be sure to [check the contrast](http://webaim.org/resources/contrastchecker/) when changing color variables. To give all buttons the same color text, set `$button-color` and `$button-color-alt` to the same value &mdash; but know that doing so may decrease accessibility.</p>
</div>

---

## Hollow Style

Add the `.hollow` class to a button to give it a hollow style. Change the `$button-fill` variable in your settings file to `hollow` to make this the default style. Changing this setting will remove the `.hollow` class from your CSS.

```html_example
<button class="hollow button" href="#">Primary</button>
<button class="hollow button secondary" href="#">Secondary</button>
<button class="hollow button success" href="#">Success</button>
<button class="hollow button alert" href="#">Alert</button>
<button class="hollow button warning" href="#">Warning</button>
<button class="hollow button" href="#" disabled>Disabled</button>
```

---

## Disabled Buttons

The `.disabled` class will give buttons a faded appearance. The class is a purely visual style, and won't actually disable a control. For `<button>` elements, you can add the `disabled` attribute to both disable and style it. If you want to disable a link, you should add the `aria-disabled` attribute to mark it as disabled for assistive technology.


```html_example
<a class="button disabled" href="#" aria-disabled>Disabled</a>
<button type="button" class="button primary" disabled>Disabled</button>
<button type="button" class="button secondary" disabled>Disabled</button>
<button type="button" class="button success" disabled>Disabled</button>
<button type="button" class="button alert" disabled>Disabled</button>
<button type="button" class="button warning" disabled>Disabled</button>
```

Alternatively, you can also use disabled hollow buttons.

```html_example
<a class="button hollow disabled" href="#" aria-disabled>Disabled</a>
<button type="button" class="button hollow primary" disabled>Disabled</button>
<button type="button" class="button hollow secondary" disabled>Disabled</button>
<button type="button" class="button hollow success" disabled>Disabled</button>
<button type="button" class="button hollow alert" disabled>Disabled</button>
<button type="button" class="button hollow warning" disabled>Disabled</button>
```

---

## Clear Style

Add the `.clear` class to a button to give it a clear style. Change the `$button-fill` variable in your settings file to `clear` to make this the default style. Changing this setting will remove the `.clear` class from your CSS.

```html_example
<a class="clear button" href="#">Primary</a>
<a class="clear button secondary" href="#">Secondary</a>
<a class="clear button success" href="#">Success</a>
<a class="clear button alert" href="#">Alert</a>
<a class="clear button warning" href="#">Warning</a>
<a class="clear button" href="#" disabled>Disabled</a>
```

<p>This is especially useful as a secondary action button. This way you get proper spacing and line-height. Example:</p>

<button class="button primary" href="#">Primary Action</button>
<button class="clear button" href="#">Secondary Action</button>


---

## Dropdown Arrows

Add a dropdown arrow to your button with the `.dropdown` class.

<div class="primary callout">
  <p>This doesn't add dropdown functionality automatically. To do that, you can attach our <a href="dropdown.html">Dropdown plugin</a>.</p>
</div>

```html_example
<button class="dropdown button tiny">Dropdown Button</button>
<button class="dropdown button small">Dropdown Button</button>
<button class="dropdown button">Dropdown Button</button>
<button class="dropdown button large">Dropdown Button</button>
<button class="dropdown button expanded">Dropdown Button</button>
```

---

## Accessibility

Make sure that the text of the button is descriptive. If for some reason, your button contains no readable text (for example, just a symbol or icon), add screen reader-only text to the button to clarify its purpose. The symbol or icon should be wrapped in an element with the attribute `aria-hidden="true"`, to prevent screen readers from trying to pronounce the symbol.

Use the `.show-for-sr` class to define screen reader-only text.

```html_example
<button class="button" type="button">
  <!-- Screen readers will see "close" -->
  <span class="show-for-sr">Close</span>
  <!-- Visual users will see the X, but not the "Close" text -->
  <span aria-hidden="true"><i class="fi-x"></i></span>
</button>
```
