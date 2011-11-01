<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_header.php"); ?>

  <!-- Grid BG -->
  <div id="gridBg" class="container">
    <div class="row">
      <div class="one columns"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div><div class="one columns hide-on-phones"></div>
    </div>
  </div>
  <!-- /Grid BG -->
  
  <!-- Header -->
	<div class="container">
		<div class="row">
		  <header class="twelve columns">
		    <h1>Foundation</h1>
  		  	<h2>An easy to use, powerful, and flexible framework for building prototypes and production code on any kind of device. <strong>Start here, build everywhere.</strong></h2>
  		  	<a id="mainDownload" href="files/foundation-download.zip" class="nice blue button src-download">Download Foundation 2.0<br><small>Boilerplate &bull; CSS &bull; JS &bull; Plugins</small><img src="images/homepage-yeti.png" class="show-on-desktops" /></a>
  		  	<p><a href="docs/">View the Documentation &raquo;</a><a href="http://github.com/zurb/foundation">View on Github &raquo;</a></p>
    		<img src="images/devices-awesomeness.png" alt="Foundation works on any device!">
		  </header>
		</div>
	</div>
	<!-- /Header -->
	
	<!-- Main Container -->
	<div id="main" class="container">
	  <!-- Update Bar -->
	  <div class="row">
	    <section id="updates" class="twelve columns">
        <div class="row">
          <div class="two columns">
            <h6>Latest Update</h6>
            <time id="latestCommitTime">Loading...</time>
            <a href="github-mac://openRepo/https://github.com/zurb/foundation" class="nice small white button">Clone Now</a>
          </div>
          <article class="seven columns">
            <dl>
              <dt id="latestVersion">Loading...</dt>
              <dd id="latestCommitMessage">Loading...</dd>
            </dl>
            <a id="latestCommitURL" href="https://github.com/zurb/foundation">Loading...</a>
          </article>
          <aside class="three columns">
            <a href="docs/">View the Documentation &raquo;</a>
            <a href="files/foundation-download.zip">Download Foundation 2.0.3 &raquo;</a>
          </aside>
        </div>
	    </section>
	  </div>
	  <!-- /Update Bar -->
	  
	  <!-- Value Props -->
	  <section id="valueProps" class="row">
	    <article class="four columns">
	      <h4 id="grid"><a href="grid.php">Flexible Grid</a></h4>
	      <p>The Grid lets you lay out pages quickly and logically with a flexible, nestable system. Even better, the Grid can be whatever size you need &mdash; it's easily adapted to any size screens, from phones to TVs.</p>
	    </article>
	    <article class="four columns">
	      <h4 id="ui"><a href="prototyping.php">Rapid Prototyping</a></h4>
	      <p>Foundation includes dozens of styles and elements to help you quickly put together clickable prototypes, that can then be adapted and styled into polished production code. Forms, buttons, tabs, all kinds of good stuff.</p>
	    </article>
	    <article class="four columns">
	      <h4 id="mobile"><a href="mobile.php">Mobility</a></h4>
	      <p>The Grid lets you quickly put together page layouts for mobile devices and the desktop. You don't need two different sites &mdash; the Grid is built to create a rock-solid experience on all kinds of devices with the exact same markup.</p>
	    </article>
	  </section>
	  <!-- /Value Props -->
	  
	  <!-- Who's Using Foundation? -->
	  <section id="logos" class="row">
	    <article class="twelve columns">
	      <h4>Sites Using Foundation</h4>
	      <ul>
	        <li class="hide-on-phones"><a href="http://www.rcskids.org" target="_blank"><img src="images/logo-rcs.png" alt="Rebekah Children's Services" /></a></li>
	        <li class="show-on-phones"><a href="http://www.rcskids.org" target="_blank"><img src="images/logo-rcs-alt.png" alt="Rebekah Children's Services" /></a></li>
	        <li><a href="http://dynamo.dictionary.com/" target="_blank"><img src="images/logo-dynamo.png" alt="Dictionary.com Word Dynamo" /></a></li>
	        <li><a href="http://www.reelapp.com" target="_blank"><img src="images/logo-reel.png" alt="Reel" /></a></li>
	        <li><a href="http://www.zurb.com/soapbox" target="_blank"><img src="images/logo-soapbox.png" alt="ZURBsoapbox" /></a></li>
	      </ul>
	    </article>
	  </section>
	  <!-- /Who's Using -->
	  
	  <!-- Case Studies > Desktop -->
	  <section id="caseStudies" class="row hide-on-phones">
	    <article class="twelve columns">
	      <div class="row">
	        <div class="twelve columns">
	          <h4>Case Studies</h4>
	        </div>
	      </div>
	      <div id="featured"> 
          <div class="content">
            <a href="case-soapbox.php"><img src="images/img-soapbox.jpg" alt="ZURBsoapbox" /></a>
            <h3><a href="case-soapbox.php">ZURBsoapbox</a></h3>
            <div class="row">
            	<p>At ZURB we host all kinds of entrepreneurs, designers and product builders at short lunch presos we call ZURBsoapbox. In order to bring Soapbox to a larger audience, and keep our friends and attendees involved, we rapidly built out zurbsoapbox.com.</p>
            	<p>Foundation allowed us to not only quickly prototype but also iterate on it, modify it for mobile, and launch it in record time. Check out some of the pieces we used from Foundation by viewing the <a href="case-soapbox.php">case study &rarr;</a></p>
            </div>
            
          </div>
          <div class="content">
            <a href="case-foundation.php"><img src="images/img-foundation.jpg" alt="Foundation Marketing Site" /></a>
            <h3><a href="case-foundation.php">Foundation</a></h3>
            <p>Pretty meta, right? We built this site using Foundation and learned a few neat tricks along the way.</p><p>You can view the case study to see some of the cooler things going on behind the scenes, as well as grab the entire marketing site and source by checking out the project on Github. <a href="case-foundation.php">View the Case Study &rarr;</a></p>
          </div>
          <div class="content">
            <a href="case-reel.php"><img src="images/img-reel.jpg" alt="Reel: Online presos with feedback" /></a>
            <h3><a href="case-reel.php">Reel</a></h3>
            <p>Reel is a little app we built to let people upload, get feedback on, and review presos or mockups. It wasn't enough to just show slides, we wanted an app that worked on any kind of device, and Foundation was the tool we used to build it.</p>
            <p>Check out this quick case study to see some of the things we did with Foundation to make Reel as awesome as possible. <a href="case-reel.php">View the Case Study &rarr;</a></p>
          </div>
        </div>
	    </article>
	  </section>
	  <!-- /Case Studies > Desktop -->
	  
	  <!-- Case Studies Mobile -->	  
	  <section id="swipeArea" class="row show-on-phones">
      <div class="twelve columns">
        <h5>Case Studies <!-- <small>Swipe to see more</small> --></h5>
      </div>
	    <ul class="twelve columns" id="swipeMeParent">
	      <li id="swipeme1">
	        <a href="case-soapbox.php"><img src="images/mobileimg-soapbox.jpg" alt="Soapbox" /></a>
          <h3><a href="case-soapbox.php">ZURBsoapbox</a></h3>
          <p>At ZURB we host all kinds of entrepreneurs, designers and product builders at short lunch presos we call ZURBsoapbox. In order to bring Soapbox to a larger audience, we rapidly built out zurbsoapbox.com.</p>
            <p>Foundation allowed us to not only quickly prototype but also iterate on it, modify it for mobile, and launch it in record time. <a href="case-soapbox.php">View the Case Study &rarr;</a></p>
	      </li>
	      <li id="swipeme2">
	        <a href="case-foundation.php"><img src="images/mobileimg-foundation.jpg" alt="Foundation" /></a>
          <h3><a href="case-foundation.php">Foundation</a></h3>
          <p>Pretty meta, right? We built this site using Foundation and learned a few neat tricks along the way.</p><p>You can view the case study to see some of the cooler things going on behind the scenes, as well as grab the entire marketing site and source by checking out the project on Github. <a href="case-foundation.php">View the Case Study &rarr;</a></p>
	      </li>
	       <li id="swipeme3">
	        <a href="case-reel.php"><img src="images/mobileimg-reel.jpg" alt="Reel" /></a>
          <h3><a href="case-reel.php">Reel</a></h3>
          <p>Reel is a little app we built to let people upload, get feedback on, and review presos or mockups. It wasn't enough to just show slides, we wanted an app that worked on any kind of device, and Foundation was the tool we used to build it.<br /><a href="case-reel.php">View the Case Study &rarr;</a></p>
	      </li>
	    </ul>
	  </section>
	  <!-- /Case Studies Mobile -->
	
<?php include("includes/_footer.php");  ?>
