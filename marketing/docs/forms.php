<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>

	<div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Forms</h3>
    			<h4 class="subheader">We set out in Foundation 3 to create an easy to handle, powerful, and versatile form layout system. A combination of form styles and the Foundation grid means you can do basically anything.</h4>

    			<h4>The Basics</h4>
  				<p>Form elements in Foundation 3 are styled based on their type attribute rather than <code>.input-text</code> classes, so the SCSS/CSS is much simpler.</p>
  				<p>Inputs in Foundation 3 have another major change &mdash; <strong>they are full width by default.</strong> That means that inputs will run as wide as the column that contains them. However, you have two options which make these forms extremely versatile:</p>
  				<ul class="disc">
  				  <li>You can size inputs using column sizes, like <code>.six</code>.</li>
  				  <li>You can create <code>row</code> elements inside your form and use columns for the form, including inputs, labels and more. Rows inside a form inherit some special padding to even up input spacing.</li>
  				</ul>

  				<hr />

  				<h4>Row Layouts</h4>
  				<p>Here's an example of a form layout controlled with rows and columns.</p>

          <form>
            <label>This is a label.</label>
            <input type="text" placeholder="Standard Input" />

            <label>Address</label>
            <input type="text" class="twelve" placeholder="Street" />
            <div class="row">
              <div class="six columns">
                <input type="text" placeholder="City" />
              </div>
              <div class="three columns">
                <input type="text" placeholder="State" />
              </div>
              <div class="three columns">
                <input type="text" placeholder="ZIP" />
              </div>
          	</div>
          </form>

          <script src="https://gist.github.com/2952683.js?file=f3-simple-form.html"></script>

          <p>Sometimes you want a form with labels to the left of your inputs. Piece of cake.

          <form>
            <div class="row">
              <div class="two mobile-one columns">
                <label class="right">Address Name:</label>
              </div>
              <div class="ten mobile-three columns">
                <input type="text" placeholder="e.g. Home" class="eight" />
              </div>
            </div>
            <div class="row">
              <div class="two mobile-one columns">
                <label class="right">City:</label>
              </div>
              <div class="ten mobile-three columns">
                <input type="text" class="eight" />
              </div>
            </div>
            <div class="row">
              <div class="two mobile-one columns">
                <label class="right">ZIP:</label>
              </div>
              <div class="ten mobile-three columns">
                <input type="text" class="three" />
              </div>
            </div>
          </form>

          <script src="https://gist.github.com/2952702.js?file=f3-left-form.html"></script>

          <hr />

          <h4>Fieldsets</h4>
          <p>Simple elements that can contain all or part of a form to create better division.</p>

          <fieldset>

            <legend>Fieldset Name</legend>

            <label>This is a label.</label>
            <input type="text" placeholder="Standard Input" />

            <label>Address</label>
            <input type="text" />
            <input type="text" class="six" />

          </fieldset>

          <script src="https://gist.github.com/2952713.js?file=f3-fieldset.html"></script>

          <hr />

          <h4>Labels and Actions with Collapsed Columns</h4>
          <p>Foundation forms support actions tied to buttons, and prefix / postfix labels, through a versatile approach using special grid properties. Essentially you can use a 'collapsed' row to create label / action / input combinations. Here are a few examples.</p>

          <label>Input with a prefix character</label>
          <div class="row">
            <div class="four columns">
              <div class="row collapse">
                <div class="two mobile-one columns">
                  <span class="prefix">#</span>
                </div>
                <div class="ten mobile-three columns">
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <script src="https://gist.github.com/2954955.js?file=f3-prefix-form.html"></script>
          
          <p><strong>Note:</strong> for these prefix and postfix labels we're using the <a href="grid.php">mobile grid</a> to size our labels correctly on small devices.</p>

          <label>Input with a postfix label</label>
          <div class="row">
            <div class="five columns">
              <div class="row collapse">
                <div class="nine mobile-three columns">
                  <input type="text" />
                </div>
                <div class="three mobile-one columns">
                  <span class="postfix">.com</span>
                </div>
              </div>
            </div>
          </div>
          <script src="https://gist.github.com/2954957.js?file=f3-form-postfix.html"></script>

          <label>Input with a postfix action (button)</label>
          <div class="row">
            <div class="five columns">
              <div class="row collapse">
                <div class="eight mobile-three columns">
                  <input type="text" />
                </div>
                <div class="four mobile-one columns">
                  <a class="button postfix">Search</a>
                </div>
              </div>
            </div>
          </div>
          <script src="https://gist.github.com/2954957.js?file=f3-form-postfix.html"></script>

          <form>
            <fieldset>
              <legend>Large Form Example</legend>

              <div class="row">
                <div class="five columns">

                  <label>Name</label>
                  <input type="text" />

                  <label>Occupation</label>
                  <input type="text" />

                  <label>Twitter</label>
                  <div class="row collapse">
                    <div class="two mobile-one columns">
                      <span class="prefix">@</span>
                    </div>
                    <div class="ten mobile-three columns">
                      <input type="text" placeholder="foundationzurb" />
                    </div>
                  </div>

                  <label>URL</label>
                  <div class="row collapse">
                    <div class="nine mobile-three columns">
                      <input type="text" placeholder="foundation.zurb" />
                    </div>
                    <div class="three mobile-one columns">
                      <span class="postfix">.com</span>
                    </div>
                  </div>

                </div>
              </div>

              <label>Address</label>
              <input type="text" placeholder="Street (e.g. 123 Awesome St.)" />

              <div class="row">
                <div class="six columns">
                  <input type="text" placeholder="City" />
                </div>
                <div class="two columns" />
                  <select>
                    <option>CA</option>
                  </select>
                </div>
                <div class="four columns">
                  <input type="text" placeholder="ZIP" />
                </div>
              </div>

            </fieldset>
          </form>

          <p><a href="https://raw.github.com/gist/2955059/5867e7a3be221ea795155c02af91d423429eb692/f3-form-example.html" target="_blank">View the code for this form &rarr;</a></p>

          <hr />

          <h4>Custom Inputs</h4>
          <form class="custom">
  					<p>Creating easy to style custom form elements is so crazy easy, it's practically a crime. Just add a class of "custom" to a form and, if you want, jquery.customforms.js will do everything for you.</p>
  					<p>The Foundation forms js will look for any checkbox, radio button, or select element and replace it with custom markup that is already styled with forms.css.</p>

  					<script src="https://gist.github.com/2955124.js?file=f3-custom-form.html"></script>

  					<p>If you want to avoid a potential flash (waiting for js to load and replace your default elements) you can supply the custom markup as part of the page, and the js will instead simply map the custom elements to the inputs.</p>
  					<p>Foundation custom forms will even correctly respect and apply default states for radio, checkbox and select elements. You can use the "checked" or "selected" properties just like normal, and the js will apply that as soon as the page loads.</p>

  					<h5>Radio Buttons and Checkboxes</h5>
  					<div class="row">
  						<div class="four columns">
  							<label for="radio1"><input name="radio1" type="radio" id="radio1" style="display:none;"><span class="custom radio"></span> Radio Button 1</label>
  							<label for="radio2"><input name="radio1" type="radio" id="radio2" style="display:none;"><span class="custom radio checked"></span> Radio Button 2</label>
  							<label for="radio3"><input name="radio1" type="radio" id="radio3" disabled style="display:none;"><span class="custom radio"></span> Radio Button 3</label>
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

  					<br /><br />

  					<script src="https://gist.github.com/2955081.js?file=f3-custom-radio.html"></script>
  					<script src="https://gist.github.com/2955092.js?file=f3-custom-checkbox.html"></script>

  					<br />
  					<h5>Dropdown / Select Elements</h5>

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

  				  <script src="https://gist.github.com/2955100.js?file=f3-custom-dropdowns.html"></script>

  				</form>

  				<h5>Adding Custom Forms with JavaScript</h5>

  				<p>If you are creating these custom forms using JavaScript (via AJAX, JavaScript templates or whatever), you will also need to create the custom markup that Foundation typically creates for you.</p>

  				<p>Foundation detects any custom forms when the document has loaded and adds the custom markup required to make the forms pretty. However, if you are adding these forms after the document has loaded, Foundation does not know to append this markup.</p>

  				<p>All the custom forms events are bound using jQuery.fn.on(), so you don't need to worry about event handlers not being bound to new elements.</p>


    		</div>
    		<div class="four columns">
    		  <? include("includes/_download.php"); ?>
    		</div>
      </div>
		</section>

		<section id="sidebar" role="complementary">

			<dl class="tabs vertical hide-on-phones">
				<dd><a href="index.php">Getting Started</a></dd>
				<dd><a href="installing.php">CSS Version</a></dd>
        <dd><a href="gem-install.php">Gem Versions</a></dd>
				<dd><a href="grid.php">The Grid</a></dd>
				<dd><a href="typography.php">Typography</a></dd>
				<dd><a href="buttons.php">Buttons</a></dd>
				<dd class="active"><a href="forms.php">Forms</a></dd>
				<dd><a href="navigation.php">Navigation</a></dd>
				<dd><a href="tabs.php">Tabs</a></dd>
				<dd><a href="elements.php">Elements</a></dd>
				<dd><a href="orbit.php">Orbit</a></dd>
				<dd><a href="reveal.php">Reveal</a></dd>
				<dd><a href="support.php">Support</a></dd>
			</dl>

		</section>
	</div>


<?php include("includes/_documentation_foot.php");  ?>
