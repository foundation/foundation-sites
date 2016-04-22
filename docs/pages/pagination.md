---
title: Pagination
description: Pagination is a type of navigation that lets users click through pages of search results, products, or other related items.
sass: scss/components/_pagination.scss
---

## Basics

A pagination list is just a `<ul>` with the class `.pagination`, and a series of `<li>`/`<a>` pairs. Add the class `.current` to an `<li>` to mark the current page, or `.disabled` to add disabled styles to a link.

Note that the container has the attributes `role="navigation"` and `aria-label="Pagination"`. These explain the purpose of the component to assistive technologies.

Extra screen reader-only text should also be added to a pagination element. In the below example, users reading the page will just see "Next" and "Previous", but screen readers will read it as "Next page" and "Previous page". Additionally, the text for the current page will read as "You're on page one".

```html_example
<ul class="pagination" role="navigation" aria-label="Pagination">
  <li class="pagination-previous disabled">Previous <span class="show-for-sr">page</span></li>
  <li class="current"><span class="show-for-sr">You're on page</span> 1</li>
  <li><a href="#" aria-label="Page 2">2</a></li>
  <li><a href="#" aria-label="Page 3">3</a></li>
  <li><a href="#" aria-label="Page 4">4</a></li>
  <li class="ellipsis" aria-hidden="true"></li>
  <li><a href="#" aria-label="Page 12">12</a></li>
  <li><a href="#" aria-label="Page 13">13</a></li>
  <li class="pagination-next"><a href="#" aria-label="Next page">Next <span class="show-for-sr">page</span></a></li>
</ul>
```

---

## Centered

The items in a pagination list are `display: inline-block`, which makes centering them easy. Use our built-in `.text-center` class, or add `text-align: center` in your CSS.

```html_example
<ul class="pagination text-center" role="navigation" aria-label="Pagination">
  <li class="pagination-previous disabled">Previous</li>
  <li class="current"><span class="show-for-sr">You're on page</span> 1</li>
  <li><a href="#" aria-label="Page 2">2</a></li>
  <li><a href="#" aria-label="Page 3">3</a></li>
  <li><a href="#" aria-label="Page 4">4</a></li>
  <li class="ellipsis"></li>
  <li><a href="#" aria-label="Page 12">12</a></li>
  <li><a href="#" aria-label="Page 13">13</a></li>
  <li class="pagination-next"><a href="#" aria-label="Next page">Next</a></li>
</ul>
```
