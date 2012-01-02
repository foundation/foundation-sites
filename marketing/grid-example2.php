<? $page_title = "Nesting the Grid" ?>
<?php include("includes/_header.php"); ?>
  
  <style>
  
  	.example .row, .example .row .column, .example .row .columns { border-radius: 3px; -webkit-border-radius: 3px; -moz-border-radius: 3px; }
  	.example .row { margin-bottom: 10px; }
  	.example .row .column, .example .row .columns { background: #eee; }
  	
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
	      <h1 class="light-weight">Nesting the Grid</h1>
	    </div>
	  </div>
	  
	  <section class="example">
		 <div class="row">
		 	<div class="twelve columns">
		 		<h3>Page Title (.twelve .columns)</h3>
		 	</div>
		 </div>
		 <div class="row">
		 	<div class="eight columns">
		 		<p>This is an eight column section, starting with this paragraph.<br />Below this you'll find another row with two section.</p>
		 		<div class="row">
		 			<div class="six columns">
		 				<img src="http://placehold.it/300x200" />
		 				<h5>Another Section (.six.columns)</h5>
		 				<p>This is a nested row with two six column sections.</p>
		 			</div>
		 			<div class="six columns">
		 				<img src="http://placehold.it/300x200" />
		 				<h5>Another Section (.six.columns)</h5>
		 				<p>This is a nested row with two six column sections.</p>
		 			</div>
		 		</div>
		 		<p>Now the nested row has been closed, and we're back to the original eight column section.</p>
		 	</div>
		 	<div class="four columns">
		 		<p>And this is a four columns section to represent a sidebar (or similar element).</p>
		 		<div class="row">
		 			<div class="three columns">
		 				<img src="http://placehold.it/64x64" />
		 			</div>
		 			<div class="nine columns">
		 				This is a callout with three columns on the left (for the avatar) and nine columns here for the text. This row is inside the four column.
		 			</div>
		 		</div>
		 		<div class="row">
		 			<div class="three columns">
		 				<img src="http://placehold.it/64x64" />
		 			</div>
		 			<div class="nine columns">
		 				This is a callout with three columns on the left (for the avatar) and nine columns here for the text. This row is inside the four column.
		 			</div>
		 		</div>
		 		<div class="row">
		 			<div class="three columns">
		 				<img src="http://placehold.it/64x64" />
		 			</div>
		 			<div class="nine columns">
		 				This is a callout with three columns on the left (for the avatar) and nine columns here for the text. This row is inside the four column.
		 			</div>
		 		</div>
		 		<div class="row">
		 			<div class="three columns">
		 				<img src="http://placehold.it/64x64" />
		 			</div>
		 			<div class="nine columns">
		 				This is a callout with three columns on the left (for the avatar) and nine columns here for the text. This row is inside the four column.
		 			</div>
		 		</div>
		 	</div>
		 </div>
	  </section>
	 </div>
	   	  
	 <div class="container">  
	   	  
	   	  
	
<?php include("includes/_footer.php");  ?>