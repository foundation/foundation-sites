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
    step: 20,
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


    //*********this is in case we go to static, absolute positions instead of dynamic positioning********
    // this.setSteps(function(){
    //   _this._events();
    //   var initStart = _this.options.positions[_this.options.initialStart - 1] || null;
    //   var initEnd = _this.options.initialEnd ? _this.options.position[_this.options.initialEnd - 1] : null;
    //   if(initStart || initEnd){
    //     _this._handleEvent(initStart, initEnd);
    //   }
    // });
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

  Slider.prototype._events = function($handle){
    if(this.options.disabled){ return false; }
    var _this = this,
        $body = $('body'),
        curHandle,
        timer;
    if(this.options.clickSelect){
      this.$element.off('click.zf.slider').on('click.zf.slider', function(e){
        if(_this.$element.data('dragging')){ return false; }
        _this._handleEvent(e);
      });//need to check for closest handle on 2-handle sliders in _handleEvent()
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
            _this.$element.on('transitionend.zf.slider', function(){
              $handle.removeClass('dragging');
              _this.$fill.removeClass('dragging');
              _this.$element.data('dragging', false);
            });
            Foundation.reflow(_this.$element, 'slider');
            // console.log(_this.$input.val());
            $body.off('mousemove.zf.slider touchmove.zf.slider mouseup.zf.slider touchend.zf.slider');
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
        translate;

    if(!$handle){
      if(this.options.doubleSided){
        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
            secndHndlPos = absPosition(this.$handle2, direction, barXY, param),
            curHandle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
        this.setHandle(stepsPx, curHandle, vertical, function(){
        });
      }else{
        // var $input =

        // this.$input.val(steps / this.options.steps * this.options.end)
        this.setHandle(stepsPx, this.$handle, vertical);
      }
    }else{
      this.setHandle(stepsPx, $handle, vertical, function(){
      });
      this.$element.data('dragging', false);
    }
    this._setFill(steps);
    this.setVal(steps);
  };
  Slider.prototype.setVal = function(steps){
    // console.log(Math.round(steps / this.options.steps * this.options.end));
    this.$input.val(Math.round(steps / this.options.steps * this.options.end));
  };
  Slider.prototype.setHandle = function(translatePx, $handle, vertical, cb){
    var translate = vertical ? '-50%, ' + translatePx + 'px' : translatePx + 'px, -50%';
    $handle.css('transform', 'translate(' + translate + ')');
    if(cb) cb();
  };
  Slider.prototype._setFill = function(steps){
    console.log(Math.round(steps / this.options.steps * this.options.end));
    // this.$fill.css('t')
    this.$fill.css({'max-width': Math.round(steps / this.options.steps * this.options.end) + '%', 'width': Math.round(steps / this.options.steps * this.options.end) + '%'});
    console.log(this.$fill.css('max-width'));
  };
  Slider.prototype.calculateValue = function(location){
    var val = Math.round((location / this.$element.outerWidth()) * this.options.end);
    this.$input.val(val);
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

//   $.fn.draggable = function(){
//     var $this = this,
//     ns = 'draggable_'+(Math.random()+'').replace('.',''),
//     mm = 'mousemove.'+ns,
//     mu = 'mouseup.'+ns,
//     $w = $(window),
//     isFixed = ($this.css('position') === 'fixed'),
//     adjX = 0, adjY = 0;
//     console.log(mu);
//     $this.mousedown(function(ev){
//       console.log(ev);
//         var pos = $this.offset();
//         if (isFixed) {
//             adjX = $w.scrollLeft(); adjY = $w.scrollTop();
//         }
//         var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
//         $this.data(ns,{ x : ox, y: oy });
//         $w.on(mm, function(ev){
//             ev.preventDefault();
//             ev.stopPropagation();
//             if (isFixed) {
//                 adjX = $w.scrollLeft(); adjY = $w.scrollTop();
//             }
//             var offset = $this.data(ns);
//             $this.css({left: ev.pageX - adjX - offset.x, top: ev.pageY - adjY - offset.y});
//         });
//         $w.on(mu, function(){
//             $w.off(mm + ' ' + mu).removeData(ns);
//         });
//     });
//
//     return this;
// };
