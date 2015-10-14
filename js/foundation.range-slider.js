!function($, Foundation){
  'use strict';

  function Slider(element){
    this.$element = element;
    this.options = $.extend({}, Slider.defaults, this.$element.data());

    this._init();
  }

  Slider.defaults = {
    start: 0,
    end: 100,
    // min: start,
    // max: end,
    step: 1,
    initialStart: 0,
    initialEnd: 100,
    binding: false,
    clickSelect: true,
    vertical: false,
    draggable: true,
    disabled: false,

    doubleSided: false,
    steps: 100,
    decimal: 2,
    dragDelay: 0,
    moveTime: 200//update this if changing the transition time in the sass
  };

  Slider.prototype._init = function(){
    this.inputs = this.$element.find('input');
    this.handles = this.$element.find('[data-slider-handle]');
    this.options.vertical = this.$element.hasClass('vertical');
    this.options.disabled = this.$element.hasClass('disabled');
    this.$handle = this.handles.eq(0);
    this.$input = this.inputs.length ? this.inputs.eq(0) : $('#' + this.$handle.attr('aria-controls'));
    this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

    if(!this.inputs.length){
      this.inputs = $().add(this.$input);
      this.options.binding = true;
    }

    this._setHandlePos(this.$handle, this.options.initialStart);
    this._setInitAttr(0)
    this._events(this.$handle);
    if(this.handles[1]){ //need to create array of inputs if they are visible
      this.options.doubleSided = true;
      this.$handle2 = this.handles.eq(1);
      this.$input2 = this.inputs.length ? this.inputs.eq(1) : $('#' + this.$handle2.attr('aria-controls'));

      if(!this.inputs[1]){
        this.inputs = this.inputs.add(this.$input2);
      }

      this._setHandlePos(this.$handle2, this.options.initialEnd);
      this._setInitAttr(1);
      this._events(this.$handle2);
    }

    this.$element.trigger('init.zf.slider');
  };

  Slider.prototype._setHandlePos = function($hndl, location, cb){//location is a number value between the `start` and `end` values of the slider bar.
  //might need to alter that slightly for bars that will have odd number selections.
  location = parseFloat(location);//on input change events, convert string to number...grumble.
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

    // prevent slider from running out of bounds
    if (location < _this.options.start) location = _this.options.start;
    else if (location > _this.options.end) location = _this.options.end;

    this._setValues($hndl, location);

    if(this.options.doubleSided){//update to calculate based on values set to respective inputs??
      var isLeftHndl = this.handles.index($hndl) === 0,
          dim,
          idx = this.handles.index($hndl);
          // console.log(this.inputs.eq(idx).val());

      if(isLeftHndl){
        css[lOrT] = (pctOfBar > 0 ? pctOfBar * 100 : 0) + '%';//
        dim = ((percent(this.$handle2.position()[lOrT] + halfOfHandle, elemDim) - parseFloat(pctOfBar)) * 100).toFixed(this.options.decimal) + '%';
        css['min-' + hOrW] = dim;
      }else{
        dim = ((parseFloat(pctOfBar) - (percent(this.$handle.position()[lOrT] - halfOfHandle, elemDim))) * 100);
        dim = (dim > 100 ? 100 : dim.toFixed(this.options.decimal)) + '%';
        css['min-' + hOrW] = (location < 100 ? location : 100) + '%';
      }
    }


    this.$element.off('transitionend.zf.slider')
                 .one('transitionend.zf.slider', function(){
                    _this.animComplete = true;
                    window.cancelAnimationFrame(anim);
                    _this.$element.trigger('moved.zf.slider');
    });

    function move(ts){//recursive function for animating handle movement.
      if(!start){ start = ts; }
      prog = ts - start;
      $hndl.css(lOrT, movement + '%');
      if(!_this.options.doubleSided){

        _this.$fill.css(hOrW, pctOfBar * 100 + '%');
      }else{
        _this.$fill.css(css);
      }

      if(prog < _this.options.moveTime){
        anim = window.requestAnimationFrame(move, $hndl[0]);
      }
      else{
        window.cancelAnimationFrame(anim);
      }
    };

  window.requestAnimationFrame(move);
  };
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
      'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
      'tabindex': 0
    });
  };
  Slider.prototype._setValues = function($handle, val){
    var _this = this,
        idx = this.options.doubleSided ? this.handles.index($handle) : 0;
    this.inputs.eq(idx).val(val);
    $handle.attr('aria-valuenow', val);
  };
  Slider.prototype._handleEvent = function(e, $handle, val){
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
          offsetPct = percent(barXY, barDim),
          value = (this.options.end - this.options.start) * offsetPct;

      if(!$handle){//figure out which handle it is, pass it to the next function.
        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
            secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
            $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
      }

    }else{//change event on input
      var value = val;
    }

    this._setHandlePos($handle, value);
  };

  Slider.prototype._events = function($handle){
    if(this.options.disabled){ return false; }


    var _this = this,
        curHandle,
        timer;

    if(this.options.binding){
      this.inputs.on('change.zf.slider', function(e){
        console.log('something');
        var idx = _this.inputs.index($(this));
        _this._handleEvent(e, _this.handles.eq(idx), $(this).val());
      });
    }


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

    //*****************************************************
    //** needs 1-to-1 dragging for moving handles around **
    //** any mega jQuery experts out there who can help? **
    //**method added for this, needs permission of author**
    //*****************************************************
    if(this.options.draggable){
      this.handles.addTouch();
      var curHandle,
          timer,
          $body = $('body');

      $handle
        .off('mousedown.zf.slider touchstart.zf.slider')
        .on('mousedown.zf.slider', function(e){
        // .on('mousedown.zf.slider touchstart.zf.slider', function(e){
          //if touch, preventDefault?
          // if(/touch/g.test(e.type)){
          //   e.preventDefault();
          // }

          $handle.addClass('is-dragging');
          _this.$fill.addClass('is-dragging');
          _this.$element.attr('data-dragging', true);
          _this.animComplete = false;
          curHandle = $(e.currentTarget);

          $body.on('mousemove.zf.slider', function(e){
          // $body.on('mousemove.zf.slider touchmove.zf.slider', function(e){
            // if(/touch/g.test(e.type)){
            //   e.preventDefault();
            // }
            timer = setTimeout(function(){
              _this._handleEvent(e, curHandle);
            }, _this.options.dragDelay);
          }).on('mouseup.zf.slider', function(e){
          // }).on('mouseup.zf.slider touchend.zf.slider', function(e){
            clearTimeout(timer);
            _this.animComplete = true;
            _this._handleEvent(e, curHandle);
            $handle.removeClass('is-dragging');
            _this.$fill.removeClass('is-dragging');
            _this.$element.data('dragging', false);
            // Foundation.reflow(_this.$element, 'slider');
            $body.off('mousemove.zf.slider mouseup.zf.slider');
          })
      });
    }
    $handle.on('keydown.zf.slider', function(e){
      var keyCode = e.keyCode || e.which,
        idx = _this.options.doubleSided ? _this.handles.index($(this)) : 0,
        oldValue = Number(_this.inputs.eq(idx).val()),
        newValue;

      var _$handle = $(this);
      // test with new key util
      Foundation.handleKey(e, _this, {
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
        }
      });
      if (newValue) { // if pressed key has special function, update value
        e.preventDefault();
        _this._setHandlePos(_$handle, newValue);
      }
    });

  };
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
      'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal'
    });
  };
  Slider.prototype._setValues = function($handle, val){
    var _this = this,
        idx = this.options.doubleSided ? this.handles.index($handle) : 0;
    this.inputs.eq(idx).val(val);
    $handle.attr('aria-valuenow', val);
  };

  Foundation.plugin(Slider);

  function percent(frac, num, dec){
    return (frac / num);
  }
  function absPosition($handle, dir, clickPos, param){
    return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
  }
  // $.fn.hasAttr = function(name) {
  //    return this.attr(name) !== undefined;
  // };
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
!function(){
  $.fn.addTouch = function(){
    this.each(function(i,el){
      $(el).bind('touchstart touchmove touchend touchcancel',function(){
        //we pass the original event object because the jQuery event
        //object is normalized to w3c specs and does not provide the TouchList
        handleTouch(event);
      });
    });

    var handleTouch = function(event){
      var touches = event.changedTouches,
          first = touches[0],
          eventTypes = {
            touchstart: 'mousedown',
            touchmove: 'mousemove',
            touchend: 'mouseup',
            mousemove: function(){
              event.preventDefault();
            },
            mousedown: function(){},
            mouseup: function(){}
          },
          type = eventTypes[event.type];
          eventTypes[type]();

      var simulatedEvent = document.createEvent('MouseEvent');
      simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0/*left*/, null);
      first.target.dispatchEvent(simulatedEvent);
    };
  };
}();
