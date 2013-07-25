$(document).on('page:change', function() {
  $('#topMenu').css('margin-top', $('#topMenu').height() * -1);
});

$(document).on('click', '#sidebarButton', function(e) {
  e.preventDefault();
  $('body').toggleClass('active');
});

$(document).on('click', '#menuButton', function(e) {
  e.preventDefault();
  $('body').toggleClass('active-menu');
});

$(document).on('click', '#switchPanels dd', function(e) {
  e.preventDefault();
  var switchToPanel = $(this).children('a').attr('href'),
      switchToIndex = $(switchToPanel).index();
  $(this).toggleClass('active').siblings().removeClass('active');
  $(switchToPanel).parent().css("left", (switchToIndex * (-100) + '%'));
});

$(document).on('click', '#nav li a', function() {
  e.preventDefault();
  var href = $(this).attr('href'),
    $target = $(href);
  $('html, body').animate({scrollTop : $target.offset().top}, 300);
});