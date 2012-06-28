<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Installing</h3>
    			<h4 class="subheader">Start using Foundation the way you want, with more control than ever before.</h4>

    			<h4>SCSS and CSS</h4>
  				<p>There are two ways you can use Foundation &mdash; with Sass (SCSS), and with straight up CSS. If you're comfortable with Sass, working that way will give you a little more control over the framework as well as a lot of other niceties. If you're not comfortable with preprocessors, the CSS version is full featured and can be customized as well.</p>
  				<hr />

  				<h4>SCSS: Installing with Compass</h4>
  				<p>To create your first project using our Compass gem, you'll need to have the zurb-foundation gem installed. This includes all the necessary dependencies to that you'll need to get going.</p>
          <h6>To install from Ruby Gems:</h6>
          <p class="keystroke">[sudo] gem install zurb-foundation</p>
          <br>
          <h5>Creating Your first project</h5>
          <p class="keystroke">
            cd path/to/where-you-want-your-project
          </p>
  				<hr />

  				<h4>CSS: Customize and Download</h4>
  				<p>If you'd rather not work with a preprocessor like Sass, you can download Foundation as a single code pack with everything you need to create a responsive site.</p>
  				
  				<p>Visit the <a href="../download.php">download page</a> to get started with a CSS pack. You can choose to simply download everything, with most files joined to reduce requests and with smart defaults that we've set. Alternately you can customize your download by including or omitting different pieces of the framework, and setting many of the Sass variables like colors, grid size and columns, etc.</p>
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
