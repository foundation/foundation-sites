---
title: Motion UI
description: A Sass library for creating flexible UI transitions and animations.
---

Motion UI is a standalone library that powers the transition effects used in a number of Foundation components, including [Toggler](toggler.html), [Reveal](reveal.html), and [Orbit](orbit.html). The transitions are powered by special transition classes that the Motion UI Sass creates. For example, here are two instances of Toggler&mdash;one using fade classes (`.fadeIn` and `.fadeOut`), and one using slide classes (`.slideInDown` and `.slideOutUp`).

```html
<div data-toggler data-animate="fadeIn fadeOut" class="callout secondary">
  <p>This panel fades.</p>
</div>

<div data-toggler data-animate="slideInDown slideOutUp" class="callout secondary">
  <p>This panel slides.</p>
</div>
```

<button type="button" class="button" data-toggle="motion-example-1">Fade</button><button type="button" class="button" data-toggle="motion-example-2">Slide</button>
<div class="row">
  <div class="small-6 columns">
    <div data-toggler data-animate="fadeIn fadeOut" class="callout secondary ease" id="motion-example-1">
      <p>This panel <strong>fades</strong>.</p>
    </div>
  </div>
  <div class="small-6 columns">
    <div data-toggler data-animate="slideInDown slideOutUp" class="callout secondary ease" id="motion-example-2">
      <p>This panel <strong>slides</strong>.</p>
    </div>
  </div>
</div>

---

## Installing

**Motion UI is already included in both [starter projects](starter-projects.html).** If you want to add it to an existing project, follow these steps.

First, install the library with npm or Bower.

```bash
npm install motion-ui --save-dev
  bower install motion-ui --save-dev
```

Next, add the path `[modules_folder]/motion-ui/src` to your Sass compiler's import path list. Here's what you would add in Compass, via `config.rb`:

```ruby
add_import_path 'node_modules/motion-ui/src'
```

Here's how it works using gulp-sass:

```js
gulp.src('./src/scss/app.scss')
  .pipe(sass({
    includePaths: ['node_modules/motion-ui/src']
  }));
```

Finally, import the library into your Sass file.

```scss
@import 'motion-ui'
```

---

## Built-in Transitions

Motion UI includes more than two dozen built-in transition classes. They can be enabled by adding this line to your Sass file, after you've imported the library:

```scss
@include motion-ui-transitions;
```

<div>
  <select name="docs-transitions" class="docs-transitions">
    <optgroup label="Slide">
      <option value="slideInDown">slideInDown</option>
      <option value="slideInLeft">slideInLeft</option>
      <option value="slideInUp">slideInUp</option>
      <option value="slideInRight">slideInRight</option>
      <option value="slideOutDown">slideOutDown</option>
      <option value="slideOutLeft">slideOutLeft</option>
      <option value="slideOutUp">slideOutUp</option>
      <option value="slideOutRight">slideOutRight</option>
    </optgroup>
    <optgroup label="Fade">
      <option value="fadeIn">fadeIn</option>
      <option value="fadeOut">fadeOut</option>
    </optgroup>
    <optgroup label="Hinge">
      <option value="hingeInFromTop">hingeInFromTop</option>
      <option value="hingeInFromRight">hingeInFromRight</option>
      <option value="hingeInFromBottom">hingeInFromBottom</option>
      <option value="hingeInFromLeft">hingeInFromLeft</option>
      <option value="hingeInFromMiddleX">hingeInFromMiddleX</option>
      <option value="hingeInFromMiddleY">hingeInFromMiddleY</option>
      <option value="hingeOutFromTop">hingeOutFromTop</option>
      <option value="hingeOutFromRight">hingeOutFromRight</option>
      <option value="hingeOutFromBottom">hingeOutFromBottom</option>
      <option value="hingeOutFromLeft">hingeOutFromLeft</option>
      <option value="hingeOutFromMiddleX">hingeOutFromMiddleX</option>
      <option value="hingeOutFromMiddleY">hingeOutFromMiddleY</option>
    </optgroup>
    <optgroup label="Scale">
      <option value="scaleInUp">scaleInUp</option>
      <option value="scaleInDown">scaleInDown</option>
      <option value="scaleOutUp">scaleOutUp</option>
      <option value="scaleOutDown">scaleOutDown</option>
    </optgroup>
    <optgroup label="Spin">
      <option value="spinIn">spinIn</option>
      <option value="spinOut">spinOut</option>
      <option value="spinInCCW">spinInCCW</option>
      <option value="spinOutCCW">spinOutCCW</option>
    </optgroup>
  </select>
  <img src="assets/img/voyager.jpg" class="docs-transition-demo">
</div>

---

## Custom Transitions

Custom transition classes can be made using Motion UI's mixin library. Here's an example of a custom hinge. **Refer to [Motion UI's transition documentation](https://github.com/zurb/motion-ui/blob/master/docs/transitions.md) to learn more.**

```scss
@include mui-hinge(
  $state: in,
  $from: top,
  $turn-origin: from-back,
  $duration: 0.5s,
  $timing: easeInOut
);
```

---

## Animation

You can use the same five transition effects to create CSS animations as well. The library also allows you to create series effects, with animations on multiple elements happening in a queue. **Refer to [Motion UI's animation documentation](https://github.com/zurb/motion-ui/blob/master/docs/animations.md) to learn more.**

<button type="button" class="button" data-docs-example-series>Play Animation</button>
<div class="row" id="series-example">
  <div class="small-4 columns">
    <img src="//placekitten.com/101/101" class="thumbnail" id="series-example-1">
  </div>
  <div class="small-4 columns">
    <img src="//placekitten.com/101/101" class="thumbnail" id="series-example-2">
  </div>
  <div class="small-4 columns">
    <img src="//placekitten.com/101/101" class="thumbnail" id="series-example-3">
  </div>
</div>
