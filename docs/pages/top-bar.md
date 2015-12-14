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
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Site Title</li>
      <li class="has-submenu">
        <a href="#">One</a>
        <ul class="submenu menu vertical" data-submenu>
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
    <ul class="menu">
      <li><input type="search" placeholder="Search"></li>
      <li><button type="button" class="button">Search</button></li>
    </ul>
  </div>
</div>
```

<a href="http://universitylessons.createsend1.com/t/ViewEmail/y/8E283BB5CC5D2B81/3FB8633A34470DCCC45D7BC1A387288D" >Learn a Zurb University Lesson about the Topbar</a>
<a href="http://zurb.com/building-blocks/f6-top-bar">Topbar in Buildingblocks</a>
