<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>
  <style type="text/css">.btm-marg{display: block; margin-bottom: 30px;}</style>
  <div class="row">
    <section role="main">
      <div class="row">
        <div class="eight columns">

          <dl class="tabs pill">
            <dd class="active"><a href="#scss">Using SCSS</a></dd>
            <dd><a href="#rails">Using Rails</a></dd>
          </dl>

          <ul class="tabs-content">
            <li class="active" id="scss">
              <h3>SCSS: Installing with Compass</h3>
              <h4 class="subheader">Start using Foundation the way you want, with more control than ever before.</h4>

              <p>To create your first project using our Compass gem, you'll need to have the zurb-foundation gem installed. This includes all the necessary dependencies to that you'll need to get going.</p>
              <h5>To install from Ruby Gems:</h5>
              <p class="keystroke">[sudo] gem install zurb-foundation</p>
              <br>
              <h5>Creating Your first project</h5>
              <p class="keystroke">
                &bullet; cd path/to/where-you-want-your-project <br>
                &bullet; compass create &lt;project-name&gt; -r zurb-foundation --using zurb-foundation
              </p>
              <p>
              <p>Now you should have a new project folder created with foundation included along with all the awesome advantages that comes with SASS and Compass.</p>
              <h5>Adding Foundation to an existing project</h5>
              <ul class="disc">
                <li>Add <span class="keystroke">require "ZURB-foundation"</span> to your config.rb file</li>
                <li><span class="keystroke">cd path/to/your-project</span></li>
                <li>run <span class="keystrok">compass install zurb-foundation</span></li>
              </ul>

              <hr>

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
            </li>
            <li id="rails">
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
        <dd><a href="installing.php">Using CSS</a></dd>
        <dd class="active"><a href="gem-install.php">Using Gems</a></dd>
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
