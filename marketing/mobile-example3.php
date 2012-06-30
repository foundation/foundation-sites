<? $page_title = "Mobile Visibility" ?>
<?php include("includes/_header.php"); ?>

  <header>
    <div class="row">
      <div class="twelve columns">
        <h1>Mobile Visibility</h1>
        <h4>Foundation is designed to quickly prototype, and one thing we've found very helpful is a series of visibility classes that can be applied to turn things on and off for different device characteristics. On this page, you'll see different elements on different screen sizes or orientations.</h4>
      </div>
    </div>
  </header>

  <section id="mainContent">

	 <div class="row hide-for-small">
	  	<div class="twelve columns">
	  		<h3>Larger Interface</h3><br />
	  		<dl class="nice tabs">
	  			<dd class="active"><a href="#" class="active">Homepage</a></dd>
	  			<dd><a href="#">Secondary Page</a></dd>
	  			<dd><a href="#">Tertiary Page</a></dd>
	  		</dl>
	  	</div>
	  </div>
	  <div class="row hide-for-small">
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
	  <div class="row show-for-portrait">
	    <div class="twelve columns">
	      <h4>Longer Portrait Page</h4>
	      <p>This section only shows on a portrait orientation of a device with a larger screen than, say, a phone.</p>
	      <ul class="block-grid five-up">
	        <li><img src="http://placehold.it/400x400" /></li>
	  			<li><img src="http://placehold.it/400x400" /></li>
	  			<li><img src="http://placehold.it/400x400" /></li>
	  			<li><img src="http://placehold.it/400x400" /></li>
	  			<li><img src="http://placehold.it/400x400" /></li>
	  			<li><img src="http://placehold.it/400x400" /></li>
	      </ul>
	     </div>
	  </div>

	  <div class="row show-for-small">
	  	<div class="twelve columns">

	  		<h3>Small Interface</h3><br />
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

	  <div class="row show-for-small">
	  	<div class="twelve columns">
	  		<dl class="nice mobile tabs">
	  			<dd class="active"><a href="#" class="active">Homepage</a></dd>
	  			<dd><a href="#">Secondary Page</a></dd>
	  			<dd><a href="#">Tertiary Page</a></dd>
	  		</dl>
	  	</div>
	  </div>
  </section>




<?php include("includes/_footer.php");  ?>
