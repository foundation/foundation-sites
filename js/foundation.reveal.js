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
    fullScreen: false,
    overlay: true
  };

  Reveal.prototype._init = function() {
    this.id = this.$element.attr('id');
    this.$anchor = $('[data-open=' + this.id + ']') || $('[data-toggle=' + this.id + ']');
    this.$anchor.attr({'data-close': this.id});
    this.options.fullScreen = this.$element.hasClass('full');
    if(this.options.overlay){
      this.$overlay = this.makeOverlay(this.id);
    }

    // this.$overlay = this.options.overlay ? this.makeOverlay(this.id) : '';
    // this.$element.detach().appendTo('body');
    this.options.vOffset = this.options.fullScreen ? 0 : Number(this.$element.css('margin-top').split('px')[0]);
    if(this.$element.hasClass('full')){
      console.log(this.$element);
    }
    if(this.options.closeBtn){
      this.$closeBtn = this.makeButton(this.id);
      this.$element.prepend(this.$closeBtn);
    }
    // this.$element.hide();
    this._events();
  };
  Reveal.prototype.makeOverlay = function(id){
    var $overlay = $('<div></div>').addClass('reveal-overlay').appendTo('body');
    if(this.options.closeOnClick){
      $overlay.attr({
        'data-close': this.id
      });
    }
    return $overlay;
  };
  Reveal.prototype.makeButton = function(id){
    var btn = $('<div></div>').css({
      display: 'block',
      content: 'U+2573',
      color: 'black',
      // top: '.5em',
      width: '2em',
      height: '2em',
      float: 'right',
      'z-index': 15
    }).attr({'data-close': id}).html('&2716;').addClass('whatever');
    return btn;
  };
  Reveal.prototype._events = function(){
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });
    if(this.options.closeOnClick){
      //do something//
    }
  };
  Reveal.prototype.addBodyEvents = function(){

  };
  Reveal.prototype.open = function(){
    this.isActive = true;
    var dims = Foundation.GetDimensions(this.$element);
    var checkHeight = (dims.height >= (0.8 * dims.windowDims.height)) || this.$element.hasClass('full');
    console.log(checkHeight);
    this.$element
        .css({'visibility': 'hidden'/*, 'margin-top': 0*/})
        .show()
        .offset(Foundation.GetOffsets(this.$element, null, checkHeight ? 'reveal' : 'center', this.options.vOffset))
        .hide()
        .css({
          'visibility': '',
          'max-height': dims.windowDims.height - (this.options.vOffset),
          'width': this.$element.hasClass('full') ? dims.windowDims.width : ''
        })
        .fadeIn('fast')
        .scrollTop(0);
    if(this.$element.hasClass('full')){
      console.log(this.$element.offset(), this.options.vOffset);
    }
    if(!this.options.overlay && this.options.closeOnClick){
      this.addBodyEvents();
    }
    if(this.closeOnEsc){

    }
    $('body').addClass('is-reveal-open');
    // this.$overlay.fadeIn('fast');
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
    // this.$overlay.fadeOut(this.options.animationOutDelay);
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
