$(function() {
  // TODO: Add alternate between advanced and intro
  var topic = $('h1.docs-page-title').text();
  var header = 'Struggling with ' + topic + '?';
  var body = 'Get up to speed FAST, learn straight from the experts who built Foundation.';
  var link = 'http://zurb.com/university/foundation-intro?utm_source=Foundation%20Docs&utm_medium=Docs&utm_content=Struggling&utm_campaign=Docs%20To%20Intro';
  var cta = 'Learn More';

  var html = '<div><h5 class="foundation-ad-header">' + header + '</h5>' +
             '<p class="foundation-ad-body">' + body + '</p>' +
             '<p class="foundation-cta text-center"><a class="button button-primary" href="' + link+ '">' +
             cta + '</a></p></div>';
  $('#TOCAdUnit').html(html);

});
