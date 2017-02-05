---
title: Prototyping Utilities
description: Our prototyping utilities allow you to quickly flesh out the skeletal sketches and turn them into hi-fi wireframes.
sass:
  - scss/prototype/*.scss
---

It doesn't matter if you are a designer or a developer. Whether, you are a beginner or you have been around, you will be needing some prototyping utilities for making hi-fi wireframes, landing pages or doing some urgent work that needs to be done quickly. Foundation provides you with a utility toolkit that you can use for your next prototyping project and quickly create a fully-functional and responsive prototypes from simple sketches and mockups. Just fire in these simple and reusable classes and you are done.

At the same time, we also understand that prototypes are not always required for every single projects and there are many cases specially in bigger projects where you have the time to show up your skill with both design &amp; code and so, prototype mode is **disabled by default!**  

---

## Enabling Prototyping Mode

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

Looking for example, Here is the <a href="http://codepen.io/IamManchanda/pen/OWEvmj">Codepen</a>

---

## Font Styling

You can use font styling to style a text. You can change the font styling by adding `font-normal`, `font-bold`, `font-italic` to an element.

```html_example
<p class="font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<p class="font-bold">Perspiciatis tempore cumque, magni aspernatur, quidem. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse</p>
<p class="font-italic">Lorem minus, placeat, cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.iure voluptas aliquam tempora neque?</p>
``` 

---

## List Styling


#### Unordered Lists

```html
<ul class="list-none">  <!-- <li>First</li> <li>Second</li> --></ul>
<ul class="list-disc">  <!-- <li>First</li> <li>Second</li> --></ul>
<ul class="list-circle"><!-- <li>First</li> <li>Second</li> --></ul>
<ul class="list-square"><!-- <li>First</li> <li>Second</li> --></ul>
``` 

#### Ordered Lists

```html
<ol class="list-none">       <!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-decimal">    <!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-lower-alpha"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-lower-latin"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-lower-roman"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-upper-alpha"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-upper-latin"><!-- <li>First</li> <li>Second</li> --></ol>
<ol class="list-upper-roman"><!-- <li>First</li> <li>Second</li> --></ol>
``` 

---

## Image Replacement

You might want to include a logo on the page but you also would like to use a text within a header tag for the sake of accessibility and also for gaining benifits from SEO, and ideally on the webpage you would like to show your logo and not text. In that scenario you can utilize this `.text-hide` class to replace an element’s text content with a background image, often logo.

```html
<h1 class="text-hide">Lorem ipsum dolor.</h1> 
``` 

---

## Text Truncate

The `text-truncate` displays an elipsis when the text must be in a single straight line that should overflows a box where overflow is hidden. See how in example the content did not crossed the first line!

```html_example
<p class="text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 

---

## Text Nowrap

If you would like to prevent the text wrapping into the next line you can utilize `text-nowrap`. The sequences of whitespace will collapse into a single whitespace and text will wrap into the next line. Please note that the text will continue to be in same line unless the `<br/>` tag is used.

```html
<p class="text-nowrap">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam voluptatem similique officiis recusandae esse cum in totam quisquam perspiciatis quod! Magnam culpa vitae, tempore eos explicabo cupiditate. Deserunt, quisquam, quos!</p>
``` 

Looking for example, Here is the <a href="http://codepen.io/IamManchanda/pen/egKyov/">Codepen.</a>
