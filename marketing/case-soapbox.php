<? $page_title = "ZURBsoapbox Case Study" ?>
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
	    			<li class="current"><a href="case-soapbox.php">ZURBsoapbox</a></li>
	    			<li><a href="case-foundation.php">Foundation</a></li>
	    			<li><a href="case-reel.php">Reel</a></li>
	    			<li><a href="case-zurbjobs.php">ZURBjobs</a></li>
	    		</ul>
	    	</nav>
	      <h1 class="light-weight">Building ZURBsoapbox</h1>
	    </div>
	  </div>
	  <div class="row">
	  	<div class="eight columns">
	      <div class="frame"><a href="http://www.zurbsoapbox.com"><img src="images/case-soapbox.jpg"></a></div>
	    </div>
	    <div class="four columns">
	      <h4>Rapidly launching and iterating for our audience.</h4>
	      <p>ZURBsoapbox is a speaking series we host at the ZURB offices, where we invite influential entrepreneurs, designers, and other tech types to come and share their experiences.</p><p>We launched <a href="http://www.zurbsoapbox.com">ZURBsoapbox</a>, the first site built with Foundation, in order to raise engagement and create a resource for anyone who can't attend in person. <strong>Here's some of the highlights.</strong></p>
	    </div>
	  </div>
	  <br /><br />
	  
	  <div class="row">
	  	<div class="four columns">
	  		<h5>Instant Mobile Site</h5>
	  		<div class="frame"><img src="images/case-soapbox-1.jpg"></div>
	  		<p>Thanks to Foundation's <a href="docs/grid.php">built-in responsive grid</a>, as soon as we put together the desktop prototype we already had a working mobile prototype, for tablets and phones.</p>
	  	</div>
	  	<div class="four columns">
	  		<h5>Device-Specific Function</h5>
	  		<img src="images/case-soapbox-2.jpg">
	  		<p>Mobile devices can't handle our standard flash audio player, so we used <a href="docs/layout.php">Foundation's mobile visibility classes</a> to selectively hide the flash element, and show a mobile-friendly audio file link.</p>
	  	</div>
	  	<div class="four columns">
	  		<h5>Next Steps: Images</h5>
	  		<img src="images/case-soapbox-3.jpg">
	  		<p>We practice what we preach, and we're always iterating on Foundation-based sites. Our next step is to implement a more mobile-friendly image solution, so devices don't have to load quite as much data.</p>
	  	</div>
	  </div>
	 
	 
	  <br><br>
	  <div class="row">
	    <div class="twelve columns">
	      <a class="hide-on-phones nice blue button right" href="case-foundation.php">Case Study: Foundation &rarr;</a>
	      <!-- <a class="left hide-on-desktops" href="mobile.php">&larr; Mobility</a> -->
	      <a class="right show-on-phones" href="case-foundation.php">Case Study: Foundation &rarr;</a>
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