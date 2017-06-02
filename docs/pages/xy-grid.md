---
title: XY Grid
description: A fully reworked new grid system in v6.4 which has all the variety inbuilt in the form of multiple grid types which includes margin grid, padding grid, frame grid, block grid and vertical grid.
sass: scss/xy-grid/*.scss
---

## XY Grid Basics

The XY grid works very similarly to the standard float grid, but includes a number of useful features only possible with flexbox, like horizontal and vertical alignment, automatic sizing and a full vertical grid.

---

## Browser support

The XY grid is only supported in Chrome, Firefox, Safari 6+, IE10+, iOS 7+, and Android 4.4+. Flexbox is supported in Android 2, but not reliably enough for use with this grid. ([View flexbox browser support.](http://caniuse.com/#feat=flexbox)) We recommend only using the flex grid on projects that can live with purely cutting-edge browser support.

---

## Importing

If you're using the CSS version of Foundation, you can generate a <a href="https://foundation.zurb.com/sites/download">custom download of Foundation</a> with flexbox mode enabled.

```scss
@import 'foundation';

@include xy-grid;
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

The structure of XY grid uses `.grid` and `.cell` as its base. Without [defining a gutter type](#gutters) the cells with simply split up the space without any gutters.

```html_example
<div class="grid">
  <div class="cell">full width cell</div>
  <div class="cell">full width cell</div>
</div>
<div class="grid">
  <div class="small-6 cell">6 cells</div>
  <div class="small-6 cell">6 cells</div>
</div>
<div class="grid">
  <div class="medium-6 large-4 cell">12/6/4 cells</div>
  <div class="medium-6 large-8 cell">12/6/8 cells</div>
</div>
```

---

## Gutters

The defining feature of the XY grid is the ability to use margin AND padding grids in harmony.
To define a grid type, simple set `.margin-gutters` or `.padding-gutters` on the grid.

```html_example
<div class="grid margin-gutters">
  <div class="medium-6 large-4 cell">12/6/4 cells</div>
  <div class="medium-6 large-8 cell">12/6/8 cells</div>
</div>
<div class="grid padding-gutters">
  <div class="medium-6 large-4 cell">12/6/4 cells</div>
  <div class="medium-6 large-8 cell">12/6/8 cells</div>
</div>
```
---

## Grid Container

The grid defaults to the full width of its container. In order to contain the grid, use the `.grid-container` class.

```html
<div class="grid-container">
  <div class="grid">
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
<div class="grid margin-gutters">
  <div class="small-4 cell">4 cells</div>
  <div class="auto cell">Whatever's left!</div>
</div>
```

---

Multiple expanding cells will share the leftover space equally.

```html_example
<div class="grid margin-gutters">
  <div class="small-4 cell">4 cells</div>
  <div class="auto cell">Whatever's left!</div>
  <div class="auto cell">Whatever's left!</div>
</div>
```

---

A cell can also be made to *shrink*, by adding the `.shrink` or `.[size]-shrink` class. This means it will only take up the space its contents need.

```html_example
<div class="grid margin-gutters">
  <div class="shrink cell">Shrink!</div>
  <div class="auto cell">Expand!</div>
</div>
```

---

## Responsive Adjustments

To switch back to the auto behavior from a percentage or shrink behavior, use the classes `.[size]-auto` or `.[size]-shrink`. In the below example, the cells stack on small screens, and become even-width on large screens.

```html_example
<div class="grid">
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

The `.[size]-[margin-type]-collapse` class lets you remove cell gutters.

There are times when you won't want each media query to be collapsed. In this case, use the media query size you want and collapse and add that to your grid element. Example shows gutters at small and no gutters on medium and up.

```html_example
<div class="grid margin-gutters medium-margin-collapse">
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
<div class="grid margin-gutters">
  <div class="small-4 large-offset-2 cell">Offset 2 on large</div>
  <div class="small-4 cell">4 cells</div>
</div>
```

---

## Vertical Grids

The XY grid also supports vertical grids. Simply apply `.grid-vertical` instead of `.grid`.
All other classes are available eg: `.[size]-vertical-[number]`, `[size]-vertical-auto` and `[size]-vertical-shrink` classes work as height rather than width.

<div class="callout">
  <p>Please note for vertical grids to work, the grid needs a height. You can also use [grid frame](#grid-frame) to create a 100 vertical height grid (or 100% height if nested).</p>
</div>

```html_example
<div class="grid-vertical" style="height: 500px;">
  <div class="cell small-vertical-6 medium-vertical-8 large-vertical-2">
    6/8/2
  </div>
  <div class="cell small-vertical-6 medium-vertical-4 large-vertical-10">
    6/4/10
  </div>
</div>
```

---

## Grid Frame

The XY grid incorporates the grid frame from Foundation for Apps plus many other useful features.
To start, add `.grid-frame` to the grid. This sets the grid to be 100vh (the full height of the browser window).

Here's an example of what you can do:

```html_example
<div class="grid grid-vertical medium-grid-frame">
  <div class="cell shrink header cell-block-container">
    <h1>Grid Frame Header</h1>
    <div class="grid padding-gutters">
      <div class="cell medium-4">
        A medium 4 cell
      </div>
      <div class="cell medium-4 medium-cell-block">
        <p style="width:100vw;">A medium 4 cell block... on medium this content should overflow and let you horizontally scroll across... one might use this for an array of options</p>
      </div>
      <div class="cell medium-4">
        A medium 4 cell
      </div>
    </div>
  </div>
  <div class="cell auto cell-block-container">
    <div class="grid padding-gutters">
      <div class="cell medium-4 medium-cell-block-vertical">
        <h2>Independent scrolling sidebar</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lacus odio, accumsan id ullamcorper eget, varius nec erat. Nulla facilisi. Donec dui felis, euismod nec finibus vitae, dapibus quis arcu. Maecenas tempor et ipsum quis venenatis. Ut posuere sed augue sit amet efficitur. Sed imperdiet, justo id tempus rhoncus, est est viverra turpis, non vulputate magna lectus et nisl. Pellentesque ultrices porttitor vehicula. Ut aliquet efficitur ligula, a consectetur felis. Proin tristique ut augue nec luctus. Curabitur a sapien pretium, auctor elit a, efficitur erat. Donec tincidunt dui vel velit bibendum euismod. Cras vitae nibh dui. Aliquam erat volutpat. Etiam sit amet arcu a erat efficitur facilisis. Ut viverra dapibus turpis, et ornare justo. Integer in dui cursus, dignissim tortor a, hendrerit risus.</p>

        <p>Suspendisse pulvinar, massa iaculis feugiat lobortis, dolor sapien vestibulum nulla, vel cursus tellus leo in lorem. Aliquam eu placerat urna. Suspendisse sed viverra orci, ut mattis neque. Fusce non ultrices nisi. In sagittis varius mollis. Quisque dolor quam, consectetur eu lacinia ac, ullamcorper vel arcu. Nullam mattis imperdiet nulla sed ornare. Praesent tristique, est id eleifend vestibulum, neque nibh condimentum ex, nec lobortis purus justo a libero. Phasellus id ex ac nunc hendrerit hendrerit. Nullam urna ipsum, rutrum at fringilla vel, venenatis non purus. Maecenas egestas ex vitae venenatis molestie. Ut et odio egestas, accumsan neque et, viverra nisl. Sed faucibus nec nulla sed imperdiet. Fusce quis sem ac urna semper tempor a id elit. Nulla fringilla vitae sapien a vehicula.</p>

      </div>
      <div class="cell medium-8 medium-cell-block-vertical">
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
