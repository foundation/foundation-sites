---
title: Installation
description: There are many ways to install Foundation, but if you're just getting started, we have a few suggestions.
video: '6KwsGcEHVTE'
---

## Install with Package Managers

Foundation is available on npm, Bower, Meteor, and Composer. The package includes all of the source Sass and JavaScript files, as well as compiled CSS and JavaScript, in uncompressed and compressed flavors.

<div class="grid-x grid-margin-x">
  <div class="cell small-2 text-right">
    <a href="https://www.npmjs.com/package/foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-npm.svg" alt="NPM">
    </a>
  </div>
  <div class="cell small-10">
    <div class="docs-code">
      <code class="bash">
        npm install foundation-sites
      </code>
    </div>
  </div>

  <div class="cell small-2 text-right">
    <a href="https://yarnpkg.com/en/package/foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-yarn.svg" alt="Yarn">
    </a>
  </div>
  <div class="cell small-10">
    <div class="docs-code">
      <code class="bash">
        yarn add foundation-sites
      </code>
    </div>
  </div>

  <div class="cell small-2 text-right">
    <a href="https://bower.io/search/?q=foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-bower.svg" alt="Bower">
    </a>
  </div>
  <div class="cell small-10">
    <div class="docs-code">
      <code class="bash">
        bower install foundation-sites
      </code>
    </div>
  </div>

  <div class="cell small-2 text-right">
    <a href="https://rubygems.org/gems/foundation-rails">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-rubygems.svg" alt="Ruby Gems">
    </a>
  </div>
  <div class="cell small-10">
    <div class="docs-code">
      <code class="bash">
        gem install foundation-rails
      </code>
    </div>
  </div>

  <div class="cell small-2 text-right">
    <a href="https://atmospherejs.com/zurb/foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-meteor.svg" alt="Meteor">
    </a>
  </div>
  <div class="cell small-10">
    <div class="docs-code">
      <code class="bash">
        meteor add zurb:foundation-sites
      </code>
    </div>
  </div>

  <div class="cell small-2 text-right">
    <a href="https://packagist.org/packages/zurb/foundation">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-composer.svg" alt="Composer">
    </a>
  </div>
  <div class="cell small-10">
    <div class="docs-code">
      <code class="bash">
        php composer.phar require zurb/foundation
      </code>
    </div>
  </div>

  <div class="cell small-2 text-right">
    <a href="https://www.nuget.org/packages/foundation-sites/">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-nuget.svg" alt="NuGet">
    </a>
  </div>
  <div class="cell small-10">
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

<div class="callout info">
  Depending on how your machine is configured, the command may fail with an `EACCESS` error. To get around this, run the commands with `sudo` at the beginning.
</div>

Then use to create a new Foundation project:

```bash
foundation new
```

After you selected "Foundation for Sites", Foundation CLI will ask you which template you want to use. You can choose between:

<div class="grid-x grid-margin-x">
  <div class="cell small-6">
    <h3>Basic template</h3>
    <p>
      <b>Recommended for beginners</b><br>
      A basic template to begin to use Foundation. It includes:
      <ul>
        <li>
          Foundation for Sites pre-configured.
        </li>
        <li>
          Sass compilation<br>
          A tool to convert your SASS/SCSS files to CSS.
        </li>
        <li>
          Starter HTML file<br>
          A basic file to help you to use basic Foundation component (including the new XY grid !)
        </li>
      </ul>
    </p>
  </div>

  <div class="cell small-6">
    <h3>ZURB template</h3>
    <p>
      <b>Recommended for experienced (or curious) users</b><br>
      A more advanced project including Foundation and a build process with:
      <ul>
        <li>Handlebars HTML templates with Panini</li>
        <li>Sass compilation and prefixing</li>
        <li>JavaScript module bundling with webpack</li>
        <li>Built-in BrowserSync</li>
        <li>Production build with CSS, Javascript and Image compression</li>
      </ul>
    </p>
  </div>
</div>

<p class="text-center">
  <a href="starter-projects.html" class="button">See advanced Template installations</a>
</p>

<div class="callout info">
  <p><strong>Foundation 5 users</strong>: if you already have the Foundation 5 CLI on your machine, you will only be able to access one of the commands, depending on how your command line environment is configured.</p>

  <p>To remove the Foundation 5 CLI, run <code>gem uninstall foundation</code>. After testing this new CLI, if you want to go back to the old CLI. To remove the Foundation 6 CLI, run <code>npm uninstall foundation-cli --global</code>.</p>
</div>

---

## Download

<div class="grid-x grid-margin-x">
  <div class="cell small-6">
    <div class="responsive-embed widescreen mb1">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/lFrpnk0Oo_8" frameborder="0" allowfullscreen></iframe>
      <a id="docs-mobile-video-link" class="docs-mobile-video" target="_blank" href="https://youtu.be/lFrpnk0Oo_8"></a>
    </div>
  </div>

  <div class="cell small-6">
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

The folks at [jsDelivr](https://www.jsdelivr.com) host the compressed Foundation CSS and JavaScript for us. Just drop one of these `<script>` tags into your HTML and you're set:

```html
<!-- Compressed CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.2/dist/css/foundation.min.css" integrity="sha256-iJQ8dZac/jUYHxiEnZJsyVpKcdq2sQvdA7t02QFmp30= sha384-SplqNBo/0ZlvSdwrP/riIPDozO5ck8+yIm++KVqyMAC53S6m3BaV+2OLpi7ULOOh sha512-ho6hK4sAWdCeqopNZWNy1d9Ok2hzfTLQLcGSr8ZlRzDzh6tNHkVoqSl6wgLsqls3yazwiG9H9dBCtSfPuiLRCQ==" crossorigin="anonymous">

<!-- Compressed JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.2/dist/js/foundation.min.js" integrity="sha256-G6jsRyH1fxbsvFIXSCuwYmI1aIDYBa28xscrvmYjJy0= sha384-vtoG68NvPc9azmFJr447vvY8qgdyA4FdaJ5/bqvzIM4eAdZfO0iyRRF8l2AAscYI sha512-43seCcNrHA0BQgrtyajB9sp8yOdv5c8QdYvgjP7zJ7v+dmzAcxYDQ2gupb9aztsNWBq1COIp/3NHYkQs4l/dkg==" crossorigin="anonymous"></script>
```

From Foundation 6.4, flex is enabled by default and **only the new XY Grid is availaible**. However, others CSS versions are availaible for backward compatibility and the most common usage cases. For others uses and advanced customization, we recommand to build Foundation with custom settings (see others installation methods).

```html
<!-- foundation-float.min.css: Compressed CSS with legacy Float Grid -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.2/dist/css/foundation-float.min.css" integrity="sha256-SXzNzz68b8cy/1oRvdP128/5VlvegrZO5QDmBiqhlQc= sha384-5EVTk1nWllg1T/XoVEd82fhnOxUhRUOquz4AyO3+M0kbhUzhruouReQWPnihRxPs sha512-y0IHToRgzE99SfoteKLXR0MUOTRPMQHwc4nmU2/Uqhu4KulOzK18RbuicuhlgzPDdj23skwxTWUv7CJs+psXig==" crossorigin="anonymous">

<!-- foundation-prototype.min.css: Compressed CSS with prototyping classes -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.2/dist/css/foundation-prototype.min.css" integrity="sha256-iP8NlnMIi6jl4DMvyYpLbsqyWDYl1Q8tVZveKJ/iTlo= sha384-E/I8NnHrg+VfwywRTDOqIKYxhzeffpdDsimI5Nquhpn2CeyKxcx4nXrzzI5gHrop sha512-GX5/wNoFVsGHdYirCCCrvWYFBsB/O+gK+7XOcAnd5fGLh8L3s1D0Zh6rVvRA6nKtnzyTEp4y12fSejpSvTOCeA==" crossorigin="anonymous">

<!-- foundation-rtl.min.css: Compressed CSS with right-to-left reading direction -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.0-rc.2/dist/css/foundation-rtl.min.css" integrity="sha256-80rANnp5GyEv0uG8KN9vvV/bVcFIraHVWPi5x+gxVeo= sha384-aYblAem3RHdEnPvfqN2QS+Ha8P+pBBtb38g0BXaoBz6D7W2N3tliaJOrKtm3R/Aj sha512-7N+idIc9dM7Insu/knBFhfRMQ+mog/niglz38GYI54HN6UnZkASL/IUwKVuq1X52k3K4XwBhEY2GpCIDnZOGmA==" crossorigin="anonymous">
```

<div class="text-center">
  <a href="https://www.jsdelivr.com/package/npm/foundation-sites?path=dist" class="button" target="_blank">See all CDN files and versions</a>
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
