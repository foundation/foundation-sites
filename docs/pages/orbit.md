---
title: Orbit
description: The slider you want, the slider you need.
sass: scss/components/_orbit.scss
js: js/foundation.orbit.js
mui: true
tags:
  - slider
  - carousel
---

## Basic Orbit Slider
<div class="callout"><p>
  The new Orbit slider was designed to be a tool for rapid prototyping. While you are welcome to use it in production, if you want something more robust, we welcome you to try [Owl Carousel](http://owlgraphic.com/owlcarousel/).
</p>
<div class="callout alert">
  <p>
    If animations are desired with the Orbit slider, such as the example below, [Motion-UI](https://github.com/zurb/motion-ui) is required. If you want a simple slide replacement, set the option `useMUI` to false for animation free slides.
  </p>
</div>
</div>

<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
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

```html_example
<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit data-use-m-u-i="false">
  <ul class="orbit-container">
    <button class="orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="is-active orbit-slide">
      <div>
        <h3 class="text-center">1: You can also throw some text in here!</h3>
        <p class="text-center">Achieve an animation-free Orbit with the data attribute data-use-m-u-i="false"</p>
        <h3 class="text-center">This Orbit slider does not use animations.</h3>
      </div>
    </li>
    <li class="orbit-slide">
      <div>
        <h3 class="text-center">2: You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slider does not use animations.</h3>
      </div>
    </li>
    <li class="orbit-slide">
      <div>
        <h3 class="text-center">3: You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slider does not use animations.</h3>
      </div>
    </li>
    <li class="orbit-slide">
      <div>
        <h3 class="text-center">4: You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slider does not use animations.</h3>
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
```

## Changing Default Animations

<p>
  This example uses Motion-UI's fade-[in/out] animations to change slides, instead of the default slide-[left/right]. This is achieved with setting the animation options with the `data-options` attribute: `data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;"`
</p>
<br>
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
