---
title: Label
description: Labels are useful inline styles that can be dropped into body copy to call out certain sections or to attach metadata. For example, you can attach a label that notes when something was updated.
sass: scss/components/_label.scss
---

## Basics

Add the `.label` class to an element to create a label.

```html_example
<span class="label">Default Label</span>
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
