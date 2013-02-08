;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr,
      defaults = {
        tabs: {callback : $.foundation.customForms.appendCustomMarkup}
      };

  $(document).ready(function() {
    // Allow for setting per-plugin default options
    var userDefaults = $.extend({}, defaults, $.foundationDefaults);
    
    $.fn.foundationAlerts           ? $doc.foundationAlerts(userDefaults.alerts) : null;
    $.fn.foundationButtons          ? $doc.foundationButtons(userDefaults.buttons) : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion(userDefaults.accordion) : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation(userDefaults.navigation) : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar(userDefaults.topBar) : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms(userDefaults.customFonts) : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer(userDefaults.mediaQueryViewer) : null;
    $.fn.foundationTabs             ? $doc.foundationTabs(userDefaults.tabs) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips(userDefaults.tooltips) : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan(userDefaults.magellan) : null;
    $.fn.foundationClearing         ? $doc.foundationClearing(userDefaults.clearing) : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        // At load, if user hasn't scrolled more than 20px or so...
  			if( $(window).scrollTop() < 20 ) {
          window.scrollTo(0, 1);
        }
      }, 0);
    });
  }

})(jQuery, this);
