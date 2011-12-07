<? $page_title = "All Grid Sizes" ?>
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
  <div id="gridBgShort" class="container hide-on-phones">
    <div class="white-fade"></div>
    <div class="row">
      <div class="one columns"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div>
    </div>
  </div>
  <!-- /Grid BG -->
  
	<div id="insideContainer" class="container">
	  <div class="row hide-on-phones">
	    <a href="grid.php" class="back two columns hide-on-phones">&larr; About the Grid</a>
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
	      <h1 class="light-weight">All Grid Sizes</h1>
	    </div>
	  </div>
	  
	  <section class="example">
		  <div class="row">
		  	.row
		  </div>
		  
		  <div class="row">
		  	<div class="two columns">.two</div>
		  	<div class="ten columns">.ten.columns</div>
		  </div>
		  <div class="row">
		  	<div class="three columns">.three.columns</div>
		  	<div class="nine columns">.nine.columns</div>
		  </div>
		  <div class="row">
		  	<div class="four columns">.four.columns</div>
		  	<div class="eight columns">.eight.columns</div>
		  </div>
		  <div class="row">
		  	<div class="five columns">.five.columns</div>
		  	<div class="seven columns">.seven.columns</div>
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
		  	<div class="eight columns">.eight.columns</div>
		  	<div class="four columns">.four.columns</div>
		  </div>
		  <div class="row">
		  	<div class="nine columns">.nine.columns</div>
		  	<div class="three columns">.three.columns</div>
		  </div>
		  <div class="row">
		  	<div class="ten columns">.ten.columns</div>
		  	<div class="two columns">.two</div>
		  </div>
		  
		  <br /><br />
		  
		  
		  <div class="row">
		  	<div class="twelve columns">.twelve.columns</div>
		  </div>
		  <div class="row">
		  	<div class="six columns">.six.columns</div>
		  	<div class="six columns">.six.columns</div>
		  </div>
		  <div class="row">
		  	<div class="four columns">.four.columns</div>
		  	<div class="four columns">.four.columns</div>
		  	<div class="four columns">.four.columns</div>
		  </div>
		  <div class="row">
		  	<div class="three columns">.three.columns</div>
		  	<div class="three columns">.three.columns</div>
		  	<div class="three columns">.three.columns</div>
		  	<div class="three columns">.three.columns</div>
		  </div>
		  <div class="row">
		  	<div class="two columns">.two.columns</div>
		  	<div class="two columns">.two.columns</div>
		  	<div class="two columns">.two.columns</div>
		  	<div class="two columns">.two.columns</div>
		  	<div class="two columns">.two.columns</div>
		  	<div class="two columns">.two.columns</div>
		  </div>
	  </section>
	 </div>
	   	  
	 <div class="container">  	  
	
<?php include("includes/_footer.php");  ?>