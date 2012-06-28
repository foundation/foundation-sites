<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_header.php"); ?>
  
  <header>
    <div class="row">
      <div class="twelve columns">
        <h1>Case Studies</h1>
        <h4>How people are using Foundation to build responsive, future-friendly sites.</h4>
      </div>
    </div>
  </header>
  
  <section id="mainContent">
  
    <div class="row">
      
      <div class="ten columns push-two">
        <div class="row">
          <div class="six columns">
            <p class="show-for-small"><a href="index.php">&larr; Back to Home</a></p>
            <h2>ZURBsoapbox</h2>
            <h4 class="subheader">Rapidly launching and iterating for our audience.</h4>
            <p>ZURBsoapbox is a speaking series we host at ZURB HQ, where we invite influential entrepreneurs, designers, and other tech types to come and share their experiences.</p>
            <p>We launched <a href="http://www.zurbsoapbox.com">ZURBsoapbox</a>, the first site built with Foundation, in order to raise engagement and create a resource for anyone who can't attend in person. <strong>Here's some of the highlights.</strong></p>
            
            <h4>Instant Mobile Site</h4>
            <p>Thanks to Foundation's <a href="docs/grid.php">built-in responsive grid</a>, as soon as we put together the desktop prototype we already had a working mobile prototype, ready for tablets, phones and other devices.</p>              
          </div>
          <div class="six columns">
            <img src="images/case-soapbox-1.jpg" id="sideDeviceDesktop" />
          </div>
        </div>
      
        <div class="row">
          <div class="six columns push-six"> 
            <h4>Device-Specific Function</h4>
            <p>Mobile devices can't handle our standard flash audio player, so we used <a href="docs/layout.php">Foundation's mobile visibility classes</a> to selectively hide the flash element, and show a mobile-friendly audio file link.</p>
            
            <h4>Next Steps: Images</h4>
            <p>We practice what we preach, and we're always iterating on Foundation-based sites. Our next step is to implement a more mobile-friendly image solution, so devices don't have to load quite as much data. There's a lot of good work going on in this area, but also a lot to figure out.</p>
          </div>
          <div class="six columns pull-six">
            <img src="images/case-soapbox-2.jpg" />
          </div>
        </div>        
        
      </div>
      <div class="two columns pull-ten">
        <ul class="side-nav">
          <li><a href="index.php">&larr; Home</a></li>
          <li class="divider"></li>
          <li><a href="case-flite.php">Flite</a></li>
          <li><a href="case-swizzle.php">Swizzle</a></li>
          <li class="active"><a href="case-soapbox.php">ZURBsoapbox</a></li>
          <li><a href="case-reel.php">Reel</a></li>
          <li><a href="case-zurbjobs.php">ZURBjobs</a></li>
        </ul>
      </div>
    </div>
  
  </section>  
  	
<?php include("includes/_footer.php");  ?>
