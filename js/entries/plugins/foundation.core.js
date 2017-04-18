import $ from 'jquery';

import { Foundation } from '../../foundation.core';
Foundation.addToJquery($);

// These are now separated out, but historically were a part of this module,
// and since this is here for backwards compatibility we include them in
// this entry.
import {rtl, GetYoDigits, transitionend} from '../../foundation.util.core';
Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;

// Every plugin depends on plugin now, we can include that on the core for the
// script inclusion path.

import { Plugin } from '../../foundation.plugin';
Foundation.Plugin = Plugin;


window.Foundation = Foundation;
