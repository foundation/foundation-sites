!function(Foundation, $) {
  // Elements with [data-open] will reveal a plugin that supports it when clicked.
  $(document).on('click.zf.trigger', '[data-open]', function() {
    var id = $(this).data('open');
    $('#' + id).triggerHandler('open.zf.trigger', [$(this)]);
  });

  // Elements with [data-close] will close a plugin that supports it when clicked.
  // If used without a value on [data-open], the event will bubble, allowing it to close a parent component.
  $(document).on('click.zf.trigger', '[data-close]', function() {
    var id = $(this).data('close');
    if (id) {
      $('#' + id).triggerHandler('close.zf.trigger', [$(this)]);
    }
    else {
      $(this).trigger('close.zf.trigger');
    }
  });

  // Elements with [data-toggle] will toggle a plugin that supports it when clicked.
  $(document).on('click.zf.trigger', '[data-toggle]', function() {
    var id = $(this).data('toggle');
    $('#' + id).triggerHandler('toggle.zf.trigger', [$(this)]);
  });

  // Elements with [data-closable] will respond to close.zf.trigger events.
  $(document).on('close.zf.trigger', '[data-closable]', function() {
    var animation = $(this).data('closable') || 'fadeOut';

    Foundation.Motion.animateOut($(this), animation, function() {
      $(this).trigger('closed.zf');
    });
  });


//chris's testing things----------------
  $(window).on('closeme.zf.dropdown closeme.zf.tooltip closeme.zf.reveal', function(e, pluginId){
    var plugin = e.namespace.split('.')[0];
    var plugins = $('[data-' + plugin + ']').not('[data-yeti-box=' + pluginId + ']');
    plugins.each(function(){
      $(this).triggerHandler('close.zf.trigger', [$(this)]);
    });
  });

  //trying to reposition elements on resize
  //********* only fires when all other scripts have loaded *********
  $(window).load(function(){
    var plugins = Foundation._plugins;
    var pluginsToWatch = ['accordion-menu', 'drilldown', 'dropdown-menu', 'dropdown', 'slider', 'reveal', 'sticky', 'tooltip'];
    var counter = pluginsToWatch.length;
    var watching = false
    while(counter){
      if(plugins[pluginsToWatch[counter - 1]]){
        watching = true;
      }else{
        pluginsToWatch.splice(counter - 1, 1);
      }
      --counter;
      if(!counter && watching){
        resizeHandler(pluginsToWatch);
      }
    }
  });

  //******** only fires this function once on load, if there's something to watch ********
  function resizeHandler(plugins){
    var timer, nodes, i, len;

    nodes = $('[data-resize]');
    $(window).on('resize.zf.trigger', function(e){
      if(timer){ clearTimeout(timer); }

      timer = setTimeout(function(){

        for(i = 0, len = nodes.length; i < len; i++){
          var $elem = $(nodes[i])
          $elem.triggerHandler('resizeme.zf.trigger', [$elem]);
        }
      }, 150);//default time to emit resize event, make configurable? change for mobile?*******
    });
  }
// ------------------------------------

  // [PH]


}(window.Foundation, window.jQuery)
