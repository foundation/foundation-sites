describe('tab:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place tab-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this, arguments);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });
  });
  
  describe('basic clearing', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/tab/basic.html'];
    });

    it('default tab active on initialization', function() {
      $(document).foundation();

      expect($('#panel11').hasClass('active')).toBe(false);
      expect($('#panel21').hasClass('active')).toBe(true);
      expect($('#panel31').hasClass('active')).toBe(false);
    }); 
  });
});