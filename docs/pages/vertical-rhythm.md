---
title: Vertical Rhythm
description: Mixins, helper classes and extends for consistently vertically spacing elements.
sass: scss/grid/_vertical-rhythm.scss
tbg: true
---

## Helper classes & extends

The TBG flavor of Foundation provides helper classes and extends to promote consistent vertical spacing between elements. Vertical rhythm classes all determine a "top" spacing value; "bottom" spacing is not accounted for and a pattern should be followed based on that.

These classes and extends begin with either `vertical-margin-` or `vertical-padding-` and end with the number of times the base spacing value (`1rem` by default) is multiplied, from 0 to a total number of your choosing (`12` by default).

```html_example
<div class="vertical-margin-0 text-center">
  <img src="assets/img/vertical-rhythm/jigglypuff.gif" alt="">
</div>
<div class="vertical-margin-1 text-center">
  <img src="assets/img/vertical-rhythm/jigglypuff.gif" alt="">
</div>
<div class="vertical-margin-2 text-center">
  <img src="assets/img/vertical-rhythm/jigglypuff.gif" alt="">
</div>
<div class="vertical-margin-3 text-center">
  <img src="assets/img/vertical-rhythm/jigglypuff.gif" alt="">
</div>
<div class="vertical-margin-4 text-center">
  <img src="assets/img/vertical-rhythm/jigglypuff.gif" alt="">
</div>
<div class="vertical-margin-5 text-center">
  <img src="assets/img/vertical-rhythm/jigglypuff.gif" alt="">
</div>
```
