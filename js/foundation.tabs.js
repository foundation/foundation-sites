!function($, Foundation) {
  'use strict';

  /**
   * Creates a new instance of tabs.
   * @class
   * @fires Tabs#init
   * @param {jQuery} element - jQuery object to make into tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Tabs(element){
    this.$element = element;
    this.options = $.extend({}, Tabs.defaults, this.$element.data());

    this._init();
    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Tabs#init
     */
    this.$element.trigger('init.zf.tabs');
  }

  Tabs.defaults = {
    deepLinking: false,
    scrollToContent: false,
    autoFocus: true,
    wrapOnKeys: true
  };

  /**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */
  Tabs.prototype._init = function(){
    var _this = this,
        tabIndex = 1;
    this.$tabTitles = this.$element.find('.tabs-title');

    this.$tabTitles.each(function(){
      var $link = $(this).find('a'),
          isActive = $(this).hasClass('is-active'),
          hash = $link.attr('href').slice(1),
          linkId = hash + '-label',
          $tabContent = $(hash);

      $(this).attr({'role': 'presentation'});

      $link.attr({
        'role': 'tab',
        'aria-controls': hash,
        'tabindex': $link.attr('tabindex') || tabIndex,
        'aria-selected': isActive,
        'id': linkId
      });

      $tabContent.attr({
        'role': 'tabpanel',
        'aria-hidden': !isActive,
        'aria-labelledby': linkId
      });

      if(isActive && _this.options.autoFocus){
        $link.focus();
      }
      tabIndex++
    });
    _this._events();
  };
  /**
   * Adds event handlers for items within the tabs.
   * @private
   */
   Tabs.prototype._events = function(){
    this._addKeyupHandler();
    this._addClickHandler();
  };

  /**
   * Adds click handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addClickHandler = function(){
    var _this = this;
    this.$tabTitles.on('click.zf.tabs', function(e){
      e.preventDefault();
      e.stopPropagation();
      if($(this).hasClass('is-active')){
        return;
      }
      _this._handleTabChange($(this));
    });
  };

  /**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addKeyupHandler = function(){
    var _this = this;
    var $firstTab = _this.$element.find('li:first-of-type');
    var $lastTab = _this.$element.find('li:last-of-type');

    this.$tabTitles.on('keyup.zf.tabs', function(e){
      e.stopPropagation();
      e.preventDefault();
      var $tabTitle = $(this),
          $prev = $tabTitle.prev(),
          $next = $tabTitle.next();
      if(checkClass($prev) || checkClass($next)){
        return;
      }
      if(_this.options.wrapOnKeys){
        $prev = $prev.length ? $prev : $lastTab;
        $next = $next.length ? $next : $firstTab;
        if(checkClass($prev) || checkClass($next)){
          return;
        }
      }

      switch (e.which) {

        case 32://return or spacebar
        case 13:
          $tabTitle.focus();
          _this._handleTabChange($tabTitle);
          break;

        case 37://left or up
        case 38:
          if(checkClass($prev)){ return; }
          $prev.focus();
          _this._handleTabChange($prev)
          break;

        case 39://right or down
        case 40:
          if(checkClass($next)){ return; }
          $next.focus();
          _this._handleTabChange($next)
          break;

        default:
          return;
      }
    });
  };

  function checkClass($elem){
    return $elem.hasClass('is-active');
  }

  /**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to open.
   * @param {jQuery} $targetContent - Content pane to open.
   * @fires Tabs#change
   */
  Tabs.prototype._handleTabChange = function($target){
    var $tabLink = $target.find('[role="tab"]'),
        hash = $tabLink.attr('href'),
        $targetContent = $(hash),

        $oldTab = this.$element.find('.tabs-title.is-active')
                  .removeClass('is-active').find('[role="tab"]')
                  .attr({'aria-selected': 'false'}).attr('href');

    $($oldTab).removeClass('is-active').attr({'aria-hidden': 'true'});

    $target.addClass('is-active');

    $tabLink.attr({'aria-selected': 'true'});

    $targetContent
      .addClass('is-active')
      .attr({'aria-hidden': 'false'});

    /**
     * Fires when the plugin has successfully changed tabs.
     * @event Tabs#change
     */
    this.$element.trigger('change.zf.tabs', [$target]);
    // console.log(this.$element.find('.tabs-title, .tabs-panel'));
    Foundation.reflow(this.$element, 'tabs');
  };

  /**
   * Destroys an instance of an tabs.
   * @fires Tabs#destroyed
   */
  Tabs.prototype.destroy = function() {
    this.$element.find('.tabs-title').css('display', 'none').end().find('.tabs-panel').css('display', 'none');
    this.$element.find('.tabs-titles').off('click.zf.tabs keyup.zf.tabs');
    this.$element.find('.tabs-titles').off('zf.tabs');

    /**
     * Fires when the plugin has been destroyed.
     * @event Tabs#destroyed
     */
    this.$element.trigger('destroyed.zf.tabs');
  }

  Foundation.plugin(Tabs);
}(jQuery, window.Foundation);
