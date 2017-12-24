'use strict';

import * as $ from 'jquery';
import { GetYoDigits, hyphenate } from './foundation.util.core';

export interface PluginConstructor {
  new(element: JQuery, options: any): Plugin;
}

export interface PluginOptions {}

// Abstract class for providing lifecycle hooks. Expect plugins to define AT LEAST
// {function} _setup (replaces previous constructor),
// {function} _destroy (replaces previous destroy)
export abstract class Plugin {
  public static className: string;
  public uuid: string;
  public $element: JQuery;
  public options: PluginOptions;
  constructor(element: JQuery, options) {
    this._setup(element, options);
    let pluginName = getPluginName(this);
    this.uuid = GetYoDigits(6, pluginName);

    if (!this.$element.attr(`data-${pluginName}`)){ this.$element.attr(`data-${pluginName}`, this.uuid); }
    if (!this.$element.data('zfPlugin')){ this.$element.data('zfPlugin', this); }
    /**
     * Fires when the plugin has initialized.
     * @event Plugin#init
     */
    this.$element.trigger(`init.zf.${pluginName}`);
  }

  protected abstract _setup(element: JQuery, options): void;
  protected abstract _destroy(): void;

  public destroy() {
    this._destroy();
    let pluginName = getPluginName(this);
    this.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
        /**
         * Fires when the plugin has been destroyed.
         * @event Plugin#destroyed
         */
        .trigger(`destroyed.zf.${pluginName}`);
    for (let prop in this){
      this[prop] = null; //clean up script to prep for garbage collection.
    }
  }
}

function getPluginName(obj: object | Plugin) {
  if (typeof(obj.constructor.name) !== 'undefined') {
    return hyphenate(obj.constructor.name);
  } else {
    return hyphenate(obj.className);
  }
}
