---
title: Flexbox
description: For browsers with cutting-edge support, some of Foundation's key components have been converted to flexbox.
sass:
  - scss/components/_flex.scss
  - scss/util/_flex.scss
previous:
  url: rtl.html
  title: Right-to-Left Support
next:
  url: sass.html
  title: Sass
flexbox:
  - scss/util/_flex.scss
videos:
  -
    title: Flexbox Utility Classes
    desc: Learn how to use Flexbox Utility Classes
    url: https://www.youtube.com/embed/o1D1iPagm68
  -
    title: Flexbox and Cards
    desc: Learn how to use Flexbox Utility Classes with Foundation Cards
    url: https://www.youtube.com/embed/Du7rwO4y564
  -
    title: Intro to Flexbox
    desc: Foundation Flexbox Meetup at ZURB HQ
    url: https://www.youtube.com/embed/lqUORRmKOmI
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

If you included each component manually (like our starter projects do), open your settings file (basic template: scss/_settings.scss, ZURB template: src/assets/scss/_settings.scss) and set `$global-flexbox` to `true`, and remove the `@include` for the float grid and replace it with the one for the flex grid, along with the helper classes (basic template: scss/app.scss, ZURB Stack: src/assets/scss/app.scss).

In `app.scss`, comment out the standard grid and the float classes:

```scss
// @include foundation-grid;
@include foundation-flex-grid;

// @include foundation-float-classes;
@include foundation-flex-classes;
```

In the `_settings.scss` file, activate Flexbox components:

```scss
$global-flexbox: true;
```

You have now activated Flex-mode!

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
  <p>Note that with vertical alignment, we use the term "middle" for the midpoint, while with horizontal alignment, we use the term "center". Otherwise, we'd have two CSS classes with the same name, but different functionality.</p>
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

---

## Related Resources

Some releated resources for using {{title}}.

<div class="row small-up-1 medium-up-2 large-up-3 thumb-row">

  <div class="column">
    <a href="http://zurb.com/university/lessons/solving-problems-using-flexbox-vertical-alignment" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/learn/training/tuts-grid-basics-mobile-first.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, GRID, LAYOUT, Flexbox</h5>
      <p class="thumb-description" target="_blank">Solving problems using Flexbox - Vertical Alignment<span class="thumb-author">Rafi - Foundation Team</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/introduction-to-the-foundation-grid.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-grid-jamesstone.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, GRID, LAYOUT, Flexbox</h5>
      <p class="thumb-description">Foundation's Flexbox Cards to Win the Game<span class="thumb-author">Rafi - Foundation Team</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/getting-started-with-foundation-6-gary-jennings.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-intro-jenning.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, DOWNLOAD, CSS</h5>
      <p class="thumb-description">Getting Started with Foundation 6<span class="thumb-author">Gary Jennings</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/getting-started-with-foundation-6-gary-jennings.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-intro-jenning.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, CSS, INSTALL, PROJECT STRUCTURE</h5>
      <p class="thumb-description">Setting Up Your Foundation 6 Project<span class="thumb-author">Gary Jennings</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/foundation-6-source-ordering-buttons.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/learn/training/tuts-grid-source-ordering-buttons.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, GRID, LAYOUT, CSS</h5>
      <p class="thumb-description">Prototyping with Foundation 6 Grid Source Ordering and Buttons<span class="thumb-author">Tim - Foundation Team</span></p>
    </a>
  </div>

  <div class="column">
    <a href="https://scotch.io/tutorials/get-to-know-the-flexbox-grid-in-foundation-6" target="_blank">
      <p class="thumb-description">Get to Know the Flexbox Grid in Foundation 6<span class="thumb-author">By Chris Sevilleja of Scotch.io</span></p>
    </a>
  </div>

</div>

<div class="text-center">
  <a href="http://zurb.com/university/lessons" class="button-docs secondary">See More Tutorials</a>
</div>

<!-- ## Inspiration

Get inspired by the Foundation community to see what you can do with this component in your own work.

<div class="docs-examples small-up-2 medium-up-2 large-up-5 row">

  <div class="section-inspiration column">
    <div class="image-container">
      <a target="_blank" href="http://zurb.com/responsive/site/pacific-sunwear-golden-state-of-mind">
        <img src="https://prod-university-library.s3.amazonaws.com/uploads/site/mobile_screenshot/17455/Screen_Shot_2015-09-01_at_10.09.27_AM.png" alt="" />
      </a>
    </div>
    <h5>Pacific Sunwear</h5>
    <p>Pacific Sunwear loves diversity and adventure so they created a portal for people to discover both &hellip;</p>
    <a target="_blank" href="http://zurb.com/responsive/site/whirlpool" class="secondary button-docs">Take a look <i class="di-arrow-right di-margin-left"></i></a>
  </div>
  <div class="section-inspiration column">
    <div class="image-container">
      <a target="_blank" href="http://zurb.com/responsive/site/whirlpool">
        <img src="https://prod-university-library.s3.amazonaws.com/uploads/site/mobile_screenshot/18066/Screen_Shot_2016-12-12_at_11.50.44_AM.png" alt="" />
      </a>
    </div>
    <h5>Whirlpool</h5>
    <p>Studies show that more and more shoppers are looking online while shopping in stores for product details &hellip;</p>
    <a target="_blank" href="http://zurb.com/responsive/site/whirlpool" class="secondary button-docs">Take a look <i class="di-arrow-right di-margin-left"></i></a>
  </div>
  <div class="section-inspiration column">
    <div class="image-container">
      <a target="_blank" href="http://zurb.com/responsive/site/lamborghini">
        <img src="https://prod-university-library.s3.amazonaws.com/uploads/site/mobile_screenshot/17915/Screen_Shot_2016-10-18_at_4.10.15_PM.png" class="" height="" width="" alt="">
      </a>
    </div>
    <h5>Lamborghini</h5>
    <p>Since 1963, Lamborghini has been building exotic sports cars with elegant interiors. Form has always gone hand &hellip;</p>
    <a target="_blank" href="http://zurb.com/responsive/site/whirlpool" class="secondary button-docs">Take a look <i class="di-arrow-right di-margin-left"></i></a>
  </div>
  <div class="section-inspiration column">
    <div class="image-container">
      <a target="_blank" href="http://zurb.com/responsive/site/sonos-ad8b6113-9320-4a48-a6de-3e56352a1293">
        <img src="https://prod-university-library.s3.amazonaws.com/uploads/site/mobile_screenshot/17902/Screen_Shot_2016-10-12_at_12.39.02_PM.png" alt="" />
      </a>
    </div>
    <h5>Sonos</h5>
    <p>Ever since launching their their hot new responsive website, Sonos has seen mobile usage just skyrocket &hellip;</p>
    <a target="_blank" href="http://zurb.com/responsive/site/whirlpool" class="secondary button-docs">Take a look <i class="di-arrow-right di-margin-left"></i></a>
  </div>
  <div class="section-inspiration column">
    <div class="image-container">
      <a target="_blank" href="http://zurb.com/responsive/site/pressed-juicery">
        <img src="https://prod-university-library.s3.amazonaws.com/uploads/site/mobile_screenshot/16728/Screen_Shot_2016-02-04_at_8.38.56_PM.png" alt="" />
      </a>
    </div>
    <h5>Pressed Juicery</h5>
    <p>Fresh juice is a fast growing industry, and Pressed Juicery has a gorgeous responsive website to stay at the &hellip;</p>
    <a target="_blank" href="http://zurb.com/responsive/site/whirlpool" class="secondary button-docs">Take a look <i class="di-arrow-right di-margin-left"></i></a>
  </div>
</div>

<div class="text-center">
  <a href="http://zurb.com/responsive" class="button-docs secondary">View More Sites Built with Foundation</a>
</div> -->
