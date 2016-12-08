---
title: The Frame Grid
description: Built to be the outermost shell of an application, the Frame-grid helps create fixed header, fixed footers and any number of separate scrolling sections. The normal Foundation grid can be nested within grid blocks to create complex content arrangements..
sass:
  - scss/grid/apps-grid-classes.scss
  - scss/grid/apps-grid.scss
  - scss/grid/apps-grid-elements.scss
  - scss/grid/apps-grid-modifiers.scss
tags:
  - apps grid
---

### The Grid in Action

The new grid is a complex beast, with a lot of different options, especially when it comes to creating responsive layouts. Check out the sample version below to see how the frame-grid can be used to create complex app layouts.



---

### The App Frame

For most apps, you'll want to contain all of your UI elements in the space of the window, and then make certain sections of the app scrollable. To achieve this, wrap your entire app in a grid frame:

```html
<div class="frame">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>
```

The app frame always takes up 100% of the width and 100% of the height of the user's browser window.

---

### The Basics: Grid Blocks

Blocks are the... *building blocks* of apps in Foundation for Apps. They're flexbox-powered elements that can be intelligently sized, re-oriented, and re-ordered. Blocks are most analagous to rows in Foundation 5, but there's much more to them than that.

---

#### Automatic sizing

You're probably used to pairing grid classes with sizing classes, like `.small-12`, `.medium-6`, and so on. In Foundation for Apps, when grid blocks don't have sizing classes, they take up an even amount of space.

```html
<div class="frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>
```

<div class="docs-grid-demo frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>

```html
<div class="frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>
```

<div class="docs-grid-demo frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>

While these blocks *expand* to fill available space, it's also possible to have a block *shrink*, which means it only takes up as much space as its content needs. This is useful for title bars, tabs, or any other content that's secondary to the main content area.

```html
<div class="frame-block">
  <div id="tabs" class="frame-block shrink"></div>
  <div id="main" class="frame-block"></div>
</div>
```

<div class="docs-grid-demo frame-block">
  <div id="tabs" class="frame-block shrink"></div>
  <div id="main" class="frame-block"></div>
</div>

#### Manual sizing

It's also possible to size the grid using column-based sizing classes. By default, the Foundation for Apps grid uses a 12-column grid, but you can change this by modifying the `$total-columns` variable in your settings file.

```
<div class="frame-block">
  <div id="sidebar" class="medium-4 frame-block"></div>
  <div id="main" class="medium-8 frame-block"></div>
</div>
```

<div class="docs-grid-demo manual-size frame-block">
  <div id="sidebar" class="medium-4 frame-block"></div>
  <div id="main" class="medium-7 frame-block"></div>
</div>


#### Parent-level sizing

<p>Lastly, the sizing of blocks can be set on the parent, rather than individual children. Add the class `[size]-up-[n]` to a parent block to automatically size all children to be the same width. `[size]` is a breakpoint, like `small` or `medium`, and `n` is the number of items to fit on each row. By default, `n` only goes up to six, but this can be changed by modifying the `$block-grid-max-size` variable in your settings file.</p>

```html
<div class="frame-block small-up-3">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>
```

<div class="docs-grid-demo frame-block small-up-3">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>

Note that this sizing method only works with horizontal grids.


### Content Blocks

If basic blocks are the *rows* of a Foundation for Apps layout, then content blocks are the *columns*. They can be sized and re-ordered just like normal blocks, but they're meant to house actual content, not just more blocks.

```html
<div class="frame-block">
  <div class="frame-block">
    <div class="grid-content"></div>
    <div class="grid-content"></div>
  </div>
  <div class="grid-content"></div>
</div>
```

In the above example, you can see that `grid-content` elements are the bottommost elements of the basic layout. Use `frame-block` when you intend to keep nesting more blocks for your layout, and use `grid-content` when you're filling the element with "normal" content, like lists, text, tabs, or menus.

### The Vertical Grid

By default, blocks in a grid are laid out horizontally. A grid can be reoriented to be vertical by adding the `vertical` class to a parent element.

```html
<div class="vertical frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>
```

<div class="docs-grid-demo vertical-demo vertical frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>

This behavior doesn't cascade down to child blocks&mdash;they'll be horizontal by default also.

You can also reorient the grid at different screen sizes by using adding breakpoint names to the classes.

```html
<div class="vertical medium-horizontal frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>
```

<div class="docs-grid-demo vertical medium-horizontal frame-block">
  <div class="frame-block"></div>
  <div class="frame-block"></div>
</div>


### Other Options

<h4>Prevent Scrolling</h4>

<p>By default, all content blocks scroll vertically. This allows you to create independently-scrolling panes of content in your apps. However, in CSS, if an element scrolls vertically, any horizontal overflow will be hidden. To disable scrolling on a block, just add the class `.noscroll`.</p>

```html
<div class="frame-block wrap">
  <!-- Won't have scroll bars ever -->
  <div class="small-6 grid-content noscroll"></div>
  <!-- Will have scroll bars if there's enough content -->
  <div class="small-6 grid-content"></div>
</div>
```

#### Block Alignment

By default, all blocks in a grid align to the left of a grid, or the top if the grid is vertical. We can leverage the Flexbox `justify-content` property to easily re-align the blocks in a grid.

```html
<div class="align-right frame-block">
  <div class="small-4 frame-block"></div>
  <div class="small-4 frame-block"></div>
</div>
```

<div class="docs-grid-demo align-right frame-block">
  <div class="small-4 frame-block"></div>
  <div class="small-4 frame-block"></div>
</div>

In this example, our blocks only take up eight columns of space, leaving four columns worth of empty space. By adding the `align-right` class to the parent block, the empty space will appear on the left instead of the right.

Grids can be aligned in five ways:

  - `align-left`: Blocks clump together on the left. This is the default.
  - `align-right`: Blocks clump together on the right.
  - `align-center`: Blocks clump together in the middle.
  - `align-justify`: Blocks spread out so that the space *between* each one is the same.
  - `align-spaced`: Blocks spread out so that the space *around* each one is the same.

##### Center

<div class="docs-grid-demo align-center frame-block">
  <div class="small-4 frame-block"></div>
  <div class="small-4 frame-block"></div>
</div>

##### Justify

<div class="docs-grid-demo align-justify frame-block">
  <div class="small-4 frame-block"></div>
  <div class="small-4 frame-block"></div>
</div>

##### Spaced

<div class="docs-grid-demo align-spaced frame-block">
  <div class="small-4 frame-block"></div>
  <div class="small-4 frame-block"></div>
</div>

---

#### Source Ordering

Blocks can be reordered to be different from the order they appear in the HTML. This is known as *source ordering*.

```html
<div class="frame-block">
  <div class="frame-block order-2">2</div>
  <div class="frame-block order-1">1</div>
</div>
```

<div class="docs-grid-demo frame-block">
  <div class="frame-block order-2 text">2</div>
  <div class="frame-block order-1 text">1</div>
</div>

In the above example, the first child block will actually appear <em>after</em> the second one, because it has a lower order number. Blocks with the lower order (e.g. 1 is lower than 2) number appear first in the layout. If multiple blocks share an order, they're then grouped by their order in the HTML.

```
<div class="frame-block">
  <!-- 3rd -->
  <div class="frame-block order-2">3</div>
  <!-- 1st -->
  <div class="frame-block order-1">1</div>
  <!-- 2nd -->
  <div class="frame-block order-1">2</div>
</div>
```

<div class="docs-grid-demo frame-block">
  <div class="frame-block order-2 text">3</div>
  <div class="frame-block order-1 text">1</div>
  <div class="frame-block order-1 text">2</div>
</div>

The ordering classes also come in responsive flavors, allowing you to reorder grid blocks at different screen sizes. In the below example, the two blocks will switch places on medium screens and larger.

```html
<div class="frame-block">
  <div class="frame-block medium-order-2">1</div>
  <div class="frame-block medium-order-1">2</div>
</div>
```

<div class="docs-grid-demo frame-block">
  <div class="frame-block medium-order-2 text">1</div>
  <div class="frame-block medium-order-1 text">2</div>
</div>

---

#### Offsets

The same offset classes from Foundation for Sites can be used in Foundation for Apps. To create a left-hand margin on a block, add the class `[size]-offset-[n]`, where `[size]` is a breakpoint name, and `[n]` is the number of columns to offset by. In the below example, the second column will be offset by 3, which is equal to 25% of the width of the entire container.

```html
<div class="frame-block">
  <div class="small-6 frame-block"></div>
  <div class="small-2 small-offset-2 frame-block"></div>
</div>
```

<div class="docs-grid-demo frame-block">
  <div class="small-6 frame-block"></div>
  <div class="small-2 small-offset-2 frame-block"></div>
</div>

Offset classes allow you to fine-tune the spacing of blocks at different screen sizes. However, many common spacing options can also be achieved with the grid alignment classes described above.
