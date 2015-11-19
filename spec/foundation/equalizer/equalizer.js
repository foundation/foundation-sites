describe('equalizer:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place equalize-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this, arguments);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });
  });

  describe('basic height', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/equalizer/basic.html'];
    });

    it('should have equal heights on load', function() {
      $(document).foundation();

      var equalized = $('[data-equalizer-watch]');

      expect(equalized.length).toBe(3);
      
      equalized.each(function(){
        expect($(this).outerHeight()).toBe(equalized.first().outerHeight());
      });
    });
  });
  
  describe('nested basic height', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/equalizer/nested.html'];
    });

    it('nested elements should have equal heights on load', function() {
      $(document).foundation();

      var equalized = $('[data-equalizer-watch=bar]');

      expect(equalized.length).toBe(4);

      equalized.each(function(){
        expect($(this).outerHeight()).toBe(equalized.first().outerHeight());
      });
    });
    
    it('parent with nested elements should have equal height with its equalizer on load', function() {
      $(document).foundation();

      var equalized = $('[data-equalizer-watch=foo]');

      expect(equalized.length).toBe(3);

      equalized.each(function(){
        expect($(this).outerHeight()).toBe(equalized.first().outerHeight());
      });
    });
  
  });
});