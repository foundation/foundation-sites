describe('offcanvas:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place offcanvas-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this, arguments);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });
  });
});
