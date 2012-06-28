<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Tabs</h3>
    			<h4 class="subheader">Tabs are very versatile both as organization and navigational constructs. With the base Foundation package, tabs in the markup specified below are already hooked up &mdash; no extra work required.</h4>

  				<hr />

  				<h4>Simple Tabs</h4>

    			<p>Tabs are made of <strong>two objects:</strong> a <code>dl</code> object containing the tabs themselves, and a <code>ul</code> object containing the tab content. If you simply want visual tabs (as seen in this documentation) without the on-page hookup, you only need the DL. If you want functional tabs, just be sure that each tab is linked to an ID, and that the corresponding tab has an ID of <code>#tabnameTab</code>. Check out these examples.</p>

  				<p><em>Note: The third tab is using the <a href="layout.php">mobile visibility classes</a> to hide on small devices.</em></p>

  				<dl class="tabs">
  					<dd class="active"><a href="#simple1">Simple Tab 1</a></dd>
  					<dd><a href="#simple2">Simple Tab 2</a></dd>
  					<dd class="hide-for-small"><a href="#simple3">Simple Tab 3</a></dd>
  				</dl>
  				<ul class="tabs-content">
  					<li class="active" id="simple1Tab">This is simple tab 1's content. Pretty neat, huh?</li>
  					<li id="simple2Tab">This is simple tab 2's content. Now you see it!</li>
  					<li id="simple3Tab">This is simple tab 3's content. It's only okay.</li>
  				</ul>

  				<script src="https://gist.github.com/2984312.js?file=f3-simple-tabs.html"></script>

  				<hr />

  				<h4>Tab Sizing</h4>
  				<p>If you want your tabs to run the full width of their container evenly, you can add class of <code>.two-up</code>, <code>.three-up</code>, <code>.four-up</code>, and <code>.five-up</code> to them.</p>

          <dl class="tabs three-up">
          	<dd class="active"><a href="#evenTab1">Even Tab 1</a></dd>
          	<dd><a href="#evenTab2">Even Tab 2</a></dd>
          	<dd><a href="#evenTab3">Even Tab 3</a></dd>
          </dl>

  				<dl class="tabs five-up">
  					<dd class="active"><a href="#evenTab4">Tab 4</a></dd>
  					<dd><a href="#evenTab5">Tab 5</a></dd>
  					<dd><a href="#evenTab6">Tab 6</a></dd>
  					<dd><a href="#evenTab7">Tab 7</a></dd>
  					<dd><a href="#evenTab8">Tab 8</a></dd>
  				</dl>

  				<script src="https://gist.github.com/2984315.js?file=f3-even-tabs.html"></script>

  				<hr />

  				<h4>Contained Tabs</h4>
  				<p>Contained tabs have a simple added class of "contained" on the tabs-content element. What that means is the tab content has a border around it tying it to the tabs. You can still use standard column sizes inside a tab element.</p>

  				<p>You'll also notice in this example that a <code>dt</code> element can serve to label groups of tabs.</p>

          <dl class="tabs contained">
          	<dt>Title 1</dt>
          	<dd class="active"><a href="#simpleContained1">Simple Tab 1</a></dd>
          	<dd class="hide-for-small"><a href="#simpleContained2">Simple Tab 2</a></dd>
          	<dt class="hide-for-small">Title 1</dt>
          	<dd class="hide-for-small"><a href="#simpleContained3">Simple Tab 3</a></dd>
          </dl>
          <ul class="tabs-content contained">
          	<li class="active" id="simpleContained1Tab">This is simple tab 1's content. Pretty neat, huh?</li>
          	<li id="simpleContained2Tab">This is simple tab 2's content. Now you see it!</li>
          	<li id="simpleContained3Tab">This is simple tab 3's content. It's only okay.</li>
          </ul>

  				<script src="https://gist.github.com/2984321.js?file=f3-contained-tabs.html"></script>

  				<hr />

  				<h4>Pill-Style Tabs</h4>
  				<p>If you need an alternate view for tabs (especially for filters, or similar), you can use pill-style tabs. They look like this:</p>

          <dl class="tabs pill">
          	<dd class="active"><a href="#pillTab1">Pill Tab 1</a></dd>
          	<dd><a href="#pillTab2">Pill Tab 2</a></dd>
          	<dd class="hide-for-small"><a href="#pillTab3">Pill Tab 3</a></dd>
          </dl>

  				<script src="https://gist.github.com/3000706.js?file=f3-pill-tabs.html"></script>

  				<hr />

  				<h4>Vertical Tabs</h4>
  				<p>You can also use tabs in a vertical configuration by adding a class of 'vertical' to the <code>dl</code> element. These are great for more scalable nav, and you can see how they work on this page on a tablet or desktop.</p>

          <dl class="nice vertical tabs">
          	<dd class="active"><a href="#vertical1">Vertical Tab 1</a></dd>
          	<dd><a href="#vertical2">Vertical Tab 2</a></dd>
          	<dd><a href="#vertical3">Vertical Tab 3</a></dd>
          </dl>

  				<script src="https://gist.github.com/2984322.js?file=f3-vertical-tabs.html"></script>

  				<hr />

  				<h4>Mobile Tabs</h4>
  				<p>If you want a standard, horizontal tab group to act vertical on small devices, adding a class of "mobile" to a standard (not vertical) tab group will switch them to full width nav bars on small screens.</p>

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
        <dd><a href="gem-install.php">Using Gems</a></dd>
				<dd><a href="grid.php">The Grid</a></dd>
				<dd><a href="typography.php">Typography</a></dd>
				<dd><a href="buttons.php">Buttons</a></dd>
				<dd><a href="forms.php">Forms</a></dd>
				<dd><a href="navigation.php">Navigation</a></dd>
				<dd class="active"><a href="tabs.php" class="active">Tabs</a></dd>
				<dd><a href="elements.php">Elements</a></dd>
				<dd><a href="orbit.php">Orbit</a></dd>
				<dd><a href="reveal.php">Reveal</a></dd>
				<dd><a href="support.php">Support</a></dd>
			</dl>

		</section>
	</div>


<?php include("includes/_documentation_foot.php");  ?>
