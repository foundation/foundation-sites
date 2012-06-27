<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">	
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Orbit</h3>
    			<h4 class="subheader">Orbit is an easy to use, powerful image slider built to be responsive, just like Foundation.</h4>
    			
          <div id="featured">
            <img src="../images/orbit-demo/demo1.jpg" />
            <img src="../images/orbit-demo/demo2.jpg" />
            <img src="../images/orbit-demo/demo3.jpg" />
          </div>
  				
  				<h4>Getting Started</h4>
  				<p>Implementing Orbit is easy, but there are a few things to keep in mind when it comes to using Orbit in its simplest form.</p>
  				
  				<h5>Included Files</h5>
  				<p>First, ensure you're including the Orbit JS and CSS. If you're using the SCSS version of Foundation these will be part of your environment already, and if you download Foundation as simple CSS the two files will be part of <strong>foundation.js</strong> and <strong>foundation.css</strong>, respectively. Also ensure you're including jQuery, also provided as part of any Foundation distribution.</p>  
  				
  				<h5>Setting Up Your Slider</h5>
  				<p>Your Orbit slider is simply a <code>div</code> with a unique ID. For our examples we'll use <code>&lt;div id="featured"&gt;</code>, an example of which you can see above. The markup looks like this:</p>
  				
  				<script src="https://gist.github.com/2960362.js?file=f3-orbit-markup.html"></script>
  				
  				<h5>Activating Orbit</h5>
  				<p>With your <code>#featured</code> element in place, we just need to call Orbit. <strong>Remember:</strong> your call to Orbit needs to come <em>after</em> you've included jQuery and foundation.js. By default those are at the end of your document, so this code snippet should come at the very end:</p>
  				<script src="https://gist.github.com/2960375.js?file=f3-orbit-call.html"></script>
  				
  				<p>That's all you need to trigger Orbit on a series of images. It includes the timer element, and the left and right hand paddles.</p>
  				
  				<hr />
  				
  				<h4>Options</h4>
  				<p>Orbit has a number of options available, which you can specify when you call Orbit. In the example above we kept all of the default values, but you can optionally use any of these options:</p>
  				
  				<script src="https://gist.github.com/2960382.js?file=f3-orbit-options.js"></script>
  				
  				<hr />
  				
  				<h4>Content Sliders</h4>
  				<p>While Orbit was created as a simple image slider, it also supports <code>div</code> elements with arbitrary content. You could have a slider of text blocks, actions, or really anything. <strong>Remember:</strong> for a content slider to work without any images, you need to specify an aspect ratio when you call .orbit(). As shown in the options above, the option needed is <code>fluid: 16x9</code> or another ratio.</p>
  				
          <div id="featuredContent">
            <div>
              <h4>This is a content slider.</h4>
              <p>Each slide holds arbitrary content, like text or actions.</p>
            </div>
            <div>
              <h4>We can include text and buttons, like this!</h4>
              <p>We take no responsibility for what happens if you click this button.</p>
              <p><a href="http://www.youtube.com/watch?v=dQw4w9WgXcQ" class="button" target="_blank">Rock My World!</a></p>
            </div>
            <div>
              <h4>What? You didn't click it?</h4>
              <p>We'll give you the benefit of the doubt. Maybe you did, and now you're back!</p>
            </div>
          </div>
          
          <p>
            <script src="https://gist.github.com/2960442.js?file=f3-orbit-content-markup.html"></script>          
          
            <script src="https://gist.github.com/2960437.js?file=f3-orbit-content.html"></script>
          </p>
          
          <p><strong>Note:</strong> We put some simple styles on our content slider, notably a background and padding on the <code>div</code> elements. Orbit stacks your slides, so transparent slides will will be visible on top of each other.</p>
          
          <hr />
          
          <h4>Graceful Orbit Loading State</h4>
          <p>Since Orbit executes through Javascript, before it kicks in you might see your images or content all stacked on top of each other. To avoid this you can make use of a property of Orbit: it adds a class of <code>.orbit</code> once it executes, meaning you can target your <code>div#featured</code> with specific styles that will be overriden when the class is added.</p>
          
          <p>For example, if we want Orbit to load a simple light grey screen with a spinner, the CSS would look like this:</p>
          
          <script src="https://gist.github.com/2960465.js?file=f3-orbit-loading.css"></script>
          
          <p>We hide the images by default, and give the <code>#featured</code> block a fixed height and background with a spinner. Once Orbit loads the images are displayed and we remove that background.</p>
  				
  							
    			
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
				<dd class="active"><a href="orbit.php">Orbit</a></dd>
				<dd><a href="reveal.php">Reveal</a></dd>
				<dd><a href="support.php">Support</a></dd>
			</dl>
			
		</section>
	</div>
		
		
<?php include("includes/_documentation_foot.php");  ?>
	
<script type="text/javascript">
   $(window).load(function() {
       $('#featured').orbit();
   });
   
   $(window).load(function() {
       $('#featuredContent').orbit({ fluid: '2x1' });
   });
</script>