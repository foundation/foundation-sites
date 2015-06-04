---
title: Right-to-Left Support
description: Foundation can easily adapt its components to work with languages that read from right to left.
---

## HTML

You'll need to make a few changes to your markup to get the Javascript components working nice and smooth. In the `<html>` tag, you'll need to add a `dir` attribute with a value of `rtl`. Here's what your `<html>` tag should look like:

```html
<!-- This example is for a right-to-left Arabic layout -->
<html class="no-js" lang="ar" dir="rtl">
```

### Language Code

You'll need to change your lang attribute value to match your language. Here's a handy list of common right-to-left languages and their html codes.

- **Arabic:** `ar`
- **Chinese:** `zh`
- **Farsi:** `fa`
- **Hebrew:** `he`, `iw`
- **Japanese:** `ja`
- **Urdu:** `ur`
- **Yiddish:** `yi`, `ji`

View of a [full list of language codes](http://www.loc.gov/standards/iso639-2/php/code_list.php) on the website of the Library of Congress.

---

## CSS

### Pre-built Files

The Foundation download, Bower package, and npm package include a separate RTL version of the CSS, titled `foundation.rtl.css`. You can drop this into an existing project to enable the RTL version of Foundation.

### Using a Build System

We use a tool called [RTLCSS](https://github.com/MohammadYounes/rtlcss), a [PostCSS](https://github.com/postcss/postcss) plugin, to help us generate a right-to-left version of the Foundation CSS. If you're using one of our template projects, or using your own build system, you can add it to your build process fairly easily.

#### Gulp

Our template projects use the [Gulp](http://gulpjs.com) build system. You can add the [gulp-rtlcss](https://github.com/jjlharrison/gulp-rtlcss) plugin to your build process to generate an RTL version of your CSS. Here's what it looks like when using the `sass` task in the basic template's Gulpfile:

```js
gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      errLogToConsole: true
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    // RTLCSS runs after Sass and Autoprefixer are done
    .pipe($.rtlcss())
    .pipe(gulp.dest('./css'));
});
```

#### Other Build Systems

RTLCSS can also be used standalone or as a command line tool (via [rtlcss](https://github.com/MohammadYounes/rtlcss)), or used with Grunt (via [grunt-rtlcss](https://github.com/MohammadYounes/grunt-rtlcss)).
