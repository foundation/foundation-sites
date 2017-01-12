---
title: Typography Helpers
description: Our helper classes allow you to scaffold certain typographic styles faster.
sass:
  - scss/typography/_helpers.scss
  - scss/typography/_alignment.scss
  - scss/typography/_dropcaps.scss
tags:
  - alignment
  - subheader
  - dropcaps
  - lead
  - statistic
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

## Subheader

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

## Drop Caps

Add a drop cap of 3 lines to the begining of a paragraph. A dropcap (or Initial) is a letter at the beginning of a word, a chapter, or a paragraph that is larger than the rest of the text.

```html_example
<p class="dropcaps">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</p>
```

<div class="primary callout">
  <p>The initial letter has the best alignment with the paragraph lines for standard `serif` and `sans-serif` fonts like `Helvetica` or `Times New Roman`. The render may differ for fonts with different metrics.</p>
</div>

---

## Lead Paragraph

A slightly-larger-than-normal block of text, useful for decks, blurbs, or other descriptive text.

```html_example
<p class="lead">What are your cats <em>really</em> dreaming about while they sleep?</p>
```

---

## Un-bulleted List

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

## Statistics

If you're building a dashboard, you might need to display some important numbers *real big*. Just add the `.stat` class to any element to amp up the font size.

```html_example
<p>Days without merge conflict</p>
<div class="stat">128</div>
```
