/* jslint mocha: true */
/*global describe, it, before, beforeEach, after, afterEach, $, Foundation */

describe('Abide', function() {
  var plugin;
  var $html;

  afterEach(function() {
    plugin.destroy();
    $html.remove();
  });

  describe('constructor()', function() {
    it('stores the element & plugin options', function() {
      $html = $('<form data-abide novalidate></form>').appendTo('body');
      plugin = new Foundation.Abide($html, {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });

  describe('validateInput()', function() {
    it('returns true for hidden inputs', function() {
      $html = $("<form data-abide novalidate><input type='hidden' required></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("input")).should.equal(true);
    });

    it('returns true for inputs with [data-abide-ignore]', function() {
      $html = $("<form data-abide novalidate><input type='text' required data-abide-ignore></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("input")).should.equal(true);
    });
  });

});
