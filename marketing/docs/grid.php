<? $page_title = "The Grid" ?>
<?php include("includes/_documentation_head.php"); ?>
	
	<div class="container">
		<div class="row">
			<div class="twelve columns">
				<div class="foundation-header">
					<h1><a href="index.php">Foundation Docs</a></h1>
					<h4 class="subheader">Rapid prototyping and building library from ZURB.</h4>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="two columns">
				<dl class="nice tabs vertical hide-on-phones">
					<dd><a href="index.php">Getting Started</a></dd>
					<dd><a href="grid.php" class="active">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="gems.php">Gems</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
			<div class="six columns">
				<h3>The Grid</h3>
				<h4 class="subheader">The Grid lets you quickly put together page layouts for mobile devices and the desktop. You don't need two different sites - the Grid is built to create a rock-solid experience on all kinds of devices with the exact same markup.</h4>
				
				<hr />
				
				<h4>The Basics</h4>
				<p>The grid is built around three key elements: containers, rows, and columns. Containers create base padding for the page; rows create a max-width and contain the columns; and columns create the final structure. Everything on your page that you don't give a specific structural style to should be within a container, row and column.</p>
				
				<p>What you need to know is that <strong>columns don't have a fixed width:</strong> they can vary based on the resolution of the screen, or the size of the window (try scaling down this window to see what we mean). Design with that in mind.</p>
				<script src="http://snipt.net/embed/3b3c66062f90d4cdf9d5e1f7b61c8ce8"></script>
				
				<hr />
				
				<h4>Nesting Support</h4>
				<p>In the Grid you can nest columns down as far as you'd like. Just embed rows inside columns and go from there. Each embedded row can contain up to 12 columns.</p>
				<script src="http://snipt.net/embed/00599221b2f133b974b012dbe0ed001e"></script>
				
				<hr />
				
				<h4>Examples</h4>
				<p>Take this page for example - we've set up this page by containing this section in eight columns, and the sidebar in four. When the screen is larger than iPad resolution you'll see them laid out normally - smaller than that and columns become 100% width objects for mobile devices.</p>

				<p>Below you can see how the rows and columns come together. All columns are inside a row and for this we've colored the rows and columns for visibility. You can also see how nesting works - this example is inside an eight column container, but below we have all 12 columns to use. You can nest them down quite a ways before the percentage widths become absurdly small.</p>
				
				<div class="row display">
					<div class="four columns">
						.four.columns				
					</div>
					<div class="four columns">
						.four.columns				
					</div>
					<div class="four columns">
						.four.columns				
					</div>
				</div>
				<div class="row display">
					<div class="three columns">
						.three.columns				
					</div>
					<div class="six columns">
						.six.columns				
					</div>
					<div class="three columns">
						.three.columns				
					</div>
				</div>
				<div class="row display">
					<div class="two columns">
						.two.columns				
					</div>
					<div class="eight columns">
						.eight.columns				
					</div>
					<div class="two columns">
						.two.columns				
					</div>
				</div>
				<div class="row display">
					<div class="one columns">
						.one				
					</div>
					<div class="eleven columns">
						.eleven.columns				
					</div>
				</div>
				<div class="row display">
					<div class="two columns">
						.two.columns		
					</div>
					<div class="ten columns">
						.ten.columns				
					</div>
				</div>
				<div class="row display">
					<div class="three columns">
						.three.columns		
					</div>
					<div class="nine columns">
						.nine.columns				
					</div>
				</div>
				<div class="row display">
					<div class="four columns">
						.four.columns			
					</div>
					<div class="eight columns">
						.eight.columns				
					</div>
				</div>
				<div class="row display">
					<div class="five columns">
						.five				
					</div>
					<div class="seven columns">
						.seven.columns				
					</div>
				</div>
				<div class="row display">
					<div class="six columns">
						.six.columns				
					</div>
					<div class="six columns">
						.six.columns				
					</div>
				</div>
				<div class="row display">
					<div class="seven columns">
						.seven.columns				
					</div>
					<div class="five columns">
						.five.columns				
					</div>
				</div>
				<div class="row display">
					<div class="eight columns">
						.eight.columns	
					</div>
					<div class="four columns">
						.four.columns				
					</div>
				</div>
				<div class="row display">
					<div class="nine columns">
						.nine.columns				
					</div>
					<div class="three columns">
						.three.columns				
					</div>
				</div>
				<div class="row display">
					<div class="ten columns">
						.ten.columns				
					</div>
					<div class="two columns">
						.two.columns				
					</div>
				</div>
				<div class="row display">
					<div class="eleven columns">
						.eleven.columns				
					</div>
					<div class="one columns">
						.one				
					</div>
				</div>
				<div class="row display">
					<div class="twelve columns">
						.twelve.columns				
					</div>
				</div>


				<hr />
				<h4>Offsets</h4>
				<p>Offsets allow you to create additional space between columns in a row. The offsets run from offset-by-one all the way up to offset-by-eleven. Like the rest of the grid they're nestable.</p>

				<div class="row display">
					<div class="one columns">
						.one				
					</div>
					<div class="eleven columns">
						.eleven.columns				
					</div>
				</div>
				<div class="row display">
					<div class="one columns">
						.one				
					</div>
					<div class="ten columns offset-by-one">
						.ten.columns.offset-by-one			
					</div>
				</div>
				<div class="row display">
					<div class="one columns">
						.one				
					</div>
					<div class="nine columns offset-by-two">
						.nine.columns.offset-by-two					
					</div>
				</div>
				<div class="row display">
					<div class="one columns">
						.one				
					</div>
					<div class="eight columns offset-by-three">
						.eight.columns.offset-by-three				
					</div>
				</div>
				<div class="row display">
					<div class="seven columns offset-by-five">
						.seven.columns.offset-by-five				
					</div>
				</div>
				<div class="row display">
					<div class="six columns offset-by-six">
						.six.columns.offset-by-six				
					</div>
				</div>
				<div class="row display">
					<div class="five columns offset-by-seven">
						.five.columns.offset-by-six					
					</div>
				</div>
				<div class="row display">
					<div class="four columns offset-by-eight">
						.four.columns.offset-by-eight					
					</div>
				</div>
				
				<hr />
				<h4>Centered Columns</h4>
				<p>Centered columns are placed in the middle of the row. This does not center their content, but centers the grid element itself. This is a convenient way to make sure a block is centered, even if you change the number of columns it contains. Note: for this to work, there cannot be any other column blocks in the row.</p>

				<div class="row display">
					<div class="one columns centered">
						.one.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="two columns centered">
						.two.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="three columns centered">
						.three.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="four columns centered">
						.four.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="five columns centered">
						.five.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="six columns centered">
						.six.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="seven columns centered">
						.seven.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="eight columns centered">
						.eight.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="nine columns centered">
						.nine.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="ten columns centered">
						.ten.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="eleven columns centered">
						.eleven.columns.centered				
					</div>
				</div>
				<div class="row display">
					<div class="twelve columns centered">
						.twelve.columns.centered				
					</div>
				</div>
				
				<hr />
				
				<h4>Source Ordering</h4>
				<p>Sometimes within the grid you want the order of your markup to not necessarily be the same as the order items are flowed into the grid. Using these source ordering classes you can shift columns around on desktops and tablets. On phones the grid will still be linearized into the order of the markup.</p>
				
				<div class="row display">
					<div class="two columns push-ten">
						.two.columns		
					</div>
					<div class="ten columns pull-two">
						.ten.columns (last)				
					</div>
				</div>
				<div class="row display">
					<div class="three columns push-nine">
						.three.columns		
					</div>
					<div class="nine columns pull-three">
						.nine.columns (last)				
					</div>
				</div>
				<div class="row display">
					<div class="four columns push-eight">
						.four.columns			
					</div>
					<div class="eight columns pull-four">
						.eight.columns (last)				
					</div>
				</div>
				<div class="row display">
					<div class="five columns push-seven">
						.five				
					</div>
					<div class="seven columns pull-five">
						.seven.columns (last)			
					</div>
				</div>
				<div class="row display">
					<div class="six columns push-six">
						.six.columns				
					</div>
					<div class="six columns pull-six">
						.six.columns (last)			
					</div>
				</div>
				<div class="row display">
					<div class="seven columns push-five">
						.seven.columns				
					</div>
					<div class="five columns pull-seven">
						.five.columns (last)			
					</div>
				</div>
				<div class="row display">
					<div class="eight columns push-four">
						.eight.columns	
					</div>
					<div class="four columns pull-eight">
						.four.columns (last)			
					</div>
				</div>
				<div class="row display">
					<div class="nine columns push-three">
						.nine.columns				
					</div>
					<div class="three columns pull-nine">
						.three.columns (last)		
					</div>
				</div>
				<div class="row display">
					<div class="ten columns push-two">
						.ten.columns	
					</div>
					<div class="two columns pull-ten">
						.two (last)		
					</div>
				</div>
				
				The syntax supports push and pull for two to ten columns, and is added directly to the columns themselves.
				<p><script type="text/javascript" src="http://snipt.net/embed/460eb186c71df2e01b381b23423ad0d2"></script></p>
				
				<hr />
				
				<h4>Mobile Grid</h4>
				<p>The grid has two modes of adapting for small displays like phones. The first requires no work at all &mdash; the grid will linearize on a small device so your columns stack vertically. This is useful to quickly adapt a desktop layout to a simple scrolling mobile layout. The other option is to use some simple classes to implement a four-column phone grid.</p>
				
				<h5>Four Column Mobile Grid</h5>
				<p>When you're creating your layout you can optionally attach classes that take your existing grid elements and attach them to a four column phone grid.</p>
				
				<div class="row display">
					<div class="three phone-one columns">
						.three.phone-one.columns				
					</div>
					<div class="nine phone-three columns">
						.nine.phone-three.columns				
					</div>
				</div>
				<div class="row display">
					<div class="six phone-two columns">
						.six.phone-two.columns		
					</div>
					<div class="six phone-two columns">
						.six.phone-two.columns				
					</div>
				</div>
				<div class="row display">
					<div class="nine phone-three columns">
						.nine.phone-three.columns				
					</div>
					<div class="three phone-one columns">
						.three.phone-one.columns				
					</div>
				</div>
				
				<script type="text/javascript" src="http://snipt.net/embed/65d7bb9f3cf79b366fa1c9e970892817"></script>
				
				<h5>Mobile Source Ordering</h5>
				<p>You can use the same push and pull style classes on the 4 column phone grid. The syntax includes .pull-one-phone, .pull-two-phone, .pull-three-phone, as well as .push-one-phone, .push-two-phone, .push-three.phone.</p>
				
				<h4>Other Layout Options</h4>
				<p>Be sure to check out the <a href="layout.php">Layout docs</a> to see how you can turn various grid elements on and off, as well as use 2/3/4/5-up block grids for gallery style layouts.</p>
				
				
			</div>
			<div class="four columns">
				<? include("includes/_download.php"); ?>
			</div>
		</div>
		
		<div class="row">
			<div class="twelve columns">
				<dl class="nice tabs mobile show-on-phones">
					<dd><a href="index.php">Getting Started</a></dd>
					<dd><a href="grid.php" class="active">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
		</div>
		
	
<?php include("includes/_documentation_foot.php");  ?>