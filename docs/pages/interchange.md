---
title: Interchange
description: Interchange uses media queries to dynamically load responsive content that is appropriate for the user's device.
js: js/foundation.interchange.js
---

```html_example
<img data-interchange="[http://placehold.it/300x300, (min-width: 400px)], [http://placehold.it/600x600, (min-width: 600px)]">

<img data-interchange="[http://placehold.it/150x300, (min-width: 400px)], [http://placehold.it/800x600, (min-width: 800px)]">
```
