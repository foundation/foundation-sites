;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.0.1',

    settings : {
      active_class: 'active',
      toggleable: true
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      $(this.scope).off('.accordion').on('click.fndtn.accordion', '[data-accordion] > dd > a', function (e) {
        var accordion = $(this).parent(),
            target = $('#' + this.href.split('#')[1]),
						target_link = target.prev(),
            siblings = $('> dd > .content', target.closest('[data-accordion]')),
            settings = accordion.parent().data('accordion-init'),
            active = $('> dd > .content.' + settings.active_class, accordion.parent()),
						active_link = active.prev();

        e.preventDefault();

        if (active[0] == target[0] && settings.toggleable) {
          return target.toggleClass(settings.active_class) && target_link.toggleClass(settings.active_class);
        }

        siblings.removeClass(settings.active_class);
				active_link.removeClass(settings.active_class);
        target.addClass(settings.active_class)
				target_link.addClass(settings.active_class);
      });
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
