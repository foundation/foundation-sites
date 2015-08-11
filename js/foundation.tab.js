!function($) {
  'use strict';

  /**
   * Creates a new instance of tabs.
   * @class
   * @fires Tabs#init
   * @param {jQuery} element - jQuery object to make into tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Tabs(element, options){
    this.$element = element;
    this.options = $.extend(this.defaults, options || {});

    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Tabs#init
     */
    this.$element.trigger('init.zf.tabs');
  }

  Tabs.prototype.defaults = {
    deepLinking: false,
    scrollToContent: false,
    autoFocus: true
  };

  /**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */
  Tabs.prototype._init = function() {
    var _this = this;
    var tabIndex = 1;

    this.$element.attr({'role': 'tablist'})
    .find('.tabs > .tab-title > a')
    .each(function(){
      var $tabLink = $(this),
          isActive = $tabLink.parent().hasClass('is-active'),
          $tabContent = $(this.hash);

      $tabLink.attr({
        'role': 'tab',
        'aria-selected': isActive,
        'aria-controls': this.hash,
        'tabindex': $tabLink.attr('tabindex') || tabIndex
      }).parent('.tab-title')
        .attr({'role': 'presentation'});

      $tabContent.attr({
        'role': 'tabpanel',
        'aria-hidden': !isActive,
      });

      tabIndex++;
      _this._events($tabLink, $tabContent);

      if(isActive && _this.options.autoFocus){
        $tabLink.focus();
      }
    });
  };
  /**
   * Adds event handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._events = function($tabLink, $tabContent){
    this._addKeyupHandler($tabLink, $tabContent);
    this._addClickHandler($tabLink, $tabContent);
  };

  /**
   * Adds click handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addClickHandler = function($tabLink, $tabContent){
    var _this = this;

    $tabLink.on('click.zf.tab', function(e){
      e.preventDefault();
      _this._handleTabChange($tabLink, $tabContent);
    });
  };

  /**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addKeyupHandler = function($tabLink, $tabContent){
    var _this = this;

    $tabLink.on('keyup.zf.tabs', function(e){

      var $prev = $tabLink.parent('.tab-title').prev().children('[role="tab"]'),
          $next = $tabLink.parent('.tab-title').next().children('[role="tab"]'),
          $target,
          $targetContent;

      switch (e.which) {

        case 32://return or spacebar
        case 13:
          _this._handleTabChange($tabLink, $tabContent);
          break;

        case 37://left or up
        case 38:
          $target = $prev;
          $targetContent = $($target.attr('href'));
          _this._handleTabChange($target, $targetContent)
          break;

        case 39://right or down
        case 40:
          $target = $next
          $targetContent = $($target.attr('href'));
          _this._handleTabChange($target, $targetContent)
          break;

        default:
          return;
      }
    });
  };

  /**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to open.
   * @param {jQuery} $targetContent - Content pane to open.
   * @fires Tabs#change
   */
  Tabs.prototype._handleTabChange = function($target, $targetContent){
    $target.attr({'aria-selected': true})
    .parent().addClass('is-active')
    .siblings('.tab-title').removeClass('is-active')
    .children('a').attr({'aria-selected': false});

    $target.focus();

    $targetContent.addClass('is-active').attr({'aria-hidden': false})
    .siblings('[role=tabpanel]').removeClass('is-active').attr({'aria-hidden': true});

    Foundation.reflow();

    this.$element.trigger('change.zf.tabs', [$target]);
  };

  Foundation.plugin(Tabs);
}(jQuery);
