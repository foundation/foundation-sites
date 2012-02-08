<? $page_title = "Mobile Development" ?>
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
	    			<li><a href="grid.php">The Grid</a></li>
	    			<li><a href="prototyping.php">Rapid Prototyping</a></li>
	    			<li class="current"><a href="mobile.php">Mobility</a></li>
	    		</ul>
	    	</nav>
	      <h1 class="light-weight">Mobility</h1>
	      <img src="images/mobile-banner.jpg">
	      <h4>Build for the future.</h4>
	      <p>Mobile devices are already eclipsing desktops in adoption and internet use &mdash; that's why Foundation was built from the ground up to support any kind of device, any size screen, with any resolution. You can get going quickly by building once for all devices, or you can create a site tailored to a specific experience. We've even included CSS styles to hide and show elements on different device types, so you can easily turn pieces on and off for each experience.</p>
	    </div>
	  </div>
	  <br><br>
	  <div class="row">
	    <div class="twelve columns">
	      <h4>Examples <small class="show-on-desktops" style="display: inline;">View these on a mobile device</small></h4>
	    </div>
	  </div>
	  <div class="examples row">
	    <div class="four columns">
	      <a href="mobile-example1.php"><div class="frame"><img src="images/mobile-example-1.jpg"></a></div>
	      <h6><a href="mobile-example1.php">Mobile Grid</a></h6>
	    </div>
	    <div class="four columns">
	      <a href="mobile-example2.php"><div class="frame"><img src="images/mobile-example-2.jpg"></a></div>
	      <h6><a href="mobile-example2.php">Mobile Navigation</a></h6>
	    </div>
	    <div class="four columns">
	      <a href="mobile-example3.php"><div class="frame"><img src="images/mobile-example-3.jpg"></a></div>
	      <h6><a href="mobile-example3.php">Mobile Visibility</a></h6>
	    </div>
	  </div>
	  <br><br>
	  <div class="row">
	    <div class="twelve columns">
	      <a class="hide-on-phones nice blue button right" href="grid.php">The Grid &rarr;</a>
	      <a class="left show-on-phones" href="prototyping.php">&larr; Rapid Prototyping</a>
	      <a class="right show-on-phones" href="grid.php">The Grid &rarr;</a>
	    </div>
	    <br><br>
	    <nav class="ten columns show-on-phones">
  	    <ul>
  	      <li><a href="docs/">Documentation</a></li>
  	      <li><a href="http://github.com/zurb/foundation">On Github</a></li>
  	      <li><a class="nice small blue button src-download" href="files/foundation-download-<?= $version ?>.zip">Download</a></li>
  	    </ul>
  	  </nav>
	  </div>
	   	  
	   	  
	
<?php include("includes/_footer.php");  ?>