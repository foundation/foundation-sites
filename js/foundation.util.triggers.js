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
    eventsListener();
    resizeListener();
    scrollListener();
	//domMutationObserver();
    closemeListener();
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
    var timer;
		
	$(window).off('resize.zf.trigger')
		.on('resize.zf.trigger', function(e) {
			if (timer) { clearTimeout(timer); }
	
			timer = setTimeout(function() {
				//trigger all listening elements and signal a resize event
				$('[data-resize]').attr('data-events', "resize");
			}, debounce || 10);//default time to emit resize event
		});
		
  };
  var scrollListener = function(debounce){
    var timer;
	
      $(window).off('scroll.zf.trigger')
        .on('scroll.zf.trigger', function(e){
          if(timer){ clearTimeout(timer); }

          timer = setTimeout(function(){
			//trigger all listening elements and signal a scroll event  
            $('[data-scroll]').attr('data-events', "scroll");
          }, debounce || 50);//default time to emit scroll event
      });
    
  };
  function domMutationObserver(debounce) {
	// !!! This is coming soon and needs more work; not active  !!! //
	var timer, 
		nodes = document.querySelectorAll('[data-mutate]');
		
		if (nodes.length) {
			var MutationObserver = (function () {
				var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
					for (var i=0; i < prefixes.length; i++) {
						if (prefixes[i] + 'MutationObserver' in window) {
							 return window[prefixes[i] + 'MutationObserver'];
						}
					}
				return false;
			}());
			
			
			//for the body, we need to listen for all changes effecting the style and class attributes
			var bodyObserver = new MutationObserver(bodyMutation);
			bodyObserver.observe(document.body, { attributes: true, childList: true, characterData: false, subtree:true, attributeFilter:["style", "class"]});
			
			
			//body callback
			function bodyMutation(mutate) {
				//trigger all listening elements and signal a mutation event
				if (timer) { clearTimeout(timer); }	
			
				timer = setTimeout(function() {
					bodyObserver.disconnect();
					$('[data-mutate]').attr('data-events',"mutate");
				}, debounce || 150);
			}
		}
  };
  var eventsListener = function() {
	var nodes = document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');  
	
	if (nodes.length) {
		
		var MutationObserver = (function () {
			var prefixes = ['WebKit', 'Moz', 'O', 'Ms', '']
				for (var i=0; i < prefixes.length; i++) {
					if (prefixes[i] + 'MutationObserver' in window) {
						 return window[prefixes[i] + 'MutationObserver'];
					}
				}
			return false;
		}());
		
		//for each element that needs to listen for resizing, scrolling, (or coming soon mutation) add a single observer
		for (var i = 0; i <= nodes.length-1; i++) {
			var elementObserver = new MutationObserver(listeningElementsMutation);
			elementObserver.observe(nodes[i], { attributes: true, childList: false, characterData: false, subtree:false, attributeFilter:["data-events"]});
		}
		
		//element callback	
		function listeningElementsMutation(mutationRecordsList) {
			//trigger the event handler for the element depending on type
			switch ($(mutationRecordsList[0].target).attr("data-events")) {
			
				case "resize" :
					$(mutationRecordsList[0].target).triggerHandler('resizeme.zf.trigger', [$(mutationRecordsList[0].target)]);
					break;
				
				case "scroll" :
					$(mutationRecordsList[0].target).triggerHandler('scrollme.zf.trigger', [$(mutationRecordsList[0].target), window.scrollY]);		
					break;
					
				case "mutate" :
					$(mutationRecordsList[0].target).triggerHandler('mutate.zf.trigger');
					
					//make sure we don't get stuck in an infinite loop from sloppy codeing
					if ($(mutationRecordsList[0].target).index('[data-mutate]') == $("[data-mutate]").length-1) {
						domMutationObserver();
					}
					break;
					
				default :
					//nothing
			}
		};
	}
  };
// ------------------------------------

  // [PH]
// Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou = resizeListener;
Foundation.ISeeYou = scrollListener;
Foundation.IFeelYou = closemeListener;

}(window.Foundation, window.jQuery);
