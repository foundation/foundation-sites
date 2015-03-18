!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Drilldown.
   * @class
   * @fires Drilldown#init
   * @param {Object} element - jQuery object to make into a drilldown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Drilldown(element, options) {
    this.$element = element;
    this.options = $.extend(this.defaults, options);

    this.$container = $();
    this.$currentMenu = this.$element;

    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Drilldown#init
     */
    this.$element.trigger('init.zf.drilldown');
  }

  Drilldown.defaults = {}

  Drilldown.prototype._init = function() {
    this.$container = $('<div class="js-drilldown"></div>');
    this.$container.css('width', this.$element.css('width'));
    this.$element.wrap(this.$container);
    this._prepareMenu(this.$element, true);
  }

  Drilldown.prototype._prepareMenu = function($elem, root) {
    var _this = this;

    // Create a trigger to move up the menu
    if (!root) {
      var $backButton = $('<li><a class="js-drilldown-back">Back</a></li>');
      $backButton.click(function() {
        _this.backward();
      });
      $elem.prepend($backButton);
    }

    // Look for sub-menus inside the current one
    $elem.children('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      // If it exists...
      if ($submenu.length) {
        $submenu.addClass('js-drilldown-sub');

        // Create a trigger to move down the menu
        $(this).children('a').click(function() {
          _this.forward($submenu);
          return false;
        });

        // We have to go deeper
        _this._prepareMenu($submenu, false);
      }
    });
  }

  Drilldown.prototype.forward = function($target) {
    $target.addClass('js-drilldown-active');
    this.$currentMenu = $target;
  }

  Drilldown.prototype.backward = function() {
    this.$currentMenu.removeClass('js-drilldown-active');
    this.$currentMenu = this.$currentMenu.parents('[data-drilldown], [data-submenu]');
  }

  Foundation.plugin('drilldown', Drilldown);
}(window.Foundation, jQuery)