---
title: Dropdown
description: Dropdowns are little happy sprites to add content to the view without taking up a lot of space.
sass: scss/components/_dropdown.scss
---

## Plain Jane
By default, dropdowns are exactly that, horizontally oriented below the parent element, anchored to the bottom-left corner.

```html_example
<a class='button' data-toggle="example-dropdown">Toggle &raquo;</a>

<div class="dropdown-pane" id="example-dropdown" data-dropdown>
  Just some junk that needs to be said. Or not. Your choice.
</div>
```


## Topsy's
Not the popcorn, just a drop-up, if you will. Just add the class <code>top</code> to your element, we'll handle the rest.

```html_example
<a class='button' data-toggle="example-dropdown2">Toggle &raquo;</a>

<div class="dropdown-pane top" id="example-dropdown2" data-dropdown>
  Just some junk that needs to be said. Or not. Your choice.
</div>

<a class='button' data-toggle="example-dropdown22">Toggle &raquo;</a>

<div class="dropdown-pane top" id="example-dropdown22" data-dropdown>
  Just some junk that needs to be said. Or not. Your choice.
</div>
```


## Lefties and Righties
Much like with baseball pitchers, you want a solid mix. It's as simple as adding the <code>left</code> or <code>right</code> class to your element. Top edge aligned, to the side of your choosing.

```html_example
<a class='button' data-toggle="example-dropdown4">Right &raquo;</a>

<div class="dropdown-pane right" id="example-dropdown4" data-dropdown>
  Just some junk that needs to be said. Or not. Your choice.
</div>

<a class='button' data-toggle="example-dropdown3">Left &raquo;</a>

<div class="dropdown-pane left" id="example-dropdown3" data-dropdown>
  Just some junk that needs to be said. Or not. Your choice.
</div>
```
