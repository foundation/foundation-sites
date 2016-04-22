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
<span class="label" id="emailLabel">High Priority<span>
<span class="label" id="emailLabe2">Unread<span>
```

---

## Coloring

Labels can be colored with the same classes used for buttons and other components.

```html_example
<span class="secondary label">Secondary Label</span>
<span class="success label">Success Label</span>
<span class="alert label">Alert Label</span>
<span class="warning label">Warning Label</span>
```

---

### With Icons

An icon can be dropped into a label just fine. We're using the [Foundation icon font](http://zurb.com/playground/foundation-icon-fonts-3) here, but any icon fonts or image-based icons will work fine.

```html_example
<span class="alert label"><i class="fi-x-circle"></i> Alert Label</span>
<span class="warning label"><i class="fi-x"></i> Warning Label</span>
<span class="info label"><i class="fi-widget"></i> Info Label</span>
```
