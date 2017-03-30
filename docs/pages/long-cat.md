---
title: Long Cat
description: Show long content one or a few items at a time
js: js/foundation.longCat.js
tbg: true
tags:
  - tbg
---

## Setup

Sometimes a list or other kinds of content runs too long on the page, and that&rsquo;s where Long Cat comes in: give the too-long element an attribute of `data-long-cat-hidden` and wrap it around an element with the attribute `data-long-cat`.

Within the `data-long-cat` wrapper, add an empty element with the attribute `data-long-cat-visible` where the content will be revealed 10 items at a time (or a customized amount using the `data-count` attribute).

You can also specify the initial number of visible items with the `data-initial-count` attribute if it should differ from the default or `data-count`-specified number. None of the items will be visible initially if the value of `data-initial-count` is "0."

Finally, clicking an element with the `data-long-cat-trigger` attribute will reveal the content one after the other.

```html_example
<div data-long-cat data-count="1">
  <ol data-long-cat-visible></ol>

  <ol data-long-cat-hidden>
    <li><img src="assets/img/long-cat/1.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/2.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/3.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/4.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/5.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/6.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/7.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/8.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/9.jpg" alt=""></li>
    <li><img src="assets/img/long-cat/10.jpg" alt=""></li>
  </ol>

  <button class="button" data-long-cat-trigger>Longer</button>
</div>
```
