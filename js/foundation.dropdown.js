!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Dropdown.
   * @class
   * @fires Dropdown#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Dropdown(element, options) {
    this.$element = element;
    this.options = $.extend(this.defaults, options || {});

    this.$openMenu = $();

    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Drilldown#init
     */
    this.$element.trigger('init.zf.dropdown');
  }

  /**
   * Default settings for plugin
   */
  Dropdown.prototype.defaults = {
    toggleOn: 'both' 
  };

  Dropdown.prototype._init = function() {
    this._prepareMenu(this.$element);
  };

  Dropdown.prototype._prepareMenu = function($elem) {
    var _this = this;

    $elem.children('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      if ($submenu.length) {
        $submenu.addClass('js-dropdown-nohover');

        $(this).children('a').on('click.zf.dropdown', function(event) {
          event.stopPropagation();

          _this.toggleMenu($submenu);

          return false;
        }).on('mouseenter.zf.dropdown', function(event) {
          event.stopPropagation();
          event.preventDefault();
        });

        _this._prepareMenu($submenu);
      }
    });
  };

  Dropdown.prototype.toggleMenu= function($target) {
    if ($target.is(this.$openMenu)) {
      this.$openMenu.removeClass('js-dropdown-active');
    }
    else {
      this.$openMenu.removeClass('js-dropdown-active');
      $target.addClass('js-dropdown-active');
      this.$openMenu = $target;
    }
  };

  Dropdown.prototype.destroy = function() {
    this.$element.find('li').each(function() {
      $(this)
        .children('[data-submenu]')
          .removeClass('js-dropdown-nohover')
          .end()
        .children('a')
          .off('.zf.dropdown');
    });
    this.$openMenu.removeClass('js-dropdown-active');
    this.$element.removeData('zf-plugin');
  };

  Foundation.plugin(Dropdown);
}(Foundation, jQuery);