/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.tabs = {
    version : '4.0.0.alpha',

    settings : {
      callback: $.noop,
      deep_linking: true,
      init: false
    },

    init : function (scope, method, options) {
      this.scope = scope;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) this.events();
        if (this.settings.deep_linking) this.from_hash();

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope).on('click.fndtn.tabs', '.tabs a', function (e) {
        e.preventDefault();
        self.set_tab($(this).parent('dd, li'), e);
      });
      
      this.settings.init = true;
    },

    set_tab : function ($tab, e) {
      var $activeTab = $tab.closest('dl, ul').find('.active'),
          target = $tab.children('a').attr("href"),
          hasHash = /^#/.test(target),
          $content = $(target + 'Tab');

      if (hasHash && $content.length > 0) {
        // Show tab content
        console.log(e);
        if (e && !this.settings.deep_linking) e.preventDefault();
        $content.closest('.tabs-content').children('li').removeClass('active').hide();
        $content.css('display', 'block').addClass('active');
      }

      // Make active tab
      $activeTab.removeClass('active');
      $tab.addClass('active');

      this.settings.callback();
    },

    from_hash : function () {
      var hash = window.location.hash,
          $tab = $('a[href="' + hash + '"]');

      $tab.trigger('click.fndtn');
    },

    unbind : function () {
      $(this.scope).off('.fndtn.tabs');
    }
  };

}(Foundation.zj, this, this.document));
