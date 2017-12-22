import $ from 'jquery';

import { Foundation } from '../foundation.core';
Foundation.addToJquery($);

// Add Foundation Utils to Foundation global namespace for backwards
// compatibility.

import { rtl, GetYoDigits, transitionend } from '../foundation.util.core';
Foundation.rtl = rtl;
Foundation.GetYoDigits = GetYoDigits;
Foundation.transitionend = transitionend;

import { Box } from '../foundation.util.box'
import { onImagesLoaded } from '../foundation.util.imageLoader';
import { Keyboard } from '../foundation.util.keyboard';
import { MediaQuery } from '../foundation.util.mediaQuery';
import { Motion, Move } from '../foundation.util.motion';
import { Nest } from '../foundation.util.nest';
import { Timer } from '../foundation.util.timer';

Foundation.Box = Box;
Foundation.onImagesLoaded = onImagesLoaded;
Foundation.Keyboard = Keyboard;
Foundation.MediaQuery = MediaQuery;
Foundation.Motion = Motion;
Foundation.Move = Move;
Foundation.Nest = Nest;
Foundation.Timer = Timer;

// Touch and Triggers previously were almost purely sede effect driven,
// so no // need to add it to Foundation, just init them.

import { Touch } from '../foundation.util.touch';
Touch.init($);

import { Triggers } from '../foundation.util.triggers';
Triggers.init($, Foundation);

import { Abide } from '../foundation.abide';
Foundation.plugin(Abide, 'Abide');

import { Accordion } from '../foundation.accordion';
Foundation.plugin(Accordion, 'Accordion');

import { AccordionMenu } from '../foundation.accordionMenu';
Foundation.plugin(AccordionMenu, 'AccordionMenu');

import { Drilldown } from '../foundation.drilldown';
Foundation.plugin(Drilldown, 'Drilldown');

import { Dropdown } from '../foundation.dropdown';
Foundation.plugin(Dropdown, 'Dropdown');

import { DropdownMenu } from '../foundation.dropdownMenu';
Foundation.plugin(DropdownMenu, 'DropdownMenu');

import { Equalizer } from '../foundation.equalizer';
Foundation.plugin(Equalizer, 'Equalizer');

import { Interchange } from '../foundation.interchange';
Foundation.plugin(Interchange, 'Interchange');

import { Magellan } from '../foundation.magellan';
Foundation.plugin(Magellan, 'Magellan');

import { OffCanvas } from '../foundation.offcanvas';
Foundation.plugin(OffCanvas, 'OffCanvas');

import { Orbit } from '../foundation.orbit';
Foundation.plugin(Orbit, 'Orbit');

import { ResponsiveMenu } from '../foundation.responsiveMenu';
Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');

import { ResponsiveToggle } from '../foundation.responsiveToggle';
Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');

import { Reveal } from '../foundation.reveal';
Foundation.plugin(Reveal, 'Reveal');

import { Slider } from '../foundation.slider';
Foundation.plugin(Slider, 'Slider');

import { SmoothScroll } from '../foundation.smoothScroll';
Foundation.plugin(SmoothScroll, 'SmoothScroll');

import { Sticky } from '../foundation.sticky';
Foundation.plugin(Sticky, 'Sticky');

import { Tabs } from '../foundation.tabs';
Foundation.plugin(Tabs, 'Tabs');

import { Toggler } from '../foundation.toggler';
Foundation.plugin(Toggler, 'Toggler');

import { Tooltip } from '../foundation.tooltip';
Foundation.plugin(Tooltip, 'Tooltip');

import { ResponsiveAccordionTabs } from '../foundation.responsiveAccordionTabs';
Foundation.plugin(ResponsiveAccordionTabs, 'ResponsiveAccordionTabs');
