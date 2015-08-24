---
title: Flex Video
description: Wrap embedded videos from YouTube, Vimeo, and others in a flex video container to ensure they maintain the correct aspect ratio regardless of screen size.
sass: scss/components/_flex-video.scss
---

Embedded videos won't maintain their aspect ratio as the width of the screen changes. To avoid squished videos, wrap them in a container with the class `.flex-video`.

```html_example
<div class="flex-video">
  <iframe width="420" height="315" src="https://www.youtube.com/embed/V9gkYw35Vws" frameborder="0" allowfullscreen></iframe>
</div>
```

---

The default ratio is 4:3. Add the `.widescreen` class to change it to 16:9.

```html_example
<div class="flex-video widescreen">
  <iframe width="420" height="315" src="https://www.youtube.com/embed/aiBt44rrslw" frameborder="0" allowfullscreen></iframe>
</div>
```

---

Embedded Vimeo videos are special snowflakes of their own. Add the `.vimeo` class to a flex video container that wraps a Vimeo embed.

```html_example
<div class="flex-video widescreen vimeo">
  <iframe src="http://player.vimeo.com/video/60122989" width="400" height="225" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
</div>
```
