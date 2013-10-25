;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.0.0',

    settings : {
      active_class: 'active'
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      $(this.scope).off('.accordion').on('click.fndtn.accordion', '[data-accordion] a', function (e) {
        var tab = $(this).parent(),
            target = $('#' + this.href.split('#')[1]),
            siblings = target.closest('[data-accordion]').find('.content'),
            settings = tab.parent().data('accordion-init');

        e.preventDefault();

        siblings.removeClass(settings.active_class);
        target.addClass(settings.active_class);
      });
    },

    off : function () {
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
