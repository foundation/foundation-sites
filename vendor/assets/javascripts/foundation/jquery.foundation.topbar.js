(function ($) {

  $.fn.foundationTopBar = function(options) {

    var currentIndex = 0,
        options = options || {},
        breakPoint = options.breakPoint || 1085;

    // Define Breakpoint for small layout
    function atBreakpoint() {
      return $(window).width() < breakPoint;
    }

    // Function to inject new markup for small layout
    function initializeMarkup($topbar) {
      var $section = $topbar.children('section');

      // Pull element out of the DOM for manipulation
      $section.detach();

      $section.find('.has-dropdown>a').each(function () {
        var $link = $(this),
            $dropdown = $link.siblings('.dropdown'),
            $titleLi = $('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');

        // Copy link to subnav
        $titleLi.find('h5>a').html($link.html());
        $dropdown.prepend($titleLi);
      });

      // Put element back in the DOM
      $section.appendTo($topbar);
    }

    // Expand the menu on click
    $('.top-bar .toggle-nav').on('click', function(e) {
      var $this = $(this);

      if (atBreakpoint()) {
        e.preventDefault();

        if (!$this.hasClass('top-bar-initialized')) {
          initializeMarkup($this.closest('.top-bar'));
          $this.addClass('top-bar-initialized');
        }

        $this.closest('.top-bar').toggleClass('expanded');
      }
    });

    // Show the Dropdown Levels on Click
    $('.top-bar .has-dropdown>a').on('click', function(e) {
      if (atBreakpoint()) {
        var $this = $(this),
            $selectedLi = $this.closest('li'),
            $nextLevelUl = $selectedLi.children('ul'),
            $titleLi = $('<li class="title js-generated"><h5></h5></li>'),
            $section = $this.closest('section'),
            $topbar = $this.closest('.top-bar'),
            $currentUlPadding = parseInt($selectedLi.find('>ul.dropdown').css('padding-top')) + parseInt($selectedLi.find('>ul.dropdown').css('padding-bottom')),
            $nextLevelUlHeight = 0;

        e.preventDefault();

        currentIndex += 1;
        $selectedLi.addClass('moved');
        $section.css({'left': -(100 * currentIndex) + '%'});
        $section.find('>.name').css({'left': 100 * currentIndex + '%'});

        $selectedLi.find('>ul.dropdown>li').each(function () {
          $nextLevelUlHeight += $(this).outerHeight();
        });

        $section.css({'height': $nextLevelUlHeight + $topbar.find('>ul').outerHeight() + $currentUlPadding + 'px'});

        if (currentIndex > 1) {
          $section.css({'height': $nextLevelUlHeight + $topbar.find('>ul').outerHeight() + $currentUlPadding + 'px'});
        }
      }
    });

    // Go up a level on Click
    $('.top-bar .has-dropdown .back').live('click', function (e) {
      var $this = $(this),
        $movedLi = $this.closest('li.moved'),
        $section = $this.closest('section'),
        $topbar = $this.closest('.top-bar'),
        $previousLevelUl = $movedLi.parent(),
        $currentUlPadding = parseInt($movedLi.find('>ul.dropdown').css('padding-top')) + parseInt($movedLi.find('>ul.dropdown').css('padding-bottom'))
        $previousLevelUlHeight = 0;

      e.preventDefault();

      currentIndex -= 1;
      $section.css({'left': -(100 * currentIndex) + '%'});
      $section.find('>.name').css({'left': 100 * currentIndex + '%'});

      $previousLevelUl.siblings('li').each(function () {
        $previousLevelUlHeight += $(this).outerHeight();
      });

      if (currentIndex === 0) {
        $section.css({'height': ''});
      }

      if (currentIndex > 0) {
        $section.css({'height': $previousLevelUl.outerHeight() + $topbar.find('>ul').outerHeight() + $currentUlPadding + 'px'});
      }

      setTimeout(function () {
        $movedLi.removeClass('moved');
      }, 300);
    });

    // define on() and off() for older jQuery
    if (!$.isFunction($.fn.on)) {
      $.fn.on = function(types, sel, fn) {
        return this.delegate(sel, types, fn);
      };

      $.fn.off = function(types, sel, fn) {
        return this.undelegate(sel, types, fn);
      };
    }

};

})( jQuery );