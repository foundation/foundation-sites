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
    if(Foundation.Motion){
      Foundation.Motion.animateOut($(this), animation, function() {
        $(this).trigger('closed.zf');
      });
    }else{
      $(this).fadeOut().trigger('closed.zf');
    }
  });


//chris's testing things----------------
  /**
   * TODO put into public function, to add to user plugin creation api.
   */
  $(window).on('closeme.zf.dropdown closeme.zf.tooltip closeme.zf.reveal', function(e, pluginId){
    var plugin = e.namespace.split('.')[0];
    var plugins = $('[data-' + plugin + ']').not('[data-yeti-box=' + pluginId + ']');
    plugins.each(function(){
      $(this).triggerHandler('close.zf.trigger', [$(this)]);
    });
  });

  //trying to reposition elements on resize
  //********* only fires when all other scripts have loaded *********
  /**
   * Fires once after all other scripts have loaded
   * @function
   * @private
   */
  $(window).load(function(){
    checkWatchers(null);
  });

  /**
   * Checks the global Foundation object for instantiated plugins.
   * @function
   * @param {String|Array} plugs - Name or array of names of plugins the user would like to add to the list of plugins to watch on window resize
   * @throws Plugin#error
   */
  function checkWatchers(plugs) {
    var plugins = Foundation._plugins,
        pluginsToWatch = ['accordion-menu', 'drilldown', 'dropdown-menu', 'dropdown', 'slider', 'reveal', 'sticky', 'tooltip'];
    if(plugs){
      if(typeof plugs === 'array' && typeof plugs[0] === 'string'){
        pluginsToWatch = pluginsToWatch.concat(plugs);
      }else if(typeof plugs === 'string'){
        pluginsToWatch.push(plugs)
      }else{
        /**
         * Logs error if plugs is not a string or array.
         * @event Plugin#error
         */
        console.error('Plugin names must be strings');
      }
    }
    var counter = pluginsToWatch.length,
        watching = false;

    while(counter){
      if(plugins[pluginsToWatch[counter - 1]]){
        watching = true;
      }else{
        pluginsToWatch.splice(counter - 1, 1);
      }
      --counter;
      if(!counter && watching){
        resizeListener(pluginsToWatch);
      }
    }
  }

  //******** only fires this function once on load, if there's something to watch ********
  function resizeListener(){
    var timer, i, len,
        nodes = $('[data-resize]');
    if(nodes.length){
      $(window).off('resize.zf.trigger')
        .on('resize.zf.trigger', function(e){
          if(timer){ clearTimeout(timer); }

          timer = setTimeout(function(){

            for(i = 0, len = nodes.length; i < len; i++){
              var $elem = $(nodes[i])
              $elem.triggerHandler('resizeme.zf.trigger', [$elem]);
            }
          }, 150);//default time to emit resize event, make configurable? change for mobile?*******
      });
    }
  }
// ------------------------------------

  // [PH]
Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou = resizeListener;

}(window.Foundation, window.jQuery)
