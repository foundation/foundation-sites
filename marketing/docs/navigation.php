<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>
	
	<div class="row">	
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Navigation</h3>
    			<h4 class="subheader">Direct users around in style. There are navigation options for a number of situations, and everything is designed to work cross-device.</h4>
    			
    			<h4>Nav Bar</h4>
  				<p>The default top nav bar for Foundation includes the main nav options as well as hover dropdowns that support either a list of anchors or arbitrary content (even Grid content).</p>
  				
          <ul class="nav-bar">
            <li class="active"><a href="#">Nav Item 1</a></li>
            <li class="has-flyout">
              <a href="#">Nav Item 2</a>
              <a href="#" class="flyout-toggle"><span> </span></a>
              <ul class="flyout">
                <li><a href="#">Sub Nav Item 1</a></li>
                <li><a href="#">Sub Nav Item 2</a></li>
                <li><a href="#">Sub Nav 3</a></li>
                <li><a href="#">Sub Nav 4</a></li>
                <li><a href="#">Sub Nav Item 5</a></li>
              </ul>
            </li>
            <li class="has-flyout">
              <a href="#">Nav Item 3</a>
              <a href="#" class="flyout-toggle"><span> </span></a>
              <div class="flyout">
                <h5>Regular Dropdown</h5>
                <div class="row">
                  <div class="six columns">
                    <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                  </div>
                  <div class="six columns">
                    <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                  </div>
                </div>
              </div>
            </li>
            <li class="has-flyout">
              <a href="#">Nav Item 4</a>
              <a href="#" class="flyout-toggle"><span> </span></a>
              <div class="flyout large right">
                <h5>Large Dropdown</h5>
                <div class="row">
                  <div class="four columns">
                    <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                    <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                  </div>
                  <div class="four columns">
                    <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                    <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                  </div>
                  <div class="four columns">
                    <img src="http://placehold.it/200x250" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          
          <script src="https://gist.github.com/2980465.js?file=f3-nav-main.html"></script>
          
          <h5>Dropdown Lists</h5>
          <p>In the nav bar you can use a dropdown to only contain a <code>ul</code> of anchors which will act as a dropdown on hover. The individual entry includes a main link (which can lead to a top-level page) and the dropdown element. Note that dropdowns require the parent to have <code>.has-dropdown</code>.
          
          <script src="https://gist.github.com/2980469.js?file=f3-nav-dropdown-list.html"></script>
          
          <h5>Arbitrary Content Dropdowns</h5>
          <p>You can also have dropdowns with a specific size which can contain any kind of content, including rows and columns.</p>
          
          <script src="https://gist.github.com/2980479.js?file=f3-navbar-content.html"></script>
          
          <h5>Flyout Direction</h5>
          <p>Flyouts are pinned left by default, but you can pin them right in instances where they may run off the page or over other content by adding <code>.right</code> to the <code>div.flyout</code> element.
          
          <script src="https://gist.github.com/2980485.js?file=f3-navbar-right.html"></script>
  				
  				<hr />
  				
  				<h4>Vertical Nav</h4>
  				
  				<div class="row">
  				  <div class="four columns">
  				    
  				    <ul class="nav-bar vertical">
                <li class="active"><a href="#">Nav Item 1</a></li>
                <li class="has-flyout">
                  <a href="#">Nav Item 2</a>
                  <a href="#" class="flyout-toggle"><span> </span></a>
                  <ul class="flyout">
                    <li><a href="#">Sub Nav Item 1</a></li>
                    <li><a href="#">Sub Nav Item 2</a></li>
                    <li><a href="#">Sub Nav 3</a></li>
                    <li><a href="#">Sub Nav 4</a></li>
                    <li><a href="#">Sub Nav Item 5</a></li>
                  </ul>
                </li>
                <li class="has-flyout">
                  <a href="#">Nav Item 3</a>
                  <a href="#" class="flyout-toggle"><span> </span></a>
                  <div class="flyout">
                    <h5>Regular Dropdown</h5>
                    <div class="row">
                      <div class="six columns">
                        <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                      </div>
                      <div class="six columns">
                        <p>This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text. This is example text.</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <a href="#">Nav Item 4</a>
                </li>
              </ul>
  				    
  				  </div>
  				  <div class="eight columns">
  				    <p>The same nav bar seen above, with the same structure, can be made a vertical nav bar which still supports flyout content by adding a class of <code>.vertical</code> to the element. This is ideal for sidebar navigation, and is very similar to the vertical tabs seen on the Tabs documentation page.</p>
  				  </div>
  				</div> 
  				
  				<hr />
  				
  				<h4>Side Nav</h4>
  				<p>Side nav, like you'll see on the Foundation main site, is useful for sections either of a site or of the page.</p>
  				
          <ul class="side-nav">
            <li class="active"><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li class="divider"></li>
            <li><a href="#">Link 3</a></li>
            <li><a href="#">Link 4</a></li>
          </ul>
          
          <script src="https://gist.github.com/2990787.js?file=f3-side-nav.html"></script>
  				
  				<hr />
  				
  				<h4>Sub Nav</h4>
  				<p>This simple subnav is great for moving between different states of a page. We use these frequently to show iterations of something, typically by date, but they're also handy for these like filters.</p>
  				
          <dl class="sub-nav">
          	<dt>Filter:</dt>
          	<dd class="active"><a href="#">All</a></dd>
          	<dd><a href="#">Active</a></dd>
          	<dd><a href="#">Pending</a></dd>
          	<dd><a href="#">Suspended</a></dd>
          </dl>   	
		      
		      <script src="https://gist.github.com/2980502.js?file=f3-subnav.html"></script>
		      
		      <hr />
		      
		      <h4>Pagination</h4>
		      <p>Moving between pages has become less common with the advent of longer pages, and AJAX loading, but it can still be useful for long repetitive listings or content.</p>
		      
          <ul class="pagination">
          	<li class="arrow unavailable"><a href="">&laquo;</a></li>
          	<li class="current"><a href="">1</a></li>
          	<li><a href="">2</a></li>
          	<li><a href="">3</a></li>
          	<li><a href="">4</a></li>
          	<li class="unavailable"><a href="">&hellip;</a></li>
          	<li><a href="">12</a></li>
          	<li><a href="">13</a></li>
          	<li class="arrow"><a href="">&raquo;</a></li>
          </ul>
          
          <script src="https://gist.github.com/2980509.js?file=f3-pagination.html"></script>
		      
		      		
    			
    		</div>
    		<div class="four columns">
    		  <? include("includes/_download.php"); ?>
    		</div>
      </div>
		</section>
		
		<section id="sidebar" role="complementary">
			
			<dl class="tabs vertical hide-on-phones">
				<dd><a href="index.php">Getting Started</a></dd>
				<dd><a href="installing.php">Installing</a></dd>
				<dd><a href="grid.php">The Grid</a></dd>
				<dd><a href="typography.php">Typography</a></dd>
				<dd><a href="buttons.php">Buttons</a></dd>
				<dd><a href="forms.php">Forms</a></dd>
				<dd class="active"><a href="navigation.php">Navigation</a></dd>
				<dd><a href="tabs.php">Tabs</a></dd>
				<dd><a href="elements.php">Elements</a></dd>
				<dd><a href="orbit.php">Orbit</a></dd>
				<dd><a href="reveal.php">Reveal</a></dd>
				<dd><a href="support.php">Support</a></dd>
			</dl>
			
		</section>
	</div>
		
		
<?php include("includes/_documentation_foot.php");  ?>