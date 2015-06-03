---
title: Sass Functions
description: Behind the scenes, Foundation is powered by a set of utilty Sass functions that help us work with colors, units, selectors, and more.
sass: 
  - scss/util/*.scss
  - '!scss/util/_breakpoint.scss'
  - '!scss/util/_mixins.scss'
---

## Importing

All of Foundation's Sass utilities are in the folder `scss/util`, and broken up into multiple files by category. You can import every utility file at once using this line of code:

```scss
@import 'util/util';
```

Or, utilities can be imported individually.

```scss
// Color manipulation
@import 'util/color';

// Image generation
@import 'util/image';

// Map manipulation
@import 'util/map';

// Selector generation
@import 'util/selector';

// Unit manipulation and conversion
@import 'util/unit';

// Value checking and extraction
@import 'util/value';
```
