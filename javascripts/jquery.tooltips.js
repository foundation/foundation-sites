/*
 * jQuery Foundation Tooltip Plugin 1.0.1
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

;(function($) {
  var attributes = {
    bodyHeight : 0,
    pollInterval : 1000
  },
  methods = {
    init : function(options) {

      return this.each(function() {
        var targets, tips, tipTemplate, poll;

        $(window).data('tooltips', 'init');

        targets = $('.has-tip');
        tips = $('.tooltip');
        tipTemplate = function(target, content) {
          return '<span data-id="' + target + '" class="tooltip">' + content + '<span class="nub"></span></span>';
        };
        poll = setInterval(methods.isDomResized, attributes.pollInterval);
        if (tips.length < 1) {
          targets.each(function(i){
            var target, tip, id, content, classes;

            target = $(this);
            id = 'foundationTooltip' + i;
            content = target.attr('title');
            classes = target.attr('class');
            target.data('id', id);
            tip = $(tipTemplate(id, content));
            tip.addClass(classes).removeClass('has-tip').appendTo('body');
            if (Modernizr.touch) tip.append('<span class="tap-to-close">tap to close </span>');
            methods.reposition(target, tip, classes);
            tip.fadeOut(150);
          });
        }
        $(window).on('resize.tooltip', function() {
          var tips = $('.tooltip');
          tips.each(function() {
            var data, target, tip, classes;

            data = $(this).data();
            target = targets = $('.has-tip');
            tip = $(this);
            classes = tip.attr('class');
            targets.each(function() {
              ($(this).data().id == data.id) ? target = $(this) : target = target;
            });
            methods.reposition(target, tip, classes);
          });

        });

        if (Modernizr.touch) {
          $('.tooltip').on('click.tooltip touchstart.tooltip touchend.tooltip', function(e) {
            e.preventDefault();
            $(this).fadeOut(150);
          });
          targets.on('click.tooltip touchstart.tooltip touchend.tooltip', function(e){
            e.preventDefault();
            $('.tooltip').hide();
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeIn(150);
            targets.attr('title', "");
          });
        } else {
          targets.hover(function() {
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeIn(150);
            targets.attr('title', "");
          }, function() {
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeOut(150);
          });
        }

      });
    },
    reload : function() {
      var $self = $(this);
      return ($self.data('tooltips')) ? $self.tooltips('destroy').tooltips('init') : $self.tooltips('init');
    },
    destroy : function() {
       return this.each(function(){
         $(window).unbind('.tooltip');
         $('.has-tip').unbind('.tooltip');
         $('.tooltip').each(function(i){
          $($('.has-tip').get(i)).attr('title', $(this).text());
         }).remove();
       });
    },
    reposition : function(target, tip, classes) {
      var width, nub, nubHeight, nubWidth, row, objPos;

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = nub.outerHeight();
      nubWidth = nub.outerWidth();

      objPos = function(obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : top,
          'bottom' : bottom,
          'left' : left,
          'right' : right,
          'width' : (width) ? width : 'auto'
        }).end();
      };


      objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', target.offset().left, width);
      objPos(nub, -nubHeight, 'auto', 'auto', 10);

      if ($(window).width() < 767) {
        row = target.parents('.row');
        tip.width(row.outerWidth() - 20).css('left', row.offset().left).addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        if (classes.indexOf('tip-top') > -1) {
          objPos(tip, (target.offset().top - tip.outerHeight() - nubHeight), 'auto', 'auto', target.offset().left, width)
            .removeClass('tip-override');
          objPos(nub, 'auto', 'auto', -nubHeight, 'auto');
        } else if (classes.indexOf('tip-left') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - nubHeight), 'auto', 'auto', (target.offset().left - tip.outerWidth() - 10), width)
            .removeClass('tip-override');
          objPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), -nubHeight, 'auto', 'auto');
        } else if (classes.indexOf('tip-right') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - nubHeight), 'auto', 'auto', (target.offset().left + target.outerWidth() + 10), width)
            .removeClass('tip-override');
          objPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), 'auto', 'auto', -nubHeight);
        }
      }
    },
    isDomResized : function() {
      $body = $('body');
      if(attributes.bodyHeight != $body.height()) {
        attributes.bodyHeight = $body.height();
        $(window).trigger('resize');
      }
    }
  };

  $.fn.tooltips = function( method ) {

    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltips' );
    }

  };
})(jQuery);
