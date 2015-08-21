!function(Foundation, $) {
  $('[data-open]').on('click.zf.trigger', function() {
    var id = $(this).data('open');
    $('#' + id).triggerHandler('open.zf.trigger', [$(this)]);
  });

  $('[data-close]').on('click.zf.trigger', function() {
    var id = $(this).data('close');
    if (id) {
      $('#' + id).triggerHandler('close.zf.trigger', [$(this)]);
    }
    else {
      $(this).trigger('close.zf.trigger');
    }
  });

  $('[data-toggle]').on('click.zf.trigger', function() {
    var id = $(this).data('toggle');
    $('#' + id).triggerHandler('toggle.zf.trigger', [$(this)]);
  });


//chris's testing things----------------
  $(document).on('init.zf.dropdown init.zf.tooltip', function(e){
    var plugin = e.namespace.split('.')[0];
    // console.log('some stuff', plugin);
    $('[data-yeti-box]').on('click.zf.trigger', '[data-' + plugin + ']', function(){
      var id = $(this).data('yeti-box');
      console.log(this);
      $('#' + id).trigger('closeme.zf.trigger', $(this)/*, [id, $(this)]*/);
    });
  })
// ------------------------------------

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

  // [PH]
  $(document).on('close.zf.trigger', '[data-closable]', function() {
    var animation = $(this).data('closable') || 'fadeOut';

    Foundation.Motion.animateOut($(this), animation, function() {
      $(this).trigger('closed.zf');
    });
  });

}(window.Foundation, window.jQuery)
