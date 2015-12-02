---
title: Drilldown Menu
description: Drilldown is one of Foundation's three menu patterns, which converts a series of nested lists into a vertical drilldown menu.
scss: scss/components/_drilldown.scss
js: js/foundation.drilldown.js
---

## Basics

Drilldowns use the standard [Menu](menu.html#nested-style) syntax. Add the attribute `data-drilldown` to the root `<ul>`, and `.menu` to each nested menu.


<ul class="vertical menu" data-drilldown style="width: 200px" id="m1">
  <li>
    <a href="#">Item 1</a>
    <ul class="vertical menu">
      <li>
        <a href="#">Item 1A</a>
        <ul class="vertical menu">
          <li><a href="#">Item 1Aa</a></li>
          <li><a href="#">Item 1Ba</a></li>
          <li><a href="#">Item 1Ca</a></li>
          <li><a href="#">Item 1Da</a></li>
          <li><a href="#">Item 1Ea</a></li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
      <li><a href="#">Item 1C</a></li>
      <li><a href="#">Item 1D</a></li>
      <li><a href="#">Item 1E</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="vertical menu">
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
      <li><a href="#">Item 2C</a></li>
      <li><a href="#">Item 2D</a></li>
      <li><a href="#">Item 2E</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 3</a>
    <ul class="vertical menu">
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
      <li><a href="#">Item 3C</a></li>
      <li><a href="#">Item 3D</a></li>
      <li><a href="#">Item 3E</a></li>
    </ul>
  </li>
  <li><a href="#"> Item 4</a></li>
</ul>
