<? $page_title = "UI Elements" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Elements</h3>
    			<h4 class="subheader">Prototyping and production requires more than just navigation or tabs or typography. We've created a number of additional elements to help rapidly prototype, and like everything else they are production-ready and easy to restyle or override.</h4>

    			<hr />

    			<h4>Visibility Classes</h4>
  				<p>Foundation 3 allows you to easily turn elements on and off based on certain device criteria, like screen size, touch, or orientation.</p>

  				<h5>Screen Size</h5>
  				<p>The following text should describe the device you're using:
            <strong class="show-for-xlarge">You are on a very large screen.</strong>
            <strong class="show-for-large">You are on a large screen.</strong>
            <strong class="show-for-medium">You are on a medium screen.</strong>
            <strong class="show-for-small">You are on a small screen, like a smartphone.</strong>
  				</p>

  				<script src="https://gist.github.com/2993794.js?file=f3-show-size.html"></script>

  				<p>This example uses the opposite rules, so the following text should inversely describe the device you're using:
            <strong class="hide-for-xlarge">You are not on a very large screen.</strong>
            <strong class="hide-for-large">You are not on a large screen.</strong>
            <strong class="hide-for-medium">You are not on a medium screen.</strong>
            <strong class="hide-for-small">You are not on a small screen.</strong>
  				</p>

  				<script src="https://gist.github.com/2993824.js?file=f3-hide-size.html"></script>

  				<h5>Orientation Detection</h5>
  				<p>The following text should describe the device you're using:
            <strong class="show-for-landscape">You are in landscape orientation.</strong>
            <strong class="show-for-portrait">You are in protrait orientation.</strong>
  				</p>

  				<script src="https://gist.github.com/2993845.js?file=f3-orientation.html"></script>

  				<h5>Touch Detection</h5>
  				<p>The following text should describe the device you're using:
            <strong class="show-for-touch">You are on a touch-enabled device.</strong>
            <strong class="hide-for-touch">You are not on a touch-enabled device.</strong>
  				</p>

  				<script src="https://gist.github.com/2993838.js?file=f3-touch.html"></script>

  				<p><strong>Note:</strong> These classes have been listed in order of precendence. Touch classes will override orientation, which will override size.</p>

  				<hr />

    			<h4>Alerts</h4>
  				<p>Alerts are a handy element you can drop into a form or inline on a page to communicate success, warnings, failure or just information. The syntax is extremely simple and like everything else in Foundation, easy to customize.</p>

  				<div class="alert-box">
  					This is a standard alert (div.alert-box).
  					<a href="" class="close">&times;</a>
  				</div>

  				<div class="alert-box success">
  					This is a success alert (div.alert-box.success).
  					<a href="" class="close">&times;</a>
  				</div>

  				<div class="alert-box alert">
  					This is an alert (div.alert-box.alert).
  					<a href="" class="close">&times;</a>
  				</div>

  				<div class="alert-box secondary">
  					This is a secondary alert (div.alert-box.secondary).
  					<a href="" class="close">&times;</a>
  				</div>

  				<script src="https://gist.github.com/2984343.js?file=f3-alert-box.html"></script>

  				<hr />

  				<h4>Labels</h4>
  				<p>Labels are useful inline styles that can be dropped into body copy to call out certain sections or to attach metadata. Examples might be noting when something was updated or that something is new. The syntax is simple, just a <code>span</code> element with a class of .label. The border styling mirrors that of the Foundation buttons.</p>

  				<div class="row">
  					<div class="three columns phone-two">
  						<p>
  							<span class="label">Regular Label</span><br />
  							<span class="radius label">Radius Label</span><br />
  							<span class="round label">Round Label</span>
  						</p>
  					</div>
  					<div class="three columns end phone-two">
  						<p>
  							<span class="secondary radius label">Secondary Label</span><br />
  							<span class="alert label">Alert Label</span><br />
  							<span class="success round label">Success Label</span><br />
  						</p>
  					</div>
  				</div>

          <p><span class="radius label">Example Label</span> This label could read a date for an update or it could include an author name or anything really. Inline labels are pretty handy when you need to draw attention or visually separate a short piece of content.</p>

          <script src="https://gist.github.com/2984340.js?file=f3-inline-labels.html"></script>

          <hr />

          <h4>Tooltips</h4>
  				<p>Tooltips are a quick way to provide extended information on a term or action on a page. They work cross browser and cross platform and are easily added to a page by including the jquery.tooltip.js plugin. You can apply the <strong>has-tip</strong> class to any element.</p>

  				<p>By default, the tooltip takes the width of the element that it is applied to, but you can override this behavior by applying a <strong>data-width</strong> attribute to the target element. The tooltip takes on the content of the targets <strong>title</strong> attribute.</p>

  				<p>The tooltips can be positioned on the <span class="has-tip" data-width="210" title="I'm on bottom and the default position.">"tip-bottom"</span>, which is the default position, <span class="has-tip tip-top noradius" data-width="210" title="I'm on the top and I'm not rounded!">"tip-top" (hehe)</span>, <span class="has-tip tip-left" data-width="90" title="I'm on the left!">"tip-left"</span>, or <span class="has-tip tip-right" data-width="120" title="I'm on the right!">"tip-right"</span> of the target element. On a small device, the tooltips are full width and bottom aligned.</p>

  				<script src="https://gist.github.com/2984356.js?file=f3-tooltips.html"></script>

  				<hr />

  				<h4>Keystrokes</h4>
  				<p>If you have keyboard affordances you might need to explain them, and to that end there's a simple keystroke character affordance in Foundation.</p>
  				<p>For example, to close your browser hit <kbd>Cmd</kbd> + <kbd>Q</kbd>. Don't actually do it. There's more docs to read.</p>
  				<script src="https://gist.github.com/3000680.js?file=f3-keystroke.html"></script>

  				<hr />

  				<h4>Panels</h4>
  				<p>A panel is a simple, helpful css class that enables you to outline sections of your page easily. This allows you to view your page sections as you add content to them, or add emphasis to a section. There are two styles built in, and they support a class of <code>.radius</code> to round them off.</p>

  				<div class="row">
  				  <div class="six columns">
              <div class="panel">
              	<h5>This is a regular panel.</h5>
              	<p>It has an easy to override visual style, and is appropriately subdued.</p>
              </div>
            </div>
            <div class="six columns">
              <div class="panel callout radius">
              	<h5>This is a callout panel.</h5>
              	<p>It's a little ostentatious, but useful for important content.</p>
              </div>
            </div>
          </div>

  				<script src="https://gist.github.com/2984372.js?file=f3-panels.html"></script>

  				<hr />

  				<h4>Link List</h4>
  				<p>When you just need a horizontal list of links, like in a footer, and you want more control than just spaces between them you can use this simple construct.</p>

          <ul class="link-list">
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
            <li><a href="#">Link 4</a></li>
            <li><a href="#">Link 5</a></li>
          </ul>

          <script src="https://gist.github.com/2989329.js?file=f3-link-list.html"></script>

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
				<dd class="active"><a href="elements.php">Elements</a></dd>
				<dd><a href="orbit.php">Orbit</a></dd>
				<dd><a href="reveal.php">Reveal</a></dd>
				<dd><a href="support.php">Support</a></dd>
			</dl>

		</section>
	</div>


<?php include("includes/_documentation_foot.php");  ?>
