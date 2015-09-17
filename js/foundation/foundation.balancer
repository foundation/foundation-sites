/*
 * Foundation Grid Balancer
 * http://tangerineindustries.com
 * Copyright 2015, Corey Snyder
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 
 * To use apply data attribute "data-balancer" to any <ul> block grid.
 * Respects classed media queries
 * respectSiblingWidth: false = full width <li>
*/

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
				var rtl = Foundation.rtl ? 'margin-right' : 'margin-left';
				
				//test over the media queries and the classes to see what media query is active and which class to match
				var classes = $(this).attr("class").split(" ");
				for (var c = 0; c <= classes.length-1; c++) {
					var screenSize = matchMedia(Foundation.media_queries[classes[c].slice(0, classes[c].indexOf("-"))+'-only']).matches;
					var gridMediaSize = classes[c].slice(0, classes[c].indexOf("-"));
					
					//xl or xxl
					if (Foundation.utils.is_large_up() == true && gridMediaSize == "large") {
						grid = parseInt(classes[c].slice(classes[c].lastIndexOf("-")+1));
						break;
					}
					
					//small only
					if (Foundation.utils.is_small_up() == true && gridMediaSize == "small") {
						grid = parseInt(classes[c].slice(classes[c].lastIndexOf("-")+1));
					}
					
					//large only
					if (Foundation.utils.is_small_up() == true && gridMediaSize == "large") {
						grid = 1;
					}
					
					if (screenSize == true) {
						grid = parseInt(classes[c].slice(classes[c].lastIndexOf("-")+1));
						break;
					}
				}
				
				//balance the block
				$(this).find('li').css("width", (100 / grid)+"%");
				$(this).find('li').css(rtl,0);
				 
				 var offset = blocks % grid;
				 
				 for (var b = 0; b <= blocks % grid; b++) {
					if (Foundation.libs.balancer.settings.respectSiblingWidth == false) {
						$(this).find('li').eq(blocks-b).css("width",(100 / offset)+"%");
					} else {
						if (b == offset) {
							$(this).find('li').eq(blocks-b).css(rtl, (((grid - offset) * .5) * (100 / grid))+"%");	
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
