---
title: Installation
description: There are many ways to install Foundation, but if you're just getting started, we have a few suggestions.
---

## Yeti Launch

Yeti Launch is our Mac app for quickly spinning up blank projects for any of the three Foundation frameworks. If you're just getting started with Foundation, we recommend downloading Yeti Launch to get going right away.

<a href="http://foundation.zurb.com/develop/yeti-launch" class="large button">Download Yeti Launch</a>

### Command-Line Tool

Not a fan of GUIs? The Node-powered Foundation CLI can install the same template projects for you. Install it with npm:

```bash
npm install --global foundation-cli
```

<div class="callout alert">
  <p>If you already have the Foundation 5 CLI on your machine, you will only be able to access one of the commands, depending on how your command line environment is configured.</p>

  <p>If you want to remove the old CLI, run <code>gem uninstall foundation</code>. After testing this new CLI, if you want to go back to the old CLI, run <code>npm uninstall foundation-cli --global</code>.</p>
</div>

Once you've installed the CLI, use the `new` command to start making a new project:

```bash
foundation new
```

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

## CDN Links

The folks at [jsDelivr](https://www.jsdelivr.com) host the compressed Foundation CSS and JavaScript for us. Just drop one of these `<script>` tags into your HTML and you're set:

```html
<!-- Compressed CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/foundation/6.1.2/foundation.min.css">

<!-- Compressed JavaScript -->
<script src="https://cdn.jsdelivr.net/foundation/6.1.2/foundation.min.js"></script>
```

---

## Package Managers

Foundation is available on npm, Bower, Meteor, and Composer. The package includes all of the source Sass and JavaScript files, as well as compiled CSS and JavaScript, in uncompressed and compressed flavors.

- npm: `npm install foundation-sites`
- Bower: `bower install foundation-sites`
- Meteor: `meteor add zurb:foundation-sites`
- Composer: `php composer.phar require zurb/foundation`

### Package Contents

Here's what comes in the package.

- `scss/`: Source Sass files. Use this folder as a load path in Sass.
- `js/`: Source JavaScript files. If you're using a build system, make sure `foundation.core.js` is loaded first.
- `dist/`: Compiled files.
  - `css/`: Compiled CSS files. Includes minified and unminified files.
  - `js/`: Concatenated JavaScript files. Includes minified and unminified files.

---

## Other Integrations

The Foundation community has helped us integrate the framework into Rails, WordPress, Django, and more. Head to our [resources page](http://foundation.zurb.com/sites/resources) to find even more ways to use Foundation.
