;(function ($, window, document, undefined) {
  'use strict';

	Foundation.libs.balancer = {
		name : 'balancer',
		
		version : '1.0.0',
		
		settings : {
			respectSiblingWidth : true
		},
		
		init : function (scope, method, options) {
			this.bindings(method, options);
			$.extend(true, this.settings, method, options);
			this.balance();
		},
		
		events : function () {
			//none i can really think of
		},
		
		balance : function (balancer, settings) {		
			this.S('ul[data-balancer]', this.scope).each(function () {	
				var grid;
				var blocks = $(this).children('li').length;
				
				//test over the media queries and the classes to see what media query is active and which class to match
				var classes = $(this).attr("class").split(" ");
				for (var c = 0; c <= classes.length-1; c++) {
					var screenSize = matchMedia(Foundation.media_queries[classes[c].slice(0, classes[c].indexOf("-"))+'-only']).matches;
					if (screenSize == true) {
						grid = parseInt(classes[c].slice(classes[c].lastIndexOf("-")+1));
						break;
					}
				}
				
				//balance the block
				$(this).find('li').css({"width":(100 / grid)+"%","margin-left":0});
				 
				 var offset = blocks % grid;
				 for (var b = 0; b <= blocks % grid; b++) {
					if (Foundation.libs.balancer.settings.respectSiblingWidth == false) {
						$(this).find('li').eq(blocks-b).css("width",(100 / offset)+"%");
					} else {
						if (b == offset) {
							$(this).find('li').eq(blocks-b).css({"margin-left":(((grid - offset) * .5) * (100 / grid))+"%"});	
						}
					}
				 }
		 	});
		}
	};
	
	$(window).resize(function() {
		Foundation.libs.balancer.balance();
	});
})(jQuery, window, window.document);
