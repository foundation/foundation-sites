<? $page_title = "Reveal"; ?>
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
					<dd><a href="reveal.php" class="active">Reveal</a></dd>
					<dd><a href="gems.php">Gems</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
			<div class="six columns">
				<h3>Reveal</h3>
				<h4 class="subheader">Reveal is our new modal plugin. We kept it light-weight, simple, and totally flexible (there's a 'your mom' joke in there somewhere). Go ahead, <a href="" data-reveal-id="testModal">see what a default Reveal modal looks like.</a></h4>
				<hr />
				
				<h4>Using Reveal</h4>
				<p>Reveal is a cinch to hook up - just include the JS and CSS. You can either call it in the JS or just include a new "data-reveal-id" parameter. If you need detailed steps check out the <a href="http://www.zurb.com/playground/reveal-modal-plugin">playground for Reveal</a>, but here are the steps to get it started:</p>
				<ol>
					<li>The markup goes something like this:<br /><br />
					<script src="http://snipt.net/embed/abdf882c25e08d9ba219fe33f17591fe"></script><br />
					</li>
					<li>
						Activate Reveal...but there are two ways to do this glorious action. The first is to attach a handler to something (button most likely) then call Reveal: <br/><br />
						<script src="http://snipt.net/embed/c723edab0ed473c55a27af5dce37abfe"></script><br />
						<strong>OR</strong> the new hotness option is to just add a data-reveal-id to the object which you want to fire the modal when clicked...<br /><br />
						<script src="http://snipt.net/embed/896416888c9bf045d01aca39f64df7b7"></script><br />
						This will launch the modal with the ID "myModal2" without attaching a handler or calling the plugin (since the plugin is always listening for this). You can also pass any of the parameters simply by putting a data-nameOfParameter="value" (i.e. data-animation="fade")
					</li>
				</ol>
				<hr />	
				<h4>Options</h4>
				<script src="http://snipt.net/embed/190995aac581e583e72e9c2bd6bc1794"></script><br />
				<p>Options can be used on the "data-reveal-id" implementation too, just do it like this:</p>
				<script src="http://snipt.net/embed/34db731ca7ab2b9eabe5ac5dd381ea28"></script>

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
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php" class="active">Reveal</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
		</div>
		
		
	
	
	<div id="testModal" class="reveal-modal">
		<h2>Awww yeah, modal dialog!</h2>
		<p class="lead">Yeah it's just the best.</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices aliquet placerat. Duis pulvinar orci et nisi euismod vitae tempus lorem consectetur. Duis at magna quis turpis mattis venenatis eget id diam. </p>
		<a class="close-reveal-modal">&#215;</a>
		<a href="" class="nice radius button">This is a Button</a>
	</div>
	
<?php include("includes/_documentation_foot.php");  ?>