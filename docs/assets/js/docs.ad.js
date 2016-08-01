var _kmq = _kmq || [];
$(function() {

   // No need to do a timeout for default case, if KM times out just don't show ad.
   _kmq.push(function(){
    // Set up the experiment (this is the meat and potatoes)
    var type = KM.ab("Foundation Docs Upsell Type", ["question", "directive"]);

    // TODO: Add alternate between advanced and intro
    var topic = $('h1.docs-page-title').text();
    var header;
    if (type === 'directive') {
      header = 'Master ' + topic;
    } else {
      header = 'Struggling with ' + topic + '?';
    }
    var body = 'Get up to speed FAST, learn straight from the experts who built Foundation.';
    var link = 'http://zurb.com/university/foundation-intro?utm_source=Foundation%20Docs&utm_medium=Docs&utm_content=Struggling&utm_campaign=Docs%20To%20Intro';
    var cta = 'Learn More';

    var html = '<div class="ad-unit"><h3 class="ad-unit-title">' + header + '</h3>' +
               '<p class="ad-unit-text">' + body + '</p>' +
               '<a class="button ad-unit-button" href="' + link+ '">' +
               cta + '</a></div>';
    $('#TOCAdUnit').html(html);

  });

});
