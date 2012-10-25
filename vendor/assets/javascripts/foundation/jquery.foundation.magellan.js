/*
 * jQuery Foundation Magellan 0.0.1
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, undefined) {
  'use strict';

  var options = {
    threshold: 10,
    activeClass: 'active'
  };

  // Indicate we have arrived at a destination
  $(document).on('magellan.arrival', '[data-magellan-arrival]', function(e) {
    $(this)
      .closest('[data-magellan-expedition]')
      .find('[data-magellan-arrival]')
      .not(this)
      .removeClass(options.activeClass);
    $(this).addClass(options.activeClass);
  });

  // Set starting point as the current destination
  $('[data-magellan-expedition]')
    .find('[data-magellan-arrival]:first')
    .addClass('active');

  // Keep items in a fixed position
  // $(window).on('scroll.magellan', function(e) {
  // });

  
  $(window).on('scroll.magellan', function() {
    var windowScrollTop = $(window).scrollTop();
    $('[data-magellan-expedition=fixed]').each(function() {
      var $expedition = $(this);
      var theSwitch = windowScrollTop > $expedition.offset().top;
      console.info(theSwitch);
      $expedition.toggleClass("magellan-fixed", theSwitch);
      //$expedition.addClass("magellan-fixed");
    });
  });

  // Determine when a destination has been reached, ah0y!
  $(window).on('scroll.magellan', function(e){
    var windowScrollTop = $(window).scrollTop();
    $('[data-magellan-destination]').each(function(){
      var $destination = $(this),
          destination_name = $destination.attr('data-magellan-destination'),
          topOffset = $destination.offset().top - windowScrollTop;
      if (topOffset <= options.threshold) {
        $('[data-magellan-arrival=' + destination_name + ']')
          .trigger('magellan.arrival');
      }
    });
  });
}(jQuery, this));