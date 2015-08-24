!function(Foundation, $) {
  'use strict';

  function Reveal(element, options) {
    this.$element = element;
    this.options = $.extend(this.defaults, options);
    // this.targetClass = '';
    // this.$target = $();

    this._init();
    // console.log(this.$element);

    this.$element.trigger('init.zf.reveal');
  }

  Reveal.prototype.defaults = {
    animationIn: 'fadeIn',
    animationOut: 'fadeOut',
    animationInDelay: 250,
    animationOutDelay: 250,
    closeOnClick: true,
    closeOnEsc: true,
    multiOpened: false,
    closeBtn: true,
    closeBtnTemplate: '',
    vOffset: 100,
    hOffset: 0,
    overlay: true
  };

  Reveal.prototype._init = function() {
    this.id = this.$element.attr('id');
    this.$anchor = $('[data-open=' + this.id + ']') || $('[data-toggle=' + this.id + ']');
    this.$anchor.attr({'data-close': this.id});
    this.$overlay = this.options.overlay ? this.makeOverlay(this.id) : '';
    this.$element.detach().appendTo('body');
    this.options.vOffset = this.$element.hasClass('full') ? 0 : Number(this.$element.css('margin-top').split('px')[0]);
    console.log(this.$element.hasClass('full'));
    // if(this.options.closeBtn){
    //   this.$closeBtn = this.makeButton(this.id);
    //   this.$element.append(this.$closeBtn);
    // }
    // this.$element.hide();
    this._events();
  };
  Reveal.prototype.makeOverlay = function(id){
    return $('<div></div>').addClass('reveal-overlay').attr({
      'data-close': this.id
    }).appendTo('body');
  };
  // Reveal.prototype.makeButton = function(id){
  //   var btn = $('<div></div>').css({
  //     display: 'block',
  //     content: 'U+2573',
  //     // top: '.5em',
  //     width: '2em',
  //     height: '2em',
  //     float: 'right',
  //     'z-index': 15
  //   }).addClass('whatever');
  //   return btn;
  // };
  Reveal.prototype._events = function(){
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });

    this.$overlay.on('click.zf.reveal', function(){
      if(_this.isActive && _this.options.closeOnClick){
        _this.close();
      }
    });
  };
  Reveal.prototype.open = function(){
    this.isActive = true;
    var dims = Foundation.GetDimensions(this.$element);
    this.$element
        .css({'visibility': 'hidden', 'margin-top': 0})
        .show()
        .offset(Foundation.GetOffsets(this.$element, null, 'reveal', this.options.vOffset))
        .hide()
        .css({
          'visibility': '',
          'max-height': dims.windowDims.height - (this.options.vOffset)
        })
        .fadeIn('fast');
    if(this.$element.hasClass('full')){
      console.log(this.$element.offset(), this.options.vOffset);
    }
    $('body').addClass('is-reveal-open');
    this.$overlay.fadeIn('fast');
    // this.$element.offset({
    //   'top': 0,
    //   'left': (dims.windowDims.width / 2) - (dims.width)
    // }).show();
    // console.log(dims);
    // console.log(this.$element.offset());
    // this.$element.offset(Foundation.GetOffsets(this.$element, null, 'reveal', this.options.vOffset)).show();
    // console.log(this.$element.offset());
    // this.isActive = true;
    // this.$element.css('visibility', 'hidden').show().prependTo('body')
    // console.log(Foundation.GetOffsets(this.$element, $('body'), 'center bottom', this.options.vOffset, this.options.hOffset));
    // this.$element.offset(Foundation.GetOffsets(this.$element, $('body'), 'center bottom', this.options.vOffset, this.options.hOffset)).hide().css('visibility', '').fadeIn('fast');
    // // this.$element.appendTo('body').fadeIn(this.options.animationInDelay);
    // this.$overlay.fadeIn(this.options.animationInDelay);
    // // this.$element[this.options.animationIn](this.options.animationInDelay);
    // $('body').addClass('is-reveal-open');
    // console.log('opening')
    // Foundation.reflow(this.$element, 'reveal');
  };
  Reveal.prototype.close = function(){
    this.isActive = false;
    this.$element.fadeOut(this.options.animationOutDelay);
    this.$overlay.fadeOut(this.options.animationOutDelay);
    $('body').removeClass('is-reveal-open');
    // console.log('closing');
  };
  Reveal.prototype.toggle = function(){
    // console.log('toggling');
    if(this.isActive){
      this.close();
    }else{
      this.open();
    }
  };
  Foundation.plugin(Reveal);

  // // Exports for AMD/Browserify
  // if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  //   module.exports = Reveal;
  // if (typeof define === 'function')
  //   define(['foundation'], function() {
  //     return Reveal;
  //   });
  //
}(Foundation, jQuery);
