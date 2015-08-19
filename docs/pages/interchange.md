---
title: Interchange
description: Interchange uses media queries to dynamically load responsive content that is appropriate for the user's device.
js: js/foundation.interchange.js
---

<img data-interchange="[assets/img/interchange/small.jpg, (min-width: 0px)], [assets/img/interchange/medium.jpg, (min-width: 600px)], [assets/img/interchange/large.jpg, (min-width: 1024px)]">

## Use with Images

Bandwidth is precious on mobile networks, so it helps to serve users on smaller screens a smaller image. Using Interchange, you can serve up specific images for users depending on their screen size. CSS media queries are used to determine what size the user's device is, and which image should be served.

In the above example, we have three different sizes of image: one for small screens, one for medium, and one for large. Use the below format to set up a responsive image. The image will change automatically as the browser resizes.

```html
<img data-interchange="[assets/img/interchange/small.jpg, (min-width: 0px)], [assets/img/interchange/medium.jpg, (min-width: 640px)], [assets/img/interchange/large.jpg, (min-width: 1024px)]">
```

The image set is a comma-separated list of items with this format:

```
[image_path, media_query]
```

---

## Use with HTML

Interchange can also swap in and out entire chunks of HTML. This allows you to load in mobile-friendly components on small screens, or more advanced versions on large screens.

In the below example, we've applied `data-interchange` to a `<div>` instead of an `<img>` element, and the paths are to HTML files instead of images.

```html
<div data-interchange="[assets/partials/interchange-default.html, (min-width: 0px)], [assets/partials/interchange-medium.html, (min-width: 640px)], [assets/partials/interchange-large.html, (min-width: 1024px)]"></div>
```

<div id="docs-example-interchange" data-interchange="[assets/partials/interchange-default.html, (min-width: 0px)], [assets/partials/interchange-medium.html, (min-width: 640px)], [assets/partials/interchange-large.html, (min-width: 1024px)]"></div>
