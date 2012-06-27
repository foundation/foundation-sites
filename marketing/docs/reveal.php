<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">	
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Reveal &mdash; Simple, Flexible Modal Dialogs</h3>
    			<h4 class="subheader">Modal dialogs, or pop-up windows, are handy for prototyping and production. Foundation includes Reveal our jQuery modal plugin, to make this easy for you.</h4>
    			
  				<p><a href="#" data-reveal-id="exampleModal" class="radius button">Example Modal&hellip;</a></p>
  				
  				<hr />
  				
  				<h4>Using Reveal</h4>
  				<p>Reveal is easy to hook up. Include the JS and CSS (both of which are included in foundation.css and foundation.js, if you use the downloaded code pack). You can either call it in the JS or include a "data-reveal-id" parameter. Here are the steps to get started:</p>
  				
				  <h5>Markup</h5>
					<p><strong>Remember:</strong> your modal should be at the end of the page, after any of your rows or columns.</p>
					<script src="https://gist.github.com/2955944.js?file=f3-reveal-example.html"></script>
					
					<h5>Calling Reveal</h5>
		   		<p>There are two ways to do call a Reveal modal. The first is to attach a handler to something (button most likely) then call Reveal:</p>
					<script src="https://gist.github.com/2955951.js?file=f3-reveal.html"></script>
					
					<p>The new hotness is to just add a data-reveal-id to the object which you want to fire the modal when clicked...</p>
					<script src="https://gist.github.com/2955957.js?file=f3-reveal-id.html"></script>
					
					<p>This will launch the modal with the ID "myModal2" without attaching a handler or calling the plugin (since the plugin is always listening for this). You can also pass any of the parameters simply by putting a data-nameOfParameter="value" (i.e. data-animation="fade")</p>
  				
  				<hr />
  				
  				<h4>Options</h4>
  				<script src="https://gist.github.com/2956001.js?file=f3-reveal-options.js"></script>
  				
  				<p>Options can be used on the "data-reveal-id" implementation too, just do it like this:</p>
  				
  				<script src="https://gist.github.com/2956006.js?file=f3-reveal-data-options.html"></script>   			
    			
    		</div>
    		<div class="four columns">
    		  <? include("includes/_download.php"); ?>
    		</div>
      </div>
		</section>
		
		<section id="sidebar" role="complementary">
			
			<dl class="tabs vertical hide-on-phones">
				<dd><a href="index.php">Getting Started</a></dd>
				<dd><a href="installing.php">Installing</a></dd>
				<dd><a href="grid.php">The Grid</a></dd>
				<dd><a href="typography.php">Typography</a></dd>
				<dd><a href="buttons.php">Buttons</a></dd>
				<dd><a href="forms.php">Forms</a></dd>
				<dd><a href="navigation.php">Navigation</a></dd>
				<dd><a href="tabs.php">Tabs</a></dd>
				<dd><a href="elements.php">Elements</a></dd>
				<dd><a href="orbit.php">Orbit</a></dd>
				<dd class="active"><a href="reveal.php">Reveal</a></dd>
				<dd><a href="support.php">Support</a></dd>
			</dl>
			
		</section>
	</div>
		
	<div id="exampleModal" class="reveal-modal">
    <h2>This is a modal.</h2>
    <p>Reveal makes these very easy to summon and dismiss. The close button is simple an anchor with a unicode character icon and a class of <code>close-reveal-modal</code>. Clicking anywhere outside the modal will also dismiss it.</p>
    <p>Finally, if your modal summons another Reveal modal, the plugin will handle that for you gracefully.</p>
    <p><a href="#" data-reveal-id="secondModal" class="secondary button">Second Modal&hellip;</a></p>
    <a class="close-reveal-modal">&#215;</a>
  </div>
  
  <div id="secondModal" class="reveal-modal">
    <h2>This is a second modal.</h2>
    <p>See? It just slides into place after the other first modal. Very handy when you need subsequent dialogs, or when a modal option impacts or requires another decision.</p>
    <a class="close-reveal-modal">&#215;</a>
  </div>
		
<?php include("includes/_documentation_foot.php");  ?>