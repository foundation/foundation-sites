describe('Sticky', function() {
	var plugin;
	var $html;

	afterEach(function() {
		plugin.destroy();
		$html.remove();
	});

	describe('constructor()', function() {
		it('stores the element and plugin options', function() {
			$html = $(`
				<div class="columns small-6 right" data-sticky-container>
  					<div class="sticky" data-sticky data-margin-top="0">
    					<p>I'm sticky</p>
  					</div>
				</div>
				`).appendTo('body');

			plugin = new Foundation.Sticky($html, {});

			plugin.$element.should.be.an('object');
			plugin.options.should.be.an('object');
		});
	});

});