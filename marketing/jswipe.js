/*
 * touchSwipe - jQuery Plugin
 * http://plugins.jquery.com/project/touchSwipe
 * http://labs.skinkers.com/touchSwipe/
 *
 * Copyright (c) 2010 Matt Bryson (www.skinkers.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * $version: 1.2.3
 *
 * Changelog
 * $Date: 2010-12-12 (Wed, 12 Dec 2010) $
 * $version: 1.0.0 
 * $version: 1.0.1 - removed multibyte comments
 *
 * $Date: 2011-21-02 (Mon, 21 Feb 2011) $
 * $version: 1.1.0 	- added allowPageScroll property to allow swiping and scrolling of page
 *					- changed handler signatures so one handler can be used for multiple events
 * $Date: 2011-23-02 (Wed, 23 Feb 2011) $
 * $version: 1.2.0 	- added click handler. This is fired if the user simply clicks and does not swipe. The event object and click target are passed to handler.
 *					- If you use the http://code.google.com/p/jquery-ui-for-ipad-and-iphone/ plugin, you can also assign jQuery mouse events to children of a touchSwipe object.
 * $version: 1.2.1 	- removed console log!
 *
 * $version: 1.2.2 	- Fixed bug where scope was not preserved in callback methods. 
 *
 * $Date: 2011-28-04 (Thurs, 28 April 2011) $
 * $version: 1.2.4 	- Changed licence terms to be MIT or GPL inline with jQuery. Added check for support of touch events to stop non compatible browsers erroring.
 *
 * A jQuery plugin to capture left, right, up and down swipes on touch devices.
 * You can capture 2 finger or 1 finger swipes, set the threshold and define either a catch all handler, or individual direction handlers.
 * Options:
 * 		swipe 		Function 	A catch all handler that is triggered for all swipe directions. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
 * 		swipeLeft	Function 	A handler that is triggered for "left" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
 * 		swipeRight	Function 	A handler that is triggered for "right" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
 * 		swipeUp		Function 	A handler that is triggered for "up" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
 * 		swipeDown	Function 	A handler that is triggered for "down" swipes. Handler is passed 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
 *		swipeStatus Function 	A handler triggered for every phase of the swipe. Handler is passed 4 arguments: event : The original event object, phase:The current swipe face, either "start, "move, "end or "cancel. direction : The swipe direction, either "up, "down, "left " or "rightdistance : The distance of the swipe.
 *		click		Function	A handler triggered when a user just clicks on the item, rather than swipes it. If they do not move, click is triggered, if they do move, it is not.
 *
 * 		fingers 	int 		Default 1. 	The number of fingers to trigger the swipe, 1 or 2.
 * 		threshold 	int  		Default 75.	The number of pixels that the user must move their finger by before it is considered a swipe.
 *		triggerOnTouchEnd Boolean Default true If true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
 *		allowPageScroll String Default "auto". How the browser handles page scrolls when the user is swiping on a touchSwipe object. 
 *										"auto" : all undefined swipes will cause the page to scroll in that direction.
 *										"none" : the page will not scroll when user swipes.
 *										"horizontal" : will force page to scroll on horizontal swipes.
 *										"vertical" : will force page to scroll on vertical swipes.
 *
 * This jQuery plugin will only run on devices running Mobile Webkit based browsers (iOS 2.0+, android 2.2+)
 */
(function($) 
{
	
	
	
	$.fn.swipe = function(options) 
	{
		if (!this) return false;
		
		// Default thresholds & swipe functions
		var defaults = {
					
			fingers 		: 1,								// int - The number of fingers to trigger the swipe, 1 or 2. Default is 1.
			threshold 		: 75,								// int - The number of pixels that the user must move their finger by before it is considered a swipe. Default is 75.
			
			swipe 			: null,		// Function - A catch all handler that is triggered for all swipe directions. Accepts 2 arguments, the original event object and the direction of the swipe : "left", "right", "up", "down".
			swipeLeft		: null,		// Function - A handler that is triggered for "left" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
			swipeRight		: null,		// Function - A handler that is triggered for "right" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
			swipeUp			: null,		// Function - A handler that is triggered for "up" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
			swipeDown		: null,		// Function - A handler that is triggered for "down" swipes. Accepts 3 arguments, the original event object, the direction of the swipe : "left", "right", "up", "down" and the distance of the swipe.
			swipeStatus		: null,		// Function - A handler triggered for every phase of the swipe. Handler is passed 4 arguments: event : The original event object, phase:The current swipe face, either "start�, "move�, "end� or "cancel�. direction : The swipe direction, either "up�, "down�, "left " or "right�.distance : The distance of the swipe.
			click			: null,		// Function	- A handler triggered when a user just clicks on the item, rather than swipes it. If they do not move, click is triggered, if they do move, it is not.
			
			triggerOnTouchEnd : true,	// Boolean, if true, the swipe events are triggered when the touch end event is received (user releases finger).  If false, it will be triggered on reaching the threshold, and then cancel the touch event automatically.
			allowPageScroll : "auto" 	/* How the browser handles page scrolls when the user is swiping on a touchSwipe object. 
											"auto" : all undefined swipes will cause the page to scroll in that direction.
 											"none" : the page will not scroll when user swipes.
 											"horizontal" : will force page to scroll on horizontal swipes.
 											"vertical" : will force page to scroll on vertical swipes.
										*/
		};
		
		
		//Constants
		var LEFT = "left";
		var RIGHT = "right";
		var UP = "up";
		var DOWN = "down";
		var NONE = "none";
		var HORIZONTAL = "horizontal";
		var VERTICAL = "vertical";
		var AUTO = "auto";
		
		var PHASE_START="start";
		var PHASE_MOVE="move";
		var PHASE_END="end";
		var PHASE_CANCEL="cancel";
		
		
		
		var phase="start";
		
		if (options.allowPageScroll==undefined && (options.swipe!=undefined || options.swipeStatus!=undefined))
			options.allowPageScroll=NONE;
		
		if (options)
			$.extend(defaults, options);
		
		
		/**
		 * Setup each object to detect swipe gestures
		 */
		return this.each(function() 
		{
			var $this = $(this);
			
			var triggerElementID = null; 	// this variable is used to identity the triggering element
			var fingerCount = 0;			// the current number of fingers being used.	
			
			//track mouse points / delta
			var start={x:0, y:0};
			var end={x:0, y:0};
			var delta={x:0, y:0};
			
			
			/**
			* Event handler for a touch start event. 
			* Stops the default click event from triggering and stores where we touched
			*/
			function touchStart(event) 
			{
				phase = PHASE_START;
		
				// get the total number of fingers touching the screen
				fingerCount = event.touches.length;
				
				//clear vars..
				distance=0;
				direction=null;
				
				// check the number of fingers is what we are looking for
				if ( fingerCount == defaults.fingers ) 
				{
					// get the coordinates of the touch
					start.x = end.x = event.touches[0].pageX;
					start.y = end.y = event.touches[0].pageY;
					
					if (defaults.swipeStatus)
						triggerHandler(event, phase);
				} 
				else 
				{
					//touch with more/less than the fingers we are looking for
					touchCancel(event);
				}
			}

			/**
			* Event handler for a touch move event. 
			* If we change fingers during move, then cancel the event
			*/
			function touchMove(event) 
			{
				if (phase == PHASE_END || phase == PHASE_CANCEL)
					return;
				
				end.x = event.touches[0].pageX;
				end.y = event.touches[0].pageY;
					
				direction = caluculateDirection();
				fingerCount = event.touches.length;
				
				phase = PHASE_MOVE
				
				//Check if we need to prevent default evnet (page scroll) or not
				validateDefaultEvent(event, direction);
		
				if ( fingerCount == defaults.fingers ) 
				{
					distance = caluculateDistance();
					
					if (defaults.swipeStatus)
						triggerHandler(event, phase, direction, distance);
					
					//If we trigger whilst dragging, not on touch end, then calculate now...
					if (!defaults.triggerOnTouchEnd)
					{
						// if the user swiped more than the minimum length, perform the appropriate action
						if ( distance >= defaults.threshold ) 
						{
							phase = PHASE_END;
							triggerHandler(event, phase);
							touchCancel(event); // reset the variables
						}
					}
				} 
				else 
				{
					phase = PHASE_CANCEL;
					triggerHandler(event, phase); 
					touchCancel(event);
				}
			}
			
			/**
			* Event handler for a touch end event. 
			* Calculate the direction and trigger events
			*/
			function touchEnd(event) 
			{
				event.preventDefault();
				
				distance = caluculateDistance();
				direction = caluculateDirection();
						
				if (defaults.triggerOnTouchEnd)
				{
					phase = PHASE_END;
					// check to see if more than one finger was used and that there is an ending coordinate
					if ( fingerCount == defaults.fingers && end.x != 0 ) 
					{
						// if the user swiped more than the minimum length, perform the appropriate action
						if ( distance >= defaults.threshold ) 
						{
							triggerHandler(event, phase);
							touchCancel(event); // reset the variables
						} 
						else 
						{
							phase = PHASE_CANCEL;
							triggerHandler(event, phase); 
							touchCancel(event);
						}	
					} 
					else 
					{
						phase = PHASE_CANCEL;
						triggerHandler(event, phase); 
						touchCancel(event);
					}
				}
				else if (phase == PHASE_MOVE)
				{
					phase = PHASE_CANCEL;
					triggerHandler(event, phase); 
					touchCancel(event);
				}
			}
			
			/**
			* Event handler for a touch cancel event. 
			* Clears current vars
			*/
			function touchCancel(event) 
			{
				// reset the variables back to default values
				fingerCount = 0;
				
				start.x = 0;
				start.y = 0;
				end.x = 0;
				end.y = 0;
				delta.x = 0;
				delta.y = 0;
			}
			
			
			/**
			* Trigger the relevant event handler
			* The handlers are passed the original event, the element that was swiped, and in the case of the catch all handler, the direction that was swiped, "left", "right", "up", or "down"
			*/
			function triggerHandler(event, phase) 
			{
				//update status
				if (defaults.swipeStatus)
					defaults.swipeStatus.call($this,event, phase, direction || null, distance || 0);
				
				
				if (phase == PHASE_CANCEL)
				{
					if (defaults.click && fingerCount==1 && (isNaN(distance) || distance==0))
						defaults.click.call($this,event, event.target);
				}
				
				if (phase == PHASE_END)
				{
					//trigger catch all event handler
					if (defaults.swipe)
				{
						
						defaults.swipe.call($this,event, direction, distance);
						
				}
					//trigger direction specific event handlers	
					switch(direction)
					{
						case LEFT :
							if (defaults.swipeLeft)
								defaults.swipeLeft.call($this,event, direction, distance);
							break;
						
						case RIGHT :
							if (defaults.swipeRight)
								defaults.swipeRight.call($this,event, direction, distance);
							break;

						case UP :
							if (defaults.swipeUp)
								defaults.swipeUp.call($this,event, direction, distance);
							break;
						
						case DOWN :	
							if (defaults.swipeDown)
								defaults.swipeDown.call($this,event, direction, distance);
							break;
					}
				}
			}
			
			
			/**
			 * Checks direction of the swipe and the value allowPageScroll to see if we should allow or prevent the default behaviour from occurring.
			 * This will essentially allow page scrolling or not when the user is swiping on a touchSwipe object.
			 */
			function validateDefaultEvent(event, direction)
			{
				if( defaults.allowPageScroll==NONE )
				{
					event.preventDefault();
				}
				else 
				{
					var auto=defaults.allowPageScroll==AUTO;
					
					switch(direction)
					{
						case LEFT :
							if ( (defaults.swipeLeft && auto) || (!auto && defaults.allowPageScroll!=HORIZONTAL))
								event.preventDefault();
							break;
						
						case RIGHT :
							if ( (defaults.swipeRight && auto) || (!auto && defaults.allowPageScroll!=HORIZONTAL))
								event.preventDefault();
							break;

						case UP :
							if ( (defaults.swipeUp && auto) || (!auto && defaults.allowPageScroll!=VERTICAL))
								event.preventDefault();
							break;
						
						case DOWN :	
							if ( (defaults.swipeDown && auto) || (!auto && defaults.allowPageScroll!=VERTICAL))
								event.preventDefault();
							break;
					}
				}
				
			}
			
			
			
			/**
			* Calcualte the length / distance of the swipe
			*/
			function caluculateDistance()
			{
				return Math.round(Math.sqrt(Math.pow(end.x - start.x,2) + Math.pow(end.y - start.y,2)));
			}
			
			/**
			* Calcualte the angle of the swipe
			*/
			function caluculateAngle() 
			{
				var X = start.x-end.x;
				var Y = end.y-start.y;
				var r = Math.atan2(Y,X); //radians
				var angle = Math.round(r*180/Math.PI); //degrees
				
				//ensure value is positive
				if (angle < 0) 
					angle = 360 - Math.abs(angle);
					
				return angle;
			}
			
			/**
			* Calcualte the direction of the swipe
			* This will also call caluculateAngle to get the latest angle of swipe
			*/
			function caluculateDirection() 
			{
				var angle = caluculateAngle();
				
				if ( (angle <= 45) && (angle >= 0) ) 
					return LEFT;
				
				else if ( (angle <= 360) && (angle >= 315) )
					return LEFT;
				
				else if ( (angle >= 135) && (angle <= 225) )
					return RIGHT;
				
				else if ( (angle > 45) && (angle < 135) )
					return DOWN;
				
				else
					return UP;
			}
			
			

			// Add gestures to all swipable areas if supported
			try
			{
				this.addEventListener("touchstart", touchStart, false);
				this.addEventListener("touchmove", touchMove, false);
				this.addEventListener("touchend", touchEnd, false);
				this.addEventListener("touchcancel", touchCancel, false);
			}
			catch(e)
			{
				//touch not supported
			}
				
		});
	};
	
	
	
	
})(jQuery);