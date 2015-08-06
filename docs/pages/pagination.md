---
title: Pagination
description: Pagination is a type of navigation that lets users click through pages of search results, products, or other related items.
sass: scss/components/_pagination.scss
---

## Basics

```html_example
<nav role="navigation" aria-label="pagination">
	<ul class="pagination">
	  <li class="disabled"><a href="#" aria-label="previous">Previous</a></li>
	  <li class="current"><a href="#" aria-label="Page 1, current page">1</a></li>
	  <li><a href="#" aria-label="Page 2">2</a></li>
	  <li><a href="#" aria-label="Page 3">3</a></li>
	  <li><a href="#" aria-label="Page 4">4</a></li>
	  <li class="disabled ellipsis"></li>
	  <li><a href="#" aria-label="Page 12">12</a></li>
	  <li><a href="#" aria-label="Page 13">13</a></li>
	  <li><a href="#" aria-label="next">Next</a></li>
	</ul>
</nav>
```

---

## Centered

```html_example
<nav role="navigation" aria-label="pagination" class="pagination-centered">
	<ul class="pagination">
	  <li class="disabled"><a href="#" aria-label="previous">Previous</a></li>
	  <li class="current"><a href="#" aria-label="Page 1, current page">1</a></li>
	  <li><a href="#" aria-label="Page 2">2</a></li>
	  <li><a href="#" aria-label="Page 3">3</a></li>
	  <li><a href="#" aria-label="Page 4">4</a></li>
	  <li class="disabled ellipsis"></li>
	  <li><a href="#" aria-label="Page 12">12</a></li>
	  <li><a href="#" aria-label="Page 13">13</a></li>
	  <li><a href="#" aria-label="next">Next</a></li>
	</ul>
</nav>
```
