$(document).ready(function () {

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    	//Show Tab Content
		$(contentLocation).closest('.tabs-content').children('> li').hide();
		$(contentLocation).show();
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();



	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
//	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
//	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
//	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var currentFoundationDropdown = null;
	$('.nav-bar li a, .nav-bar li a:after').each(function() {
		$(this).data('clicks', 0);
	});
	$('.nav-bar li a, .nav-bar li a:after').live('click', function(e) {
		e.preventDefault();
		if (currentFoundationDropdown !== $(this).index() || currentFoundationDropdown === null) {
			$(this).data('clicks', 0);
			currentFoundationDropdown = $(this).index();
		}
		$(this).data('clicks', ($(this).data('clicks') + 1));
		var f = $(this).siblings('.flyout');
		if (!f.is(':visible') && $(this).parent('.has-flyout').length > 1) {
			$('.nav-bar li .flyout').hide();
			f.show();
		} else if (($(this).data('clicks') > 1) || ($(this).parent('.has-flyout').length < 1)) {
			window.location = $(this).attr('href');
		}
	});
	$('.nav-bar').live('click', function(e) {
		e.stopPropagation();
		if ($(e.target).parents().is('.flyout') || $(e.target).is('.flyout')) {
			e.preventDefault();
		}
	});
	// $('body').bind('touchend', function(e) {
	// 	if (!$(e.target).parents().is('.nav-bar') || !$(e.target).is('.nav-bar')) {
	// 		$('.nav-bar li .flyout').is(':visible').hide();
	// 	}
	// });

	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */
  
  
  /* TOOLTIPS ---------- */
  /* Positiong and options for adding tooltips */

  function foundationTooltipsInit() {
    var targets = $('.has-tip'),
    tipTemplate = function(target, content) {
      return '<span data-id="' + target + '" class="tooltip">' + content + '<span class="nub"></span></span>';
    };
    targets.each(function(){
      var target = $(this),
      width = target.data('width'),
      content = target.attr('title'),
      id = target.attr('id'),
      classes = target.attr('class'),
      tip = $(tipTemplate(id, content)),
      nub = tip.children('.nub');
      tip.addClass(classes).removeClass('has-tip').appendTo('body').css({
        'top' : (target.offset().top + target.outerHeight() + 10),
        'left' : target.offset().left
      });
      if ($(window).width() < 767) {
        var row = target.parents('.row');
        tip.width(row.outerWidth()).css('left', row.offset().left);
        nub.css('left', (target.offset().left + 10));
      } else {
        if (classes.indexOf('top') > -1) {
          tip.css('top', target.offset().top - tip.outerHeight());
        }
        if (classes.indexOf('left') > -1) {
          tip.css({
            'top' : target.offset().top - (target.outerHeight() / 2),
            'left' : target.offset().left - tip.outerWidth() - 10
          }).children('.nub').css('top', (tip.outerHeight() / 2) - (nub.outerHeight() / 2));
        } else if (classes.indexOf('right') > -1){
          tip.css({
            'top' : target.offset().top - (target.outerHeight() / 2),
            'left' : target.offset().left + target.outerWidth() + 10
          }).children('.nub').css('top', (tip.outerHeight() / 2) - (nub.outerHeight() / 2));
        } 
      }
      tip.hide();
    });
    targets.hover(function() {
      $('span[data-id=' + $(this).attr('id') + ']').show();
    }, function() {
      $('span[data-id=' + $(this).attr('id') + ']').hide();
    });
  }
  foundationTooltipsInit();

});
