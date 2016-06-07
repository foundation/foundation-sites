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


Add the `.badge` class to an element to create a badge. In the below example, we're using `<span>`, but any tag will work fine.

```html_example
<span class="badge">1</span>
```

<br>

A badge will typically be describing another element on the page. To bind the two elements together, give the badge a unique ID, and reference that ID in an `aria-describedby` attribute on the main element.

```html
<h1 aria-describedby="messageCount">Unread Messages</h1>
<span class="badge" id="messageCount">1<span>
```

Finally, the content itself might need more context for users that use screen readers. You can add extra text inside the badge using the `.show-for-sr` class.

```html
<span class="badge" id="messageCount">1 <span class="show-for-sr">unread message</span></span>
```

---

## Coloring

Badges can be colored with the same classes used for buttons and other components.

```html_example
<span class="secondary badge">2</span>
<span class="success badge">3</span>
<span class="alert badge">A</span>
<span class="warning badge">B</span>
```

---

### With Icons

An icon can be used in place of text. We're using the [Foundation icon font](http://zurb.com/playground/foundation-icon-fonts-3) here, but any icon fonts or image-based icons will work fine.

```html_example
<span class="info badge"><i class="fi-share"></i></span>
<span class="success badge"><i class="fi-check"></i></span>
<span class="warning badge"><i class="fi-wrench"></i></span>
```