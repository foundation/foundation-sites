!function(Foundation, $) {
  'use strict';

  function Closable(element, options) {
    this.$element = element;

    element.on('close.zf', function() {
      var animation = element.data('closable') || 'fadeOut';

      Foundation.Motion.animateOut(element, animation, function() {
        element.trigger('closed.zf');
      });
    });
  }

  $(document).on('click', '[data-close]', function() {
    $(this).trigger('close.zf');
  });

  Foundation.plugin('closable', Closable);
}(Foundation, jQuery)
