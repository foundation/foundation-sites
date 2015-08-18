!function($, Foundation) {
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
    this.options = $.extend({}, this.defaults, options || {});
    console.log('element', this.$element);
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
    this.$tabTitles = this.$element.find('.tabs-title');
    this.$tabTitles.each(function(){
      var $link = $(this).find('a'),
          isActive = $(this).hasClass('is-active'),
          hash = $link.attr('href'),
          $tabContent = $(hash);
      $(this).attr({'role': 'presentation'})/*.addClass(isActive ? 'is-active ': '')*/;
      $link.attr({
        'role': 'tab',
        'aria-controls': hash,
        'tabindex': $link.attr('tabindex') || tabIndex,
        'aria-selected': isActive
      });

      $tabContent.attr({
        'role': 'tabpanel',
        'aria-hidden': !isActive
      });
      if(isActive && _this.options.autoFocus){
        // console.log('focused', this);
        $link.focus();
      }
      tabIndex++

      // _this._events($link, $tabContent);
    });
    _this._events();
    // this.$element.attr({'role': 'tablist'})
    // .find('.tabs-title > a')
    // .each(function(){
    //   var $tabLink = $(this),
    //       isActive = $tabLink.attr('aria-selected') || false,
    //       $tabContent = $(this.hash);
    //   $tabLink.attr({
    //     'role': 'tab',
    //     'aria-controls': this.hash,
    //     'tabindex': $tabLink.attr('tabindex') || tabIndex
    //   }).parent('.tabs-title')
    //     .attr({'role': 'presentation'});
    //
    //   $tabContent.attr({
    //     'role': 'tabpanel',
    //     'aria-hidden': !isActive,
    //   });
    //
    //   tabIndex++;
    //   _this._events($tabLink, $tabContent);
    //
    //   if(isActive && _this.options.autoFocus){
    //     $tabLink.focus();
    //   }
    // });
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
    this.$tabTitles.on('click.zf.tabs', function(e){
      e.preventDefault();
      e.stopPropagation();
      if($(this).hasClass('is-active')){
        return;
      }
      _this._handleTabChange($(this));
    });
  };

  //old and broken :(
  // Tabs.prototype._addClickHandler = function($tabLink, $tabContent){
  //   var _this = this;
  //
  //   $tabLink.on('click.zf.tab', function(e){
  //     e.preventDefault();
  //     e.stopPropagation();
  //     _this._handleTabChange($tabLink, $tabContent);
  //   });
  // };

  /**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */


  Tabs.prototype._addKeyupHandler = function(/*$tabLink, $tabContent*/){
    var _this = this;
    var $firstTab = _this.$element.find('.tabs-title:first-child');
    var $lastTab = _this.$element.find('.tabs-title:last-child');

    this.$tabTitles.on('keyup.zf.tabs', function(e){
      e.stopPropagation();
      e.preventDefault();
      // if($(this).hasClass('is-active')){
      //   return;
      // }
      var $tabTitle = $(this);
      console.log(this,'\n', $(this))
      // console.log('first', $firstTab, '\nlast', $lastTab, '\ntitle', $tabTitle);
      var $prev = $tabTitle.prev(),
          $next = $tabTitle.next(),
          $target,
          $targetContent;
      // console.log($prev);
      switch (e.which) {

        case 32://return or spacebar
        case 13:
          $tabTitle.focus();
          _this._handleTabChange($tabTitle, $tabContent);
          break;

        case 37://left or up
        case 38:
          if(checkClass($prev)){ return; }
          $target = $prev;
          // $targetContent = $($target.attr('href'));
          $prev.focus();
          _this._handleTabChange($prev, $targetContent)
          break;

        case 39://right or down
        case 40:
          if(checkClass($next)){ return; }

          $target = $next
          $targetContent = $($target.attr('href'));
          $next.focus();
          _this._handleTabChange($next, $targetContent)
          break;

        default:
          return;
      }
    });
  };
  function checkClass($elem){
    return $elem.hasClass('is-active');
  }
  //old and broken :(
  // Tabs.prototype._addKeyupHandler = function($tabLink, $tabContent){
  //   var _this = this;
  //
  //   $tabLink.on('keyup.zf.tabs', function(e){
  //
  //     var $prev = $tabLink.parent('.tab-title').prev().find('[role="tab"]'),
  //         $next = $tabLink.parent('.tab-title').next().find('[role="tab"]'),
  //         $target,
  //         $targetContent;
  //     console.log($prev);
  //     switch (e.which) {
  //
  //       case 32://return or spacebar
  //       case 13:
  //         _this._handleTabChange($tabLink, $tabContent);
  //         break;
  //
  //       case 37://left or up
  //       case 38:
  //         $target = $prev;
  //         $targetContent = $($target.attr('href'));
  //         _this._handleTabChange($target, $targetContent)
  //         break;
  //
  //       case 39://right or down
  //       case 40:
  //         $target = $next
  //         $targetContent = $($target.attr('href'));
  //         _this._handleTabChange($target, $targetContent)
  //         break;
  //
  //       default:
  //         return;
  //     }
  //   });
  // };

  /**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to open.
   * @param {jQuery} $targetContent - Content pane to open.
   * @fires Tabs#change
   */
  Tabs.prototype._handleTabChange = function($target, /*$targetContent,*/ firstTime){
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



    // $target.attr({'aria-selected': true})
    // .parent().addClass('is-active')
    // .siblings('.tabs-title').removeClass('is-active')
    // .children('a').attr({'aria-selected': false});
    //
    // $target.focus();
    //
    // $targetContent.addClass('is-active').attr({'aria-hidden': false})
    // .siblings('.tabs-panel').removeClass('is-active').attr({'aria-hidden': true});


    this.$element.trigger('change.zf.tabs', [$target]);
    Foundation.reflow(this.$element, 'tabs');
  };

  Foundation.plugin(Tabs);
}(jQuery, window.Foundation);
