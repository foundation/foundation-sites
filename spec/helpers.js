function when(size, testFunc) {
  return function() {
    var runFunc = false;

    if(size === 'tiny') {
      if(!matchMedia(Foundation.media_queries['small']).matches) {
        runFunc = true;
      }
    } else if(matchMedia(Foundation.media_queries[size]).matches) {
      runFunc = true;
    }

    if(runFunc) {
      testFunc.apply(this);
    } else {
      // Uncomment to verify skipping correct tests for media queries...
      //console.log('[' + document.width.toString() + 'px]: Skipping ' + jasmine.getEnv().currentSpec.getFullName());
    }
  }
}

beforeEach(function() {
  jasmine.Clock.useMock();

  if(!$('head').has('#foundation-style')) {
    $('head').append('<style id="foundation-style"></style>')
  }

  $.ajax({ url: '/base/test/stylesheets/normalize.css', cache: true, async: false, success: function(data) {
    $('#foundation-style').html(data);
  }});

  $.ajax({ url: '/base/test/stylesheets/foundation.css', cache: true, async: false, success: function(data) {
    $('#foundation-style').append(data);
  }});
});