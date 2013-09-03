describe('Section', function() {
	var template = {
		auto: '\
			<div class="section-container auto" data-section> \
			</div>'
	};

	var settings = Foundation.libs.section.settings;

	describe('auto with defaults', function() {

		beforeEach(function() {
			$('#htmlFixture').append(template.auto);
		});

		it('should be tabs at small breakpoint', function() {
			setDocumentWidth(settings.small_breakpoint);

			$(document).foundation('section');
			jasmine.Clock.tick(1000); // Let things settle...

			var section = $(settings.section_selector)
			expect(section).isAuto();
			expect(section).not.isAccordion();
			expect(section).isHorizontalTabs();
		});	

		it('should be accordion below small breakpoint', function() {
			setDocumentWidth(settings.small_breakpoint - 1);

			$(document).foundation('section');
			jasmine.Clock.tick(1000); // Let things settle...

			var section = $(settings.section_selector)
			expect(section).isAuto();
			expect(section).isAccordion();
		});	
	});
});
