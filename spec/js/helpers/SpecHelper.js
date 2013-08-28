beforeEach(function() {
	jasmine.Clock.useMock();
	$('body').append('<div id="htmlFixture"></div>');
});

afterEach(function() {
	$('#htmlFixture').remove();
});

function setDocumentWidth(width) {
	var origWidthFunc = $.fn.width;
	var widthSpy = spyOn($.fn, 'width').andCallFake(function() {
		if(this[0].nodeName === '#document') {
			return width;
		} else {
			return origWidthFunc.apply(this);
		}
	});
}
