/*
 * jQuery Foundation Tooltip Plugin 2.0.1
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

;(function($) {
  'use strict';
  var settings = {
    bodyHeight : 0,
    targetClass : '.has-tip',
    tooltipClass : '.tooltip',
    tipTemplate : function (selector, content) {
      return '<span data-selector="' + selector + '" class="' + settings.tooltipClass.substring(1) + '">' + content + '<span class="nub"></span></span>';
    }
  },
  methods = {
    init : function (options) {
      return this.each(function () {
        var $body = $('body'),
          self = this;

        if (Modernizr.touch) {
          $body.on('click.tooltip touchstart.tooltip touchend.tooltip', settings.targetClass, function (e) {
            e.preventDefault();
            var $this = $(this);
            $(settings.tooltipClass).hide();
            methods.showOrCreateTip($this);
          });
          $(settings.tooltipClass).on('click.tooltip touchstart.tooltip touchend.tooltip', function (e) {
            e.preventDefault();
            $(this).fadeOut(150);
          });
        } else {
          $body.on('mouseover.tooltip mouseout.tooltip', settings.targetClass, function (e) {
            var $this = $(this);
            if (e.type === 'mouseover') {
              methods.showOrCreateTip($this);
            } else if (e.type === 'mouseout') {
              methods.hide($this);
            }
          });
        }

      });
    },
    showOrCreateTip : function ($target) {
      var $tip = methods.getTip($target);
      if ($tip && $tip.length > 0) {
        methods.show($target);
      } else {
        methods.create($target);
      }
    },
    getTip : function ($target) {
      var selector = methods.selector($target),
        tip = null;
      if (selector) tip = $('span[data-selector=' + selector + ']' + settings.tooltipClass);
      return (tip) ? tip : false;
    },
    selector : function ($target) {
      var id = $target.attr('id'),
        dataSelector = $target.data('selector');
      if (id === undefined && dataSelector === undefined) {
        dataSelector = 'tooltip' + Math.random().toString(36).substring(7);
        $target.attr('data-selector', dataSelector);
      }
      return (id) ? id : dataSelector;
    },
    create : function ($target) {
      var $tip = $(settings.tipTemplate(methods.selector($target), $target.attr('title'))),
          classes = methods.inheritable_classes($target);
      $tip.addClass(classes).appendTo('body');
      if (Modernizr.touch) $tip.append('<span class="tap-to-close">tap to close </span>');
      $target.removeAttr('title');
      methods.show($target);
    },
    reposition : function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, row, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = nub.outerHeight();
      nubWidth = nub.outerWidth();

      objPos = function (obj, top, right, bottom, left, width) {
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
      tip.css('visibility', 'visible').hide();
    },
    inheritable_classes : function (target) {
      var inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'noradius'],
      filtered = target.attr('class').split(' ').map(function (el, i) {
        if ($.inArray(el, inheritables) !== -1) {
          return el;
        }
      }).join(' ');
      return $.trim(filtered);
    },
    show : function ($target) {
      var $tip = methods.getTip($target);
      methods.reposition($target, $tip, $target.attr('class'));
      $tip.fadeIn(150);
    },
    hide : function ($target) {
      var $tip = methods.getTip($target);
      $tip.fadeOut(150);
    },
    reload : function () {
      var $self = $(this);
      return ($self.data('tooltips')) ? $self.tooltips('destroy').tooltips('init') : $self.tooltips('init');
    },
    destroy : function () {
      return this.each(function () {
        $(window).off('.tooltip');
        $(settings.targetClass).off('.tooltip');
        $(settings.tooltipClass).each(function(i) {
          $($(settings.targetClass).get(i)).attr('title', $(this).text());
        }).remove();
      });
    }
  };

  $.fn.tooltips = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.tooltips');
    }
  };
})(jQuery);