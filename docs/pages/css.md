---
title: CSS
description: Here's the simplest way to get going. The straight CSS version of Foundation includes everything you need to start hacking away, right now! It's a perfect way to kickstart a new prototype or create a finished product with Foundation.
previous:
  url: flexbox.html
  title: Flexbox
next:
  url: javascript.html
  title: JavaScript
videos:
  -
    title: CSS Version
    desc: Getting Started with CSS Version
    url: https://youtu.be/wHSwKCPXFcw
---

## Download and Install

To get going with Foundation, simply download a default or custom CSS package from the download page.

<a target="_blank" href="http://foundation.zurb.com/sites/download.html/" class="button">Download Foundation CSS</a>

<hr>

## Setting Up Your Project

After downloading the css files, follow these simple steps to get started:

### 1

First, after you unzip the package, move the folder to your desired location and open it in a text editor. If you don't have one already, we use <a href="http://www.sublimetext.com/">Sublime Text</a> here at ZURB because it's very customizable, powerful, and simply rocks.


### 2

The `index.html` is your homepage. It has been linked up with foundation.css, normalize, and all the necessary JavaScript files for you. Just add your code between the `<body>` tags.

### 3

Next, you should create a new stylesheet and link it in the header of your HTML file, like so:


```
  <link rel="stylesheet" href="css/foundation.css">

  <!-- This is how you would link your custom stylesheet -->
  <link rel="stylesheet" href="css/app.css">

  <script src="js/vendor/modernizr.js"></script>

</head>
```

<div class="callout"><strong>Note:</strong> At ZURB, we call our custom stylesheets `app.css`. This is important for updating purposes: if you are going to add custom stylings to Foundation components, the code should be copied into your `app.css` file and edited there.</div>

---

## What You Get

When you download the Foundation CSS package, you'll receive a .zip file that contains all the things you need to get started with Foundation. Below we explain every file in detail and how you can add your custom CSS.

<div class="row">
  <div class="medium-6 columns">
    <div class="header-container">
      <h3>Stylesheets</h3>
    </div>
    <ul class="info-list">
      <li>
        <strong>foundation.css</strong>
        <p>The default CSS for Foundation is kept here. You can find the component and its settings there. You will use this file as you are developing because it's easier to read.</p>
      </li>
      <li>
        <strong>foundation.min.css</strong>
        <p>A minified, much smaller CSS file you can use if you don't need or want to pick apart the actual underlying Foundation CSS.</p>
      </li>
      <li>
        <strong>normalize.css</strong>
        <p>We've included a copy of Normalize here to give you the option to remove quirks in browsers so that all webpages render elements consistently. We recommend you use this because some Foundation styles are dependant on it.</p>
      </li>
    </ul>
    <div class="header-container">
      <h3>JavaScript</h3>
    </div>
    <ul class="info-list">
      <li>
        <strong>foundation.min.js</strong>
        <p>If you are using any Foundation JavaScript components, this needs to be loaded on the page. We recommend at the end before your closing `<body>` tags like so:</p>
        <img src="{{root}}assets/img/generic/js-cssversion.png" class="" height="" width="" alt="">
      </li>
      <li>
        <strong>/foundation</strong>
        <p>This is a directory that contains each plugin as a single JavaScript file, so you can check out the source code. And if you'd like, include certain ones but not others, or do your own minifying.</p>
      </li>
      <li>
        <strong>/vendor</strong>
        <p>This folder contains a few external JS files that Foundation makes use of including: Modernizr, another open-source tool from Paul Irish and Nicolas Gallagher, as well as jQuery 2.</p>
      </li>
    </ul>
  </div>
  <div class="medium-6 columns">
    <div class="header-container">
      <h3>Other</h3>
    </div>
    <ul class="info-list">
      <li><strong>index.html</strong><p>This is an example index file which contains some sample markup (the grid, buttons, etc) as well as the basic structure of a responsive Foundation page. Feel free to change or destroy this file as you see fit, just bear in mind that some of the document ```<head>``` is required for the page to work including the CSS/JS that is linked up at the end of the document.</p></li>
      <li><strong>humans.txt</strong><p>Located in the site root just next to the robots.txt file. You don't have to use if you don't want. You can mention the developer, the designer, the copywriter, the webmaster, the SEO, SEM or SMO. Name as many people who helped make the site, or not.</p></li>
      <li><strong>robots.txt</strong><p>Website owners use the robots.txt file to give instructions about their site to web-crawling robots (also known as Web Wanderers, Crawlers, or Spiders). This is called The Robots Exclusion Protocol. Adding this page allows you to block web robots from indexing parts of your site. You can read more about it <a href="http://zurb.us/1jixgzu">here</a>.</p></li>
    </ul>
  </div>
</div>

---

## Best Practices

We have some best practice recommendations to help you optimize your experience with the Foundation CSS package.

Making Changes to Foundation Default Stylings

<div class="row">
  <div class="large-7 columns">
    <img class="round-margin" src="http://foundation.zurb.com/sites/docs/v/5.5.3/assets/img/images/using-css.png">
  </div>
  <div class="large-5 columns">
    <p>In order to update your Foundation CSS when we release a new version, we recommend keeping your `foundation.css` file clean of any changes. Any components that you want to add your own stylings to should be copied to your `app.css` file where you can make changes there.</p>
    <p class="subheader"><strong>Note:</strong> be sure to link the `app.css` stylesheet into the `<head>` of your file.</p>
  </div>
</div>

---

## HTML Page Markup

As you'll see in our `index.html` sample, Foundation pages have some specific markup required for them to work. This code block is a simple boilerplate for content-free Foundation pages that we hope comes in handy.


