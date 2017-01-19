---
title: Starter Projects
description: We have a few starter project templates that can be installed with the Foundation CLI. You can also download them manually! If you are using WordPress, Angular or other integrations, there is likely a starter project for you!
previous:
  url: updating.html
  title: Updating
next:
  url: compatibility.html
  title: Compatibility
---

Our project templates give you a solid... *Foundation* on which to start a new project. Both templates use the [Gulp](http://gulpjs.com) build system to automate the process of compiling Sass, processing JavaScript, copying files, and more.

## Basic Template

Our basic project template is a lot like the Sass template from Foundation 5. The project has a flat directory structure and only compiles Sass. It's great if you want to quickly put together a simple project and only need to use Sass.

You can set up a basic project through the Foundation CLI with this command:

```bash
foundation new --framework sites --template basic
```

It's also possible to download the template files directly from GitHub. Run `npm install` and `bower install` first to set it up, then `npm start` to run it. [Download basic template](https://github.com/zurb/foundation-sites-template/archive/master.zip).

---

## ZURB Template

The official ZURB Template includes not only Sass processing, but also JavaScript processing, Handlebars templating, and image compression. We use this exact template at ZURB for our client work!

You can set up an advanced project through the Foundation CLI with this command:

```bash
foundation new --framework sites --template zurb
```

It's also possible to download the template files directly from GitHub. Run `npm install` and `bower install` first to set it up, then `npm start` to run it. [Download advanced template](https://github.com/zurb/foundation-zurb-template/archive/master.zip).

The biggest difference between this and the basic template is the folder structure. In the ZURB Template, your project has a `src/` folder which contains your source files, and a separate `dist/` folder with your finished website. As you work on your project, Gulp continuously updates your `dist/` folder with new versions of files. To compile a production build, run `npm run build`.

To override or add to the default styles of the ZURB Template, in your project's `src/assets/scss/` folder
 - Change Sass variables in `_settings.scss`
 - Add custom SCSS and css to new files in the `components` folder then import those files at the bottom of `app.scss`

The `_settings.scss` and `app.scss` files are not changed when upgrading an existing project. As a result, you must manually edit your `_settings.scss` file to incorporate any Sass changes found [in the release notes](https://github.com/zurb/foundation-sites/releases).

Here's an overview of what the ZURB Template can do:

### Asset Copying

Gulp will copy anything out of the `src/assets` folder as-is to the `assets` folder of your final project. Note that Sass files, JavaScript files, and images are *not* part of this copying process, as they have their own steps.

### Page Compilation

The `src/` directory includes three folders used to create HTML pages: `pages/`, `layouts/`, and `partials/`. A flat file compiler called [Panini](panini.html) is used to process your project's various pages, inserting them into a common template, and injecting any HTML partials. This is done with a templating language called [Handlebars](http://handlebarsjs.com/).

Panini has a dedicated page here in the docs that explains its various features. **[Learn more about Panini.](panini.html)**

### Sass Compilation

Sass is compiled to CSS using [Libsass](http://sass-lang.com/libsass) (via [node-sass](https://github.com/sass/node-sass)). The main Sass file is under `src/assets/scss/app.scss`, and imports Foundation and Motion UI. Any new Sass partials you create should be in this folder as well.

The CSS is output in the `nested` style, which is readable like normal CSS. A source map is also created, which can be read by developer tools such as the Chrome Web Inspector. When building for production, the CSS is also compressed with [clean-css](https://github.com/jakubpawlowicz/clean-css/issues), and pruned with [UnCSS](https://github.com/giakki/uncss). UnCSS scans the HTML of your pages and removes any CSS classes you didn't use.

### JavaScript Compilation

All JavaScript files in the `src/assets/js` folder, along with Foundation and its dependencies, are bundled into one file called `app.js`. The files are bundled in this order:

- Foundation's dependencies (including jQuery)
- All files in `src/assets/js`
- `app.js`

A source map is created that maps back to the original files. By default, the bundled `app.js` is uncompressed. When building for production, the file is run through [UglifyJS](https://github.com/mishoo/UglifyJS) for compression.

### Image Compression

By default, all images are copied as-is from `assets/img` to your `dist` folder. When building for production, images are run through [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin) for compression. The plugin supports JPEG, PNG, SVG, and GIF files.

### BrowserSync

The template creates a [BrowserSync](http://www.browsersync.io/) server, which is at `http://localhost:8000`. Load this URL to see your compiled templates. While the server is running, any time you save a file, any pages you have open will automatically refresh, allowing you to see changes in real-time as you work.

### Style Guide Creation

Under `src/styleguide` are two files to create a style guide for your project. The style guide is generated using Style Sherpa, a small plugin created by ZURB.

Style Sherpa has a dedicated page here in the docs that explains its various features. **[Learn more about Style Sherpa.](style-sherpa.html)**

---

## Other Integrations

<div class="row columns">
  <h4 class="subheader">We collected some valuable starter projects for Foundation 6 we think you'll like.</h4>
  <hr class="docs-hr-small">
</div>

<div class="row small-up-2 medium-up-3 large-up-3 thumb-row">

  <div class="column">
    <a href="https://circlingthesun.github.io/angular-foundation-6/" target="_blank">
      <img style="height: 150px;" src="http://foundation.zurb.com/assets/img/foundation-apps/built-on-angular.svg" alt="" />
      <h5 class="thumb-category">Angular Foundation 6</h5>
      <p class="thumb-description" target="_blank">The awesome folks at Pinecone created an Angular port for Foundation 6.</p>
    </a>
  </div>

  <div class="column">
    <a href="http://jointswp.com/" target="_blank">
      <img style="margin-bottom: 4rem;" src="https://materiell.com/wp-content/uploads/2016/04/materiell-foundation-jointswp-wordpress.jpg" alt="" />
      <h5 class="thumb-category">JointsWP - WordPress Theme</h5>
      <p class="thumb-description" target="_blank">JointsWP is a powerful and flexible blank WordPress theme built with Foundation 6.</p>
    </a>
  </div>

  <div class="column">
    <a href="https://themeforest.net/item/sd-business-responsive-wordpress-theme/14934920?s_rank=12" target="_blank">
      <img src="http://www.designbombs.com/wp-content/uploads/2016/02/foundationpress.png" alt="" />
      <h5 class="thumb-category">FoundationPress - WordPress Theme</h5>
      <p class="thumb-description" target="_blank">FoundationPress: the ultimate WordPress starter-theme built on Foundation 6. FoundationPress is meant to be a starting point, not the final product.</p>
    </a>
  </div>

</div>

<div class="text-center">
  <a href="http://foundation.zurb.com/sites/resources.html" target="_blank" class="button-docs secondary">See All Resources</a>
</div>

---

## Related Resources

<div class="row small-up-1 medium-up-2 large-up-3 thumb-row">

  <div class="column">
    <a href="http://foundation.zurb.com/learn/learn-the-zurb-stack-panini.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-panini-zurb.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, WORKFLOW, OPTIMIZATION, GULP</h5>
      <p class="thumb-description" target="_blank">Under Promise &amp; Over Deliver with the ZURB Stack<span class="thumb-author">Geoff Kimball | ZURB</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/upgrade-foundation-6-rails-gem.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-upgraderails-jamesstone.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, RUBY, RAILS, INSTALL</h5>
      <p class="thumb-description">Upgrade to the Foundation 6 Rails Gem From Foundation 5<span class="thumb-author">James Stone</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/foundation-6-zurb-stack-part-1.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/learn/training/tuts-zurb-stack-part-1.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, OPTIMIZATION, PROJECT STRUCTURE, ZURB STACK</h5>
      <p class="thumb-description">What the ZURB Stack Does - Part 1<span class="thumb-author">Rafi Benkual</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/foundation-6-zurb-stack-part-2.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/learn/training/tuts-zurb-stack-part-2.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, OPTIMIZATION, PROJECT STRUCTURE, ZURB STACK</h5>
      <p class="thumb-description">What the ZURB Stack Does - Part 2<span class="thumb-author">Rafi Benkual</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/foundation-6-stack-file-structure.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/learn/training/tuts-stack-file-structure.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, SASS, PROJECT STRUCTURE, ZURB STACK</h5>
      <p class="thumb-description">Overview of Foundation's ZURB Stack and File Structure<span class="thumb-author">Rafi Benkual</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/foundation-6-stack-file-structure.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/learn/training/tuts-stack-file-structure.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, SASS, PROJECT STRUCTURE, ZURB STACK</h5>
      <p class="thumb-description">Overview of Foundation's ZURB Stack and File Structure<span class="thumb-author">Rafi Benkual</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/deploy-your-foundation-website-with-the-zurb-stack.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-deploy-gulpfile.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">GULP, WORKFLOW, ZURB STACK</h5>
      <p class="thumb-description">Deploy your Foundation Website with the ZURB Stack<span class="thumb-author">ZURB</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://foundation.zurb.com/learn/install-foundation-6-sass-on-windows.html" target="_blank">
      <img src="http://foundation.zurb.com/assets/img/develop/tuts-sass-windows-jamesstone.png" class="tuts-img" height="" width="" alt="image clip of video">
      <h5 class="thumb-category">F6, SASS, INSTALL, CLI</h5>
      <p class="thumb-description">Installing Foundation 6 Sass on Windows<span class="thumb-author">James Stone</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://developer.telerik.com/featured/using-foundation-6-asp-net-core/" target="_blank">
      <p class="thumb-description">Using Foundation 6 on ASP.NET Core<span class="thumb-author">By Ed Charbeneau</span></p>
    </a>
    <a href="http://penguindreams.org/blog/jekyll-3-and-foundation-6/" target="_blank">
      <p class="thumb-description">Jekyll 3 and Foundation 6<span class="thumb-author">By Sumit Khanna</span></p>
    </a>
    <a href="https://www.sitepoint.com/getting-started-with-foundation-6s-cli-tools/" target="_blank">
      <p class="thumb-description">Getting Started with Foundation 6’s CLI Tools<span class="thumb-author">By Julian Ćwirko</span></p>
    </a>
  </div>

  <div class="column">
    <a href="http://giverhell.com/2016/02/13/get-started-with-zurbs-foundation-6-for-sites-on-windows-with-scss/" target="_blank">
      <p class="thumb-description">Get started with ZURB’s Foundation 6 on Windows with SCSS<span class="thumb-author">By Cory</span></p>
    </a>
    <a href="https://zeek.com/update-heisenberg-to-foundation-sites-6/" target="_blank">
      <p class="thumb-description">Heisenberg WP Theme is now on Foundation 6<span class="thumb-author">By Jacob Arriola</span></p>
    </a>
    <a href="https://emberobserver.com/addons/ember-cli-foundation-6-sass" target="_blank">
      <p class="thumb-description">Foundation 6 SASS package for Ember CLI<span class="thumb-author">By Acoustep</span></p>
    </a>
  </div>

</div>
