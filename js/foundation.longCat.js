!(function($) {

/**
 * Long Cat module.
 * By The Berndt Group
 * @module foundation.longCat
 */

class LongCat {
  /**
  * Creates a new instance of a Long Cat
  * @class
  * @param {jQuery} element - jQuery object to make into an Flickity Carousel.
  * @param {Object} options - Overrides to the default plugin settings.
  */
  constructor(element, options) {
    this.$element = element;
    this.options = $.extend({}, LongCat.defaults, this.$element.data(), options);
    this.id = this.$element[0].id || Foundation.GetYoDigits(6, 'long-cat'); // eslint-disable-line new-cap

    this.position = 0;

    this._init();

    Foundation.registerPlugin(this, 'LongCat');
  }

  /**
  * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
  * @function
  * @private
  */
  _init() {
    this.$element.attr({
      'data-resize': this.id,
      'id': this.id
    });

    this.$visible = this.$element.find('[data-long-cat-visible]');
    this.$hidden = this.$element.find('[data-long-cat-hidden] > *');
    this.$trigger = this.$element.find('[data-long-cat-trigger]');

    this.$hidden.hide();

    this.moreContent();

    this._events();
  }

  /**
  * Adds event listeners to basically everything within the element.
  * @function
  * @private
  */
  _events() {
    var _this = this;

    this.$trigger.on('click.zf.longcat', function () {
      _this.moreContent();
    });
  }

  /**
  * Add more visible content to the Long Cat element
  * @function
  */
  moreContent() {
    var _this = this;

    var revealContent = function ($content) {
      $content
        .appendTo(_this.$visible)
        .fadeIn();
    };

    let end = this.position + this.options.count;

    if (end > this.$hidden.length) {
        end = this.$hidden.length;
    }

    if (this.position < this.$hidden.length) {
        revealContent(this.$hidden.slice(this.position, end))
        this.position += this.options.count;
    } else {
        this.position = 0;
        revealContent(this.$hidden.slice(this.position, this.options.count))
    }

    if (this.position >= this.$hidden.length) {
      this.$trigger.fadeOut(function () {
        this.$trigger.remove();
      });
    }
  }

  /**
  * Destroys the Long Cat and hides the element.
  * @function
  */
  destroy() {
    this.$element.off('.zf.longcat').find('*').off('.zf.longcat');
    this.$element.hide();
    Foundation.unregisterPlugin(this);
  }
}

LongCat.defaults = {
  /**
  * Number of hidden items to show at a time
  * @option
  * @type {number}
  * @default 10
  */
  count: 10
};

// Window exports
Foundation.plugin(LongCat, 'LongCat');

})(jQuery);
