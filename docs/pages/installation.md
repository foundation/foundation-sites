---
title: Installation
description: There are many ways to install Foundation, but if you're just getting started, we have a few suggestions.
video: '6KwsGcEHVTE'
---

## Install with Package Managers

Foundation is available on npm, Bower, Meteor, and Composer. The package includes all of the source Sass and JavaScript files, as well as compiled CSS and JavaScript, in uncompressed and compressed flavors.

<div class="row">
  <div class="column small-2 text-right">
    <a href="https://www.npmjs.com/package/foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-npm.svg" alt="NPM">
    </a>
  </div>
  <div class="column small-10">
    <div class="docs-code">
      <code class="bash">
        npm install foundation-sites
      </code>
    </div>
  </div>

  <div class="column small-2 text-right">
    <a href="https://yarnpkg.com/en/package/foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-yarn.svg" alt="Yarn">
    </a>
  </div>
  <div class="column small-10">
    <div class="docs-code">
      <code class="bash">
        yarn install foundation-sites
      </code>
    </div>
  </div>

  <div class="column small-2 text-right">
    <a href="https://bower.io/search/?q=foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-bower.svg" alt="Bower">
    </a>
  </div>
  <div class="column small-10">
    <div class="docs-code">
      <code class="bash">
        bower install foundation-sites
      </code>
    </div>
  </div>

  <div class="column small-2 text-right">
    <a href="https://atmospherejs.com/zurb/foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-meteor.svg" alt="Meteor">
    </a>
  </div>
  <div class="column small-10">
    <div class="docs-code">
      <code class="bash">
        meteor add zurb:foundation-sites
      </code>
    </div>
  </div>

  <div class="column small-2 text-right">
    <a href="https://packagist.org/packages/zurb/foundation">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-composer.svg" alt="Composer">
    </a>
  </div>
  <div class="column small-10">
    <div class="docs-code">
      <code class="bash">
        php composer.phar require zurb/foundation
      </code>
    </div>
  </div>

  <div class="column small-2 text-right">
    <a href="https://www.nuget.org/packages/foundation-sites/">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-nuget.svg" alt="NuGet">
    </a>
  </div>
  <div class="column small-10">
    <div class="docs-code">
      <code class="bash">
        Install-Package foundation-sites
      </code>
    </div>
  </div>
</div>

Here's what comes in the package.

```
├─ scss       Source Sass files. Use this folder as a load path in Sass.
├─ js         Source JavaScript files. If you're using a build system, make sure `foundation.core.js` is loaded first.
└─ dist       Compiled files:
   ├─ css        * Compiled CSS files. Includes minified and unminified files.
   ├─ js         * Concatenated JavaScript files. Includes minified and unminified files.
   └─ plugins    * Standalone JavaScript plugins.
```

---

## Install with Foundation CLI

Not a fan of GUIs? The Node-powered Foundation CLI can install the same template projects for you.

Install Foundation CLI:

```bash
npm install --global foundation-cli
# or sudo npm install --global foundation-cli
```

Then use to create a new Foundation project:

```bash
foundation new
```

<div class="callout info">
  Depending on how your machine is configured, the command may fail with an `EACCESS` error. To get around this, run the commands with `sudo` at the beginning.
</div>

<div class="callout info">
  <p><strong>Foundation 5 users</strong>: if you already have the Foundation 5 CLI on your machine, you will only be able to access one of the commands, depending on how your command line environment is configured.</p>

  <p>To remove the Foundation 5 CLI, run <code>gem uninstall foundation</code>. After testing this new CLI, if you want to go back to the old CLI. To remove the Foundation 6 CLI, run <code>npm uninstall foundation-cli --global</code>.</p>
</div>


---

## Install with a template

### Basic Template

The basic template includes Foundation and a build process for Sass.

To manually set up [the basic template](https://github.com/zurb/foundation-sites-template):

```bash
# Download the template with Git
git clone https://github.com/zurb/foundation-sites-template projectname

# Move to the project folter, and install the needed dependencies
cd projectname
npm install

# Build the Sass files
npm start
```

Your project will be recompiled every time you save a Sass file in `dist/.


### ZURB Template

The basic template includes Foundation and a build process with:
* Handlebars HTML templates with Panini
* Sass compilation and prefixing
* JavaScript module bundling with webpack
* Built-in BrowserSync
* Production build with CSS, Javascript and Image compression

To manually set up [the ZURB template](https://github.com/zurb/foundation-zurb-template):

```bash
# Download the ZURB template with Git
git clone https://github.com/zurb/foundation-zurb-template projectname

# Move to the project folter, and install the needed dependencies
cd projectname
npm install

# Build the project
npm start
```

Your finished site will be created in a folder called `dist.`, viewable at this URL: [http://localhost:8000](http://localhost:8000)

To create compressed, production-ready assets, run `npm run build`.

---


## Download

<div class="row">
  <div class="column small-6">
    <div class="responsive-embed widescreen mb1">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/lFrpnk0Oo_8" frameborder="0" allowfullscreen></iframe>
      <a id="docs-mobile-video-link" class="docs-mobile-video" target="_blank" href="https://youtu.be/lFrpnk0Oo_8"></a>
    </div>
  </div>

  <div class="column small-6">
    <p>
      If you aren't into Sass, we have a starter template with compiled CSS and JavaScript, as well as a starting `index.html` file for you to hack on. Just unzip and get coding!
    </p>
    <p class="text-center">
      <a href="http://foundation.zurb.com/sites/download" class="button">Download Foundation</a>
    </p>
  </div>
</div>

---

## CDN Links

The folks at [cdnjs](https://cdnjs.com) host the compressed Foundation CSS and JavaScript for us. Just drop one of these `<script>` tags into your HTML and you're set:

```html
<!-- Compressed CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation.min.css" integrity="sha256-itWEYdFWzZPBG78bJOOiQIn06QCgN/F0wMDcC4nOhxY=" crossorigin="anonymous" />

<!-- Compressed JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/js/foundation.min.js" integrity="sha256-Nd2xznOkrE9HkrAMi4xWy/hXkQraXioBg9iYsBrcFrs=" crossorigin="anonymous"></script>
```

From Foundation 6.4, flex is enabled by default and **only the new XY Grid is availaible**. However, others CSS versions are availaible for backward compatibility and the msot common usage cases. For others uses and advanced customization, we recommand to build Foundation with custom settings (see others installation methods).

```html
<!-- foundation-float.css: Compressed CSS with legacy Float Grid -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation-float.css" integrity="sha256-+8r1EkvIoWpxT8CKbSw/rCQWttnazW9mLPg6xT+/2EM=" crossorigin="anonymous" />

<!-- foundation-prototype.css: Compressed CSS with prototyping classes -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation-prototype.css" integrity="sha256-IHU5CkoOGpVMODA9ql3Lz609uhGwwFlLNSpAMoOY2us=" crossorigin="anonymous" />

<!-- foundation-rtl.css: Compressed CSS with right-to-left reading direction -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation-rtl.min.css" integrity="sha256-Az+E7JXW71Srarkum5QPTdnobddg2GqI1i8+nMusgLk=" crossorigin="anonymous" />
```

<div class="text-center">
  <a href="https://cdnjs.com/libraries/foundation" class="button" target="_blank">See all CDN files and versions</a>
</div>

---

## HTML Starter Template
Start with this HTML template and adapt it to your needs. Be sure to include the `.no-js` class on the `html` tag of your template.  Adding this class prevents [flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) for a number of foundation components.

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

    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.min.js"></script>
    <script>
      $(document).foundation();
    </script>

  </body>
</html>

```

---

## Other Integrations

The Foundation community has helped us integrate the framework into Rails, WordPress, Django, and more. Head to our [resources page](http://foundation.zurb.com/sites/resources) to find even more ways to use Foundation.
