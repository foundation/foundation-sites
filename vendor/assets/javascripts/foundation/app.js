;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           && $doc.foundationAlerts();
    $.fn.foundationButtons          && $doc.foundationButtons();
    $.fn.foundationAccordion        && $doc.foundationAccordion();
    $.fn.foundationNavigation       && $doc.foundationNavigation();
    $.fn.foundationTopBar           && $doc.foundationTopBar();
    $.fn.foundationCustomForms      && $doc.foundationCustomForms();
    $.fn.foundationMediaQueryViewer && $doc.foundationMediaQueryViewer();
    $.fn.foundationTabs             && $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup});
    $.fn.foundationTooltips         && $doc.foundationTooltips();

    $('input, textarea').placeholder();
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
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);
