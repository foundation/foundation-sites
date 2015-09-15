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
    
    it('displays the tab on click', function() { 
      $(document).foundation();
      
      $('#tab1').click();
      
      expect($('#panel11').hasClass('active')).toBe(true);
      expect($('#panel21').hasClass('active')).toBe(false);
      expect($('#panel31').hasClass('active')).toBe(false);            
    });
    
    it('closes an open tab when another is clicked', function() { 
      $(document).foundation();
  
      $('#tab1').click();
      
      expect($('#panel11').hasClass('active')).toBe(true);
      expect($('#panel21').hasClass('active')).toBe(false);
      expect($('#panel31').hasClass('active')).toBe(false); 
      
      $('#tab3').click();
      
      expect($('#panel11').hasClass('active')).toBe(false);
      expect($('#panel21').hasClass('active')).toBe(false);
      expect($('#panel31').hasClass('active')).toBe(true);               
    });   
  });
});