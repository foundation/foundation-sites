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
        <h1>Nesting the Grid</h1>
        <h4></h4>
      </div>
    </div>
  </header>
  
  <section id="mainContent" class="example">
  
		  <div class="row">
		 	<div class="twelve columns">
		 		<h3>Page Title (.twelve .columns)</h3>
		 	</div>
		 </div>
		 <div class="row">
		 	<div class="eight columns">
		 		<p>This is an eight column section, starting with this paragraph.<br />Below this you'll find another row with two sections.</p>
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
  	
<?php include("includes/_footer.php");  ?>
