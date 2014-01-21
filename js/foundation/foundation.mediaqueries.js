;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.mediaqueries = {
    name : 'mediaqueries',

    version : '5.0.0',

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
		var $stateIndicator = $('body').append('<div>').addClass('state-indicator');
		var level = parseInt($stateIndicator.css('z-index'), 10);

		if(level > 0 && level <= 2)
			$('body').attr('data-mediaquery', 'small');
		else if(level > 2 && level <= 4)
			$('body').attr('data-mediaquery', 'medium');
		else if(level > 4 && level <= 6)
			$('body').attr('data-mediaquery', 'large');
		else if(level > 6 && level <= 8)
			$('body').attr('data-mediaquery', 'xlarge');
		else
			$('body').attr('data-mediaquery', 'xxlarge');
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));

/*
	$(window).resize(function() {
		var query = $('body').attr('data-mediaquery');
		
		if(query == "small")
			// Small layout
		else if(query == "medium")
			// Medium layout
		else if(query == "large")
			// Large layout
		else if(query == "xlarge")
			// XLarge layout
		else
			// XXLarge layout
	});
*/