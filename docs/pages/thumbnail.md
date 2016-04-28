---
title: Thumbnail
description: If you're going to use an image as an anchor, we've got you covered. All you gotta do is add one class to your image and voilà!
sass: scss/components/_thumbnail.scss
---

The `.thumbnail` class can be applied directly to an `<img>` element, or an `<a>` that wraps it. Make sure the `<img>` has an `alt` attribute that describes the contents of the image.

```html
<img class="thumbnail" src="thumbnail.jpg" alt="Photo of Uranus.">
```

```html
<a href="#" class="thumbnail"><img src="thumbnail.jpg" alt="Photo of Neptune."></a>
```

<div class="row">
  <div class="small-4 columns">
    <img class="thumbnail" src="assets/img/thumbnail/01.jpg" alt="Photo of Uranus.">
  </div>
  <div class="small-4 columns">
    <a href="#" class="thumbnail"><img src="assets/img/thumbnail/02.jpg" alt="Photo of Neptune."></a>
  </div>
  <div class="small-4 columns">
    <img class="thumbnail" src="assets/img/thumbnail/03.jpg" alt="Photo of Pluto.">
  </div>
</div>
