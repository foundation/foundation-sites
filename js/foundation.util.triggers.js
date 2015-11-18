!function(Foundation, $) {
  // Elements with [data-open] will reveal a plugin that supports it when clicked.
  $(document).on('click.zf.trigger', '[data-open]', function() {
    var id = $(this).data('open');
    $('#' + id).triggerHandler('open.zf.trigger', [$(this)]);
  });

  // Elements with [data-close] will close a plugin that supports it when clicked.
  // If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
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
    var animation = $(this).data('closable') || 'fade-out';
    if(Foundation.Motion){
      Foundation.Motion.animateOut($(this), animation, function() {
        $(this).trigger('closed.zf');
      });
    }else{
      $(this).fadeOut().trigger('closed.zf');
    }
  });


//chris's testing things----------------



  //trying to reposition elements on resize
  //********* only fires when all other scripts have loaded *********
  /**
   * Fires once after all other scripts have loaded
   * @function
   * @private
   */
  $(window).load(function(){
    // checkWatchers(null);
    resizeListener();
    scrollListener();
    closemeListener();
	if ($('[data-mutate]').length >= 1) { dommutationobserver(); }
  });

  /**
   * Checks the global Foundation object for instantiated plugins.
   * @function
   * @param {String|Array} plugs - Name or array of names of plugins the user would like to add to the list of plugins to watch on window resize
   * @throws Plugin#error
   */
  // function checkWatchers(plugs) {
  //   var plugins = Foundation._plugins,
  //       pluginsToWatch = ['accordion-menu', 'drilldown', 'dropdown-menu', 'dropdown', 'slider', 'reveal', 'sticky', 'tooltip'];
  //   if(plugs){
  //     if(typeof plugs === 'array' && typeof plugs[0] === 'string'){
  //       pluginsToWatch = pluginsToWatch.concat(plugs);
  //     }else if(typeof plugs === 'string'){
  //       pluginsToWatch.push(plugs)
  //     }else{
  //       /**
  //        * Logs error if plugs is not a string or array.
  //        * @event Plugin#error
  //        */
  //       console.error('Plugin names must be strings');
  //     }
  //   }
  //   var counter = pluginsToWatch.length,
  //       watching = false;
  //
  //   while(counter){
  //     if(plugins[pluginsToWatch[counter - 1]]){
  //       watching = true;
  //     }else{
  //       pluginsToWatch.splice(counter - 1, 1);
  //     }
  //     --counter;
  //     if(!counter && watching){
  //       resizeListener(pluginsToWatch);
  //     }
  //   }
  // }

  //******** only fires this function once on load, if there's something to watch ********
  var closemeListener = function(pluginName){
    var yetiBoxes = $('[data-yeti-box]'),
        plugNames = ['dropdown', 'tooltip', 'reveal'];

    if(pluginName){
      if(typeof pluginName === 'string'){
        plugNames.push(pluginName);
      }else if(typeof pluginName === 'object' && typeof pluginName[0] === 'string'){
        plugNames.concat(pluginName);
      }else{
        console.error('Plugin names must be strings');
      }
    }
    if(yetiBoxes.length){
      var listeners = plugNames.map(function(name){
        return 'closeme.zf.' + name;
      }).join(' ');

      $(window).off(listeners).on(listeners, function(e, pluginId){
        var plugin = e.namespace.split('.')[0];
        var plugins = $('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');

        plugins.each(function(){
          var _this = $(this);

          _this.triggerHandler('close.zf.trigger', [_this]);
        });

      });
    }
  };
  var resizeListener = function(debounce){
    var timer, i, len,
        nodes = $('[data-resize]');
    if(nodes.length){
      $(window).off('resize.zf.trigger')
        .on('resize.zf.trigger', function(e){
          if(timer){ clearTimeout(timer); }

          timer = setTimeout(function(){

            for(i = 0, len = nodes.length; i < len; i++){
              var $elem = $(nodes[i]);
              $elem.triggerHandler('resizeme.zf.trigger', [$elem]);
            }
          }, debounce || 10);//default time to emit resize event
      });
    }
  };
  var scrollListener = function(debounce){
    var timer, i, len,
        nodes = $('[data-scroll]');
    if(nodes.length){
      $(window).off('scroll.zf.trigger')
        .on('scroll.zf.trigger', function(e){
          if(timer){ clearTimeout(timer); }

          timer = setTimeout(function(){

            for(i = 0, len = nodes.length; i < len; i++){
              var $elem = $(nodes[i]);
              $elem.triggerHandler('scrollme.zf.trigger', [$elem, window.scrollY]);
            }
          }, debounce || 50);//default time to emit scroll event
      });
    }
  }
  function dommutationobserver(debounce) {
	
	var timer, 
		targets = document.querySelectorAll('[data-mutate]');
	
		var MutationObserver = (function () {
			var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
				for (var i=0; i < prefixes.length; i++) {
					if (prefixes[i] + 'MutationObserver' in window) {
						 return window[prefixes[i] + 'MutationObserver'];
					}
				}
			return false;
		}());
		
				  
		//for each element that needs to listen for changes, but only listen for a change to data-mutate, this is the trigger
		for (var i = 0; i <= targets.length-1; i++) {
			var elementObserver = new MutationObserver(listeningElementsMutation);
			elementObserver.observe(targets[i], { attributes: true, childList: false, characterData: false, subtree:false, attributeFilter:["data-mutate"]});
		}
		
		//for the body, we need to listen for all changes, or you can target class, and style attributes, furthermore you could case switch based on the callback type
		var bodyObserver = new MutationObserver(bodyMutation);
		bodyObserver.observe(document.body, { attributes: true, childList: true, characterData: false, subtree:true});
		
		
		//body callback
		function bodyMutation() {
			//disconnect the body observer and trigger all listening elements by changing the data-mutate attr, we really don't need to change it, just "hitting" it fires a change
			if (timer) { clearTimeout(timer); }	
		
			timer = setTimeout(function() {
				bodyObserver.disconnect();
				$('[data-mutate]').attr('data-mutate',"");
			}, debounce || 50);
		}
		
		//element callback	
		function listeningElementsMutation(mutationRecordsList) {
			
			//trigger the event handler for the element
			$(mutationRecordsList[0].target).triggerHandler('mutate.zf.trigger');
			
			//if this is the last element to trigger from a listen, reconnect the body listener, this stops infinte loops
			if ($(mutationRecordsList[0].target).index('[data-mutate]') == targets.length-1) {
				bodyObserver.observe(document.body, { attributes: true, childList: true, characterData: false, subtree:true});
			}
		};
	};
// ------------------------------------

  // [PH]
// Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou = resizeListener;
Foundation.ISeeYou = scrollListener;
Foundation.IFeelYou = closemeListener;
Foundation.IWatchYou = dommutationobserver;

}(window.Foundation, window.jQuery);
