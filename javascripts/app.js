/* Foundation v2.1.3 http://foundation.zurb.com */
$(document).ready(function () {

  /* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTabByHash(locationHash) {
	  activateTab($('dl.tabs > dd > a[href="' + locationHash + '"]'), locationHash);
  }

	function activateTab($tab, nav) {
	  var $activeTab = $tab.closest('dl.tabs').find('a.active');
    var contentLocation = (nav === undefined ? $tab.attr("href") : nav) + 'Tab';

	  //Make Tab Active
	  $activeTab.removeClass('active');
	  $tab.addClass('active');

    //Show Tab Content
		$(contentLocation).closest('.tabs-content').find('> li').hide();
		$(contentLocation).show();
		
		var containingTab = $(contentLocation).closest('.tabs-content').parentsUntil('.tabs-content').last().attr('id');
    if ( containingTab !== undefined ) {
  		var containingHash = "#" + containingTab.substring(0, containingTab.length-3) // - 'Tab'
  		activateTabByHash(containingHash); // activate containing tab
    }
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
		  activateTab($(this));
		});
	});

	if (window.location.hash) {
    activateTabByHash(window.location.hash);
  }
  
  $('a.nav').click(function(){
    var hash = this.href.substring(this.href.indexOf("#"));
    activateTabByHash(hash);
  })


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	$('input, textarea').placeholder();

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
