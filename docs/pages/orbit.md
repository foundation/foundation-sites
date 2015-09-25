---
title: Orbit Slider
description: The slider you want, the slider you need.
sass: scss/components/_orbit.scss
js: js/foundation.orbit.js
tags:
  - slider
  - carousel
---


<div class="alert callout">
  <h5>Known Issues</h5>
  <ul>
    <li>Not implemented yet.</li>
 </ul>
</div>


## Basic Orbit Slider

```html_example
<div class="orbit" role="region" aria-label="Favorite Nicolas Cage Pictures" data-orbit>

  <ul class="orbit-container">

    <button class="orbit-control orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-control orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>

    <li class="active">
      <img class="orbit-image" src="http://placecage.com/800/500" alt="Intropsective Cage">
      <figcaption class="orbit-caption">Woah. Nicolas Cage.</figcaption>
    </li>
    <li>
      <img class="orbit-image" src="http://placecage.com/800/500" alt="Intropsective Cage">
      <figcaption class="orbit-caption">Woah. Nicolas Cage.</figcaption>
    </li>
  </ul>

  <nav class="orbit-bullets-container">
   <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
   <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
 </nav>
</div>
```

```html_example
<div class="orbit" role="region" aria-label="Favorite Nicolas Cage Pictures" data-orbit>
  <ul class="orbit-container">
    <button class="orbit-control orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-control orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="active">
      <div>
        <h3 class="text-center">You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slide has chill</h3>
      </div>
    </li>
  </ul>
  <nav class="orbit-bullets-container">
   <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
   <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
   <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
   <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
 </nav>
</div>
```
