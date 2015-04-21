!function($) {
  'use strict';

  function AccordionMenu(element, options) {
    this.$element = element;
    this.options = $.extend(AccordionMenu.defaults, options || {});

    this.$activeMenu = $();

    this._init();
    this._events();
  }

  AccordionMenu.prototype.defaults = {}

  AccordionMenu.prototype._init = function() {
    this.$element.find('[data-submenu]').slideUp(0);
  }

  AccordionMenu.prototype._events = function() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      if ($submenu.length) {
        $(this).children('a').on('click.zf.accordionMenu', function(e) {
          e.preventDefault();

          if (!$submenu.is(':hidden')) {
            _this.up($submenu);
          }
          else {
            _this.down($submenu);
          }
        });
      }
    });
  }

  AccordionMenu.prototype.down = function($target) {
    $target
      .parentsUntil(this.$element, '[data-submenu]')
      .addBack()
        .slideDown(250);
  }

  AccordionMenu.prototype.up = function($target) {
    $target.slideUp(250, function() {
      $target.find('[data-submenu]').slideUp(0);
    });
  }

  AccordionMenu.prototype.destroy = function() {
    this.$element.find('[data-submenu]').slideDown(0).css('display', '');
    this.$element.find('a').off('click.zf.accordionMenu');
  }

  Foundation.plugin('accordion-menu', AccordionMenu);
}(jQuery)