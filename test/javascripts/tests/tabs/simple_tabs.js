module('core', {
  setup: function () {
    // $.foundation('tabs');
    this.$tabs = $('.tabs');
  },
  teardown: function () {

  }
});
test('click tab activates content pane', function () {
  ok(this.$tabs.length == 1, 'only one set of tabs should be present');
  var $activeTab = this.$tabs.find('.active');
  ok($activeTab.length == 1, 'only one tab should be active');
  var $lastTab = this.$tabs.find('a:first');
  ok($lastTab.length == 1, 'there should be a last tab');
  notStrictEqual($lastTab, $activeTab, 'tabs should be different');
});
