---
title: Top Bar
description: The new top bar is a simpler wrapper around our flexible menu components.
sass: ./scss/components/_top-bar.scss
flex: true
---

<div class="primary callout">
  <p>The features of Foundation 5's top bar are still around, but they've been reworked into smaller, individual plugins. Check out our page on <a href="responsive-navigation.html">responsive navigation</a> to learn more.</p>
</div>

## Basics

A top bar (`.top-bar`) can have two sections: a left-hand section (`.top-bar-left`) and a right-hand section (`.top-bar-right`). On small screens, these sections stack on top of each other.

In the below example, our top bar includes a [dropdown menu](dropdown-menu.html), along with a text input field and action button. The dropdown menu inherits the background color of the top bar. If you're using the Sass version of Foundation, you can change this with the `$topbar-submenu-background` variable.

```html_example
<div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Site Title</li>
      <li>
        <a href="#">One</a>
        <ul class="menu vertical">
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

---

## Advanced Layout

You can further divide a top bar into a title area and content area. Use the `.top-bar-title` class to create a title/branding area. Next to that can be any element, which is used for the rest of the content.

```html
<div class="top-bar">
  <div class="top-bar-title"></div>
  <div>
    <div class="top-bar-left"></div>
    <div class="top-bar-right"></div>
  </div>
</div>
```

In the below example, we've combined the above pattern with the Responsive Toggler plugin, creating a responsive top bar with a toggle click trigger on mobile.

```html_example
<div class="top-bar">
  <div class="top-bar-title">
    <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
      <button class="menu-icon dark" type="button" data-toggle></button>
    </span>
    <strong>Site Title</strong>
  </div>
  <div id="responsive-menu">
    <div class="top-bar-left">
      <ul class="dropdown menu" data-dropdown-menu>
        <li>
          <a href="#">One</a>
          <ul class="menu vertical">
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
</div>
```

---

## Stacking

By default, the two sections of a top bar will stack on top of each other on small screens. This can be changed by adding the class `.stacked-for-medium` or `.stacked-for-large`.

```html
<div class="top-bar stacked-for-medium">
  <!-- ... -->
</div>
```

<div class="top-bar stacked-for-medium">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Site Title</li>
      <li>
        <a href="#">One</a>
        <ul class="menu vertical">
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

---

## Sticky Navigation

See the documentation for the [Sticky](sticky.html#sticky-navigation) plugin to see how to easily make a sticky nav bar.
