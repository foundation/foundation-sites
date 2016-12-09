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

<div class="frame-grid-sample vertical frame">
  <div class="frame-block test-header shrink">Header</div>
  <div class="frame-group">
    <div class="frame-block medium-4">
      <p>Sidebar</p>
    </div>
    <div class="frame-block medium-9">
      <p>The Future of Seldon's Plan."The Foundation's past history is, I am sure, well-known to all of us who have had the good fortune to be educated in our planet's efficient and well-staffed school system.</p>

      <p>(There! That would start things off right with Miss Erlking, that mean old hag.)</p>
      <p>That past history is largely the past history of the great Plan of Hari Seldon. The two are</p>
      <p>one. But the question in the mind of most people today is whether this Plan will continue in all its great wisdom, or whether it will be foully destroyed, or, perhaps, has been so destroyed already.</p>
      <p>"To understand this, it may be best to pass quickly over some of the highlights of the Plan as it has been revealed to humanity thus far.</p>
      <p>(This part was easy because she had taken Modern History the semester before.)</p>
      <p>"In the days, nearly four centuries ago, when the First Galactic Empire was decaying into the paralysis that preceded final death, one man - the great Hari Seldon - foresaw the approaching end. Through the science of psychohistory, the intrissacies of whose mathematics has long since been forgotten.</p>
    </div>
  </div>
  <div class="frame-block test-footer shrink">Footer</div>
</div>

---

### The App Frame

For most apps, you'll want to contain all of your UI elements in the space of the window, and then make certain sections of the app scrollable. To achieve this, wrap your entire app in a grid frame:

```html
<div class="frame">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>
```

<div class="frame frame-grid-sample">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>

The app frame always takes up 100% of the width and 100% of the height of the user's browser window.

<small>These demos are setting a height and width for their purposes only</small>

---

### The Basics: Frame Group

Frame-groups are flexbox-powered elements that can be intelligently sized, re-oriented, and re-ordered. Frame-groups are most analagous to rows in traditional grid, but there's much more to them than that.

---

#### Automatic sizing

You're probably used to pairing grid classes with sizing classes, like `.small-12`, `.medium-6`, and so on. In Foundation for Apps, when frame-groups don't have sizing classes, they take up an even amount of space.


```html
<div class="frame-group">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>
```
<div class="frame frame-grid-sample">
  <div class="docs-grid-demo frame-group">
    <div class="frame-group"></div>
    <div class="frame-group"></div>
  </div>
</div>

```html
<div class="frame-group">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>
```
<div class="frame frame-grid-sample">
  <div class="docs-grid-demo frame-group">
    <div class="frame-group"></div>
    <div class="frame-group"></div>
    <div class="frame-group"></div>
  </div>
</div>

While these groups *expand* to fill available space, it's also possible to have a group *shrink*, which means it only takes up as much space as its content needs. This is useful for title bars, tabs, or any other content that's secondary to the main content area.

```html
<div class="frame-group">
  <div id="tabs" class="frame-group shrink"></div>
  <div id="main" class="frame-group"></div>
</div>
```

<div class="frame frame-grid-sample">
  <div class="docs-grid-demo frame-group">
    <div id="tabs" class="frame-group shrink">Sidebar</div>
    <div id="main" class="frame-group">Main content</div>
  </div>
</div>

#### Manual sizing

It's also possible to size the grid using column-based sizing classes. By default, the Foundation Frame grid uses a 12-column grid, but you can change this by modifying the `$total-columns` variable in your settings file.

```
<div class="frame-group">
  <div id="sidebar" class="medium-4 frame-group"></div>
  <div id="main" class="medium-8 frame-group"></div>
</div>
```

<div class="frame frame-grid-sample">
  <div class="docs-grid-demo manual-size frame-group">
    <div id="sidebar" class="medium-4 frame-group">Medium 4</div>
    <div id="main" class="medium-7 frame-group"> Medium 7</div>
  </div>
</div>


### Frame Blocks

If basic groups are the *rows* of a Foundation Frame Grid, then frame-blocks are the *columns*. They can be sized and re-ordered just like normal groups, but they're meant to house actual content, not just more blocks.

```html
<div class="frame-group">
  <div class="frame-group">
    <div class="frame-block"></div>
    <div class="frame-block"></div>
  </div>
  <div class="frame-block"></div>
</div>
```

In the above example, you can see that `frame-block` elements are the bottommost elements of the basic layout. Use `frame-group` when you intend to keep nesting more blocks for your layout, and use `frame-block` when you're filling the element with "normal" content, like lists, text, tabs, or menus.

### The Vertical Grid

By default, blocks in a grid are laid out horizontally. A grid can be reoriented to be vertical by adding the `vertical` class to a parent element.

```html
<div class="vertical frame-group">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>
```

<div class="docs-grid-demo vertical-demo vertical frame-group">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>

This behavior doesn't cascade down to child blocks&mdash;they'll be horizontal by default also.

You can also reorient the grid at different screen sizes by using adding breakpoint names to the classes.

```html
<div class="vertical medium-horizontal frame-group">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>
```

<div class="docs-grid-demo vertical medium-horizontal frame-group">
  <div class="frame-group"></div>
  <div class="frame-group"></div>
</div>


### Other Options

<h4>Prevent Scrolling</h4>

<p>By default, all content blocks scroll vertically. This allows you to create independently-scrolling panes of content in your apps. However, in CSS, if an element scrolls vertically, any horizontal overflow will be hidden. To disable scrolling on a block, just add the class `.noscroll`.</p>

```html
<div class="frame-group wrap">
  <!-- Won't have scroll bars ever -->
  <div class="small-6 frame-block noscroll"></div>
  <!-- Will have scroll bars if there's enough content -->
  <div class="small-6 frame-block"></div>
</div>
```

#### Block Alignment

By default, all blocks in a grid align to the left of a grid, or the top if the grid is vertical. We can leverage the Flexbox `justify-content` property to easily re-align the blocks in a grid.

```html
<div class="align-right frame-group">
  <div class="small-4 frame-group"></div>
  <div class="small-4 frame-group"></div>
</div>
```

<div class="docs-grid-demo align-right frame-group">
  <div class="small-4 frame-group"></div>
  <div class="small-4 frame-group"></div>
</div>

In this example, our blocks only take up eight columns of space, leaving four columns worth of empty space. By adding the `align-right` class to the parent block, the empty space will appear on the left instead of the right.

Grids can be aligned in five ways:

  - `align-left`: Blocks clump together on the left. This is the default.
  - `align-right`: Blocks clump together on the right.
  - `align-center`: Blocks clump together in the middle.
  - `align-justify`: Blocks spread out so that the space *between* each one is the same.
  - `align-spaced`: Blocks spread out so that the space *around* each one is the same.

##### Center

<div class="docs-grid-demo align-center frame-group">
  <div class="small-4 frame-group"></div>
  <div class="small-4 frame-group"></div>
</div>

##### Justify

<div class="docs-grid-demo align-justify frame-group">
  <div class="small-4 frame-group"></div>
  <div class="small-4 frame-group"></div>
</div>

##### Spaced

<div class="docs-grid-demo align-spaced frame-group">
  <div class="small-4 frame-group"></div>
  <div class="small-4 frame-group"></div>
</div>

---

#### Source Ordering

Blocks can be reordered to be different from the order they appear in the HTML. This is known as *source ordering*.

```html
<div class="frame-group">
  <div class="frame-group order-2">2</div>
  <div class="frame-group order-1">1</div>
</div>
```

<div class="docs-grid-demo frame-group">
  <div class="frame-group order-2 text">2</div>
  <div class="frame-group order-1 text">1</div>
</div>

In the above example, the first child block will actually appear <em>after</em> the second one, because it has a lower order number. Blocks with the lower order (e.g. 1 is lower than 2) number appear first in the layout. If multiple blocks share an order, they're then grouped by their order in the HTML.

```
<div class="frame-group">
  <!-- 3rd -->
  <div class="frame-group order-2">3</div>
  <!-- 1st -->
  <div class="frame-group order-1">1</div>
  <!-- 2nd -->
  <div class="frame-group order-1">2</div>
</div>
```

<div class="docs-grid-demo frame-group">
  <div class="frame-group order-2 text">3</div>
  <div class="frame-group order-1 text">1</div>
  <div class="frame-group order-1 text">2</div>
</div>

The ordering classes also come in responsive flavors, allowing you to reorder grid blocks at different screen sizes. In the below example, the two blocks will switch places on medium screens and larger.

```html
<div class="frame-group">
  <div class="frame-group medium-order-2">1</div>
  <div class="frame-group medium-order-1">2</div>
</div>
```

<div class="docs-grid-demo frame-group">
  <div class="frame-group medium-order-2 text">1</div>
  <div class="frame-group medium-order-1 text">2</div>
</div>
