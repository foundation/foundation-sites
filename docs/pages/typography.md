---
title: Typography
description: Typography in Foundation 5 is meant to make your life easier by providing clean, attractive, simple default styles for all of the most basic typographical elements.
sass: scss/typography/*.scss
---

## Headers

Foundation includes styles for all of the header elements that are balanced and based on a modular scale.

```html_example
<h1>h1. This is a very large header.</h1>
<h2>h2. This is a large header.</h2>
<h3>h3. This is a medium header.</h3>
<h4>h4. This is a moderate header.</h4>
<h5>h5. This is a small header.</h5>
<h6>h6. This is a tiny header.</h6>
```

---

## Subheaders

Lighten up your headers by adding a class of `.subheader` to any header element.

```html_example
<h1 class="subheader">h1.subheader</h1>
<h2 class="subheader">h2.subheader</h2>
<h3 class="subheader">h3.subheader</h3>
<h4 class="subheader">h4.subheader</h4>
<h5 class="subheader">h5.subheader</h5>
<h6 class="subheader">h6.subheader</h6>
```

---

## Small Header Segments

By inserting a `<small>` element into a header Foundation will scale the header font size down for an inline element, allowing you to use this for subtitles or other secondary header text.

```html_example
<h1>h1. <small>Small segment header.</small></h1>
<h2>h2. <small>Small segment header.</small></h2>
<h3>h3. <small>Small segment header.</small></h3>
<h4>h4. <small>Small segment header.</small></h4>
<h5>h5. <small>Small segment header.</small></h5>
<h6>h6. <small>Small segment header.</small></h6>
```

---

## Paragraphs

This is a paragraph. Paragraphs are preset with a font size, line height and spacing to match the overall vertical rhythm. To show what a paragraph looks like this needs a little more content&mdash;so, did you know that there are storms occurring on Jupiter that are larger than the Earth? Pretty cool. Wrap strong around type to **make it bold!** You can also use em to *italicize your words*.

```html
<p>This is a paragraph. Paragraphs are preset with a font size, line height and spacing to match the overall vertical rhythm. To show what a paragraph looks like this needs a little more content so, did you know that there are storms occurring on Jupiter that are larger than the Earth? Pretty cool. Wrap strong around type to <strong>make it bold!</strong>. You can also use em to <em>italicize your words</em>.</p>
```

---

## Text Alignment

You can change the text alignment of an element by adding `.text-left`, `.text-right`, `.text-center` or `.text-justify` to an element.

Adding a breakpoint to the front of a text alignment class will cause it to only be applied on that size screen or larger. For example, `.medium-text-center` will keep text left-aligned on the smallest screens, but switch to center-aligned on medium screens and larger.

```html
<p class="text-left"><!-- ... --></p>
<p class="text-right"><!-- ... --></p>
<p class="text-center"><!-- ... --></p>
<p class="text-justify"><!-- ... --></p>
```

<p class="text-left"><strong>This text is left-aligned.</strong> Set in the year 0 F.E. ("Foundation Era"), The Psychohistorians opens on Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire.</p>

<p class="text-right"><strong>This text is right-aligned.</strong> Set in the year 0 F.E. ("Foundation Era"), The Psychohistorians opens on Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire.</p>

<p class="text-center"><strong>This text is center-aligned.</strong> Set in the year 0 F.E. ("Foundation Era"), The Psychohistorians opens on Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire.</p>

<p class="text-justify"><strong>This text is justified.</strong> Set in the year 0 F.E. ("Foundation Era"), The Psychohistorians opens on Trantor, the capital of the 12,000-year-old Galactic Empire. Though the empire appears stable and powerful, it is slowly decaying in ways that parallel the decline of the Western Roman Empire.</p>

---

## Links

Links are very standard, and the [color is preset](http://www.youtube.com/watch?v=zT2aVoUkSDg) to the Foundation primary color.

```html
<p>Links are very standard, and the <a href="http://www.youtube.com/watch?v=zT2aVoUkSDg">color is preset</a> to the Foundation primary color.</p>
```

---

## Unordered Lists

Use an unordered list to... *list things*, if the order of the items doesn't matter.

```html_example
<ul>
  <li>List item with a much longer description or more content.</li>
  <li>List item</li>
  <li>List item
    <ul>
      <li>Nested list item</li>
      <li>Nested list item</li>
      <li>Nested list item</li>
    </ul>
  </li>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ul>
```

---

In Foundation, the `<ul>` is a bulleted list by default, but you can add the class `.no-bullet` to remove the bullets.

```html_example
<ul class="no-bullet">
  <li>List item with a much longer description or more content.</li>
  <li>List item</li>
  <li>List item
    <ul>
      <li>Nested list item</li>
      <li>Nested list item</li>
      <li>Nested list item</li>
    </ul>
  </li>
  <li>List item</li>
  <li>List item</li>
  <li>List item</li>
</ul>
```

---

## Ordered Lists

Use an `<ol>` when creating a list where the order of the items is important, like ranking pizza toppings from best to worst.

```html_example
<ol>
  <li>Cheese (essential)</li>
  <li>Pepperoni</li>
  <li>Bacon
    <ol>
      <li>Normal bacon</li>
      <li>Canadian bacon</li>
    </ol>
  </li>
  <li>Sausage</li>
  <li>Onions</li>
  <li>Mushrooms</li>
</ol>
```

---

## Definition Lists

A definition list is meant to display name-value pairs, like metadata or a dictionary definition. Each term (`<dt>`) is paired with one or more definitions (`<dd>`)

```html_example
<dl>
  <dt>Time</dt>
  <dd>The indefinite continued progress of existence and events in the past, present, and future regarded as a whole.</dd>
  <dt>Space</dt>
  <dd>A continuous area or expanse that is free, available, or unoccupied.</dd>
</dl>
```

---

## Blockquotes

Sometimes other people say smart things, and you may want to mention that through a blockquote callout. We've got you covered.

```html_example
<blockquote>
  Those people who think they know everything are a great annoyance to those of us who do.
  <cite>Isaac Asimov</cite>
</blockquote>
```

---

## Statistics

If you're building a dashboard, you might need to display some important numbers *real big*. Just add the `.stat` class to any element to amp up the font size.

```html_example
<p>Days without merge conflict</p>
<div class="stat">128</div>
```

---

## Accessibility

Text is core to the content of your page, so making it accessible to everyone is important. Here are some general guidelines to follow.

### Text vs. Images

Prefer using actual text over text inside a graphic. Assistive technologies can't read an image, and the text in an image can't be resized by a browser, like normal text. If an image has text that needs to be read, add it in the `alt` attribute of the image.

```html
<img src="assets/img/buy-now.jpg" alt="Buy now">
```

### Contrast

The contrast between the color of an element's text and its background should be high enough that low-vision users can read it. There are no automated tools that can effectively check this for you, but if you aren't sure about a specific color combination, you can run it through one of many color contrast checkers, such as [WebAIM's color contrast checker](http://webaim.org/resources/contrastchecker/).

Google Chrome's Accessibility Tools also have a contrast checker. By selecting an element in the inspector, you can see if the contrast meets the minimum standards.

*Image of inspector with contrast viewer*

### Type Size

When possible, use the `rem` and `em` units to size everything. Not just font size, but also padding, margins, and any length value. This ensures that your design scales up and down uniformily if the user changes their browser's text size.

We use the `rem` unit nearly everywhere in Foundation, and we wrote a Sass function to make it a little easier. The `rem-calc()` function can take in one or more pixel values and convert them to a proper `rem` value.

```scss
.element {
  width: rem-calc(300);
  padding: rem-calc(10 16);
}
```

### Heading Order

The first heading on a page should be an `<h1>`. Most often, this is the title of the site or page. From there, follow headings in order, from `<h2>` to `<h3>` on down. Lastly, don't skip heading levels. If you need a heading to look bigger or smaller to match a specific style, use CSS to override the default size.

### Emphasis

If the emphasis of a phrase is important, don't make the emphasis purely visual&mdash;use the `<em>` or `<strong>` tags to mark it as well. Both of these tags have built-in styles, but there's no harm in adding additional styles in specific contexts.

### More Resources

- [WebAIM: Fonts](http://webaim.org/techniques/fonts/)
- [WebAIM: Links and HyperText](http://webaim.org/techniques/hypertext/)
- [WebAIM: Writing Clearly and Simply](http://webaim.org/techniques/semanticstructure/)
- [WebAIM: Color Contrast Checker](http://webaim.org/resources/contrastchecker/)

---

## Print Styles

Foundation includes print styles developed by HTML5 Boilerplate to give you some basic print-specific styles. These are activated when you print through a media query. It includes:

- Clearing out backgrounds, box shadows and text shadows
- Appending link URLs after the anchor text
- Bordering blockquotes and pre elements
- Page cleanup and window minimization

On top of that, Foundation includes a couple of simple classes you can use to control elements printing, or not printing. Simply attach `.show-for-print` to an element to only show when printing, and `.hide-for-print` to hide something when printing.