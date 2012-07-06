<? $page_title = "Support" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Support</h3>
    			<h4 class="subheader">Foundation was designed for and tested on numerous browsers and devices. Here's the rundown on what's tested, and what to do if something misbehaves.</h4>

    			<h4>Browser and Device Support</h4>
  				<p>We go to great lengths to ensure that Foundation works as expected on a variety of common browsers and devices. Given how forward-facing Foundation is there are some aesthetic properties which are not supported in older browsers (border radii, box shadows, etc), but the core elements are reliable across the board.</p>

  				<div class="row support">
  				  <div class="three columns"><h5>Browser/OS</h5></div>
  				  <div class="three columns"><h5>The Grid</h5></div>
  				  <div class="three columns"><h5>Layout/UI</h5></div>
  				  <div class="three columns"><h5>JS</h5></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">Chrome</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">Firefox</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">Safari</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">IE9</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">IE8</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>

  				<div class="row support">
  				  <div class="three small-three columns">iOS (iPhone)</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">iOS (iPad)</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">Android 2+ (Phone)</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">Android 2+ (Tablet)</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>
  				<div class="row support">
  				  <div class="three small-three columns">Windows Phone 7</div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				  <div class="three small-three columns"><span class="glyph success">f</span></div>
  				</div>

  				<hr />

  				<h4>Frequently Asked Questions</h4>
  				<h5>Why doesn't Foundation 3 support IE6 or IE7?</h5>
  				<p>Both IE6 and IE7 have serious issues which make support for them detrimental to the overall experience. Rather than having a single codebase that supports all the way back to those browsers, but is less useful and flexible for everyone, we opted to not support these browsers. Not only do they have extremely small, rapidly dwindling user bases, but not supporting them allows us the use of things like <code>box-sizing: border-box</code> and other tools.</p>
  				<p>If IE7 support is important for your users / customers, you can use <a href="../files/foundation-download-2.2.1.zip">Foundation 2.2.1</a>, which supports IE7.</p>

  				<h5>Why can't I see the responsive stuff in IE8?</h5>
  				<p>The responsive nature of Foundation takes effect through media queries, which IE8 does not support. However, the intent of media queries is to make changes for devices, rather than uncommonly small IE8 windows, so this is not an issue that comes up in practice.</p>

  				<h5>Can I use Foundation for something I'm going to sell?</h5>
  				<p>Yes! Foundation is licensed under the MIT open source license, meaning you can do almost anything with it. The only thing you can't do is imply that Foundation itself is what you're selling.</p>

  				<h5>Is Foundation tested on [some other device or browser]?</h5>
  				<p>We try and be comprehensive in our testing, but there are thousands of devices so it's often just not feasible. We'd love to hear about Foundation's behaviour on other devices, but the list above is what we test each release on. If your browser or device is not listed your results may vary.</p>
  				
  				<h5>Where can I find the Foundation 2 docs?</h5>
  				<p>For those of you still working on Foundation 2 sites, or who need to continue supporting IE7 with Foundation, we keep the Foundation 2 docs available. <a href="f2/">View the Foundation 2 Docs &rarr;</a></p>

  				<hr />

  				<h4>Getting Help</h4>
  				<p>If the documentation and questions above aren't enough, there are several avenues of support available.</p>

  				<h5><a href="https://groups.google.com/forum/?fromgroups#!forum/foundation-framework-">Foundation Framework Google Group</a></h5>
  				<p>This is an active group of Foundation users who can answer questions about implementation or approach. If you aren't sure how to do something, or something isn't working like you'd expect, reach out here.</p>
  				<p><a href="https://groups.google.com/forum/?fromgroups#!forum/foundation-framework-" class="small button">Foundation Google Group &rarr;</a></p>

  				<h5><a href="http://github.com/zurb/foundation/issues">Github Issues</a></h5>
  				<p>If you've found a bug in the framework (or think you have) you can file it here. We try and address these as part of ongoing development. Please use this only for bugs or things that seem incorrect, support requests will not be addressed quickly here.</p>

  				<h5><a href="http://twitter.com/foundationzurb">@foundationzurb</a></h5>
  				<p><a href="http://twitter.com/foundationzurb">Follow us on Twitter</a> to hear about new sites using Foundation, code examples, playground pieces from ZURB and more. You can also ping us with quick questions or other support issues, we're usually pretty speedy.</p>

  				<h5><a href="mailto:foundation@zurb.com">Get in Touch</a></h5>
  				<p>If you're totally stuck and need some help, shoot us <a href="mailto:foundation@zurb.com">an email</a> and we'll typically get back within a day or two.</p>
  				
  				<hr />
  				
  				<h4>Changelog</h4>
  				
  				<h5>3.0.4 &mdash; July 6, 2012</h5>
  				<p>Fixed a number of bugs around the Sass/Gem installs and documentation. Some smaller items:</p>
  				<ul class="disc">
  				  <li>Fixed a bug with dropdown buttons to allow clicking on their anchors again.</li>
  				  <li>Added styles for HTML5 (and other) input styles, not just text.</li>
  				  <li>Added error states back to the forms documentation.</li>
  				  <li>Flyouts in a nav bar can now expand up as well as down.</li>
  				  <li>In SCSS you can now set $base-size correctly, but we're still working to correct modifying the $ratio variable.</li>
  				</ul>
  				
  				<h5>3.0.1 to 3.0.3 &mdash; July 2 to July 4</h5>
  				<p>Various bug fixes with the downloader, gem, and Sass install.</p>
  				
  				<h5>3.0 &mdash; June 30, 2012</h5>
  				<p>Initial launch of Foundation 3, deprecating Foundation 2.2.1. Major enhancements include Sass/SCSS development, new grid system with box-sizing: border-box, new form styles, new UI elements, retooled download and install options, new docs, new marketing site.</p>

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
				<dd class="active"><a href="support.php">Support</a></dd>
			</dl>

		</section>
	</div>


<?php include("includes/_documentation_foot.php");  ?>
