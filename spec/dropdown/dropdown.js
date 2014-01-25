describe('dropdown:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place dropdown-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });
  });

  describe('when above the medium breakpoint', when('medium', function() {
  }));

  describe('when below the medium breakpoint', when_not('medium', function () {
  }));
});
