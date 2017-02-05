---
title: Prototyping Utilities
description: Our prototyping utilities allow you to quickly flesh out the skeletal sketches and turn them into hi-fi wireframes.
sass:
  - scss/prototype/*.scss
---

It doesn't matter if you are a designer or a developer. Whether, you are a beginner or you have been around, you need some prototyping utilities for making hi-fi wireframes, landing pages or doing some urgent work that needs to be done quickly. Foundation provides you with a utility toolkit that you can use for your next prototyping project. Just fire it in with these simple reusable classes and you are done.

At the same time, we also understand that prototypes are not always required for your projects and there are many cases specially in bigger projects where you have time to show up your skill with both design and beautiful code and thus prototype mode is **disabled by default!**  

---

## Enabling Prototyping Mode

If you're using the CSS version of Foundation, you can generate a <a href="https://foundation.zurb.com/sites/download">custom download of Foundation</a> with prototype mode enabled. If you're using the Sass version of Foundation, you can enable prototype mode two ways:

If you use the `foundation-everything()` mixin in your main Sass file, pass in `$prototype: true` to enable the prototype mode.

```scss
@include foundation-everything($prototype: true);
```

If you included each component manually (like our starter projects do), open up your settings file (basic template: scss/_settings.scss, ZURB template: src/assets/scss/_settings.scss) and simply add

```scss
@include foundation-prototype-classes;
```
or, if you looking for specific utility instead of all, these helper classes can be included individually.

```scss
// Text utilities
@include foundation-prototype-text-utilities;
// Text transformation classes
@include foundation-prototype-text-transformation;
// Text Decoration classes
@include foundation-prototype-text-decoration;
// Font Styling
@include foundation-prototype-font-styling;
// List Style type
@include foundation-prototype-list-style-type;
// Rounded Utility
@include foundation-prototype-rounded;
// Overflow helper classes
@include foundation-prototype-overflow;
// Display classes
@include foundation-prototype-display;
// Position Helpers
@include foundation-prototype-position;
// Sizing Utilities
@include foundation-prototype-sizing;
// Spacing Utilities
@include foundation-prototype-spacing;
```

---

