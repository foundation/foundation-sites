---
title: Orbit
description: An image and content carousel with animation support and many customizable options.
sass: scss/components/_orbit.scss
js: js/foundation.orbit.js
mui: true
tags:
  - slider
  - carousel
---

## Basics

Orbit doesn't automatically generate any HTML for you, giving you the flexibility to move around the various pieces of the plugin. Here's a complete example&mdash;we'll break down the individual pieces farther down.

```html_example
<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
  <ul class="orbit-container">
    <button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>
    <button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>
    <li class="is-active orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/01.jpg" alt="Space">
      <figcaption class="orbit-caption">Space, the final frontier.</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/02.jpg" alt="Space">
      <figcaption class="orbit-caption">Lets Rocket!</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/03.jpg" alt="Space">
      <figcaption class="orbit-caption">Encapsulating</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/04.jpg" alt="Space">
      <figcaption class="orbit-caption">Outta This World</figcaption>
    </li>
  </ul>
  <nav class="orbit-bullets">
    <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
    <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
    <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
    <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
  </nav>
</div>
```

---

### Wrapper

The wrapper houses the entire carousel. We use the `aria-label` attribute to label what the carousel is, for assistive technology.

```html
<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
</div>
```

### Slide Container

The slide container houses each individual slide. In our above markup example, we also placed the buttons in here, so we can anchor them to the center edge of the slide container. However, they can be moved anywhere within the `data-orbit` wrapper.

Each slide is an `<li>` with the class `.orbit-slide`. The first slide is marked with the `.is-active` class to indicate it's the default. You can place any HTML you want inside of the slide, but we have some premade styles for image-based slides with a caption.

```html
<ul class="orbit-container">
  <li class="orbit-slide is-active">
    <img class="orbit-image" src="assets/img/orbit/01.jpg" alt="Space">
    <figcaption class="orbit-caption">Space, the final frontier.</figcaption>
  </li>
  <!-- More slides... -->
</ul>
```

### Next/Previous Arrows

Orbit controls use the class `.orbit-previous` and `.orbit-next`. The below example has an important accessibility hook: since we're using ASCII arrows for the carousel controls, we add screen reader-only text (wrapped in the class `.show-for-sr`) that explain what the controls do.

```html
<button class="orbit-previous"><span class="show-for-sr">Previous Slide</span> &#9664;&#xFE0E;</button>
<button class="orbit-next"><span class="show-for-sr">Next Slide</span> &#9654;&#xFE0E;</button>
```

### Bullets

The bullets serve two purposes: they mark the current slide, and can be clicked on to navigate to another slide. Like with the controls, the bullets also have screen reader-friendly labels.

```html
<nav class="orbit-bullets">
  <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
  <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
  <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
  <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
</nav>
```

<!-- <div class="callout"><p>
  The new Orbit slider was designed to be a tool for rapid prototyping. While you are welcome to use it in production, if you want something more robust, we welcome you to try [Owl Carousel](http://owlgraphic.com/owlcarousel/).
</p>
<div class="callout alert">
  <p>
    If animations are desired with the Orbit slider, such as the example below, [Motion-UI](https://github.com/zurb/motion-ui) is required. If you want a simple slide replacement, set the option `useMUI` to false for animation free slides.
  </p>
</div>
</div> -->

---

## Slide Contents

A carousel slide can contain images or HTML&mdash;you can even mix between slides in one carousel!

```html
<li class="orbit-slide">
  <div>
    <h3 class="text-center">2: You can also throw some text in here!</h3>
    <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
    <h3 class="text-center">This Orbit slider does not use animations.</h3>
  </div>
</li>
```

<div class="orbit" role="region" aria-label="Favorite Text Ever" data-orbit>
  <ul class="orbit-container">
    <button class="orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="is-active orbit-slide">
      <div class="docs-example-orbit-slide">
        <p><strong>This is dodgerblue.</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </li>
    <li class="orbit-slide">
      <div class="docs-example-orbit-slide">
        <p><strong>This is rebeccapurple.</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </li>
    <li class="orbit-slide">
      <div class="docs-example-orbit-slide">
        <p><strong>This is darkgoldenrod.</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </li>
    <li class="orbit-slide">
      <div class="docs-example-orbit-slide">
        <p><strong>This is lightseagreen.</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </li>
  </ul>
  <nav class="orbit-bullets">
    <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
    <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
    <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
    <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
  </nav>
</div>

---

## Using Animation

Orbit uses [Motion UI](motion-ui.html) CSS classes to animate slides around.

<div class="callout warning">
  <p>Without the inclusion of the `motion-ui` [Motion UI](motion-ui.html) CSS file in your template, Orbit slider fails to work properly. </p>
</div>

There are four plugin options you can set to change the default effects:

- `data-anim-in-from-left`: transition to play when a slide comes *in from the left*.
- `data-anim-in-from-right`: transition to play when a slide comes *in from the right*.
- `data-anim-out-from-left`: transition to play when a slide comes *out from the left*.
- `data-anim-out-from-right`: transition to play when a slide comes *out from the right*.

Since those option names are pretty *long*, you can also set them all in one HTML attribute, using `data-options`:

```html
<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;">
</div>
```

<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;">
  <ul class="orbit-container">
    <button class="orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="is-active orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/01.jpg" alt="Space">
      <figcaption class="orbit-caption">Space, the final frontier.</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/02.jpg" alt="Space">
      <figcaption class="orbit-caption">Lets Rocket!</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/03.jpg" alt="Space">
      <figcaption class="orbit-caption">Encapsulating</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/04.jpg" alt="Space">
      <figcaption class="orbit-caption">Outta This World</figcaption>
    </li>
  </ul>
  <nav class="orbit-bullets">
   <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
   <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
   <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
   <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
 </nav>
</div>

---

### Disabling Animation

To disable Motion UI, set the plugin option `useMUI` to `false`. Written as an HTML attribute, that's `data-use-m-u-i="false"`.

```html
<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-use-m-u-i="false">
</div>
```

<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-use-m-u-i="false">
  <ul class="orbit-container">
    <button class="orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="is-active orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/01.jpg" alt="Space">
      <figcaption class="orbit-caption">Space, the final frontier.</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/02.jpg" alt="Space">
      <figcaption class="orbit-caption">Lets Rocket!</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/03.jpg" alt="Space">
      <figcaption class="orbit-caption">Encapsulating</figcaption>
    </li>
    <li class="orbit-slide">
      <img class="orbit-image" src="assets/img/orbit/04.jpg" alt="Space">
      <figcaption class="orbit-caption">Outta This World</figcaption>
    </li>
  </ul>
  <nav class="orbit-bullets">
   <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
   <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
   <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
   <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
 </nav>
</div>
