---
title: Starter Projects
description: We have a few starter project templates that can be installed with Yeti Launch or the Foundation CLI. You can also download them manually!
---

Our project templates give you a solid... *Foundation* on which to start a new project. Both templates use the [Gulp](http://gulpjs.com) build system to automate the process of compiling Sass, processing JavaScript, copying files, and more.

## Basic Template

Our basic project template is a lot like the Sass template from Foundation 5. The project has a flat directory structure and only compiles Sass. It's great if you want to quickly put together a simple project and only need to use Sass.

You can set up a basic project through [Yeti Launch](installation.html), or the Foundation CLI with this command:

```bash
foundation new --framework sites --template basic
```

It's also possible to download the template files directly from GitHub. Run `npm install` and `bower install` first to set it up, then `npm start` to run it. [Download basic template](https://github.com/zurb/foundation-sites-template/archive/master.zip).

---

## ZURB Template

The official ZURB Template includes not only Sass processing, but also JavaScript processing, Handlebars templating, and image compression. We use this exact template at ZURB for our client work!

You can set up an advanced project through [Yeti Launch](installation.html), or the Foundation CLI with this command:

```bash
foundation new --framework sites --template zurb
```

It's also possible to download the template files directly from GitHub. Run `npm install` and `bower install` first to set it up, then `npm start` to run it. [Download advanced template](https://github.com/zurb/foundation-zurb-template/archive/master.zip). 

The biggest difference between this and the basic template is the folder structure. In the ZURB Template, your project has a `src/` folder which contains your source files, and a separate `dist/` folder with your finished website. As you work on your project, Gulp continuously updates your `dist/` folder with new versions of files. To compile a production build, run `npm run build`.

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
