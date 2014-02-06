describe('grunt-karma', function(){

  describe('one', function(){
    it('should be awesome', function(){
      console.log('one');
      expect('foo').to.be.a('string');
    });
  });

  describe('two', function(){
    it('should be equally awesome', function(){
      console.log('two');
      expect('woot').to.be.a('string');
    });
  });

});