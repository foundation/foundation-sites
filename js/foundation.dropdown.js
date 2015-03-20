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

  Dropdown.defaults = {
    toggleOn: 'both'
  };

  Dropdown.prototype = {
    _init: function() {
      this._prepareMenu(this.$element);
    },

    _prepareMenu: function($elem) {
      var _this = this;

      $elem.children('li').each(function() {
        var $submenu = $(this).children('[data-submenu]');

        if ($submenu.length) {
          $submenu.addClass('js-dropdown-nohover');

          $(this).children('a').click(function(event) {
            event.stopPropagation();

            _this.toggleMenu($submenu);

            return false;
          }).on('mouseenter', function(event) {
            event.stopPropagation();
            event.preventDefault();
          });

          _this._prepareMenu($submenu);
        }
      });
    },

    toggleMenu: function($target) {
      this.$openMenu.removeClass('js-dropdown-active');
      $target.toggleClass('js-dropdown-active');
      this.$openMenu = $target;
    }
  };

  Foundation.plugin('dropdown', Dropdown);
}(Foundation, jQuery);