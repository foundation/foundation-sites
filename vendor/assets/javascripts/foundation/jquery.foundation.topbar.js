(function ($) {
    
    var currentIndex = 0,
        breakPoint = 800;

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
            $titleLi = $('<li class="title js-generated"><h5></h5></li>');
        
        // Copy link to subnav
        $titleLi.find('h5').html($link.html());
        $dropdown.prepend($titleLi);
        $dropdown.prepend('<li class="back js-generated"><a href="">&larr; Back</a></li>');
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
        console.log($this);
        $this.closest('.top-bar').toggleClass('expanded');
      }
    });
    
    // Show the Dropdown Levels on Click
    $('.top-bar .has-dropdown>a').on('click', function(e) {
      if (atBreakpoint()) {
        var $this = $(this),
            $selectedLi = $this.closest('li'),
            $nextLevelUl = $selectedLi.find('>ul'),
            $titleLi = $('<li class="title js-generated"><h5></h5></li>'),
            $section = $this.closest('section'),
            $topbar = $this.closest('.top-bar'),
            $largestUl;

        e.preventDefault();

        currentIndex += 1;

        $selectedLi.addClass('moved');
        $section.css({'left': '-' + 100 * currentIndex + '%'});
        $section.find('>.name').css({'left': 100 * currentIndex + '%'});

        if (currentIndex === 1) {
          $largestUl = $nextLevelUl;
          $nextLevelUl.find('ul.dropdown').each(function () {
            if ($(this).height() > $largestUl.height()) {
              $largestUl = $(this);
            }
          });
          $section.css({'height': $largestUl.height() + 45 + 'px'});
        }
      }
    });
    
    // Go up a level on Click
    $('.top-bar .has-dropdown').on('click', '.back', function(e) {
      var $this = $(this),
          $activeLi = $this.closest('li.active'),
          $section = $this.closest('section'),
          $topbar = $this.closest('.top-bar'),
          $previousLevelUl = $activeLi.closest('ul');
      
      e.preventDefault();
      
      currentIndex -= 1;
      
      $section.css({'left': '-' + 100 * currentIndex + '%'});
      $section.find('>.name').css({'left': 100 * currentIndex + '%'});
      
      if (currentIndex === 0) {
        $section.css({'height': ''});
      }
      
      setTimeout(function () {
        $activeLi.removeClass('active');
      }, 400);
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

}(jQuery));