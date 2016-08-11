---
title: Installation
description: There are many ways to install Foundation, but if you're just getting started, we have a few suggestions.
---

<div class="row">
  <div class="medium-3 columns">
    <span class="subtitle">ZURB Recommendation</span>
    <h4>Command-Line Tool</h4>
    <p>Makes it easy to create new Foundation projects from the Terminal.</p>
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
    <p>Easiest for beginners, but doesn’t unlock all the features of the stack (like SCSS, live previews and page templates).</p>
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


<!--## Yeti Launch-->

<!--Yeti Launch is our Mac app for quickly spinning up blank projects for any of the three Foundation frameworks. If you're just getting started with Foundation, we recommend downloading Yeti Launch to get going right away.-->

<!--<a href="http://foundation.zurb.com/develop/yeti-launch" class="large button">Download Yeti Launch</a>-->

## Command-Line Tool

Not a fan of GUIs? The Node-powered Foundation CLI can install the same template projects for you. Install it with npm:

<div class="steps" markdown="1">

  <div class="step">
    <h4 class="">Install the tool</h4>
    <div class="indented">
      ```bash
      npm install --global foundation-cli
      ```
    </div>
  </div>

  <!-- FAQ Accordion -->
  <ul class="faq-accordion indented" data-accordion>
    <li class="faq-accordion-item is-active" data-accordion-item>
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

```
http://localhost:8000
```

To create compressed, production-ready assets, run `npm run build`.

---

## CSS Download

If you aren't into Sass, we have a starter template with compiled CSS and JavaScript, as well as a starting `index.html` file for you to hack on. Just unzip and get coding!

<a href="http://foundation.zurb.com/sites/download" class="large button">Download CSS Version</a>

---

## CDN Links

The folks at [jsDelivr](https://www.jsdelivr.com) host the compressed Foundation CSS and JavaScript for us. Just drop one of these `<script>` tags into your HTML and you're set:

```html
<!-- Compressed CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/foundation/6.2.3/foundation.min.css">

<!-- Compressed JavaScript -->
<script src="https://cdn.jsdelivr.net/foundation/6.2.3/foundation.min.js"></script>
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
