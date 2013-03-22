### 4.0.9- March 19, 2013
* Added `auto` option to `Foundation.section.js.
* Fixes dropdown positioning for split buttons.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.0.8...v4.0.9).

### 4.0.8- March 15, 2013
* Added paragraph `text-rendering` variable: `$paragraph-text-rendering`.
* Changed blockgrid to use clearfix instead of overflow.
* Fixed nested row margin inside forms.
* Fixed data_options function that caused booleans to be interpreted as numbers.
* Tabs no longer automatically convert to accordion on desktop. 
* Sections with accordion class always remain accordions and sections with tab class always remain tabs. 
* Vertical and horizontal navigation elements still become accordions on mobile

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.0.7...v4.0.8).


### 4.0.7- March 14, 2013
* Fixed problem with buggy pull request that made radius buttons look like ovals, sorry.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.0.6...v4.0.7).

---

### 4.0.6- March 14, 2013 (Yanked)
* Added modular HTML class variables to control whether or no those classes come through into your CSS.
* Changed global font size defaults to 100% to let browsers use their default zooming.
* Fixed bugs with top-bar bottom margin variables.
* Bug fixes for Reveal click event propigation.
* Bug fixes in the Dropdown plugins for positioning.
* Removed duplicate binding in sections.
* Changes all references to `$button-radius` to `$global-radius` to fix customizer blank css files.
* Updated customizer with better groupings in the checkbox section.
* Added data-options support to Orbit.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.0.5...v4.0.6).

---

### 4.0.5- March 8, 2013
* Custom classes added to custom forms now carry through to JS.
* Added `.horizontal-nav` to `foundation.section.js`.
* Fixed variables that weren't being inherited properly.
* Fixed a joyride mobile background issue.
* Updated Reveal docs to match 4.0.4 functionality.
* Updated to Zepto 1.0.
* Fixed bugs with visibility classes.
* Updated block-grid nth-of-type clear fix so that it actually works.
* All size block grids now have the same spacing.
* Made images `display: inline-block` by default to remove gap and not screw up layouts.
* Progress bars respect their color variables instead of global.
* Added variable for progress bar background color.
* Fixed inconsistency between side margins on unordered and ordered lists.
* Made it so you can set `custom_back_text` variable in top-bar to control if the back link is generic or specific.
* Updated visibility classes to work properly with table display properties.
* Helper classes like `.right, .left` now have `!important` so they don't get overriden on accident.
* Added a page to the docs that explains our use of [media queries](http://foundation.zurb.com/docs/media-queries.html).
* Removed default outline on a:focus elements that normalize adds.
* Fixed bug with custom checkboxes not clickable from the `<span>`.
* Added docs about using Sass standalone with Foundation.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.0.4...v4.0.5).

---

### 4.0.4
This patch fixes various bugs that have been submitted since release. We'll be more specific with changelog updates going forward.

---

### 4.0.3
Bug fixes

---

### 4.0.2
Bug fixes

---

### 4.0.1
Bug fixes

---

### **4.0**- February 28, 2013
Initial launch of Foundation 4, a rewritten, mobile-first implementation of the framework. Major enhancements include a mobile-first approach across the board, Scss tools to allow for all-semantic coding, and rewritten JS plugins for speed and ease of use. Marketing site updates, new docs, refined and simplified styles and more. Review the [migration guide](http://foundation.zurb.com/migration.php) for more information.

---

### 3.2.5
Bug fixes

---

### 3.2.4
Bug fixes

---

### 3.2.3
Bug fixes

---

### 3.2.2- November 10, 2012
This patch fixes a typo found in the tabs plugin.

---

### 3.2.1- November 9, 2012
This patch include bug fixes for various elements, such as:
* Adding a missing line for mqueries.scss into app.scss
* Height of fixed magellan element
* Update viewport tag with initial-scale
* Dropdown button fixes
* Clearing bug fixes
* Added a font-smoothing variable
* Added close support to accordions
* Removed deep linking hashes from tabs
* Topbar now resets on close for small layouts

---

### **3.2**- October 26, 2012
With this update we've revamped our documentation to be more organized and explain details regarding Scss, Compass and Javascripts.

The updates to Foundation itself are as follows:
* Added [Magellan](http://foundation.zurb.com/docs/magellan.php), a plugin for building design agnostic sticky navs that know where you are on the page.
* Added [Joyride](http://foundation.zurb.com/docs/joyride.php), our plugin for creating tours of your website or app.
* Added [Clearing](http://foundation.zurb.com/docs/clearing.php), our new responsive image gallery lightbox plugin.
* Cleaned up Orbit a bit. We now use opacity on each slide so you don't have stacking problems or different image size problems. You can now optionally stack slides on mobile. Orbit can now be swipable on mobile as well.
* Updated Reveal
* Updated index files to use defined header and footer structure
* Cleaned up some Compass included
* RTL for ui and navbar.
* Tabs can now use unordered lists or definition lists, replacing the definition title with an li.section-title.
* Added definition list styles.
* Added mobile-#-up classes to use in conjunction with regular block-grid classes for a different mobile grid.
* Updated block grids to be really flexible and customizable based on a variable.
* Added better responsive styling for tooltips.
* Separated all media queries into their own file for easy droppping.
* Updated modular scale to use new functions, doesn't effect end-users.
* Updated visibility classes to use inherit instead of block to accomodate for spans.
* Removed HTML5 Shiv from header since its included in modernizr.
* Added [pricing tables](http://foundation.zurb.com/docs/elements.php#pricing-tables) UI element
* Added many new Scss variables to control styling for things like: topbar, clearing, joyride, pricint tables, etc.
* Bug fixes for Topbar.
* Added 5 [HTML templates](http://foundation.zurb.com/templates.php) to the add-ons section.

---

### 3.1.1- September 19, 2012
Updating Top Bar navigation implementation pattern to wrap `.contain-to-grid` and/or `.fixed` around the `nav` element to prevent horizontal scroll bars when using `.contain-to-grid`. Updated the topBar breakpoint option so users only need to update the Scss variable.

---

### **3.1**- September 14, 2012
Launched new features, a new Add-ons section to the marketing site, Right to left language support, and fixed bugs.

With this release of Foundation, we include:
* Downloadable HTML template pages that can be copy/pasted into an existing project or added to your project upon downloading from the customizer.
* The Add-on's section includes a round-up of all the playground pieces, etc that aren't officially included in Foundation, but built to work with it. This includes: [Templates](http://foundation.zurb.com/templates.php), [Icon Fonts](http://foundation.zurb.com/icon-fonts.php), [Off-Canvas Layouts](http://foundation.zurb.com/off-canvas.php), [Responsive Tables](http://foundation.zurb.com/responsive-tables.php), [SVG Social Icons](http://foundation.zurb.com/social-icons.php), and [Omnigraffle Stencils](http://foundation.zurb.com/stencils.php).
* Foundation now includes a [responsive top navigation](http://foundation.zurb.com/navigation.php) bar that lets you have control over when it responds and what you include in it. We've made it really easy to customize using Scss.
* Right-to-left language support straight out of the box. You can adjust this in the settings.scss file or upon downloading with the customizer.
* New UI Styles for Progress Bars and Image Thumbs.
* Updated to include jQuery 1.8.1
* Orbit thumbnail documentation.
* Better Reveal size documentation.

---

### 3.0.9- August 14, 2012
Bug fixes and locking down dependencies.

---

### 3.0.8- August 10, 2012
Numerous bugfixes. Added media query toggle plugin. Removed marketing site from repository and included a new `test/` directory to help contributors test patches.

New features: Media Query Toggler, block-grid mobile layouts, font-size customizer options and included modular scale gem as dependancy for SCSS version.

---

### 3.0.7- July 30, 2012
Numerous JS bug fixes, added generators for Rails and refactored SCSS directory for better maintainability and scalability over time. CSS files weren't affected by this refactoring.

---

### 3.0.6- July 20, 2012
Numerous bugfixes including dropdown buttons on touch devices, Modernizr update with IE8Compat, split button colors, and more. Split out the functions in app.js to be part of the Gem and only initialized in app.js, so you can keep a clean distinction between your JS and Foundation's (if you want to). Added an [accordion](http://foundation.zurb.com/elements.php) element.

---

### 3.0.5- July 10, 2012
Fixed Compass performance issues by separating out each Foundation file and removing extraneous imports.

---

### 3.0.4- July 6, 2012
Fixed a number of bugs around the Sass/Gem installs and documentation. Some smaller items:
* Fixed a bug with dropdown buttons to allow clicking on their anchors again.
* Added styles for HTML5 (and other) input styles, not just text.
* Added error states back to the forms documentation.
* Flyouts in a nav bar can now expand up as well as down.
* In SCSS you can now set $base-size correctly, but we're still working to correct modifying the $ratio variable.

---

### 3.0.1 to 3.0.3- July 2 to July 4, 2012
Various bug fixes with the downloader, gem, and Sass install.

---

### **3.0**- June 30, 2012
Initial launch of Foundation 3, deprecating Foundation 2.2.1. Major enhancements include Sass/SCSS development, new grid system with box-sizing: border-box, new form styles, new UI elements, retooled download and install options, new docs, new marketing site.