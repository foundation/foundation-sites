---
title: Prototyping Utilities
description: Our prototyping utilities allow you to quickly flesh out the skeletal sketches and turn them into hi-fi wireframes.
sass:
  - scss/prototype/*.scss
---

Prototyping utilities helps you to make prototypes from simple sketches and mockups quickly. Foundation provides you with a utility toolkit that you can use for your prototyping project and quickly create a fully-functional and responsive prototypes. Just fire in these simple and reusable classes and you are done.

At the same time, we also understand that prototypes are not always required for every single projects and there are many cases specially in bigger projects where you have the time to show up your skill with both design &amp; code and so, prototype mode is **disabled by default!**  

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
or, if you looking for specific utility instead of all, these helper classes can be included individually like.

```scss
// Text utilities
@include foundation-prototype-text-utilities;
// Text transformation classes
@include foundation-prototype-text-transformation;
// Display classes
@include foundation-prototype-display;
// Position Helpers
@include foundation-prototype-sizing;
// Spacing Utilities
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
<img src="" class="rounded-top">
<img src="" class="rounded-right">
<img src="" class="rounded-bottom">
<img src="" class="rounded-left">
``` 

<div class="docs-code-live m-b-20">
	<img src="http://placehold.it/100x100" class="rounded m-r-10">
	<img src="http://placehold.it/100x100" class="rounded-circle m-r-10">
	<img src="http://placehold.it/100x100" class="rounded-top m-r-10">
	<img src="http://placehold.it/100x100" class="rounded-right m-r-10">
	<img src="http://placehold.it/100x100" class="rounded-bottom m-r-10">
	<img src="http://placehold.it/100x100" class="rounded-left m-r-10">
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

## Font Typescale

Adjust font-size by overriding an element’s default size.

```html_example
<p class="font-h1">Lorem Ipsum Dolor</p>
<p class="font-h2">Lorem Ipsum Dolor</p>
<p class="font-h3">Lorem Ipsum Dolor</p>
<p class="font-h4">Lorem Ipsum Dolor</p>
<p class="font-h5">Lorem Ipsum Dolor</p>
<p class="font-h6">Lorem Ipsum Dolor</p>
```

---

## List Styling

<div class="primary callout">
	Please note that [Unbulleted lists](typography-helpers.html#un-bulleted-list), `.no-bullets` is enabled by default for both ordered and unordered lists.
</div>

#### Unordered Lists

```html
<ul class="no-bullets"> <!-- <li>First</li> <li>Second</li> --></ul>
<ul class="list-disc">  <!-- <li>First</li> <li>Second</li> --></ul>
<ul class="list-circle"><!-- <li>First</li> <li>Second</li> --></ul>
<ul class="list-square"><!-- <li>First</li> <li>Second</li> --></ul>
``` 

#### Ordered Lists

```html
<ol class="no-bullets">      <!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-decimal">    <!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-lower-alpha"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-lower-latin"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-lower-roman"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-upper-alpha"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-upper-latin"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-upper-roman"><!-- <li>First</li> <li>Second</li> --></ol>
``` 

---

## Margin Helper Classes

Generate spaces around the element with these easy to use margin classes.

#### Margin (All Sides)

```html
<div class="m-a-0"></div>
<div class="m-a-10"></div>
<div class="m-a-20"></div>
<div class="m-a-30"></div>
<div class="m-a-40"></div>
<div class="m-a-50"></div>
``` 

#### Margin Top

```html
<div class="m-t-0"></div>
<div class="m-t-10"></div>
<div class="m-t-20"></div>
<div class="m-t-30"></div>
<div class="m-t-40"></div>
<div class="m-t-50"></div>
``` 

#### Margin Bottom

```html
<div class="m-b-0"></div>
<div class="m-b-10"></div>
<div class="m-b-20"></div>
<div class="m-b-30"></div>
<div class="m-b-40"></div>
<div class="m-b-50"></div>
``` 

#### Margin Left

```html
<div class="m-l-10"></div>
<div class="m-l-20"></div>
<div class="m-l-30"></div>
<div class="m-l-40"></div>
<div class="m-l-50"></div>
``` 

#### Margin Right

```html
<div class="m-r-0"></div>
<div class="m-r-10"></div>
<div class="m-r-20"></div>
<div class="m-r-30"></div>
<div class="m-r-40"></div>
<div class="m-r-50"></div>
``` 

#### Margin Left Right (Horizontal Axis)

```html
<div class="m-x-0"></div>
<div class="m-x-10"></div>
<div class="m-x-20"></div>
<div class="m-x-30"></div>
<div class="m-x-40"></div>
<div class="m-x-50"></div>
``` 

#### Margin Top Bottom (Vertical Axis)

```html
<div class="m-y-0"></div>
<div class="m-y-10"></div>
<div class="m-y-20"></div>
<div class="m-y-30"></div>
<div class="m-y-40"></div>
<div class="m-y-50"></div>
``` 

---

## Padding Helper Classes

Generate spaces around the content with these easy to use padding classes.

#### Padding (All Sides)

```html
<div class="p-a-0"></div>
<div class="p-a-10"></div>
<div class="p-a-20"></div>
<div class="p-a-30"></div>
<div class="p-a-40"></div>
<div class="p-a-50"></div>
``` 

#### Padding Top

```html
<div class="p-t-0"></div>
<div class="p-t-10"></div>
<div class="p-t-20"></div>
<div class="p-t-30"></div>
<div class="p-t-40"></div>
<div class="p-t-50"></div>
``` 

#### Padding Bottom

```html
<div class="p-b-0"></div>
<div class="p-b-10"></div>
<div class="p-b-20"></div>
<div class="p-b-30"></div>
<div class="p-b-40"></div>
<div class="p-b-50"></div>
``` 

#### Padding Left

```html
<div class="p-l-0"></div>
<div class="p-l-10"></div>
<div class="p-l-20"></div>
<div class="p-l-30"></div>
<div class="p-l-40"></div>
<div class="p-l-50"></div>
``` 

#### Padding Right

```html
<div class="p-r-0"></div>
<div class="p-r-10"></div>
<div class="p-r-20"></div>
<div class="p-r-30"></div>
<div class="p-r-40"></div>
<div class="p-r-50"></div>
``` 

#### Padding Left Right (Horizontal Axis)

```html
<div class="p-x-0"></div>
<div class="p-x-10"></div>
<div class="p-x-20"></div>
<div class="p-x-30"></div>
<div class="p-x-40"></div>
<div class="p-x-50"></div>
``` 

#### Padding Top Bottom (Vertical Axis)

```html
<div class="p-y-0"></div>
<div class="p-y-10"></div>
<div class="p-y-20"></div>
<div class="p-y-30"></div>
<div class="p-y-40"></div>
<div class="p-y-50"></div>
``` 

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

## Display Classes

Display classes helps to display the elements in specific positions inside any other HTML elements.

```html
<div class="display-none"></div>
<div class="display-inline"></div>
<div class="display-inline-block"></div>
<div class="display-block"></div>
``` 

By default, we have just added the most used display classes. but as you would know, there are many other display classes as specified by MDN [here](https://developer.mozilla.org/en-US/docs/Web/CSS/display). If you need some of those classes, then you can add them easily through Sass variables with `$prototype-display-classes`. Sass Reference [here](#sass-reference)

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

## Text Transformation

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

## Text Decoration

Text Decoration can be used to underline, overline, or line-through a text. You can change the text decoration by adding `.text-underline`, `text-overline`, `text-line-through` to an element.

```html
<p class="text-underline">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
<p class="text-overline">Perspiciatis tempore cumque, magni aspernatur, quidem</p>
<p class="text-line-through">Lorem minus, placeat, iure voluptas aliquam tempora neque?</p>
``` 

---

## Text Truncate

The `text-truncate` displays an elipsis when the text must be in a single straight line that should overflows a box where overflow is hidden. See how in example the content did not crossed the first line!

```html_example
<p class="text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 

---

## Text Wrapping

#### Text No-wrap

If you would like to prevent the text wrapping into the next line you can utilize `text-nowrap`. Please note that the text will continue to be in same line unless the `<br/>` tag is used.

```html
<p class="text-nowrap">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 

#### Text Wrap

Oppositely, if you are looking for text wrapping into the next line, you can use `text-wrap`.

```html
<p class="text-wrap">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 
