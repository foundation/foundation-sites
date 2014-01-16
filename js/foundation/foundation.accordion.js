;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.accordion = {
    name : 'accordion',

    version : '5.1.0',

    settings : {
      active_class: 'active',
      toggleable: true
    },

    init : function (scope, method, options) {
      this.bindings(method, options); 
    },

    events : function () {
      var S = this.S;
      S(this.scope)
      .off('.fndtn.accordion')
      .on('click.fndtn.accordion', '[data-accordion] dd > a', function (e) {
        var accordion = S(this).closest('[data-accordion]'),
            target = S('#' + this.href.split('#')[1]),
            siblings = S(' dd > .content', accordion),
            settings = accordion.data('accordion-init'),
            active = S(' dd > .content.' + settings.active_class, accordion);


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