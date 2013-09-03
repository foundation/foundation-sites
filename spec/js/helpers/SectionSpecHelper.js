beforeEach(function() {
	this.addMatchers({
		isAccordion: function() {
			var sectionLib = Foundation.libs.section;
			var settings = sectionLib.settings;
			return sectionLib.is_accordion(this.actual) || 
				(sectionLib.is_auto(this.actual) && 
					this.actual.is("[" + settings.small_style_data_attr + "]"));
		},
		isAuto: function() {
			var sectionLib = Foundation.libs.section;
			var settings = sectionLib.settings;
			return sectionLib.is_auto(this.actual);			
		},
		isHorizontalTabs: function() {
			var sectionLib = Foundation.libs.section;
			var settings = sectionLib.settings;
			return sectionLib.is_horizontal_tabs(this.actual) ||
				(sectionLib.is_auto(this.actual) && !this.actual.is("[" + settings.small_style_data_attr + "]"));
		}
	});
});