<? $page_title = "CSS Version" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>CSS</h3>
    			<h4 class="subheader">Start using Foundation the way you want, with more control than ever before.</h4>

          <hr>

  				<h4>CSS: Customize and Download</h4>
  				<p>If you'd rather not work with a preprocessor like Sass, you can download Foundation as a single code pack with everything you need to create a responsive site.</p>

  				<p>Visit the <a href="../download.php">download page</a> to get started with a CSS pack. You can choose to simply download everything, with most files joined to reduce requests and with smart defaults that we've set. Alternately you can customize your download by including or omitting different pieces of the framework, and setting many of the Sass variables like colors, grid size and columns, etc.</p>
  				
  				<hr />
  				
  				<h4>Upgrading to new Foundation 3.x Releases</h4>
  				<p>When a new version of Foundation 3 is released we'll note the changes in the changelog on the <a href="support.php">support page</a>. Replace your foundation.css with the new version, and replace your app.js (or others noted in the changelog) making sure to port over any changes or additions you've made to those files.</p>
  				
  				<hr />
  				
  				<h4>Upgrading from 2.x to 3.0</h4>
  				<p>If you want to upgrade your Foundation 2 app or site to Foundation 3, you'll need to download a new version of Foundation (custom or the default). Swap out your foundation.css file for the one in 3.0. Replace all of your JS with the new versions. If you have your own JS in those files be sure to port it over, and other JS files you have should be fine.</p>
  				<p>Once you've made those changes consult this <a href="../migration.php">migration guide</a> to see what you'll need to change in your markup.</p>
  				
  				
    		</div>
    		<div class="four columns">
    		  <? include("includes/_download.php"); ?>
    		</div>
      </div>
		</section>

		<section id="sidebar" role="complementary">

			<dl class="tabs vertical hide-on-phones">
				<dd><a href="index.php">Getting Started</a></dd>
				<dd class="active"><a href="installing.php">CSS Version</a></dd>
        <dd><a href="gem-install.php">Gem Versions</a></dd>
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
