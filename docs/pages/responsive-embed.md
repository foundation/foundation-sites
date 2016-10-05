---
title: Responsive Embed
description: Wrap embedded content like videos, maps, and calendars in a responsive embed container to maintain the correct aspect ratio regardless of screen size.
sass: scss/components/_responsive-embed.scss
---

To make sure embedded content maintains its aspect ratio as the width of the screen changes, wrap the `iframe`, `object`, `embed`, or `video` in a container with the `.responsive-embed` class.

```html_example
<div class="responsive-embed">
  <iframe width="420" height="315" src="https://www.youtube.com/embed/mM5_T-F1Yn4" frameborder="0" allowfullscreen></iframe>
</div>
```

---

The default ratio is 4:3. Add the `.widescreen` class to change it to 16:9.

```html_example
<div class="responsive-embed widescreen">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/WUgvvPRH7Oc" frameborder="0" allowfullscreen></iframe>
</div>
```

---

If you need to embed content with other aspect ratios, such as 256:81, the `responsive-embed()` mixin makes it easy to add your own custom classes.

```scss
.panorama {
  @include responsive-embed(256 by 81);
}
```

```html_example
<div class="panorama">
  <iframe width="1024" height="315" src="https://www.youtube.com/embed/bnD9I24EL_4" frameborder="0" allowfullscreen></iframe>
</div>
```
