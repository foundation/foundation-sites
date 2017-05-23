---
title: Installation
description: There are many ways to install Foundation from downloading the compiled CSS, automated Sass installs to popular package managers. Each one serves a different skill level or preferred workflow. If this is all new to you, don’t worry; The video below will give you an overview of each method and help you decide which is best for you.
video: '6KwsGcEHVTE'
---

## How to choose the right version for you?

Depending on your skill level or how quick you want to get started, each of these different ways to get started might suit you better. Here’s a breakdown of the options you’ll see on this page:

<ul class="no-bullet" data-magellan data-bar-offset="90">

  <li><a href="#download-the-css-starter-template"><strong>Download the CSS Starter Template</strong></a> - A ready-to-go zip file with Foundation’s CSS and JS. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label secondary">CSS</span></li>

  <li><a href="#css-download"><strong>Use the Foundation CDN</strong></a> - Foundation’s CDN (Content Delivery Network) can be linked into a new or existing project without any downloading. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label secondary">CSS</span></li>

  <li><a href="#css-download"><strong>Foundation CLI </strong></a> - Foundation’s CLI (Command Line Interface) is the recommended way to create ready-to-go Foundation Sass projects. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

  <li><a href="#css-download"><strong>Manual Setup</strong></a> - You can Install from either the ZURB Stack or Basic Template manually. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

  <li><a href="#css-download"><strong>Package Managers</strong></a> - Install foundation through your favorite package manager like npm, Bower, Meteor, RubyGems, Composer or NuGet. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

  <li><a href="#css-download"><strong>Download the Sass files</strong></a> - Already have a workflow you like? No problem, download Foundation's core SCSS files and you can go your own way. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

</ul>


---

## Download the CSS Starter Template

<p>
  <a class="" data-open-video="0:58"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

This is the quickest way to get started with Foundation. If you aren't into Sass, we have a starter template with compiled CSS and JavaScript, as well as a starting index.html file for you to hack on. Just unzip and get coding!

Our Starter template comes set up from the jump complete with:

- Foundation’s CSS
- Foundation’s JavaScript
- A Starter HTML Index page
- A blank CSS file for custom styles
- Viewport meta tag and other boilerplate for building your responsive site

<a href="http://foundation.zurb.com/sites/download" class="large button">Go to Download Page</a>
<a href="#" class="button large clear">Learn more →</a>

---

## CDN Links

<p>
  <a class="" data-open-video="0:58"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

The folks at [cdnjs](https://cdnjs.com) host the compressed Foundation CSS and JavaScript for us. Just drop one of these `<script>` tags into your HTML and you're set:

```html
<!-- Compressed CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css" integrity="sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=" crossorigin="anonymous" />

<!-- Compressed JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/js/foundation.min.js" integrity="sha256-Nd2xznOkrE9HkrAMi4xWy/hXkQraXioBg9iYsBrcFrs=" crossorigin="anonymous"></script>
```

Example usage:

```html
<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Foundation CDN Boilerplate</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css" integrity="sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=" crossorigin="anonymous" />
  </head>
  <body>
    <!-- page content -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/js/foundation.min.js" integrity="sha256-Nd2xznOkrE9HkrAMi4xWy/hXkQraXioBg9iYsBrcFrs=" crossorigin="anonymous"></script>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>

```

<a target="_blank" href="https://cdnjs.com/libraries/foundation" class="button large">See all Foundation 6 CDN Links →</a>

---


## Command-Line Tool

<p>
  <a class="" data-open-video="0:58"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

Not a fan of GUIs? The Node-powered Foundation CLI can install the same template projects for you. Install it with npm:

```bash
npm install --global foundation-cli
```

Depending on how your machine is configured, the command may fail with an `EACCESS` error. To get around this, run the command with `sudo` at the beginning:

```bash
sudo npm install --global foundation-cli
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

<p>
  <a class="" data-open-video="0:58"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

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

## Package Managers

<p>
  <a class="" data-open-video="0:58"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

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

## Other Integrations

<p>
  <a class="" data-open-video="0:58"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

The Foundation community has helped us integrate the framework into Rails, WordPress, Django, and more. Head to our [resources page](http://foundation.zurb.com/sites/resources) to find even more ways to use Foundation.
