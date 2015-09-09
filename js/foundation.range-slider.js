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
    step: 5,
    initialStart: null,
    initialEnd: null,
    binding: false,
    clickSelect: true,
    vertical: false,
    draggable: true,
    disabled: false,
    positions: [],
    doubleSided: false,
    steps: 100,
    decimal: 2,
    dragDelay: 200
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
    this.$handle.attr(this._setHandleAttr(ariaId))
    this.$input.attr(this._setInputAttr(ariaId))



    //*********this is in case we go to static, absolute positions instead of dynamic positioning********
    // this.setSteps(function(){
    //   _this._events();
    //   var initStart = _this.options.positions[_this.options.initialStart - 1] || null;
    //   var initEnd = _this.options.initialEnd ? _this.options.position[_this.options.initialEnd - 1] : null;
    //   if(initStart || initEnd){
    //     _this._handleEvent(initStart, initEnd);
    //   }
    // });
    this._events(this.$handle);
    if(handles[1]){
      this.$handle2 = $(handles[1]);
      this.$input2 = inputs[1] ? $(inputs[1]) : $('#' + this.$handle2.attr('aria-controls'));
      var ariaId2 = this.$input2.hasAttr('id') ? this.$input2.attr('id') : randomIdGen(6);
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

  Slider.prototype._setHandleAttr = function(id, second){
    return {
      'id': randomIdGen(6),
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

    this.$element.off('click.zf.slider').on('click.zf.slider', function(e){
      console.log(_this.$element.data('dragging'));
      if(_this.$element.data('dragging')){ return false; }
      _this._handleEvent(e);
    });//need to check for closest handle on 2-handle sliders in _handleEvent()

    if(this.options.draggable){
      $handle
        .off('mousedown.zf.slider touchstart.zf.slider')
        .on('mousedown.zf.slider touchstart.zf.slider', function(e){
          _this.$element.data('dragging', true);
          curHandle = $(e.currentTarget);

          $body.on('mousemove.zf.slider touchmove.zf.slider', function(e){
            timer = setTimeout(function(){
              _this._handleEvent(e, curHandle);
            }, _this.options.dragDelay);
          }).on('mouseup.zf.slider touchend.zf.slider', function(e){
            _this._handleEvent(e, curHandle);
            clearTimeout(timer);
            Foundation.reflow(_this.$element, 'slider');
            $body.off('mousemove.zf.slider touchmove.zf.slider mouseup.zf.slider touchend.zf.slider');
          });
      });
    }

  };
  Slider.prototype._handleEvent = function(event, $handle){
    event.preventDefault();
    var _this = this,
        vertical = this.options.vertical,
        pageXY = vertical ? event.pageY : event.pageX,
        eleXY = vertical ? event.offsetY : event.offsetX,
        handleDim = $handle ? vertical ? $handle.outerHeight() : $handle.outerWidth() : null,
        eleDim = vertical ? this.$element.outerHeight() : this.$element.outerWidth(),
        offsetPx = ((pageXY - eleDim) - (handleDim / 2)),
        offsetPct = percent(eleXY, eleDim, this.options.decimal),
        translate;
    // console.log(offsetPct);



    if(!$handle){
      if(this.options.doubleSided){
        console.log('two sided click');
        //check for closest handle
      }else{
        offsetPct = percent(eleXY, eleDim, this.options.decimal);
        var pxByPct = Math.round(eleDim * (offsetPct / 100));
        // var something = percent(this.options.steps, eleDim, this.options.decimal);
        var pxByStep = (eleDim - this.$handle.outerWidth()) / this.options.steps;
        var check = pxByPct > pxByStep;
        var steps = Math.round((pxByPct / pxByStep))
        var stepsPx = Math.round(steps * pxByStep);
        // var step = stepsPx >= eleDim ? 
        translate = vertical ? '-50%, ' + stepsPx + 'px' : stepsPx + 'px, -50%';

        // this.setHandle(a,b);
        this.$handle.css('transform', 'translate(' + translate + ')');
        console.log('pxByStep',pxByStep,'pxByPct', pxByPct, steps);

      }
    }else{
      this.$element.data('dragging', true);
      console.log('dragging something');
      // this.$element.data('dragging', false);
    }
    // // var translate = this.options.vertical ?
    // //                     '-50%, ' + (location - this.$handle.outerHeight() / 2) + 'px' :
    // //                     (location - this.$handle.outerWidth() / 2) + 'px, -50%';
    // var translate = this.options.vertical ?
    // '-50% ' + ((location - this.$handle.outerHeight() / 2) / this.$element.outerHeight()).toFixed(this.options.decimal) * 100 + '%' :
    // ((location - this.$handle.outerWidth() / 2) / this.$element.outerWidth()).toFixed(this.options.decimal) * 100 + '% -50%'
    // console.log(translate);
    // var css = {
    //   'transition': 'all 0s ease',
    //   // '-webkit-transform': 'translate3d(' + translate +', 0)',
    //   'transform': 'translate(' + translate + ')'
    // }
    // this.$handle.css(css);
    // this.calculateValue(location);
    //
  };
  Slider.prototype._setFill = function(location){
    // console.log(location);
    // var v = this.options.vertical
    // var maxDim = v ? this.$element.outerHeight() : this.$element.outerWidth();
    // var dim = location > maxDim ? maxDim : location;
    // var max = 'max-' + (v ? 'height' : 'width');
    // var xy = v ? 'Y' : 'X';
    // this.$fill.css({
    //   'width': '',
    //   'transition': max + ' 25s ease',
    //   max: dim + 'px'
    //   // 'min-width': dim + 'px'
    // })
    // location = location >= this.$element['outer' + this.options.vertical ? 'Height' : 'Width']() ? this.$element['outer' + this.options.vertical ? 'Height' : 'Width']() : location;
    // this.$fill[this.options.vertical ? 'height' : 'width'](location);
  };
  Slider.prototype.calculateValue = function(location){
    var val = Math.round((location / this.$element.outerWidth()) * this.options.end);
    this.$input.val(val);
  };
  Foundation.plugin(Slider);


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
