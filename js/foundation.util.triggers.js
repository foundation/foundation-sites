'use strict';


!function($) {

  let Motion = Foundation.Motion; // import { Motion } from "foundation.util.motion";

const MutationObserver = (function () {
  var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
  for (var i=0; i < prefixes.length; i++) {
    if (`${prefixes[i]}MutationObserver` in window) {
      return window[`${prefixes[i]}MutationObserver`];
    }
  }
  return false;
}());

const triggers = (el, type) => {
  el.data(type).split(' ').forEach(id => {
    $(`#${id}`)[ type === 'close' ? 'trigger' : 'triggerHandler'](`${type}.zf.trigger`, [el]);
  });
};

var Triggers = {
  jQueryListeners: {
    openListener: function() {
      triggers($(this), 'open');
    },
    closeListener: function() {
      let id = $(this).data('close');
      if (id) {
        triggers($(this), 'close');
      }
      else {
        $(this).trigger('close.zf.trigger');
      }
    },
    toggleListener: function() {
      let id = $(this).data('toggle');
      if (id) {
        triggers($(this), 'toggle');
      } else {
        $(this).trigger('toggle.zf.trigger');
      }
    },
    closeableListener: function(e) {
      e.stopPropagation();
      let animation = $(this).data('closable');

      if(animation !== ''){
        Foundation.Motion.animateOut($(this), animation, function() {
          $(this).trigger('closed.zf');
        });
      }else{
        $(this).fadeOut().trigger('closed.zf');
      }
    },
    toggleFocusListener: function() {
      let id = $(this).data('toggle-focus');
      $(`#${id}`).triggerHandler('toggle.zf.trigger', [$(this)]);
    }
  }
};

// Elements with [data-open] will reveal a plugin that supports it when clicked.
Triggers.addOpenListener = ($elem) => {
  $elem.off('click.zf.trigger', Triggers.jQueryListeners.openListener);
  $elem.on('click.zf.trigger', '[data-open]', Triggers.jQueryListeners.openListener);
}

// Elements with [data-close] will close a plugin that supports it when clicked.
// If used without a value on [data-close], the event will bubble, allowing it to close a parent component.
Triggers.addCloseListener = ($elem) => {
  $elem.off('click.zf.trigger', Triggers.jQueryListeners.closeListener);
  $elem.on('click.zf.trigger', '[data-close]', Triggers.jQueryListeners.closeListener);
}

// Elements with [data-toggle] will toggle a plugin that supports it when clicked.
Triggers.addToggleListener = ($elem) => {
  $elem.off('click.zf.trigger', Triggers.jQueryListeners.toggleListener);
  $elem.on('click.zf.trigger', '[data-toggle]', Triggers.jQueryListeners.toggleListener);
}

// Elements with [data-closable] will respond to close.zf.trigger events.
Triggers.addCloseableListener = ($elem) => {
  $elem.off('close.zf.trigger', Triggers.jQueryListeners.closeableListener);
  $elem.on('close.zf.trigger', '[data-closeable]', Triggers.jQueryListeners.closeableListener);
}

// Elements with [data-toggle-focus] will respond to coming in and out of focus
Triggers.addToggleFocusListener = ($elem) => {
  $elem.off('focus.zf.trigger blur.zf.trigger', Triggers.jQueryListeners.toggleFocusListener);
  $elem.on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', Triggers.jQueryListeners.toggleFocusListener);
}

/**
* Fires once after all other scripts have loaded
* @function
* @private
*/
$(window).on('load', () => {
  checkListeners();
});

function checkListeners() {
  eventsListener();
  resizeListener();
  scrollListener();
  closemeListener();
}

//******** only fires this function once on load, if there's something to watch ********
function closemeListener(pluginName) {
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
    let listeners = plugNames.map((name) => {
      return `closeme.zf.${name}`;
    }).join(' ');

    $(window).off(listeners).on(listeners, function(e, pluginId){
      let plugin = e.namespace.split('.')[0];
      let plugins = $(`[data-${plugin}]`).not(`[data-yeti-box="${pluginId}"]`);

      plugins.each(function(){
        let _this = $(this);

        _this.triggerHandler('close.zf.trigger', [_this]);
      });
    });
  }
}

function resizeListener(debounce){
  let timer,
      $nodes = $('[data-resize]');
  if($nodes.length){
    $(window).off('resize.zf.trigger')
    .on('resize.zf.trigger', function(e) {
      if (timer) { clearTimeout(timer); }

      timer = setTimeout(function(){

        if(!MutationObserver){//fallback for IE 9
          $nodes.each(function(){
            $(this).triggerHandler('resizeme.zf.trigger');
          });
        }
        //trigger all listening elements and signal a resize event
        $nodes.attr('data-events', "resize");
      }, debounce || 10);//default time to emit resize event
    });
  }
}

function scrollListener(debounce){
  let timer,
      $nodes = $('[data-scroll]');
  if($nodes.length){
    $(window).off('scroll.zf.trigger')
    .on('scroll.zf.trigger', function(e){
      if(timer){ clearTimeout(timer); }

      timer = setTimeout(function(){

        if(!MutationObserver){//fallback for IE 9
          $nodes.each(function(){
            $(this).triggerHandler('scrollme.zf.trigger');
          });
        }
        //trigger all listening elements and signal a scroll event
        $nodes.attr('data-events', "scroll");
      }, debounce || 10);//default time to emit scroll event
    });
  }
}

function eventsListener() {
  if(!MutationObserver){ return false; }
  let nodes = document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');

  //element callback
  var listeningElementsMutation = function (mutationRecordsList) {
      var $target = $(mutationRecordsList[0].target);

	  //trigger the event handler for the element depending on type
      switch (mutationRecordsList[0].type) {

        case "attributes":
          if ($target.attr("data-events") === "scroll" && mutationRecordsList[0].attributeName === "data-events") {
		  	$target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
		  }
		  if ($target.attr("data-events") === "resize" && mutationRecordsList[0].attributeName === "data-events") {
		  	$target.triggerHandler('resizeme.zf.trigger', [$target]);
		   }
		  if (mutationRecordsList[0].attributeName === "style") {
			  $target.closest("[data-mutate]").attr("data-events","mutate");
			  $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
		  }
		  break;

        case "childList":
		  $target.closest("[data-mutate]").attr("data-events","mutate");
		  $target.closest("[data-mutate]").triggerHandler('mutateme.zf.trigger', [$target.closest("[data-mutate]")]);
          break;

        default:
          return false;
        //nothing
      }
    };

    if (nodes.length) {
      //for each element that needs to listen for resizing, scrolling, or mutation add a single observer
      for (var i = 0; i <= nodes.length - 1; i++) {
        var elementObserver = new MutationObserver(listeningElementsMutation);
        elementObserver.observe(nodes[i], { attributes: true, childList: true, characterData: false, subtree: true, attributeFilter: ["data-events", "style"] });
      }
    }
  }

  Triggers.init = function($) {
    let $document = $(document);
    Triggers.addOpenListener($document);
    Triggers.addCloseListener($document);
    Triggers.addToggleListener($document);
    Triggers.addCloseableListener($document);
    Triggers.addToggleFocusListener($document);
  }

  Triggers.init($);

// ------------------------------------

// [PH]
// Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou = checkListeners;
// Foundation.ISeeYou = scrollListener;
// Foundation.IFeelYou = closemeListener;

}(jQuery);
