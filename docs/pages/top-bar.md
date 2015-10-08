---
title: Top Bar
description: The new top bar is a simpler wrapper around our flexible menu components.
sass: ./scss/components/_top-bar.scss
---

## Basics

A top bar (`.top-bar`) can have two sections: a left-hand section (`.top-bar-left`) and a right-hand section (`.top-bar-right`). On small screens, these sections stack on top of each other.

In the below example, our top bar includes a [dropdown menu](dropdown-menu.html), along with a text input field and action button.

```html_example
<div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu-bar" data-dropdown-menu>
      <li class="has-submenu">
        <a href="#">One</a>
        <ul class="submenu menu-bar vertical" data-submenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
          <li><a href="#">Three</a></li>
        </ul>
      </li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu-bar">
      <li><input type="search" placeholder="Search"></li>
      <li><button type="button" class="button">Search</button></li>
    </ul>
  </div>
</div>
```

<div class="primary top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu-bar" data-dropdown-menu>
      <li class="has-submenu">
        <a href="#">One</a>
        <ul class="submenu menu-bar vertical" data-submenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
          <li><a href="#">Three</a></li>
        </ul>
      </li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu-bar">
      <li><input type="search" placeholder="Search"></li>
      <li><button type="button" class="secondary button">Search</button></li>
    </ul>
  </div>
</div>

<div class="dark top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu-bar" data-dropdown-menu>
      <li class="has-submenu">
        <a href="#">One</a>
        <ul class="submenu menu-bar vertical" data-submenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
          <li><a href="#">Three</a></li>
        </ul>
      </li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu-bar">
      <li><input type="search" placeholder="Search"></li>
      <li><button type="button" class="hollow button">Search</button></li>
    </ul>
  </div>
</div>
