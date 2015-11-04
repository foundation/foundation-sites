/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */
!function($, Foundation){
  'use strict';

  /**
   * Creates a new instance of a sticky thing.
   * @class
   * @param {jQuery} element - jQuery object to make sticky.
   * @param {Object} options - options object passed when creating the element programmatically.
   */
  function Sticky(element, options){
    this.$element = element;
    this.options = $.extend({}, Sticky.defaults, this.$element.data(), options);

    this._init();

    Foundation.registerPlugin(this);
  }
  Sticky.defaults = {
    stickToWindow: false,
    container: '<div data-sticky-container></div>',
    stickTo: 'top',
    stickAt: '',
    marginTop: 1,
    marginBottom: 1,
    stickyOn: 'medium',
    stickyClass: 'sticky',
    containerClass: 'sticky-container',
    checkEvery: 25
  };

  /**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * Also triggered by Foundation._reflow
   * @function
   * @private
   */
  Sticky.prototype._init = function(){
    var $parent = this.$element.parent('[data-sticky-container]'),
        id = this.$element[0].id || Foundation.GetYoDigits(6, 'sticky'),
        _this = this;

    if(!$parent.length){
      this.wasWrapped = true;
    }
    this.$container = $parent.length ? $parent : $(this.options.container).wrapInner(this.$element);
    this.$container.addClass(this.options.containerClass);

    this.$anchor = this.options.stickAt ? $(this.options.stickAt) : $(document.body);

    this.$element.addClass(this.options.stickyClass)
                 .attr({'data-resize': id});

    this.scrollCount = this.options.checkEvery;
    this.isStuck = false;

    this._setSizes(function(){
      _this._calc(false);
    });

    this._events(id.split('-').reverse().join('-'));
  };

  /**
   * Adds event handlers for the scrolling element.
   * @private
   * @param {String} id - psuedo-random id for unique scroll event listener.
   */
  Sticky.prototype._events = function(id){
    var _this = this,
        scrollListener = 'scroll.zf.' + id;

    if(this.canStick){
      this.isOn = true;
      this.$anchor.off('change.zf.sticky')
                  .on('change.zf.sticky', function(){
                    _this._setSizes(function(){
                      _this._calc(false);
                    });
                  });

      $(window).off(scrollListener)
               .on(scrollListener, function(e){
                if(_this.scrollCount){
                  _this.scrollCount--;
                  _this._calc(false, e.currentTarget.scrollY);
                }else{
                  _this.scrollCount = _this.options.checkEvery;
                  _this._setSizes(function(){
                    _this._calc(false, e.currentTarget.scrollY);
                  })
                }
              });
    }

    this.$element.off('resizeme.zf.trigger')
                 .on('resizeme.zf.trigger', function(e, el){
                     _this._setSizes(function(){
                       _this._calc(false);
                       if(_this.canStick){
                         if(!_this.isOn){
                           _this._events(id);
                         }
                       }else if(_this.isOn){
                         _this._pauseListeners(scrollListener);
                       }
                     });
    });
  };

  /**
   * Removes event handlers for scroll and change events on anchor.
   * @fires Sticky#pause
   * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
   */
  Sticky.prototype._pauseListeners = function(scrollListener){
    this.isOn = false;
    this.$anchor.off('change.zf.sticky');
    $(window).off(scrollListener);

    /**
     * Fires when the plugin is paused due to resize event shrinking the view.
     * @event Sticky#pause
     * @private
     */
     this.$element.trigger('pause.zf.sticky');
  };

  /**
   * Called on every `scroll` event and on `_init`
   * fires functions based on booleans and cached values
   * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
   * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.scrollY`.
   */
  Sticky.prototype._calc = function(checkSizes, scroll){
    if(checkSizes){ this._setSizes(); }

    if(!this.canStick){
      if(this.isStuck){
        this._removeSticky(true);
      }
      return false;
    }

    if(!scroll){ scroll = window.scrollY; }

    if(scroll >= this.topPoint){
      if(scroll <= this.bottomPoint){
        if(!this.isStuck){
          this._setSticky();
        }
      }else{
        if(this.isStuck){
          this._removeSticky(false);
        }
      }
    }else{
      if(this.isStuck){
        this._removeSticky(true);
      }
    }
  };
  /**
   * Causes the $element to become stuck.
   * Adds `position: fixed;`, and helper classes.
   * @fires Sticky#stuckto
   */
  Sticky.prototype._setSticky = function(){
    var stickTo = this.options.stickTo,
        mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
        notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
        css = {};

    css[mrgn] = this.options[mrgn] + 'em';
    css[stickTo] = 0;
    css[notStuckTo] = 'auto';
    this.isStuck = true;
    this.$element.removeClass('is-anchored is-at-' + notStuckTo)
                 .addClass('is-stuck is-at-' + stickTo)
                 .css(css)
				 .css("left",this.$container.offset().left + parseInt(this.$container.css("padding-left")))
                 /**
                  * Fires when the $element has become `position: fixed;`
                  * Namespaced to `top` or `bottom`.
                  * @event Sticky#stuckto
                  */
                 .trigger('sticky.zf.stuckto:' + stickTo);
  };

  /**
   * Causes the $element to become unstuck.
   * Removes `position: fixed;`, and helper classes.
   * Adds other helper classes.
   * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
   * @fires Sticky#unstuckfrom
   */
  Sticky.prototype._removeSticky = function(isTop){
    var stickTo = this.options.stickTo,
        stickToTop = stickTo === 'top',
        css = {}, mrgn, notStuckTo;
        mrgn = stickToTop ? 'marginTop' : 'marginBottom';
        notStuckTo = stickToTop ? 'bottom' : 'top';
      css[mrgn] = 0;

    if((isTop && !stickToTop) || (stickToTop && !isTop)){
      css[stickTo] = this.anchorHeight - this.elemHeight;
      css[notStuckTo] = 0;
    }else{
      css[stickTo] = 0;
      css[notStuckTo] = this.anchorHeight - this.elemHeight;
    }
    this.isStuck = false;
    this.$element.removeClass('is-stuck is-at-' + stickTo)
                 .addClass('is-anchored is-at-' + (isTop ? 'top' : 'bottom'))
                 .css(css)
				 .css("left","")
                 /**
                  * Fires when the $element has become anchored.
                  * Namespaced to `top` or `bottom`.
                  * @event Sticky#unstuckfrom
                  */
                 .trigger('sticky.zf.unstuckfrom:' + isTop ? 'top' : 'bottom');
  };

  /**
   * Sets the $element and $container sizes for plugin.
   * Calls `_setBreakPoints`.
   * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
   */
  Sticky.prototype._setSizes = function(cb){
    var _this = this,
        newElemWidth = this.$container[0].getBoundingClientRect().width,
        pdng = parseInt(window.getComputedStyle(this.$container[0])['padding-right'], 10);

    this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
    this.$element.css({
      'max-width': newElemWidth - pdng + 'px'
    });

    var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
    this.containerHeight = newContainerHeight;
    this.$container.css({
      height: newContainerHeight
    });
    this.elemHeight = newContainerHeight;
    this.canStick = Foundation.MediaQuery.atLeast(this.options.stickyOn);

    this._setBreakPoints(newContainerHeight, function(){
      if(cb){ cb(); }
    });

  };
  /**
   * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
   * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
   * @param {Function} cb - optional callback function to be called on completion.
   * @private
   */
  Sticky.prototype._setBreakPoints = function(elemHeight, cb){
    if(!this.canStick){
      if(cb){ cb(); }
      else{ return false; }
    }
    var mTop = emCalc(this.options.marginTop),
        mBtm = emCalc(this.options.marginBottom),
        topPoint = this.$anchor.offset().top,
        bottomPoint = topPoint + this.anchorHeight,
        winHeight = window.innerHeight;

    if(this.options.stickTo === 'top'){
      topPoint -= mTop;
      bottomPoint -= (elemHeight + mTop);
    }else if(this.options.stickTo === 'bottom'){
      topPoint -= (winHeight - (elemHeight + mBtm));
      bottomPoint -= (winHeight - mBtm);
    }else{
      //this would be the stickTo: both option... tricky
    }

    this.topPoint = topPoint;
    this.bottomPoint = bottomPoint;

    if(cb){ cb(); }
  };

  /**
   * Destroys the current sticky element.
   * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
   */
  Sticky.prototype.destroy = function(){
    this._removeSticky(true);

    this.$element.removeClass(this.options.stickyClass + ' is-anchored is-at-top')
                 .css({
                   height: '',
                   top: '',
                   bottom: '',
                   'max-width': ''
                 })
                 .off('resizeme.zf.trigger');

    this.$anchor.off('change.zf.sticky');
    $(window).off('scroll.zf.sticky');

    if(this.wasWrapped){
      this.$element.unwrap();
    }else{
      this.$container.removeClass(this.options.containerClass)
                     .css({
                       height: ''
                     });
    }
    Foundation.unregisterPlugin(this);
  };
  /**
   * Helper function to calculate em values
   * @param Number {em} - number of em's to calculate into pixels
   */
  function emCalc(em){
    return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
  }
  Foundation.plugin(Sticky);
}(jQuery, window.Foundation);
