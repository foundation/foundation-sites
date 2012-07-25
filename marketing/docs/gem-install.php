<? $page_title = "Gem Versions, Sass, Compass, Rails, Etc." ?>
<?php include("includes/_documentation_head.php"); ?>
  <style type="text/css">.btm-marg{display: block; margin-bottom: 30px;}ul{margin-bottom:20px!important;}</style>
  <div class="row">
    <section role="main">
      <div class="row">
        <div class="eight columns">

          <dl class="tabs" style="margin-top: 3px;">
            <dd class="active"><a href="#simple1">Compass</a></dd>
            <dd><a href="#simple2">Rails</a></dd>
          </dl>

          <ul class="tabs-content">
            <li class="active" id="simple1Tab">
              <h3>Installing with Compass</h3>
              <h4 class="subheader">Start using Foundation the way you want, with more control than ever before.</h4>

              <dl class="sub-nav">
                <dt>Go to:</dt>
                <dd><a href="#installing">Installing</a></dd>
                <dd><a href="#settings">Settings</a></dd>
                <dd><a href="#mixins">Mixins &amp; Functions</a></dd>
              </dl>

              <hr>

              <a name="installing"></a>
              <h4>Installation</h4>
              <p>To create your first project using our Compass extension, you'll need to have the zurb-foundation gem installed. This includes all the necessary dependencies that you'll need to get going.</p>
              <p class="btm-marg keystroke">[sudo] gem install zurb-foundation</p>
              <em style="position: relative; top: -20px; font-size: 12px;">Note: Make sure you aren't using 'ZURB-foundation' as that is the 2.2 version.</em>

              <h5>Creating Your first project</h5>
              <p class="keystroke">
                &bullet; cd path/to/where-you-want-your-project <br>
                &bullet; compass create &lt;project-name&gt; -r zurb-foundation --using foundation
              </p>
              <p>
              <p class="btm-marg">Now you should have a new project folder created with foundation included along with all the awesome advantages that comes with <a href="http://sass-lang.com/" rel="nofollow">Sass</a> and <a href="http://compass-style.org/" rel="nofollow">Compass</a>.</p>

              <h5>Adding Foundation to an existing project</h5>
              <ul class="disc" style="margin-bottom: 35px;">
                <li>Add <span class="keystroke">require "zurb-foundation"</span> to your config.rb file</li>
                <li><span class="keystroke">cd path/to/your-project</span></li>
                <li>run <span class="keystroke">compass install foundation</span></li>
              </ul>
              <h5>Upgrading Your Gem</h5>
              <p>To upgrade your gem to the latest public release you just paste this line into your command line.</p>
              <p class="btm-marg keystroke">[sudo] gem update zurb-foundation</p>

              <h5>Using CodeKit?</h5>
              <p>We're using a cutting edge version of Sass that doesn't come with CodeKit. This means that you'll need to do a couple steps in order to get everything to compile correctly. Once Sass 3.2.0 is out of alpha it will be packaged with CodeKit, until then do this:</p>
              <ul class="disc">
                <li>Run `sudo gem environment` in the command line, note your gem paths.</li>
                <li>Go into <strong>Codekit prefs</strong>, click on <strong>Sass/Scss</strong></li>
                <li>Click on <strong>"Use the Sass Executable at this path:"</strong></li>
                <li>Navigate to the <strong>bin</strong> folder at the gem path you found earlier.</li>
                <li>Select sass.bin</li>
              </ul>

              <hr>

              <a name="settings"></a>
              <h3>Settings</h3>
              <h4 class="subheader">Work with your own colors, font sizes, radii, etc by adjusting the _settings.scss file in your new project!</h4>
              <p>We include a _settings.scss file with every new compass project, this file contains the default variables used through foundation which you can uncomment and. changes to match your needs.</p>

              <h5>Grid Settings</h5>
              <ul class="disc">
                <li><strong>$rowWidth:</strong> Width of the grid.</li>
                <li><strong>$columnGutter:</strong> Width of the gutter.</li>
                <li><strong>$totalColumns:</strong> Adjust how many columns are in the grid.</li>
                <li><strong>$mobileTotalColumns:</strong> Adjust how many columns in the mobile grid.</li>
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

              <h5>Typography Settings</h5>
              <ul class="disc">
                <li><strong>$headerFontFamily:</strong> Font family for headers.</li>
                <li><strong>$bodyFontFamily:</strong> Font family for the body.</li>
              </ul>
<!--               <span class="btm-marg"><script src="https://gist.github.com/3008570.js?file=grid-settings"></script></span>
 -->
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
                <li><strong>@include outerRow();</strong> Create container rows to start the grid.</li>
                <li><strong>@include innerRow();</strong> Nested rows, must be inside a column.</li>
                <li><strong>@include innerRow(collapse);</strong> Collapse the margins of a nested row.</li>
                <li><strong>@include column(#);</strong> Create columns inside of any row. It must contain a number.</li>
                <li><strong>@include column(#, center);</strong> Center your columns within a row.</li>
                <li><strong>@include column(#, collapse);</strong> Collapse the column gutter for postfix and prefix elements.</li>
                <li><strong>@include offsetBy(#);</strong> Offset your columns to the right.</li>
                <li><strong>@include push(#);</strong> Source ordering to push columns around.</li>
                <li><strong>@include pull(#);</strong> Source ordering to pull columns around.</li>
                <li><strong>@include mobileRow();</strong> Create rows that appear on mobile layouts.</li>
                <li><strong>@include mobileColumn(#);</strong> Create mobile columns inside mobile rows.</li>
                <li><strong>@include mobilePush(#);</strong> Source ordering to push columns around on mobile.</li>
                <li><strong>@include mobilePull(#);</strong> Source ordering to pull columns around on mobile.</li>
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
              <p>The typography in Foundation is set to a specific <a href="https://github.com/scottkellum/modular-scale" rel="nofollow">modular scale</a>, which you can update in your _settings.scss file. In order to utilize the scale, you must follow the correct syntax.</p>
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
              <p>If you are unfamiliar with CSS triangles, learn more <a href="http://css-tricks.com/snippets/css/css-triangle/">here.</a> We use them all over in foundation for things like the arrows in dropdowns and pips on tooltips flyouts.</p>

              <ul class="disc">
                <li><strong>@include cssTriangle(size, color, direction);</strong> Easily create awesome triangles!</li>
              </ul>
              <span class="btm-marg"><script src="https://gist.github.com/3009123.js?file=css-triangles.scss"></script></span>

            </li>


            <li id="simple2Tab">

              <h3>Installing with Rails</h3>
              <h4 class="subheader">Start using Foundation in your Rails project.</h4>

              <dl class="sub-nav">
                <dt>Go to:</dt>
                <dd><a href="#gemfile">Gemfile</a></dd>
                <dd><a href="#configuration">Configuration</a></dd>
                <dd><a href="#upgrading">Upgrading from 2.X</a></dd>
              </dl>

              <hr>

              <a name="gemfile"></a>
              <h4>Gemfile</h4>
              <p>First you'll want to add the following gems to the <strong>assets</strong> group in your Gemfile like so:</p>

              <script src="https://gist.github.com/3036269.js?file=Gemfile"></script>

              <p>Then run <strong>bundle install</strong> to install these gems.  You may see the following error:</p>

              <script src="https://gist.github.com/3036269.js?file=bundle_install_error"></script>

              <p>If you see that don't panic, just run <strong>bundle update sass</strong> and you should be on your merry way!</p>

              <h5>Notes on SASS alpha dependency</h5>
              <p>Foundation is currently utilizing some of the new media query features available in SASS 3.2, such as those mentioned in <a href="http://thesassway.com/intermediate/responsive-web-design-in-sass-using-media-queries-in-sass-32" rel="nofollow">this article.</a>  From what we've seen so far this is a stable enough release on which to build Foundation, especially since 3.2 is due to be released soon.</p>

              <a name="configuration"></a>
              <h4>Configuration</h4>

              <h5>Layout</h5>
              <p>Add the following to the <strong>&lt;head&gt;</strong> tag of your page layouts (i.e. <strong>app/views/layouts/application.html.erb</strong>) to set the viewport width for mobile devices.</p>

              <script src="https://gist.github.com/3036269.js?file=application.html.erb"></script>

              <h5>SASS Files</h5>
              <p>Since Foundation is now SASSified you'll need to include it a little differently.  If you're using a standard Rails installation you should rename <strong>application.css</strong> to <strong>application.scss</strong> in the <strong>app/assets/stylesheets</strong> directory.</p>

              <script src="https://gist.github.com/3036269.js?file=application.scss"></script>

              <p>That will import all the foundation related styles into your application.  Take a look at the other documentation pages if you'd like to further customize the stylesheet that gets generated.</p>

              <h5>Javascripts</h5>
              <p>To include all the Foundation related javascripts on your page add <strong>=require foundation</strong> to your <strong>app/assets/javascripts/application.js</strong> sprockets manifest file.</p>
              <script src="https://gist.github.com/3036269.js?file=application.js"></script>

              <a name="upgrading"></a>
              <h4>Upgrading from 2.X</h4>

              <p>For those of you upgrading from a previous version of the gem things are a little different.  In your <strong>app/assets/stylesheets/application.css</strong> you probably had a bit of code like this:</p>

              <script src="https://gist.github.com/3036269.js?file=old_application.css"></script>

              <p>Just rename <strong>application.css</strong> to <strong>application.scss</strong> making sure to replace any <strong>=require</strong> to the sass <strong>@import</strong> syntax.</p>

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
