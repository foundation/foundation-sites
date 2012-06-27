<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_header.php"); ?>
  <style>
  
  	.example .row, .example .row .column, .example .row .columns { background: #f4f4f4; }
  	.example .row { margin-bottom: 10px; }
  	.example .row .column, .example .row .columns { background: #eee; border: 1px solid #ddd; }
  	
  	@media handheld, only screen and (max-width: 767px) {
  		.example .row { height: auto; }
  		.example .row .column, .example .row .columns { margin-bottom: 10px; }
  		.example .row .column:last-child, .example .row .columns:last-child { margin-bottom: 0; }
    }
  
  </style>
  
  <header>
    <div class="row">
      <div class="twelve columns">
        <h1>Mobile Grids</h1>
        <h4></h4>
      </div>
    </div>
  </header>
  
  <section id="mainContent" class="example">
  
		  <div class="row">
		 	<div class="twelve columns">
		 		<h3>On phones, columns become stacked.</h3>
		 		<p>That means this twelve column section will be the full width, and so will the three sections you see below.</p>
		 	</div>
		 </div>
		 <div class="row">
		 	<div class="four columns">
		 		<h5>Section 1</h5>
		 		<img src="http://placehold.it/300x100" />
		 		<p>This is a four column section (so three of them across to add up to twelve. As noted above on mobile these columns will be stacked on top of each other.</p>
		 	</div>
		 	<div class="four columns">
		 		<h5>Section 2</h5>
		 		<img src="http://placehold.it/300x100" />
		 		<p>This is another four column section which will be stacked on top of the others. The next section though...</p>
		 	</div>
		 	<div class="four columns">
		 		<h5>Section 3</h5>
		 		<p>Here we've used a block grid (.block-grid.three-up). These are perfect for similarly sized elements that you want to present in a grid even on mobile devices. If you view this on a phone (or small browser window) you can see what we mean.</p>
		 		<ul class="block-grid three-up">
		 			<li>
		 				<img src="http://placehold.it/128x128" />
		 			</li>
		 			<li>
		 				<img src="http://placehold.it/128x128" />
		 			</li>
		 			<li>
		 				<img src="http://placehold.it/128x128" />
		 			</li>
		 			<li>
		 				<img src="http://placehold.it/128x128" />
		 			</li>
		 			<li>
		 				<img src="http://placehold.it/128x128" />
		 			</li>
		 			<li>
		 				<img src="http://placehold.it/128x128" />
		 			</li>
		 		</ul>
		 	</div>
		 </div>
  
  </section>  
  	
<?php include("includes/_footer.php");  ?>
