(function( $ ){
  
  $.fn.foundationButtons = function(options) {    
    // Prevent event propagation on disabled buttons
    $('.button.disabled', this).on('click.fndtn', function (event) {
      event.preventDefault();
    });
    
    $('.button.dropdown > ul', this).addClass('no-hover');

    $('.button.dropdown', this).on('click.fndtn', function (e) {
      e.stopPropagation();
    });
    $('.button.dropdown.split span', this).on('click.fndtn', function (e) {
      e.preventDefault();
      $('.button.dropdown', this).not($(this).parent()).children('ul').removeClass('show-dropdown');
      $(this).siblings('ul').toggleClass('show-dropdown');
    });
    $('.button.dropdown', this).not('.split').on('click.fndtn', function (e) {
      $('.button.dropdown', this).not(this).children('ul').removeClass('show-dropdown');
      $(this).children('ul').toggleClass('show-dropdown');
    });
    $('body, html').on('click.fndtn', function () {
      $('.button.dropdown ul').removeClass('show-dropdown');
    });
    
    // Positioning the Flyout List
    var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny)', this).outerHeight() - 1,
        largeButtonHeight   = $('.button.large.dropdown', this).outerHeight() - 1,
        smallButtonHeight   = $('.button.small.dropdown', this).outerHeight() - 1,
        tinyButtonHeight    = $('.button.tiny.dropdown', this).outerHeight() - 1;

    $('.button.dropdown:not(.large):not(.small):not(.tiny) > ul', this).css('top', normalButtonHeight);
    $('.button.dropdown.large > ul', this).css('top', largeButtonHeight);
    $('.button.dropdown.small > ul', this).css('top', smallButtonHeight);
    $('.button.dropdown.tiny > ul', this).css('top', tinyButtonHeight);

    $('.button.dropdown.up:not(.large):not(.small):not(.tiny) > ul', this).css('top', 'auto').css('bottom', normalButtonHeight - 2);
    $('.button.dropdown.up.large > ul', this).css('top', 'auto').css('bottom', largeButtonHeight - 2);
    $('.button.dropdown.up.small > ul', this).css('top', 'auto').css('bottom', smallButtonHeight - 2);
    $('.button.dropdown.up.tiny > ul', this).css('top', 'auto').css('bottom', tinyButtonHeight - 2);
    
  };

})( jQuery );
