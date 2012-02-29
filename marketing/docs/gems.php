<? $page_title = "Rails Gem"; ?>
<?php include("includes/_documentation_head.php"); ?>
	
	<div class="container">
		<div class="row">
			<div class="twelve columns">
				<div class="foundation-header">
					<h1><a href="index.php">Foundation Docs</a></h1>
					<h4 class="subheader">Rapid prototyping and building library from ZURB.</h4>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="two columns">
				<dl class="nice tabs vertical hide-on-phones">
					<dd><a href="index.php">Getting Started</a></dd>
					<dd><a href="grid.php">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="gems.php" class="active">Gems</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
			<div class="six columns">
				<h3>Gems</h3>
				<h4 class="subheader">We've created a couple awesome gems that will help you use Foundation in new ways!</h4>
        <!-- <h4 class="subheader">Want to use Foundation in a Rails 3.1+ application?  Use our gem, it'll make it super duper easy!</h4> -->

				<dl class="tabs">
          <dd><a href="#compass" class="active"><strong>Compass/SASS</strong></a></dd>
          <dd><a href="#rails"><strong>Rails</strong></a></dd>
        </dl>

        <ul class="tabs-content">          
          <li class="active" id="compassTab">
            <h4>What is this Thing?</h4>
            <p>Our Foundation Compass Gem makes is really easy to create a project that uses Compass and SASS to add to the speed and flexibility of Foundation. Following our instructions will ensure you have all the dependencies installed on your machine and are ready to rock 'n roll.</p>
            
            <h4>Installation</h4>
            <p>The following line of code, ran in the command line, will install our Foundation Compass Gem, as well as, all its dependencies onto your machine. From here you'll be able to create your first project and start crushing it.</p>
            <p><script type="text/javascript" src="http://snipt.net/embed/6c8d15f730bd05a7f6e19ac7777ec3db"></script></p>
            
            <h4>Create Your First Project</h4>
            <p>In the command line, navigate to the directory you'd like to use for your new project or include the path with your 'compass create' command. This will create a directory that includes all the Foundation files.</p>
            <p><script type="text/javascript" src="http://snipt.net/embed/7dadb17aa6b95f469d55c1c3fffd6b53"></script></p>
            <p>Our Compass Gem defaults to SCSS, but can easily be switched to SASS on the fly when you create a project, just run the following:</p>
            <p><script type="text/javascript" src="http://snipt.net/embed/1f8dc276f8040001419c64e9d18f09cd"></script></p>
            
            <h5>Adding to Existing Projects</h5>
            <p>We've also made it very easy to add our gem to existing project. You just need to make sure to add <strong>require "ZURB-foundation"</strong> to the top of your config file. Then navigate to your project directory and run:</p>
            <p><script type="text/javascript" src="http://snipt.net/embed/49b9cebdffc1ef28654b73c1e656602b"></script></p>
            
            <h5>Customizable Settings</h5>
            <p>We're in the process of making our gem even more customizable! Here are the settings we've extrapolated so far, just uncomment them and change to what you need:</p>
            <ul class="disc">
              <li><strong>$experimental-support-for-khtml</strong>&ndash; Set this to true to add support </li>
              <li><strong>$experimental-support-for-microsoft</strong>&ndash; Set this to true to add support </li>
              <li><strong>$helvetica-font-stack</strong>&ndash; Customize the default font stack we use.</li>
              <li><strong>$body-font-size</strong>&ndash; Default font size.</li>
              <li><strong>$body-font-family</strong>&ndash; Default font family.</li>
              <li><strong>$body-background</strong>&ndash; Default background color.</li>
              <li><strong>$body-line-height</strong>&ndash; Default line height.</li>
              <li><strong>$body-color</strong>&ndash; Default font color.</li>
              <li><strong>$grid-max-width</strong>&ndash; Change the size of the grid.</li>
              <li><strong>$grid-min-width</strong>&ndash; How small the grid can go.</li>
              <li><strong>$support-block-grid-nth-child</strong>&ndash; Set to true if you want support.</li>
              <li><strong>$button-transition-duration</strong>&ndash; How long the hover effects will last.</li>
              <li><strong>$default-color</strong>&ndash; The main color for styling your elements.</li>
            </ul>
            
            <h4>Using Compass to Compile Your SASS/SCSS into CSS</h4>
            <p>Navigate into your new project directory from the command line and run the following line, which will tell Compass to watch your sass files for when you save. Each time you save, Compass will compile the file into plain CSS and give you error if there are any.</p>
            <p><script type="text/javascript" src="http://snipt.net/embed/c9c8c237f2e7ad74c01ef6e272513dd6"></script></p>
            
            <h4>Contributing to the Gem</h4>
            <p>This little gem is <a href="https://github.com/zurb/foundation-sass">hosted on git</a>. If you have questions or bugs please file them through Git, but you can also talk to us if you want to get into Foundation and help build out the next generation way of rapidly prototyping. Yeah, we're thinking big.</p>
          </li>
          
          <li id="railsTab">
            <h4>Installation</h4>
			    	<p>Inside your Gemfile add the following line:</p>
				
    				<p><script src="http://snipt.net/embed/23791244b304c2be8b57d1d123472d11"></script></p>
				
    				<h4>Get Started</h4>
    				<p>If you want to include Foundation on all of your application pages (and why wouldn't you!) then run the following to append foundation to your application sprockets files:</p>
				
    				<p><script type="text/javascript" src="http://snipt.net/embed/60fc96068ebfe0ef56e0cb43ba360c30"></script></p>
				
    				<h4>Advanced</h4>
    				<p>You can also manually include Foundation on specific pages using:</p>
        
            <p><script type="text/javascript" src="http://snipt.net/embed/115425310b7fff02bb26554c5abef947"></script></p>
				
    				<h4>Contributing to the Gem</h4>
            <p>This little gem is <a href="https://github.com/zurb/foundation-rails">hosted on git</a>. If you have questions or bugs please file them through Git, but you can also talk to us if you want to get into Foundation and help build out the next generation way of rapidly prototyping. Yeah, we're thinking big.</p>
          </li>
        </ul>
				
			</div>
			<div class="four columns">
				<? include("includes/_download.php"); ?>
			</div>
		</div>
		
		<div class="row">
			<div class="twelve columns">
				<dl class="nice tabs mobile show-on-phones">
					<dd><a href="index.php">Getting Started</a></dd>
					<dd><a href="grid.php">Grid</a></dd>
					<dd><a href="buttons.php" class="active">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
		</div>
		
<?php include("includes/_documentation_foot.php");  ?>