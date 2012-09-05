(function ($) {

  $(function(){
    $(document).foundationAlerts();
    $(document).foundationButtons();
    $(document).foundationAccordion();
    $(document).foundationNavigation();
    $(document).foundationTopBar();
    $(document).foundationCustomForms();
    $(document).foundationMediaQueryViewer();
    $(document).foundationTabs({callback:$.foundation.customForms.appendCustomMarkup});
    
    $(document).tooltips();
    $('input, textarea').placeholder();
    
    // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
    // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
    // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
    // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
    // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});
  });
  
  // Hide address bar on mobile devices
  if (Modernizr.touch) {
    $(window).load(function(){
      setTimeout(function(){
        window.scrollTo(0, 1);
      }, 0);
    });
  }
  
})(jQuery);