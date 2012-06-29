<? $page_title = "All Grid Sizes" ?>
<?php include("includes/_header.php"); ?>

  <style>

  	.example .row, .example .row .column, .example .row .columns { background: #eee; height: 32px; line-height: 32px; }
  	.example .row { margin-bottom: 10px; }
  	.example .row .column, .example .row .columns { background: #ccc; border: 1px solid #bbb; }

  	@media handheld, only screen and (max-width: 767px) {
		.example .row { height: auto; }
		.example .row .column, .example .row .columns { margin-bottom: 10px; }
		.example .row .column:last-child, .example .row .columns:last-child { margin-bottom: 0; }
	}

  </style>

  <header>
    <div class="row">
      <div class="twelve columns">
        <h1>All Grid Sizes</h1>
        <h4></h4>
      </div>
    </div>
  </header>

  <section id="mainContent" class="example">

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

<?php include("includes/_footer.php");  ?>
