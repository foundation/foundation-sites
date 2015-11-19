/**
 * Slider module.
 * @module foundation.slider
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 * @requires foundation.util.keyboard
 * @requires foundation.util.touch
 */
!function($, Foundation){
  'use strict';

  /**
   * Creates a new instance of a drilldown menu.
   * @class
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Slider(element, options){
    this.$element = element;
    this.options = $.extend({}, Slider.defaults, this.$element.data(), options);

    this._init();

    Foundation.registerPlugin(this);
    Foundation.Keyboard.register('Slider', {
      'ltr': {
        'ARROW_RIGHT': 'increase',
        'ARROW_UP': 'increase',
        'ARROW_DOWN': 'decrease',
        'ARROW_LEFT': 'decrease',
        'SHIFT_ARROW_RIGHT': 'increase_fast',
        'SHIFT_ARROW_UP': 'increase_fast',
        'SHIFT_ARROW_DOWN': 'decrease_fast',
        'SHIFT_ARROW_LEFT': 'decrease_fast'
      },
      'rtl': {
        'ARROW_LEFT': 'increase',
        'ARROW_RIGHT': 'decrease',
        'SHIFT_ARROW_LEFT': 'increase_fast',
        'SHIFT_ARROW_RIGHT': 'decrease_fast'
      }
    });
  }

  Slider.defaults = {
    /**
     * Minimum value for the slider scale.
     * @option
     * @example 0
     */
    start: 0,
    /**
     * Maximum value for the slider scale.
     * @option
     * @example 100
     */
    end: 100,
    /**
     * Minimum value change per change event. Not Currently Implemented!

     */
    step: 1,
    /**
     * Value at which the handle/input *(left handle/first input)* should be set to on initialization.
     * @option
     * @example 0
     */
    initialStart: 0,
    /**
     * Value at which the right handle/second input should be set to on initialization.
     * @option
     * @example 100
     */
    initialEnd: 100,
    /**
     * Allows the input to be located outside the container and visible. Set to by the JS
     * @option
     * @example false
     */
    binding: false,
    /**
     * Allows the user to click/tap on the slider bar to select a value.
     * @option
     * @example true
     */
    clickSelect: true,
    /**
     * Set to true and use the `vertical` class to change alignment to vertical.
     * @option
     * @example false
     */
    vertical: false,
    /**
     * Allows the user to drag the slider handle(s) to select a value.
     * @option
     * @example true
     */
    draggable: true,
    /**
     * Disables the slider and prevents event listeners from being applied. Double checked by JS with `disabledClass`.
     * @option
     * @example false
     */
    disabled: false,
    /**
     * Allows the use of two handles. Double checked by the JS. Changes some logic handling.
     * @option
     * @example false
     */
    doubleSided: false,
    /**
     * Potential future feature.
     */
    // steps: 100,
    /**
     * Number of decimal places the plugin should go to for floating point precision.
     * @option
     * @example 2
     */
    decimal: 2,
    /**
     * Time delay for dragged elements.
     */
    // dragDelay: 0,
    /**
     * Time, in ms, to animate the movement of a slider handle if user clicks/taps on the bar. Needs to be manually set if updating the transition time in the Sass settings.
     * @option
     * @example 200
     */
    moveTime: 200,//update this if changing the transition time in the sass
    /**
     * Class applied to disabled sliders.
     * @option
     * @example 'disabled'
     */
    disabledClass: 'disabled'
  };
  /**
   * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
   * @function
   * @private
   */
  Slider.prototype._init = function(){
    this.inputs = this.$element.find('input');
    this.handles = this.$element.find('[data-slider-handle]');

    this.$handle = this.handles.eq(0);
    this.$input = this.inputs.length ? this.inputs.eq(0) : $('#' + this.$handle.attr('aria-controls'));
    this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

    var isDbl = false,
        _this = this;
    if(this.options.disabled || this.$element.hasClass(this.options.disabledClass)){
      this.options.disabled = true;
      this.$element.addClass(this.options.disabledClass);
    }
    if(!this.inputs.length){
      this.inputs = $().add(this.$input);
      this.options.binding = true;
    }
    this._setInitAttr(0);
    this._events(this.$handle);

    if(this.handles[1]){
      this.options.doubleSided = true;
      this.$handle2 = this.handles.eq(1);
      this.$input2 = this.inputs.length ? this.inputs.eq(1) : $('#' + this.$handle2.attr('aria-controls'));

      if(!this.inputs[1]){
        this.inputs = this.inputs.add(this.$input2);
      }
      isDbl = true;

      this._setHandlePos(this.$handle, this.options.initialStart, true, function(){

        _this._setHandlePos(_this.$handle2, _this.options.initialEnd);
      });
      // this.$handle.triggerHandler('click.zf.slider');
      this._setInitAttr(1);
      this._events(this.$handle2);
    }

    if(!isDbl){
      this._setHandlePos(this.$handle, this.options.initialStart, true);
    }
  };
  /**
   * Sets the position of the selected handle and fill bar.
   * @function
   * @private
   * @param {jQuery} $hndl - the selected handle to move.
   * @param {Number} location - floating point between the start and end values of the slider bar.
   * @param {Function} cb - callback function to fire on completion.
   * @fires Slider#moved
   */
  Slider.prototype._setHandlePos = function($hndl, location, noInvert, cb){
  //might need to alter that slightly for bars that will have odd number selections.
    location = parseFloat(location);//on input change events, convert string to number...grumble.
    // prevent slider from running out of bounds
    if(location < this.options.start){ location = this.options.start; }
    else if(location > this.options.end){ location = this.options.end; }

    var isDbl = this.options.doubleSided,
        callback = cb || null;

    if(isDbl){
      if(this.handles.index($hndl) === 0){
        var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));
        location = location >= h2Val ? h2Val - this.options.step : location;
      }else{
        var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));
        location = location <= h1Val ? h1Val + this.options.step : location;
      }
    }

    if(this.options.vertical && !noInvert){
      location = this.options.end - location;
    }
    var _this = this,
        vert = this.options.vertical,
        hOrW = vert ? 'height' : 'width',
        lOrT = vert ? 'top' : 'left',
        halfOfHandle = $hndl[0].getBoundingClientRect()[hOrW] / 2,
        elemDim = this.$element[0].getBoundingClientRect()[hOrW],
        pctOfBar = percent(location, this.options.end).toFixed(this.options.decimal),
        pxToMove = (elemDim - halfOfHandle) * pctOfBar,
        movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal),
        location = location > 0 ? parseFloat(location.toFixed(this.options.decimal)) : 0,
        anim, prog, start = null, css = {};

    this._setValues($hndl, location);

    if(this.options.doubleSided){//update to calculate based on values set to respective inputs??
      var isLeftHndl = this.handles.index($hndl) === 0,
          dim,
          idx = this.handles.index($hndl);

      if(isLeftHndl){
        css[lOrT] = (pctOfBar > 0 ? pctOfBar * 100 : 0) + '%';//
        dim = /*Math.abs*/((percent(this.$handle2.position()[lOrT] + halfOfHandle, elemDim) - parseFloat(pctOfBar)) * 100).toFixed(this.options.decimal) + '%';
        css['min-' + hOrW] = dim;
        if(cb && typeof cb === 'function'){ cb(); }
      }else{
        location = (location < 100 ? location : 100) - (parseFloat(this.$handle[0].style.left) || this.options.end - location);
        css['min-' + hOrW] = location + '%';
      }
    }

    this.$element.one('finished.zf.animate', function(){
                    _this.animComplete = true;
                    /**
                     * Fires when the handle is done moving.
                     * @event Slider#moved
                     */
                    _this.$element.trigger('moved.zf.slider', [$hndl]);
                });
    var moveTime = _this.$element.data('dragging') ? 1000/60 : _this.options.moveTime;
    /*var move = new */Foundation.Move(moveTime, $hndl, function(){
      $hndl.css(lOrT, movement + '%');
      if(!_this.options.doubleSided){
        _this.$fill.css(hOrW, pctOfBar * 100 + '%');
      }else{
        _this.$fill.css(css);
      }
    });
    // move.do();
  };
  /**
   * Sets the initial attribute for the slider element.
   * @function
   * @private
   * @param {Number} idx - index of the current handle/input to use.
   */
  Slider.prototype._setInitAttr = function(idx){
    var id = this.inputs.eq(idx).attr('id') || Foundation.GetYoDigits(6, 'slider');
    this.inputs.eq(idx).attr({
      'id': id,
      'max': this.options.end,
      'min': this.options.start

    });
    this.handles.eq(idx).attr({
      'role': 'slider',
      'aria-controls': id,
      'aria-valuemax': this.options.end,
      'aria-valuemin': this.options.start,
      'aria-valuenow': idx === 0 ? this.options.initialStart : this.options.initialEnd,
      'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
      'tabindex': 0
    });
  };
  /**
   * Sets the input and `aria-valuenow` values for the slider element.
   * @function
   * @private
   * @param {jQuery} $handle - the currently selected handle.
   * @param {Number} val - floating point of the new value.
   */
  Slider.prototype._setValues = function($handle, val){
    var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
    this.inputs.eq(idx).val(val);
    $handle.attr('aria-valuenow', val);
  };
  /**
   * Handles events on the slider element.
   * Calculates the new location of the current handle.
   * If there are two handles and the bar was clicked, it determines which handle to move.
   * @function
   * @private
   * @param {Object} e - the `event` object passed from the listener.
   * @param {jQuery} $handle - the current handle to calculate for, if selected.
   * @param {Number} val - floating point number for the new value of the slider.
   */
  Slider.prototype._handleEvent = function(e, $handle, val){
    var value, hasVal;
    if(!val){//click or drag events
      e.preventDefault();
      var _this = this,
          vertical = this.options.vertical,
          param = vertical ? 'height' : 'width',
          direction = vertical ? 'top' : 'left',
          pageXY = vertical ? e.pageY : e.pageX,
          halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
          barDim = this.$element[0].getBoundingClientRect()[param],
          barOffset = (this.$element.offset()[direction] -  pageXY),
          barXY = barOffset > 0 ? -halfOfHandle : (barOffset - halfOfHandle) < -barDim ? barDim : Math.abs(barOffset),//if the cursor position is less than or greater than the elements bounding coordinates, set coordinates within those bounds
          // eleDim = this.$element[0].getBoundingClientRect()[param],
          offsetPct = percent(barXY, barDim);
      value = (this.options.end - this.options.start) * offsetPct;
      hasVal = false;

      if(!$handle){//figure out which handle it is, pass it to the next function.
        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
            secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
            $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
      }

    }else{//change event on input
      value = val;
      hasVal = true;
    }

    this._setHandlePos($handle, value, hasVal);
  };
  /**
   * Adds event listeners to the slider elements.
   * @function
   * @private
   * @param {jQuery} $handle - the current handle to apply listeners to.
   */
  Slider.prototype._events = function($handle){
    if(this.options.disabled){ return false; }

    var _this = this,
        curHandle,
        timer;

      this.inputs.off('change.zf.slider').on('change.zf.slider', function(e){
        var idx = _this.inputs.index($(this));
        _this._handleEvent(e, _this.handles.eq(idx), $(this).val());
      });

    if(this.options.clickSelect){
      this.$element.off('click.zf.slider').on('click.zf.slider', function(e){
        if(_this.$element.data('dragging')){ return false; }
        _this.animComplete = false;
        if(_this.options.doubleSided){
          _this._handleEvent(e);
        }else{
          _this._handleEvent(e, _this.$handle);
        }
      });
    }

    if(this.options.draggable){
      this.handles.addTouch();
      // var curHandle,
      //     timer,
      var $body = $('body');
      $handle
        .off('mousedown.zf.slider')
        .on('mousedown.zf.slider', function(e){
          $handle.addClass('is-dragging');
          _this.$fill.addClass('is-dragging');//
          _this.$element.data('dragging', true);
          _this.animComplete = false;
          curHandle = $(e.currentTarget);

          $body.on('mousemove.zf.slider', function(e){
            e.preventDefault();

            // timer = setTimeout(function(){
            _this._handleEvent(e, curHandle);
            // }, _this.options.dragDelay);
          }).on('mouseup.zf.slider', function(e){
            // clearTimeout(timer);
            _this.animComplete = true;
            _this._handleEvent(e, curHandle);
            $handle.removeClass('is-dragging');
            _this.$fill.removeClass('is-dragging');
            _this.$element.data('dragging', false);
            // Foundation.reflow(_this.$element, 'slider');
            $body.off('mousemove.zf.slider mouseup.zf.slider');
          });
      });
    }
    $handle.off('keydown.zf.slider').on('keydown.zf.slider', function(e){
      var idx = _this.options.doubleSided ? _this.handles.index($(this)) : 0,
        oldValue = parseFloat(_this.inputs.eq(idx).val()),
        newValue;

      var _$handle = $(this);

      // handle keyboard event with keyboard util
      Foundation.Keyboard.handleKey(e, _this, {
        decrease: function() {
          newValue = oldValue - _this.options.step;
        },
        increase: function() {
          newValue = oldValue + _this.options.step;
        },
        decrease_fast: function() {
          newValue = oldValue - _this.options.step * 10;
        },
        increase_fast: function() {
          newValue = oldValue + _this.options.step * 10;
        },
        handled: function() { // only set handle pos when event was handled specially
          e.preventDefault();
          _this._setHandlePos(_$handle, newValue, true);
        }
      });
      /*if (newValue) { // if pressed key has special function, update value
        e.preventDefault();
        _this._setHandlePos(_$handle, newValue);
      }*/
    });
  };
  /**
   * Destroys the slider plugin.
   */
   Slider.prototype.destroy = function(){
     this.handles.off('.zf.slider');
     this.inputs.off('.zf.slider');
     this.$element.off('.zf.slider');

     Foundation.unregisterPlugin(this);
   };

  Foundation.plugin(Slider);

  function percent(frac, num){
    return (frac / num);
  }
  function absPosition($handle, dir, clickPos, param){
    return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
  }
}(jQuery, window.Foundation);

//*********this is in case we go to static, absolute positions instead of dynamic positioning********
// this.setSteps(function(){
//   _this._events();
//   var initStart = _this.options.positions[_this.options.initialStart - 1] || null;
//   var initEnd = _this.options.initialEnd ? _this.options.position[_this.options.initialEnd - 1] : null;
//   if(initStart || initEnd){
//     _this._handleEvent(initStart, initEnd);
//   }
// });

//***********the other part of absolute positions*************
// Slider.prototype.setSteps = function(cb){
//   var posChange = this.$element.outerWidth() / this.options.steps;
//   var counter = 0
//   while(counter < this.options.steps){
//     if(counter){
//       this.options.positions.push(this.options.positions[counter - 1] + posChange);
//     }else{
//       this.options.positions.push(posChange);
//     }
//     counter++;
//   }
//   cb();
// };
