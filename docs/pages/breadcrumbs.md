---
title: Breadcrumbs
description: Breadcrumbs come in handy to show a navigation trail for users clicking through your site.
sass: scss/components/_breadcrumbs.scss
---

To make a set of breadcrumb links, just add the class `.breadcrumbs` to a `<ul>`, and then add links instead of `<li>` elements.

The current page doesn't require a link, but you should add some explanatory text for AT that indicates which item is the current page.

To mark a disabled item, add the class `.disabled` to the `<li>`, and just use plain text instead of a link.

```html_example
<nav aria-label="You are here:" role="navigation">
  <ul class="breadcrumbs">
    <li><a href="#">Home</a></li>
    <li><a href="#">Features</a></li>
    <li class="disabled">Gene Splicing</li>
    <li>
      <span class="show-for-sr">Current: </span> Cloning
    </li>
  </ul>
</nav>
```
