<? $page_title = "Forms" ?>
<?php include("includes/_documentation_head.php"); ?>
<style>
/*	input, select {display: inline !important;}*/
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
					<dd><a href="forms.php" class="active">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="gems.php">Gems</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
			<div class="six columns">
				<h3>Forms</h3>
				<h4 class="subheader">Forms are not a lot of fun. We've taken that lack of fun and dodged it with this ready-made code. In this release there are two sets of forms styles - basic and nice. Both are simple, both are flexible, both are easy to customize. <strong>Make sure to include app.js if you're going to use these forms.</strong></h4>
				<hr />
				
				<h4>Forms</h4>
				<form>
					<p>Inputs support a number of different base classes. Any text input has a class of 'input-text' and supports several sizes:</p>
					<label for="standardInput">Standard Input</label>
					<input type="text" class="input-text" id="standardInput" />

					<label for="smallInput">Small Input</label>
					<input type="text" class="small input-text" id="smallInput" />

					<label for="mediumInput">Medium Input</label>
					<input type="text" class="medium input-text" id="mediumInput" />

					<label for="largeInput">Large Input</label>
					<input type="text" class="large input-text" id="largeInput" />
					
					<label for="expandedInput">Expanded (Full Width) Input</label>
					<input type="text" class="expand input-text" id="expandedInput" />

					<label for="oversizeInput">Oversize Input</label>
					<input type="text" class="oversize input-text" id="oversizeInput" />

					<h5>Inline Labels</h5>
					<p>Inline labels are accomplished using the HTML5 Placeholder attribute, with a built-in JS fallback.</p>
					<input type="text" class="input-text" placeholder="Inline label" />
					
					
					<h5>Error States</h5>
					<p>Error states can be applied in two ways:</p>
					<ul class="disc">
						<li>Using a wrapper for div.form-field.error, which will apply styles to text inputs, labels, and a small.error message (optional). This is ideal for programmatically generated forms.</li>
						<li>You can also apply the .red class to labels, inputs, and also append a small.error.</li>
					</ul>
					
					<div class='form-field error'>
						<label for="mediumInputWrapper">Medium Input (with wrapper)</label>
						<input type="text" class="medium input-text" id="mediumInputWrapper" />
						<small>Whoa, cowboy. Try that again.</small>
					</div>
					
					<label class="red" for="errorInput">Medium Input</label>
					<input type="text" class="medium input-text red" id="errorInput" />
					<small class="error">Whoa, cowboy. Try that again.</small>

					<label for="standardTextarea">Textarea</label>
					<textarea id="standardTexted">This is a textarea</textarea>

					<label for="inlineTextarea">Inline Label Textarea</label>
					<textarea placeholder="This is a text area" id="inlineTextarea"></textarea>

					<label for="checkbox1"><input type="checkbox" id="checkbox1"> Label for Checkbox</label>

					<label for="radio1"><input type="radio" id="radio1"> Label for Radio</label>

						<label for="standardDropdown">Dropdown Label</label>
						<select id="standardDropdown">
							<option>This is a dropdown</option>
							<option>This is another option</option>
							<option>Look, a third option</option>
						</select>

					<div class="row">
						<div class="seven columns">
							<fieldset>
								<h5>Fieldset Header H5</h5>
								<p>This is a paragraph within a fieldset.</p>

								<label for="fieldsetInput">Standard Input</label>
								<input type="text" class="input-text" id="fieldsetInput" />
							</fieldset>
						</div>
					</div>
				</form>

				<hr />

				<h4>Nice Forms</h4>
				<form class="nice">
					<p>Changing the form style to a slightly fancier version is dead simple - just add a class of 'nice' to the form itself.</p>

					<label for="standardNiceInput">Standard Input</label>
					<input type="text" class="input-text" id="standardNiceInput" />

					<input type="text" placeholder="Inline label" class="input-text" />

					<label for="smallNiceInput">Small Input</label>
					<input type="text" class="small input-text" id="smallNiceInput" />

					<div class='form-field error'>
						<label for="mediumNiceInput">Medium Input (with wrapper)</label>
						<input type="text" class="medium input-text" id="mediumNiceInput" />
						<small>Whoa, cowboy. Try that again.</small>
					</div>
					
					<label class="red" for="errorNiceInput">Medium Input</label>
					<input type="text" class="medium red input-text" id="errorNiceInput" />
					<small class="error">Whoa, cowboy. Try that again.</small>

					<label for="largeNiceInput">Large Input</label>
					<input type="text" class="large input-text" id="largeNiceInput" />
					
					<label for="expandedNiceInput">Expanded (Full Width) Input</label>
					<input type="text" class="expand input-text" id="expandedNiceInput" />

					<label for="oversizeNiceInput">Oversize Input</label>
					<input type="text" class="oversize input-text" id="oversizeNiceInput" />

					<label for="niceTextarea">Textarea</label>
					<textarea id="niceTextarea">This is a textarea</textarea>

					<label for="inlineNiceTextarea">Inline Label Textarea</label>
					<textarea placeholder="This is a text area" id="inlineNiceTextarea"></textarea>

					<label for="checkbox1"><input type="checkbox" id="checkbox1"> Label for Checkbox</label>

					<label for="radio1"><input type="radio" id="radio1"> Label for Radio</label>

					<label for="niceDropdown">Dropdown Label</label>
					<select id="niceDropdown">
						<option>This is a dropdown</option>
						<option>This is another option</option>
						<option>Look, a third option</option>
					</select>

					<div class="row">
						<div class="seven columns">
							<fieldset>
								<h5>Fieldset Header H2</h5>
								<p>This is a paragraph within a fieldset.</p>

								<label for="niceFieldsetInput">Standard Input</label>
								<input type="text" class="input-text" id="niceFieldssetInput" />
							</fieldset>
						</div>
					</div>
				</form>

				<hr />

				<h3>Custom Forms</h3>	
				
				<form class="custom">
					<p>Creating easy to style custom form elements is so crazy easy, it's practically a crime. Just add a class of 'custom' to a form and, if you want, forms.jquery.js will do everything for you.</p>
					<p>The Foundation forms js will look for any checkbox, radio button, or select element and replace it with custom markup that is already styled with forms.css.</p>
					<p>If you want to avoid a potential flash (waiting for js to load and replace your default elements) you can supply the custom markup as part of the page, and the js will instead simply map the custom elements to the inputs.</p>
					<p>Foundation custom forms will even correctly respect and apply default states for radio, checkbox and select elements. You can use the 'checked' or 'selected' properties just like normal, and the js will apply that as soon as the page loads.</p>
					<p>
						<script type="text/javascript" src="http://snipt.net/embed/d1ce9f919728c0d52fc0ed0ef4600224"></script>
					</p>
					
					
						
					<h5>Radio Buttons</h5>
					<p>
						<script type="text/javascript" src="http://snipt.net/embed/8fcb1d67179ebc3e79b873419be04bf2"></script>
					</p>
					
					<h5>Checkboxes</h5>
					<p>
						<script type="text/javascript" src="http://snipt.net/embed/01d86277dee91bab34dd1baed52d2c18"></script>
					</p>
	
					<div class="row">
						<div class="four columns">
							<label for="radio1"><input name="radio1" type="radio" id="radio1" style="display:none;"><span class="custom radio"></span> Radio Button 1</label>
							<label for="radio2"><input name="radio1" type="radio" id="radio2" style="display:none;"><span class="custom radio checked"></span> Radio Button 2</label>
							<label for="radio3"><input name="radio1" type="radio" id="radio3" style="display:none;"><span class="custom radio"></span> Radio Button 3</label>
						</div>
						<div class="four columns">
							<label for="radio4"><input name="radio2" type="radio" id="radio4"> Radio Button 1</label>
							<label for="radio5"><input name="radio2" CHECKED type="radio" id="radio5"> Radio Button 2</label>
							<label for="radio6"><input name="radio2" type="radio" id="radio6"> Radio Button 3</label>
						</div>
						<div class="four columns">
							<label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Label for Checkbox</label>
							<label for="checkbox2"><input type="checkbox" id="checkbox2" checked style="display: none;"><span class="custom checkbox checked"></span> Label for Checkbox</label>
							<label for="checkbox3"><input type="checkbox" CHECKED id="checkbox3"> Label for Checkbox</label>
						</div>
					</div>
	
					<h5>Dropdown / Select Elements</h5>
					<p>
						<script type="text/javascript" src="http://snipt.net/embed/bb153a86cba41617b41d91268828bb42"></script>
					</p>
	
					<label for="customDropdown">Dropdown Label</label>
					<select style="display:none;" id="customDropdown">
						<option SELECTED>This is a dropdown</option>
						<option>This is another option</option>
						<option>Look, a third option</option>
					</select>
					<div class="custom dropdown">
						<a href="#" class="current">
							This is a dropdown
						</a>
						<a href="#" class="selector"></a>
						<ul>
							<li>This is a dropdown</li>
							<li>This is another option</li>
							<li>Look, a third option</li>
						</ul>
					</div>
					
					<label for="customDropdown2">Dropdown Label</label>
					<select id="customDropdown2">
						<option>This is a dropdown</option>
						<option SELECTED>This is another option</option>
						<option>Look, a third option</option>
					</select>

				</form>
				
				<h5>Adding Custom Forms with JavaScript</h5>

				<p>If you are creating these custom forms using JavaScript (via AJAX, JavaScript templates or whatever), you will also need to create the custom markup that Foundation typically creates for you.</p>

				<p>Foundation detects any custom forms when the document has loaded and adds the custom markup required to make the forms pretty. However if you are adding these forms after the document has loaded, Foundation does not know to append this markup.</p>

				<p>All the custom forms events are bound using jQuery.fn.on(), so you don't need to worry about event handlers not being bound to new elements.</p>
				
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
					<dd><a href="forms.php" class="active">Forms</a></dd>
					<dd><a href="layout.php">Layout</a></dd>
					<dd><a href="ui.php">UI</a></dd>
					<dd><a href="orbit.php">Orbit</a></dd>
					<dd><a href="reveal.php">Reveal</a></dd>
					<dd><a href="qa.php">QA</a></dd>
				</dl>
			</div>
		</div>
		
		
<?php include("includes/_documentation_foot.php");  ?>
