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
    <a href="https://www.npmjs.com/package/foundation-sites">
      <img class="docs-install-vendor-icon" src="{{root}}assets/img/icons/logo-pnpm.svg" alt="PNPM">
    </a>
  </div>
  <div class="cell small-10">
    <div class="docs-code">
      <code class="bash">
        pnpm install foundation-sites
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

  <p>To remove the Foundation 5 CLI, run <code>gem uninstall foundation</code>. After testing the Foundation 6 CLI, if you want to remove it to go back to the old CLI, run <code>npm uninstall foundation-cli --global</code>.</p>
</div>

<div class="callout info">
  <p><strong>Windows users</strong>: make sure you've python v2.7 available in your node environment since it's required by the node-gyp tool. There are two way to achieve this</p>

  <ol>
    <li>Install the <a href="https://github.com/felixrieseberg/windows-build-tools">windows-build-tools</a> (recommended) and make python afterwards accessible via <code>npm config set python "%USERPROFILE%\.windows-build-tools\python27\python.exe"</code></li>
    <li>Install <a href="https://www.python.org/downloads/">python</a> (not recommended) and add it to your system environment variables</li>
  </ol>
 
  <p>The first way is recommended if you've not installed pythong v2.7 yet as it doesn't affect your machine outside the node environment. In case you've already installed python v2.7 you may of course skip both ways and start using foundationc-cli immediately.</p>
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.1/dist/css/foundation.min.css" integrity="sha256-1mcRjtAxlSjp6XJBgrBeeCORfBp/ppyX4tsvpQVCcpA= sha384-b5S5X654rX3Wo6z5/hnQ4GBmKuIJKMPwrJXn52ypjztlnDK2w9+9hSMBz/asy9Gw sha512-M1VveR2JGzpgWHb0elGqPTltHK3xbvu3Brgjfg4cg5ZNtyyApxw/45yHYsZ/rCVbfoO5MSZxB241wWq642jLtA==" crossorigin="anonymous">

<!-- Compressed JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.1/dist/js/foundation.min.js" integrity="sha256-WUKHnLrIrx8dew//IpSEmPN/NT3DGAEmIePQYIEJLLs= sha384-53StQWuVbn6figscdDC3xV00aYCPEz3srBdV/QGSXw3f19og3Tq2wTRe0vJqRTEO sha512-X9O+2f1ty1rzBJOC8AXBnuNUdyJg0m8xMKmbt9I3Vu/UOWmSg5zG+dtnje4wAZrKtkopz/PEDClHZ1LXx5IeOw==" crossorigin="anonymous"></script>
```

From Foundation 6.4, flex is enabled by default and **only the new XY Grid is availaible**. However, others CSS versions are availaible for backward compatibility and the most common usage cases. For others uses and advanced customization, we recommand to build Foundation with custom settings (see others installation methods).

```html
<!-- foundation-float.min.css: Compressed CSS with legacy Float Grid -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.1/dist/css/foundation-float.min.css" integrity="sha256-G4aYgUXr4BBL+Jq0iD/76u5e/4+BU5W/V+/g4QcCM3Y= sha384-49P837FYKAAlOm+zmLeYGIqzDRYRDy4zdAG3jyzqcVwnnJGh0MOxajp3JJlTDnh7 sha512-22kUT1tNth37k4XYOoLoAITcKFHtnjviE0XOmpeY4Ng4xo4rCODl+F90jHJpX4MVIWB1cpMNI04GoHi7Y8hZmw==" crossorigin="anonymous">

<!-- foundation-prototype.min.css: Compressed CSS with prototyping classes -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.1/dist/css/foundation-prototype.min.css" integrity="sha256-4n7bsCOOmkCVY5m2SjWXaaGNBVfpRp2Ru0o/9o2jBeA= sha384-ilPojSwjGVyRg/Z/cuDn5k4ifi7ndOZEvCy4OwnyJDEsBrVwI6ZyqYs+mfnl2rDQ sha512-twSqiAL34UZiv6u6OeU5HtYAOD0Zly8EZQM1ZdzhtSAuaTn+2HVFfOvOrvf5fLq62zqYtwh8U42Idn9b0qD3og==" crossorigin="anonymous">

<!-- foundation-rtl.min.css: Compressed CSS with right-to-left reading direction -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.1/dist/css/foundation-rtl.min.css" integrity="sha256-XlxeWxDsQfPdu4qiEAxQAng3/qnJhvZOZN/gZn0p71A= sha384-S/sFafRa3RAsKpyPwVCUZO8sjM+Sxh4qrVEC/XA9X0LXu7PduBaHpp3oWUyUq0qS sha512-T65eRA7TK5abF14H5Ovs6ov3lRSJkMEY7aI4B6nEtBA+kbtdhXwC2KO46kS4f68ysRXW5+Zu66054x369DRvYw==" crossorigin="anonymous">
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
