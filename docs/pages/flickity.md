---
title: Flickity
description: Alternative carousel to Foundation's Orbit
sass: scss/components/_flickity.scss
js: js/foundation.flickity.js
tbg: true
tags:
  - slider
  - carousel
  - tbg
---

## Basics

This plugin requires the [Flickity](http://flickity.metafizzy.co) plugin, created and maintained by [MetaFizzy](http://metafizzy.co).

Flickity options can be set by setting the `data-flickity` as a valid [JSON object of values](http://flickity.metafizzy.co/#initialize-with-html), or setting each option as a data attribute with the relevant value per the convention found in other Foundation plugins.

Please refer to the Flickity docs for the complete [list of options](http://flickity.metafizzy.co/options.html).

Just like Orbit, Flickity affords a great deal of leeway as far as the contents of each slide is concerned. We use the `aria-label` attribute to label what the carousel is, for assistive technology.

```html_example
<div class="flickity" role="region" aria-label="Favorite Space Pictures" data-flickity-carousel data-prev-next-buttons="true" data-page-dots="true">
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/01.jpg" alt="Space">
    <figcaption class="flickity-caption">Space, the final frontier.</figcaption>
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/02.jpg" alt="Space">
    <figcaption class="flickity-caption">Lets Rocket!</figcaption>
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/03.jpg" alt="Space">
    <figcaption class="flickity-caption">Encapsulating</figcaption>
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/04.jpg" alt="Space">
    <figcaption class="flickity-caption">Outta This World</figcaption>
  </div>
</div>
```

---

### Horizontal scrolling with mouse wheel support

For desktop users, using the trackpad or mouse wheel to navigate carousels can be convenient. To enable support for this, set the value of the `data-horizontal-scrolling` attribute to "true"

Requires the **jquery-mousewheel** plugin.

```html_example
<div class="flickity" role="region" aria-label="Favorite Space Pictures" data-flickity-carousel data-horizontal-scrolling="true">
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/04.jpg" alt="Space">
    <figcaption class="flickity-caption">Space, the final frontier.</figcaption>
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/03.jpg" alt="Space">
    <figcaption class="flickity-caption">Lets Rocket!</figcaption>
  </div>
</div>
```

---

### Disable or enable Flickity at a media query breakpoint

To _disable_ Flickity when the window expands to a certain media query, use the `data-disable-breakpoint` attribute with the breakpoint name as the value.

To _enable_ Flickity when the window expands to a certain media query, use the `data-enable-breakpoint` attribute with the breakpoint name as the value.

Be careful when using both options simultaneously! You probably don't have to.

You can read more about how Foundation works with media queries [here](/media-queries.html).

```html_example
<div class="flickity" role="region" aria-label="Favorite Space Pictures" data-flickity-carousel data-prev-next-buttons="true" data-disable-breakpoint="medium">
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/02.jpg" alt="Space">
    <figcaption class="flickity-caption">Space, the final frontier.</figcaption>
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/01.jpg" alt="Space">
    <figcaption class="flickity-caption">Lets Rocket!</figcaption>
  </div>
</div>
```
