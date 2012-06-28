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
          <li><a href="case-swizzle.php">Swizzle</a></li>
          <li><a href="case-soapbox.php">ZURBsoapbox</a></li>
          <li class="active"><a href="case-reel.php">Reel</a></li>
          <li><a href="case-zurbjobs.php">ZURBjobs</a></li>
        </ul>
      </div>
      
      <div class="ten columns">
        <div class="row">
          <div class="six columns">
            <h2>Reeling in Feedback</h2>
            <h4 class="subheader">Powerpoint sucks, especially online.</h4>
            <p><a href="http://reelapp.com">Reel</a> is a little app we built to help people post mockups, sketches, wireframes, and entire presos (PDF or PPT). They can get quick "thumbs up or down" feedback. But it wasn't enough to just show slides, we wanted to be able to view the preso, give feedback, and review feedback on any device.</p>
            
            <h4>Identical Templates</h4>
            <p>The slideshow view uses the same HTML templates across all devices, but what the user sees differs pretty substantially between desktop and mobile. We used Foundation's media queries built into mobile.css to seamlessly show the right content for each device.</p>
            
            <h4>Easy Organization</h4>
            <p>We used the grid to easily organize content without needing to set custom positions for each block. Using the "centered" class in particular for those high-impact center blocks helped keep the markup simple.</p>
            
          </div>
          <div class="six columns">
            <img src="images/case-reel-1.jpg" id="sideDeviceDesktop" />
          </div>
        </div>
      
        <div class="row">
          <div class="twelve columns">
            <h4>Next Steps: Influence</h4>
        <p>That's not all &mdash; we're just getting started. We're working on Reel's big brother, a new app called Influence (also based on Foundation) that will include private presos, letting viewers add their own notes, and more! It's in private bet, so stay tuned&hellip;</p>
          </div>
        </div>
            
     
       </div>
    </div>
  
  </section>  
  	
<?php include("includes/_footer.php");  ?>
