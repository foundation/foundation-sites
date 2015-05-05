!function(Foundation, $) {
  
  $('[data-open]').on('click.zf.trigger', function() {
    var id = $(this).data('open');
    $('#' + id).triggerHandler('open.zf.trigger', {
      origin: $(this)
    });
  });

  $('[data-close]').on('click.zf.trigger', function() {
    var id = $(this).data('close');
    $('#' + id).triggerHandler('close.zf.trigger', {
      origin: $(this)
    });
  });

  $('[data-toggle]').on('click.zf.trigger', function() {
    var id = $(this).data('toggle');
    $('#' + id).triggerHandler('toggle.zf.trigger', {
      origin: $(this)
    });
  });

  // [PH]
  $('[data-toggler-animate]').each(function() {
    var input = $(this).data('toggler-animate').split(' ');
    var animationIn = input[0];
    var animationOut = input[1];

    $(this).on({
      'open.zf.trigger': function() {
        Foundation.Motion.animateIn($(this), animationIn);
      },
      'close.zf.trigger': function() {
        Foundation.Motion.animateOut($(this), animationOut);
      },
      'toggle.zf.trigger': function() {
        var evt = $(this).is(':visible') ? 'close' : 'open';
        $(this).triggerHandler(evt + '.zf.trigger');
      }
    })
  });

}(window.Foundation, window.jQuery)