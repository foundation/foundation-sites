<? $page_title = "Mobile Navigation" ?>
<?php include("includes/_header.php"); ?>
  
  <!-- Grid BG -->
  <div id="gridBgShort" class="container">
    <div class="white-fade hide-on-phones"></div>
    <div class="row">
      <div class="one columns"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div>
    </div>
  </div>
  <!-- /Grid BG -->
  
	<div id="insideContainer" class="container">
	  <div class="row hide-on-phones">
	    <a href="mobile.php" class="back two columns hide-on-phones">&larr; About Mobile</a>
	    <!-- Nav -->
	    <nav class="ten columns">
	  	    <ul>
	  	      <li><a href="docs/">Documentation</a></li>
	  	      <li><a href="#">On Github</a></li>
	  	      <li><a class="nice small blue button src-download" href="files/foundation-download-<?= $version ?>.zip">Download</a></li>
	  	    </ul>
  	  	</nav>
	    <!-- / Nav -->
	  </div>
	  
	  <div class="row">
	    <div class="twelve columns">
	      <h1 class="light-weight">Mobile Navigation</h1>
	      <p>There are several mobile-specific styles available to manage navigation. By using Foundation's tab structure you can not only create a tabbed interface, you can restyle those tabs into mobile nav block by simply adding a class of 'mobile'.</p>
	    </div>
	  </div>
	  
	  <div class="row">
	  	<div class="six columns">
	  		<dl class="nice mobile tabs">
	  			<dd><a href="#" class="active">Llamas</a></dd>
	  			<dd><a href="#">Alpacas</a></dd>
	  			<dd><a href="#">Vicunas</a></dd>
	  			<dd><a href="#">Other</a></dd>
	  		</dl>
	  		<p>You can also use standard tabs on mobile devices, including the built-in tab switching javascript that comes with Foundation. Check out the <a href="docs/ui.php">UI documentation</a> for examples of how that works.</p>
	  		
	  	</div>
	  	<div class="six columns">
	  	
	  		<dl class="nice tabs">
	  			<dd><a href="#" class="active">Llamas</a></dd>
	  			<dd><a href="#">Alpacas</a></dd>
	  			<dd><a href="#">Vicunas</a></dd>
	  			<dd class="hide-on-phones"><a href="#">Other</a></dd>
	  		</dl>
	  		<p>This tab block will continue to look like tabs on any kind of device. Through the use of mobile visibility classes you can easily place nav blocks on top of the page for desktops, and at the bottom for phones.</p>
	  	</div>
	  </div>
	 </div>
	   	  
	   	  
	
<?php include("includes/_footer.php");  ?>