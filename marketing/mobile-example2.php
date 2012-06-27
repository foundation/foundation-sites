<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_header.php"); ?>
  
  
  
  <header>
    <div class="row">
      <div class="twelve columns">
        <h1>Mobile Navigation</h1>
        <h4>There are several mobile-specific styles available to manage navigation. By using Foundation's tab structure you can not only create a tabbed interface, you can restyle those tabs into mobile nav blocks by simply adding a class of 'mobile'.</h4>
      </div>
    </div>
  </header>
  
  <section id="mainContent" class="example">
	  <br/>
	  <br/>
	  <div class="row">
	  	<div class="six columns">
	  		<dl class="nice mobile tabs">
	  			<dd class="active"><a href="#" class="active">Llamas</a></dd>
	  			<dd><a href="#">Alpacas</a></dd>
	  			<dd><a href="#">Vicunas</a></dd>
	  			<dd><a href="#">Other</a></dd>
	  		</dl>
	  		<p>You can also use standard tabs on mobile devices, including the built-in tab switching javascript that comes with Foundation. Check out the <a href="docs/tabs.php">tabs documentation</a> for examples of how that works.</p>
	  		
	  	</div>
	  	<div class="six columns">
	  	
	  		<dl class="nice tabs">
	  			<dd class="active"><a href="#" class="active">Llamas</a></dd>
	  			<dd><a href="#">Alpacas</a></dd>
	  			<dd><a href="#">Vicunas</a></dd>
	  			<dd class="hide-on-phones"><a href="#">Other</a></dd>
	  		</dl>
	  		<p>This tab block will continue to look like tabs on any kind of device. Through the use of mobile visibility classes you can easily place nav blocks on top of the page for desktops, and at the bottom for phones.</p>
	  	</div>	 
	  	
  </section>  
  	
<?php include("includes/_footer.php");  ?>
