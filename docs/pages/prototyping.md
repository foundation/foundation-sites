---
title: Prototyping Utilities
description: Utility Toolkit for quickly fleshing out the skeletal sketches and mockups into hi-fi prototype's
sass:
  - scss/prototype/*.scss
---

Prototyping utilities helps you to make prototypes from simple sketches and mockups quickly. Foundation provides you with a utility toolkit that you can use for your prototyping project and quickly create a fully-functional and responsive prototypes. Just fire in these simple and reusable classes and you are done.

At the same time, we also understand that prototypes are not always required for every single projects and there are many cases specially in bigger projects where you have the time to show up your skill with both design &amp; code and so, prototype mode is **disabled by default!** 

<div class="primary callout">
	<p>Many Prototype classes use `!important` to ensure that these they aren't overriden by more specific selectors. This framework conscientiously avoids using `!important` declarations. Please note that we have only inserted `!important` on those specific **CSS** properties which we are fully sure that values of those properties shouldn't be overridden.</p>
</div> 

---

## Enabling Prototype Mode

If you're using the CSS version of Foundation, you can generate a <a href="https://foundation.zurb.com/sites/download">custom download of Foundation</a> with prototype mode enabled. If you're using the Sass version of Foundation, you can enable prototype mode in two ways:

If you use the `foundation-everything()` mixin in your main Sass file, just pass in `$prototype: true` to enable the prototype mode.

```scss
@include foundation-everything($prototype: true);
```

If you included each component manually (like our starter projects do), open up your main **scss** file and simply add

```scss
@include foundation-prototype-classes;
```
or, if you looking for specific utility instead of all, these helper classes can be included individually like. Also, for your ease full list is also included below.

```scss
@include foundation-prototype-typescale;
@include foundation-prototype-text-utilities;
@include foundation-prototype-text-transformation;
@include foundation-prototype-text-decoration;
@include foundation-prototype-font-styling;
@include foundation-prototype-list-style-type;
@include foundation-prototype-rounded;
@include foundation-prototype-bordered;
@include foundation-prototype-overflow;
@include foundation-prototype-display;
@include foundation-prototype-position;
@include foundation-prototype-border-box;
@include foundation-prototype-sizing;
@include foundation-prototype-spacing;
```

Looking for more customization including **responsive breakpoints?** Click here for the [Sass Reference](#sass-reference)

---

## Rounded & Bordered

These `.rounded` & `.bordered` classes helps to make an element round its corners and give light borders respectively. This will help you quickly style the borders of an element. Mostly used in buttons, images, cards, tables and many more

#### Buttons

```html_example
<button type="button" class="button rounded bordered primary">Primary</button>
<button type="button" class="button rounded bordered secondary">Secondary</button>
<button type="button" class="button rounded bordered success">Success</button>
<button type="button" class="button rounded bordered alert">Alert</button>
<button type="button" class="button rounded bordered warning">Warning</button>
```

#### Images

```html
<img src="" class="rounded">
<img src="" class="rounded-circle">
``` 

<div class="docs-code-live margin-bottom-1">
	<img src="http://placehold.it/100x100" class="rounded margin-right-1">
	<img src="http://placehold.it/100x100" class="rounded-circle">
</div>

#### Cards

```html
<div class="rounded bordered card">
  <img src="assets/img/generic/rectangle-1.jpg">
  <div class="card-divider">
    Rounded Card
  </div>
  <div class="card-section">
    <h4>This is a card.</h4>
    <p>It has an easy to override visual style, and is appropriately subdued.</p>
  </div>
</div>
```

<div class="docs-code-live">
	<div class="row">
		<div class="small-4 columns">
			<div class="rounded bordered card">
			  <img src="assets/img/generic/rectangle-1.jpg">
			  <div class="card-divider">
			    Rounded Card
			  </div>
			  <div class="card-section">
			    <h4>This is a card.</h4>
			    <p>It has an easy to override visual style, and is appropriately subdued.</p>
			  </div>
			</div>
		</div>
		<div class="small-4 columns">
			<div class="rounded bordered card">
			  <img src="assets/img/generic/rectangle-1.jpg">
			  <div class="card-divider">
			    Rounded Card
			  </div>
			  <div class="card-section">
			    <h4>This is a card.</h4>
			    <p>It has an easy to override visual style, and is appropriately subdued.</p>
			  </div>
			</div>
		</div>
		<div class="small-4 columns">
			<div class="rounded bordered card">
			  <img src="assets/img/generic/rectangle-1.jpg">
			  <div class="card-divider">
			    Rounded Card
			  </div>
			  <div class="card-section">
			    <h4>This is a card.</h4>
			    <p>It has an easy to override visual style, and is appropriately subdued.</p>
			  </div>
			</div>
		</div>
	</div>
</div>

#### Tables

```html
<table class="rounded bordered">
	<!-- My Table goes here -->
</table>
```

<div class="docs-code-live">
	<table class="rounded bordered">
	  <thead>
	    <tr>
	      <th width="200">Table Header</th>
	      <th>Table Header</th>
	      <th width="150">Table Header</th>
	      <th width="150">Table Header</th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td>Content Goes Here</td>
	      <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
	      <td>Content Goes Here</td>
	      <td>Content Goes Here</td>
	    </tr>
	    <tr>
	      <td>Content Goes Here</td>
	      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
	      <td>Content Goes Here</td>
	      <td>Content Goes Here</td>
	    </tr>
	    <tr>
	      <td>Content Goes Here</td>
	      <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
	      <td>Content Goes Here</td>
	      <td>Content Goes Here</td>
	    </tr>
	    <tr>
	      <td>Content Goes Here</td>
	      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
	      <td>Content Goes Here</td>
	      <td>Content Goes Here</td>
	    </tr>
	  </tbody>
	</table>
</div>

---

## Font Styling

You can use font styling to style your text. You can change the font styling by adding `font-normal`, `font-bold`, `font-italic` to an element. You can also wider the text of an element with `font-wide`.

```html_example
<p class="font-wide">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
<p class="font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p class="font-bold">Perspiciatis tempore cumque, magni aspernatur, quidem. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
<p class="font-italic">Lorem minus, placeat, cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.iure voluptas aliquam tempora neque?</p>
``` 

---

## Typescale

Adjust font-size by overriding an element’s default size.

```html_example
<p class="h1">Lorem Ipsum Dolor</p>
<p class="h2">Lorem Ipsum Dolor</p>
<p class="h3">Lorem Ipsum Dolor</p>
<p class="h4">Lorem Ipsum Dolor</p>
<p class="h5">Lorem Ipsum Dolor</p>
<p class="h6">Lorem Ipsum Dolor</p>
```

---

## List Styling

<div class="primary callout">
	Please note that [Unbulleted lists](typography-helpers.html#un-bulleted-list), `.no-bullets` is enabled by default for both ordered and unordered lists.
</div>

#### Unordered Lists

```html
<ul class="no-bullets"></ul>
<ul class="list-disc"></ul>
<ul class="list-circle"></ul>
<ul class="list-square"></ul>
``` 

#### Ordered Lists

```html
<ol class="no-bullets"></ol>
<ol class="list-decimal"></ol>
<ol class="list-lower-alpha"></ol>
<ol class="list-lower-latin"></ol>
<ol class="list-lower-roman"></ol>
<ol class="list-upper-alpha"></ol>
<ol class="list-upper-latin"></ol>
<ol class="list-upper-roman"></ol>
``` 

---

## Margin Helper Classes

Generate spaces around the element with these easy to use margin classes. 

<div class="primary callout">
	Please note that here below, `1 = 1 * $global-margin` and so on. By default `$global-margin` is equal to `1rem` which you can easily customize through [Sass Variables](#sass-variables).
</div>

#### Margin (All Sides)

```html
<div class="margin-0"></div>
<div class="margin-1"></div>
<div class="margin-2"></div>
<div class="margin-3"></div>
``` 

#### Margin Top

```html
<div class="margin-top-0"></div>
<div class="margin-top-1"></div>
<div class="margin-top-2"></div>
<div class="margin-top-3"></div>
``` 

#### Margin Bottom

```html
<div class="margin-bottom-0"></div>
<div class="margin-bottom-1"></div>
<div class="margin-bottom-2"></div>
<div class="margin-bottom-3"></div>
``` 

#### Margin Left

```html
<div class="margin-left-0"></div>
<div class="margin-left-1"></div>
<div class="margin-left-2"></div>
<div class="margin-left-3"></div>
``` 

#### Margin Right

```html
<div class="margin-right-0"></div>
<div class="margin-right-1"></div>
<div class="margin-right-2"></div>
<div class="margin-right-3"></div>
``` 

#### Margin Left Right (Horizontal Axis)

```html
<div class="margin-horizontal-0"></div>
<div class="margin-horizontal-1"></div>
<div class="margin-horizontal-2"></div>
<div class="margin-horizontal-3"></div>
``` 

#### Margin Top Bottom (Vertical Axis)

```html
<div class="margin-vertical-0"></div>
<div class="margin-vertical-1"></div>
<div class="margin-vertical-2"></div>
<div class="margin-vertical-3"></div>
``` 

#### Margin: Usage as a Mixin

```scss
.foo {
  @include margin(1, 0, 2, null);
}
```

This above code will generate the below output 

```scss
.foo {
  margin-top: 1rem !important;
  margin-right: 0rem !important;
  margin-bottom: 2rem !important;
}
```

See how `margin-left` wasn't printed as this mixin also accept `null` as a value. Sass Reference [here](#margin)

---

## Padding Helper Classes

Generate spaces around the content with these easy to use padding classes.

<div class="primary callout">
	Please note that here below, `1 = 1 * $global-padding` and so on. By default `$global-padding` is equal to `1rem` which you can easily customize through [Sass Variables](#sass-variables).
</div>

#### Padding (All Sides)

```html
<div class="padding-0"></div>
<div class="padding-1"></div>
<div class="padding-2"></div>
<div class="padding-3"></div>
``` 

#### Padding Top

```html
<div class="padding-top-0"></div>
<div class="padding-top-1"></div>
<div class="padding-top-2"></div>
<div class="padding-top-3"></div>
``` 

#### Padding Bottom

```html
<div class="padding-bottom-0"></div>
<div class="padding-bottom-1"></div>
<div class="padding-bottom-2"></div>
<div class="padding-bottom-3"></div>
``` 

#### Padding Left

```html
<div class="padding-left-0"></div>
<div class="padding-left-1"></div>
<div class="padding-left-2"></div>
<div class="padding-left-3"></div>
``` 

#### Padding Right

```html
<div class="padding-right-0"></div>
<div class="padding-right-1"></div>
<div class="padding-right-2"></div>
<div class="padding-right-3"></div>
``` 

#### Padding Left Right (Horizontal Axis)

```html
<div class="padding-horizontal-0"></div>
<div class="padding-horizontal-1"></div>
<div class="padding-horizontal-2"></div>
<div class="padding-horizontal-3"></div>
``` 

#### Padding Top Bottom (Vertical Axis)

```html
<div class="padding-vertical-0"></div>
<div class="padding-vertical-1"></div>
<div class="padding-vertical-2"></div>
<div class="padding-vertical-3"></div>
``` 

#### Padding: Usage as a Mixin

```scss
.bar {
  @include padding(1, 0, 2, null);
}
```

This above code will generate the below output 

```scss
.bar {
  padding-top: 1rem !important;
  padding-right: 0rem !important;
  padding-bottom: 2rem !important;
}
```

See how `padding-left` wasn't printed as this mixin also accept `null` as a value. Sass Reference [here](#padding)

---

## Sizing

These width and height classes helps you to easily make an element as wide or as tall as per your need relative to its parent. By default it only supports `25%`, `50%`, `75%` and `100%`. You can add more sizes though, through Sass Variables.

#### Width

```html
<div class="width-25"></div>
<div class="width-50"></div>
<div class="width-75"></div>
<div class="width-100"></div>

<div class="max-width-100"></div>
``` 

#### Height

```html
<div class="height-25"></div>
<div class="height-50"></div>
<div class="height-75"></div>
<div class="height-100"></div>

<div class="max-height-100"></div>
``` 

---

## Border box 

Border box lets you only add the content, padding and border, but not the margin within the width and height css properties.

```html
<div class="border-box"></div>
``` 

---

## Display Classes

Display classes helps to display the elements in specific positions inside any other HTML elements.

```html
<div class="display-none"></div>
<div class="display-inline"></div>
<div class="display-inline-block"></div>
<div class="display-block"></div>
``` 

By default, we have just added the most used display classes. but as you would know, there are many other display classes as specified by MDN [here](https://developer.mozilla.org/en-US/docs/Web/CSS/display). If you need some of those classes, then you can add them easily through Sass variables with `$prototype-display`. Sass Reference [here](#sass-reference)

---

## Positioning

Positioning is very helpful and basic need for complex layouts. 

```html
<div class="position-static"></div>
<div class="position-relative"></div>
<div class="position-absolute"></div>
<div class="position-fixed"></div>
<div class="position-fixed-top"></div>
<div class="position-fixed-bottom"></div>
``` 

#### Positioning: Usage as a Mixin

```scss
.foo {
  @include position(fixed, 1, 2, 0, null);
}
```

This above code will generate the below output 

```scss
.foo {
  position: fixed !important;
  top: 1rem !important;
  right: 2rem !important;
  bottom: 0rem !important; 
}
```

See how `left` offset wasn't printed as this mixin also accept `null` as a value. Sass Reference [here](#position)

---

## Overflow

These overflow classes helps you to clip content, render scrollbars or simply just display the content when it overflows its block level container. 

#### All sides 

```html
<div class="overflow-visible"></div>
<div class="overflow-hidden"></div>
<div class="overflow-scroll"></div>
``` 

#### Horizontal Axis

```html
<div class="overflow-x-visible"></div>
<div class="overflow-x-hidden"></div>
<div class="overflow-x-scroll"></div>
``` 

#### Vertical Axis

```html
<div class="overflow-y-visible"></div>
<div class="overflow-y-hidden"></div>
<div class="overflow-y-scroll"></div>
``` 

---

## Image Replacement

You might want to include a logo on the page but you also would like to use a text within a header tag for the sake of accessibility and also for gaining benifits from SEO, and ideally on the webpage you would like to show your logo and not text. In that scenario you can utilize this `.text-hide` class to replace an element’s text content with a background image, often logo.

```html_example
<a href="" class="text-hide">
  <img src="assets/img/logos/zurb-logo.svg">
  Zurb <!-- Logo Text  -->
</a>
```

---

## Text Helpers

### Text Transformation

Text transformation lets you control the capitalization of text. You can change the text transformation by adding `.text-uppercase`, `text-lowercase`, `text-capitalize` to an element. 

```html
<p class="text-uppercase"><!-- Text here --></p>
<p class="text-lowercase"><!-- Text here --></p>
<p class="text-capitalize"><!-- Text here --></p>
``` 

<p class="text-uppercase"><strong>This is a upper-cased text.</strong> Set in the year 0 F.E. ("Foundation Era"), The Psychohistorians opens on Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire.</p>

<p class="text-lowercase"><strong>This is a lower-cased text.</strong> Set in the year 0 F.E. ("Foundation Era"), The Psychohistorians opens on Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire.</p>

<p class="text-capitalize"><strong>This is a caPitAlized teXt.</strong> Set in the yEar 0 F.E. ("Foundation Era"), The PsychohisTorians opens on Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire.</p>

Note how `text-capitalize` just changes the first letter of every single word, leaving the case of other letters unaffected.

---

### Text Decoration

Text Decoration can be used to underline, overline, or line-through a text. You can change the text decoration by adding `.text-underline`, `text-overline`, `text-line-through` to an element.

```html
<p class="text-underline">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
<p class="text-overline">Perspiciatis tempore cumque, magni aspernatur, quidem</p>
<p class="text-line-through">Lorem minus, placeat, iure voluptas aliquam tempora neque?</p>
``` 

---

### Text Truncate

The `text-truncate` displays an elipsis when the text must be in a single straight line that should overflows a box where overflow is hidden. See how in example the content did not crossed the first line!

```html_example
<p class="text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 

---

### Text No-wrap

If you would like to prevent the text wrapping into the next line you can utilize `text-nowrap`. Please note that the text will continue to be in same line unless the `<br/>` tag is used.

```html
<p class="text-nowrap">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 

### Text Wrap

Oppositely, if you are looking for text wrapping into the next line, you can use `text-wrap`.

```html
<p class="text-wrap">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 

---

## Vanilla Mixin Helpers 

We also provides some extra utility mixins that you can use for your next prototype project.

### Box Mixin

This mixin helps you to easily create a square, rectangle or a circle. Sass Reference [here](#box)

```scss 
.foo {
	@include box(1rem, 2rem); // Rectangle
}
.bar {
	@include box(1rem); // Square
}
.baz {
	@include box(1rem, $circle: true); // Circle
}
``` 

### Relational Mixins

These relational mixins helps you to manage styling of :nth-child’ified elements through easy Sass mixins.

```scss
@include first($num) {} 
@include first-child {}
@include last($num) {}
@include last-child {}
@include every($num) {}
@include first-last {}
@include after-first($num) {}
@include from-last($num) {}
@include from-first-last($num) {}
@include all-but($num) {}
@include all-but-first-last($num) {}
@include unique {}
@include not-unique {}
@include between($first, $last) {}
@include even {}
@include even-between($first, $last) {}
@include odd {}
@include odd-between($first, $last) {}
@include number-between($num, $first, $last) {}
```
