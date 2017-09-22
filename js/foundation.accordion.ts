'use strict';

import $ from 'jquery';
import { Plugin } from './foundation.plugin';
import { GetYoDigits } from './foundation.util.core';
import { Keyboard } from './foundation.util.keyboard';

/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 */

class Accordion extends Plugin {

  public static className = 'Accordion'; // ie9 back compat

  /**
   * Creates a new instance of an accordion.
   * @class
   * @name Accordion
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   * @param {Object} options - a plain object with settings to override the default options.
   */
  public _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, Accordion.defaults, this.$element.data(), options);

    this._init();

    Keyboard.register('Accordion', {
      ENTER: 'toggle',
      SPACE: 'toggle',
      ARROW_DOWN: 'next',
      ARROW_UP: 'previous',
    });
  }

  /**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */
  public _init() {
    this.$element.attr('role', 'tablist');
    this.$tabs = this.$element.children('[data-accordion-item]');

    this.$tabs.each(function(idx, el) {
      let $el = $(el),
          $content = $el.children('[data-tab-content]'),
          id = $content[0].id || GetYoDigits(6, 'accordion'),
          linkId = el.id || `${id}-label`;

      $el.find('a:first').attr({
        'aria-controls': id,
        'role': 'tab',
        'id': linkId,
        'aria-expanded': false,
        'aria-selected': false,
      });

      $content.attr({'role': 'tabpanel', 'aria-labelledby': linkId, 'aria-hidden': true, 'id': id});
    });
    let $initActive = this.$element.find('.is-active').children('[data-tab-content]');
    this.firstTimeInit = true;
    if ($initActive.length){
      this.down($initActive, this.firstTimeInit);
      this.firstTimeInit = false;
    }

    this._checkDeepLink = () => {
      let anchor = window.location.hash;
      //need a hash and a relevant anchor in this tabset
      if (anchor.length) {
        let $link = this.$element.find('[href$="' + anchor + '"]'),
        $anchor = $(anchor);

        if ($link.length && $anchor) {
          if (!$link.parent('[data-accordion-item]').hasClass('is-active')) {
            this.down($anchor, this.firstTimeInit);
            this.firstTimeInit = false;
          }

          //roll up a little to show the titles
          if (this.options.deepLinkSmudge) {
            let _this = this;
            $(window).load(function() {
              let offset = _this.$element.offset();
              $('html, body').animate({ scrollTop: offset.top }, _this.options.deepLinkSmudgeDelay);
            });
          }

          /**
            * Fires when the zplugin has deeplinked at pageload
            * @event Accordion#deeplink
            */
          this.$element.trigger('deeplink.zf.accordion', [$link, $anchor]);
        }
      }
    };

    //use browser to open a tab, if it exists in this tabset
    if (this.options.deepLink) {
      this._checkDeepLink();
    }

    this._events();
  }

  /**
   * Adds event handlers for items within the accordion.
   * @private
   */
  public _events() {
    let _this = this;

    this.$tabs.each(function() {
      let $elem = $(this);
      let $tabContent = $elem.children('[data-tab-content]');
      if ($tabContent.length) {
        $elem.children('a').off('click.zf.accordion keydown.zf.accordion')
               .on('click.zf.accordion', function(e) {
          e.preventDefault();
          _this.toggle($tabContent);
        }).on('keydown.zf.accordion', function(e){
          Keyboard.handleKey(e, 'Accordion', {
            toggle() {
              _this.toggle($tabContent);
            },
            next() {
              let $a = $elem.next().find('a').focus();
              if (!_this.options.multiExpand) {
                $a.trigger('click.zf.accordion');
              }
            },
            previous() {
              let $a = $elem.prev().find('a').focus();
              if (!_this.options.multiExpand) {
                $a.trigger('click.zf.accordion');
              }
            },
            handled() {
              e.preventDefault();
              e.stopPropagation();
            },
          });
        });
      }
    });
    if (this.options.deepLink) {
      $(window).on('popstate', this._checkDeepLink);
    }
  }

  /**
   * Toggles the selected content pane's open/close state.
   * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
   * @function
   */
  public toggle($target) {
    if ($target.closest('[data-accordion]').is('[disabled]')) {
      console.info('Cannot toggle an accordion that is disabled.');
      return;
    }
    if ($target.parent().hasClass('is-active')) {
      this.up($target);
    } else {
      this.down($target);
    }
    //either replace or update browser history
    if (this.options.deepLink) {
      let anchor = $target.prev('a').attr('href');

      if (this.options.updateHistory) {
        history.pushState({}, '', anchor);
      } else {
        history.replaceState({}, '', anchor);
      }
    }
  }

  /**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
   * @param {Boolean} firstTime - flag to determine if reflow should happen.
   * @fires Accordion#down
   * @function
   */
  public down($target, firstTime) {
    /**
     * checking firstTime allows for initial render of the accordion
     * to render preset is-active panes.
     */
    if ($target.closest('[data-accordion]').is('[disabled]') && !firstTime)  {
      console.info('Cannot call down on an accordion that is disabled.');
      return;
    }
    $target
      .attr('aria-hidden', false)
      .parent('[data-tab-content]')
      .addBack()
      .parent().addClass('is-active');

    if (!this.options.multiExpand && !firstTime) {
      let $currentActive = this.$element.children('.is-active').children('[data-tab-content]');
      if ($currentActive.length) {
        this.up($currentActive.not($target));
      }
    }

    $target.slideDown(this.options.slideSpeed, () => {
      /**
       * Fires when the tab is done opening.
       * @event Accordion#down
       */
      this.$element.trigger('down.zf.accordion', [$target]);
    });

    $(`#${$target.attr('aria-labelledby')}`).attr({
      'aria-expanded': true,
      'aria-selected': true,
    });
  }

  /**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
   * @fires Accordion#up
   * @function
   */
  public up($target) {
    if ($target.closest('[data-accordion]').is('[disabled]')) {
      console.info('Cannot call up on an accordion that is disabled.');
      return;
    }

    let $aunts = $target.parent().siblings(),
        _this = this;

    if ((!this.options.allowAllClosed && !$aunts.hasClass('is-active')) || !$target.parent().hasClass('is-active')) {
      return;
    }

    $target.slideUp(_this.options.slideSpeed, function() {
      /**
       * Fires when the tab is done collapsing up.
       * @event Accordion#up
       */
      _this.$element.trigger('up.zf.accordion', [$target]);
    });

    $target.attr('aria-hidden', true)
           .parent().removeClass('is-active');

    $(`#${$target.attr('aria-labelledby')}`).attr({
     'aria-expanded': false,
     'aria-selected': false,
   });
  }

  /**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   * @function
   */
  public _destroy() {
    this.$element.find('[data-tab-content]').stop(true).slideUp(0).css('display', '');
    this.$element.find('a').off('.zf.accordion');
    if (this.options.deepLink) {
      $(window).off('popstate', this._checkDeepLink);
    }

  }
}

Accordion.defaults = {
  /**
   * Amount of time to animate the opening of an accordion pane.
   * @option
   * @type {number}
   * @default 250
   */
  slideSpeed: 250,
  /**
   * Allow the accordion to have multiple open panes.
   * @option
   * @type {boolean}
   * @default false
   */
  multiExpand: false,
  /**
   * Allow the accordion to close all panes.
   * @option
   * @type {boolean}
   * @default false
   */
  allowAllClosed: false,
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the accordion panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open accordion
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,
};

export {Accordion};
