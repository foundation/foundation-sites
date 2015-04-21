---
title: Accordion Menu
---

<style>
  .is-accordion-menu {

  }
  .is-submenu-open {

  }
</style>

<div class="vertical menu-bar" data-accordion-menu>
  <li class="has-submenu">
    <a href="#">Item 1</a>
    <ul class="menu-bar vertical nested" data-submenu>
      <li class="has-submenu">
        <a href="#">Item 1A</a>
        <ul class="menu-bar vertical nested" data-submenu>
          <li><a href="#">Item 1Ai</a></li>
          <li><a href="#">Item 1Aii</a></li>
          <li><a href="#">Item 1Aiii</a></li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
      <li><a href="#">Item 1C</a></li>
    </ul>
  </li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
</div>
