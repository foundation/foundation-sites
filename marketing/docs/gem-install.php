<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>
  <style type="text/css">.btm-marg{display: block; margin-bottom: 30px;}</style>
  <div class="row">
    <section role="main">
      <div class="row">
        <div class="eight columns">

          <dl class="tabs" style="margin-top: 3px;">
            <dd class="active"><a href="#simple1">Using SCSS</a></dd>
            <dd><a href="#simple2">Using Rails</a></dd>
          </dl>

          <ul class="tabs-content">
            <li class="active" id="simple1Tab">
              <h3>SCSS: Installing with Compass</h3>
              <h4 class="subheader">Start using Foundation the way you want, with more control than ever before.</h4>

              <dl class="sub-nav">
                <dt>Go to:</dt>
                <dd class="active"><a href="#installing">Installing</a></dd>
                <dd class="active"><a href="#settings">Settings</a></dd>
                <dd class="active"><a href="#mixins">Mixins &amp; Functions</a></dd>
              </dl>

              <hr>

              <a name="installing"></a>
              <h4>Installation</h4>
              <p>To create your first project using our Compass gem, you'll need to have the zurb-foundation gem installed. This includes all the necessary dependencies that you'll need to get going.</p>
              <p class="btm-marg keystroke">[sudo] gem install zurb-foundation</p>

              <h5>Creating Your first project</h5>
              <p class="keystroke">
                &bullet; cd path/to/where-you-want-your-project <br>
                &bullet; compass create &lt;project-name&gt; -r zurb-foundation --using zurb-foundation
              </p>
              <p>
              <p class="btm-marg">Now you should have a new project folder created with foundation included along with all the awesome advantages that comes with SASS and Compass.</p>
              <h5>Adding Foundation to an existing project</h5>
              <ul class="disc">
                <li>Add <span class="keystroke">require "ZURB-foundation"</span> to your config.rb file</li>
                <li><span class="keystroke">cd path/to/your-project</span></li>
                <li>run <span class="keystrok">compass install zurb-foundation</span></li>
              </ul>

              <hr>

              <a name="settings"></a>
              <h3>Settings</h3>
              <h4 class="subheader">Work with your own colors, font sizes, radii, etc by adjusting the _settings.scss file in your new project!</h4>
              <p>We include a _settings.scss file with every new compass project. Here we have default variables listed out that you can uncomment and change as you see fit.</p>

              <h5>Grid Settings</h5>
              <ul class="disc">
                <li><strong>$row_width:</strong> Width of the grid.</li>
                <li><strong>$column_gutter:</strong> Width of the gutter.</li>
                <li><strong>$total_columns:</strong> Adjust how many columns are in the grid.</li>
                <li><strong>$mobile_total_columns:</strong> Adjust how many columns in the mobile grid.</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3008570.js?file=grid-settings"></script></span>

              <h5>Colors</h5>
              <ul class="disc">
                <li><strong>$mainColor:</strong> Adjust the main color for your website.</li>
                <li><strong>$secondaryColor:</strong> Secondary color for calls to action, etc.</li>
                <li><strong>$alertColor:</strong> The color associated with alerts or errors.</li>
                <li><strong>$successColor:</strong> The color associated with success.</li>
                <li><strong>$txtColor:</strong> Adjust the color of your body copy.</li>
                <li><strong>$highlightColor:</strong> What color highlighter do you want?</li>
                <li><strong>$black:</strong> Used to create grays with color mixins.</li>
                <li><strong>$white:</strong> Also used to create grays with color mixins.</li>
                <li><strong>$shinyEdge:</strong> Adjust the shiny edge inner box-shadow of the buttons, etc.</li>
                <li><strong>$darkEdge:</strong> Adjust the dark edge inner box-shadow of buttons, etc.</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3008672.js?file=color-settings.scss"></script></span>

              <h5>Button Settings</h5>
              <ul class="disc">
                <li><strong>$buttonRadius:</strong> Adjust the rounded edges of elements with radii.</li>
                <li><strong>$btnBase:</strong> Adjust the size of your buttons based on their top/bottom padding.</li>
                <li><strong>$[tiny, small, large]BtnBase:</strong> Adjust the ratio that your buttons scale by adjust this math.</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3008701.js?file=button-settings.scss"></script></span>

              <h5>Typography Settings <small>These require modular-scale, which comes with Foundation</small></h5>
              <ul class="disc">
                <li><strong>$ratio:</strong> A few ratios: $golden, $major-fifth, $major-sixth, $fifth, $augfourth</li>
                <li><strong>$base-size:</strong> Change the base paragraph size and an important number.</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3008761.js?file=type-settings.scss"></script></span>

              <h5>Other UI Settings</h5>
              <ul class="disc">
                <li><strong>$formSpacing:</strong> Change how far apart columned forms are.</li>
                <li><strong>$tabHeight:</strong> Change how tall you want your tabs.</li>
                <li><strong>$navBarHeight:</strong> Change how tall you want your navbar to be.</li>
                <li><strong>$navFlyoutBaseWidth:</strong> The base number used to calculate dropdown widths.</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3008766.js?file=ui-settings.scss"></script></span>

              <hr>

              <a name="mixins"></a>
              <h3>Mixins &amp; Functions</h3>
              <h4 class="subheader">We wrote some awesome mixins and function that you can use for semantic grids, CSS triangles and more!</h4>

              <h5>Semantic Grid</h5>
              <p>Are you tired of adding extra divs just to include classes for building your grid? We are too! Our semantic grid mixins will help you write more semantic markup. Here's how they work:</p>
              <ul class="disc">
                <li><strong>@include outer-row();</strong> Create container rows to start the grid.</li>
                <li><strong>@include inner-row();</strong> Nested rows, must be inside a column.</li>
                <li><strong>@include inner-row(collapse);</strong> Collapse the margins of a nested row.</li>
                <li><strong>@include column(#);</strong> Create columns inside of any row. It must contain a number.</li>
                <li><strong>@include column(#, center);</strong> Center your columns within a row.</li>
                <li><strong>@include column(#, collapse);</strong> Collapse the column gutter for postfix and prefix elements.</li>
                <li><strong>@include offset-by(#);</strong> Offset your columns to the right.</li>
                <li><strong>@include push(#);</strong> Source ordering to push columns around.</li>
                <li><strong>@include pull(#);</strong> Source ordering to pull columns around.</li>
                <li><strong>@include mobile-row();</strong> Create rows that appear on mobile layouts.</li>
                <li><strong>@include mobile-column(#);</strong> Create mobile columns inside mobile rows.</li>
                <li><strong>@include mobile-push(#);</strong> Source ordering to push columns around on mobile.</li>
                <li><strong>@include mobile-pull(#);</strong> Source ordering to pull columns around on mobile.</li>
              </ul>
              <span>
                <strong>Markup Example:</strong>
                <script src="https://gist.github.com/3009003.js?file=example.html"></script>
              </span>
              <span class="btm-marg">
                <strong>SCSS Example:</strong>
                <script src="https://gist.github.com/3009035.js?file=semantic-grid.scss"></script>
              </span>

              <h5>Modular Scale</h5>
              <p>The typography in Foundation is set to a specific modular scale, which you can update in your _settings.php file. In order to utilize the scale, you must follow the correct syntax.</p>
              <ul class="disc">
                <li><strong>ms(#);</strong> Tell your font which number from the scale to use.</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3009164.js?file=modular-scale.scss"></script></span>

              <h5>Font Size</h5>
              <p>If you feel like breaking out of the modular scale or not using the provided function, you can use our font-size mixin!</p>
              <ul class="disc">
                <li><strong>@include font-size(size);</strong> Outputs 'px' and 'rem' for the number you include!</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3009156.js?file=font-size.scss"></script></span>

              <h5>CSS Triangles</h5>
              <p>If you area unfamiliar with CSS triangles, learn more <a href="http://css-tricks.com/snippets/css/css-triangle/">here &rarr;</a> We use them all in foundation for the arrows in dropdowns and pips on tooltips flyouts.</p>

              <ul class="disc">
                <li><strong>@include css-triangle(size, color, direction);</strong> Easily create awesome triangles!</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3009123.js?file=css-triangles.scss"></script></span>

            </li>


            <li id="simple2Tab">
              Hey
            </li>
          </ul>

        </div>
        <div class="four columns">
          <? include("includes/_download.php"); ?>
        </div>
      </div>
    </section>

    <section id="sidebar" role="complementary">

      <dl class="tabs vertical hide-on-phones">
        <dd><a href="index.php">Getting Started</a></dd>
        <dd><a href="installing.php">CSS Version</a></dd>
        <dd class="active"><a href="gem-install.php">Gem Versions</a></dd>
        <dd><a href="grid.php">The Grid</a></dd>
        <dd><a href="typography.php">Typography</a></dd>
        <dd><a href="buttons.php">Buttons</a></dd>
        <dd><a href="forms.php">Forms</a></dd>
        <dd><a href="navigation.php">Navigation</a></dd>
        <dd><a href="tabs.php">Tabs</a></dd>
        <dd><a href="elements.php">Elements</a></dd>
        <dd><a href="orbit.php">Orbit</a></dd>
        <dd><a href="reveal.php">Reveal</a></dd>
        <dd><a href="support.php">Support</a></dd>
      </dl>

    </section>
  </div>


<?php include("includes/_documentation_foot.php");  ?>
