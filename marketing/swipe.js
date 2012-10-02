  $(document).ready(function() {
    
  //++++++++++++++++++++++++++++++++++++++++++++++++++//
  // Swiping Rotator for Mobile and Table size screen //
  //++++++++++++++++++++++++++++++++++++++++++++++++++//
  
    var currentSlide = 1,
      offset = $('#swipeMeParent').width()+40;
    
   // Move everything but the first child li of #swipeMeParent
    if (currentSlide < 3) {
      $('#swipeMeParent').children('li:not(:first-child)').css({
        left: offset
      });
    }
    
    // Set the width/height based on the offset variable
    $('#swipeMeParent').children('li').width(offset);

    // Detect Resize for offset animation
    $(window).resize(function(e) {
      offset = $('#swipeMeParent').width()+40;
      $('#swipeme1, #swipeme2, #swipeme3, #swipeme4').css({
        left: offset
      });
      $('#swipeme' + currentSlide).css({
        left: '0px'
      });
      $('#swipeMeParent').children('li').width(offset);
      $('#swipeMeParent').height('#swipeMeParent li');
    });
  	

	var swipeOptions=
				{
					swipeLeft:swipeLeft,
					swipeRight:swipeRight,
					threshold:0

				}	
				//Enable swiping...
				$("#swipeMeParent").swipe( swipeOptions );
				//Swipe handlers.
				//The only arg passed is the original touch event object			

				var count=0;
				function swipeLeft(event)
				{
					$('#swipeMeParent').children('li').width(offset);

				      $(this).children('li').not('#swipeme' + currentSlide).css({
				    		left: offset
				    	});

				      // Cycle Logic
				      if (currentSlide == 4) {
				        var incrementMe = 1;
				      } else {
				        var incrementMe = currentSlide + 1;
				      }

				      // The Hiding Animation
				      $('#swipeme' + currentSlide).animate({
				        left: -offset
				      }, 300, function() {
				        // Resetting Slides after swipe
				        $(this).css({
				          left: offset
				        });
				      });

				      // The Showing Animation
				      $('#swipeme' + incrementMe).animate({
				        left: '0px'
				      }, 300);

				      // Looping on Last Case Study  
				      if (currentSlide == 4) {       
				        currentSlide = 1;            
				      } else {                       
				        currentSlide++;              
				      }
				}
				function swipeRight(event) {
					$(this).children('li').not('#swipeme' + currentSlide).css({
						left: -offset
					});

				      // Cycle Logic
				      if (currentSlide == 1) {
				        var incrementMe = 4;
				      } else {
				        var incrementMe = currentSlide - 1;
				      }

				      // The Hiding Animation
				      $('#swipeme' + currentSlide).animate({
				        left: offset
				      }, 300, function() {
				        // Resetting Slides after swipe
				        $(this).css({
				          left: -offset
				        });
				      });

				      // The Showing Animation
				      $('#swipeme' + incrementMe).animate({
				        left: '0px'
				      }, 300);

				      // Looping on Last Case Study  
				      if (currentSlide == 1) {       
				        currentSlide = 4;            
				      } else {                       
				        currentSlide--;              
				      }
				}
    
  });