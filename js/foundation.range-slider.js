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
    initialStart: null,
    initialEnd: null,
    binding: false,
    clickSelect: true,
    vertical: false,
    draggable: true,
    disabled: false,
    // positions: [],
    doubleSided: false,
    steps: 100,
    decimal: 2,
    dragDelay: 250
  };

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }
  Slider.prototype._init = function(){
    var handles = this.$element.find('[data-slider-handle]'),
        inputs = this.$element.find('input'),
        _this = this,
        ariaId;

    this.options.vertical = this.$element.hasClass('vertical');
    this.options.disabled = this.$element.hasClass('disabled');
    this.options.steps = (this.options.end - this.options.start) / this.options.step;

    this.$fill = this.$element.find('.slider-fill').css('max-width', '0');
    this.$handle = $(handles[0]);
    this.$input = inputs[0] ? $(inputs[0]) : $('#' + this.$handle.attr('aria-controls'));

    ariaId = this.$input.hasAttr('id') ? this.$input.attr('id') : randomIdGen(6);
    this.$handle.attr(this._setHandleAttr(ariaId));
    this.$input.attr(this._setInputAttr(ariaId));

    this._events(this.$handle);
    if(handles[1]){
      this.$handle2 = $(handles[1]);
      this.$input2 = inputs[1] ? $(inputs[1]) : $('#' + this.$handle2.attr('aria-controls'));
      var ariaId2 = this.$input2.hasAttr('id') ? this.$input2.attr('id') : randomIdGen(6);
      var handleId2 = this.$handle2.hasAttr('id') ? this.$handle2.attr('id') : randomIdGen(6);
      this.options.doubleSided = true;
      this.$handle2.attr(this._setHandleAttr(ariaId2, true));
      this.$input2.attr(this._setInputAttr(ariaId2, true));
      this._events(this.$handle2);
    }
  };

  Slider.prototype._setInputAttr = function(id, second){
    return {
      'value': second ? (this.options.initialEnd || this.options.end) : (this.options.initialStart || this.options.start),
      'id': id
    };
  };

  Slider.prototype._setHandleAttr = function(id, second, handleId){
    return {
      'id': handleId,
      'role': 'slider',
      'aria-controls': id,
      'aria-valuemax': this.options.end,
      'aria-valuemin': this.options.start,
      'aria-valuenow': second ? (this.options.initialEnd || this.options.end) : (this.options.initialStart || this.options.start),
      'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal'
    };
  };

  Slider.prototype._events = function($handle){
    if(this.options.disabled){ return false; }
    var _this = this,
        $body = $('body'),
        curHandle,
        timer;
    $(window).on('resize.zf.slider', function(){
      setTimeout(function(){
        _this.setHandles();

      }, 100)
    });
    if(this.options.clickSelect){
      this.$element.off('click.zf.slider').on('click.zf.slider', function(e){
        if(_this.$element.data('dragging')){ return false; }
        _this._handleEvent(e);
      });
    }

    if(this.options.draggable){
      $handle
        .off('mousedown.zf.slider touchstart.zf.slider')
        .on('mousedown.zf.slider touchstart.zf.slider', function(e){
          $handle.addClass('dragging');
          _this.$fill.addClass('dragging');
          _this.$element.data('dragging', true);
          curHandle = $(e.currentTarget);

          $body.on('mousemove.zf.slider touchmove.zf.slider', function(e){
            timer = setTimeout(function(){
              _this._handleEvent(e, curHandle);
            }, _this.options.dragDelay);
          }).on('mouseup.zf.slider touchend.zf.slider', function(e){
            _this._handleEvent(e, curHandle);
            clearTimeout(timer);
            $body.on('transitionend', function(){
              console.log('ending yo');
            });
            $handle.removeClass('dragging');
            _this.$fill.removeClass('dragging');
            _this.$element.data('dragging', false);
            Foundation.reflow(_this.$element, 'slider');
            // console.log(_this.$input.val());
            $body.off('mousemove.zf.slider touchmove.zf.slider mouseup.zf.slider touchend.zf.slider');
          })
          $(document).on('animationend', function(){
            console.log('yo');
          });
      });
    }

  };
  Slider.prototype._handleEvent = function(event, $handle){
    event.preventDefault();
    var _this = this,
        vertical = this.options.vertical,
        param = vertical ? 'outerHeight' : 'outerWidth',
        direction = vertical ? 'top' : 'left',
        pageXY = vertical ? event.pageY : event.pageX,
        barXY = Math.abs(this.$element.offset()[direction] -  pageXY),
        eleDim = this.$element[param](),
        offsetPct = percent(barXY, eleDim, this.options.decimal),
        pxByPct = eleDim * (offsetPct / 100),
        pxByStep = (eleDim - this.$handle[param]()) / this.options.steps,
        attemptedSteps = Math.round((pxByPct / pxByStep)),
        steps = attemptedSteps > this.options.steps ? this.options.steps : attemptedSteps < 0 ? 0 : attemptedSteps,
        stepsPx = Math.round(steps * pxByStep),
        curHandle,
        translate;

    if(!$handle){
      if(this.options.doubleSided){
        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
            secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
            curHandle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
        this.setHandle(stepsPx, curHandle, vertical, function(){
        });
      }else{
        // var $input =
        curHandle = this.$handle;
        // this.$input.val(steps / this.options.steps * this.options.end)
        this.setHandle(stepsPx, this.$handle, vertical);
      }
    }else{
      this.setHandle(stepsPx, $handle, vertical, steps, function(){
      });
      this.$element.data('dragging', false);
    }
    this._setFill(steps, stepsPx, curHandle);
    this.setVal(steps);
  };
  Slider.prototype.setVal = function(steps){
    // console.log(Math.round(steps / this.options.steps * this.options.end));
    this.$input.val(Math.round(steps / this.options.steps * this.options.end));
  };
  Slider.prototype.setHandle = function(translatePx, $handle, vertical, steps, cb){
    var pct = percent(translatePx, vertical ? $handle.outerHeight() : $handle.outerWidth(), this.options.decimal) + '%';
    var translate = vertical ? '-50%, ' + pct : pct + ', -50%';

    $handle.css('transform', 'translate(' + translate + ')');
  };
  Slider.prototype.setHandles = function(){
    if(this.options.doubleSided){

    }
    var width = 0;
    while(!width){
      width = this.$fill.outerWidth();
    }
    console.log('something to check',this.$fill.outerWidth(), this.$element.offset().left);
    this.$handle.offset({'left': this.$fill.outerWidth() + 'px', 'top': '-50%'});
  };
  Slider.prototype._setFill = function(steps, px){
    if(!this.options.doubleSided){

      this.$fill.css({'max-width': Math.round(steps / this.options.steps * this.options.end) + '%', 'width': Math.round(steps / this.options.steps * this.options.end) + '%'});


    }else{
      // var which = Math.abs(px - this.$handle.position().left) < Math.abs(px - this.$handle2.position().left) ? this.$handle : this.$handle2;
      var isFirstHndl = Math.abs(px - this.$handle.position().left) < Math.abs(px - this.$handle2.position().left);
      var half = this.$handle.outerWidth() / 2;
      // console.log(this.$handle.position(), this.$handle2.position(), px + 'px', something, bool);
      if(isFirstHndl){
        //change offset left/top
        this.$fill.css({'left': Math.round(px + half) + 'px',
                        'max-width': Math.round(this.$handle2.position().left + half) + 'px',
                        'width': Math.round(Math.abs(px - this.$handle2.position().left) - half) + 'px'});
      }else{
        // change max width/height
        this.$fill.css({'max-width': Math.round(px + half) + 'px',
                        'width': Math.round(px - this.$handle.position().left + half),
                        'left': Math.round(this.$handle.position().left + half)});
      }
    }
  };
  Slider.prototype.calculateValue = function(steps, $input){
    // var val = Math.round((location / this.$element.outerWidth()) * this.options.end);
    // this.$input.val(val);
  };
  Foundation.plugin(Slider);

  function absPosition($handle, dir, clickPos, param){
    return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
  }

  function percent(frac, num, dec){
    return Number(((frac / num) * 100).toFixed(dec));
  };
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
