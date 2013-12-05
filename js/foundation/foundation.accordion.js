;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.0.1',

    settings : {
      active_class: 'active',
      toggleable: true,
      multi_expand: false
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      $(this.scope).off('.accordion').on('click.fndtn.accordion', '[data-accordion] > dd > a', function (e) {
        var accordion = $(this).parent(),
            target = $('#' + this.href.split('#')[1]),
            siblings = $('> dd > .content', target.closest('[data-accordion]')),
            settings = accordion.parent().data('accordion-init'),
            active = $('> dd > .content.' + settings.active_class, accordion.parent());

        e.preventDefault();

        if (active[0] == target[0] && settings.toggleable) {
        if (settings.toggleable && $.inArray(target[0], active) !== -1) {
          return target.toggleClass(settings.active_class);
        }

        if (!settings.multi_expand) {
          siblings.removeClass(settings.active_class);
        }
        target.addClass(settings.active_class);
      });
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
