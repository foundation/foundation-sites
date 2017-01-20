---
title: Installation
description: There are many ways to install Foundation, but if you're just getting started, we have a few suggestions.
previous:
  url: index.html
  title: Home
next:
  url: updating.html
  title: Updating Versions
---

<div class="row">
  <div class="medium-3 columns">
    <span class="subtitle">ZURB Recommendation</span>
    <h4>Command-Line Tool</h4>
    <p>Makes it easy to create new Foundation projects from the Terminal. Requires some initial setup for long-term ease.</p>
    <a href="#command-line-tool" class="button-docs expanded">Jump to Section</a>
  </div>
  <div class="medium-3 columns">
    <span class="subtitle">Basic</span>
    <h4>Manual Setup</h4>
    <p>Fastest way to install Foundation through a couple Terminal prompts. Comes with everything.</p>
    <a href="#manual-setup" class="button-docs secondary expanded">Jump to Section</a>
  </div>
  <div class="medium-3 columns">
    <span class="subtitle">Most Simple</span>
    <h4>CSS Download</h4>
    <p>The straight CSS version is perfect if you want to just start writing code, rapid prototype, or building a simple, static site.</p>
    <a href="#css-download" class="button-docs secondary expanded">Jump to Section</a>
  </div>
  <div class="medium-3 columns">
    <h4>Other ways to install</h4>
    <ul>
      <li><a href="#cdn-links">CDN Links</a></li>
      <li><a href="#package-managers">Package Managers</a></li>
      <li><a href="#html-starter-template">HTML Starter Template</a></li>
    </ul>
  </div>
</div>


---


## Command-Line Tool

Not a fan of GUIs? The Node-powered Foundation CLI can install the same template projects for you. Install it with npm:

<div class="steps" markdown="1">

<div class="step">
<div class="indented">
<h4 class="">Install the tool</h4>

<div></div>

```bash
npm install --global foundation-cli
```

</div>
</div>


  <!-- FAQ Accordion -->
  <ul class="faq-accordion indented" data-accordion  data-allow-all-closed="true">
    <li class="faq-accordion-item" data-accordion-item>
      <a href="#" class="faq-accordion-title">Get an EACCESS Error?</a>
      <div class="faq-accordion-content" data-tab-content>
        Depending on how your machine is configured, the command may fail with an `EACCESS` error. To get around this, run the command with `sudo` at the beginning:

```bash
sudo npm install --global foundation-cli
```

</div>
</li>
    <li class="faq-accordion-item" data-accordion-item>
      <a href="#" class="faq-accordion-title">Already have the Foundation 5 CLI?</a>
      <div class="faq-accordion-content" data-tab-content>
        <p>If you already have the Foundation 5 CLI on your machine, you will only be able to access one of the commands, depending on how your command line environment is configured.</p>
      </div>
    </li>
    <li class="faq-accordion-item" data-accordion-item>
      <a href="#" class="faq-accordion-title">Want to remove the old CLI?</a>
      <div class="faq-accordion-content" data-tab-content>
        <p>If you want to remove the old CLI, run <code>gem uninstall foundation</code>. After testing this new CLI, if you want to go back to the old CLI, run <code>npm uninstall foundation-cli --global</code>.</p>
      </div>
    </li>
  </ul>
  <!-- END FAQ Accordion -->

  <div class="step">
  <h4 class="">Create a new Foundation project</h4>
  <div class="indented">
    Once you've installed the CLI, use the `new` command to start making a new project:

```bash
foundation new
```

  </div>
  </div>

  <div class="step">
  <h4 class="">Run the project</h4>
  <div class="indented">
    Finally, run npm start to run the Sass compiler. It will re-run every time you save a Sass file. This command is something you’ll use every time you work on your project.

```bash
npm start
```

  </div>
  </div>

</div>

---

## Manual Setup

### Basic Template

To manually set up the basic template, first download it with Git:

```bash
git clone https://github.com/zurb/foundation-sites-template projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run the Sass compiler. It will re-run every time you save a Sass file.

### ZURB Template

To manually set up the ZURB template, first download it with Git:

```bash
git clone https://github.com/zurb/foundation-zurb-template projectname
```

Then open the folder in your command line, and install the needed dependencies:

```bash
cd projectname
npm install
bower install
```

Finally, run `npm start` to run Gulp. Your finished site will be created in a folder called `dist`, viewable at this URL:
http://localhost:8000


To create compressed, production-ready assets, run `npm run build`.

---

## CSS Download

If you aren't into Sass, we have a starter template with compiled CSS and JavaScript, as well as a starting `index.html` file for you to hack on. Just unzip and get coding!

<a href="http://foundation.zurb.com/sites/download" class="large button">Download CSS Version</a>

---

## CDN Links

The folks at [cdnjs](https://cdnjs.com) host the compressed Foundation CSS and JavaScript for us. Just drop one of these `<script>` tags into your HTML and you're set:

```html
<!-- Compressed CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.0/css/foundation.min.css">

<!-- Compressed JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.0/js/foundation.min.js"></script>
```

---

## Package Managers

Foundation is available on npm, Bower, Meteor, and Composer. The package includes all of the source Sass and JavaScript files, as well as compiled CSS and JavaScript, in uncompressed and compressed flavors.

- npm: `npm install foundation-sites`
- Bower: `bower install foundation-sites`
- Meteor: `meteor add zurb:foundation-sites`
- Composer: `php composer.phar require zurb/foundation`
- NuGet: `Install-Package foundation-sites`

### Package Contents

Here's what comes in the package.

- `scss/`: Source Sass files. Use this folder as a load path in Sass.
- `js/`: Source JavaScript files. If you're using a build system, make sure `foundation.core.js` is loaded first.
- `dist/`: Compiled files.
  - `css/`: Compiled CSS files. Includes minified and unminified files.
  - `js/`: Concatenated JavaScript files. Includes minified and unminified files.
    - `plugins/`: Standalone JavaScript plugins.

---

## HTML Starter Template
Start with this HTML template and adapt it to your needs.

```html
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Foundation Starter Template</title>
    <link rel="stylesheet" href="css/foundation.css" />
  </head>
  <body>
    <h1>Hello, world!</h1>

    <script src="js/vendor/jquery.min.js"></script>
    <script src="js/vendor/what-input.min.js"></script>
    <script src="js/foundation.min.js"></script>
    <script>
      $(document).foundation();
    </script>

  </body>
</html>

```

---

## Other Integrations

The Foundation community has helped us integrate the framework into Rails, WordPress, Django, and more. Head to our [resources page](http://foundation.zurb.com/sites/resources) to find even more ways to use Foundation.

---

## Resources to Get You Started

<div class="row small-up-1 medium-up-2 large-up-3 thumb-row">

  <div class="column">
    <a href="http://foundation.zurb.com/learn/foundation-6-grid-basics-mobile-first.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/learn/training/tuts-grid-basics-mobile-first.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, GRID, LAYOUT, CSS</h5>
      <p class="thumb-description" target="_blank">The basics of the Foundation 6 Grid and Mobile First<span class="thumb-author">Jon - Foundation Team</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/introduction-to-the-foundation-grid.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-grid-jamesstone.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, GRID, LAYOUT, HTML</h5>
      <p class="thumb-description">Intro to the Foundation Grid<span class="thumb-author">James Stone</span></p>
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
    <a href="http://appsbyjohn.com/learn/using-the-foundation-framework-for-responsive-web-design/" target="_blank">
      <p class="thumb-description">Using the Foundation Framework for Responsive Web Design<span class="thumb-author">By John MacAdam</span></p>
    </a>
    <a href="http://www.webdesignerdepot.com/2014/11/the-ultimate-guide-to-getting-started-with-foundation/" target="_blank">
      <p class="thumb-description">The ultimate guide to getting started with Foundation<span class="thumb-author">By Ezequiel Bruni</span></p>
    </a>
    <a href="https://scotch.io/bar-talk/a-quick-look-at-the-best-new-foundation-6-features" target="_blank">
      <p class="thumb-description">A Quick Look at the Best New Foundation 6 Features<span class="thumb-author">By Scotch.io</span></p>
    </a>
  </div>

</div>

<div class="text-center">
  <a href="http://zurb.com/university/lessons" class="button-docs secondary">See More Tutorials</a>
</div>

