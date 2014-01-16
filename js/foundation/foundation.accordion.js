;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.0.3',

    settings : {
      active_class: 'active',
      toggleable: true
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      $(this.scope)
      .off('.accordion')
      .on('click.fndtn.accordion', '[data-accordion] dd > a', function (e) {
        var accordion = $(this).closest('[data-accordion]'),
            target = $('#' + this.href.split('#')[1]),
            siblings = $(' dd > .content', accordion),
            settings = accordion.data('accordion-init'),
            active = $(' dd > .content.' + settings.active_class, accordion);

        e.preventDefault();

        if (active[0] == target[0] && settings.toggleable) {
          return target.toggleClass(settings.active_class);
        }

        siblings.removeClass(settings.active_class);
        target.addClass(settings.active_class);
      });
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
