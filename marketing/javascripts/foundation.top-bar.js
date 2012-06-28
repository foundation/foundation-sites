(function ($) {
  var currentIndex = 0;

  function onMobile() {
    return $(window).width() < 768;
  }

  function initializeMarkup($topbar) {
    var $attached = $topbar.find('.attached');

    // Pull element out of the DOM for manipulation
    $attached.detach();

    $attached.find('li.has-dropdown>a').each(function () {
      var $link = $(this),
          $dropdown = $link.siblings('ul.dropdown'),
          $titleLi = $('<li class="title show-on-phones js-generated"><h5></h5></li>');

      // Copy link to subnav
      $titleLi.find('h5').html($link.html());
      $dropdown.prepend($titleLi);
      $dropdown.prepend('<li class="back show-on-phones js-generated"><a href="">&larr; Back</a></li>');
    });

    // Put element back in the DOM
    $attached.appendTo($topbar);
  }

  $('.top-bar .name').on('click', function (event) {
    var $this = $(this);

    if (onMobile()) {
      event.preventDefault();
      if (!$this.hasClass('top-bar-initialized')) {
        initializeMarkup($this.closest('.top-bar'));
        $this.addClass('top-bar-initialized');
      }

      $this.closest('.top-bar').toggleClass('expanded');
    }
  });

  $('body.ie8 .has-dropdown, body.ie7 .has-dropdown').live({
    mouseenter: function() {
      $(this).children('.dropdown').show();
    },
    mouseleave: function() {
      $(this).children('.dropdown').hide();
    }
  });

  $('.top-bar .has-dropdown>a').on('click', function (event) {
    if (onMobile()) {
      var $this = $(this),
          $selectedLi = $this.closest('li'),
          $nextLevelUl = $selectedLi.find('>ul'),
          $titleLi = $('<li class="title show-on-phones js-generated"><h5></h5></li>'),
          $attached = $this.closest('.attached'),
          $topbar = $this.closest('.top-bar'),
          $largestUl;

      event.preventDefault();

      currentIndex += 1;

      $selectedLi.addClass('active');
      $attached.css({'left': '-' + 100 * currentIndex + '%'});
      $attached.find('>.name').css({'left': 100 * currentIndex + '%'});

      if (currentIndex === 1) {
        $largestUl = $nextLevelUl;
        $nextLevelUl.find('ul.dropdown').each(function () {
          if ($(this).outerHeight() > $largestUl.outerHeight()) {
            $largestUl = $(this);
          }
        });
        $attached.css({'height': $largestUl.outerHeight() + 45 + 'px'});
      }
    }
  });

  $('.top-bar .has-dropdown .back').on('click', function (event) {
    var $this = $(this),
        $activeLi = $this.closest('li.active'),
        $attached = $this.closest('.attached'),
        $topbar = $this.closest('.top-bar'),
        $previousLevelUl = $activeLi.closest('ul');

    event.preventDefault();

    currentIndex -= 1;

    $attached.css({'left': '-' + 100 * currentIndex + '%'});
    $attached.find('>.name').css({'left': 100 * currentIndex + '%'});

    if (currentIndex === 0) {
      $attached.css({'height': ''});
    }

    setTimeout(function () {
      $activeLi.removeClass('active');
    }, 200);
  });

}(jQuery));