---
title: Button
description: Buttons are convenient tools when you need more traditional actions. To that end, Foundation has many easy to use button styles that you can customize or override to fit your needs.
sass: scss/components/_button.scss
tags:
  - dropdown button
---

## Basics

A basic button can be created with minimal markup. Use the `<a>` tag if the button is a link to another page, or a link to an anchor within a page. Use the `<button>` tag if the button performs an action that changes something on the current page.

```html_example
<a class="button" href="#">Button</a>
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
<br>
```

---

## Coloring

Give a button additional meaning by adding a coloring class, or `.disabled` to create a faded appearance.

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

```html_example
<button class="tiny dropdown button">Dropdown Button</button>
<button class="small dropdown button">Dropdown Button</button>
<button class="dropdown button">Dropdown Button</button>
<button class="large dropdown button">Dropdown Button</button>
<button class="expanded dropdown button">Dropdown Button</button>
```

---

## Accessibility

Make sure that the text of the button is descriptive. If for some reason, your button contains no readable text (for example, it's just an &times;), add the attribute `aria-label` to the button to clarify its purpose.

```html
<button class="button" aria-label="Close">&times;</button>
```

Use the `<button>` tag for buttons that perform an action on the current page. Don't use `<button>` for buttons that lead to another page, or another section within the current page&mdash;use `<a>` for that instead.

```html
<!-- Links -->
<a href="more.html">Learn More</a>
<a href="#features">View All Features</a>

<!-- Actions -->
<button class="success button">Save</button>
<button class="alert button">Delete</button>
```
