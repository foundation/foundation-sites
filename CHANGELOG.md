# Changelog
We'll keep you up to date with what we've released so you at least have a gist of what goes into each update. For the most part, we'll try to list things out as detailed as we see necessary.

---

### 3.1.1- September 19, 2012
Updating Top Bar navigation implementation pattern to wrap `.contain-to-grid` and/or `.fixed` around the `nav` element to prevent horizontal scroll bars when using `.contain-to-grid`. Updated the topBar breakpoint option so users only need to update the Scss variable.

### **3.1**- September 14, 2012
Launched new features, a new Add-ons section to the marketing site, Right to left language support, and fixed bugs.

With this release of Foundation, we include:
* Downloadable HTML template pages that can be copy/pasted into an existing project or added to your project upon downloading from the customizer.
* The Add-on's section includes a round-up of all the playground pieces, etc that aren't officially included in Foundation, but built to work with it. This includes: [Templates](http://foundation.zurb.com/add-ons.php), [Icon Fonts](http://foundation.zurb.com/icon-fonts.php), [Off-Canvas Layouts](http://foundation.zurb.com/off-canvas.php), [Responsive Tables](http://foundation.zurb.com/responsive-tables.php), [SVG Social Icons](http://foundation.zurb.com/social-icons.php), and [Omnigraffle Stencils](http://foundation.zurb.com/stencils.php).
* Foundation now includes a [responsive top navigation](http://foundation.zurb.com/navigation.php) bar that lets you have control over when it responds and what you include in it. We've made it really easy to customize using Scss.
* Right-to-left language support straight out of the box. You can adjust this in the settings.scss file or upon downloading with the customizer.
* New UI Styles for Progress Bars and Image Thumbs.
* Updated to include jQuery 1.8.1
* Orbit thumbnail documentation.
* Better Reveal size documentation.

### 3.0.9- August 14, 2012
Bug fixes and locking down dependencies.

### 3.0.8- August 10, 2012
Numerous bugfixes. Added media query toggle plugin. Removed marketing site from repository and included a new `test/` directory to help contributors test patches.

New features: Media Query Toggler, block-grid mobile layouts, font-size customizer options and included modular scale gem as dependancy for SCSS version.

### 3.0.7- July 30, 2012
Numerous JS bug fixes, added generators for Rails and refactored SCSS directory for better maintainability and scalability over time. CSS files weren't affected by this refactoring.

### 3.0.6- July 20, 2012
Numerous bugfixes including dropdown buttons on touch devices, Modernizr update with IE8Compat, split button colors, and more. Split out the functions in app.js to be part of the Gem and only initialized in app.js, so you can keep a clean distinction between your JS and Foundation's (if you want to). Added an [accordion](http://foundation.zurb.com/elements.php) element.

### 3.0.5- July 10, 2012
Fixed Compass performance issues by separating out each Foundation file and removing extraneous imports.

### 3.0.4- July 6, 2012
Fixed a number of bugs around the Sass/Gem installs and documentation. Some smaller items:
* Fixed a bug with dropdown buttons to allow clicking on their anchors again.
* Added styles for HTML5 (and other) input styles, not just text.
* Added error states back to the forms documentation.
* Flyouts in a nav bar can now expand up as well as down.
* In SCSS you can now set $base-size correctly, but we're still working to correct modifying the $ratio variable.

### 3.0.1 to 3.0.3- July 2 to July 4, 2012
Various bug fixes with the downloader, gem, and Sass install.

### **3.0**- June 30, 2012
Initial launch of Foundation 3, deprecating Foundation 2.2.1. Major enhancements include Sass/SCSS development, new grid system with box-sizing: border-box, new form styles, new UI elements, retooled download and install options, new docs, new marketing site.