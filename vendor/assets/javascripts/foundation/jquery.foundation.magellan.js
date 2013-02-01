/*
 * jQuery Foundation Magellan 0.1.0
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, undefined) {
  'use strict';

  $.fn.foundationMagellan = function(options) {
    var $window = $(window),
  		$document = $(document),
  		$fixedMagellan = $('[data-magellan-expedition=fixed]'),
    	defaults = {
	      threshold: ($fixedMagellan.length) ? $fixedMagellan.outerHeight(true) : 0,
	      activeClass: 'active'
	    },
		options = $.extend({}, defaults, options);
	
    // Indicate we have arrived at a destination
    $document.on('magellan.arrival', '[data-magellan-arrival]', function(e) {
		var $destination = $(this),
      		$expedition = $destination.closest('[data-magellan-expedition]'),
			activeClass = $expedition.attr('data-magellan-active-class') || options.activeClass;
      $destination
        .closest('[data-magellan-expedition]')
        .find('[data-magellan-arrival]')
        .not(this)
        .removeClass(activeClass);
      $destination.addClass(activeClass);
    });

    // Set starting point as the current destination
    var $expedition = $('[data-magellan-expedition]');
    $expedition.find('[data-magellan-arrival]:first')
      .addClass($expedition.attr('data-magellan-active-class') || options.activeClass);

    // Update fixed position
    $fixedMagellan.on('magellan.update-position', function(){
      var $el = $(this);
      $el.data("magellan-fixed-position","");
      $el.data("magellan-top-offset", "");
    })
    .trigger('magellan.update-position');

    $window.on('resize.magellan', function() {
      $fixedMagellan.trigger('magellan.update-position');
    });
    
    $window.on('scroll.magellan', function() {
      var windowScrollTop = $window.scrollTop();
      $fixedMagellan.each(function() {
        var $expedition = $(this);
        if ($expedition.data("magellan-top-offset") === "") {
          $expedition.data("magellan-top-offset", $expedition.offset().top);
        }
        var fixed_position = (windowScrollTop + options.threshold) > $expedition.data("magellan-top-offset");
        if ($expedition.data("magellan-fixed-position") != fixed_position) {
          $expedition.data("magellan-fixed-position", fixed_position);
          if (fixed_position) {
            $expedition.css({position:"fixed", top:0});
          } else {
            $expedition.css({position:"", top:""});
          }
        }
      });
    });

    // Determine when a destination has been reached, ah0y!
    var $lastDestination = $('[data-magellan-destination]:last');
      // Determine if a destination has been set
    if ($lastDestination.length > 0) {
        $window.on('scroll.magellan', function (e) {
            var windowScrollTop = $window.scrollTop(),
                scrolltopPlusHeight = windowScrollTop + $window.outerHeight(true),
                lastDestinationTop = Math.ceil($lastDestination.offset().top);
            $('[data-magellan-destination]').each(function () {
                var $destination = $(this),
                    destination_name = $destination.attr('data-magellan-destination'),
                    topOffset = $destination.offset().top - windowScrollTop;
                if (topOffset <= options.threshold) {
                    $('[data-magellan-arrival=' + destination_name + ']').trigger('magellan.arrival');
                }
                // In large screens we may hit the bottom of the page and dont reach the top of the last magellan-destination, so lets force it
                if (scrolltopPlusHeight >= $document.outerHeight(true) && lastDestinationTop > windowScrollTop && lastDestinationTop < scrolltopPlusHeight) {
                    $('[data-magellan-arrival]:last').trigger('magellan.arrival');
                }
            });
        });
    }
  };
}(jQuery, this));