<? $page_title = "Typography" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Typography</h3>
    			<h4 class="subheader">Foundation 3 uses a modular scale to generate typography. That means a great, logical vertical rhythm whether you use the SCSS version, or just download the CSS.</h4>

    			<h4>How a Modular Scale Works</h4>
  				<p>Based on some stellar work by <a href="http://www.alistapart.com/articles/more-meaningful-typography/">Tim Brown</a>, the idea of a <a href="http://www.zurb.com/article/1000/foundation-30-typography-and-modular-scal">modular scale</a> is that the size and spacing of all of the typography in the framework is derived from an initial value, another arbitrary "important"" value, and a particular ratio. We chose to use the golden ratio, but there are others available.</p>
  				<p>We then use Sass to generate sizes based on those values, in an ascending scale of size and spacing. If you use the SCSS version of Foundation you can easily change these values, otherwise we default to a 14px base with a 44px important value (based on common UI element size).</p>

  				<script src="https://gist.github.com/2952520.js?file=f3-modscale.scss"></script>

  				<hr />

  				<h4>General Typography</h4>
  				<p>These are the basic elements of typography and rhythm in Foundation 3.</p>

  				<div class="typography">

  				  <h1>h1. This is a very large header.</h1>
  				  <h2>h2. This is a large header.</h2>
  				  <h3>h3. This is a medium header.</h3>
  				  <h4>h4. This is a moderate header.</h4>
  				  <h5>h5. This is small header.</h5>
  				  <h6>h6. This is very small header.</h6>

  				  <p>This is a paragraph. Paragraphs are preset with a font size, line height and spacing to match the overall vertical rhythm. To show what a paragraph looks like this needs a little more content so, let's see...did you know that there are storms occurring on Jupiter that are larger than the Earth? That's pretty cool.</p>

  				</div>

  				<hr />

  				<h4>Header Styles</h4>
  				<p>Foundation 3 includes a number of different styles and treatments for typographic elements, such as subheaders or small header segments.</p>

  				<div class="typography">

            <h2>This is a very large main header.</h2>
            <h4 class="subheader">This is a smaller subheader.</h4>

            <script src="https://gist.github.com/2952496.js?file=f3-subheaders.html"></script>

            <h3>This is a large header. <small>This is a small segment of that header.</small></h3>
            <script src="https://gist.github.com/2952501.js?file=f3-header-segment.html"></script>

  				</div>

  				<hr />

  				<h4>Links</h4>
  				<p>Where would we be without links? Not in hypertext, that's for sure! Ah, nerd humor. Anyways. Links are very standard, and the color is preset or controlled via the _base.scss file as the main color.</p>

  				<div class="typography">
  				  <h2><a href="#">This is a header link.</a></h2>
  				  <h3><a href="#">This is a header link.</a></h3>
  				  <h4><a href="#">This is a header link.</a></h4>
  				  <h5><a href="#">This is a header link.</a></h5>
  				  <p><a href="#">This is a standard inline paragraph link.</a></p>
  				</div>

  				<hr />

  				<h4>Lists</h4>
  				<p>Lists are helpful for, well, lists of things. Foundation 3 uses <a href="http://necolas.github.com/normalize.css/">Normalize.css</a> so lists won't be reset as they were in previous versions. However, we still provide a few simple affordances for lists.</p>

  				<div class="row">

  				  <div class="four columns">
  				    <h5>ul.disc</h5>
  				    <ul class="disc">
  				      <li>List item with a much longer description or more content.</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				    </ul>
  				  </div>
  				  <div class="four columns">
  				    <h5>ul.circle</h5>
  				    <ul class="circle">
  				      <li>List item with a much longer description or more content.</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				    </ul>
  				  </div>
  				  <div class="four columns">
  				    <h5>ul.square</h5>
  				    <ul class="square">
  				      <li>List item with a much longer description or more content.</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				      <li>List item</li>
  				    </ul>
  				  </div>
  				</div>

  				<hr />

  				<h4>Blockquotes</h4>
  				<p>Sometimes other people say smart things, and you may want to mention that through a blockquote callout. We've got you covered.</p>

  				<blockquote>I do not fear computers. I fear the lack of them. <cite>Isaac Asimov</cite></blockquote>

  				<script src="https://gist.github.com/2952560.js?file=f3-blockquote.html"></script>

  				<hr />

  				<h4>Print Styles</h4>
  				<p>Foundation includes print styles developed by HTML5 Boilerplate to give you some basic print-specific styles. These are activated when you print through a media query. It includes:</p>

  				<ul class="disc">
  				  <li>Clearing out backgrounds, box shadows, and text shadows</li>
  				  <li>Appending link URLs after the anchor text</li>
  				  <li>Bordering blockquotes and pre elements</li>
  				  <li>Page cleanup and widow minimization</li>
  				</ul>

  				<p>On top of that, Foundation includes a couple of simple classes you can use to control elements printing, or not printing. Simply attached <code>.print-only</code> on an element to only show when printing, and <code>.hide-on-print</code> to hide something when printing.</p>

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
				<dd class="active"><a href="typography.php" class="active">Typography</a></dd>
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
