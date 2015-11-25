---
title: Dropdown Menus
description: Change a basic Menu into an expandable dropdown menu with the Dropdown Menu plugin.
sass: scss/components/_dropdown-menu.scss
js: js/foundation.dropdownMenu.js
---

## Horizontal

Dropdown Menus use the standard [Menu](menu.html#nested-style) syntax. Add the attribute `data-dropdown-menu` to the root `<ul>`, and `.menu` to each nested menu.


<ul class="dropdown menu" data-dropdown-menu>
  <li>
    <a>Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li>
        <a href='#'> Item 1 sub</a>
        <ul class='menu'>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <li>
            <a href='#'> Item 1 sub</a>
            <ul class='menu'>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
          <li>
            <a href='#'> Item 1 sub</a>
            <ul class='menu'>
              <li><a href='#'>Item 1 subA</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu">
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li><a href="#">Item 3</a></li>
  <li><a href='#'>Item 4</a></li>
</ul>



<ul class="dropdown menu align-right" data-dropdown-menu>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li >
        <a href='#'> Item 1 sub</a>
        <ul class='menu'>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <li>
            <a href='#'> Item 1 sub</a>
            <ul class='menu'>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>

        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
</ul>


---

## Vertical
Same functionality, different orientation.



<ul class="dropdown vertical menu" data-dropdown-menu>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu">
      <li><a href='#'>Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 3</a>
    <ul class="menu">
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li>
        <a href='#'> Item 1 sub</a>
        <ul class='menu'>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <li>
            <a href='#'> Item 1 sub</a>
            <ul class='menu'>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
          <li>
            <a href='#'> Item 1 sub</a>
            <ul class='menu'>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>

</ul>



<ul class="dropdown vertical align-right menu" data-dropdown-menu>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 2</a>
    <ul class="menu">
      <li><a href='#'>Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 3</a>
    <ul class="menu">
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
  <li>
    <a href="#">Item 1</a>
    <ul class="menu">
      <li><a href="#">Item 1A Loooong</a></li>
      <li>
        <a href='#'> Item 1 sub</a>
        <ul class='menu'>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <li>
            <a href='#'> Item 1 sub</a>
            <ul class='menu'>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
          <li>
            <a href='#'> Item 1 sub</a>
            <ul class='menu'>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
</ul>
