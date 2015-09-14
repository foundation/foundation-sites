describe('reveal:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place reveal-specific matchers here...
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
      document.body.innerHTML = __html__['spec/reveal/basic.html'];
    });

    it('is hidden on initialization', function() {
      $(document).foundation();

      expect($('#reveal1').hasClass('open')).toBe(false);
      expect($('#reveal2').hasClass('open')).toBe(false);
      expect($('#reveal3').hasClass('open')).toBe(false);
      expect($('#reveal4').hasClass('open')).toBe(false);
    });
    
    it('is able to display the modal', function() {
      $(document).foundation();

      $('#reveal1').foundation('reveal', 'open');

      expect($('#reveal1').hasClass('open')).toBe(true);
      expect($('#reveal2').hasClass('open')).toBe(false);
      expect($('#reveal3').hasClass('open')).toBe(false);
      expect($('#reveal4').hasClass('open')).toBe(false);
    });
    
    it('is able to close the modal', function() {
      $(document).foundation();

      $('#reveal1').foundation('reveal', 'open');

      expect($('#reveal1').hasClass('open')).toBe(true);
      expect($('#reveal2').hasClass('open')).toBe(false);
      expect($('#reveal3').hasClass('open')).toBe(false);
      expect($('#reveal4').hasClass('open')).toBe(false);
      
      $('#reveal1').foundation('reveal', 'close');
      
      expect($('#reveal1').hasClass('open')).toBe(false);
      expect($('#reveal2').hasClass('open')).toBe(false);
      expect($('#reveal3').hasClass('open')).toBe(false);
      expect($('#reveal4').hasClass('open')).toBe(false);
    });
  });
});