/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 */
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
    Foundation.registerPlugin(this);
    // /**
    //  * Fires when the plugin has been successfuly initialized.
    //  * @event Tabs#init
    //  */
    // this.$element.trigger('init.zf.tabs');
  }

  Tabs.defaults = {
    deepLinking: false,
    scrollToContent: false,
    autoFocus: false,
    wrapOnKeys: true,
    matchHeight: true,
    linkClass: 'tabs-title',
    contentClass: 'tabs-content',
    panelClass: 'tabs-panel'
  };

  /**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */
  Tabs.prototype._init = function(){
    var _this = this,
        tabIndex = 1;
    this.$tabTitles = this.$element.find('.' + this.options.linkClass);
    this.$tabContent = $('[data-tabs-content="' + this.$element[0].id + '"]');
    this.$tabTitles.each(function(){
      var $elem = $(this),
          $link = $elem.find('a'),
          isActive = $elem.hasClass('is-active'),
          hash = $link.attr('href').slice(1),
          linkId = hash + '-label',
          $tabContent = $(hash);

      $elem.attr({'role': 'presentation'});

      $link.attr({
        'role': 'tab',
        'aria-controls': hash,
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
    if(this.options.matchHeight){
      this.setHeight();
    }
    this._events();
  };
  /**
   * Adds event handlers for items within the tabs.
   * @private
   */
   Tabs.prototype._events = function(){
    this._addKeyHandler();
    this._addClickHandler();
    if(this.options.matchHeight){
      $(window).on('changed.zf.mediaquery', this.setHeight.bind(this));
    }
  };

  /**
   * Adds click handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addClickHandler = function(){
    var _this = this;
    this.$tabTitles.off('click.zf.tabs')
                   .on('click.zf.tabs', function(e){
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
  Tabs.prototype._addKeyHandler = function(){
    var _this = this;
    var $firstTab = _this.$element.find('li:first-of-type');
    var $lastTab = _this.$element.find('li:last-of-type');

    this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function(e){
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

      // handle keyboard event with keyboard util
      Foundation.handleKey(e, _this, {
        open: function() {
          $tabTitle.focus();
          _this._handleTabChange($tabTitle);
        },
        previous: function() {
          if(checkClass($prev)){ return; }
          $prev.focus();
          _this._handleTabChange($prev)
        },
        next: function() {
          if(checkClass($next)){ return; }
          $next.focus();
          _this._handleTabChange($next)
        }
      });
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
   * @function
   */
  Tabs.prototype._handleTabChange = function($target){
    var $tabLink = $target.find('[role="tab"]'),
        hash = $tabLink.attr('href'),
        $targetContent = $(hash),

        $oldTab = this.$element.find('.' + this.options.linkClass + '.is-active')
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
    // Foundation.reflow(this.$element, 'tabs');
  };
  /**
   * Sets the height of each panel to the height of the tallest panel.
   * If enabled in options, gets called on media query change.
   * If loading content via external source, can be called directly or with _reflow.
   * @function
   */
  Tabs.prototype.setHeight = function(){
    var max = 0;
    this.$tabContent.find('.' + this.options.panelClass)
                    .css('height', '')
                    .each(function(){
                      var panel = $(this),
                          isActive = panel.hasClass('is-active');

                      if(!isActive){
                        panel.css({'visibility': 'hidden', 'display': 'block'});
                      }
                      var temp = this.getBoundingClientRect().height;

                      if(!isActive){
                        panel.css({'visibility': '', 'display': ''});
                      }

                      max = temp > max ? temp : max;
                    })
                    .css('height', max + 'px');
  };

  /**
   * Destroys an instance of an tabs.
   * @fires Tabs#destroyed
   */
  Tabs.prototype.destroy = function() {
    this.$element.find('.' + this.options.linkClass)
                 .off('.zf.tabs').hide().end()
                 .find('.' + this.options.panelClass)
                 .hide();
    if(this.options.matchHeight){
      $(window).off('changed.zf.mediaquery');
    }
    Foundation.unregisterPlugin(this);
    // /**
    //  * Fires when the plugin has been destroyed.
    //  * @event Tabs#destroyed
    //  */
    // this.$element.trigger('destroyed.zf.tabs');
  }

  Foundation.plugin(Tabs);
}(jQuery, window.Foundation);
