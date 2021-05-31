---
title: Button Group
description: Button groups are containers for related action items. They're great when you need to display a group of actions in a bar. These build off the button styles and work perfectly with the grid.
video: PRjMAuvwX44
sass: scss/components/_button-group.scss
tags:
  - split button
flexbox: true
---

## Basics

Add the `.button-group` class to a container, and inside it place any number of buttons. The buttons are separated by a small border.

<p>
  <a class="" data-open-video="0:40"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

<div class="docs-codepen-container">
  <a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/JNvXam?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="button-group">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>
```

---

## Sizing

Button groups can be sized with the same classes as standard buttons: `.tiny`, `.small`, and `.large`.

<p>
  <a class="" data-open-video="0:40"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

<div class="docs-codepen-container">
  <a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/dWeMwL?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="small button-group">
  <a class="button">Small</a>
  <a class="button">Button</a>
  <a class="button">Group</a>
</div>
```

---

## Coloring

Buttons within a button group can be colored individually with the `.secondary`, `.success`, `.warning`, and `.alert` classes.

<p>
  <a class="" data-open-video="0:40"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

<div class="docs-codepen-container">
  <a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/KmRzEq?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="button-group">
  <a class="secondary button">View</a>
  <a class="success button">Edit</a>
  <a class="warning button">Share</a>
  <a class="alert button">Delete</a>
</div>
```

The entire group can also be colored using the same classes.

```html_example
<div class="primary button-group">
  <a class="button">Harder</a>
  <a class="button">Better</a>
  <a class="button">Faster</a>
  <a class="button">Stronger</a>
</div>
```

---

## Hollow and clear

Buttons within a button group can be given hollow and clear styles individually by adding a class `.hollow` or `.clear` respectively.

```html_example
<div class="button-group">
  <a class="secondary button hollow">View</a>
  <a class="success button hollow">Edit</a>
  <a class="warning button hollow">Share</a>
  <a class="alert button hollow">Delete</a>
</div>

<div class="button-group">
  <a class="secondary button clear">View</a>
  <a class="success button clear">Edit</a>
  <a class="warning button clear">Share</a>
  <a class="alert button clear">Delete</a>
</div>
```

The entire group can also be given hollow or clear styles using the same class.

```html_example
<div class="button-group hollow">
  <a class="secondary button">View</a>
  <a class="success button">Edit</a>
  <a class="warning button">Share</a>
  <a class="alert button">Delete</a>
</div>

<div class="button-group clear">
  <a class="secondary button">View</a>
  <a class="success button">Edit</a>
  <a class="warning button">Share</a>
  <a class="alert button">Delete</a>
</div>
```

---

## No Gaps

When using a single color for the button-group, you might want to remove the `1px` spacing between the buttons. You can use `no-gaps` to just the same.

```html_example
<div class="primary button-group no-gaps">
  <a class="button">Harder</a>
  <a class="button">Better</a>
  <a class="button">Faster</a>
  <a class="button">Stronger</a>
</div>
```

You can use `no-gaps` on `hollow` styles.

```html_example
<div class="primary button-group hollow no-gaps">
  <a class="button">Harder</a>
  <a class="button">Better</a>
  <a class="button">Faster</a>
  <a class="button">Stronger</a>
</div>
```

You can use `no-gaps` with all grouped/individual styles.

```html_example
<div class="button-group no-gaps">
  <a class="secondary button">View</a>
  <a class="success button">Share</a>
  <a class="warning button hollow">Edit</a>
  <a class="alert button clear">Delete</a>
</div>
```

---

## Even-width Group

Add the `.expanded` class to the container to make a full-width button group. Each item will automatically size itself based on how many buttons there are, up to a maximum of six.

<p>
  <a class="" data-open-video="2:49"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

<div class="docs-codepen-container">
  <a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/bWMpXB?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="expanded button-group">
  <a class="button">Expanded</a>
  <a class="button">Button</a>
  <a class="button">Group</a>
</div>
```

---

## Stacking

A button group can be made vertical with the `.stacked` class. You can also use `.stacked-for-small` to only stack a button group on small screens, or `.stacked-for-medium` to only stack on small and medium screens.

<p>
  <a class="" data-open-video="5:14"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

<div class="docs-codepen-container">
  <a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/bWMemL?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="stacked-for-small button-group">
  <a class="button">How</a>
  <a class="button">Low</a>
  <a class="button">Can</a>
  <a class="button">You</a>
  <a class="button">Go</a>
</div>
```

---

## Split Buttons

To build a split button, just create a button group with two buttons.


To create a button with only an arrow, add the class `.arrow-only`. Note that the button still needs a label for screen readers, which can be embedded inside the button with a `.show-for-sr` element. In the example below, an assistive device will read the arrow button as "Show menu".

<p>
  <a class="" data-open-video="7:32"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

<div class="docs-codepen-container">
  <a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/GmdjKM?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="button-group">
  <a class="button">Primary Action</a>
  <a class="dropdown button arrow-only">
    <span class="show-for-sr">Show menu</span>
  </a>
</div>
```

---

## Flexbox Button Group

The buttons in a button group can be positioned using the [Flexbox Utility](/sites/docs/flexbox-utilities.html#vanilla-flexbox-helper-classes) classes in Foundation. You can use `.align-center`, `.align-right`, `.align-spaced`, or `.align-justify`.

```html_example
<div class="button-group align-center">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>

<div class="button-group align-right">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>

<div class="button-group align-spaced">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>

<div class="button-group align-justify">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>
```

<article class="docs-component" id="docs-flexbox-buttongroup">
<div class="button-group align-center">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>

<div class="button-group align-right">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>

<div class="button-group align-spaced">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>

<div class="button-group align-justify">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>
</article>
