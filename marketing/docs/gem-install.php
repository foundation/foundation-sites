<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>

  <div class="row">
    <section role="main">
      <div class="row">
        <div class="eight columns">

          <h4>SCSS: Installing with Compass</h4>
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

        </div>
        <div class="four columns">
          <? include("includes/_download.php"); ?>
        </div>
      </div>
    </section>

    <section id="sidebar" role="complementary">

      <dl class="tabs vertical hide-on-phones">
        <dd><a href="index.php">Getting Started</a></dd>
        <dd class="active"><a href="installing.php">Installing</a></dd>
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
