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
    moveTime: 200
  };

  Slider.prototype._init = function(){
    var inputs = this.$element.find('input'),
        handles = this.$element.find('[data-slider-handle]');
    this.options.vertical = this.$element.hasClass('vertical');
    this.options.disabled = this.$element.hasClass('disabled');
    this.$handle = handles.eq(0);
    this.$input = inputs.length ? inputs.eq(0) : $('#' + this.$handle.attr('aria-controls'));
    this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

    this._setHandlePos(this.$handle, this.options.initialStart);
    this._events(this.$handle);

    if(handles[1]){
      this.options.doubleSided = true;
      this.$handle2 = handles.eq(1);
      this.$input2 = inputs.length ? inputs.eq(1) : $('#' + this.$handle2.attr('aria-controls'));

      this._setHandlePos(this.$handle2, this.options.initialEnd);
      this._events(this.$handle2);
    }

    this.$element.trigger('init.zf.slider');
  };
  Slider.prototype._setHandlePos = function($hndl, location, cb){//location is a percentage of the slider bar. this is corrected for the width/height of the handle within this function, so don't account for that elsewhere.
  //might need to alter that slightly for bars that will have odd number selections.
    var _this = this,
        vert = this.options.vertical,
        hOrW = vert ? 'height' : 'width',
        lOrT = vert ? 'top' : 'left',
        halfOfHandle = $hndl[0].getBoundingClientRect()[hOrW] / 2,
        elemDim = this.$element[0].getBoundingClientRect()[hOrW],
        pctOfBar = percent(location, this.options.end/*, this.options.decimal*/).toFixed(this.options.decimal),
        pxToMove = (elemDim - halfOfHandle) * pctOfBar,
        movement = (percent(pxToMove, elemDim/*, this.options.decimal*/) * 100).toFixed(this.options.decimal),
        location = Number(location.toFixed(this.options.decimal)),
        anim, start = null;
        // console.log(pctOfBar, pxToMove, movement, halfOfHandle / elemDim);
    // console.log(pctOfBar, movement, location);
    this.$element.one('transitionend.zf.slider', function(){
      _this.animComplete = true;
      window.cancelAnimationFrame(anim);
      console.log(_this.animComplete);
      _this.$element.off('transitionend.zf.slider')
                    .trigger('moved.zf.slider');
    });
    !function move(ts){
      if(!start){ start = ts; }
      var prog = ts - start;

      $hndl.css(lOrT, movement + '%');
      _this.$fill.css(hOrW, pctOfBar * 100 + '%');

      if(prog < _this.options.moveTime){
        anim = window.requestAnimationFrame(move, $hndl[0]);
      }




      if(_this.animComplete){
        window.cancelAnimationFrame(anim);
      }
      // else{
      //   anim = window.requestAnimationFrame(move, $hndl[0]);
      // }
      // $hndl.css(lOrT, movement + '%');
      // _this.$fill.css(hOrW, pctOfBar * 100 + '%');
      // else{
      //   if(cb){
      //     $hndl.removeClass('dragging');
      //     _this.$fill.removeClass('dragging');
      //     _this.$element.data('dragging', false);
      //     cb();
      //   }
      //   _this.animComplete = true;
      // }
      console.log(_this.animComplete);
    }();
  };

  // Slider.prototype._calcPos = function(location, cb){
  //   var _this = this,
  //       pct = percent(location, this.options.end, this.options.decimal);
  //   return pct;
  //   // cb(pct);
  // };
  Slider.prototype._handleEvent = function(e, $handle){
    e.preventDefault();
    var _this = this,
        vertical = this.options.vertical,
        param = vertical ? 'height' : 'width',
        direction = vertical ? 'top' : 'left',
        pageXY = vertical ? e.pageY : e.pageX,
        something = (this.$element.offset()[direction] -  pageXY),
        barXY = something > 0 ? 0 : Math.abs(this.$element.offset()[direction] -  pageXY),//check for upper bound as well
        eleDim = this.$element[0].getBoundingClientRect()[param],
        offsetPct = percent(barXY, eleDim, this.options.decimal),
        thing = (this.options.end - this.options.start) * offsetPct;
        console.log(pageXY, something, barXY);
    if(!$handle){
      //figure out which handle it is.
      var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
          secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
          $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;

    }
        // pxByPct = (eleDim * offsetPct),
        // // pxByPct = (eleDim * offsetPct) * 100 / eleDim,
        // pxByStep = (eleDim - this.$handle[param]()) / this.options.steps,
        // attemptedSteps = Math.round((pxByPct / pxByStep)),
        // steps = attemptedSteps > this.options.steps ? this.options.steps : attemptedSteps < 0 ? 0 : attemptedSteps,
        // stepsPx = Math.round(steps * pxByStep);
        // console.log('eleDim', eleDim, 'offsetPct', offsetPct, 'thing', thing);
    this._setHandlePos($handle, thing);
  }
  Slider.prototype._events = function($handle){
    if(this.options.disabled){ return false; }

    var _this = this,
        curHandle,
        timer;

    if(this.options.clickSelect){
      this.$element.off('click.zf.slider').on('click.zf.slider', function(e){
        if(_this.$element.data('dragging')){ return false; }

        _this.animComplete = false;
        if(_this.options.doubleSided){ _this._handleEvent(e); }

        else{ _this._handleEvent(e, _this.$handle); }
      });
    }


    //*****************************************************
    //** needs 1-to-1 dragging for moving handles around **
    //** any mega jQuery experts out there who can help? **
    //*****************************************************
    if(this.options.draggable){
      var curHandle,
          timer,
          $body = $('body');

      $handle
        .off('mousedown.zf.slider touchstart.zf.slider')
        .on('mousedown.zf.slider touchstart.zf.slider', function(e){
          //if touch, preventDefault?
          // if(/touch/g.test(e.type)){
          //   e.preventDefault();
          // }
          // console.log(/touch/g.test(e.type));
          $handle.addClass('dragging');
          _this.$fill.addClass('dragging');
          _this.$element.attr('data-dragging', true);
          _this.animComplete = false;
          curHandle = $(e.currentTarget);

          $body.on('mousemove.zf.slider touchmove.zf.slider', function(e){
            // if(/touch/g.test(e.type)){
            //   e.preventDefault();
            // }
            timer = setTimeout(function(){
              _this._handleEvent(e, curHandle);
            }, _this.options.dragDelay);
          }).on('mouseup.zf.slider touchend.zf.slider', function(e){
            clearTimeout(timer);
            _this.animComplete = true;
            _this._handleEvent(e, curHandle);
            $handle.removeClass('dragging');
            _this.$fill.removeClass('dragging');
            _this.$element.data('dragging', false);
            // Foundation.reflow(_this.$element, 'slider');
            $body.off('mousemove.zf.slider touchmove.zf.slider mouseup.zf.slider touchend.zf.slider');
          })
      }).on('transitionend.zf.slider', function(){
        console.log('transitions over, go home');
      });
    }

  };

  Foundation.plugin(Slider);

  // function absPosition($handle, dir, clickPos, param){
  //   return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
  // }

  function percent(frac, num, dec){
    // return Number(((frac / num) * 100).toFixed(dec));
    // return Number((frac / num).toFixed(dec));
    return (frac / num);
  }
  function absPosition($handle, dir, clickPos, param){
    return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
  }


  $.fn.hasAttr = function(name) {
     return this.attr(name) !== undefined;
  };
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
