'use strict';
import { GetYoDigits, hyphenate } from './foundation.util.core';
// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
export class Plugin {
    constructor(element, options) {
        this._setup(element, options);
        let pluginName = getPluginName(this);
        this.uuid = GetYoDigits(6, pluginName);
        if (!this.$element.attr(`data-${pluginName}`)) {
            this.$element.attr(`data-${pluginName}`, this.uuid);
        }
        if (!this.$element.data('zfPlugin')) {
            this.$element.data('zfPlugin', this);
        }
        /**
         * Fires when the plugin has initialized.
         * @event Plugin#init
         */
        this.$element.trigger(`init.zf.${pluginName}`);
    }
    destroy() {
        this._destroy();
        let pluginName = getPluginName(this);
        this.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
            .trigger(`destroyed.zf.${pluginName}`);
        for (let prop in this) {
            this[prop] = null; //clean up script to prep for garbage collection.
        }
    }
}
function getPluginName(obj) {
    if (typeof (obj.constructor.name) !== 'undefined') {
        return hyphenate(obj.constructor.name);
    }
    else {
        return hyphenate(obj.className);
    }
}
