---
title: Installation
description: There are many ways to install Foundation from downloading the compiled CSS, automated Sass installs to popular package managers. Each one serves a different skill level or preferred workflow. If this is all new to you, don’t worry; The video below will give you an overview of each method and help you decide which is best for you.
video: '6KwsGcEHVTE'
---

## How to choose the right version for you?

Depending on your skill level or how quick you want to get started, each of these different ways to get started might suit you better. Here’s a breakdown of the options you’ll see on this page:

<ul class="no-bullet" data-magellan data-bar-offset="90">

  <li><a href="#download-the-css-starter-template"><strong>Download the CSS Starter Template</strong></a> - A ready-to-go zip file with Foundation’s CSS and JS. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label secondary">CSS</span></li>

  <li><a href="#cdn-links"><strong>Use the Foundation CDN</strong></a> - Foundation’s CDN (Content Delivery Network) can be linked into a new or existing project without any downloading. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label secondary">CSS</span></li>

  <li><a href="#command-line-tool"><strong>Foundation CLI </strong></a> - Foundation’s CLI (Command Line Interface) is the recommended way to create ready-to-go Foundation Sass projects. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

  <li><a href="#manual-setup"><strong>Manual Setup</strong></a> - You can Install from either the ZURB Stack or Basic Template manually. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

  <li><a href="#package-managers"><strong>Package Managers</strong></a> - Install foundation through your favorite package manager like npm, Bower, Meteor, RubyGems, Composer or NuGet. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

  <li><a href="#yeoman-generator"><strong>Yoeman Generators</strong></a> A generator is basically a plugin to scaffold complete projects or useful parts.
 <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

  <li><a href="#download-the-sass-files"><strong>Download the Sass files</strong></a> - Already have a workflow you like? No problem, download Foundation's core SCSS files and you can go your own way. <span style="vertical-align: top; border: 0; border-radius: 3px;" class="label">Sass</span></li>

</ul>


---

## Download the CSS Starter Template

<div class="responsive-embed widescreen mb1">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/lFrpnk0Oo_8" frameborder="0" allowfullscreen></iframe>
  <a id="docs-mobile-video-link" class="docs-mobile-video" target="_blank" href="https://youtu.be/lFrpnk0Oo_8"></a>
</div>

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
  <a class="" data-open-video="8:33"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

The folks at [cdnjs](https://cdnjs.com) host the compressed Foundation CSS and JavaScript for us. Just drop one of these `<script>` tags into your HTML and you're set:

```html
<!-- Compressed CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css" integrity="sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=" crossorigin="anonymous" />

<!-- MotionUI - used for component animations -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/motion-ui/1.2.2/motion-ui.min.css"/>

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/motion-ui/1.2.2/motion-ui.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/css/foundation.min.css" integrity="sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=" crossorigin="anonymous" />
  </head>
  <body>
    <!-- page content -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.3.1/js/foundation.min.js" integrity="sha256-Nd2xznOkrE9HkrAMi4xWy/hXkQraXioBg9iYsBrcFrs=" crossorigin="anonymous"></script>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>
```

*Note - jQuery is a dependancy of Foundation, therefor in the above example we've included a jQuery CDN which you'll need for it to work.*

<a target="_blank" href="https://cdnjs.com/libraries/foundation" class="button large">See all Foundation 6 CDN Links →</a>

---

## Command-Line Tool

<div class="responsive-embed widescreen mb1">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/rQguHjGzFEw" frameborder="0" allowfullscreen></iframe>
  <a id="docs-mobile-video-link" class="docs-mobile-video" target="_blank" href="https://youtu.be/rQguHjGzFEw"></a>
</div>

This is the recommended way to create ready-to-go Foundation Sass projects. The CLI (Command Line Interface) is an easy to install, tiny app that allows you to create and update Foundation Sass projects.

What is needed?

- [Node.JS](https://nodejs.org/en/) (Version 0.12 - 6.10.3)
- [Git](https://git-scm.com/downloads)
- Bower (CLI will install for you)
- Gulp (CLI will install for you)

The CLI and the ZURB Stack are both Node.JS based and required to run these modern build tools. Bower is a package manager for the web, which lets you download and install front-end libraries via the command line. For example, installing jQuery is a one line command: bower install jquery.

As mentioned, Foundation CLI uses Gulp and Bower under the hood. In case you’re not familiar with Gulp and Bower, Gulp is a JavaScript task runner that will help you automate painful or time-consuming tasks in your development workflow. This includes SCSS compilation, minification, concatenation, image compression and other useful tasks.


```bash
npm install --global foundation-cli
```

<div class="callout primary">
  <p>Depending on how your machine is configured, the command may fail with an <code>EACCESS</code> error. To get around this, run the command with <code>sudo</code> at the beginning:</p>
</div>

```bash
sudo npm install --global foundation-cli
```

Once you've installed the CLI, use the `new` command to start making a new project:

```bash
foundation new
```

That's it! The CLI will now build you a project that is ready to go!

--

<a data-toggle="f5-cli">Already have the Foundation 5 CLI installed?</a>

<div style="display: none;" class="callout alert" id="f5-cli" data-toggler data-animate="fade-in fade-out">
  <p>If you already have the Foundation 5 CLI on your machine, you will only be able to access one of the commands, depending on how your command line environment is configured.</p>

  <p>If you want to remove the old CLI, run <code>gem uninstall foundation</code>. After testing this new CLI, if you want to go back to the old CLI, run <code>npm uninstall foundation-cli --global</code>.</p>
</div>

---

## Manual Setup

If you don’t want the Foundation CLI to build projects for you, you can manually download and install the Sass starter builds themselves.

<p>
  <a class="" data-open-video="6:04"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

What is needed?

- [Node.JS](https://nodejs.org/en/) (Version 0.12 - 6.10.3)
- [Git](https://git-scm.com/downloads)
- Bower - `$ npm install -g bower`

### ZURB Template

The official ZURB Template includes not only Sass processing, but also JavaScript processing, Handlebars templating, and image compression. We use this exact template at ZURB for our client work!

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

<a href="starter-projects.html#zurb-template">Learn more about the ZURB Stack →</a>

### Basic Template

Our basic project template has a flat directory structure and only compiles Sass. It's great if you want to quickly put together a simple project and only need to use Sass or if you’re looking for a simple Sass Gulp automation.

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

<a target="_blank" href="http://yeoman.io/generators/">Learn more about the Basic Template →</a>

---

## Package Managers

<p>
  <a class="" data-open-video="9:13"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

Foundation is available on <a href="https://www.npmjs.com/" target="_blank">NPM</a>, <a href="https://bower.io/" target="_blank">Bower</a>, <a href="https://atmospherejs.com/" target="_blank">Meteor</a>, <a href="https://rubygems.org/" target="_blank">RubyGems</a>, <a href="https://getcomposer.org/" target="_blank">Composer</a> and <a href="https://www.nuget.org/" target="_blank">NuGet</a>. The package includes all of the source Sass and JavaScript files, as well as compiled CSS and JavaScript, in uncompressed and compressed flavors.

<ul class="icon-list menu vertical">
  <li><img src="https://eg2.gallerycdn.vsassets.io/extensions/eg2/vscode-npm-script/0.1.9/1491853545308/Microsoft.VisualStudio.Services.Icons.Default" class="" height="" width="" alt=""><strong>npm:</strong> <code>npm install foundation-sites</code></li>
  <li><img src="https://bower.io/img/bower-logo.png" class="" height="" width="" alt=""><strong>Bower:</strong> <code>bower install foundation-sites</code></li>
  <li><img src="https://shmck.herokuapp.com/content/images/2015/07/meteor.png" class="" height="" width="" alt=""><strong>Meteor:</strong> <code>meteor add zurb:foundation-sites</code></li>
  <li><img src="https://getcomposer.org/img/logo-composer-transparent2.png" class="" height="" width="" alt=""><strong>Composer:</strong> <code>php composer.phar require zurb/foundation</code></li>
  <li><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/NuGet_project_logo.svg/220px-NuGet_project_logo.svg.png" class="" height="" width="" alt=""><strong>NuGet:</strong> <code>Install-Package foundation-sites</code></li>
  <li><img src="https://camo.githubusercontent.com/beede1ff8999a3d69c452f1cd0df90e076454344/687474703a2f2f7275627967656d732e6f72672f66617669636f6e2e69636f" class="" height="" width="" alt=""><strong>RubyGems:</strong> <code>gem install zurb-foundation</code></li>
</ul>

### Package Contents

Here's what comes in the package.

- `scss/`: Source Sass files. Use this folder as a load path in Sass.
- `js/`: Source JavaScript files. If you're using a build system, make sure `foundation.core.js` is loaded first.
- `dist/`: Compiled files.
  - `css/`: Compiled CSS files. Includes minified and unminified files.
  - `js/`: Concatenated JavaScript files. Includes minified and unminified files.
    - `plugins/`: Standalone JavaScript plugins.

---

## Yeoman Generator

A generator is basically a plugin that can be run with the `yo` command to scaffold complete projects or useful parts. There are many variations and combinations to build a Foundation project. Here are a couple:

- [Foundation + Browserify Project Generator](https://github.com/dougmacklin/generator-foundation-browserify)
- [Foundation 6 web app generator](https://github.com/bassjobsen/generator-foundation6/)

<a href="starter-projects.html#basic-template">Search Foundation Yeoman Generators →</a>

---

## Other Integrations

<p>
  <a class="" data-open-video="9:35"><img src="{{root}}assets/img/icons/watch-video-icon.svg" class="video-icon" height="30" width="30" alt=""> Watch this part in video</a>
</p>

The Foundation community has helped us integrate the framework into Rails, WordPress, Django, and more. Head to our [resources page](http://foundation.zurb.com/sites/resources) to find even more ways to use Foundation.
