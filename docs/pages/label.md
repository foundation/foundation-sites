---
title: Label
description: Labels are useful inline styles that can be dropped into body copy to call out certain sections or to attach metadata. For example, you can attach a label that notes when something was updated.
sass: scss/components/_label.scss
---

## Basics

Add the `.label` class to an element to create a label. In the below example, we're using `<span>`, but any tag will work fine.

```html_example
<span class="label">Default Label</span>
```

<br>

A label will typically be describing another element on the page. To bind the two elements together, give the label a unique ID, and reference that ID in an `aria-describedby` attribute on the main element.

```html
<p aria-describedby="emailLabel">Re: re: re: you won't believe what's in this email!</p>
<span class="label" id="emailLabel">High Priority<span>
```

If an element is described by multiple labels, place multiple IDs inside of `aria-describedby`.

```html
<p aria-describedby="emailLabel1 emailLabel2">Re: re: re: you won't believe what's in this email!</p>
<span class="label" id="emailLabel1">High Priority<span>
<span class="label" id="emailLabel2">Unread<span>
```

---

## Coloring

Add color classes to give labels additional meaning.

```html_example
<span class="label primary">Primary Label</span>
<span class="label secondary">Secondary Label</span>
<span class="label success">Success Label</span>
<span class="label alert">Alert Label</span>
<span class="label warning">Warning Label</span>
```

---

### Custom Colors

If you're using the Sass version of Foundation, you can customize the label classes by editing the `$label-palette` map in your settings file. The label palette defaults to `$foundation-palette`.

If you don't need certain colors from the default palette, simply remove them from the list.

```scss
$label-palette: map-remove($foundation-palette, (
    primary,
    secondary
)) !default;
```  

Or you can add more colors to the default palette.

```scss
$label-palette: map-merge($foundation-palette, (
    purple: #bb00ff
)) !default;
```

Or you can define your own custom label palette.

```scss
$label-palette: (
    black: #000000,
    red: #ff0000,
    purple: #bb00ff
) !default;
```

---

### Text Colors

The text color for each label class is determined by either `$label-color` or `$label-color-alt`, whichever settings variable has more contrast.

<div class="primary callout">
  <p>The default settings meet WCAG 2.0 level AA contrast requirements. Be sure to [check the contrast](http://webaim.org/resources/contrastchecker/) when changing color variables. To give all labels the same color text, set `$label-color` and `$label-color-alt` to the same value &mdash; but know that doing so may decrease accessibility.</p>
</div>

---

## Icons

An icon can be dropped into a label just fine. We're using the [Foundation icon font](http://zurb.com/playground/foundation-icon-fonts-3) here, but any icon fonts or image-based icons will work fine.

```html_example
<span class="label alert"><i class="fi-x-circle"></i> Alert Label</span>
<span class="label warning"><i class="fi-x"></i> Warning Label</span>
<span class="label info"><i class="fi-widget"></i> Info Label</span>
```
