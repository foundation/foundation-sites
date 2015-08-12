---
title: Base Typography
description: Typography in Foundation 5 is meant to make your life easier by providing clean, attractive, simple default styles for all of the most basic typographical elements.
sass:
  - scss/typography/_base.scss
  - scss/typography/_print.scss
tags:
  - paragraph
  - heading
  - link
  - definition
  - blockquote
  - abbreviation
  - acronym
  - code
  - keystroke
---

## Paragraphs

This is a paragraph. Paragraphs are preset with a font size, line height and spacing to match the overall vertical rhythm. To show what a paragraph looks like this needs a little more content&mdash;so, did you know that there are storms occurring on Jupiter that are larger than the Earth? Pretty cool. Wrap `<strong>` around type to **make it bold!** You can also use `<em>` to *italicize your words*.

```html
<p>This is a paragraph. Paragraphs are preset with a font size, line height and spacing to match the overall vertical rhythm. To show what a paragraph looks like this needs a little more content so, did you know that there are storms occurring on Jupiter that are larger than the Earth? Pretty cool. Wrap strong around type to <strong>make it bold!</strong>. You can also use em to <em>italicize your words</em>.</p>
```

---

## Heading

Foundation includes styles for all of the headings elements&mdash;they're balanced and sized along a modular scale.

```html_example
<h1>h1. This is a very large header.</h1>
<h2>h2. This is a large header.</h2>
<h3>h3. This is a medium header.</h3>
<h4>h4. This is a moderate header.</h4>
<h5>h5. This is a small header.</h5>
<h6>h6. This is a tiny header.</h6>
```

---

### Small Header Segments

By inserting a `<small>` element into a header Foundation will scale the header font size down for an inline element, allowing you to use this for subtitles or other secondary header text.

```html_example
<h3>Foundation for Sites <small>Version 6.0.0</small></h3>
```

---

## Links

Links are very standard, and the [color is preset](http://www.youtube.com/watch?v=zT2aVoUkSDg) to the Foundation primary color. To make links screen reader-friendly, avoid using vague words like "here" within link text.

```html
<p>Links are very standard, and the <a href="http://www.youtube.com/watch?v=zT2aVoUkSDg">color is preset</a> to the Foundation primary color.</p>
```

---

## Dividers

Use dividers to separate sections of a page.

```html_example
<hr>
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

Sometimes other people say smart things, and you may want to mention those things with a quote. We've got you covered.

```html_example
<blockquote>
  Those people who think they know everything are a great annoyance to those of us who do.
  <cite>Isaac Asimov</cite>
</blockquote>
```

---

## Abbreviations and Acronyms

Use the `<abbr>` and `<acronym>` tags to annotate a shortened term. These elements must always have a `title` attribute which clarifies the full term.

What's the difference between an abbreviation and an acronym? An abbreviation is a shortened spelling of a word, while an acronym is a set of initials that represent a longer word or phrase.

```html_example
<p>In my dream last night, I saw <acronym title="John Ronald Reuel">J. R. R.</acronym> Tolkien and George <acronym title="Raymond Richard">R. R.</acronym> Martin hanging out on Sunset <abbr title="Boulevard">Blvd</abbr>.</p>
```

---

## Code

Format references to code with the `<code>` tag.

```html_example
Remember to escape angle brackets when printing HTML: <code>&lt;div&gt;</code>
```

---

## Keystrokes

Use the `<kbd>` element to annotate a key stroke or combination.

```html_example
<p>Press <kbd>Cmd+Q</kbd> (or <kbd>Ctrl+Q</kbd> on Windows) to play Half-Life 3.</p>
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

When possible, use the `rem` and `em` units to size everything. Not just font size, but also padding, margins, and any length value. This ensures that your design scales up and down uniformly if the user changes their browser's text size.

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
- Adding borders to `<blockquote>` and `<pre>` elements
- Page cleanup and window minimization

On top of that, Foundation includes a couple of simple classes you can use to control elements printing, or not printing. Simply attach `.show-for-print` to an element to only show when printing, and `.hide-for-print` to hide something when printing.
