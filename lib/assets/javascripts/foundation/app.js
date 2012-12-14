;(function ($, window, undefined) {
  'use strict';

  var Modernizr = window.Modernizr;

  // init tabs
  // $.foundation('tabs', function (response) {
  //   console.log(response);
  // });

  // $.foundation('tabs', {selector : '.cool-tip'}, function (response) {
  //   console.log(response);
  // });

  // call the events method on tabs
  // $.foundation('tabs', 'events', {}, function (response) {
  //   console.log('end');
  // });

  // $.foundation();

  // $.foundation("tabs", "reload", {callback: function () { alert('bam'); }}, function (response) {
  //   console.log(response);
  // });

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
