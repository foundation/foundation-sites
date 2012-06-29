<? $page_title = "Migrating from Foundation 2.2" ?>
<?php include("includes/_header.php"); ?>

  <header>
    <div class="row">
      <div class="twelve columns">
        <h1>Foundation 3 Migration Guide</h1>
        <h4>If you're upgrading from Foundation 2.x to 3.0+ this will help you learn the differences.</h4>
      </div>
    </div>
  </header>

  <section id="mainContent">

    <div class="row">
      <div class="twelve columns">
        <p><a href="index.php">&larr; Go Home</a></p>
        <h3>Getting Started</h3>
        <p>Foundation 3 was rebuilt from the ground up to syntactically similar, but not identical, to Foundation 2. Much of what you already know about Foundation applies, including how to use the Grid, many of the common elements, and how the responsive aspects work.</p>
        <p>With that being said there are significant differences to be aware of. In some cases, markup had to be modified to support a new case or to be more customizable or extensible. In other cases we've streamlined the framework so that there's less extra styling, so some extraneous classes will no longer take effect.</p>
        <p>Read through this guide to familiarize yourself with the changes and you should be in good shape to make the switch.</p>

        <hr />


        <h3>The Grid</h3>
        <div class="row">
          <div class="seven columns">
            <p>A major change from Foundation 2 to 3 is the grid. While the syntax is very similar the way the Grid is actually constructed has changed considerably.</p>
            <p>The grid in Foundation 2 was built with <code>.container > .row > .columns</code>. The container kept the left and right padding on small devices, the row fixed the page overall width, and columns provided the layout. In Foundation 3 we've dropped the <code>.container</code> which is no longer required. Containers in your pages will simply not add padding as they did before.</p>
            <p>In Foundation 3 we're using <code>box-sizing: border-box</code> meaning that padding and borders no longer increase the width of an element, they only go inward. That means that while in Foundation 2 a <code>.three.columns</code> block might have a width of 21.58% and a left margin of 4.4%, in Foundation 3 the width is simple 25%, with 15px of padding on the left and right. That padding now creates the gutters between columns, rather than a margin.</p>
            <p>If you retooled the Foundation 2 grid or modified widths, added background or used them as a visual element the new grid will change that. Columns run right up against each other and padding is what keeps the content from colliding.</p>

            <h4>Source Ordering</h4>
            <p>In Foundation 3 source ordering (push/pull classes) work and function the same as before.</p>

            <h4>Mobile Grid</h4>
            <p>The mobile grid (phone-one, phone-two etc) work and function the same as before.</p>

            <p><a href="forms.php">View the Grid Docs &rarr;</a></p>
          </div>
          <div class="five columns">
            <script src="https://gist.github.com/3001136.js?file=f3-migrate-grid.html"></script>
          </div>
        </div>

        <hr />

        <h3>Typography</h3>
        <div class="row">
          <div class="seven columns">
            <p>While there are no changes to the syntax of the Foundation typography, you will see changes to the default size and spacing of elements. We're using a modular scale to calculate the typography which means we have very nicely caluclated sizes and spaces for everything, but if you've built aspects of your page around text alignment you may find that changing.</p>
          </div>
        </div>

        <hr />

        <h3>Buttons</h3>
        <div class="row">
          <div class="seven columns">
            <p>The syntax for buttons has also not changed, but has been streamlined. While Foundation 2 had two styles of buttons (regular and <code>.nice</code> Foundation 3 has dropped that presentational aspect of the elements, so there are only buttons now. Classes of <code>.nice</code> will simply be ignored, and all buttons will get a simple but good looking button style.</p>

            <h4>Color and Semantics</h4>
            <p>In Foundation 2 buttons were styled with presentational classes like <code>.blue</code>, <code>.red</code>, etc. In Foundation 3 those have been replaced with classes like <code>.alert</code> and <code>.success</code>.

            <h4>Sizes</h4>
            <p>Foundation 3 includes the same sizes as Foundation 2 including <code>.large</code>, <code>.small</code>, etc.</p>
            <p><a href="buttons.php">View the Visibility Docs &rarr;</a></p>
          </div>
          <div class="five columns">
            <script src="https://gist.github.com/3001205.js?file=f3-migrate-buttons.html"></script>
          </div>
        </div>

        <hr />

        <h3>Forms</h3>
        <div class="row">
          <div class="seven columns">
            <p>Forms in Foundation 3 have undergone some significant changes. One of the challenges we saw with forms was sizing them &mdash; fixed pixel sizes weren't ideal, and percentage sizes didn't allow for easy form layout. In Foundation 3 all forms are sized to be 100% the width of their container, with the intent that the Grid will be used to lay out the forms.</p>
            <p>Form size classes like <code>.large</code> will not be recognized by Foundation 3. Form layouts that already fall inside the grid will behave more or less as expected, but you may need to create some additional structure to achieve certain form layouts. The bright side is that the tools for laying out forms, and the available form elements, in Foundation 3 is significantly greater.</p>
            <p>One other notable change is that inputs are now targeted based on their type rather than an additional class like <code>.input-text</code>.</p>
            <p><a href="forms.php">View the Visibility Docs &rarr;</a></p>
          </div>
          <div class="five columns">
            <script src="https://gist.github.com/3001259.js?file=f3-migrate-forms.html"></script>
          </div>
        </div>

        <hr />

        <h3>Navigation and Tabs</h3>
        <div class="row">
          <div class="seven columns">
            <p>Stylistically, navigation and tabs have been changed or augmented. However, the syntax is largely unchanged. Rather than having <code>.active</code> place on the anchor, it is now placed on the <code>dd</code> or <code>li</code>.</p>
            <p><a href="navbar.php">View the Navigation Docs &rarr;</a><br /><a href="tabs.php">View the Tabs Docs &rarr;</a></p>
          </div>
        </div>

        <hr />

        <h3>Visibility Classes</h3>
        <div class="row">
          <div class="seven columns">
            <p>In Foundation 2 classes like <code>.show-on-phones</code> allowed you to turn things on and off for certain types of devices. With the breadth of devices on the market, specific targets like tablets or phones no longer makes sense.</p>
            <p>Foundation 3, instead of using device-category classes, now uses classes that are specific to particular characteristics. Instead of <code>.show-on-phones</code> you could use <code>.show-for-small</code> or <code>.show-for-touch</code> to show on a small screen, or on touch devices.</p>
            <p>This means you will need to adjust any and all of your mobile visibility classes to the new scheme. We promise this is a better way to do it.</p>
            <p><a href="elements.php">View the Visibility Docs &rarr;</a></p>
          </div>
        </div>

        <hr />

        <h3>Other Elements</h3>
        <div class="row">
          <div class="seven columns">
            <p>While Foundation 3 includes a number of new elements, the syntax for existing ones is largely unchanged. The structure of things like <code>.panels</code> is changed in the same way as everything else, with <code>border-box</code> sizing, but this has little practical effect.</p>
          </div>
        </div>

        <hr />

        <h3>Orbit and Reveal</h3>
        <div class="row">
          <div class="seven columns">
            <p>While we did improve the documentation quite a bit (yeah, we heard you) there are no notable changes in their implementation. They should work as expected and as before in Foundation 3.</p>
          </div>
        </div>

        <hr />

        <h3>Browser Support</h3>
        <div class="row">
          <div class="seven columns">
            <p>One notable change, if you're planning to upgrade and have to support a less modern userbase, is that Foundation 3 <strong>does not</strong> support IE7. IE7 lacks support for <code>box-sizing: border-box</code> and tools to correct that are currently...lacking. As such if IE7 support is important for you, you will be better served with Foundation 2.2.1 which is still available from the <a href="download.php">download page</a>.</p>
          </div>
        </div>

      </div>
    </div>

  </section>

<?php include("includes/_footer.php");  ?>
