<? $page_title = "Rapid Prototyping and Building Framework from ZURB" ?>
<?php include("includes/_documentation_head.php"); ?>

  <div class="row">
		<section role="main">
		  <div class="row">
		    <div class="eight columns">
    			<h3>Buttons</h3>
    			<h4 class="subheader">Buttons are a convenient tool when it comes to more traditional actions. To that end, Foundation includes a lot of easy to use button styles that you can customize or override.</h4>
    			
  				<p>Foundation buttons have a number of parameters and styles &mdash; you can see a few examples below. The out of the box classes include size, type (color) and style (square, slightly rounded, and completely rounded).</p>
  				
  				<script src="https://gist.github.com/2969496.js?file=f3-buttons.html"></script>
  				
  				<div class="row">
  					<div class="six columns">
  						<a href="#" class="tiny button">Tiny Button &raquo;</a><br /><br />
  						<a href="#" class="small button">Small Button &raquo;</a><br /><br />
  						<a href="#" class="button">Regular Button &raquo;</a><br /><br />
  						<a href="#" class="large button">Large Button &raquo;</a><br /><br />
  						<br /><br />
  						<a href="#" class="tiny secondary button">Secondary Button &raquo;</a><br /><br />
  						<a href="#" class="small secondary button">Secondary Button &raquo;</a><br /><br />
  						<a href="#" class="secondary button">Secondary Button &raquo;</a><br /><br />
  						<a href="#" class="large secondary button">Secondary Button &raquo;</a><br /><br />
  						<br /><br />
  					</div>
  					<div class="six columns">
  						<a href="#" class="tiny success button">Success Button &raquo;</a><br /><br />
  						<a href="#" class="small success button">Success Button &raquo;</a><br /><br />
  						<a href="#" class="success button">Success Button &raquo;</a><br /><br />
  						<a href="#" class="large success button">Success Button &raquo;</a><br /><br />
  						<br /><br />
  						<a href="#" class="tiny alert button">Alert Button &raquo;</a><br /><br />
  						<a href="#" class="small alert button">Alert Button &raquo;</a><br /><br />
  						<a href="#" class="alert button">Alert Button &raquo;</a><br /><br />
  						<a href="#" class="large alert button">Alert Button &raquo;</a><br /><br />
  						<br /><br />
  					</div>
  				</div>
  				
  				<p>Button classes can also be applied to <code>button</code> elements, as well as <code>input type="submit"</code> elements.</p>
  				
  				<button class="button">Form Button</button>  				
  				<input type="submit" class="button" value="Input Submit Button" />
  				<a href="#" class="button">Regular Button &raquo;</a>

  				<hr />

  				<h4>Button Groups</h4>
  				<p>When you need a group of actions, button groups give you some easy-to-use options.</p>
  				
  				<h5>Button Group - Radius</h5>
  				<p>A button group is simply a <code>ul.button-group</code> in which each <code>li</code> contains a button. You can attach a button style, such as radius or rounded, to the entire group, and Foundation will apply the style to the first and last buttons in the group.</p>
          <ul class="button-group radius">
            <li><a href="#" class="button radius">Button 1</a></li>
            <li><a href="#" class="button radius">Button 2</a></li>
            <li><a href="#" class="button radius">Button 3</a></li>
          </ul>
          
          <script src="https://gist.github.com/2978952.js?file=f3-button-group.html"></script>
          
          <h5>Even Button Groups</h5>
          <p>If you want a button group to fill a grid column with evenly sized actions, you can simply add two classes to the group: <code>.even</code> and either <code>.two-up</code>, <code>.three-up</code>, <code>.four-up</code>, or <code>.five-up</code>.
          
          <ul class="button-group even three-up">
            <li><a href="#" class="button">Button 1</a></li>
            <li><a href="#" class="button">Button 2</a></li>
            <li><a href="#" class="button">Button 3</a></li>
          </ul>
          
          <script src="https://gist.github.com/2978962.js?file=f3-button-grou-even.html"></script>
          
          <h5>Button Bars</h5>
          <p>A button bar is a group of button groups (I N C E P T I O N), perfect for situations where you want groups of actions that are all related to a similar element or page. Simply wrap two or more button groups in a <code>div.button-bar</code> and Foundation takes care of the rest.</p>
          
          <div class="button-bar">
            <ul class="button-group">
              <li><a href="#" class="button">Button 1</a></li>
              <li><a href="#" class="button">Button 2</a></li>
              <li><a href="#" class="button">Button 3</a></li>
            </ul>
          
            <ul class="button-group">
              <li><a href="#" class="button">Button 1</a></li>
              <li><a href="#" class="button">Button 2</a></li>
              <li><a href="#" class="button">Button 3</a></li>
            </ul>
          </div>
          
          <script src="https://gist.github.com/2978972.js?file=f3-button-bar.html"></script>
          
          <p>Buttons within groups or bars can also be individually set to a particular type (color) or size. Obviously if you create a button bar with different sized buttons the visual presentation may suffer a bit, but we wanted these to be very flexible.</p>
          
          <hr />
          
          <h4>Dropdown Buttons</h4>
          <p>Foundation 3 includes two types of dropdown buttons: buttons which create a dropdown when you click them and buttons which have a dropdown when you click specifically on the down-arrow part of the button (a split button). These are useful when an action has several possible outcomes to select from, or when there are secondary choices you can make in lieu of a primary action.</p>
          
          <h5>Dropdown Buttons</h5>
          <p>Dropdown buttons use the same classes as any other button, but a different structure.</p>
          
          <p>
            <div href="#" class="large button dropdown">
              Dropdown Button
              <ul>
                <li><a href="#">Dropdown Item</a></li>
                <li><a href="#">Another Dropdown Item</a></li>
                <li class="divider"></li>
                <li><a href="#">Last Item</a></li>
              </ul>
            </div>
          </p>
          
          <script src="https://gist.github.com/2978975.js?file=f3-dropdown-button.html"></script>
          
          <h5>Split Button</h5>
          <p>Split buttons in turn use similar classes, and a different structure than regular or dropdown buttons.</p>
          
          <p>
            <div href="#" class="large alert button split dropdown">
              <a href="#">Split Button</a>
            	  <span></span>
              <ul>
                <li><a href="#">Dropdown Item</a></li>
                <li><a href="#">Another Dropdown Item</a></li>
                <li class="divider"></li>
                <li><a href="#">Last Item</a></li>
              </ul>
            </div>
          </p>
          
          <script src="https://gist.github.com/2978979.js?file=f3-split-button.html"></script>
          
          <p>Notice that in a split button, the <code>span</code> is the dropdown affordance and the main anchor is the primary button action.</p>
          

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
				<dd class="active"><a href="buttons.php">Buttons</a></dd>
				<dd><a href="forms.php">Forms</a></dd>
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
