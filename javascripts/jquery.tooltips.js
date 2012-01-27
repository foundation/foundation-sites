$(document).ready(function () {
/* TOOLTIPS ---------- */
  /* Positiong and options for adding tooltips */

  function foundationTooltipsInit() {
    var targets = $('.has-tip'),
    tipTemplate = function(target, content) {
      return '<span data-id="' + target + '" class="tooltip">' + content + '<span class="nub"></span></span>';
    };
    targets.each(function(){
      var target = $(this),
      content = target.attr('title'),
      classes = target.attr('class'),
      id = target.attr('id'),
      tip = $(tipTemplate(id, content));
      tip.addClass(classes).removeClass('has-tip').appendTo('body');
      reposition(target, tip, classes);
      tip.hide();
      if (Modernizr.touch) {
        tip.append('<span class="tap-to-close">tap to close </span>');
      }
    });
    $(window).resize(function() {
      var tips = $('.tooltip');
      tips.each(function() {
        var target = $('#' + $(this).data('id')),
        tip = $(this),
        classes = tip.attr('class');
        reposition(target, tip, classes);
      });
        
    });
    
    function reposition(target, tip, classes) {
      var width = target.data('width'),
      nub = tip.children('.nub'),
      nubHeight = nub.outerHeight(),
      nubWidth = nub.outerWidth();
      tip.css({
        'top' : (target.offset().top + target.outerHeight() + 10),
        'left' : target.offset().left,
        'width' : width
      });
      function nubPos(nub, top, right, bottom, left) {
        nub.css({
          'top' : top,
          'bottom' : bottom,
          'left' : left,
          'right' : right
        });
      }
      nubPos(nub, -nubHeight, 'auto', 'auto', 10);
      if ($(window).width() < 767) {
        var row = target.parents('.row');
        tip.width(row.outerWidth() - 20).css('left', row.offset().left);
        nubPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        if (classes.indexOf('top') > -1) {
          tip.css('top', target.offset().top - tip.outerHeight());
          nubPos(nub, 'auto', 'auto', -nubHeight, nubWidth);
        }
        if (classes.indexOf('left') > -1) {
          tip.css({
            'top' : target.offset().top - (target.outerHeight() / 2),
            'left' : target.offset().left - tip.outerWidth() - 10
          }).children('.nub').css('top', (tip.outerHeight() / 2) - (nub.outerHeight() / 2));
          nubPos(nub, ((tip.outerHeight() / 2) - (nub.outerHeight / 2)), -nubHeight, 'auto', 'auto');
        } else if (classes.indexOf('right') > -1){
          tip.css({
            'top' : target.offset().top - (target.outerHeight() / 2),
            'left' : target.offset().left + target.outerWidth() + 10
          }).children('.nub').css('top', (tip.outerHeight() / 2) - (nub.outerHeight() / 2));
          nubPos(nub, ((tip.outerHeight() / 2) - (nub.outerHeight / 2)), 'auto', 'auto', -nubHeight);
        } 
      }
    }
    if (Modernizr.touch) {
      $('.tooltip').live('click', function(e) {
        e.preventDefault();
        $(this).hide();
      });
      targets.live('click', function(){
        targets.hover(function() {
          $('span[data-id=' + $(this).attr('id') + ']').show();
          targets.attr('title', "");
        }, function() {
          $('span[data-id=' + $(this).attr('id') + ']').hide();
        }); 
      });

    } else {
      targets.hover(function() {
        $('span[data-id=' + $(this).attr('id') + ']').show();
        targets.attr('title', "");
      }, function() {
        $('span[data-id=' + $(this).attr('id') + ']').hide();
      }); 
    }
  }
  foundationTooltipsInit();
});