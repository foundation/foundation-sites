---
title: Dropdown Menus
description: Change a basic menu bar into an expandable dropdown menu with the Dropdown Menu plugin.
sass: scss/components/_dropdown-menu.scss
js: js/dropdownMenu.js
---


<div class="alert callout">
  <h5>Known Issues</h5>
  <ul>
    <li>Needs accessibility compliant keyboard access bindings.</li>
    <li>Destroy method needs to be more robust.</li>
    <li>Needs background color.</li>
    <li>This and other `MenuBar` variants need to listen for `Foundation.MediaQuery` change.</li>
  </ul>
</div>


## Horizontal
By default, dropdowns are exactly that, horizontally oriented below the parent element, opened by hovering, clicking, or tapping.


<ul class="dropdown menu-bar" data-dropdown-menu>
  <li class="has-submenu">
    <a>Item 1 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li class='has-submenu'>
        <a href='#'> Item 1 sub &raquo;</a>
        <ul class='submenu menu-bar' data-submenu>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu menu-bar' data-submenu>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
          <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu menu-bar' data-submenu>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>

        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 2 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 3 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
</ul>



<ul class="dropdown menu-bar align-right" data-dropdown-menu>
  <li class="has-submenu">
    <a href="#">Item 1 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li class='has-submenu'>
        <a href='#'> Item 1 sub &raquo;</a>
        <ul class='submenu menu-bar' data-submenu>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <!-- <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu right menu-bar' data-submenu>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li> -->
          <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu menu-bar' data-submenu>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>

        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <!-- <li class="has-submenu">
    <a href="#">Item 2 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 3 &raquo;</a>
    <ul class="submenu vertical menu-bar" data-submenu>
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li> -->
</ul>


---

## Vertical
Same functionality, different orientation.



<ul class="dropdown vertical menu-bar" data-dropdown-menu>
  <li class="has-submenu">
    <a href="#">Item 1 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 2 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href='#'>Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 3 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 1 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li class='has-submenu'>
        <a href='#'> Item 1 sub &raquo;</a>
        <ul class='submenu menu-bar' data-submenu>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu menu-bar' data-submenu>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
          <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu menu-bar' data-submenu>
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



<ul class="dropdown vertical align-right menu-bar" data-dropdown-menu>
  <li class="has-submenu">
    <a href="#">Item 1 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 2 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href='#'>Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 3 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 1 &raquo;</a>
    <ul class="submenu menu-bar" data-submenu>
      <li><a href="#">Item 1A Loooong</a></li>
      <li class='has-submenu'>
        <a href='#'> Item 1 sub &raquo;</a>
        <ul class='submenu menu-bar' data-submenu>
          <li><a href='#'>Item 1 subA</a></li>
          <li><a href='#'>Item 1 subB</a></li>
          <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu menu-bar' data-submenu>
              <li><a href='#'>Item 1 subA</a></li>
              <li><a href='#'>Item 1 subB</a></li>
            </ul>
          </li>
          <li class='has-submenu'>
            <a href='#'> Item 1 sub &raquo;</a>
            <ul class='submenu menu-bar' data-submenu>
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
