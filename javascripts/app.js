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

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});


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
        'left' : target.offset().left,
        'width' : width
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
    $(window).resize(function() {
      
    });
    targets.hover(function() {
      $('span[data-id=' + $(this).attr('id') + ']').show();
      targets.attr('title', "");
    }, function() {
      $('span[data-id=' + $(this).attr('id') + ']').hide();
    });
  }
  foundationTooltipsInit();

});
