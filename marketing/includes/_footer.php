  <footer class="row">
    <section class="five columns">
      <h6><strong>Made by ZURB</strong></h6>
      <p>Foundation is made by <a href="http://www.zurb.com/">ZURB</a>, a product design agency in Campbell, California. We've put more than 14 years of experience building web products, services and websites into this framework. <a href="../about.php">Foundation Info and Goodies &rarr;</a></p>
    </section>
    
    <section class="three columns">
      <h6><strong>Using Foundation?</strong></h6>
      <p>Let us know how you're using Foundation and we might feature you as an example!<br /><a href="mailto:foundation@zurb.com?subject=I'm%20using%20Foundation">Get in touch &rarr;</a></p>
    </section>
    
    <section class="four columns">
      <h6><strong>Need some help?</strong></h6>
      <p>For answers or help visit the <a href="docs/support.php">Support page</a>.</p>
    
      <ul class="link-list">
      	<li>
    	    <a href="http://www.facebook.com/sharer.php?u=http%3A%2F%2Ffoundation.zurb.com%2F&t=Foundation%20from%20ZURB" target="_blank"><span class="glyph social">d</span></a>
    		</li>
    		<li>
          <a href="https://plusone.google.com/_/+1/confirm?url=http://foundation.zurb.com&title=Foundation%20from%20ZURB" target="_blank"><span class="glyph social">l</span></a>
    		</li>
    		<li>
    			<a href="http://www.twitter.com/share?url=http://foundation.zurb.com/" target="_blank"><span class="glyph social">e</span></a>
    		</li>
    	</ul>
      
    </section>
  </footer>
  
  <div id="copyright">
    <div class="row">
      <div class="four columns">
        <p>Site content &copy; 2012 ZURB, inc.</p>
      </div>
      <div class="eight columns">
        <ul class="link-list right">
          <li><a href="index.php">Home</a></li>
          <li><a href="download.php">Download</a></li>
          <li><a href="docs/index.php">Documentation</a></li>
          <li><a href="docs/install.php">Install</a></li>
          <li><a href="about.php">About</a></li>
          <li><a href="http://feeds.feedburner.com/zurb/blog">Subscribe to the ZURBlog</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <script src="javascripts/foundation/jquery.min.js"></script>
	<script src="javascripts/foundation/modernizr.foundation.js"></script>
	<script src="jswipe.js"></script>
	<script src="javascripts/foundation/jquery.reveal.js"></script>
	<script src="javascripts/foundation/jquery.orbit-1.4.0.js"></script>
	<script src="javascripts/foundation/jquery.customforms.js"></script>
	<script src="javascripts/foundation/jquery.placeholder.min.js"></script>
	<script src="javascripts/foundation/jquery.tooltips.js"></script>
	<script src="javascripts/foundation/app.js"></script>
	<script src="swipe.js"></script>
	<script src="github.js"></script>
	<script src="http://www.zurb.com/assets/zurb.mega-drop.js"></script>

  <script> 

    var _gaq = _gaq || [];
  	_gaq.push(
  	  ['_setAccount', 'UA-2195009-2'],
  	  ['_trackPageview'],
  	  ['b._setAccount', 'UA-2195009-27'],
  	  ['b._trackPageview'] 
  	);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();

		$(document).on('click', '.src-download', function (event) {
			_gaq.push(['_trackEvent', 'Foundation', 'Downloaded']);
		});
  </script>
</body>
</html>