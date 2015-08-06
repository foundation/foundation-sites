---
title: Breadcrumbs
description: Breadcrumbs come in handy to show a navigation trail for users clicking through your site.
sass: scss/components/_breadcrumbs.scss
---

To make a set of breadcrumb links, just add the class `.breadcrumbs` to a `<ul>`, and then add links instead of `<li>` elements.

Use the class `.current` to mark the current page (usually the last one in the list), or the class `.disabled` to give a link a disabled style.

```html_example
<nav aria-label="Breadcrumbs" role="navigation">
  <ul class="breadcrumbs">
    <li><a href="#">Home</a></li>
    <li><a href="#">Features</a></li>
    <li class="disabled"><a href="#">Gene Splicing</a></li>
    <li class="current"><a href="#">Cloning</a></li>
  </ul>
</nav>
```
