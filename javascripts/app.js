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
		$(contentLocation).closest('.tabs-content').children('li').hide();
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
	$(".alert-box").delegate("a.close", "click", function() {
	  $(this).closest(".alert-box").fadeOut(function(){
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
	/*
	$('.nav-bar li a, .nav-bar li a:after').each(function() {
		$(this).data('clicks', 0);
	});
	$('.nav-bar li a, .nav-bar li a:after').bind('touchend click', function(e){
		e.stopPropagation();
		e.preventDefault();
		var f = $(this).siblings('.flyout');
		$(this).data('clicks', ($(this).data('clicks') + 1));
		if (!f.is(':visible') && f.length > 0) {
			$('.nav-bar li .flyout').hide();
			f.show();
		}
	});
	$('.nav-bar li a, .nav-bar li a:after').bind(' touchend click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if ($(this).data('clicks') > 1) {
			window.location = $(this).attr('href');
		}
	});
	$('.nav-bar').bind('touchend click', function(e) {
		e.stopPropagation();
		if (!$(e.target).parents('.nav-bar li .flyout') || $(e.target) != $('.nav-bar li .flyout')) {
			e.preventDefault();
		}
	});
	$('body').bind('touchend', function(e) {
		if (!$(e.target).parents('.nav-bar li .flyout') || $(e.target) != $('.nav-bar li .flyout')) {
			$('.nav-bar li .flyout').hide();
		}
	});
	*/

	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */

});
