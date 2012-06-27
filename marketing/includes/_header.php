<? 
  $version = "2.2.1"; 
?>
<!DOCTYPE html>	

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	
	<!-- Set the viewport width to device width for mobile -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<meta name="description" content="Foundation is an easy to use, powerful, and flexible framework for building rapid prototypes and production code on any kind of device." />
	
	<title>Foundation: <?= $page_title ?></title>
	<link rel="apple-touch-icon" href="apple-touch-icon.png" />
	<link rel="icon" type="image/ico" href="favicon.ico">
  
	<!-- Included CSS Files -->
	<?php if (true) {?>
	  <link rel="stylesheet" href="stylesheets/presentation.css">
	  <link rel="stylesheet" href="http://www.zurb.com/assets/foundation.top-bar.css">
    <link rel="stylesheet" href="http://www.zurb.com/assets/zurb.mega-drop.css">
	<?php } else {?>
	<link rel="stylesheet" href="../stylesheets/globals.css">
	<link rel="stylesheet" href="../stylesheets/typography.css">
	<link rel="stylesheet" href="../stylesheets/grid.css">
	<link rel="stylesheet" href="../stylesheets/ui.css">
	<link rel="stylesheet" href="../stylesheets/forms.css">
	<link rel="stylesheet" href="../stylesheets/orbit.css">
	<link rel="stylesheet" href="../stylesheets/reveal.css">
	<link rel="stylesheet" href="../stylesheets/app.css">
	<link rel="stylesheet" href="../stylesheets/mobile.css">
	<?php }?>

	
	<!--[if lt IE 9]>
		<link rel="stylesheet" href="../stylesheets/ie.css">
	<![endif]-->
	
	<!-- IE Fix for HTML5 Tags -->
	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>

	  
  <!-- ZURBar -->
  <div class="container top-bar home-border">
    <div class="attached">
      <div class="name" onclick="void(0);">
        <span><a href="http://foundation.zurb.com">Foundation</a> <a href="#" class="toggle-nav"></a></span>
  		</div>

  		<ul class="right">			
  			<li>
  			  <a href="grid.php" <?php if (isset($featuresTab)) echo 'class="current"'; ?>>Features</a>
  			</li>			
  			<li>
  			  <a href="case-soapbox.php" <?php if (isset($caseStudiesTab)) echo 'class="current"'; ?>>Case Studies</a>
  			</li>
  			<li>
  			  <a href="docs">Documentation</a>
  			</li>
  		  <li>
  		    <a href="http://github.com/zurb/foundation">GitHub</a>
  			</li>
  			<li class="download"><a class="small blue nice button src-download" href="files/foundation-download-2.2.1.zip">Download</a></li>
  		</ul>
  	</div>
  </div>

  <!-- INSERT MEGA DROP DOWN HERE -->
  <?php
  $megadropfile = 'cache/navigation_bar.html';

  if (file_exists($megadropfile)) {
      include $megadropfile;
  }
  ?>

  <!-- /ZURBar -->
