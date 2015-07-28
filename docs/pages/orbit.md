---
title: Orbit Slider
description: The slider you want, the slider you need.
sass: scss/components/_orbit.scss
---

## Basic Orbit Slider

```html_example
<div class="orbit" role="region" aria-label="Favorite Nicolas Cage Pictures">
  <button class="orbit-control orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
  <button class="orbit-control orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>

  <ul class="orbit-slides-container">
    <li class="active">
      <figure class="orbit-figure">
        <img class="orbit-image" src="http://placecage.com/400/300" alt="Intropsective Cage">
        <figcaption class="orbit-caption">
          Here's the caption for for the first slide.
        </figcaption>
      </figure>
    </li>
  </ul>

  <nav class="orbit-bullets-container">        
   <button class="is-active"></button>
   <button></button>
   <button></button>
   <button></button>
 </nav>
</div>
```

```html_example
<div class="orbit" role="region" aria-label="Favorite Nicolas Cage Pictures">
  <button class="orbit-control orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
  <button class="orbit-control orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>

  <ul class="orbit-slides-container">
    <li class="active">
        <img class="orbit-image" src="http://placecage.com/800/200" alt="Intropsective Cage">
        <p class="orbit-caption">
          Here's the caption for for the first slide.
        </p>
    </li>
  </ul>

  <nav class="orbit-bullets-container">        
   <button class="is-active"></button>
   <button></button>
   <button></button>
   <button></button>
 </nav>
</div>
```