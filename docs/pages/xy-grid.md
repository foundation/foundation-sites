---
title: XY Grid
description: A fully reworked new grid system in v6.4 which has all the variety inbuilt in the form of multiple grid types which includes margin grid, padding grid, frame grid, block grid and vertical grid.
sass: scss/xy-grid/*.scss
---

<div class="callout training-callout">
  <p>The XY Grid is huge advancement in Grids. Stay up-to-date with all the new features in Foundation 6.4 with our online webinar training. You’ll come away knowing the ins and outs of the XY Grid to create complex layouts faster and with less code. Not to mention all the useful UI components and Foundation JavaScript you’ll learn. You’ll make your coworkers jealous.</p>
  <a href="http://zurb.com/university/foundation-intro" target="_blank">Don’t miss out on the upcoming Foundation trainings →</a>
</div>

## XY Grid Basics

The XY grid works very similarly to the standard float grid, but includes a number of useful features only possible with Flexbox, like horizontal and vertical alignment, automatic sizing and a full vertical grid.

---

## Browser support

The XY grid is supported in Chrome, Firefox, Safari 6+, IE10+, iOS 7+, and Android 4.4+. Flexbox is supported in Android 2, but not reliably enough for use with this grid. ([View Flexbox browser support.](http://caniuse.com/#feat=flexbox)) We recommend only using the XY grid on projects that can live with purely cutting-edge browser support.

---

## Importing

If you're using the CSS version of Foundation, you can generate a <a href="https://foundation.zurb.com/sites/download">custom download of Foundation</a> with Flexbox mode enabled.

```scss
@import 'foundation';

@include foundation-xy-grid-classes;
```

Note `foundation-xy-grid-classes` accepts arguements to enable/disable individual grid components. Simply set the arguement to `false` to disable output of those classes.
These are:

```
@include foundation-xy-grid-classes(
  $base-grid: true,
  $margin-grid: true,
  $padding-grid: true,
  $block-grid: true,
  $collapse: true,
  $offset: true,
  $vertical-grid: true
);
```
---

## Basics

The structure of XY grid uses `.grid-x`, `.grid-y`, and `.cell` as its base. Without [defining a gutter type](#gutters) the cells with simply split up the space without any gutters.

<div class="docs-codepen-container">
<a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/gRYeMQ?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="grid-x">
  <div class="cell">full width cell</div>
  <div class="cell">full width cell</div>
</div>
<div class="grid-x">
  <div class="small-6 cell">6 cells</div>
  <div class="small-6 cell">6 cells</div>
</div>
<div class="grid-x">
  <div class="medium-6 large-4 cell">12/6/4 cells</div>
  <div class="medium-6 large-8 cell">12/6/8 cells</div>
</div>
```

---

## Gutters

The defining feature of the XY grid is the ability to use margin AND padding grids in harmony.
To define a grid type, simple set `.grid-margin-x` or `.grid-padding-x` on the grid.

<div class="docs-codepen-container">
<a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/owvqYp?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="grid-x grid-margin-x">
  <div class="medium-6 large-4 cell">12/6/4 cells</div>
  <div class="medium-6 large-8 cell">12/6/8 cells</div>
</div>
<div class="grid-x grid-padding-x">
  <div class="medium-6 large-4 cell">12/6/4 cells</div>
  <div class="medium-6 large-8 cell">12/6/8 cells</div>
</div>
```
---

## Grid Container

The grid defaults to the full width of its container. In order to contain the grid, use the `.grid-container` class.

```html
<div class="grid-container">
  <div class="grid-x">
    <div class="cell small-4">cell</div>
    <div class="cell small-4">cell</div>
    <div class="cell small-4">cell</div>
  </div>
</div>
```

By default, the container will be centered and have a max-width equal to your
`$max-width` setting (1200px by default), and be flush to the screen for widths
below that. If you want to add padding below the `$max-width`, simply add the
`.grid-container-padded` class to your grid container.

```html
<div class="grid-container grid-container-padded">
  <div class="grid-x">
    <div class="cell small-4">cell</div>
    <div class="cell small-4">cell</div>
    <div class="cell small-4">cell</div>
  </div>
</div>
```
---

## Auto Sizing

If the class `.auto` or `.[size]-auto` is added to the cell, it will take up the remaining space.

```html_example
<div class="grid-x grid-margin-x">
  <div class="small-4 cell">4 cells</div>
  <div class="auto cell">Whatever's left!</div>
</div>
```

---

Multiple expanding cells will share the leftover space equally.

```html_example
<div class="grid-x grid-margin-x">
  <div class="small-4 cell">4 cells</div>
  <div class="auto cell">Whatever's left!</div>
  <div class="auto cell">Whatever's left!</div>
</div>
```

---

A cell can also be made to *shrink*, by adding the `.shrink` or `.[size]-shrink` class. This means it will only take up the space its contents need.

```html_example
<div class="grid-x grid-margin-x">
  <div class="shrink cell">Shrink!</div>
  <div class="auto cell">Expand!</div>
</div>
```

---

## Responsive Adjustments

To switch back to the auto behavior from a percentage or shrink behavior, use the classes `.[size]-auto` or `.[size]-shrink`. In the below example, the cells stack on small screens, and become even-width on large screens.

```html_example
<div class="grid-x">
  <div class="large-auto cell">One</div>
  <div class="large-auto cell">Two</div>
  <div class="large-auto cell">Three</div>
  <div class="large-auto cell">Four</div>
  <div class="large-auto cell">Five</div>
  <div class="large-auto cell">Six</div>
</div>
```

---

## Collapse Cells

The `.[size]-[gutter-type]-collapse` class lets you remove cell gutters.

There are times when you won't want each media query to be collapsed. In this case, use the media query size you want and collapse and add that to your grid element. Example shows gutters at small and no gutters on medium and up.

```html_example
<div class="grid-x grid-margin-x medium-margin-collapse">
  <div class="small-6 cell">
    Gutters at small no gutters at medium.
  </div>
  <div class="small-6 cell">
    Gutters at small no gutters at medium.
  </div>
</div>
```

---

## Offsets

Offsets work by applying `margin-left` (or `margin-top` for a vertical grid) to a grid.

```html_example
<div class="grid-x grid-margin-x">
  <div class="small-4 large-offset-2 cell">Offset 2 on large</div>
  <div class="small-4 cell">4 cells</div>
</div>
```

---

## Vertical Grids

The XY grid also supports vertical grids. Simply apply `.grid-y` instead of `.grid-x`.
The internal cells will shift automatically to provide spacing vertically rather than horizontally.

You can also apply margin or padding with `.grid-margin-y` and `.grid-padding-y` to apply spacing to the top and bottom of cells.

<div class="callout">
  <p>Please note for vertical grids to work, the grid needs a height. You can also use [grid frame](#grid-frame) to create a 100 vertical height grid (or 100% height if nested).</p>
</div>


<div class="docs-codepen-container">
<a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/JJPLYJ?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="grid-y" style="height: 500px;">
  <div class="cell small-6 medium-8 large-2">
    6/8/2
  </div>
  <div class="cell small-6 medium-4 large-10">
    6/4/10
  </div>
</div>
```

---

## Grid Frame

The XY grid incorporates the grid frame from Foundation for Apps plus many other useful features.
To start, add `.grid-frame` to the grid. This sets the grid to be 100vh (the full height of the browser window).

Here's an example of what you can do:
<div class="docs-codepen-container">
<a class="codepen-logo-link" href="https://codepen.io/ZURBFoundation/pen/MogrXG?editors=1000" target="_blank"><img src="{{root}}assets/img/logos/edit-in-browser.svg" class="" height="" width="" alt="edit on codepen button"></a>
</div>

```html_example
<div class="grid-y medium-grid-frame">
  <div class="cell shrink header medium-cell-block-container">
    <h1>Grid Frame Header</h1>
    <div class="grid-x grid-padding-x">
      <div class="cell medium-4">
        A medium 4 cell
      </div>
      <div class="cell medium-4 medium-cell-block">
        <p style="width:80vw;">A medium 4 cell block... on medium this content should overflow and let you horizontally scroll across... one might use this for an array of options</p>
      </div>
      <div class="cell medium-4">
        A medium 4 cell
      </div>
    </div>
  </div>
  <div class="cell medium-auto medium-cell-block-container">
    <div class="grid-x grid-padding-x">
      <div class="cell medium-4 medium-cell-block-y">
        <h2>Independent scrolling sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacus odio, accumsan id ullamcorper eget, varius nec erat. Nulla facilisi. Donec dui felis, euismod nec finibus vitae, dapibus quis arcu. Maecenas tempor et ipsum quis venenatis. Ut posuere sed augue sit amet efficitur. Sed imperdiet, justo id tempus rhoncus, est est viverra turpis, non vulputate magna lectus et nisl. Pellentesque ultrices porttitor vehicula. Ut aliquet efficitur ligula, a consectetur felis. Proin tristique ut augue nec luctus. Curabitur a sapien pretium, auctor elit a, efficitur erat. Donec tincidunt dui vel velit bibendum euismod. Cras vitae nibh dui. Aliquam erat volutpat. Etiam sit amet arcu a erat efficitur facilisis. Ut viverra dapibus turpis, et ornare justo. Integer in dui cursus, dignissim tortor a, hendrerit risus.</p>

        <p>Suspendisse pulvinar, massa iaculis feugiat lobortis, dolor sapien vestibulum nulla, vel cursus tellus leo in lorem. Aliquam eu placerat urna. Suspendisse sed viverra orci, ut mattis neque. Fusce non ultrices nisi. In sagittis varius mollis. Quisque dolor quam, consectetur eu lacinia ac, ullamcorper vel arcu. Nullam mattis imperdiet nulla sed ornare. Praesent tristique, est id eleifend vestibulum, neque nibh condimentum ex, nec lobortis purus justo a libero. Phasellus id ex ac nunc hendrerit hendrerit. Nullam urna ipsum, rutrum at fringilla vel, venenatis non purus. Maecenas egestas ex vitae venenatis molestie. Ut et odio egestas, accumsan neque et, viverra nisl. Sed faucibus nec nulla sed imperdiet. Fusce quis sem ac urna semper tempor a id elit. Nulla fringilla vitae sapien a vehicula.</p>

      </div>
      <div class="cell medium-8 medium-cell-block-y">
        <h2>Independent scrolling body</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacus odio, accumsan id ullamcorper eget, varius nec erat. Nulla facilisi. Donec dui felis, euismod nec finibus vitae, dapibus quis arcu. Maecenas tempor et ipsum quis venenatis. Ut posuere sed augue sit amet efficitur. Sed imperdiet, justo id tempus rhoncus, est est viverra turpis, non vulputate magna lectus et nisl. Pellentesque ultrices porttitor vehicula. Ut aliquet efficitur ligula, a consectetur felis. Proin tristique ut augue nec luctus. Curabitur a sapien pretium, auctor elit a, efficitur erat. Donec tincidunt dui vel velit bibendum euismod. Cras vitae nibh dui. Aliquam erat volutpat. Etiam sit amet arcu a erat efficitur facilisis. Ut viverra dapibus turpis, et ornare justo. Integer in dui cursus, dignissim tortor a, hendrerit risus.</p>
        <p>Suspendisse pulvinar, massa iaculis feugiat lobortis, dolor sapien vestibulum nulla, vel cursus tellus leo in lorem. Aliquam eu placerat urna. Suspendisse sed viverra orci, ut mattis neque. Fusce non ultrices nisi. In sagittis varius mollis. Quisque dolor quam, consectetur eu lacinia ac, ullamcorper vel arcu. Nullam mattis imperdiet nulla sed ornare. Praesent tristique, est id eleifend vestibulum, neque nibh condimentum ex, nec lobortis purus justo a libero. Phasellus id ex ac nunc hendrerit hendrerit. Nullam urna ipsum, rutrum at fringilla vel, venenatis non purus. Maecenas egestas ex vitae venenatis molestie. Ut et odio egestas, accumsan neque et, viverra nisl. Sed faucibus nec nulla sed imperdiet. Fusce quis sem ac urna semper tempor a id elit. Nulla fringilla vitae sapien a vehicula.</p>
        <p>Nullam vestibulum lorem nec lectus egestas, nec ullamcorper diam maximus. Maecenas condimentum, nibh at blandit semper, ex erat tempus magna, id maximus neque velit accumsan nibh. Aenean dignissim lorem eu nisl laoreet vestibulum. Vivamus efficitur et augue vitae tincidunt. Etiam et magna felis. Integer mattis, nisi aliquet scelerisque blandit, ex mi sodales ante, eget accumsan quam magna et ligula. Curabitur id tristique leo. Proin rutrum mi vitae enim rhoncus, at cursus neque eleifend. Integer ultrices volutpat tellus ac porta. Fusce sollicitudin venenatis lacinia. Fusce ante lorem, gravida semper varius non, pharetra non erat. Sed dapibus arcu turpis, ac sollicitudin nibh lacinia vel. Nullam at enim porta, luctus metus sit amet, rutrum odio. Cras tempor enim vel pellentesque sollicitudin. Maecenas ullamcorper, sem non accumsan volutpat, neque tortor pulvinar orci, ut ultrices ligula lorem ut risus.</p>
        <p>Aliquam facilisis, nibh eget posuere suscipit, arcu sapien iaculis odio, in molestie dolor lectus vitae sem. Cras id nunc mollis mi rutrum dapibus. Quisque rutrum a augue at scelerisque. Praesent faucibus ac enim vitae gravida. Sed et sodales elit. Duis magna lectus, interdum sit amet metus a, sagittis varius magna. Proin nibh lectus, egestas a luctus ut, dapibus et enim. Curabitur fringilla ipsum vitae nunc imperdiet consectetur eget non neque. Suspendisse ultricies odio quis lorem vulputate, ac vulputate turpis feugiat. Maecenas posuere rhoncus orci, in ornare velit suscipit tempor. Curabitur pretium nisl id lorem placerat consequat. In quis quam eros. Nam mattis elit eu quam sagittis, in varius erat tempor.</p>
        <p>Fusce felis magna, pellentesque eget mollis a, rutrum id eros. Curabitur auctor varius arcu a consequat. Phasellus quis pulvinar enim, eu ultricies justo. Pellentesque risus libero, dapibus at erat ultricies, gravida varius erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla tempus, justo ut laoreet mollis, nunc tellus convallis urna, vel pretium dui velit eget ligula. Aliquam semper sed nulla a molestie. Maecenas at egestas massa, vitae aliquam mi. Fusce nec sem egestas, pretium lacus non, tincidunt sapien. Sed tristique odio at ultricies vulputate. Integer et convallis augue, eu aliquam enim. Mauris ut faucibus diam. Donec vulputate nunc sed congue accumsan. Etiam lobortis nisi quis lacinia pharetra.</p>
      </div>
    </div>
  </div>
  <div class="cell shrink footer">
    <h3>Here's my footer</h3>
  </div>
</div>
```

---

## Building Semantically

XY grid CSS is generated with a powerful set of Sass mixins, which you can use in your own code to build a semantic grid.

### Grid Container

Use the `xy-grid-container()` mixin to create a grid container. This contains the grid to the width specified in `$grid-container`.

```scss
.container {
  @include xy-grid-container;
}
```
---

### Grids

Use the `xy-grid()` mixin to create a grid.

```scss
.my-grid {
  @include xy-grid;
}
```
---

### Gutters

Use the `xy-gutters()` mixin to add gutters to an item. The `xy-cell` mixin used this to output gutters, but you can use this to add responsive gutters to anything you like.
This is especially powerful as you can specify where you want the gutters, like so:

```scss
.gallery-item {
  @include xy-gutters($gutter-position: left right bottom);
}
```
---

### Cells

Use the `xy-cell()` mixin to create a cell. There are a number of ways to define the size of a cell.
`xy-cell` accepts a few different keywords as well as specific sizes: `full` (full width), `auto` (automatic width) and `shrink` (take up only the space it needs).

```scss
.main-content {
  // Use the full column count (100%)
  @include xy-cell();

  // Use a column count (33%);
  @include xy-cell(4);

  // Use a percentage (15%)
  @include xy-cell(15%);

  // Use a custom fraction (20%)
  @include xy-cell(1 of 5);
}
```

The cell size calculator can also be accessed as a function. This gives you the percentage value, without any of the grid cell CSS.

```scss
.main-content {
  width: xy-cell-size(1 of 7);
}
```

---

### Responsive Grids

Pair `xy-cell` with the `breakpoint()` mixin to make your grid responsive.
Refer to the Sass documentation below to learn how each mixin works and the available arguements.

```scss
.main-content {
  @include xy-cell();

  @include breakpoint(medium) {
    @include xy-cell(8);
  }
}
```

We also have a shorthand option for the above which outputs the same CSS:

```scss
.main-content {
  @include xy-cell-breakpoints((small: full, medium: 8));
}
```

### Custom Block Grid

Use the `xy-grid-layout()` mixin to create your own block grid.
By default the mixin takes 2 parameters:
- number of columns
- child selector

Refer to the Sass documentation [below](#xy-grid-layout) for the full list of arguments.

Here's an example:

```scss
.gallery {
  @include xy-grid-layout(3, '.gallery-item');
}
```
That outputs this CSS:

```
.gallery > .gallery-item {
  width: calc(33.33333% - 1.25rem);
  margin-right: 0.625rem;
  margin-left: 0.625rem;
}
```
