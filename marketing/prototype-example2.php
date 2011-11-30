<? $page_title = "Social Network Prototyping Example" ?>
<?php include("includes/_header.php"); ?>
  
  <style>
  	#exampleHeader { background: #333; padding: 10px 0 8px; margin-bottom: 30px; margin-top: -50px; }
  	#exampleHeader h3 { color: #fff; }
  	#exampleHeader a { color: #fff; position: relative; top: 10px; }
  	
  	@media only screen and (max-width: 767px) {	
  		#exampleHeader { margin-top: 30px; }	
  	}
  	
  	.comments { background: #eee; padding: 10px; margin-bottom: 20px; }
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
	  <div class="row">
	    <a href="prototyping.php" class="back two columns">&larr; About Prototyping</a>
	    <hr />
	  </div>
	</div>
	  
	  <section id="exampleHeader">
	  	<div class="container">
	  		<div class="row">
	  			<div class="twelve columns">
	  				<p class="right"><a href="">Login</a></p>
	  				<h3>A Social Network</h3>
	  			</div>
	  		</div>
	  	</div>
	  </section>
	  
	<div class="container">
	  
	  <div class="row">
	  	<div class="seven columns">
	  		<div class="row mobile">
	  			<div class="two phone-one columns">
	  				<img src="http://placehold.it/200x200" />
	  			</div>
	  			<div class="ten phone-three columns">
	  				<p><strong><a href="">Jake Sully</a> said:</strong><br />Guys, check out this awesome website I found about trees. Man, I love trees. Big trees.</p>
	  				<div class="row">
	  					<div class="four phone-one columns">
	  						<img src="http://placehold.it/300x300" />
	  					</div>
	  					<div class="eight phone-three columns">
	  						<p><a href="#">Huge Trees and You: How to live in a giant tree</a><br />
	  						This is a website for people who live in gigantic trees. Learn about how to go from branch to branch, and where to keep your crazy screaming flying dragon thing.</p>
	  					</div>
	  				</div>
	  				
	  				
		  			<section class="comments">
		  				<div class="row">
		  					<div class="two phone-one columns">
		  						<img src="http://placehold.it/50x50" />
		  					</div>
		  					<div class="ten phone-three columns"><a href="">TheColonel</a> says "Don't get too comfy, I'm coming for that tree."</div>
		  				</div>
		  				<div class="row">
		  					<div class="two phone-one columns">
		  						<img src="http://placehold.it/50x50" />
		  					</div>
		  					<div class="ten phone-three columns"><a href="">Jake</a> says "You're such a tool."</div>
		  				</div>
		  			</section>
	  			</div>
	  		</div>
	  		<div class="row">
	  			<div class="two phone-one columns">
	  				<img src="http://placehold.it/200x200" />
	  			</div>
	  			<div class="ten phone-three columns">
	  				<p><strong><a href="">Jake Sully</a> said:</strong><br />Has anyone seen my wheelchair? This isn't funny guys.</p>
	  				
	  				
		  			<section class="comments">
		  				<div class="row">
		  					<div class="two phone-one columns">
		  						<img src="http://placehold.it/50x50" />
		  					</div>
		  					<div class="ten phone-three columns"><a href="">Jake</a> says "Found it. Whoever decided it'd be a fun game to kick it around with those walkers owes me a new one."</div>
		  				</div>
		  			</section>
	  			</div>
	  		</div>
	  	</div>
	  	<div class="four columns offset-by-one">
	  		<dl class="tabs">
			  <dd><a href="#recent" class="active">Recent Media</a></dd>
			  <dd><a href="#interesting">Top Media</a></dd>
			</dl>
			<ul class="tabs-content">
				<li id="recentTab" class="active">
					<h5>Photos</h5>
					<ul class="block-grid four-up">
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
					</ul>
					
					<h5>Videos</h5>
					<img src="http://placehold.it/400x300" />
					<strong><a href="#">A Sweet Video</a></strong> &bull; YouTube
				</li>
				<li id="interestingTab">
					<h5>Photos</h5>
					<ul class="block-grid four-up">
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
						<li><img src="http://placehold.it/100x100" /></li>
					</ul>
					
					<h5>Links</h5>
					<p><strong><a href="#">Huge Trees and You: How to live in a giant tree</a></strong> This is a website for people who live in gigantic trees. Learn about...</p>
				</li>
			</ul>
	  	</div>
	  </div>	  
	
	</div>
	   	  
	<div class="container">
	   	  
	
<?php include("includes/_footer.php");  ?>