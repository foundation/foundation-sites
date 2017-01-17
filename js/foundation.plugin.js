'use strict';

import $ from 'jquery';

// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
class Plugin {

  constructor(element, options) {
    this._setup(element, options);
    var pluginName = hyphenate(this.constructor.name);
    this.uuid = GetYoDigits(6, pluginName);

    if(!this.$element.attr(`data-${pluginName}`)){ this.$element.attr(`data-${pluginName}`, plugin.uuid); }
    if(!this.$element.data('zfPlugin')){ this.$element.data('zfPlugin', this); }
          /**
           * Fires when the plugin has initialized.
           * @event Plugin#init
           */
    this.$element.trigger(`init.zf.${pluginName}`);
  }

  destroy() {
    this._destroy();
    var pluginName = hyphenate(this.constructor.name);
    this.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
        /**
         * Fires when the plugin has been destroyed.
         * @event Plugin#destroyed
         */
        .trigger(`destroyed.zf.${pluginName}`);
    for(var prop in this){
      this[prop] = null;//clean up script to prep for garbage collection.
    }
  }
}

export default Plugin;
