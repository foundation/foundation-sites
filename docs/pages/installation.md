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

## CSS Download

If you aren't into Sass, we have a starter template with compiled CSS and JavaScript, as well as a starting `index.html` file for you to hack on. Just unzip and get coding!

<a href="http://foundation.zurb.com/sites/download" class="large button">Download CSS Version</a>

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
