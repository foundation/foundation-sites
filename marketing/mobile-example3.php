<? $page_title = "Mobile Visibility" ?>
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
	      <h1 class="light-weight">Mobile Visibility</h1>
	      <p>Foundation is designed to quickly prototype, and one thing we've found very helpful is a series of visibility classes that can be applied to turn things on and off for different devices. On this page, you'll see slightly different interfaces on each class of device (desktop, tablet, and phone).</p>
	    </div>
	  </div>
	  
	  <div class="row show-on-desktops">
	  	<div class="twelve columns">
	  		<h3>Desktop Interface</h3><br />
	  		<dl class="nice tabs">
	  			<dd><a href="#" class="active">Homepage</a></dd>
	  			<dd><a href="#">Secondary Page</a></dd>
	  			<dd><a href="#">Tertiary Page</a></dd>
	  		</dl>
	  	</div>
	  </div>
	  <div class="row show-on-desktops">
	  	<div class="eight columns">
	  		<p>As an example, you'll only see this interface if you're on a desktop machine (something with a resolution higher than 768px wide, and not matching specific tablet resolutions). On a desktop we might make more use of columns for layout, as well as show more information for content.</p>
	  		<div class="row">
	  			<div class="six columns">
			  		<ul class="block-grid three-up">
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  		</ul>
	  			</div>
	  		</div>
	  	</div>
	  	<div class="four columns">
	  		<div class="panel">
	  			<h5>Example Download</h5>
	  			<p>Since downloads only work on desktops (well, or with Dropbox on mobile devices) we only show this for desktops.</p>
	  			<p><a href="#" class="nice blue radius button">Example Download</a></p>
	  		</div>
	  	</div>
	  </div>
	  
	  <div class="row show-on-tablets">
	  	<div class="twelve columns">
	  		<h3>Tablet Interface</h3><br />
	  		<dl class="nice tabs">
	  			<dd><a href="#" class="active">Homepage</a></dd>
	  			<dd><a href="#">Secondary Page</a></dd>
	  			<dd><a href="#">Tertiary Page</a></dd>
	  		</dl>
	  	</div>
	  </div>
	  <div class="row show-on-tablets">
	  	<div class="twelve columns">
	  		<p>As an example, you'll only see this interface if you're on a tablet device (something with a resolution matching specific tablet resolutions). On a tablet we might make more use of columns for layout but we would not show items like download links.</p>
	  		<div class="row">
	  			<div class="six columns">
			  		<ul class="block-grid three-up">
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  			<li><img src="http://placehold.it/100x100" /></li>
			  		</ul>
	  			</div>
	  		</div>
	  	</div>
	  </div>
	  
	  <div class="row show-on-phones">
	  	<div class="twelve columns">
	  		
	  		<h3>Phone Interface</h3><br />
	  		<p>As an example, you'll only see this interface if you're on a phone (something with a resolution lower than desktops or tablets). On a phone our columns will all stack, and we would place navigation at the bottom of the page.</p>
	  		<ul class="block-grid three-up">
	  			<li><img src="http://placehold.it/100x100" /></li>
	  			<li><img src="http://placehold.it/100x100" /></li>
	  			<li><img src="http://placehold.it/100x100" /></li>
	  			<li><img src="http://placehold.it/100x100" /></li>
	  			<li><img src="http://placehold.it/100x100" /></li>
	  			<li><img src="http://placehold.it/100x100" /></li>
	  		</ul>
	  	</div>
	  </div>
	  
	  <div class="row show-on-phones">
	  	<div class="twelve columns">
	  		<dl class="nice mobile tabs">
	  			<dd><a href="#" class="active">Homepage</a></dd>
	  			<dd><a href="#">Secondary Page</a></dd>
	  			<dd><a href="#">Tertiary Page</a></dd>
	  		</dl>
	  	</div>
	  </div>
	  
	  
	  
	 </div>
	   	  
	   	  
	
<?php include("includes/_footer.php");  ?>