/*jslint unparam: true, browser: true, indent: 2 */
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tab = {
    name : 'tab',

    version : '5.1.0',

    settings : {
      active_class: 'active',
      callback : function () {}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = this.S;

      S(this.scope).off('.tab').on('click.fndtn.tab', '[' + this.attr_name() + '] > dd > a', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var tab = S(this).parent(),
            tabs = tab.closest('[' + self.attr_name() + ']'),
            target = S('#' + this.href.split('#')[1]),
            siblings = tab.siblings(),
            settings = tabs.data(self.attr_name(true) + '-init');
        
        // allow usage of data-tab-content attribute instead of href
        if (S(this).data(self.data_attr('tab-content'))) {
          target = S('#' + S(this).data(self.data_attr('tab-content')).split('#')[1]);
        }
        
        tab.addClass(settings.active_class).triggerHandler('opened');
        siblings.removeClass(settings.active_class);
        target.siblings().removeClass(settings.active_class).end().addClass(settings.active_class);
        settings.callback(tab);
        tabs.triggerHandler('toggled', [tab]);
      });
    },

    data_attr: function (str) {
      if (this.namespace.length > 0) {
        return this.namespace + '-' + str;
      }

      return str;
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
