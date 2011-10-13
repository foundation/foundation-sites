<? $page_title = "QA, Browser Support and Known Issues"; ?>
<?php include("includes/_documentation_head.php"); ?>
	
	<style type="text/css">
		sup { position: relative; bottom: 18px; left: 3px; font-size: 10px; font-weight: bold; }
	</style>
	
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
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="qa.php" class="active">QA</a></dd>
				</dl>
			</div>
		</div>
		
		<div class="row">
			<div class="eight columns">
				<h3>QA</h3>
				<h4 class="subheader">Foundation's no use to you or anyone else if it doesn't work. On this page you can see the current state of browser support, as well as known issues, for Foundation. Found a bug? <a href="mailto:foundation@zurb.com">Let us know &rarr;</a></h4>
				<hr />
				
				<h4>Desktop Browser Support</h4>
				<table>
					<thead>
						<th></th>
						<th style="width: 25%;">Grid</th>
						<th style="width: 25%;">Layout / UI</th>
						<th style="width: 25%;">JS</th>
					</thead>
					<tr>
						<td><strong>Chrome 14</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Firefox 6</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Firefox 3.6</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Safari 5</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>IE 9</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>IE 8</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>IE 7</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /><sup>1</sup></td>
					</tr>
					<tr>
						<td><strong>IE 6</strong></td>
						<td><img src="../images/error.png" /></td>
						<td><img src="../images/error.png" /></td>
						<td><img src="../images/error.png" /></td>
					</tr>
					
				</table>
				
				<h4>Mobile Browser Support</h4>
				<table>
					<thead>
						<th></th>
						<th style="width: 25%;">Grid</th>
						<th style="width: 25%;">Layout / UI</th>
						<th style="width: 25%;">JS</th>
					</thead>
					<tr>
						<td><strong>Mobile Webkit (iOS 4)</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Android Browser</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Chrome for Android</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Blackberry</strong></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
					
				</table>
				<ol>
					<li>Reveal relies on RGBa colors, which IE7 does not support.</li>
				</ol>
				
				<hr />
				
				<h4>Known Issues</h4>
				<ul class="disc">
					<li><strong>Orbit:</strong> The current embedded version of Orbit has some loading and scaling bugs on responsive layouts. We're finishing a new version of Orbit that corrects this.</li>
					<li><strong>Media Query:</strong> We're currently having difficulty correctly detecting between some Android tablets and smaller laptop resolutions in order to correctly handle the mobile visibility classes. We may have to drop visibility support for the Motorola Xoom.</li>
				</ul>
				
				
				
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
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="qa.php" class="active">QA</a></dd>
				</dl>
			</div>
		</div>
		
<?php include("includes/_documentation_foot.php");  ?>