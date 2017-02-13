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

### Custom previous/next selectors

To have an element (or a comma separated list of elements) trigger the carousel to proceed to the previous slide, set the `data-previous-element` attribute to your selector of choice (for example, `.previous-link` or `.previous-link, .some-other-link`). The same goes for the `data-next-element` attribute, which will trigger the carousel to proceed to the next slide.

__Note:__ these elements do _not_ have to be within the `data-flickity-carousel` wrapper.

```html_example
<div class="flickity" role="region" aria-label="Favorite Space Pictures" data-flickity-carousel data-previous-element=".previous-link" data-next-element=".next-link, #some-button" data-wrap-around="true">
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/02.jpg" alt="Space">
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/04.jpg" alt="Space">
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/01.jpg" alt="Space">
  </div>
</div>

<p>Clicking <a class="previous-link" href="#">this</a> link will take you to the previous slide, while clicking <a class="next-link" href="#">this</a> link will take you to the next slide.</p>

<button id="some-button" class="button">Some button</button>
```

---

### Enable autoplay at a media query breakpoint

Often times carousels' contents stack at mobile window sizes, causing the height to change from slide to slide. If the carousel's `autoPlay` option is enabled, this can have the undesirable consequence of pushing all the content below the carousel up and down the page at intervals.

To prevent this, set the `data-auto-play-breakpoint` attribute to the same breakpoint name as when the carousel's contents unstack.

**Note:** there's no need to set the `data-auto-play` attribute to `true` in addition to using `data-auto-play-breakpoint`

```html_example
<div class="flickity" role="region" aria-label="Favorite Space Pictures" data-flickity-carousel data-auto-play-breakpoint="large" data-pause-auto-play-on-hover="false" data-wrap-around="true">
  <div class="flickity-slide">
    <div class="row">
      <div class="large-6 column">
        <img class="flickity-image" src="assets/img/orbit/01.jpg" alt="Space">
      </div>
      <div class="large-6 column">
        <p>Cupidatat commodo officia qui nisi culpa ullamco pariatur velit pariatur reprehenderit laboris anim mollit magna voluptate tempor consequat. Proident officia incididunt nulla occaecat sit ipsum et ex reprehenderit voluptate non duis ad adipisicing non culpa reprehenderit. Anim Lorem dolor in veniam et irure aliqua ipsum reprehenderit irure qui.</p>
      </div>
    </div>
  </div>

  <div class="flickity-slide">
    <div class="row">
      <div class="large-6 column">
        <img class="flickity-image" src="assets/img/orbit/02.jpg" alt="Space">
      </div>
      <div class="large-6 column">
        <p>Occaecat velit esse non ullamco nulla ad aute proident pariatur cillum magna. Sit esse ullamco aliqua dolor et est aliquip culpa ea eiusmod cillum cillum quis. Dolor ut tempor ut aliqua proident sit commodo in qui labore aliqua in minim. Ad elit nostrud proident aliqua amet ipsum officia consectetur qui tempor aliqua.</p>

        <p>Mollit in occaecat consequat fugiat deserunt ut et in cillum exercitation deserunt ad. Lorem dolore excepteur aliquip mollit in minim exercitation. Mollit ut laborum labore officia deserunt laboris sit velit officia et laboris est ad consectetur cillum. Ullamco consequat deserunt Lorem id ex ad eu fugiat ad esse in. Dolor minim ad do nulla fugiat laborum adipisicing dolore sit enim eu exercitation excepteur.</p>
      </div>
    </div>
  </div>

  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/03.jpg" alt="Space">
  </div>
</div>
```

---

### Disable or enable Flickity at a media query breakpoint

To _completely disable_ Flickity when the window expands to a certain media query, use the `data-disable-breakpoint` attribute with the breakpoint name as the value.

To _completely enable_ Flickity when the window expands to a certain media query, use the `data-enable-breakpoint` attribute with the breakpoint name as the value.

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

---

### Disable dragging

Set the `data-no-dragging` attribute to `true` to disable dragging. The carousel will then only proceed with its controls or with the autoplay option enabled.

```html_example
<div class="flickity" role="region" aria-label="Favorite Space Pictures" data-flickity-carousel data-no-dragging="true" data-auto-play="true" data-pause-auto-play-on-hover="false" data-wrap-around="true">
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/03.jpg" alt="Space">
    <figcaption class="flickity-caption">Space, the final frontier.</figcaption>
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/04.jpg" alt="Space">
    <figcaption class="flickity-caption">Lets Rocket!</figcaption>
  </div>
  <div class="flickity-slide">
    <img class="flickity-image" src="assets/img/orbit/02.jpg" alt="Space">
    <figcaption class="flickity-caption">Lets Rocket!</figcaption>
  </div>
</div>
```
