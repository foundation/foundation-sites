;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tooltip = {
    name : 'tooltip',

    version : '5.0.0',
    
    settings : {
      additional_inheritable_classes : [],
      tooltip_class : '.tooltip',
      append_to: 'body',
      touch_close_text: 'Tap To Close',
      disable_for_touch: false,
      tip_template : function (selector, content) {
        return '<span data-selector="' + selector + '" class="' 
          + Foundation.libs.tooltip.settings.tooltip_class.substring(1) 
          + '">' + content + '<span class="nub"></span></span>';
      }
    },

    cache : {},

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this;
      
      $(this.scope)
        .off('.tooltip')
        .on('mouseenter.fndtn.tooltip touchstart.fndtn.tooltip', 
            '[data-tooltip]:not(".open")', function (e) {
          var $this = $(this),
              settings = $.extend({}, self.settings, self.data_options($this)),
              is_touch = /touchstart/i.test(e.type);
            
            if(settings.disable_for_touch && is_touch) {
              return;
            }
            else if(!settings.disable_for_touch && self.is_touch) {
              e.preventDefault();
            }
            
            // Close all tooltips so they don't overlap
            $('.open[data-tooltip]').each(function() {
                self.hide($(this));
            });
            
            if(is_touch) {
              $this.data('tooltip-open-event-type', 'touch');
            } else {
              $this.data('tooltip-open-event-type', 'mouse');
            }
            
            self.showOrCreateTip($this);
        })
        .on('mouseleave.fndtn.tooltip touchstart.fndtn.tooltip', '.open[data-tooltip]', function (e) {
          if($(this).data('tooltip-open-event-type') == 'touch' && e.type == 'mouseleave') {
            return;
          }
          self.hide($(this));
        });
    },

    showOrCreateTip : function ($target) {
      var $tip = this.getTip($target);
      
      if ($tip && $tip.length > 0) {
        return this.show($target);
      }

      return this.create($target);
    },

    getTip : function ($target) {
      var selector = this.selector($target),
          tip = null;

      if (selector) {
        var settings = $.extend({}, this.settings, this.data_options($('[data-tooltip="' + selector + '"]'))),
        tip = $('[data-selector="' + selector + '"]' + settings.tooltip_class);
      }

      return (typeof tip === 'object') ? tip : false;
    },

    selector : function ($target) {
      var id = $target.attr('id'),
          dataSelector = $target.attr('data-tooltip') || $target.attr('data-selector');

      if ((id && id.length < 1 || !id) && typeof dataSelector != 'string') {
        dataSelector = 'tooltip' + Math.random().toString(36).substring(7);
        $target.attr('data-selector', dataSelector);
      }

      return (id && id.length > 0) ? id : dataSelector;
    },

    create : function ($target) {
      var self = this,
          settings = $.extend({}, this.settings, this.data_options($target)),
          tip_template = this.settings.tip_template;
      
      if(typeof settings.tip_template === 'string' && window.hasOwnProperty(settings.tip_template))
      {
        tip_template = window[settings.tip_template];
      }
      
      var $tip = $(tip_template(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
          classes = this.inheritable_classes($target);

      $tip.addClass(classes).appendTo(settings.append_to);
      if ($target.data('tooltip-open-event-type') == 'touch') {
        $tip.append('<span class="tap-to-close">'+settings.touch_close_text+'</span>');
        $tip.on('click.fndtn.tooltip touchstart.fndtn.tooltip', function(e) {
          self.hide($target);
        });
      }
      $target.removeAttr('title').attr('title','');
      this.show($target);
    },

    reposition : function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, column, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = nub.outerHeight();
      nubWidth = nub.outerHeight();
      
      tip.css({'width' : (width) ? width : 'auto'});

      objPos = function (obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : (top) ? top : 'auto',
          'bottom' : (bottom) ? bottom : 'auto',
          'left' : (left) ? left : 'auto',
          'right' : (right) ? right : 'auto',
        }).end();
      };

      objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', target.offset().left);

      if (this.small()) {
        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', 12.5, $(this.scope).width());
        tip.addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        var left = target.offset().left;
        if (Foundation.rtl) {
          left = target.offset().left + target.offset().width - tip.outerWidth();
        }
        objPos(tip, (target.offset().top + target.outerHeight() + 10), 'auto', 'auto', left);
        tip.removeClass('tip-override');
        if (classes && classes.indexOf('tip-top') > -1) {
          objPos(tip, (target.offset().top - tip.outerHeight()), 'auto', 'auto', left)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-left') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left - tip.outerWidth() - nubHeight))
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-right') > -1) {
          objPos(tip, (target.offset().top + (target.outerHeight() / 2) - (tip.outerHeight() / 2)), 'auto', 'auto', (target.offset().left + target.outerWidth() + nubHeight))
            .removeClass('tip-override');
        }
      }

      tip.css('visibility', 'visible').hide();
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches;
    },

    inheritable_classes : function ($target) {
      var settings = $.extend({}, this.settings, this.data_options($target)),
          inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'noradius'].concat(settings.additional_inheritable_classes),
          classes = $target.attr('class'),
          filtered = classes ? $.map(classes.split(' '), function (el, i) {
            if ($.inArray(el, inheritables) !== -1) {
              return el;
            }
          }).join(' ') : '';

      return $.trim(filtered);
    },

    show : function ($target) {
      var $tip = this.getTip($target);

      this.reposition($target, $tip, $target.attr('class'));
      $target.addClass('open');
      $tip.fadeIn(150);
    },

    hide : function ($target) {
      var $tip = this.getTip($target);
      
      $target.removeClass('open');
      $tip.fadeOut(150);
    },

    // deprecate reload
    reload : function () {
      var $self = $(this);

      return ($self.data('fndtn-tooltips')) ? $self.foundationTooltips('destroy').foundationTooltips('init') : $self.foundationTooltips('init');
    },

    off : function () {
      var self = this;
      $(this.scope).off('.fndtn.tooltip');
      $('[data-tooltip]').each(function (i) {
        $(this).attr('title', $(this).text());
        self.getTip($(this)).remove();
      });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
