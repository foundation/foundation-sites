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
  var allTips = $('.has-tip');
  
  allTips.each(function() {
    var tips = $(this),
        tipWords = tips.attr('title'), 
        tipWidths = tips.attr('data-width');
        
    tips.append('<span>' + tipWords + '<span class="nub"></span></span>');    
    var tipSpans = tips.children('span');
    
    tipSpans.css('width', tipWidths);     
    var tipHeights = tipSpans.outerHeight(),
        trueTipWidths = tipSpans.outerWidth(),
        nubSize = tipSpans.children('.nub').outerWidth(),
        windowWidth = $(window).width();
    
    // Make it clickable for mobile devices
    if ( navigator.userAgent.match(/Android/i) ||
         navigator.userAgent.match(/iPhone/i) ||
         navigator.userAgent.match(/iPod/i) ||
         navigator.userAgent.match(/iPad/i) ){    
      
      tips.click(function() {
        allTips.hide();
        tipSpans.toggle();
      });
    }
    
    function tipHover() {
      tips.hover(function() {
        tipSpans.toggle();
        tips.attr('title', '');
      });
    }
    
    // If we're looking at the site on smaller screen sizes
    if (windowWidth < 767) {
      tipHover();
      
      tipSpans.css({
        top: -tipHeights,
        left: 0,
        width: '100%'
      });
    
    // If we're on a normal screen
    } else {
      tipHover();
      
      tipSpans.css({
        top: (tipHeights / 2),
        left: 0
      });
            
      if (tips.hasClass('top')) {
        tipSpans.children('.nub').css({
          left: 10,
          bottom: -nubSize,
          top: 'auto'
        });
        tipSpans.css({
          top: 'auto',
	        bottom: tipHeights + (nubSize / 2),
	        left: '0'
        });
        
      } else if (tips.hasClass('left')) {
        tipSpans.children('.nub').css({
          left: trueTipWidths,
          top: (tipHeights / 2) - (nubSize / 2)
        });
        tipSpans.css({
          left: -(trueTipWidths + (nubSize / 2)),
          top: -((tipHeights / 2) - (nubSize / 2)) 
        });
      
      } else if (tips.hasClass('right')) {
        tipSpans.children('.nub').css({
          left: -nubSize,
          top: (tipHeights / 2) - (nubSize / 2)
        });
        tipSpans.css({
          left: tips.width() + (nubSize / 2),
          top: -((tipHeights / 2) - (nubSize / 2))
        });
      }
    }
  });

});
