<? $page_title = "Flexible, Fluid Grid" ?>
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
	    			<li class="current"><a href="grid.php">The Grid</a></li>
	    			<li><a href="prototyping.php">Rapid Prototyping</a></li>
	    			<li><a href="mobile.php">Mobility</a></li>
	    		</ul>
	    	</nav>
	      <h1 class="light-weight">The Grid</h1>
	      <img src="images/grid-banner.jpg">
	      <h4>Flexible, efficient layout.</h4>
	      <p>You've probably used a grid framework before &mdash; we think you'll like this one. It's a 12 column flexible grid that can scale out to an arbitrary size (defined by the max-width of the row) that's also easily nested, so you can build out complicated layouts without creating a lot of custom elements. And when the Grid isn't enough for your site, it just gets out of the way. <a href="docs/grid.php">Grid docs &rarr;</a></p>
	    </div>
	  </div>
	  <br><br>
	  <div class="row">
	    <div class="twelve columns">
	      <h4>Examples</h4>
	    </div>
	  </div>
	  <div class="examples row">
	    <div class="four columns">
	      <a href="grid-example1.php"><img src="images/grid-example-1.jpg"></a>
	      <h6><a href="grid-example1.php">All Grid Sizes</a></h6>
	    </div>
	    <div class="four columns">
	      <a href="grid-example2.php"><img src="images/grid-example-2.jpg"></a>
	      <h6><a href="grid-example2.php">Nesting the Grid</a></h6>
	    </div>
	    <div class="four columns">
	      <a href="grid-example3.php"><img src="images/grid-example-3.jpg"></a>
	      <h6><a href="grid-example3.php">Mobile Grids</a></h6>
	    </div>
	  </div>
	  <br><br>
	  <div class="row">
	    <div class="twelve columns">
	      <a class="hide-on-phones nice blue button right" href="prototyping.php">Rapid Prototyping &rarr;</a>
	      <a class="left show-on-phones" href="mobile.php">&larr; Mobility</a>
	      <a class="right show-on-phones" href="prototyping.php">Rapid Prototyping &rarr;</a>
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