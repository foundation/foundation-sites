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
    step: 1,
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
    decimal: 0
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

    if(handles[1]){
      this.$handle2 = $(handles[1]);
      this.$input2 = inputs[1] ? $(inputs[1]) : $('#' + this.$handle2.attr('aria-controls'));
      var ariaId2 = this.$input2.hasAttr('id') ? this.$input2.attr('id') : randomIdGen(6);
      this.options.doubleSided = true;
      this.$handle2.attr(this._setHandleAttr(ariaId2, true));
      this.$input2.attr(this._setInputAttr(ariaId2, true));
      this._events(this.$handle2);
    }

    // if(this.options.initial){
    //   // startPoint = (this.options.initial / this.options.end).toFixed(2).split('.')[1] + '%';
    //   startPoint = (((this.options.initial / this.options.end).toFixed(2) * this.$element.outerWidth()) - this.$handle.outerWidth() / 2) + 'px';
    //   this.$handle.css('transform', 'translate('+ startPoint + ', -50%)');
    //   this.$fill.width(startPoint);
    //   // console.log(((this.$element.outerWidth()) - Math.round(this.$handle.outerWidth() / 2)) / 2 );
    //   // console.log(Foundation.GetDimensions(this.$handle) , '\n', startPoint);
    //
    // }else{
    //   startPoint = 0;
    //   this.$handle.css('left', startPoint);
    // }

    //*********this is in case we go to static, absolute positions instead of dynamic positioning********
    // this.setSteps(function(){
    //   _this._events();
    //   var initStart = _this.options.positions[_this.options.initialStart - 1] || null;
    //   var initEnd = _this.options.initialEnd ? _this.options.position[_this.options.initialEnd - 1] : null;
    //   if(initStart || initEnd){
    //     _this._setHandle(initStart, initEnd);
    //   }
    // });
    this._events(this.$handle);
  };

  Slider.prototype._setInputAttr = function(id, second){
    return {
      'value': second ? (this.options.initialEnd || this.options.end) : (this.options.initialStart || this.options.start),
      'id': id
    };
  };

  Slider.prototype._setHandleAttr = function(id, second){
    return {
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
        vertical = this.options.vertical,
        offset,
        timer;
    this.$element.off().on('click.zf.slider touchend.zf.slider', function(e){
      offset = e['offset' + (vertical ? 'Y' : 'X')];
      _this.clickSetHandle(offset);
      _this._setFill(offset);
    });

  };
  Slider.prototype.clickSetHandle = function(location){
    // console.log(((location / this.$element.outerWidth()).toFixed(2) * 1) + 1);
    console.log(Math.percent(location, this.$element.outerWidth(), 2));
    var translate = this.options.vertical ?
                        '-50%, ' + (location - this.$handle.outerHeight() / 2) + 'px' :
                        (location - this.$handle.outerWidth() / 2) + 'px, -50%';
    this.$handle.css({
      'transition': 'all .25s ease',
      'transform': 'translate(' + translate + ')'
    });
    this._setFill(location);
    // this.$fill.css({
    //   'transition': 'all .25s ease',
    //   'width': '50%'
    // });
  };
  // Slider.prototype._setHandle = function(lowPos, highPos){
  //   lowPos = lowPos.toFixed(2);
  //   var transLow = lowPos ? this.options.vertical ? '-50%,' + lowPos + 'px': lowPos + 'px, -50%' : this.options.vertical ? '-50%, 0px' : '0px, -50%';
  //   var transHigh = (highPos && this.options.doubleSided) ? this.options.vertical ? '-50%,' + highPos + 'px': highPos + 'px, -50%' : this.options.vertical ? '-50%, 0px' : '0px, -50%';
  //   console.log(transLow);
  //   this.$handle.css({
  //     'transform': 'translate(' + transLow + ')',
  //     '-webkit-transform': 'translate(' + transLow + ')'
  //   });
  //   if(this.options.doubleSided){
  //     this.$handle2.css({
  //       'transform': 'translate(' + transHigh + ')',
  //       '-webkit-transform': 'translate(' + transHigh + ')'
  //     });
  //   }
  //   // this._setFill();
  // };
  Slider.prototype._setHandle = function(location){
    var translate = this.options.vertical ?
                        '-50%, ' + (location - this.$handle.outerHeight() / 2) + 'px' :
                        (location - this.$handle.outerWidth() / 2) + 'px, -50%';
    var css = {
      'transition': 'all 0s ease',
      '-webkit-transform': 'translate3d(' + translate +', 0)',
      'transform': 'translate3d(' + translate + ', 0)',
    }
    this.$handle.css(css);
    // var translate = this.options.vertical ? (location - this.$handle.outerHeight() / 2) + 'px' : (location - this.$handle.outerWidth() / 2) + 'px',
        // orientation = this.options.vertical ? 'translateY' : 'translateX';
    // this.$handle.css({
    //   // 'transform': orientation + '(' + translate + ')'
    //   // '-webkit-transform': 'translateZ(0)',
    //   // 'transform': 'translateZ(0)',
    //   'transition': 'all 0s ease',
    //   '-webkit-transform': 'translate3d(' + translate +', 0)',
    //   'transform': 'translate3d(' + translate + ', 0)',
    //   'filter': 'blur(0)',
    //   '-webkit-filter': 'blur(0)'
    //   // '-webkit-transform': 'translate(' + translate +')',
    //   // 'transform': 'translate(' + translate + ')'
    // })
    this.calculateValue(location);
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
    // console.log(this.$input.val(), 'slider val');
  };
  Foundation.plugin(Slider);
  Math.percent = function(frac, num, dec){
    return Number((frac / num).toFixed(dec).split('.')[1]);
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
