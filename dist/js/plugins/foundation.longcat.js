var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Long Cat module.
   * By The Berndt Group
   * @module foundation.longCat
   */

  var LongCat = function () {
    /**
    * Creates a new instance of a Long Cat
    * @class
    * @param {jQuery} element - jQuery object to make into an Flickity Carousel.
    * @param {Object} options - Overrides to the default plugin settings.
    */
    function LongCat(element, options) {
      _classCallCheck(this, LongCat);

      this.$element = element;
      this.options = $.extend({}, LongCat.defaults, this.$element.data(), options);
      this.id = this.$element[0].id || Foundation.GetYoDigits(6, 'long-cat'); // eslint-disable-line new-cap
      if (this.options.initialCount == null || this.options.initialCount === false) {
        this.options.initialCount = this.options.count;
      }
      this.initial = true;
      this.position = 0;

      this._init();

      Foundation.registerPlugin(this, 'LongCat');
    }

    /**
    * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
    * @function
    * @private
    */


    _createClass(LongCat, [{
      key: '_init',
      value: function _init() {
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

    }, {
      key: '_events',
      value: function _events() {
        var _this = this;

        this.$trigger.on('click.zf.longcat', function () {
          _this.moreContent();
        });
      }

      /**
      * Add more visible content to the Long Cat element
      * @function
      */

    }, {
      key: 'moreContent',
      value: function moreContent() {
        var _this = this;
        var count = void 0;
        var end = void 0;

        var revealContent = function ($content) {
          $content.appendTo(_this.$visible).fadeIn();
        };

        if (this.initial) {
          this.initial = false;

          if (this.options.initialCount === 0) {
            return;
          } else {
            count = this.options.initialCount;
          }
        } else {
          count = this.options.count;
        }

        end = this.position + count;

        if (end > this.$hidden.length) {
          end = this.$hidden.length;
        }

        if (this.position < this.$hidden.length) {
          revealContent(this.$hidden.slice(this.position, end));
          this.position += count;
        } else {
          this.position = 0;
          revealContent(this.$hidden.slice(this.position, count));
        }

        if (this.position >= this.$hidden.length) {
          this.$trigger.fadeOut(function () {
            _this.$trigger.remove();
          });
        }
      }

      /**
      * Destroys the Long Cat and hides the element.
      * @function
      */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.off('.zf.longcat').find('*').off('.zf.longcat');
        this.$element.hide();
        Foundation.unregisterPlugin(this);
      }
    }]);

    return LongCat;
  }();

  LongCat.defaults = {
    /**
    * Number of hidden items to show at a time
    * @option
    * @type {number}
    * @default 10
    */
    count: 10,
    /**
    * Number of hidden items to show initially
    * @option
    * @type {number}
    * @default null
    */
    initialCount: null
  };

  // Window exports
  Foundation.plugin(LongCat, 'LongCat');
}(jQuery);