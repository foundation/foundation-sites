!function(Foundation, $) {
  'use strict';

  function Reveal(element, options) {
    this.$element = element;
    this.options = $.extend({}, this.defaults, this.$element.data());
    var bool = this.$element.attr('id') === 'exampleModal1'
    if(bool){
      console.log('default options',this.defaults);
      console.log('userset options',this.options);

    }
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
    btmOffsetPct: 10,
    closeText: '✖',
    overlay: true
  };
  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }
  // function hyphenate(str) {
  //   return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  // }

  Reveal.prototype._init = function(){
    // console.log(this.$element.data());
    var opts = this.$element.data();
    var optsArr = [];
    for(var o in opts){
      if(opts[o] === ''){
        delete opts[o];
      }
    }
    // console.log($.extend(this.options, opts));





    var anchorId = randomIdGen(6);
    this.id = this.$element.attr('id');
    this.$anchor = $('[data-open=' + this.id + ']') || $('[data-toggle=' + this.id + ']');
    this.$anchor.attr({
      'data-close': this.id,
      'aria-controls': this.id,
      'id': anchorId
    });
    this.options.fullScreen = this.$element.hasClass('full');
    if(this.options.overlay){
      this.$overlay = this.makeOverlay(this.id);
    }
    this.$element.attr({
      'role': 'dialog',
      'aria-hidden': true,
      'aria-labelledby': anchorId
      })
    this.options.vOffset = this.options.fullScreen ? 0 : Number(this.$element.css('margin-top').split('px')[0]);


    // if(this.$element.hasClass('full')){
    //   // console.log(this.$element);
    // }
    if(this.options.closeBtn || this.options.fullScreen){
      this.$closeBtn = this.makeButton(this.id);
      this.$element.append(this.$closeBtn);
    }
    this._events();
  };

  //overlay and button elements to be added to the body/modal
  Reveal.prototype.makeOverlay = function(id){
    var $overlay = $('<div></div>').addClass('reveal-overlay').appendTo('body');
    if(this.options.closeOnClick){
      $overlay.attr({
        'data-close': id,
        'tabindex': -1,
        'aria-hidden': true
      });
    }
    return $overlay;
  };
  Reveal.prototype.makeButton = function(id){
    var btn = $('<a>' + this.options.closeText + '</a>')
              .addClass('close-button')
              .attr({'data-close': this.id});
    return btn;
  };


  //event listeners and additional triggers that need to be managed
  Reveal.prototype._events = function(){
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });
    if(this.options.closeOnClick && this.options.overlay){
      this.$overlay.on('click.zf.reveal', this.close.bind(this));
    }
    if(this.$closeBtn){
      this.$closeBtn.on('click.zf.reveal', this.close.bind(this));
    }
  };

  Reveal.prototype.bodyClickClose = function(){
    var _this = this;
    var allButModal = $('body > *').not('#' + this.id + ', ' + this.id + ' > *');
    // var allButModal = $(window)/*.not('#' + this.id)*/;
    // console.log($('#' + this.id + ', ' + this.id + ' > *'));
    // allButModal.on('click.zf.reveal', this.close.bind(this));
    allButModal.on('click.zf.reveal', function(e){
      e.preventDefault();
      e.stopPropagation();
      _this.close();
    });
    this.$element.off('click.zf.reveal');

  };

  Reveal.prototype.escClose = function(){
    var _this = this;
    $(window).on('keyup.zf.reveal', function(e){
      // console.log(e.which);
      e.preventDefault();
      e.stopPropagation();
      if(e.which === 27){
        _this.close();
      }
    });
  };

  //open and close function
  Reveal.prototype.open = function(){
    var _this = this;
    this.isActive = true;
    var dims = Foundation.GetDimensions(this.$element);
    var checkMe = this.$element.hasClass('full') ? 'reveal full' : (dims.height >= (0.5 * dims.windowDims.height)) ? 'reveal' : 'center';
    // console.log(Foundation.MediaQuery.atLeast('medium'));
    this.$element
        .css({'visibility': 'hidden'})
        .show()
        .scrollTop(0);

    if(checkMe === 'reveal full'){
      this.$element
          .offset(Foundation.GetOffsets(this.$element, null, checkMe, this.options.vOffset))
          .css({
            'height': dims.windowDims.height,
            'width': dims.windowDims.width
          });
    }else if(!Foundation.MediaQuery.atLeast('medium')){
      this.$element
          .offset({
          'top': dims.windowDims.offset.top + this.options.vOffset,
          'left': this.options.hOffset + 1
          })
          .css({
            'width': dims.windowDims.width - (this.options.hOffset + 2)
          })
    }else{
      this.$element
          .offset(Foundation.GetOffsets(this.$element, null, checkMe, this.options.vOffset))
          .css({
            'max-height': dims.windowDims.height - (this.options.vOffset * (this.options.btmOffsetPct / 100 + 1))
          });
    }
    if(_this.options.overlay){
      _this.$overlay.fadeIn('fast').attr({'aria-hidden': false});
      $('body').attr({'aria-hidden': true});
    }
    this.$element
        // .css({'visibility': 'hidden'})
        // .show()
        // .scrollTop(0)
        // .offset(Foundation.GetOffsets(this.$element, null, checkMe, this.options.vOffset))
        .hide()
        .css({
          'visibility': ''
        //   'max-height': dims.windowDims.height - (this.options.vOffset),
        //   'width': this.$element.hasClass('full') ? dims.windowDims.width : ''
        })
        .fadeIn('fast', function(){
          _this.$element.attr({'aria-hidden': false})

          //conditionals for user updated settings
          if(_this.$element.hasClass('full')){
            // console.log(this.$element.offset(), this.options.vOffset);
          }

          if(!_this.options.overlay && _this.options.closeOnClick){
            _this.bodyClickClose();
          }


          if(_this.options.closeOnEsc){
            _this.escClose();
          }
        });
        // .scrollTop(0);
    // console.log(this.$overlay.css('background-color'));
    $('body').addClass('is-reveal-open');
    // Foundation.reflow();
    $.fn.foundation();
  };
  Reveal.prototype.close = function(){

    this.isActive = false;
    this.$element.fadeOut(this.options.animationOutDelay).attr({'aria-hidden': true});
    if(this.options.overlay){
      this.$overlay.fadeOut(this.options.animationOutDelay).attr({'aria-hidden': true});
    }
    if(this.options.closeOnEsc){
      $(window).off('keyup.zf.reveal');
    }
    if(!this.options.overlay && this.options.closeOnClick){
      var allButModal = $('*').not('#' + this.id);
      allButModal.off('click.zf.reveal');
    }

    $('body').removeClass('is-reveal-open').attr({'aria-hidden': false});
    // console.log(this.$overlay.css('background-color'));
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
