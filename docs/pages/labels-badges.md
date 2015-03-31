---
title: Label and Badge
description: Labels and badges are useful inline styles that can be dropped into body copy to call out certain sections or to attach metadata. For example, you can attach a label that notes when something was updated.
sass: 
  - scss/components/_label.scss
  - scss/components/_badge.scss
---

## Labels

```html_example
<span class="label">Default Label</span>
<span class="secondary label">Secondary Label</span>
<span class="success label">Success Label</span>
<span class="alert label">Alert Label</span>
<span class="warning label">Warning Label</span>
```

---

## Badges

```html_example
<span class="badge">1</span>
<span class="secondary badge">2</span>
<span class="success badge">3</span>
<span class="alert badge">A</span>
<span class="warning badge">B</span>
```

---

## With Icons

```html_example
<span class="alert label"><i class="fi-x-circle"></i> Alert Label</span>
<span class="warning label"><i class="fi-x"></i> Warning Label</span>
<span class="info label"><i class="fi-widget"></i> Info Label</span>
<span class="info badge"><i class="fi-share"></i></span>
<span class="success badge"><i class="fi-check"></i></span>
<span class="warning badge"><i class="fi-wrench"></i></span>
```