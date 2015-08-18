---
title: Dropdown
description: Dropdowns are little happy sprites to add content to the view without taking up a lot of space.
sass: scss/components/_dropdown.scss
---

## Plain Jane
By default, dropdowns are exactly that, horizontally oriented below the parent element, anchored to the bottom-left corner.

```html_example
&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<a class='button' data-toggle="dropdown">Toggle &raquo;</a>

<div class="dropdown-pane" id="dropdown" data-dropdown>
  Just some junk that needs to be said. Or not. Your choice.
</div>
```
