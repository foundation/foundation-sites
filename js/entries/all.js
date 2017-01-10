import $ from 'jquery';

import Foundation from '../foundation.core';

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

import {rtl, GetYoDigits, transitionend} from '../foundation.util.core';
Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;

import Box from '../foundation.util.box'
import onImageLoaded from '../foundation.util.imageLoader';
import Keyboard from '../foundation.util.keyboard';
import MediaQuery from '../foundation.util.MediaQuery';
import { Motion, Move } from '../foundation.util.motion';
import Nest from '../foundation.util.nest';
import Timer from '../foundation.util.timer';

Foundation.Box = Box;
Foundation.onImageLoaded = onImageLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.

import Touch from '../foundation.util.touch';
Touch.init();

import Triggers from '../foundation.util.triggers';
Triggers.init(Foundation, $);
