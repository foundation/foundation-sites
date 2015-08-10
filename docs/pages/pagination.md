---
title: Pagination
description: Pagination is a type of navigation that lets users click through pages of search results, products, or other related items.
sass: scss/components/_pagination.scss
---

## Basics

A pagination list is just a `<ul>` with the class `.pagination`, and a series of `<li>`/`<a>` pairs. Add the class `.current` to an `<li>` to mark the current page, or `.disabled` to add disabled styles to a link.

```html_example
<ul class="pagination" role="navigation" aria-label="Pagination">
  <li class="disabled"><a href="#" aria-label="Previous page">Previous</a></li>
  <li class="current"><a href="#" aria-label="Page 1, current page">1</a></li>
  <li><a href="#" aria-label="Page 2">2</a></li>
  <li><a href="#" aria-label="Page 3">3</a></li>
  <li><a href="#" aria-label="Page 4">4</a></li>
  <li class="disabled ellipsis"></li>
  <li><a href="#" aria-label="Page 12">12</a></li>
  <li><a href="#" aria-label="Page 13">13</a></li>
  <li><a href="#" aria-label="Next page">Next</a></li>
</ul>
```

---

## Centered

The items in a pagination list are `display: inline-block`, which makes centering them easy. Use our built-in `.text-center` class, or add `text-align: center` in your CSS.

```html_example
<ul class="pagination text-center" role="navigation" aria-label="Pagination">
  <li class="disabled"><a href="#" aria-label="Previous page">Previous</a></li>
  <li class="current"><a href="#" aria-label="Page 1, current page">1</a></li>
  <li><a href="#" aria-label="Page 2">2</a></li>
  <li><a href="#" aria-label="Page 3">3</a></li>
  <li><a href="#" aria-label="Page 4">4</a></li>
  <li class="disabled ellipsis"></li>
  <li><a href="#" aria-label="Page 12">12</a></li>
  <li><a href="#" aria-label="Page 13">13</a></li>
  <li><a href="#" aria-label="Next page">Next</a></li>
</ul>
```
