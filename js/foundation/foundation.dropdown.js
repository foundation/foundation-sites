;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '5.1.0',

    settings : {
      active_class: 'open',
      is_hover: false,
      opened: function(){},
      closed: function(){}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      this.bindings(method, options);
    },

    events : function (scope) {
      var self = this,
          S = self.S;

      S(this.scope)
        .off('.dropdown')
        .on('click.fndtn.dropdown', '[' + this.attr_name() + ']', function (e) {
          var settings = S(this).data(self.attr_name()) || self.settings;
          e.preventDefault();
          if (!settings.is_hover || Modernizr.touch) self.toggle(S(this));
        })
        .on('mouseenter.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          clearTimeout(self.timeout);

          if ($this.data('dropdown')) {
            var dropdown = S('#' + $this.data('dropdown')),
                target = $this;
          } else {
            var dropdown = $this;
                target = S("[" + self.attr_name() + "='" + dropdown.attr('id') + "']");
          }

          var settings = target.data(self.attr_name(true)) || self.settings;
          
          if(S(e.target).data('dropdown') && settings.is_hover) {
            self.closeall.call(self);
          }
          
          if (settings.is_hover) self.open.apply(self, [dropdown, target]);
        })
        .on('mouseleave.fndtn.dropdown', '[' + this.attr_name() + '], [' + this.attr_name() + '-content]', function (e) {
          var $this = S(this);
          self.timeout = setTimeout(function () {
            if ($this.data('dropdown')) {
              var settings = $this.data('dropdown-init') || self.settings;
              if (settings.is_hover) self.close.call(self, S('#' + $this.data('dropdown')));
            } else {
              var target = S('[data-dropdown="' + S(this).attr('id') + '"]'),
                  settings = target.data('dropdown-init') || self.settings;
              if (settings.is_hover) self.close.call(self, $this);
            }
          }.bind(this), 150);
        })
        .on('click.fndtn.dropdown', function (e) {
          var parent = S(e.target).closest('[data-dropdown-content]');

          if (S(e.target).data('dropdown') || S(e.target).parent().data('dropdown')) {
            return;
          }
          if (!(S(e.target).data('revealId')) && 
            (parent.length > 0 && (S(e.target).is('[data-dropdown-content]') || 
              $.contains(parent.first()[0], e.target)))) {
            e.stopPropagation();
            return;
          }

          self.close.call(self, S('[data-dropdown-content]'));
        })
        .on('opened.fndtn.dropdown', '[data-dropdown-content]', function () {
            self.settings.opened.call(this);
        })
        .on('closed.fndtn.dropdown', '[data-dropdown-content]', function () {
            self.settings.closed.call(this);
        });

      S(window)
        .off('.dropdown')
        .on('resize.fndtn.dropdown', self.throttle(function () {
          self.resize.call(self);
        }, 50)).trigger('resize');
    },

    close: function (dropdown) {
      var self = this;
      dropdown.each(function () {
        if (self.S(this).hasClass(self.settings.active_class)) {
          self.S(this)
            .css(Foundation.rtl ? 'right':'left', '-99999px')
            .removeClass(self.settings.active_class);
          self.S(this).trigger('closed');
        }
      });
    },

    closeall: function() {
      var self = this;
      $.each(self.S('[data-dropdown-content]'), function() {
        self.close.call(self, self.S(this))
      });
    },

    open: function (dropdown, target) {
        this
          .css(dropdown
            .addClass(this.settings.active_class), target);
        dropdown.trigger('opened');
    },

    toggle : function (target) {
      var dropdown = this.S('#' + target.data('dropdown'));
      if (dropdown.length === 0) {
        // No dropdown found, not continuing
        return;
      }

      this.close.call(this, this.S('[data-dropdown-content]').not(dropdown));

      if (dropdown.hasClass(this.settings.active_class)) {
        this.close.call(this, dropdown);
      } else {
        this.close.call(this, this.S('[data-dropdown-content]'))
        this.open.call(this, dropdown, target);
      }
    },

    resize : function () {
      var dropdown = this.S('[data-dropdown-content].open'),
          target = this.S("[data-dropdown='" + dropdown.attr('id') + "']");

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      var offset_parent = dropdown.offsetParent(),
          position = target.offset();

      position.top -= offset_parent.offset().top;
      position.left -= offset_parent.offset().left;

      if (this.small()) {
        dropdown.css({
          position : 'absolute',
          width: '95%',
          'max-width': 'none',
          top: position.top + target.outerHeight()
        });
        dropdown.css(Foundation.rtl ? 'right':'left', '2.5%');
      } else {
        if (!Foundation.rtl && this.S(window).width() > dropdown.outerWidth() + target.offset().left) {
          var left = position.left;
          if (dropdown.hasClass('right')) {
            dropdown.removeClass('right');
          }
        } else {
          if (!dropdown.hasClass('right')) {
            dropdown.addClass('right');
          }
          var left = position.left - (dropdown.outerWidth() - target.outerWidth());
        }

        dropdown.attr('style', '').css({
          position : 'absolute',
          top: position.top + target.outerHeight(),
          left: left
        });
      }

      return dropdown;
    },

    small : function () {
      return matchMedia(Foundation.media_queries.small).matches &&
        !matchMedia(Foundation.media_queries.medium).matches;
    },

    off: function () {
      this.S(this.scope).off('.fndtn.dropdown');
      this.S('html, body').off('.fndtn.dropdown');
      this.S(window).off('.fndtn.dropdown');
      this.S('[data-dropdown-content]').off('.fndtn.dropdown');
      this.settings.init = false;
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
