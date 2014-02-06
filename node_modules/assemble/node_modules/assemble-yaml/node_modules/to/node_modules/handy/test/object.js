var handy=require('..');
var assert=require('assert');

// verify object functions
// - getType
// - isArrayEqual
// - isObjectEqual
// - merge
// - deepMerge
describe('object', function() {
  before(function(done) {
    done();
  });

  // -- getType
  describe('getType', function() {
    it('object', function(done) {
      assert.equal(handy.getType({}), 'object');
      assert.equal(handy.getType({'a':5}), 'object');
      assert.equal(handy.getType({'a':[1,2,3]}), 'object');
      var tmp={"alpha":"beta"};
      assert.equal(handy.getType(tmp), 'object');
      done();
    });
    it('array', function(done) {
      assert.equal(handy.getType([]), 'array');
      assert.equal(handy.getType([{'a':5}]), 'array');
      assert.equal(handy.getType([1,2,3]), 'array');
      var tmp=[{"alpha":"beta"}];
      assert.equal(handy.getType(tmp), 'array');
      done();
    });
    it('regex', function(done) {
      assert.equal(handy.getType(/./), 'regexp');
      assert.equal(handy.getType(/[{'a':5}]/), 'regexp');
      done();
    });
    it('regex', function(done) {
      assert.equal(handy.getType(123), 'number');
      assert.equal(handy.getType(123+45), 'number');
      done();
    });
  });

  // -- isArrayEqual
  describe('isArrayEqual', function() {
    it('non array', function(done) {
      var x = {}, y=123;
      assert.equal(handy.isArrayEqual(x,y), false);
      done();
    });
    it('one array', function(done) {
      var x = [123], y=123;
      assert.equal(handy.isArrayEqual(x,y), false);
      done();
    });
    it('different sizes', function(done) {
      var x = [123], y=[1,123];
      assert.equal(handy.isArrayEqual(x,y), false);
      done();
    });
    // validity test cases
    it('empty equal', function(done) {
      var x = [], y=[];
      assert.equal(handy.isArrayEqual(x,y), true);
      done();
    });
    it('ordered equal', function(done) {
      var x = [1,2,7], y=[1,2,7];
      assert.equal(handy.isArrayEqual(x,y), true);
      done();
    });
    it('not ordered equal', function(done) {
      var x = [1,2,7], y=[7, 1,2];
      assert.equal(handy.isArrayEqual(x,y), true);
      done();
    });
    it('not equal', function(done) {
      var x = [1,2,7], y=[7,5,2];
      assert.equal(handy.isArrayEqual(x,y), false);
      done();
    });
  });

  // -- isObjectEqual
  describe('isObjectEqual', function() {
    it('object and number', function(done) {
      var x = {}, y=123;
      assert.equal(handy.isObjectEqual(x,y), false);
      done();
    });
    it('array and number', function(done) {
      var x = [123], y=123;
      assert.equal(handy.isObjectEqual(x,y), false);
      done();
    });
    it('two objects with different keys', function(done) {
      var x = {b:'a'}, y={a:'a'};
      assert.equal(handy.isObjectEqual(x,y), false);
      done();
    });
    it('two objects with same values but different types', function(done) {
      var x = {b:'5'}, y={b:5};
      assert.equal(handy.isObjectEqual(x,y), false);
      done();
    });
    it('two objects with same values but different types - 2', function(done) {
      var x = {b:'5'}, y={b:['5']};
      assert.equal(handy.isObjectEqual(x,y), false);
      done();
    });
    it('two objects with different order of arrays (but same values)', function(done) {
      var x = {b:[1,2,3]}, y={b:[2,3,1]};
      assert.equal(handy.isObjectEqual(x,y), false);
      done();
    });
    // validity test cases
    it('empty equal', function(done) {
      var x = {}, y={};
      assert.equal(handy.isObjectEqual(x,y), true);
      done();
    });
    it('ordered equality', function(done) {
      var x = {a:'a',b:12}, y={a:'a',b:12};
      assert.equal(handy.isObjectEqual(x,y), true);
      done();
    });
    it('not ordered equal', function(done) {
      var x = {a:'a',b:12,c:[1,2]}, y={c:[1,2],a:'a',b:12};
      assert.equal(handy.isObjectEqual(x,y), true);
      done();
    });
    it('deep order mismatch', function(done) {
      var x = {a:'a',b:12,c:{c1:'a',c2:[1,2]}}, y={b:12,c:{c2:[1,2],c1:'a'},a:'a'};
      assert.equal(handy.isObjectEqual(x,y), true);
      done();
    });
  });

  // -- merge
  describe('merge - shallow', function() {
    it('one empty', function(done) {
      var x = {}, y={a:'hi'};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('both empty', function(done) {
      var x = {}, y={};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('invalid objects', function(done) {
      var x = {}, y=[1,2,3];
      assert.deepEqual(handy.merge(x,y), {0:1,1:2,2:3});
      done();
    });
    it('array objects', function(done) {
      var x = {}, y=[1,2,3];
      assert.deepEqual(handy.merge(y,x), y);
      done();
    });
    it('array merge', function(done) {
      var x = [4,5,6,7], y=[1,2,3];
      assert.deepEqual(handy.merge(x,y), [1,2,3,7]);
      done();
    });
    it('replace string', function(done) {
      var x = {a:'hi'}, y={a:'there'};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('replace object', function(done) {
      var x = {a:{x:34}}, y={a:{a:'there',b:'hi'}};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('replace array', function(done) {
      var x = {a:[1,2,3]}, y={a:[4,5]};
      assert.deepEqual(handy.merge(x,y), y);
      done();
    });
    it('merge object', function(done) {
      var x = {a:'123', b:33}, y={a:12, x:45}, z={a:12,b:33,x:45};
      assert.deepEqual(handy.merge(x,y), z);
      done();
    });
    it('three objects - replace', function(done) {
      var x = {a:'123', b:33}, y={a:12}, z={a:19,b:15,x:45};
      assert.deepEqual(handy.merge(x,y,z), z);
      done();
    });
    it('three objects - merge', function(done) {
      var x = {a:'123', b:33}, y={a:12, c:4}, z={y:34,p:4}, r={a:12,b:33,c:4,y:34,p:4};
      assert.deepEqual(handy.merge(x,y,z), r);
      done();
    });
  });

  // -- deepMerge
  describe('deepMerge', function() {
    it('one empty', function(done) {
      var x = {}, y={a:'hi'};
      assert.deepEqual(handy.deepMerge(x,y), handy.merge(x,y));
      done();
    });
    it('first level check', function(done) {
      var x = {a:1,b:3}, y={a:'hi'};
      assert.deepEqual(handy.deepMerge(x,y), {a:'hi',b:3});
      done();
    });
    it('second level check - replace', function(done) {
      var x = {a:1,lvl2:{a:3,b:5}}, y={lvl2:{a:45}};
      var r = {a:1,lvl2:{a:45,b:5}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('second level check - addition', function(done) {
      var x = {a:1,lvl2:{a:3,b:5}}, y={lvl2:{c:45}};
      var r = {a:1,lvl2:{a:3,b:5,c:45}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('second level check - array replace', function(done) {
      var x = {a:1,lvl2:{a:3,b:5,c:[1,2,3]}}, y={lvl2:{c:[4,5],d:'hi'}};
      var r = {a:1,lvl2:{a:3,b:5,c:[4,5],d:'hi'}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('third level check - replace', function(done) {
      var x = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:8}}}, y={lvl2:{lvl3:{q:1}}};
      var r = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:1}}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
    it('third level check - addition', function(done) {
      var x = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:8}}}, y={lvl2:{lvl3:{z:'new a'}}};
      var r = {a:1,lvl2:{a:3,b:5,lvl3:{p:9,q:8,z:'new a'}}};
      assert.deepEqual(handy.deepMerge(x,y), r);
      done();
    });
  });

});
