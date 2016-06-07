---
title: Foundation 6 Migration Guide
description: This guide describes the changes required to migrate a Foundation for Sites project from version 5 to 6.
---

## Getting Started

This guide describes the changes required to migrate a Foundation for Sites project from version 5 to 6.

### Should you update?

First off, it’s important to ask yourself why you want to upgrade an existing Foundation 5 site to Foundation 6. Any migration will take time and effort. Whether it’s the A11Y compatibility or the super light codebase, you’ll want to make sure those benefits outweigh the time and effort to upgrade. After all, thousands of successful sites are still on older versions of Foundation, including version [4](http://www.newbalance.com/), [3](https://jquery.com/), and even [2](http://camps.winshape.org/)!

### Why so many changes?

We're absolutely thrilled to share with you the best version of Foundation yet. It’s faster, 50% lighter, more versatile, flexible and powerful than ever before — getting your projects from Prototype to Production. With such lofty expectations, comes lot’s of changes. We went back to the drawing board, talked to many companies, and re-evaluated how a framework helps improve your workflow without getting in your way. 

A lot has changed and that means there is no simple upgrade path. If you feel like you’re willing and able to put in the work, this migration guide will help you get your existing Foundation 5 site on version 6.

*Converting from 4 to 6 is similar for most components.*

---

## Overview

When migrating, the following items can be translated easily from 5 to 6:

- The standard float grid
- Forms
- Visibility
- Typography
- Text helper classes
- Button class
- Label
- Table
- Progress Bar
- Tooltip
- Flex Video
- Thumbnail
- Equalizer
- Interchange
- Keystrokes
- Pagination
- Breadcrumbs

Other areas may require more changes to work correctly, either because there are significant changes from version 5, feature gaps, or both. These areas include:

- Reveal Modal
- Media Queries (Sass)
- Navigation
- Dropdown
- Alert
- Magellan
- Switch
- Off-canvas

The new menu components replaces many separate components in Foundation 5.

NEW 

- menu
  - dropdown-menu
  - drilldown-menu
  - accordion-menu
  - Responsive navigation 

REPLACES

- Top Bar
- Side Nav
- Inline List
- Icon Bar
- Sub Nav

What’s new that you might want to use:

- Flex Grid
- Sticky
- Toggler
- Close
- Media Object
- Orbit
- Top Bar (style wrapper)

What’s not in F6 that was in F5:

- Pricing Tables (available in [Building Blocks]())
- Joyride (version 3 to be added soon!)

---

## Visual Updates

Visual styles were updated in Foundation 6 to allow for easier CSS overides and a cleaner, more modern look.

Check out the [Visual Migration Page](migration-visual.html) to compare versions visually.

---

## Gulp and Bower

Foundation 5 used the Grunt task runner and Foundation 6 uses Gulp. We'll point out any differences you need to know about the versions.

---

## Dependencies

Good news: Foundation 6 has fewer dependencies than prior versions. We’ll list out the dependencies, and what is no longer needed from Foundation 5.

Foundation 6 Dependencies
- jQuery (v2.1.4)
- what-input.js
- Motion UI

In Foundation 6, you no longer need:
- Modernizr
- Fastclick
- jQuery.placeholder
- Normalize (bundled into codebase already)
- jQuery Cookie

With the launch the of Foundation 6, we released a new CLI that requires fewer dependencies and installs all versions of Foundation. It’s a win-win!

CLI Dependencies
- Git
- Node
- Bower

---

## Global

#### Colors

Some color variables have changed slightly, and colors have been refreshed in Foundation 6.

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>$primary-color: #008CBA;</td>
      <td>$primary: #2199e8;</td>
    </tr>
    <tr>
      <td>$secondary-color: #e7e7e7;</td>
      <td>$secondary: #777;</td>
    </tr>
    <tr>
      <td>$success-color: #43AC6A;</td>
      <td>$success: #3adb76;</td>
    </tr>
    <tr>
      <td>$warning-color: #f08a24;</td>
      <td>$warning: #ffae00;</td>
    </tr>
    <tr>
      <td>$alert-color: #f04124;</td>
      <td>$alert: #ec5840;</td>
    </tr>
    <tr>
      <td>$white: #FFFFFF;</td>
      <td>$white: #fefefe;</td>
    </tr>
    <tr>
      <td>$black: #000000;</td>
      <td>$black: #0a0a0a;</td>
    </tr>
    <tr>
      <td>$vapor: #F6F6F6;</td>
      <td>$light-gray: #e6e6e6;</td>
    </tr>
    <tr>
      <td>$vapor: #F6F6F6;</td>
      <td>$light-gray: #e6e6e6;</td>
    </tr>
    <tr>
      <td>$aluminum: #999999;</td>
      <td>$light-gray: #e6e6e6;</td>
    </tr>
    <tr>
      <td>$monsoon: #777777;</td>
      <td>$dark-gray: #8a8a8a;</td>
    </tr>
  </tbody>
</table>

The following colors from Foundation 5 were not added to Foundation 6 to simplify the color palletes and reduce complexity.

```scss
$info-color: #a0d3e8;
$ghost: #FAFAFA;
$snow: #F9F9F9;
$white-smoke: #F5F5F5;
$silver: #EFEFEF;
$smoke: #EEEEEE;
$gainsboro: #DDDDDD;
$iron: #CCCCCC;
$base: #AAAAAA;
$jumbo: #888888;
$steel: #666666;
$charcoal: #555555;
$tuatara: #444444;
$oil: #333333;
$jet: #222222;
```

Foundation 6 now uses a color-pallette Sass map to allow you to add your own color variables and classes. [More on Foundation 6 color pallete &#10142;](global.html)

#### Media Queries

Foundation for Sites has three core breakpoints:

- **Small:** any screen.
- **Medium:** any screen 640 pixels or wider.
- **Large:** any screen 1024 pixels or wider.

If you're using the CSS version of Foundation, the breakpoints have changed slightly:

Foundation 5

```css
// Small screens
@media only screen { } /* Define mobile styles */

@media only screen and (max-width: 40em) { } /* max-width 640px, mobile-only styles, use when QAing mobile issues */

// Medium screens
@media only screen and (min-width: 40.063em) { } /* min-width 641px, medium screens */

@media only screen and (min-width: 40.063em) and (max-width: 64em) { } /* min-width 641px and max-width 1024px, use when QAing tablet-only issues */

// Large screens
@media only screen and (min-width: 64.063em) { } /* min-width 1025px, large screens */

@media only screen and (min-width: 64.063em) and (max-width: 90em) { } /* min-width 1025px and max-width 1440px, use when QAing large screen-only issues */

// XLarge screens
@media only screen and (min-width: 90.063em) { } /* min-width 1441px, xlarge screens */

@media only screen and (min-width: 90.063em) and (max-width: 120em) { } /* min-width 1441px and max-width 1920px, use when QAing xlarge screen-only issues */

// XXLarge screens
@media only screen and (min-width: 120.063em) { } /* min-width 1921px, xxlarge screens */
```

Foundation 6

```css
/* Small only */
@media screen and (max-width: 39.9375em) {}

/* Medium and up */
@media screen and (min-width: 40em) {}

/* Medium only */
@media screen and (min-width: 40em) and (max-width: 63.9375em) {}

/* Large and up */
@media screen and (min-width: 64em) {}

/* Large only */
@media screen and (min-width: 64em) and (max-width: 74.9375em) {}
```

##### Upgrading breakpoints from Foundation 5 with Sass

In Foundation 5, breakpoints were accessed using a series of Sass variables named `$small-up`, `$small-only`, `$medium-only`, and so on. In Foundation 6, this method of writing media queries has been replaced with a dedicated [breakpoint mixin](media-queries.html#the-breakpoint-mixin), described below. **The legacy variables will be removed in Foundation 6.3.**

To upgrade your existing media queries, replace rulesets like this:

```scss
@media #{$medium-only} {
}
```

With this:

```scss
@include breakpoint(medium only) {
}
```

More on [changing breakpoints in Foundation 6 &#10142;](http://foundation.zurb.com/sites/docs/media-queries.html#changing-the-breakpoints)

---

## Component Map

<div class="row" data-magellan>
  <div class="medium-3 columns">
    <ul class="menu vertical">
      <li><a href="#abide">Abide</a></li>
      <li><a href="#accordion">Accordion</a></li>
      <li><a href="#alerts">Alerts</a></li>
      <li><a href="#block-grid">Block Grid</a></li>
      <li><a href="#breadcrumbs">Breadcrumbs</a></li>
      <li><a href="#button-group">Button Group</a></li>
      <li><a href="#button">Button</a></li>
      <!-- <li><a href="#clearing">Clearing</a></li> -->
      <li><a href="#dropdown">Dropdown</a></li>
      <li><a href="#dropdown-buttons">Dropdown Buttons</a></li>
      <li><a href="#equalizer">Equalizer</a></li>
    </ul>
  </div>
  <div class="medium-3 columns">
    <ul class="menu vertical">
      <li><a href="#flex-video">Flex Video</a></li>
      <li><a href="#forms">Forms</a></li>
      <li><a href="#grid">Grid</a></li>
      <li><a href="icon-bar">Icon Bar</a></li>
      <li><a href="inline-list">Inline List</a></li>
      <li><a href="#interchange">Interchange</a></li>
      <!-- <li><a href="#joyride">Joyride</a></li> -->
      <li><a href="#label">Label and Badges</a></li>
      <li><a href="#magellan">Magellan Sticky Nav</a></li>
      <li><a href="#off-canvas">Off Canvas</a></li>
      <li><a href="#orbit">Orbit</a></li>
    </ul>
  </div>
  <div class="medium-3 columns">
    <ul class="menu vertical">
      <li><a href="#pagination">Pagination</a></li>
      <li><a href="#panel">Panel</a></li>
      <li><a href="#progress-bar">Progress Bar</a></li>
      <li><a href="#pricing-tables">Pricing Tables</a></li>
      <li><a href="#rtl">RTL</a></li>
      <li><a href="#slider">Range Slider</a></li>
      <li><a href="#side-nav">Side Nav</a></li>
      <li><a href="#split-buttons">Split Buttons</a></li>
      <li><a href="#sub-nav">Sub Nav</a></li>
      <li><a href="#switch">Switch</a></li>
    </ul>
  </div>
  <div class="medium-3 columns">
    <ul class="menu vertical">
      <li><a href="#table">Table</a></li>
      <li><a href="#tabs">Tabs</a></li>
      <li><a href="#thumbnail">Thumbnail</a></li>
      <li><a href="#tooltip">Tooltip</a></li>
      <li><a href="#topbar">Top Bar</a></li>
      <li><a href="#reveal">Reveal Modal</a></li>
      <li><a href="#typography-helpers">Typography</a></li>
      <li><a href="#utility-classes">Utility Classes</a></li>
      <li><a href="#visibility">Visibility</a></li>
    </ul>
  </div>
</div>

---

## Components

We'll call out any HTML, Sass, and JS differences between the versions here. Each component will have a HTML, Sass, and JS section to describe specific changes. 

#### HTML Markup

Any markup changes between versions will be listed for each component in the Component &#10142; HTML sections below. Foundation 6 will have more accessibility markup and some of the classes have changes to create more consistent naming.

#### Sass

Class names, styling differences, mixins, and variables will be discussed in the Sass section for each component.

#### JS

We'll cover differences in setup, initialization, and settings in the JS section of each component.

---

<a id="abide"></a>
### Abide

To enable validation with Abide, add the `data-abide` attribute to your form element. Then add the `required` attribute to each input that you want to require. Additionally, you can define a pattern to define restraints on what users can input.

Foundation 5

```html
<form data-abide>
  <div class="name-field">
    <label>Your name <small>required</small>
      <input type="text" required pattern="[a-zA-Z]+">
    </label>
    <small class="error">Name is required and must be a string.</small>
  </div>
  <div class="email-field">
    <label>Email <small>required</small>
      <input type="email" required>
    </label>
    <small class="error">An email address is required.</small>
  </div>
  <button type="submit">Submit</button>
</form>
```

Foundation 6

```html
<form data-abide novalidate>
  <div data-abide-error class="alert callout" style="display: none;">
    <p><i class="fi-alert"></i> There are some errors in your form.</p>
  </div>
  <div class="row">
    <div class="small-12 columns">
      <label>Number Required
        <input type="text" placeholder="1234" aria-describedby="exampleHelpText" required pattern="number">
        <span class="form-error">
          Yo, you had better fill this out, it's required.
        </span>
      </label>
      <p class="help-text" id="exampleHelpText">Here's how you use this input field!</p>
    </div>
    <div class="small-12 columns">
      <label>Nothing Required!
        <input type="text" placeholder="Use me, or don't" aria-describedby="exampleHelpTex" data-abide-ignore>
      </label>
      <p class="help-text" id="exampleHelpTex">This input is ignored by Abide using `data-abide-ignore`</p>
    </div>
    <div class="small-12 columns">
      <label>Password Required
        <input type="password" id="password" placeholder="yeti4preZ" aria-describedby="exampleHelpText" required >
        <span class="form-error">
          I'm required!
        </span>
      </label>
      <p class="help-text" id="exampleHelpText">Enter a password please.</p>
    </div>
    <div class="small-12 columns">
      <label>Re-enter Password
        <input type="password" placeholder="yeti4preZ" aria-describedby="exampleHelpText2" required pattern="alpha_numeric" data-equalto="password">
        <span class="form-error">
          Hey, passwords are supposed to match!
        </span>
      </label>
      <p class="help-text" id="exampleHelpText2">This field is using the `data-equalto="password"` attribute, causing it to match the password field above.</p>
    </div>
  </div>
  <div class="row">
    <div class="medium-6 columns">
      <label>URL Pattern, not required, but throws error if it doesn't match the Regular Expression for a valid URL.
        <input type="text" placeholder="http://foundation.zurb.com" pattern="url">
      </label>
    </div>
    <div class="medium-6 columns">
      <label>European Cars, Choose One, it can't be the blank option.
        <select id="select" required>
          <option value=""></option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </label>
    </div>
  </div>
  <div class="row">
    <fieldset class="large-6 columns">
      <legend>Choose Your Favorite, and this is required, so you have to pick one.</legend>
      <input type="radio" name="pokemon" value="Red" id="pokemonRed"><label for="pokemonRed">Red</label>
      <input type="radio" name="pokemon" value="Blue" id="pokemonBlue" required><label for="pokemonBlue">Blue</label>
      <input type="radio" name="pokemon" value="Yellow" id="pokemonYellow"><label for="pokemonYellow">Yellow</label>
    </fieldset>
    <fieldset class="large-6 columns">
      <legend>Choose Your Favorite - not required, you can leave this one blank.</legend>
      <input type="radio" name="pockets" value="Red" id="pocketsRed"><label for="pocketsRed">Red</label>
      <input type="radio" name="pockets" value="Blue" id="pocketsBlue"><label for="pocketsBlue">Blue</label>
      <input type="radio" name="pockets" value="Yellow" id="pocketsYellow"><label for="pocketsYellow">Yellow</label>
    </fieldset>
    <fieldset class="large-6 columns">
      <legend>Check these out</legend>
      <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
      <input id="checkbox2" type="checkbox" required><label for="checkbox2">Checkbox 2</label>
      <input id="checkbox3" type="checkbox"><label for="checkbox3">Checkbox 3</label>
    </fieldset>
  </div>
  <div class="row">
    <fieldset class="large-6 columns">
      <button class="button" type="submit" value="Submit">Submit</button>
    </fieldset>
    <fieldset class="large-6 columns">
      <button class="button" type="reset" value="Reset">Reset</button>
    </fieldset>
  </div>
</form>
```

#### HTML Markup



#### Sass

**Abide borrows styles from Forms. See forms for style updates.**

#### JS

- initialization
  - reflow
  - init after page loads
  - AJAX (if applicable)
  - init after event (if applicable)
- settings
    - data attributes
    - data-options
    - JS options

---

<a id="accordion"></a>
### Accordion

Foundation 5

```html
<ul class="accordion" data-accordion>
  <li class="accordion-navigation">
    <a href="#panel1a">Accordion 1</a>
    <div id="panel1a" class="content active">
      Panel 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
  </li>
  <li class="accordion-navigation">
    <a href="#panel2a">Accordion 2</a>
    <div id="panel2a" class="content">
      Panel 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
  </li>
  <li class="accordion-navigation">
    <a href="#panel3a">Accordion 3</a>
    <div id="panel3a" class="content">
      Panel 3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
  </li>
</ul>
```

Foundation 6

```html
<ul class="accordion" data-accordion role="tablist">
  <li class="accordion-item is-active">
    <!-- The tab title needs role="tab", an href, a unique ID, and aria-controls. -->
    <a href="#panel1d" role="tab" class="accordion-title" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <!-- The content pane needs an ID that matches the above href, role="tabpanel", data-tab-content, and aria-labelledby. -->
    <div id="panel1d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel1d-heading">
      Panel 1. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <!-- The tab title needs role="tab", an href, a unique ID, and aria-controls. -->
    <a href="#panel1d" role="tab" class="accordion-title" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <!-- The content pane needs an ID that matches the above href, role="tabpanel", data-tab-content, and aria-labelledby. -->
    <div id="panel1d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel1d-heading">
      Panel 2. Lorem ipsum dolor
    </div>
  </li>
  <li class="accordion-item">
    <!-- The tab title needs role="tab", an href, a unique ID, and aria-controls. -->
    <a href="#panel1d" role="tab" class="accordion-title" id="panel1d-heading" aria-controls="panel1d">Accordion 1</a>
    <!-- The content pane needs an ID that matches the above href, role="tabpanel", data-tab-content, and aria-labelledby. -->
    <div id="panel1d" class="accordion-content" role="tabpanel" data-tab-content aria-labelledby="panel1d-heading">
      Panel 3. Lorem ipsum dolor
    </div>
  </li>
</ul>
```

#### HTML Markup



#### Sass

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.accordion</td>
      <td>.accordion</td>
    </tr>
    <tr>
      <td>.accordion-navigation</td>
      <td>.accordion-item</td>
    </tr>
    <tr>
      <td>.content</td>
      <td>.accordion-content</td>
    </tr>
    <tr>
      <td>.active</td>
      <td>.is-active</td>
    </tr>
    <tr>
      <td>`<a>` inside .accordion-navigation</td>
      <td>.accordion-title</td>
    </tr>
  </tbody>
</table>


#### JS

- initialization
  - reflow
  - init after page loads
  - AJAX (if applicable)
  - init after event (if applicable)
- settings
    - data attributes
    - data-options
    - JS options

---

<a id="alerts"></a>
### Alerts

In Foundation 6, Alerts can be created using two existing componets together. Using the Callout along with the Close Button creates an alert box style.

Foundation 5

```html
<div data-alert class="alert-box">
  <!-- Your content goes here -->
  <a href="#" class="close">&times;</a>
</div>
```

Foundation 6

```html
<div class="alert callout" data-closable>
  <!-- Your content goes here -->
  <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```

#### HTML Markup

#### Sass

**Updated Classes**

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.alert-box</td>
      <td>.callout</td>
    </tr>
    <tr>
      <td>.close</td>
      <td>.close-button</td>
    </tr>
  </tbody>
</table>

**Using the mixin**

```scss
.alert-box {
  @include callout-base;
  @include callout-style($color);
  @include close-button;
}
```

#### JS

**The Callout requires no JS.**

**The Close Button requires no JS.**

The Close Button uses the data-closable JS utility to close the notification.

---

<a id="block-grid"></a>
### Block Grid

In Foundation 5, the Glock Grid was a separate component. In Foundation 6, Block Grid is integrated into the Grid and allows for parent level sizing. This simplifies markup and creates more consistent spacing.

Foundation 5

```html
<div class="row">
  <div class="small-12 columns">
    <ul class="small-block-grid-2 medium-block-grid-3 large-block-grid-4">
      <li><img src="//placehold.it/300x300" class="thumbnail" alt=""></li>
      <li><img src="//placehold.it/300x300" class="thumbnail" alt=""></li>
      <li><img src="//placehold.it/300x300" class="thumbnail" alt=""></li>
      <li><img src="//placehold.it/300x300" class="thumbnail" alt=""></li>
      <li><img src="//placehold.it/300x300" class="thumbnail" alt=""></li>
      <li><img src="//placehold.it/300x300" class="thumbnail" alt=""></li>
    </ul>
  </div>
</div>

```

Foundation 6

```html
<div class="row small-up-1 medium-up-2 large-up-4">
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
  <div class="column">
    <img src="//placehold.it/300x300" class="thumbnail" alt="">
  </div>
</div>
```

#### HTML Markup

In F6, each block of the Block Grid is a `.column`. To convert from F5's Block Grid you will delete the `<ul>` and `<li>`'s and move your content into the `.columns`. In the `.row` you will define your parent level sizing.

#### Sass

**Updated Classes**

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>small-block-grid-1</td>
      <td>small-up-1</td>
    </tr>
    <tr>
      <td>small-block-grid-2</td>
      <td>small-up-2</td>
    </tr>
    <tr>
      <td>small-block-grid-3</td>
      <td>small-up-3</td>
    </tr>
    <tr>
      <td>small-block-grid-4</td>
      <td>small-up-4</td>
    </tr>
    <tr>
      <td>small-block-grid-5</td>
      <td>small-up-5</td>
    </tr>
    <tr>
      <td>small-block-grid-6</td>
      <td>small-up-6</td>
    </tr>
    <tr>
      <td>small-block-grid-7</td>
      <td>small-up-7</td>
    </tr>
    <tr>
      <td>small-block-grid-8</td>
      <td>small-up-8</td>
    </tr>
  </tbody>
</table>

**Using the mixin**



#### JS

**The Block Grid requires no JS.**

---

<a id="breadcrumbs"></a>
### Breadcrumbs

```html
<nav aria-label="You are here:" role="navigation">
  <ul class="breadcrumbs">
    <li><a href="#">Home</a></li>
    <li><a href="#">Features</a></li>
    <li class="disabled">Gene Splicing</li>
    <li>
      <span class="show-for-sr">Current: </span> Cloning
    </li>
  </ul>
</nav>
```

#### HTML Markup

The main differences are the added accessibility attributes. `aria-label` will be read out loud by the screen reader. `.show-for-sr` will hide something visually but allow a screen reader to call it out.

#### Sass

**Updated Classes**

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.breadcrumbs</td>
      <td>.breadcrumbs</td>
    </tr>
    <tr>
      <td>.unavailable</td>
      <td>.disabled</td>
    </tr>
    <tr>
      <td>.current</td>
      <td>`<li>` without anchor</td>
    </tr>
  </tbody>
</table>

---

<a id="button-group"></a>
### Button Groups

```html
<ul class="button-group">
  <li><a href="#" class="button">Button 1</a></li>
  <li><a href="#" class="button">Button 2</a></li>
  <li><a href="#" class="button">Button 3</a></li>
</ul>
```

Foundation 6

```html
<div class="button-group">
  <a class="button">One</a>
  <a class="button">Two</a>
  <a class="button">Three</a>
</div>
```

#### HTML Markup

In Foundation 6, you no longer need to use an `<ul>` and `<li>` structure. The markup in F6 is simpler and less specific. 

To create evenly sized buttons, you can use the `.expanded` class rather than `.even-#` eliminating the need to specify the number of buttons.

Color classes now can applied to the parent element (.button-group) to affect the color of all the children or individually as needed.

#### Sass

**Updated Classes**

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.button-group</td>
      <td>.button-group</td>
    </tr>
    <tr>
      <td>.button-group</td>
      <td>.disabled</td>
    </tr>
    <tr>
      <td>.even-#</td>
      <td>.expanded</td>
    </tr>
    <tr>
      <td>.stack</td>
      <td>.stacked</td>
    </tr>
    <tr>
      <td>.stack-for-small</td>
      <td>.stacked-for-small, .stacked-for-medium</td>
    </tr>
    <tr>
      <td>.radius</td>
      <td>`deprecated`</td>
    </tr>
    <tr>
      <td>.radius</td>
      <td>`deprecated`</td>
    </tr>
  </tbody>
</table>

<a target="_blank" href="http://codepen.io/rafibomb/pen/yOmjGp">Add a border-radius to the Button Group</a>

**Using the mixin**



#### JS

**The Button Group requires no JS.**

---

<a id="button"></a>
### Button

Foundation 5

```html
<!-- Size Classes -->
<a href="#" class="button tiny">Tiny Button</a>
<a href="#" class="button small">Small Button</a>
<a href="#" class="button">Default Button</a>
<a href="#" class="button disabled">Disabled Button</a>
<a href="#" class="button large">Large Button</a>
<a href="#" class="button expand">Expanded Button</a>
<!-- Radius Classes -->
<a href="#" class="button round">Round Button</a>
<a href="#" class="button radius">Radius Button</a>
```

Foundation 6

```html
<!-- Anchors (links) -->
<a href="about.html" class="button">Learn More</a>
<a href="#features" class="button">View All Features</a>

<!-- Buttons (actions) -->
<button type="button" class="success button">Save</button>
<button type="button" class="alert button">Delete</button>

<a class="tiny button" href="#">So Tiny</a>
<a class="small button" href="#">So Small</a>
<a class="large button" href="#">So Large</a>
<a class="expanded button" href="#">Such Expand</a>
```

#### HTML Markup

Accessibility standards are the main changes with buttons in Foundation 6. The `<button>` tag is no longer styled like a button. This allows the `<button>` to be used as intended without having to overide it's appearance.

#### Sass

**Updated Classes**

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.button</td>
      <td>.button</td>
    </tr>
    <tr>
      <td>.tiny</td>
      <td>.tiny</td>
    </tr>
    <tr>
      <td>.small</td>
      <td>.small</td>
    </tr>
    <tr>
      <td>.large</td>
      <td>.large</td>
    </tr>
    <tr>
      <td>.expand</td>
      <td>.expanded</td>
    </tr>
    <tr>
      <td>.disabled</td>
      <td>.disabled</td>
    </tr>
    <tr>
      <td></td>
      <td>.hollow</td>
    </tr>
    <tr>
      <td>.radius</td>
      <td>`deprecated`</td>
    </tr>
    <tr>
      <td>.round</td>
      <td>`deprecated`</td>
    </tr>
  </tbody>
</table>

<a target="_blank" href="http://codepen.io/rafibomb/pen/reXvXZ">Add a border-radius to a Button</a>

**Using the mixin**



#### JS

**The Button Group requires no JS.**


---

### Panels

Panels are now called Callouts. The work much the same way.

Foundation 5 

```html
<div class="panel">
  <h5>This is a regular panel.</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
</div>
```

Foundation 6

```html
<div class="callout">
  <h5>This is a callout.</h5>
  <p>It has an easy to override visual style, and is appropriately subdued.</p>
</div>
```

#### HTML Markup

Other than the class, no other structural changes have been made.

#### Sass

**Updated Classes**

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.panel</td>
      <td>.callout</td>
    </tr>
    <tr>
      <td></td>
      <td>.secondary</td>
    </tr>
    <tr>
      <td>.callout</td>
      <td>.primary</td>
    </tr>
    <tr>
      <td></td>
      <td>.success</td>
    </tr>
    <tr>
      <td></td>
      <td>.warning</td>
    </tr>
    <tr>
      <td></td>
      <td>.alert</td>
    </tr>
    <tr>
      <td></td>
      <td>.small</td>
    </tr>
    <tr>
      <td></td>
      <td>.large</td>
    </tr>
    <tr>
      <td>.radius</td>
      <td>`deprecated`</td>
    </tr>
  </tbody>
</table>

The Callout has a transparent background. Using the `.secondary` coloring class will match the default styling of the F5 Panel.

**Using the mixin**

```scss
.panel {
  @include callout($color);  
}

#### JS

**The Callout requires no JS.**

---

<a id="dropdown"></a>
### Dropdown

Dropdown is called a Dropdown Pane in F6, not to be confused with Dropdown Menu which is more specific to navigation.

Foundation 5

```html
<a data-dropdown="drop2" aria-controls="drop2" aria-expanded="false">Has Content Dropdown</a>
<div id="drop2" data-dropdown-content class="f-dropdown content" aria-hidden="true" tabindex="-1">
  <!-- Just some junk that needs to be said. Or not. Your choice. -->
</div>
```

Foundation 6

```html
<button class="button" type="button" data-toggle="example-dropdown">Toggle Dropdown</button>
<div class="dropdown-pane" id="example-dropdown" data-dropdown data-auto-focus="true">
  <!-- Just some junk that needs to be said. Or not. Your choice. -->
</div>
```

---

### Equalizer

```html
<div class="row" data-equalizer data-equalize-on="medium" id="test-eq">
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <img src= "assets/img/generic/square-1.jpg">
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <p>Pellentesque habitant morbi tristique senectus et netus et, ante.</p>
    </div>
  </div>
  <div class="medium-4 columns">
    <div class="callout" data-equalizer-watch>
      <img src= "assets/img/generic/rectangle-1.jpg">
    </div>
  </div>
</div>
```

---

### Flex Grid

```html
<div class="row">
  <div class="small-6 columns">6 columns</div>
  <div class="small-6 columns">6 columns</div>
</div>
<div class="row">
  <div class="medium-6 large-4 columns">12/6/4 columns</div>
  <div class="medium-6 large-8 columns">12/6/8 columns</div>
</div>
```

<div class="row display">
  <div class="small-6 columns">6 columns</div>
  <div class="small-6 columns">6 columns</div>
</div>
<div class="row display">
  <div class="medium-6 large-4 columns">12/6/4 columns</div>
  <div class="medium-6 large-8 columns">12/6/8 columns</div>
</div>

---

### Flex Video

```html
<div class="flex-video">
  <iframe width="420" height="315" src="https://www.youtube.com/embed/V9gkYw35Vws" frameborder="0" allowfullscreen></iframe>
</div>
```

---

### Float Classes

```html
<div class="callout clearfix">
  <a class="button float-left">Left</a>
  <a class="button float-right">Right</a>
</div>
```

---

### Forms

```html
<form>
  <label>Input Label
    <input type="text" placeholder=".small-12.columns" aria-describedby="exampleHelpText">
  </label>
  <p class="help-text" id="exampleHelpText">Here's how you use this input field!</p>
  <label>
    How many puppies?
    <input type="number" value="100">
  </label>
  <label>
    What books did you read over summer break?
    <textarea placeholder="None"></textarea>
  </label>
  <label>Select Menu
    <select>
      <option value="husker">Husker</option>
      <option value="starbuck">Starbuck</option>
      <option value="hotdog">Hot Dog</option>
      <option value="apollo">Apollo</option>
    </select>
  </label>
  <div class="row">
    <fieldset class="large-6 columns">
      <legend>Choose Your Favorite</legend>
      <input type="radio" name="pokemon" value="Red" id="pokemonRed" required><label for="pokemonRed">Red</label>
      <input type="radio" name="pokemon" value="Blue" id="pokemonBlue"><label for="pokemonBlue">Blue</label>
      <input type="radio" name="pokemon" value="Yellow" id="pokemonYellow"><label for="pokemonYellow">Yellow</label>
    </fieldset>
    <fieldset class="large-6 columns">
      <legend>Check these out</legend>
      <input id="checkbox1" type="checkbox"><label for="checkbox1">Checkbox 1</label>
      <input id="checkbox2" type="checkbox"><label for="checkbox2">Checkbox 2</label>
      <input id="checkbox3" type="checkbox"><label for="checkbox3">Checkbox 3</label>
    </fieldset>
  </div>
  <div class="row">
    <div class="small-3 columns">
      <label for="middle-label" class="text-right middle">Label</label>
    </div>
    <div class="small-9 columns">
      <input type="text" id="middle-label" placeholder="Right- and middle-aligned text input">
    </div>
  </div>
  <div class="input-group">
    <span class="input-group-label">$</span>
    <input class="input-group-field" type="url">
    <a class="input-group-button button">Submit</a>
  </div>
</form>
```

---

### Grid

The grid markup remains relatively unchanged from 5 to 6. 

```html
<div class="row">
  <div class="small-2 medium-3 large-4 columns">2/3/4 columns</div>
  <div class="small-4 medium-3 large-4 columns">4/3/4 columns</div>
  <div class="small-6 large-4 columns">6/6/4 columns</div>
</div>
<div class="row">
  <div class="large-3 columns">12/12/3 columns</div>
  <div class="large-6 columns">12/12/6 columns</div>
  <div class="large-3 columns">12/12/3 columns</div>
</div>
<div class="row">
  <div class="small-6 large-2 columns">6/6/2 columns</div>
  <div class="small-6 large-8 columns">6/6/8 columns</div>
  <div class="small-12 large-2 columns">12/12/2 columns</div>
</div>
<div class="row">
  <div class="small-3 columns">3 columns</div>
  <div class="small-9 columns">9 columns</div>
</div>
<div class="row">
  <div class="medium-8 large-4 columns">12/8/4 columns</div>
  <div class="medium-4 large-8 columns">12/4/8 columns</div>
</div>
```

#### HTML Markup

<span class="label">NEW</span> If you need a full-width column to use as a container, put the `.column` and `.row` classes on the same element. You can still nest more grids inside this container like usual.

```html
<div class="column row">
  Row column
</div>
```

Column rows can use sizing classes like `.small-8`, but only when used as a top-level container—not when nested inside another row.

#### Sass

**No Grid classes were changed**

Responsive gutters were added in Foundation 6.1. These use a Sass map to make adding new values simple.

```scss
$grid-column-gutter: (
  small: 20px,
  medium: 30px,
);
```


#### JS

**The Grid requires no JS.**

---

### Interchange

```html
<img data-interchange="[assets/img/interchange/small.jpg, small], [assets/img/interchange/medium.jpg, medium], [assets/img/interchange/large.jpg, large]">
```

---

### Label

```html
<span class="secondary label">Secondary Label</span>
<span class="success label">Success Label</span>
<span class="alert label">Alert Label</span>
<span class="warning label">Warning Label</span>
```

---

<a id="labels"></a>
### Labels & Badge

Labels in Foundation 5 had modifyer classes to make them round. In Foundation 6, lables and badges are separate components.

Foundation 5

```html
<span class="label">Label</span>
<span class="success label">Label</span>
<span class="round">Label</span>
```

Foundation 6 Label

```html
<span class="secondary label">Label</span>
```

Foundation 6 Badge

```html
<span class="secondary badge">2</span>
```

#### HTML Markup

To create a radius label, you can use CSS `border-radius: $global-radius;`.

#### Sass

<table>
  <thead>
    <tr>
      <th>Foundation 5</th>
      <th>Foundation 6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>.secondary</td>
      <td>.secondary</td>
    </tr>
    <tr>
      <td>.success</td>
      <td>.success</td>
    </tr>
    <tr>
      <td>.alert</td>
      <td>.alert</td>
    </tr>
    <tr>
      <td>.warning</td>
      <td>.warning</td>
    </tr>
    <tr>
      <td>.info</td>
      <td>.info</td>
    </tr>
    <tr>
      <td>.radius</td>
      <td>deprecated</td>
    </tr>
    <tr>
      <td>.round</td>
      <td>badge is round</td>
    </tr>
  </tbody>
</table>


#### JS

**Labels and badges requires no JS.**

--- 

### Magellan

```html
<ul class="horizontal menu" data-magellan>
  <li><a href="#first">First Arrival</a></li>
  <li><a href="#second">Second Arrival</a></li>
  <li><a href="#third">Third Arrival</a></li>
</ul>
<div class="sections">
  <section id="first" data-magellan-target="first">
    <h4>First section</h4>
    <p>Duis scelerisque ligula ut metus rhoncus scelerisque. Integer ut egestas metus. Nulla facilisi. Aenean luctus magna lobortis ligula rhoncus, sit amet lacinia lorem sagittis. Sed ultrices at metus id aliquet. Vestibulum in condimentum quam, id ornare erat. Vivamus nec justo quis ex fringilla condimentum ac non quam.</p>
  </section>
  <section id="second" data-magellan-target="second">
    <h4>Second section</h4>
    <p>Sed vulputate, felis interdum molestie viverra, neque urna placerat dui, ac efficitur est magna eu tellus. Nunc sodales consequat eros at bibendum. Vestibulum hendrerit gravida elit non eleifend. Nunc at vehicula ipsum. Vestibulum eu suscipit felis. Proin ipsum felis, consequat congue quam ac, efficitur tincidunt ex. Morbi accumsan sem iaculis nunc malesuada tincidunt.</p>
  </section>
  <section id="third" data-magellan-target="third">
    <h4>Second section</h4>
    <p>Aliquam orci orci, maximus a pulvinar id, tincidunt a neque. Suspendisse eros diam, finibus et faucibus ac, suscipit feugiat orci. Morbi scelerisque sem id blandit malesuada. Donec suscipit tincidunt dolor in blandit. Nam rhoncus risus vitae lacinia dictum. Cras lobortis, nulla non faucibus mattis, tellus nibh condimentum eros, posuere volutpat arcu risus vel ante. In ut ullamcorper eros, et vestibulum risus. Fusce auctor risus vitae diam viverra tincidunt.</p>
  </section>
</div>
```

<ul class="horizontal menu" data-magellan>
  <li><a href="#first">First Arrival</a></li>
  <li><a href="#second">Second Arrival</a></li>
  <li><a href="#third">Third Arrival</a></li>
</ul>

---

### Media Object

```html
<div class="media-object">
  <div class="media-object-section">
    <img src= "http://placeimg.com/200/200/people">
  </div>
  <div class="media-object-section">
    <h4>Dreams feel real while we're in them.</h4>
    <p>I'm going to improvise. Listen, there's something you should know about me... about inception. An idea is like a virus, resilient, highly contagious. The smallest seed of an idea can grow. It can grow to define or destroy you.</p>
  </div>
</div>
```

---

### Menu

```html
<ul class="menu">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>

<ul class="menu icon-top">
  <li><a href="#"><i class="fi-list"></i> <span>One</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Two</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Three</span></a></li>
  <li><a href="#"><i class="fi-list"></i> <span>Four</span></a></li>
</ul>
```

---

### Off-canvas

```
<body>
  <div class="off-canvas-wrapper">
    <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
      <div class="off-canvas position-left" id="offCanvasLeft" data-off-canvas>
        <!-- left off-canvas markup -->
      </div>
      <div class="off-canvas position-right" id="offCanvasRight" data-off-canvas data-position="right">
        <!-- right off-canvas markup -->
      </div>
      <div class="off-canvas-content" data-off-canvas-content>
        <!-- page content -->
      </div>
    </div>
  </div>
</body>
```

```html
<button type="button" class="button" data-toggle="offCanvasLeft">Open Menu</button>
```

---

### Orbit

```html
<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>
  <ul class="orbit-container">
    <button class="orbit-previous" aria-label="previous"><span class="show-for-sr">Previous Slide</span>&#9664;</button>
    <button class="orbit-next" aria-label="next"><span class="show-for-sr">Next Slide</span>&#9654;</button>
    <li class="is-active orbit-slide">
      <div>
        <h3 class="text-center">You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slide has chill</h3>
      </div>
    </li>
    <li class="orbit-slide">
      <div>
        <h3 class="text-center">You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slide has chill</h3>
      </div>
    </li>
    <li class="orbit-slide">
      <div>
        <h3 class="text-center">You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slide has chill</h3>
      </div>
    </li>
    <li class="orbit-slide">
      <div>
        <h3 class="text-center">You can also throw some text in here!</h3>
        <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde harum rem, beatae ipsa consectetur quisquam. Rerum ratione, delectus atque tempore sed, suscipit ullam, beatae distinctio cupiditate ipsam eligendi tempora expedita.</p>
        <h3 class="text-center">This Orbit slide has chill</h3>
      </div>
    </li>
  </ul>
  <nav class="orbit-bullets">
   <button class="is-active" data-slide="0"><span class="show-for-sr">First slide details.</span><span class="show-for-sr">Current Slide</span></button>
   <button data-slide="1"><span class="show-for-sr">Second slide details.</span></button>
   <button data-slide="2"><span class="show-for-sr">Third slide details.</span></button>
   <button data-slide="3"><span class="show-for-sr">Fourth slide details.</span></button>
 </nav>
</div>
```

---

### Pagination

```html
<ul class="pagination" role="navigation" aria-label="Pagination">
  <li class="disabled">Previous <span class="show-for-sr">page</span></li>
  <li class="current"><span class="show-for-sr">You're on page</span> 1</li>
  <li><a href="#" aria-label="Page 2">2</a></li>
  <li><a href="#" aria-label="Page 3">3</a></li>
  <li><a href="#" aria-label="Page 4">4</a></li>
  <li class="ellipsis" aria-hidden="true"></li>
  <li><a href="#" aria-label="Page 12">12</a></li>
  <li><a href="#" aria-label="Page 13">13</a></li>
  <li><a href="#" aria-label="Next page">Next <span class="show-for-sr">page</span></a></li>
</ul>
```

---

### Progress Bar

```html
<div class="success progress" role="progressbar" tabindex="0" aria-valuenow="25" aria-valuemin="0" aria-valuetext="25 percent" aria-valuemax="100">
  <div class="progress-meter" style="width: 25%">
    <p class="progress-meter-text">25%</p>
  </div>
</div>

<div class="warning progress">
  <div class="progress-meter" style="width: 50%">
    <p class="progress-meter-text">50%</p>
  </div>
</div>

<div class="alert progress">
  <div class="progress-meter" style="width: 75%">
    <p class="progress-meter-text">75%</p>
  </div>
</div>
```

---

### Responsive Menu

```html
<ul class="vertical medium-horizontal menu">
  <li><a href="#">Item 1</a></li>
  <li><a href="#">Item 2</a></li>
  <li><a href="#">Item 3</a></li>
</ul>
```

---

### Responsive Toggle

```html
<div class="title-bar" data-responsive-toggle="example-menu" data-hide-for="medium">
  <button class="menu-icon" type="button" data-toggle></button>
  <div class="title-bar-title">Menu</div>
</div>

<div class="top-bar" id="example-menu">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Site Title</li>
      <li class="has-submenu">
        <a href="#">One</a>
        <ul class="submenu menu vertical" data-submenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
          <li><a href="#">Three</a></li>
        </ul>
      </li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu">
      <li><input type="search" placeholder="Search"></li>
      <li><button type="button" class="button">Search</button></li>
    </ul>
  </div>
</div>
```

---

### Reveal

```html
<p><a data-open="exampleModal1">Click me for a modal</a></p>

<div class="reveal" id="exampleModal1" data-reveal>
  <h1>Awesome. I Have It.</h1>
  <p class="lead">Your couch. It is mine.</p>
  <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
  <button class="close-button" data-close aria-label="Close reveal" type="button">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
```

---

### Slider

```html
<div class="slider" data-slider data-initial-start='50' data-end='200'>
  <span class="slider-handle"  data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>

<div class="slider vertical" data-slider data-initial-start='25' data-end='200' data-vertical="true">
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <input type="hidden">
</div>

<div class="slider" data-slider data-initial-start='25' data-initial-end='75'>
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <span class="slider-fill" data-slider-fill></span>
  <span class="slider-handle" data-slider-handle role="slider" tabindex="1"></span>
  <input type="hidden">
  <input type="hidden">
</div>
```

---

### Sticky

```html
<div class="row">
  <div class="columns small-12">
    <div class="columns small-6" id="example1" data-something>
      <p id="doodle">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div class="columns small-6 right" data-sticky-container>
      <div class="sticky" data-sticky data-anchor="example1">
        <img class="thumbnail" src="assets/img/generic/rectangle-3.jpg">
      </div>
    </div>
  </div>
</div>
```

---

### Switch

```html
<div class="switch tiny">
  <input class="switch-input" id="tinySwitch" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="tinySwitch">
    <span class="show-for-sr">Tiny Sandwiches Enabled</span>
  </label>
</div>

<div class="switch small">
  <input class="switch-input" id="smallSwitch" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="smallSwitch">
    <span class="show-for-sr">Small Portions Only</span>
  </label>
</div>

<div class="switch large">
  <input class="switch-input" id="largeSwitch" type="checkbox" name="exampleSwitch">
  <label class="switch-paddle" for="largeSwitch">
    <span class="show-for-sr">Show Large Elephants</span>
  </label>
</div>
```

---

### Table

```html
<table>
  <thead>
    <tr>
      <th width="200">Table Header</th>
      <th>Table Header</th>
      <th width="150">Table Header</th>
      <th width="150">Table Header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer content Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
    <tr>
      <td>Content Goes Here</td>
      <td>This is longer Content Goes Here Donec id elit non mi porta gravida at eget metus.</td>
      <td>Content Goes Here</td>
      <td>Content Goes Here</td>
    </tr>
  </tbody>
</table>
```

---

### Tabs

```html
<ul class="tabs" data-tabs id="example-tabs">
  <li class="tabs-title is-active"><a href="#panel1" aria-selected="true">Tab 1</a></li>
  <li class="tabs-title"><a href="#panel2">Tab 2</a></li>
  <li class="tabs-title"><a href="#panel3">Tab 3</a></li>
  <li class="tabs-title"><a href="#panel4">Tab 4</a></li>
  <li class="tabs-title"><a href="#panel5">Tab 5</a></li>
  <li class="tabs-title"><a href="#panel6">Tab 6</a></li>
</ul>

<div class="tabs-content" data-tabs-content="example-tabs">
  <div class="tabs-panel is-active" id="panel1">
    <p>one</p>
    <p>Check me out! I'm a super cool Tab panel with text content!</p>
  </div>
  <div class="tabs-panel" id="panel2">
    <p>two</p>
    <img class="thumbnail" src="assets/img/generic/rectangle-7.jpg">
  </div>
  <div class="tabs-panel" id="panel3">
    <p>three</p>
    <p>Check me out! I'm a super cool Tab panel with text content!</p>
  </div>
  <div class="tabs-panel" id="panel4">
    <p>four</p>
    <img class="thumbnail" src="assets/img/generic/rectangle-2.jpg">
  </div>
  <div class="tabs-panel" id="panel5">
    <p>five</p>
    <p>Check me out! I'm a super cool Tab panel with text content!</p>
  </div>
  <div class="tabs-panel" id="panel6">
    <p>six</p>
    <img class="thumbnail" src="assets/img/generic/rectangle-8.jpg">
  </div>
</div>
```

---

### Thumbnail

```html
<div class="row">
  <div class="small-4 columns">
    <img class="thumbnail" src="assets/img/thumbnail/01.jpg" alt="Photo of Uranus.">
  </div>
  <div class="small-4 columns">
    <img class="thumbnail" src="assets/img/thumbnail/02.jpg" alt="Photo of Neptune.">
  </div>
  <div class="small-4 columns">
    <img class="thumbnail" src="assets/img/thumbnail/03.jpg" alt="Photo of Pluto.">
  </div>
</div>
```

---

### Title Bar

```html
<div class="title-bar">
  <div class="title-bar-left">
    <button class="menu-icon" type="button"></button>
    <span class="title-bar-title">Foundation</span>
  </div>
  <div class="title-bar-right">
    <button class="menu-icon" type="button"></button>
  </div>
</div>
```

---

### Toggler

```html
<p><a data-toggle="menuBar">Expand!</a></p>

<ul class="menu" id="menuBar" data-toggler=".expanded">
  <li><a href="#">One</a></li>
  <li><a href="#">Two</a></li>
  <li><a href="#">Three</a></li>
  <li><a href="#">Four</a></li>
</ul>
```

---

### Tooltip

```html
<p>The <span data-tooltip aria-haspopup="true" class="has-tip" data-disable-hover='false' tabindex=1 title="Fancy word for a beetle.">scarabaeus</span> hung quite clear of any branches, and, if allowed to fall, would have fallen at our feet. Legrand immediately took the scythe, and cleared with it a circular space, three or four yards in diameter, just beneath the insect, and, having accomplished this, ordered Jupiter to let go the string and come down from the tree.</p>
```

---

### Top Bar

```html
<div class="top-bar">
  <div class="top-bar-left">
    <ul class="dropdown menu" data-dropdown-menu>
      <li class="menu-text">Site Title</li>
      <li class="has-submenu">
        <a href="#">One</a>
        <ul class="submenu menu vertical" data-submenu>
          <li><a href="#">One</a></li>
          <li><a href="#">Two</a></li>
          <li><a href="#">Three</a></li>
        </ul>
      </li>
      <li><a href="#">Two</a></li>
      <li><a href="#">Three</a></li>
    </ul>
  </div>
  <div class="top-bar-right">
    <ul class="menu">
      <li><input type="search" placeholder="Search"></li>
      <li><button type="button" class="button">Search</button></li>
    </ul>
  </div>
</div>
```

---

### Visibility Classes

```html
<p>You are on a small screen or larger.</p>
<p class="show-for-medium">You are on a medium screen or larger.</p>
<p class="show-for-large">You are on a large screen or larger.</p>
<p class="show-for-small-only">You are <em>definitely</em> on a small screen.</p>
<p class="show-for-medium-only">You are <em>definitely</em> on a medium screen.</p>
<p class="show-for-large-only">You are <em>definitely</em> on a large screen.</p>

<p class="hide-for-medium">You are <em>not</em> on a medium screen or larger.</p>
<p class="hide-for-large">You are <em>not</em> on a large screen or larger.</p>
<p class="hide-for-small-only">You are <em>definitely not</em> on a small screen.</p>
<p class="hide-for-medium-only">You are <em>definitely not</em> on a medium screen.</p>
<p class="hide-for-large-only">You are <em>definitely not</em> on a large screen.</p>
<p class="hide">Can't touch this.</p>

<p class="invisible">Can sort of touch this.</p>

<p class="show-for-landscape">You are in landscape orientation.</p>
<p class="show-for-portrait">You are in portrait orientation.</p>

<p class="show-for-sr">This text can only be read by a screen reader.</p>
<p>There's a line of text above this one, you just can't see it.</p>

<p aria-hidden="true">This text can be seen, but won't be read by a screen reader.</p>

<p><a class="show-on-focus" href="#mainContent">Skip to Content</a></p>
<header id="header" role="banner">
</header>
<main id="mainContent" role="main" tabindex="0">
</main>
```


### Joyride

### Block Grid

#### Dropdown Buttons

#### Split Buttons


#### Clearing


#### Inline Lists


#### Keystroke

#### Pricing Tables

#### Side Nav

#### Sub Nav

#### Top Bar

#### Type

#### Visibility Classes

[https://github.com/zurb/foundation-sites/blob/V5/doc/pages/components/kitchen_sink.html](https://github.com/zurb/foundation-sites/blob/V5/doc/pages/components/kitchen_sink.html)









#### HTML Markup



#### Sass

Classes Table


#### JS

JS
- initialization
  - reflow
  - init after page loads
  - AJAX (if applicable)
  - init after event (if applicable)
- settings
    - data attributes
    - data-options
    - JS options

Files to load individually

### Requires MotionUI

## Build System

## Accessibility

## Contribute




