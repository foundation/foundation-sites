---
title: Flexbox
description: For browsers with cutting-edge support, some of Foundation's key components can be converted to flexbox.
sass:
  - scss/components/_flex.scss
  - scss/util/_flex.scss
---

Foundation components use a combination of floats, vertical alignment, table cells, and various other CSS hacks to get layouts looking right. These days though, there's a better way... if you are happy with the below browser support!

Enabling **flexbox mode** replaces those hacks with flexbox properties, streamlining how layouts are made, and making sizing and alignment of elements much easier.

Flexbox mode is only supported these browsers:

- The latest Chrome and Firefox
- Safari 6+
- IE 10+
- iOS 7+
- Android 4.4+

---

## Enabling Flexbox Mode

If you're using the CSS version of Foundation, you can generate a <a href="https://foundation.zurb.com/sites/download">custom download of Foundation</a> with flexbox mode enabled. If you're using the Sass version of Foundation, you can enable flexbox mode two ways:

If you use the `foundation-everything()` mixin in your main Sass file, pass in the parameter `true` to enable flexbox mode.

```scss
@include foundation-everything(true);
```

If you included each component manually (like our starter projects do), open your settings file (basic template: scss/_settings.scss, ZURB template: src/assets/scss/_settings.scss) and set `$global-flexbox` to `true`, and remove the `@include` for the float grid and replace it with the one for the flex grid, along with the helper classes (basic template: scss/app.scss, ZURB template: src/assets/scss/app.scss):

```scss
$global-flexbox: true;

// @include foundation-grid;
@include foundation-flex-grid;
@include foundation-flex-classes;
```

---

## Supported Components

Besides the flex grid, these components have flexbox modes:

- [Button group](button-group.html)
- [Input group - (Forms)](forms.html#inline-labels-and-buttons)
- [Menu](menu.html)
- [Top bar](top-bar.html)
- [Media object](media-object.html)
- [Title bar](off-canvas.html#title-bar)
- [Card](card.html)

In general, all of the components work exactly the same. However, a few of them require slight changes to CSS classes used to work properly. Refer to the documentation for each to find out what's different.

---

## Helper Classes

Flexbox makes horizontal and vertical alignment painless, through the CSS properties [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items), [`align-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self), and [`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content). Foundation includes a handful of classes for these properties, which work with any flexbox-enabled component.

To understand how these classes work, you need to understand the parent-child relationship created with flexbox. An element with `display: flex` is a *flex parent*, and can horizontally or vertically align its children. All immediate children of the flex parent are *flex children*. A flex child can vertically align itself.

Here's a basic example: when using the grid, a row is a flex parent, and a column is a flex child.

```html
<div class="row">
  <div class="column"></div>
  <div class="column"></div>
  <div class="column"></div>
</div>
```

---

### Horizontal Alignment

Horizontal alignment classes are applied to flex parents. Left alignment is the default, but you can use one of these classes to change this:

- `.align-right`
- `.align-center`
- `.align-justify`
- `.align-spaced`

<div class="docs-code-live">
  <div class="text-center">
    <div class="row">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the left</div>
    </div>
    <div class="row align-right">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the right</div>
    </div>
    <div class="row align-center">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the center</div>
    </div>
    <div class="row align-justify">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the edges</div>
    </div>
    <div class="row align-spaced">
      <div class="column small-4">Aligned to</div>
      <div class="column small-4">the space around</div>
    </div>
  </div>
</div>

You might be wondering what the difference between `.align-justify` and `.align-spaced` is. A justified grid (`justify-content: space-between`) evenly distributes the space *between* each column. The first and last columns pin to the edge of the grid.

A spaced grid (`justify-content: space-around`) evenly distributes the space *around* each column. This means there will always be space to the left of the first column, and to the right of the last column.

The horizontal alignment classes are shorthands for the `justify-content` CSS property. [Learn more about `justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).

---

### Vertical Alignment

Vertical alignment can be applied to a flex parent&mdash;which will align all the children automatically&mdash;or to a flex child, which will align only that element.

Stretch alignment is the default. To set parent alignment, use these classes:

- `.align-top`
- `.align-middle`
- `.align-bottom`
- `.align-stretch`

<div class="primary callout">
  <p>Note that with vertical alignment, we use the term "middle" for the midpoint, while with horizontal alignment, we use the term "center". As we can't have two CSS classes with the same name, thus we are using different terms.</p>
</div>

```html_example
<div class="row align-middle">
  <div class="columns">I'm in the middle!</div>
  <div class="columns">I am as well, but I have so much text I take up more space! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis facere ducimus earum minus, inventore, ratione doloremque deserunt neque perspiciatis accusamus explicabo soluta, quod provident distinctio aliquam omnis? Labore, ullam possimus.</div>
</div>
```

```html_example
<div class="row align-stretch">
  <div class="columns">These colums have the same height.</div>
  <div class="columns">That's right, equal-height columns are possible with Flexbox too! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, tempora. Impedit eius officia possimus laudantium? Molestiae eaque, sapiente atque doloremque placeat! In sint, fugiat saepe sunt dolore tempore amet cupiditate.</div>
</div>
```

---

To align an individual child, use the below classes. They use the same alignment terms as the parent-level classes, but the classes start with `.align-self-` instead of `.align-`.

- `.align-self-top`
- `.align-self-middle`
- `.align-self-bottom`
- `.align-self-stretch`

```html_example
<div class="row">
  <div class="column align-self-bottom">Align bottom</div>
  <div class="column align-self-middle">Align middle</div>
  <div class="column align-self-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</div>
</div>
```

---

### Central Alignment

Central alignment can be applied to a flex parent, which will centrally align all children's automatically. To set this to your layout, simply use the class: `.align-center-middle`.

<div class="primary callout">
  <p>We are using `.text-center` class just for demo purposes here.</p>
</div>

```html_example
<div class="row align-center-middle text-center">
  <div class="columns small-4">I am in the center-middle</div>
  <div class="columns small-4">I am also centrally located</div>
</div>
```

---

## Vanilla Flexbox Helper Classes

Foundation also includes some helper classes for quickly applying flex
container & direction attributes to elements.

To make something a flex container, simply apply
- `.flex-container`

And to change its flex direction from row to column you can use the helper classes:

- `.flex-dir-row` (default)
- `.flex-dir-row-reverse`
- `.flex-dir-column`
- `.flex-dir-column-reverse`

For children, there are 3 quick helper classes

- `.flex-child-auto` (auto size flex child)
- `.flex-child-grow` (flex child that will grow to take up all possible space)
- `.flex-child-shrink` (flex child that will shrink to minimum possible space)

```html_example
<div class="row">
  <div class="column flex-container flex-dir-column">
    <div class="callout flex-child-auto">Auto</div>
    <div class="callout flex-child-auto">Auto</div>
    <div class="callout flex-child-shrink">Shrink</div>
  </div>
  <div class="column">
  </div>
  <div class="column align-self-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</div>
</div>
```

All of these helper classes come in responsive varieties, prefixed with all of your named breakpoints.  So you can do things like

```html_example
  <div class="row">
    <div class="column large-12 flex-container flex-dir-column large-flex-dir-row">
      <div class="callout flex-child-auto">Auto</div>
      <div class="callout flex-child-auto">Auto</div>
      <div class="callout flex-child-shrink large-flex-child-auto">Auto on Large</div>
    </div>
    <div class="column align-self-top">Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?Align top. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non harum laborum cum voluptate vel, eius adipisci similique dignissimos nobis at excepturi incidunt fugit molestiae quaerat, consequuntur porro temporibus. Nisi, ex?</div>
  </div>
```

---

## Helper Mixins

If you're using the Sass version of Foundation, you can access the above helpers as mixins as well.

For parent-level alignment, use `flex-align()`. You can pass in a horizontal alignment (`$x`), vertical alignment (`$y`), or both.

```scss
.container {
  @include flex-align($x: center, $y: stretch);
}
```

For child-level alignment, use `flex-align-self()`. You can pass in any vertical alignment.

```scss
.sidebar {
  @include flex-align-self(bottom);
}
```

Interested in building your own flexbox-ey component? Use the `flex()` mixin to get started.

```scss
.flexish-thang {
  @include flex;
  @include flex-align(center, middle);
}
```
