!function(Foundation, $) {
  'use strict';

  var menubarPlugins = {
    dropdown: Foundation._plugins.dropdown || null,
    drilldown: Foundation._plugins.drilldown || null
  }

  var phMedia = {
    small: '(min-width: 0px)',
    medium: '(min-width: 640px)'
  }

  function MenuBar(element, options) {
    this.$element = $(element);
    this.rules = this.$element.data('menubar');
    this.currentMq = null;
    this.currentPlugin = null;

    this._init();
    this._events();
    this._checkMediaQueries();
  }

  MenuBar.prototype.defaults = {};

  MenuBar.prototype._init = function() {
    var rulesTree = {};

    // Parse rules from "classes" in data attribute
    var rules = this.rules.split(' ');

    // Iterate through every rule found
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i].split('-');
      var ruleSize = rule.length > 1 ? rule[0] : 'small';
      var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

      if (menubarPlugins[rulePlugin] !== null) {
        rulesTree[ruleSize] = menubarPlugins[rulePlugin];
      }
    }

    this.rules = rulesTree;
  };

  MenuBar.prototype._events = function() {
    var _this = this;

    $(window).on('resize', function() {
      _this._checkMediaQueries();
    });
  };

  MenuBar.prototype._checkMediaQueries = function() {
    var matchedMq;

    $.each(phMedia, function(key, value) {
      if (window.matchMedia(value).matches && key !== this.currentMq) {
        matchedMq = key;
      }
    });

    if (!matchedMq) return;

    if (this.currentPlugin) this.currentPlugin.destroy();    
    this.currentPlugin = new this.rules[matchedMq](this.$element, {});
  }

  Foundation.plugin('menubar', MenuBar);

}(Foundation, jQuery)