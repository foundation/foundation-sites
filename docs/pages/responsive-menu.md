---
title: Responsive Menu Bar
description: Our three menu bar patterns form like Voltron into one responsive menu bar plugin, which allows you to switch between patterns at different screen sizes.
---

## Basics

The menu bar has some responsive CSS classes built in, which allow you to re-orient a menu on different screen sizes.

```html_example
<ul class="vertical medium-horizontal menu-bar">
  <li><a href="#">Item 1</a></li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
</ul>
```

---

The menu bar can be augmented with one of three different plugins&mdash;dropdown menu, drilldown menu, or accordion menu. However, these patterns tend to work best on specific screen sizes.

With our responsive menu bar plugin, you can apply a default pattern to a menu bar, and then change that pattern on other screen sizes.

For example, a drilldown menu works well on mobile, but on larger screens, you may want to convert that same menu into a dropdown. Here's an example that does just that:

```html_example
<ul class="vertical menu-bar" data-menu-bar="drilldown medium-dropdown" style="width: 300px;">
  <li class="has-submenu">
    <a href="#">Item 1</a>
    <ul class="vertical submenu menu-bar" data-submenu id="m2">
      <li class="has-submenu">
        <a href="#">Item 1A</a>
        <ul class="vertical submenu menu-bar" data-submenu id="m3">
          <li><a href="#">Item 1A</a></li>
          <li><a href="#">Item 1B</a></li>
          <li><a href="#">Item 1C</a></li>
          <li><a href="#">Item 1D</a></li>
          <li><a href="#">Item 1E</a></li>
        </ul>
      </li>
      <li><a href="#">Item 1B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 2</a>
    <ul class="vertical submenu menu-bar" data-submenu>
      <li><a href="#">Item 2A</a></li>
      <li><a href="#">Item 2B</a></li>
    </ul>
  </li>
  <li class="has-submenu">
    <a href="#">Item 3</a>
    <ul class="vertical submenu menu-bar" data-submenu>
      <li><a href="#">Item 3A</a></li>
      <li><a href="#">Item 3B</a></li>
    </ul>
  </li>
</ul>
```

---

## Tab Bar

In Foundation 5, the top bar combined this menu toggling concept into one plugin. We now have a separate, optional component you can use in tandem with the responsive plugin. It's called the tab bar, and it allows you to quickly setup a menu toggle on mobile. The tab bar hides itself on larger screens.

To set it up, first give your menu a unique ID. (You don't even need to use menu bar! Any element will work.) Next, add a tab bar with the class `.tab-bar` and the attribute `data-tab-bar`. The value of `data-tab-bar` should be the ID of the menu you're toggling.

By default, the tab bar will be visible on small screens, and the menu bar hides. At the medium breakpoint, the tab bar disappears, and the menu is always visible. This breakpoint can be changed with the `data-hidefor` attribute in HTML, or the `hideFor` setting in JavaScript.

```html_example
<div class="tab-bar" data-tab-bar="example-menu" data-hidefor="medium">
  <button class="menu-icon" type="button" data-toggle></button>
  <div class="tab-bar-title">Menu</div>
</div>

<div class="clearfix menu-group" id="example-menu">
  <div class="float-left">
    <ul class="vertical medium-horizontal menu-bar">
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
      <li><a href="#">Item 3</a></li>
      <li><a href="#">Item 4</a></li>
      <li><a href="#">Item 5</a></li>
    </ul>
  </div>
  <div class="float-right">
    <div class="input-group">
      <input class="input-group-field" type="url">
      <a class="input-group-button button">Search</a>
    </div>
  </div>
</div>
```
