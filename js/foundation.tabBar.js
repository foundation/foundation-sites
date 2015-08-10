!function($, Foundation) {

'use strict';

function TabBar(element, options) {
  this.$element = $(element);
  this.options = $.extend(this.defaults, options);

  this._init();
  this._events();
}

TabBar.defaults = {
  hideFor: 'medium'
}

TabBar.prototype._init = function() {
  var targetID = this.$element.data('tab-bar');
  if (!targetID) {
    console.error('Your tab bar needs an ID of a menu bar as the value of data-tab-bar.');
  }

  this.$targetMenu = $('#'+targetID);
  this.$toggler = this.$element.find('[data-toggle]');

  this.update();
}

TabBar.prototype._events = function() {
  var _this = this;

  $(window).on('changed.zf.mediaquery', this.update.bind(this));

  this.$toggler.on('click.zf.tabbar', this.toggleMenu.bind(this));
}

TabBar.prototype.update = function() {
  // Mobile
  if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
    this.$element.show();
    this.$targetMenu.hide();
  }

  // Desktop
  else {
    this.$element.hide();
    this.$targetMenu.show();
  }
}

TabBar.prototype.toggleMenu = function() {
  if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
    this.$targetMenu.toggle(0);
  }
}

Foundation.plugin(TabBar);

}(jQuery, Foundation)