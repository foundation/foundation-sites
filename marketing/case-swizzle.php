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
      <div class="two columns">
        <ul class="side-nav">
          <li><a href="index.php">&larr; Home</a></li>
          <li class="divider"></li>
          <li><a href="case-flite.php">Flite</a></li>
          <li class="active"><a href="case-swizzle.php">Swizzle</a></li>
          <li><a href="case-soapbox.php">ZURBsoapbox</a></li>
          <li><a href="case-reel.php">Reel</a></li>
          <li><a href="case-zurbjobs.php">ZURBjobs</a></li>
        </ul>
      </div>
      
      <div class="ten columns">
        <div class="row">
          <div class="six columns">
            <h2>Swizzle</h2>
            <h4 class="subheader">Beautiful and Built in the Browser</h4>
            
            <p>We were thrilled to see this site for Swizzle, an online service and design studio in Canada. Built on Foundation, it's not only beautiful, but scales in incredibly smart ways. <a href="http://www.getswizzle.com">Check it out</a> on your desktop or mobile device to see what we mean, or read below what Laura Hutchinson from Swizzle said about how Foundation helped and what they have in store next.</p>
            
            <h4>Built in the Browser</h4>
            <p>Using Foundation, we were able to quickly implement the desktop and mobile site. It was easy to setup the shell how we wanted because the overall width is customizable, and it was fun to experiment with different layouts on the fly using the built-in responsive grid.</p>               
          </div>
          <div class="six columns">
            <img src="images/case-swizzle-1.jpg" id="sideDeviceiPad" />
          </div>
        </div>
      
        <div class="row">
          <div class="six columns">
            <img src="images/case-swizzle-2.jpg" />
          </div>
          <div class="six columns"> 
            <h4>Device-Specific Navigation</h4>
            <p>We used Foundation's mobile visibility classes to hide the top navigation from mobile devices, and replace it with a menu link (the menu link is hidden from desktops with the visibility classes too). The link anchors to the footer navigation, which uses a bit of CSS to change the layout.</p>
            <h4>Next Steps: Client Friendly</h4>
            <p>What's next is to switch our client portal over to using Foundation. We've got lots of forms in our client portal, and until now they've been a real headache to style. We're also going to use <a href="docs/reveal.php">Reveal</a> for some great interactive features.</p>
          </div>
        </div>        
        
      </div>
    </div>
  
  </section>  
  	
<?php include("includes/_footer.php");  ?>
