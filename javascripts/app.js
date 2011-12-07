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
		$(contentLocation).closest('.tabs-content').find('li').hide();
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


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();

	/* DROPDOWN NAV ------------- */
	// $('.nav-bar li a').bind('touchend click', function(e){
	// 	var f = $(this).siblings('.flyout');
	// 	if (!f.is(':visible') && f.length > 0) {
	// 		$('.nav-bar li .flyout').hide();
	// 		f.show();
	// 	} else {
	// 		window.location = $(this).attr('href');
	// 	}
	// 	return false;
	// });
	// $('.nav-bar').bind('touchstart touchmove touchend click', function(e) {
	// 	e.stopPropagation();
	// });
	// $('body').bind('touchstart', function(e) {
	// 	if (e.target !== $('.nav-bar')) {
	// 		$('.nav-bar li .flyout').hide();
	// 	}
	// });

	/* DISABLED BUTTONS ------------- */
	/* Gives elements with a class of 'disabled' a return: false; */


});
