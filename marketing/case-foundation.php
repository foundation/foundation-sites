<? $page_title = "Foundation Case Study" ?>
<?php include("includes/_header.php"); ?>
  
  <!-- Grid BG -->
  <div id="gridBgShort" class="container hide-on-phones">
    <div class="white-fade"></div>
    <div class="row">
      <div class="one columns"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div>
    </div>
  </div>
  <!-- /Grid BG -->
  
	<div id="insideContainer" class="container">
	  <div class="row hide-on-phones">
	    <a href="index.php" class="back two columns hide-on-phones">&larr; Home</a>
	  </div>
	  
	  <div class="row">
	    <div class="twelve columns">
	    	<nav class="on-page hide-on-phones">
	    		<ul>
	    			<li><a href="case-swizzle.php">Swizzle</a></li>
	    			<li><a href="case-soapbox.php">ZURBsoapbox</a></li>
	    			<li class="current"><a href="case-foundation.php">Foundation</a></li>
	    			<li><a href="case-reel.php">Reel</a></li>
	    			<li><a href="case-zurbjobs.php">ZURBjobs</a></li>
	    		</ul>
	    	</nav>
	      <h1 class="light-weight">Launching Foundation</h1>
	    </div>
	  </div>
	  <div class="row">
	  	<div class="eight columns">
	      <div class="frame"><img src="images/case-foundation.jpg"></div>
	    </div>
	    <div class="four columns">
	      <h4>Pretty meta, we know.</h4>
	      <p>Since day one we've built the Foundation documentation, and now this new site, with Foundation. Dating back to the original fixed-width Foundation (born of the ZURB global CSS) we've always built with the tool to better understand how it works, explain it, and test it.</p><p>See any mistakes on this site or the docs? <a href="mailto:foundation@zurb.com">Let us know</a> and we'll get right on it. We want Foundation to be as badass and bulletproof as possible.</p>
	    </div>
	  </div>
	  <br /><br />
	  
	  <div class="row">
	  	<div class="four columns">
	  		<h5>Showing the Grid</h5>
	  		<div class="frame"><img src="images/case-foundation-1.jpg"></div>
	  		<p>One thing you may have noticed is the grid background on each page. Try scaling down the homepage &mdash; the background grid actually resizes based on the screen (the lines are attached to divs, not a background image). Nerdy, but we wanted to show the real grid.</p>
	  	</div>
	  	<div class="four columns">
	  		<h5>Mobile Slider</h5>
	  		<img src="images/case-foundation-2.jpg">
	  		<p>The case studies slider on the homepage is powered by <a href="docs/orbit.php">Orbit</a>, a jQuery plugin we created to quickly create image or content sliders. On mobile devices we swap that out in favor of a slider you can actually swipe with gestures, powered by <a href="http://plugins.jquery.com/project/swipe" rel="nofollow">jQuery Swipe</a>.</p>
	  	</div>
	  	<div class="four columns">
	  		<h5>Next Steps: Case Studies</h5>
	  		<img src="images/case-foundation-3.jpg">
	  		<p>Are you using Foundation? We'd love to hear about it! Let us know how you're using Foundation and we might feature you as a case study for the framework. Just <a href="mailto:foundation@zurb.com?subject=I'm%20using%20Foundation">let us know via email &rarr;</a></p>
	  	</div>
	  </div>
	 
	 
	  <br><br>
	  <div class="row">
	    <div class="twelve columns">
	      <a class="hide-on-phones nice blue button right" href="case-reel.php">Case Study: Reel &rarr;</a>
	      <!-- <a class="left hide-on-desktops" href="mobile.php">&larr; Mobility</a> -->
	      <a class="right show-on-phones" href="case-reel.php">Case Study: Reel &rarr;</a>
	    </div>
	    <br><br>
	    <nav class="ten columns show-on-phones">
  	    <ul>
  	      <li><a href="#">Documentation</a></li>
  	      <li><a href="#">On Github</a></li>
  	      <li><a class="nice small blue button src-download" href="files/foundation-download-<?= $version ?>.zip">Download</a></li>
  	    </ul>
  	  </nav>
	  </div>
	   	  
	   	  
	
<?php include("includes/_footer.php");  ?>