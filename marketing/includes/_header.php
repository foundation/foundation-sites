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
  <!-- For third-generation iPad with high-resolution Retina display: -->
  <link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/favicons/apple-touch-icon-144x144-precomposed.png">
  <!-- For iPhone with high-resolution Retina display: -->
  <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/favicons/apple-touch-icon-114x114-precomposed.png">
  <!-- For first- and second-generation iPad: -->
  <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/favicons/apple-touch-icon-72x72-precomposed.png">
  <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->
  <link rel="apple-touch-icon-precomposed" href="images/favicons/apple-touch-icon-precomposed.png">
  <!-- For non-Retina iPhone, iPod Touch, and Android 2.1+ devices: -->

  <link rel="icon" href="images/favicons/favicon.ico" type="image/x-icon" />

  <meta name="keywords" content="design strategy, interaction design, design thinking, zurb, design" />
  <meta name="description" content="ZURB, creating unique customer and user experiences. We are brand engineers that provide companies with strategic marketing, design and branding solutions.  Work includes identity, branding, information design, web design, illustration, software design, icon design, and multimedia work." />
  <meta name="author" content="ZURB, inc. ZURB network also includes zurb.com" />
  <meta name="copyright" content="ZURB, inc. Copyright (c) 2012" />

	<title>Foundation: <?= $page_title ?></title>
  <meta name="description" content="Foundation is an easy to use, powerful, and flexible framework for building rapid prototypes and production code on any kind of device." />

	<!-- Included CSS Files -->
  <link rel="stylesheet" href="http://www.zurb.com/assets/foundation.top-bar.css">
  <link rel="stylesheet" href="http://www.zurb.com/assets/zurb.mega-drop.css">
	<link rel="stylesheet" href="stylesheets/presentation.css">


	<!--[if lt IE 9]>
		<link rel="stylesheet" href="stylesheets/ie.css">
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
        <li class="show-for-small">
          <a href="#">Home</a>
        </li>
  			<li>
  			  <a href="grid.php" <?php if (isset($featuresTab)) echo 'class="current"'; ?>>Features</a>
  			</li>
  			<li>
  			  <a href="case-flite.php" <?php if (isset($caseStudiesTab)) echo 'class="current"'; ?>>Case Studies</a>
  			</li>
  			<li>
  			  <a href="docs">Documentation</a>
  			</li>
  		  <li>
  		    <a href="http://github.com/zurb/foundation">GitHub</a>
  			</li>
  			<li class="download"><a class="small blue nice button src-download" href="download.php">Download</a></li>
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
