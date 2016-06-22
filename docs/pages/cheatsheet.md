---
title: F6 Cheatsheet
description: Get coding faster with this cheatsheet. It contains CSS classes, accessibility attributes, and JS events and options so you can build faster.
---

## Grid

<div class="row">
  <div class="medium-6 columns">

    <h4>Basic Grid Classes</h4>
    
    <p><strong>Foundation is mobile-first.</strong> Code for small screens first, and larger devices will inherit those styles. Customize for larger screens as necessary.</p>

    <p>Foundation uses a 12 column grid by default. You can divide your content horizontally by columns. <strong>Note:</strong> If you do not specify a column width class, it will default to 12 columns, 100% width.</p>

    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.row`</td>
          <td>Wrapper for your columns. Applies a `max-width` and centers columns in viewport.</td>     
        </tr>
        <tr>
          <td>`.columns`</td>
          <td>Wrapper for your content. Applies a gutter (padding) for your content.</td>     
        </tr>
        <tr>
          <td>`.small-#`</td>
          <td>Applies a column width for the small breakpoint.</td>
        </tr>
        <tr>
          <td>`.medium-#`</td>
          <td>Applies a column width for the medium breakpoint.</td>
        </tr>
        <tr>
          <td>`.large-#`</td>
          <td>Applies a column width for the large breakpoint.</td>
        </tr>
      </tbody>
    </table>

  </div>
  <div class="medium-6 columns">
    
    <h4>Grid Modifier Classes</h4>
    
    <p>Foundation has many grid classes you can chain onto to `.row` or `.columns` to change it's behavior.</p>

    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.row .column`</td>
          <td>Combining the `.row` &amp; `.column` classes creates a 12 column, 100% width row that adds a gutter on both sides.</td>     
        </tr>
        <tr>
          <td>`.expanded`</td>
          <td>Add to a `.row` to create a fluid width row. Removes the `max-width` and stretches for to 100% of viewport or container it's in.</td>     
        </tr>
        <tr>
          <td>`.end`</td>
          <td>If using less than 12 columns, add to last column to float column left.</td>
        </tr>
        <tr>
          <td>`.collapse`</td>
          <td>Removes the gutter (padding) of the columns. Chain onto `.row`.</td>
        </tr>
        <tr>
          <td>`.medium-collapse`</td>
          <td>Removes column padding on medium (and larger) breakpoints. Chain onto `.row`</td>
        </tr>
        <tr>
          <td>`.medium-uncollapse`</td>
          <td>Overrides .small-collapse to add in column padding on medium (and larger) breakpoints. Chain onto `.row`</td>     
        </tr>
        <tr>
          <td>`.large-collapse`</td>
          <td>Removes column padding on large (and larger) breakpoints. Chain onto `.row`</td>
        </tr>
        <tr>
          <td>`.large-uncollapse`</td>
          <td>Overrides `.small-collapse` or `.medium-collapse` to add in column padding on large (and larger) breakpoints. Chain onto `.row`</td>     
        </tr>
      </tbody>
    </table>

  </div>
</div>

<div class="row column">
  <h4>Positioning Grid Classes</h4>
    
  <p>Foundation's grid has modifier classes that allow you to position your columns based on your content's needs. All classes are mobile-first and you can override behavior based on breakpoint.</p>
</div>

<div class="row">
  <div class="medium-6 columns">

    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.small-centered`</td>
          <td>Center a single column on the small breakpoint.</td>     
        </tr>
        <tr>
          <td>`.medium-centered`</td>
          <td>Center a single column on the medium breakpoint (and larger).</td>     
        </tr>
        <tr>
          <td>`.medium-uncentered`</td>
          <td>Overrides the centering of a single column on the medium (and larger) breakpoint.</td>
        </tr>
        <tr>
          <td>`.large-centered`</td>
          <td>Center a single column on the large breakpoint (and larger).</td>     
        </tr>
        <tr>
          <td>`.large-uncentered`</td>
          <td>Overrides the centering of a single column on the large (and larger) breakpoint.</td>
        </tr>
      </tbody>
    </table>
    
  </div>
  <div class="medium-6 columns">

    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.small-offset-#`</td>
          <td>Push columns over from the left to the right on the small-breakpoint (and larger).</td>     
        </tr>
        <tr>
          <td>`.medium-offset-#`</td>
          <td>Push columns over from the left to the right on the medium-breakpoint (and larger).</td>     
        </tr>
        <tr>
          <td>`.medium-offset-0`</td>
          <td>Overrides column offset if using `.small-offset-#` on the medium-breakpoint (and larger).</td>     
        </tr>
        <tr>
          <td>`.large-offset-#`</td>
          <td>Push columns over from the left to the right on the large-breakpoint (and larger).</td>     
        </tr>
        <tr>
          <td>`.large-offset-0`</td>
          <td>Overrides column offset if using `.small-offset-#` or `.medium-offset-#` on the large-breakpoint (and larger).</td>     
        </tr>
      </tbody>
    </table>
    
  </div>
</div>

<div class="row">
  <div class="medium-6 columns">

    <h4>Source Ordering</h4>
    
    <p>You can change the visual order of your content so that your content is in the right order (stacked) on each breakpoint.</p>
    
    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.small-push-#`</td>
          <td>Shifts columns over from left to right on the small breakpoint (and larger).</td>
        </tr>
        <tr>
          <td>`.small-pull-#`</td>
          <td>Shifts columns over from right to left on the small breakpoint (and larger).</td>
        </tr>
        <tr>
          <td>`.medium-push-#`</td>
          <td>Shifts columns over from left to right on the medium breakpoint (and larger).</td>
        </tr>
        <tr>
          <td>`.medium-pull-#`</td>
          <td>Shifts columns over from right to left on the medium breakpoint (and larger).</td>
        </tr>
        <tr>
          <td>`.large-push-#`</td>
          <td>Shifts columns over from left to right on the large breakpoint (and larger).</td>
        </tr>
        <tr>
          <td>`.large-pull-#`</td>
          <td>Shifts columns over from right to left on the large breakpoint (and larger).</td>
        </tr>
      </tbody>
    </table>

  </div>
  <div class="medium-6 columns">

    <h4>Block Grid</h4>
    
    <p>A.K.A.: Parent Level Sizing. Looking to make evely sized blocks of content? Add as many `.columns` of content as you need and they wrap to the next line if they exceed the -up-# count. Use these classes on your `.row` which automatically clear floats.</p>
    
    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.small-up-#`</td>
          <td>Defines number of columns that will fit on one line on the small breakpoint.</td>
        </tr>
        <tr>
          <td>`.medium-up-#`</td>
          <td>Defines number of columns that will fit on one line on the medium breakpoint.</td>
        </tr>
        <tr>
          <td>`.large-up-#`</td>
          <td>Defines number of columns that will fit on one line on the large breakpoint.</td>
        </tr>
        <tr>
          <td>`.medium-pull-#`</td>
          <td>Shifts columns over from right to left on the medium breakpoint (and larger).</td>
        </tr>
        <tr>
          <td>`.large-push-#`</td>
          <td>Shifts columns over from left to right on the large breakpoint (and larger).</td>
        </tr>
        <tr>
          <td>`.large-pull-#`</td>
          <td>Shifts columns over from right to left on the large breakpoint (and larger).</td>
        </tr>
      </tbody>
    </table>

  </div>
</div>

---

## Breakpoints and Media Queries

<div class="row">
  <div class="columns">

    <h4>Breakpoints</h4>
    
    <p></p>
    
    <table>
      <thead>
        <tr>
          <th width="550">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`@media screen and (max-width: 39.9375em) {}`</td>
          <td>Styles in this media query apply to the small breakpoint only.</td>
        </tr>
        <tr>
          <td>`@media screen and (min-width: 40em) {}`</td>
          <td>Styles in this media query apply to the medium breakpoint and larger.</td>
        </tr>
        <tr>
          <td>`@media screen and (min-width: 40em) and (max-width: 63.9375em) {}`</td>
          <td>Styles in this media query apply to the medium breakpoint only.</td>
        </tr>
        <tr>
          <td>`@media screen and (min-width: 64em) {}`</td>
          <td>Styles in this media query apply to the large breakpoint and larger.</td>
        </tr>
        <tr>
          <td>`@media screen and (min-width: 64em) and (max-width: 74.9375em) {}`</td>
          <td>Styles in this media query apply to the large breakpoint only.</td>
        </tr>
      </tbody>
    </table>

  </div>
</div>
<div class="row column">

  <h4>Colors</h4>
  
  <p>Many components can colored with color classes: primary (default), secondary, alert, success, and warning.</p>
  
  <div class="row small-up-1 medium-up-3 large-up-5">
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-primary"></div>
        <p>Primary</p>
        <p>#2199e8</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-secondary"></div>
        <p>Secondary</p>
        <p>#777</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-success"></div>
        <p>Success</p>
        <p>#3adb76</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-warning"></div>
        <p>Warning</p>
        <p>#ffae00</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-alert"></div>
        <p>Alert</p>
        <p>#ec5840</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-white"></div>
        <p>White</p>
        <p>#fefefe</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-light-gray"></div>
        <p>Light Gray</p>
        <p>#e6e6e6</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-medium-gray"></div>
        <p>Medium Gray</p>
        <p>#cacaca</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-dark-gray"></div>
        <p>Dark Gray</p>
        <p>#8a8a8a</p>
      </div>
    </div>
    <div class="column">
      <div class="docs-color-block">
        <div class="docs-color-block-black"></div>
        <p>Black</p>
        <p>#0a0a0a</p>
      </div>
    </div>
  </div>

</div>

---

<div class="row column">

  <h4>Float Classes</h4>
  
  <p>Foundation includes a handful of helpful float classes to add common positioning behaviors to elements.</p>

  <table>
    <thead>
      <tr>
        <th width="150">Class</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>`.float-left`</td>
        <td>Floats an element to the left.</td>
      </tr>
      <tr>
        <td>`.float-right`</td>
        <td>Floats an element to the right.</td>
      </tr>
      <tr>
        <td>`.clearfix`</td>
        <td>Clear floats, add to the parent element of a floated element.</td>
      </tr>
      <tr>
        <td>`.float-center`</td>
        <td>Not a float but it does help center elements horizontally. This will only work on elements with an absolute width, not a percentage or auto width.</td>
      </tr>
    </tbody>
  </table>

</div>

<div class="row column">
  <h4>Visibility Classes</h4>
    
  <p>Visibility classes let you show or hide elements based on screen size or device orientation.</p>
</div>

<div class="row">
  <div class="medium-6 columns">
    
    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.hide`</td>
          <td>Hides element on all screen sizes. Applies CSS: `display: none;`</td>
        </tr>
        <tr>
          <td>`.invisible`</td>
          <td>Visually hides element on all screen sizes but the element still takes up space. Applies CSS: `visibility: hidden;`</td>
        </tr>
        <tr>
          <td>`.show-for-small-only`</td>
          <td>Shows element on small breakpoint only.</td>
        </tr>
        <tr>
          <td>`.show-for-small`</td>
          <td>Shows element on small breakpoint and larger.</td>
        </tr>
        <tr>
          <td>`.show-for-medium-only`</td>
          <td>Shows element on medium breakpoint only.</td>
        </tr>
        <tr>
          <td>`.show-for-medium`</td>
          <td>Shows element on medium breakpoint and larger.</td>
        </tr>
        <tr>
          <td>`.show-for-large-only`</td>
          <td>Shows element on large breakpoint only.</td>
        </tr>
        <tr>
          <td>`.show-for-large`</td>
          <td>Shows element on medium breakpoint and larger.</td>
        </tr>
      </tbody>
    </table>

  </div>
  <div class="medium-6 columns">
    
    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.hide-for-small-only`</td>
          <td>Hides element on small breakpoint only.</td>
        </tr>
        <tr>
          <td>`.hide-for-small`</td>
          <td>Hides element on small breakpoint and larger.</td>
        </tr>
        <tr>
          <td>`.hide-for-medium-only`</td>
          <td>Hides element on medium breakpoint only.</td>
        </tr>
        <tr>
          <td>`.hide-for-medium`</td>
          <td>Hides element on medium breakpoint and larger.</td>
        </tr>
        <tr>
          <td>`.hide-for-large-only`</td>
          <td>Hides element on large breakpoint only.</td>
        </tr>
        <tr>
          <td>`.hide-for-large`</td>
          <td>Hides element on medium breakpoint and larger.</td>
        </tr>
        <tr>
          <td>`.show-for-landscape`</td>
          <td>Shows element on the landscape orientation only.</td>
        </tr>
        <tr>
          <td>`.show-for-portrait`</td>
          <td>Shows element on the portrait orientation only.</td>
        </tr>
        <tr>
          <td>`.show-for-sr`</td>
          <td>Visually hides and element while still allowing assistive technology (screen reader) to read it.</td>
        </tr>
        <tr>
          <td>`aria-hidden="true"`</td>
          <td>Hides text from assistive technology (screen reader) while still keeping it visible.</td>
        </tr>
        <tr>
          <td>`.show-on-focus`</td>
          <td>Hide an element, except when it has focus. Adding tabindex="0" to the target element makes it focusable.</td>
        </tr>
      </tbody>
    </table>

  </div>
</div>

---

<div class="row">
  <div class="medium-6 columns">

    <h4>Buttons</h4>
    
    <p>You can attach classes to `<a>` tags and `<button>` tags to make them look like buttons.</p>

    <p>`.button` creates a default button. Add any of the below modifier classes to change the button's default appearance. Sizing and color classes can be combined.</p>
    
    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.tiny`</td>
          <td>Creates a tiny button: Reduces button padding and font size.</td>
        </tr>
        <tr>
          <td>`.small`</td>
          <td>Creates a small button: Reduces button padding and font size.</td>
        </tr>
        <tr>
          <td>`.large`</td>
          <td>Creates a large button: Increases button padding and font size.</td>
        </tr>
        <tr>
          <td>`.expanded`</td>
          <td>Button will fill it's parent container 100% width.</td>
        </tr>
      </tbody>
    </table>

  </div>
  <div class="medium-6 columns">

    <table>
      <thead>
        <tr>
          <th width="150">Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>`.secondary`</td>
          <td>Applies secondary background color.</td>
        </tr>
        <tr>
          <td>`.success`</td>
          <td>Applies secondary background color.</td>
        </tr>
        <tr>
          <td>`.alert`</td>
          <td>Applies secondary background color.</td>
        </tr>
        <tr>
          <td>`.warning`</td>
          <td>Applies secondary background color.</td>
        </tr>
        <tr>
          <td>`.disabled`</td>
          <td>Fades the button color and prevent the button from being clickable.</td>
        </tr>
        <tr>
          <td>`.hollow`</td>
          <td>Applies a transparent background and changes the font color to match button color.</td>
        </tr>
        <tr>
          <td>`.dropdown`</td>
          <td>Adds a dropdown arrow to your button.</td>
        </tr>
        <tr>
          <td>`.close-button`</td>
          <td>Add to the `<button>` tag to create a simple close button. Standard content is the &times; symbol.</td>
        </tr>
      </tbody>
    </table>

  </div>
</div>

---

<div class="row column">

  <table>
    <thead>
      <tr>
        <th width="150">Class</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>`.button-group`</td>
        <td>Container class for grouping buttons that have related action items. This will contain `<a class="button">`'s.</td>
      </tr>
      <tr>
        <td>`.expanded`</td>
        <td>Button group will fill the parent container 100% and each button will be equal width.</td>
      </tr>
      <tr>
        <td>`.stacked`</td>
        <td>Button group will stack vertically and each button will be 100% width.</td>
      </tr>
      <tr>
        <td>`.stacked-for-small`</td>
        <td>Button group will stack vertically and each button will be 100% width on the small breakpoint only.</td>
      </tr>
      <tr>
        <td>`.stacked-for-medium`</td>
        <td>Button group will stack vertically and each button will be 100% width on the medium and small breakpoint.</td>
      </tr>
      <tr>
        <td>`.arrow-only`</td>
        <td>Use on an `<a>` along with `.button` and `.dropdown` classes to create aSplit Button.</td>
      </tr>
    </tbody>
  </table>

</div>

---

<div class="row column">
  <h4>Buttons</h4>
    
  <p>You can attach classes to `<a>` tags and `<button>` tags to make them look like buttons.</p>
</div>

<div class="row">
  <div class="medium-6 columns">

    <h4>Buttons</h4>
    
    <p>You can attach classes to `<a>` tags and `<button>` tags to make them look like buttons.</p>

    Header  | Default | Large and up
    --------|---------|-------------
    `<h1>`  | 24px    | 48px
    `<h2>`  | 20px    | 40px
    `<h3>`  | 19px    | 31px
    `<h4>`  | 18px    | 25px
    `<h5>`  | 17px    | 20px
    `<h6>`  | 16px    | 16px

  </div>
</div>