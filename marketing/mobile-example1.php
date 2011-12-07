<? $page_title = "Mobile Grid" ?>
<?php include("includes/_header.php"); ?>
  
  <style>
  
  	.example .row, .example .row .column, .example .row .columns { background: #eee; border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; height: 32px; text-indent: 4px; line-height: 32px; }
  	.example .row { margin-bottom: 10px; }
  	.example .row .column, .example .row .columns { background: #ccc; }
  	
  	@media handheld, only screen and (max-width: 767px) {
		.example .row { height: auto; }
		.example .row .column, .example .row .columns { margin-bottom: 10px; }
		.example .row .column:last-child, .example .row .columns:last-child { margin-bottom: 0; }
	}
  
  </style>
  
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
	      <h1 class="light-weight">Mobile Grid</h1>
	      <p>On small mobile devices like iPhones or Android, the grid collapses to stack all columns on top of each other. Here an example: try viewing this on a desktop and phone, or simply resize your browser window.</p>
	    </div>
	  </div>
	  
	  <section class="example">
		  <div class="row">
		  	.row
		  </div>
		  <div class="row">
		  	<div class="six columns">.six.columns</div>
		  	<div class="six columns">.six.columns</div>
		  </div>
		  <div class="row">
		  	<div class="seven columns">.seven.columns</div>
		  	<div class="five columns">.five.columns</div>
		  </div>
		  <div class="row">
		  	<div class="ten columns">.ten.columns</div>
		  	<div class="two columns">.two</div>
		  </div>
		  
		  <br /><br />
	  </section>
		  
		  
	  <div class="row">
	  	<div class="twelve columns">
	  		<h3>Block Grid</h3>
	  		<p>Foundation also includes block grids, literal two-up, three-up, four-up and five-up grids that persist on any kind of device. These are ideal for grids of images, icons, or anything that has similar sizes.</p>
	  		
	  		<ul class="block-grid four-up">
	  			<li><img src="http://placehold.it/100x100" /></li>
	  			<li><img src="http://placehold.it/100x100" /></li>
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
	   	  
	   	  
	
<?php include("includes/_footer.php");  ?>