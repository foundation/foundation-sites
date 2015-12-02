---
title: JavaScript Utilities
description: Our JavaScript Utility Libraries are easy to use and super helpful.
---

## Installing

See our [JavaScript](javascript.html) and [Installation](installation.html) pages on how to install our files in your project.

## Box
`js/foundation.util.box.js`

One of the useful libraries is `Foundation.Box`, and it has a couple methods designed to make your life easier. You can pass either jQuery objects or plain JavaScript elements to both.

```js

var dims = Foundation.Box.GetDimensions(element);
```
Will return an object that contains the dimensions of the `element` passed. The object return looks like:

```js

{
  height: 54,
  width: 521,
  offset: {
    left: 198,
    top: 1047
  },
  parentDims: {
    height: ... // parentDims and windowDims share the same format as the element dimensions.
  },
  windowDims: {
    height: ...
  }
}
```

Also included is the `ImNotTouchingYou` function. It returns a boolean based on whether the element you pass it is colliding with the edge of the window, or optionally, a parent element. The other two options are for detecting collisions on only one axis, and are simply booleans you pass in.
```js

var clear = Foundation.Box.ImNotTouchingYou(element [, parent, leftAndRightOnly, topAndBottomOnly]);
```

## Keyboard
`js/foundation.util.keyboard.js`

Another quite useful library, `Foundation.Keyboard` has several methods to make keyboard event interaction easier for all. Shout out to [Marius Olbertz](http://www.mariusolbertz.de/) of Germany who conceived and coded this library.

Ever wanted a handy list of common keycodes and the keys they represent? Use `Foundation.Keyboard.keys`. This is an object containing key/value pairs of the most frequently used keys in our framework.

Want to manage your own keyboard inputs? No problem! Within your `.on('key**')` callback, call `Foundation.Keyboard.parseKey(event)` to get a string of what key was pressed, e.g. `'TAB'` or `'ALT_X'`.

What if you want to know if there's focusable elements somewhere on a page? Instead of writing that function and selector yourself, just use:
```js
var focusable = Foundation.Keyboard.findFocusable($('#content'));
```

The real gem of this library, however, is the `handleKey` function. Any plugin that is registered with the utility can call on this method to manage keyboard inputs.
```js
Foundation.Keyboard.register('pluginName', {
  'TAB': 'next'
});
...//in event callback
// `this` refers to the current plugin instance
Foundation.Keyboard.handleKey(event, this, {
  next: function(){
    //do stuff
  }
});
```

## MediaQuery
`js/foundation.util.mediaQuery.js`

The media query library used by Foundation has two publicly accessible functions and two properties:
```js

Foundation.MediaQuery.get('medium');
// returns the minimum pixel value for the `medium` breakpoint.
Foundation.MediaQuery.atLeast('large');
// returns a boolean if the current screen size is, you guessed it, at least `large`.
Foundation.MediaQuery.queries;
// an array of media queries Foundation uses for breakpoints.
Foundation.MediaQuery.current;
// a string of the current breakpoint size.
```

Also included is an event emitter for breakpoint changes. You can hook into this event with
```js

$(window).on('changed.zf.mediaquery', function(event, newSize, oldSize){});
```

## Motion & Move
`js/foundation.util.motion.js`

Two handy utilities, one little file.

Foundation.Motion is the same JavaScript used by the [Motion-UI](https://github.com/zurb/motion-ui) library, and is included in Foundation 6. See the GitHub page for more details.

Foundation.Move is a simple helper function for utilizing browsers' `requestAnimationFrame` method for hardware acceleration. Invoke like so:
```js
Foundation.Move(durationInMS, $element, function(){
  //animation logic
});
```
Your jQuery element will fire `finished.zf.animate` when the animation is complete.

## Timer & Images Loaded
`js/foundation.util.timerAndImageLoader.js`

Both functions are used by [Orbit](orbit.html) and can be useful elsewhere as well.
```js

var timer = new Foundation.Timer($element, {duration: ms, infinite: bool}, callback);
// includes: timer.start(), timer.pause(), timer.restart()
```
Similar to `setInterval`, except you can pause and pick back up where you left off.

```js
Foundation.onImagesLoaded($images, callback);
```
This will execute your callback function after all the images in your jQuery collection have loaded.

## Touch
`js/foundation.util.touch.js`

Gives you the ability to add swipe and psuedo-drag events to elements.

```js
$('selector').addTouch().on('mousemove', handleDrag);
// Binds elements to touch events. Used in the Slider plugin for mobile devices.
$('selector').spotSwipe().on('swipeleft', handleLeftSwipe);
// Binds elements to swipe events. Used in the Orbit plugin for mobile devices.
```

## Triggers
`js/foundation.util.triggers.js`

Provides a number of event listeners and triggers your script can hook into. Most of them are self-explanatory, and utilized in many Foundation plugins.
```html
<button data-open='someId'>I open something!</button>
<button data-close='someId'>I close something!</button>
<button data-toggle='someId'>I toggle something!</button>
```
```js
// Add the data-open/close/toggle='idOfElement' tag to your markup.
// When a click event is triggered on that element, these are the non-bubbling events directed at your element.
// If you don't use an `id` selector, an event will be triggered that bubbles up to window.
$('selector').on('open.zf.trigger', handleOpen);
$('selector').on('close.zf.trigger', handleClose);
$('selector').on('toggle.zf.trigger', handleToggle);
```
Besides these useful click triggers, there are also other listeners for you to tap into. Need to know when the window has been resized, but only when it's done resizing? How about a debounced scroll event? Add this markup and JavaScript and you're good to go!

```html
<div data-scroll='someId'>...</div>
<div data-resize='someId'>...</div>
```
```js
$('#someId').on('scrollme.zf.trigger', handleScroll);
$('#someId').on('resizeme.zf.trigger', handleResize);
```

## Miscellaneous

Foundation includes a couple useful features in the core library that are used in many places, that you can tap into.

`Foundation.GetYoDigits([number, namespace])` returns a base-36, psuedo-random string with a hyphenated namespace (if you include one). Both arguments are optional, it will by default return a string six characters long.

`Foundation.getFnName(fn)` returns a string representation of a named function. Seems small, but believe us, it's useful.

`Foundation.transitionend` is a string of the properly vendor-prefixed version of `transitionend` events. Most browsers don't require a prefix these days, but for those that do, we've got you covered.
