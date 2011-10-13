<!DOCTYPE html>	

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <html class="ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8" />
	
	<!-- Set the viewport width to device width for mobile -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<title>Foundation: <?= $page_title ?></title>
  
  
	<!-- Included CSS Files -->
	<link rel="stylesheet" type="text/css" href="src/stylesheets/globals.css">
	<link rel="stylesheet" type="text/css" href="src/stylesheets/ui.css">
	<link rel="stylesheet" type="text/css" href="src/stylesheets/forms.css">
	<link rel="stylesheet" type="text/css" href="src/stylesheets/orbit.css">
	<link rel="stylesheet" type="text/css" href="src/stylesheets/reveal.css">
	<link rel="stylesheet" type="text/css" href="src/stylesheets/app.css">
	<link rel="stylesheet" type="text/css" href="src/stylesheets/mobile.css">
	<link rel="stylesheet" type="text/css" href="presentation.css">
	
	<!--[if lt IE 9]>
		<link rel="stylesheet" type="text/css" href="src/stylesheets/ie.css">
	<![endif]-->
	
	<!-- IE Fix for HTML5 Tags -->
	<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<script src="src/javascripts/jquery-1.5.1.min.js"></script>
	<script src="jswipe.js"></script>
	<script src="src/javascripts/jquery.reveal.js"></script>
	<script src="src/javascripts/jquery.orbit-1.3.0.js"></script>
	<script src="src/javascripts/forms.jquery.js"></script>
	<script src="src/javascripts/jquery.customforms.js"></script>
	<script src="src/javascripts/app.js"></script>
	<script src="src/javascripts/mobile.js"></script>
	<script src="swipe.js"></script>
  
  
  <script type="text/javascript">
  $(window).load(function() {
     $('#featured').orbit({
       animation: 'fade',
       animationSpeed: 800,
       timer: true,
       advanceSpeed: 12000,
       captionAnimation: "fade",
       captionAnimationSpeed: 800
     });
  });
  </script>


</head>
<body>

	  
  <!-- ZURBar -->
  <div id="zurBar" class="container">
    <div class="row">
      <div class="four columns">
        <h1><a href="index.php">Foundation</a></h1>
      </div>
      <div class="eight columns hide-on-phones">
      	<strong class="right">
      		<a href="grid.php">Features</a>
      		<a href="case-soapbox.php">Case Studies</a>
      		<a href="docs/">Documentation</a>
      		<a href="http://github.com/zurb/foundation">Github</a>
      		<a href="files/foundation-090611-beta.zip" class="small blue nice button">Download</a>
      		
      	</strong>
      </div>
      <!--
<div class="two columns">
        <h2 class="right"><a href="http://www.zurb.com">by ZURB</a></h2>
      </div>
-->
    </div>
  </div>
  <!-- /ZURBar -->