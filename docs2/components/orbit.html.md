---
javascript: true
tags: carousel, slider
---

### Orbit

Orbit is an easy to use, powerful image slider that's responsive, allowing you to swipe on a touch-enabled device.

<ul data-orbit>
  <li><%= image_tag "http://placehold.it/1200x300&text=Slide1" %></li>
  <li><%= image_tag "http://placehold.it/1200x300&text=Slide2" %></li>
  <li><%= image_tag "http://placehold.it/1200x300&text=Slide3" %></li>
</ul>

### Build Orbit With HTML

Building Orbit is pretty simple using our HTML classes and structure; you'll just need to write the markup, find some images or text, fire up the Javascript and you'll be ready to go. On touch-enabled devices, Orbit has swipe functionality that makes it easy to switch slides. On screens without touch interfaces, you'll see bullet and arrow navigation if you have the options setup in your JS. Here's markup structure for Orbit:

```html
<ul data-orbit>
  <li>
    <img src="../img/demos/demo1.jpg" />
    <div class="orbit-caption">...</div>
  </li>
  <li>
    <img src="../img/demos/demo2.jpg" />
    <div class="orbit-caption">...</div>
  </li>
  <li>
    <img src="../img/demos/demo3.jpg" />
    <div class="orbit-caption">...</div>
  </li>
</ul>
```

### We'll Automatically Add HTML

To keep your markup really clean, we've let JS add what's needed for the navigation, bullets and other parts of the plugin. Once the page has been loaded, your markup will look different. Below is an example of the markup so you know what to target.

### Deep Linking

You can now link to slides in Orbit. This is useful when constructing custom bullets or referencing a particular slide in a description. To see it in action click on one of the links below:

```html
<ul data-orbit>
  <li data-orbit-slide="headline-1">
    <h2>Headline 1</h2>
    <h3>Subheadline</h3>
    <p>Pellentesque habitant morbi tristique senectus.</p>
  </li>
  <li data-orbit-slide="headline-2">
    <h2>Headline 2</h2>
    <h3>Subheadline</h3>
    <p>Pellentesque habitant morbi tristique senectus.</p>
  </li>
  <li data-orbit-slide="headline-3">
    <h2>Headline 3</h2>
    <h3>Subheadline</h3>
    <p>Pellentesque habitant morbi tristique senectus.</p>
  </li>
</ul>
```