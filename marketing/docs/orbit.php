<? $page_title = "Orbit"; ?>
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
					<dd><a href="orbit.php" class="active">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="gems.php">Gems</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
			<div class="six columns">
				<h3>Orbit</h3>
				<h4 class="subheader">Orbit is all the rage in jQuery hotness right now. It's a killer, lightweight slider for images &amp; content.</h4>
				<hr />

				<div id="orbitDemo">
					<img src="../images/orbit-demo/overflow.jpg" alt="Overflow: Hidden No More" />
					<img src="../images/orbit-demo/captions.jpg"  alt="HTML Captions" data-caption="#htmlCaption" />
					<img src="../images/orbit-demo/features.jpg" alt="and more features" />
					<div class="content" style="">
						<h1>Orbit does content.</h1>
						<h3>This is just text over a background image.</h3>
					</div>
				</div>
				<!-- Captions for Orbit -->
				<span class="orbit-caption" id="htmlCaption"><strong>I'm A Badass Caption:</strong> I can haz <a href="#">links</a>, <em>style</em> or anything that is valid markup :)</span>

				<h4>The Basic Implementation</h4>
				<p>Orbit is going to be the easiest slider you've ever hooked up. Below are the steps, but for more detail checkout the <a href="http://www.zurb.com/playground/orbit-jquery-image-slider">playground docs</a>.</p>
				<ol>
					<li>Get some markup like this in your page: <br /><br/>
					<script src="http://snipt.net/embed/227e566c916fdf7dfa91327dd245787b"></script><br />
					</li>
					<li>Activate Orbit. You can embed the call in the specific page like this: <br /><br />
						<script src="http://snipt.net/embed/190e852a2d48b2c8091028bf35e2a2ad"></script><br />
						...Or you could just put it in the app.js file if you're using that.
					</li>
				</ol>
				<hr />
				<h4>Options</h4>
				<script type="text/javascript" src="http://snipt.net/embed/94068a4be215c306742055e78096189b"></script>

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
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php" class="active">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
		</div>


<?php include("includes/_documentation_foot.php");  ?>
