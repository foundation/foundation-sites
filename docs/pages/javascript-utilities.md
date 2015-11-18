---
title: JavaScript Utilities
description: Our JavaScript Utility Libraries are easy to use and super helpful.
---

## Installing

See our [JavaScript](javascript.html) and [Installation](installation.html) pages on how to install our files in your project.

## Box

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

Another quite useful library, `Foundation.Keyboard` has several methods to make keyboard event interaction easier for all. Shout out to [Marius Olbertz](http://www.mariusolbertz.de/) of Germany who conceived and coded this library.

Ever wanted a handy list of common keycodes and the keys they represent?
```js
Foundation.Keyboard.keys;
```
This is an object containing key/value pairs of the most frequently used keys in our framework.

Want to manage your own keyboard inputs? No problem! Within your `.on('key**')` callback, call `Foundation.Keyboard.parseKey(event)` to get a string of what key was pressed. e.g. `'TAB'` or `'ALT_X'`.

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

Both functions used by [Orbit](orbit.html) and can be useful elsewhere as well.
```js
var timer = new Foundation.Timer($element, {duration: ms, infinite: bool}, callback);
// includes: timer.start(), timer.pause(), timer.restart()
```
Similar to `setInterval`, except you can pause and pick back up where you left off.
