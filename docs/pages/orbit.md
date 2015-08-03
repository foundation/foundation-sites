---
title: Orbit Slider
description: The slider you want, the slider you need.
sass: scss/components/_orbit.scss
---

## Basic Orbit Slider

```html_example
<div class="orbit" role="region" aria-label="Favorite Nicolas Cage Pictures">
  <ul class="orbit-container">
    <button class="orbit-control orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-control orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="active">
      <img class="orbit-image" src="http://placecage.com/800/500" alt="Intropsective Cage">
      <figcaption class="orbit-caption">Woah. Nicolas Cage.</figcaption>
    </li>
  </ul>
  <nav class="orbit-bullets-container">        
   <button class="is-active"></button> 
<!-- 
   ask about aria label

    -->
   <button></button>
   <button></button>
   <button></button>
 </nav>
</div>
```

```html_example
<div class="orbit" role="region" aria-label="Favorite Nicolas Cage Pictures">
  <ul class="orbit-container">
    <button class="orbit-control orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-control orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="active">
      <img class="orbit-image" src="http://placecage.com/800/200" alt="Intropsective Cage">
      <figcaption class="orbit-caption">Woah. Nicolas Cage.</figcaption>
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
  <ul class="orbit-container">
    <button class="orbit-control orbit-previous custom-arrow" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-control orbit-next custom-arrow" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="active">
      <div class="custom-orbit">
        <h2>Cats are so friendly.</h2>
        <div class="flex-video widescreen">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/O1KW3ZkLtuo" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
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





