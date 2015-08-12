---
title: Starter Templates
description: We have a few starter project templates that can be installed with Yeti Launch or the Foundation CLI. You can also download them manually!
---

Our templates give you a solid... *Foundation* on which to start a new project. Both templates use the [Gulp](http://gulpjs.com) build system to automate the process of compiling Sass, processing JavaScript, copying files, and more.

## Basic Template

Our basic template is a lot like the Sass template from Foundation 5. The project has a flat directory structure and only compiles Sass. It's great if you want to quickly put together a simple project and only need to use Sass.

You can set up a basic project through [Yeti Launch](installation.html), or the Foundation CLI with this command:

```bash
foundation new --framework sites --template basic
```

It's also possible to download the template files directly from GitHub. Run `npm install` and `bower install` first to set it up, then `npm start` to run it. [Download basic template](https://github.com/zurb/foundation-sites-template/archive/master.zip).

---

## Advanced Template

The advanced template is a fully-featured static site generator. We use this exact template at ZURB for our client work!

The biggest difference between this and the basic template is the folder structure. In the advanced template, your project has a `src/` folder which contains your source files, and a separate `dist/` folder with your finished website. As you work on your project, Gulp continuously updates your `dist/` folder with new versions of files.

Here's an overview of what Gulp does in this project:

- Copy static assets
- Compile Sass to CSS
- Concatenate JavaScript files
- Run a LiveReload server

If you run `gulp` with the `--production` flag, Gulp will also:

- Compress CSS
- Run [UnCSS](https://github.com/giakki/uncss) to prune unused CSS from your files
- Compress JavaScript
- Compress images (JPEG, PNG, GIF, and SVG)

You can set up a basic project through [Yeti Launch](installation.html), or the Foundation CLI with this command:

```bash
foundation new --framework sites --template advanced
```

It's also possible to download the template files directly from GitHub. Run `npm install` and `bower install` first to set it up, then `npm start` to run it. [Download advanced template](https://github.com/zurb/foundation-ssg/archive/master.zip).
