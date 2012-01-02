<? $page_title = "Reel Case Study" ?>
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
	    			<li><a href="case-foundation.php">Foundation</a></li>
	    			<li class="current"><a href="case-reel.php">Reel</a></li>
	    			<li><a href="case-zurbjobs.php">ZURBjobs</a></li>
	    		</ul>
	    	</nav>
	      <h1 class="light-weight">Reeling in Feedback</h1>
	    </div>
	  </div>
	  <div class="row">
	  	<div class="eight columns">
	      <div class="frame"><img src="images/case-reel.jpg"></div>
	    </div>
	    <div class="four columns">
	      <h4>Powerpoint sucks, especially online.</h4>
	      <p><a href="http://reelapp.com">Reel</a> is a little app we built to help people post mockups, sketches, wireframes, and entire presos (PDF or PPT) and get quick, thumbs up / thumbs down feedback. It wasn't enough to just show slides, we wanted to be able to view the preso, give feedback, and review feedback on any device.</p>
	    </div>
	  </div>
	  <br /><br />
	  
	  <div class="row">
	  	<div class="four columns">
	  		<h5>Identical Templates</h5>
	  		<img src="images/case-reel-1.jpg" />
	  		<p>The slideshow view uses the same HTML templates across all devices, but what the user sees differs pretty substantially between desktop and mobile. We used Foundation's media queries built into mobile.css to seamlessly show the right content for each device.</p>
	  	</div>
	  	<div class="four columns">
	  		<h5>Easy Organization</h5>
	  		<img src="images/case-reel-2.jpg" />
	  		<p>We use the grid to easily organize content without needing to set custom positions for each block. Using the "centered" class in particular for those high-impact center blocks helped keep the markup simple.</p>
	  	</div>
	  	<div class="four columns">
	  		<h5>Next Steps: New App</h5>
	  		<img src="images/case-reel-3.jpg" />
	  		<p>That's not all - we're just getting started. We're working on Reel's big brother, a new app (also based on Foundation) that will include private presos, letting viewers add their own notes, and more! Stay tuned for details&hellip;</p>
	  	</div>
	  </div>
	 
	 
	  <br><br>
	  <div class="row">
	    <div class="twelve columns">
	      <a class="hide-on-phones nice blue button right" href="case-zurbjobs.php">Case Study: ZURBjobs &rarr;</a>
	      <!-- <a class="left hide-on-desktops" href="mobile.php">&larr; Mobility</a> -->
	      <a class="right show-on-phones" href="case-zurbjobs.php">Case Study: ZURBjobs &rarr;</a>
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