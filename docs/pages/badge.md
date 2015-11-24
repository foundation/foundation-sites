---
title: Badge
description: The badge is a basic component that displays a number. It's useful for calling out a number of unread items.
sass: scss/components/_badge.scss
---

## Basics

Add the `.badge` class to an element to create a badge.

```html_example
<span class="badge">1</span>
```

---

## Coloring

Badges can be colored with the same classes used for buttons and other components.

```html_example
<span class="secondary badge">2</span>
<span class="success badge">3</span>
<span class="alert badge">A</span>
<span class="warning badge">B</span>
```

---

### With Icons

An icon can be used in place of text. We're using the [Foundation icon font](http://zurb.com/playground/foundation-icon-fonts-3) here, but any icon fonts or image-based icons will work fine.

```html_example
<span class="info badge"><i class="fi-share"></i></span>
<span class="success badge"><i class="fi-check"></i></span>
<span class="warning badge"><i class="fi-wrench"></i></span>
```