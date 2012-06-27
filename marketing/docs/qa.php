<? $page_title = "QA, Browser Support and Known Issues"; ?>
<?php include("includes/_documentation_head.php"); ?>
	
	<style>
		sup { position: relative; bottom: 18px; left: 3px; font-size: 10px; font-weight: bold; }
	</style>
	
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
					<dd><a href="grid.php">Grid</a></dd>
					<dd><a href="buttons.php">Buttons</a></dd>
					<dd><a href="forms.php">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="gems.php">Gems</a></dd>
					<dd><a href="qa.php" class="active">QA</a></dd>
				</dl>
			</div>
			<div class="six columns">
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
						<td><strong>Chrome (Edge)</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Firefox (Edge)</strong></td>
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
						<td><strong>Safari (Edge)</strong></td>
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
						<td><strong>Mobile Webkit (iOS 5)</strong></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr>
					<tr>
						<td><strong>Android Browser</strong><sup>2</sup></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
						<td><img src="../images/check.png" /></td>
					</tr><!--

					<tr>
						<td><strong>Blackberry</strong></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
-->
					
				</table>
				<ol>
					<li>Reveal uses RGBa colors, which IE7 does not support. You can manually exchange RGBa for PNGs to provide IE7 support in Reveal</li>
					<li>This includes the shipping browser on the Motorola XOOM and several newer Android phones. However, there is no single Android browser so testing is slightly constrained.</li>
				</ol>
				

				<hr />
				
				<h4>Known Issues</h4>
				<ul class="disc">
					<li><em>There are currently no major known issues. Visit the <a href="https://github.com/zurb/foundation/issues?sort=created&direction=desc&state=open">Github Issues page</a> for individual reports on smaller bugs.</em></li>
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