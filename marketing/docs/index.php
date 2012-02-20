<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
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
					<dd><a href="index.php" class="active">Getting Started</a></dd>
					<dd><a href="grid.php">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="gems.php">Gems</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
			<div class="six columns">
				<h3>Welcome to Foundation!</h3>
				<h4 class="subheader">Welcome to the Foundation documentation. Here you can learn what Foundation includes, as well as how to use it on mobile and on the desktop Web.</h4>
				
				<hr />
				
				<h4>What's in Foundation?</h4>
				<p>So much good stuff, girl. We've built Foundation to help you quickly get a site off the ground and to a state where you can easily adapt and modify it into a release. Here's the highlights:</p>
				<div class="row">
					<div class="six columns">
						<ul>
							<li><h5>Global</h5> Foundation's global styles include Eric Meyer's rock-solid reset, tested styles for typography, links, lists, tables and more.</li>
							<li><h5><a href="grid.php">The Grid</a></h5> You're gonna like this. Within global.css you'll find The Grid (not the one from Tron), a layout framework that works on mobile devices, small screens and full-on modern desktops. It's a twelve column, semi-liquid, mobile-scaling grid of awesomeness that you're gonna love. It even supports arbitrary nesting.</li>
							<li><h5><a href="buttons.php">Buttons</a></h5> We love buttons at ZURB. Foundation includes two base styles, three sizes, and several colors that are preconfigured and super easy to modify.</li>
						</ul>
					</div>
					<div class="six columns">
						<ul>
							<li><h5><a href="forms.php">Forms</a></h5> Hate forms? So do we. They're a pain. Well, we're simplifying that by creating two base styles for forms that are tested, include validation styles, have proper spacing&hellip;all the good stuff. We even included custom radio buttons, checkboxes and select lists so you can style up every form element. They're easy to modify, like everything else.</li>
							<li><h5><a href="orbit.php">Orbit</a></h5> That's right - Orbit, the awesome way to put image or content sliders on your page, is packaged in with Foundation. It even works on mobile.</li>
							<li><h5><a href="reveal.php">Reveal</a></h5> Finally, we've created a whole new plugin for modal dialogs in Foundation. Reveal is easy to call, supports several intro animations right out of the box, and is completely stylable. It also works on mobile.</li>
						</ul>
					</div>
				</div>
				
				<hr />
				
				<h4>Changelog</h4>
				<h5>2.2 <small>February 21, 2012</small></h5>
				<p>Added breadcrumbs to UI, and made numerous changes to the JS plugins for stability and cross-browser behaviour. Numerous bug fixes both in JS and CSS.</p>
				
				<h5>2.1.5 <small>January 26, 2012</small></h5>
				<p>Numerous bug fixes around the nav, UI elements, edge cases and general code cleanliness. Also added in <a href="ui.php">tooltips and inline labels</a>. The tooltips can be attached to most objects and work cross-device on click or tap. <strong>Note:</strong> Within this version we now include a build of Modernizr to detect touch-enabled devices. Is it not mandatory, but the nav works best with it in place. You can use another build of Modernizr if you have touch-detection and classes turned on.</p>
				
				<h5>2.1.4 <small>December 19, 2011</small></h5>
				<p>Two semi-major new features: <a href="grid.php">source ordering</a> and <a href="ui.php">video embed</a> support. You can now reorder the grid (both desktop/tablet and phone) using push and pull classes. If you need to embed Youtube or Vimeo videos you can wrap them in a simple .flex-video class to have them scale by proportion within the grid. We also updated the nav-bar to work properly across more devices, and fixed a number of other small bugs.</p>
				
				<h5>2.1.3 <small>December 9, 2011</small></h5>
				<p>We've fixed a number of inheritance issues with dropdown nav, and turned off the JS hooks for that element while we resolve some iOS / Android inconsistencies. Dropdowns will work as expected based on their CSS, but have no special mobile functionality at the moment.</p>
				
				<h5>2.1.2 <small>December 7, 2011</small></h5>
				<p>Added nav bar styles to ui.css including arbitrary-content dropdowns. Added basic support for microformats. Modified how the grid handles phone sizes through margin and padding, and in the process fixed a bug which broke the phone grid when used outside another column.</p>
				
				<h5>2.1.1 <small>November 21, 2011</small></h5>
				<p>Fixed an issue with buttons modifying their bottom margin on hover, as well as fixing bugs with rows inside a Reveal modal and changing the desktop visibility for objects with a declared display property.</p>
				
				<h5>2.1 <small>November 18, 2011</small></h5>
				<p>Added in a four-column mobile grid which can be optionally attached to existing grid elements. Retooled the documentation site for better scalability and added in a vertical tabs element. Also included documentation for the new SaSS gem.</p>
				
				<h5>2.0.3</h5>
				<p>Major fixes for Orbit in responsive layouts, various other grid and common element bug fixes.</p>
				
				<h5>2.0.2</h5>
				<p>Changed the download pack to combine CSS and JS into single files for fewer requests on mobile. Split out typography and the Grid into separate files on Github for easier hacking.</p>
				
				<h5>2.0.1</h5>
				<p>Removed PHP from the base download requirements, numerous bugfixes.</p>
				
				<h5>2.0.0</h5>
				<p>Initial public release.</p>
				
				
				<hr />
				
				<h4>What's Next for Foundation</h4>
				<p>We're not content to sit still &mdash; we're going to keep polishing Foundation, fixing edge cases, and preparing for the next major release. Coming to Foundation: templates, site generation, more common elements, and even better mobile support.</p>
				
				<hr />
				
				<h4>Contributing to Foundation</h4>
				<p>Foundation is <a href="https://github.com/zurb/foundation">hosted on Github</a>. If you have questions or bugs please file them through Github, but you can also <a href="mailto:jonathan+foundation@zurb.com">talk to us</a> if you want to get into Foundation and help build out the next generation way of rapidly prototyping. Yeah, we're thinking big.</p>
			</div>
			<div class="four columns">
				<? include("includes/_download.php"); ?>
			</div>
		</div>
		
		<div class="row">
			<div class="twelve columns">
				<dl class="nice tabs mobile show-on-phones">
					<dd><a href="index.php" class="active">Getting Started</a></dd>
					<dd><a href="grid.php">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
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