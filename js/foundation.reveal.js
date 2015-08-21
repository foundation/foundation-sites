!function(Foundation, $) {
  'use strict';

  function Reveal(element, options) {
    this.$element = element;
    this.options = $.extend(this.defaults, options);
    this.targetClass = '';
    this.$target = $();

    this._init();
    // console.log(this.$element);

    this.$element.trigger('init.zf.reveal');
  }

  Reveal.prototype.defaults = {
    animationIn: 'fadeIn',
    animationOut: 'fadeOut',
    animationInDelay: 250,
    animationOutDelay: 250

  };

  Reveal.prototype._init = function() {
    this.id = this.$element.attr('id');
    this.$anchor = $('[data-open=' + this.id + ']') || $('[data-toggle=' + this.id + ']');
    this.$anchor.attr({'data-close': this.id});
    // this.$anchor.data('close', this.id);
    this.$element.hide();
    this._events();
  };
  Reveal.prototype._events = function(){
    var _this = this;
        // anchor = $(document).find('[data-open="' + this.$element.attr('id') + '"]');
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });


    // anchor.on('click.zf.reveal', function(e){
    //   e.preventDefault();
    //   //need to make this selectable.
    //   _this.$element.fadeIn('fast')
    // });
  };
  Reveal.prototype.open = function(){
    this.isActive = true;
    this.$element.fadeIn(this.options.animationInDelay);
    console.log('opening')
  };
  Reveal.prototype.close = function(){
    this.isActive = false;
    this.$element.fadeOut(this.options.animationOutDelay);
    console.log('closing');
  };
  Reveal.prototype.toggle = function(){
    console.log('toggling');
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
