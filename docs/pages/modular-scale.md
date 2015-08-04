---
title: Modular Scale
description: Our responsive modular scale library makes it easy to define type sizes on a modular scale, and have your typography change at different breakpoints.
sass:
  - scss/typography/_modular-scale.scss
---

## What is a Modular Scale?

A modular scale is a set of numbers which relate to each other by a common ratio. For example, the six heading sizes in Foundation are sized using a scale with a 1.25:1 ratio.

```html
<h6>Heading 6</h6> <!-- 1.00rem (default) -->
<h5>Heading 5</h5> <!-- 1.00rem * 1.25 = ~1.25rem -->
<h4>Heading 4</h4> <!-- 1.25rem * 1.25 = ~1.56rem -->
<h3>Heading 3</h3> <!-- 1.56rem * 1.25 = ~2.00rem -->
<h2>Heading 2</h2> <!-- 1.95rem * 1.25 = ~2.45rem -->
<h1>Heading 1</h1> <!-- 2.45rem * 1.25 = ~3.00rem -->
```

The scales change at each breakpoint. On smaller screens, the scale is more compressed, resulting in smaller typography. On larger screens, the scale is wider, which spaces out the font sizes of each heading more.

These are the default scales for each breakpoint:

```scss
$ms-intervals: (
  default: 1.067,
  medium: 1.125,
  large: 1.25,
) !default;
```

### Learn More

Tim Brown's article on A List Apart, ["More Meaningful Typography"](http://alistapart.com/article/more-meaningful-typography), is a great introduction to the concept of modular scales. The webite [modularscale.com](http://www.modularscale.com/) allows you to play around with different base values and ratios, and see a live preview of the typographic scale.

---

## Using in Foundation

If you're interested in sizing type using the same modular scale, our `font-size()` mixin will help you out. Just include `font-size($n)` on any element, where `$n` is the position on the scale. 1 is the base of the scale. Numbers lower than 0 will move down the scale (below 1 rem), while numbers higher than 1 will move up the scale (above 1 rem).

```scss
.heading {
  // One step up on the scale
  @include font-size(2);
}
```

This creates one `font-size` declaration for each breakpoint.

```scss
.heading {
  font-size: 1.067rem;

  @media screen and (min-width: 40em) {
    font-size: 1.125rem;
  }

  @media screen and (min-width: 64em) {
    font-size: 1.25rem;
  }
}
```

The `font-size()` mixin uses a `modular-scale()` function to calculate the scales at each breakpoint. You can use this function directly if you'd like.

```scss
.heading {
  font-size: modular-scale($n: 2, $ratio: 1.25);
}
```
