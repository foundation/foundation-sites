<? $page_title = "UI Elements"; ?>
<?php include("includes/_documentation_head.php"); ?>
	
	<div class="container">
		<div class="row">
			<div class="twelve columns">
				<div class="foundation-header">
					<h1><a href="index.php">Foundation Docs</a></h1>
					<h4 class="subheader">Rapid prototyping and building library from ZURB.</h4>
				</div>
			
				<dl class="nice tabs mobile hide-on-phones">
					<dd><a href="index.php">Getting Started</a></dd>
					<dd><a href="grid.php">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php" class="active">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="rails.php">Rails</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
		</div>
		
		<div class="row">
			<div class="eight columns">
				<h3>UI Elements</h3>
				<h4 class="subheader">Need tabs, tables, or other common UI elements?<br />Yeah, we got that.</h4>
				<hr />
				
				<h4>Tabs</h4>
				<div class="row">
					<div class="six columns">
						<p>Tabs are very versatile both as organization and navigational constructs. To keep things easy for everyone we've created two main tab styles (simple and nice) as well as two variants of each - open and contained. With the base Foundation package, tabs of a particular format are actually already hooked up - no extra work required.</p>
					</div>
					<div class="six columns">	
						<p>Tabs are made of <strong>two objects:</strong> a DL object containing the tabs themselves, and a UL object containing the tab content. If you simply want visual tabs (as seen in this documentation) without the on-page hookup, you only need the DL. If you want functional tabs, just be sure that each tab is linked to an ID, and that the corresponding tab has an ID of tabnameTab. Check out these examples.</p>
					</div>
				</div>
				<h5>Simple Tabs</h5>
				<dl class="tabs">
					<dd><a href="#simple1" class="active">Simple Tab 1</a></dd>
					<dd><a href="#simple2">Simple Tab 2</a></dd>
					<dd class="hide-on-phones"><a href="#simple3">Simple Tab 3</a></dd>
				</dl>
				<ul class="tabs-content">
					<li class="active" id="simple1Tab">This is simple tab 1's content. Pretty neat, huh?</li>
					<li id="simple2Tab">This is simple tab 2's content. Now you see it!</li>
					<li id="simple3Tab">This is simple tab 3's content. It's only okay.</li>
				</ul>
				
				<script src="http://snipt.net/embed/beabf0c3da0338ec44d9d383d9c405f4"></script>
				
				<hr />
				
				<h5>Contained Tabs</h5>
				<p>Contained tabs have a simple added class of 'contained' on the tabs-content element. What that means is the tab content has a border around it tying it to the tabs, and the padding on that container (by default) is one column on each side. That means you can still use standard column sizes inside a tab element.</p>
				
				<dl class="tabs contained">
					<dd><a href="#simpleContained1" class="active">Simple Tab 1</a></dd>
					<dd><a href="#simpleContained2">Simple Tab 2</a></dd>
					<dd class="hide-on-phones"><a href="#simpleContained2">Simple Tab 3</a></dd>
				</dl>
				<ul class="tabs-content contained">
					<li class="active" id="simpleContained1Tab">This is simple tab 1's content. Pretty neat, huh?</li>
					<li id="simpleContained2Tab">This is simple tab 2's content. Now you see it!</li>
					<li id="simpleContained3Tab">This is simple tab 3's content. It's only okay.</li>
				</ul>
				
				<script src="http://snipt.net/embed/79e2cd3515daf12475946930a3d0f011"></script>
				
				<hr />
				
				<h5>Nice Tabs</h5>
				<p>Need something a little fancier? Nice tabs have some sweet default styling and can add a little polish to a prototype (or documentation). They can be both standard and contained, just like the simple tabs.</p>
				
				<dl class="nice contained tabs">
					<dd><a href="#nice1" class="active">Nice Tab 1</a></dd>
					<dd><a href="#nice2">Nice Tab 2</a></dd>
					<dd class="hide-on-phones"><a href="#nice3">Nice Tab 3</a></dd>
				</dl>
				<ul class="nice tabs-content contained">
					<li class="active" id="nice1Tab">This is nice tab 1's content. Pretty neat, huh?</li>
					<li id="nice2Tab">This is nice tab 2's content. Now you see it!</li>
					<li id="nice3Tab">This is simple tab 3's content. It's only okay.</li>
				</ul>
				
				<script src="http://snipt.net/embed/63e549cb8b9606acbaed87b1b37b51e1"></script>
				
				<hr />
				
				<h5>Mobile Tabs</h5>
				<p>To demonstrate how mobile navigation can work, adding a class of 'mobile' to a tab group will switch them (at small resolutions) to full width nav bars.</p>
				
				<hr />
				
				<h4>Pagination</h4>
				<p>Breaking stuff up into pages? Yeah you are. Here's some pagination to get you started.</p>
				
				<ul class="pagination">
					<li class="unavailable"><a href="">&laquo;</a></li>
					<li class="current"><a href="">1</a></li>
					<li><a href="">2</a></li>
					<li><a href="">3</a></li>
					<li><a href="">4</a></li>
					<li class="unavailable"><a href="">&hellip;</a></li>
					<li><a href="">12</a></li>
					<li><a href="">13</a></li>
					<li><a href="">&raquo;</a></li>
				</ul>
				
				<script src="http://snipt.net/embed/724214a9eba6436e1565fc748693e61b"></script>
				
				<hr />
				
<!--
				<h4>Lists</h4>
				<p>Sure, you can use standard unordered and ordered lists. Or you can be a baller and use nice lists, which have the added benefit of making the bullets and numbers styleable.</p>
				
				<ul class="nice">
					<li>
						<span class="bullet">&bull;</span>
						This is the first item in a nice unordered list
					</li>
					<li>
						<span class="bullet">&bull;</span>
						This is the second item in a nice unordered list
					</li>
					<li>
						<span class="bullet">&bull;</span>
						This is the third item in a nice unordered list
					</li>
					<li>
						<span class="bullet">&bull;</span>
						This is the fourth item in a nice unordered list, but who cares? It's unordered!
					</li>
				</ul>
				
				<ol class="nice">
					<li>
						<span class="number">1.</span>
						This is the first item in a nice ordered list.
					</li>
					<li>
						<span class="number">2.</span>
						This is the second item in a nice ordered list.
					</li>
					<li>
						<span class="number">3.</span>
						This is the third item in a nice ordered list.
					</li>
					<li>
						<span class="number">4.</span>
						This is the fourth item in a nice ordered list, duh. Didn't you see the styleable number?
					</li>
				</ol>
				
				<script src="http://snipt.net/embed/e2ac671a4319fbcfc175ddc7fce26101"></script>
				
				<p>When using .nice lists you can either specify the bullets and numbers yourself, or let ui.js do it for you. A nice list without the appropriate span.bullet or span.number will have those inject automatically, so they can pick up your CSS. Thus you can create sweet looking lists with all kinds of control, but still write them like this:</p>
				
				<script src="http://snipt.net/embed/e7c5ed6d56488b4c3b84c6d4f85a5dbe"></script>
				
				<hr />
-->
				
				<h4>Tables</h4>
				<p>Okay, they're not the sexiest things ever, but tables get the job done (for tabular data).</p>
				
				<table>
					<thead>
						<tr>
							<th>Table Header</th>
							<th>Table Header</th>
							<th>Table Header</th>
							<th>Table Header</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Content</td>
							<td>This is longer content</td>
							<td>Content</td>
							<td>Content</td>
						</tr>
						<tr>
							<td>Content</td>
							<td>This is longer content</td>
							<td>Content</td>
							<td>Content</td>
						</tr>
						<tr>
							<td>Content</td>
							<td>This is longer content</td>
							<td>Content</td>
							<td>Content</td>
						</tr>
						<tr>
							<td>Content</td>
							<td>This is longer content</td>
							<td>Content</td>
							<td>Content</td>
						</tr>
					</tbody>
				</table>
				
				
			</div>
			<div class="four columns">
				<? include("includes/_download.php"); ?>
			</div>
		</div>
		
		<div class="row">
			<div class="twelve columns">
				<dl class="nice tabs mobile show-on-phones">
					<dd><a href="index.php">Getting Started</a></dd>
					<dd><a href="grid.php">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php" class="active">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
		</div>
		
		
<?php include("includes/_documentation_foot.php");  ?>