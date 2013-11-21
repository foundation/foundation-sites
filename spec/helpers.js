function when(size, testFunc) {
  return function() {
    var runFunc = false;

    if (matchMedia(Foundation.media_queries[size]).matches) {
      runFunc = true;
    }

    if (runFunc) {
      testFunc.apply(this);
    } else {
      // Uncomment to verify skipping correct tests for media queries...
      //console.log('[' + $(document).width().toString() + 'px]: Skipping ' + jasmine.getEnv().currentSpec.getFullName());
    }
  }
}

beforeEach(function() {
  jasmine.Clock.useMock();

  if($('head').has('#foundation-style').length === 0) {
    $('head').append('<style id="foundation-style"></style>')
  }

  $.ajax({ url: '/base/dist/assets/css/normalize.css', cache: true, async: false, success: function(data) {
    $('#foundation-style').html(data);
  }});

  $.ajax({ url: '/base/dist/assets/css/foundation.css', cache: true, async: false, success: function(data) {
    $('#foundation-style').append(data);
  }});
});
