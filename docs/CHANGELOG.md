### 4.3.2- September 23, 2013

* Documentation updates
* When changing slides in Orbit all `data-orbit-link` will now get an active class
* Adds new `em-calc` function, old `emCalc` will automatically reference newly named function
* Lots of other bug fixes

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.3.1...v4.3.2).

### 4.3.1- July 23, 2013
* Fixes RTL animation issues in Orbit
* Addresses error class conflicts between Abide and general form styles
* Bug fixes


You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.3.0...v4.3.1).

### 4.3- July 18, 2013
* Added [Abide](http://foundation.zurb.com/docs/components/abide.html), our new form validation plugin that works with simple data-attributes.
* Rewrote Orbit to include previous options and animations. We also made it possible to have variable height slides and separate animations.
* Top Bar JS updates to fix a scrollTop bug
* Fixed a positioning bug in custom forms when using the collapsed option
* Added custom section to custom forms
* Updated Interchange to support absolute URLs
* Updated the emCalc to be used unitlessly and with multiple values
* Created an early "opt-in" grid that we've built for Foundation 5. This includes 2 breakpoints and three grids (small, medium, large). Use this to start planning ahead to Foundation 5.
* Fixed a bug with Section deep linking in nested content
* Top Bar toggle bug fixes
* Fixed bugs with dropdown positioning and closing
* Updated visual style of bullets for Orbit
* General bug fixes, improvements and refinements.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.2.3...v4.3.0).

### 4.2.3- June 26, 2013
* Made it to where custom switches work inside custom forms.
* Small update to breadcrumb styling so that defaults don't get overridden.
* Fixed bugs with height of Top Bar.
* Added Middleman template to README
* Fixed a wrong selector in forms.js
* Bug fixes

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.2.2...v4.2.3).

### 4.2.2- June 11, 2013
* Added touch events to zepto core.
* Fixed a topbar scroll issue.
* Fixed a reveal scroll issue.
* Bumped jQuery to 1.10.1
* Added PHP template.
* Removed default webkit appearance on buttons.
* Updated placeholder.js to actually initiate properly, this should work just fine now.
* Added a "fixed" class to magellan for alternate styling.
* Fixed path to variables file for Compass upgrade path.
* Other small bug fixes.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.2.1...v4.2.2).

### 4.2.1- May 31, 2013
* Add missing `$experimental` Sass variable.
* Bug fixes for top bar in mobile view.
* Retina is now a default named media query for Interchange.
* Removes incompatible Zepto function used in custom forms.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.2.0...v4.2.1).

### 4.2- May 30, 2013
* Added new Interchange Plugin for handling responsive images.
* Made a variable for the "sticky" class on the top-bar.
* Changed media query variables to pixels for better consistency between font sizes.
* Fixed deep linking for foundation.section.js.
* Added data-options support to top-bar, you can now include "is_hover: false" to make it clickable.
* Each dropdown section of the top-bar for mobile now takes on its natural height rather than looking for the tallest and setting them all to that.
* Added data-options support for tool-tips.
* Added .large-uncentered for when you only want centered on small screens.
* Made block-grid spacing more like the normal grid.
* Fixed confusing comments in visibility classes SCSS file.
* Added AJAX support to Reveal.
* Added cursor variables.
* Fixed various typos in the documentation.
* Updated CONTRIBUTOR.md to include how to run the docs locally.
* Added Codekit instructions to documentation.
* Changed to a better method test for Zepto.
* Added hover support for dropdowns data-options by including "is_hover: true" to the options.
* Added the ability to use deep-linking inside nested Sections.
* Added the ability to use HTML in the data-caption for Clearing.
* Fixes problem with embedded Youtube videos inside of Reveal.
* Orbit now has pause/resume on hover/mousout capability.
* Fixed Section vertical tabs on mobile.
* Lots of small bug fixes and improvements for many of the JS components.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.1.6...v4.2.0).

### 4.1.6- May 6, 2013
* Improved performance for custom select boxes.
* Bug fix for switches contained within custom forms.
* Bug fix for directly clicking on checkbox to toggle it
* Sections are now semantic.

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.1.5...v4.1.6).

### 4.1.5- April 26, 2013
* Add support for `indexOf` in legacy browsers

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.1.4...v4.1.5).

### 4.1.4- April 26, 2013
* Fixes invalid Rails generator path

### 4.1.3- April 25, 2013

* Added _variables.scss, which holds default variables and creates the settings file for the gem
* Rearranged a few mixins in order to remove the confusing _foundation-globals.scss file
  * If you are getting errors after upgrade, just remove any reference to this file...
* Added reference to $base-line-height variables for those using Compass vertical rhythm
* Fixed issue with invalid css coming through into buttons
* Various bug fixes
* Adds support for infinite section nesting
* Updated top bar styles
* Support for data-options in Reveal

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.1.2...v4.1.3).

### 4.1.2- April 10, 2013

* Added Joyride expose functionality
* General bug fixes for regressions that came up with RTL release
* Section is now fully semantic
* Clicking on current thumbnail in Clearing now advances to next slide
* data-options support added to Clearing
* Addressed Foundation loader incompatiblities with non-jQuery and non-Zepto JS libraries
* Fixed Rails generator bug when using CoffeeScript files
* Added `reflow` to Section js plugin to support dynamic content

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.1.1...v4.1.2).

### 4.1.1- April 2, 2013
* Changed all references to the variable `$default-opposite` to `$opposite-direction`
* Added `dir` attribute to `html` tag
* Added direction variables to `foundation.dropdown.js`, `foundation.clearing.js`, `foundation.joyride.js`, `foundation.orbit.js`, `foundation.section.js`, `foundation.topbar.js` and `foundation.tooltips.js`.
* Updated customizer with text direction setting
* Added right-to-left text direction documentation

You can compare the commits [here](https://github.com/zurb/foundation/compare/v4.0.9...v4.1.1).


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
