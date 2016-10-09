$(document).foundation();

// [TODO] Remove this when possible
$(function() {
  // Equalizer test
  var counter = 0;
  $('#test-eq').on('postEqualized.zf.Equalizer', function() {
    counter++;
    console.log(counter);
  });
  $('#pokemonRed').on('invalid.fndtn.abide', function(e, data) {
    console.log(data);
  });
});

$(function() {
  $('[data-docs-version]').text('v' + Foundation.version);
});


// COUNTDOWN TIMER for Events banner
// function getTimeRemaining(endtime){
//  var t = Date.parse(endtime) - Date.parse(new Date());
//  var minutes = Math.floor( (t/1000/60) % 60 );
//  var days = Math.floor( (t/(1000*60*60)/24) );
//  var hours = Math.floor( (t/(1000*60*60)) % 24 );
//  var seconds = Math.floor( (t/1000) % 60 );
//
//  return {
//    'total': t,
//    'hours': hours,
//    'days': days,
//    'minutes': minutes,
//    'seconds': seconds
//  };
// }
//
// function initializeClock(id, endtime){
//  var clock = document.getElementById(id);
//  var daysSpan = clock.querySelector('.days');
//  var hoursSpan = clock.querySelector('.hours');
//  var minutesSpan = clock.querySelector('.minutes');
//  var secondsSpan = clock.querySelector('.seconds');
//
//  function updateClock(){
//    var t = getTimeRemaining(endtime);
//
//    daysSpan.innerHTML = ('0' + t.days).slice(-2);
//    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
//
//    if(t.total<=0){
//      clearInterval(timeinterval);
//    }
//  }
//
//  updateClock();
//  var timeinterval = setInterval(updateClock,1000);
// }
//
// var deadline = 'Thurs, 25 Aug 2016 8:00:00 PDT';
// initializeClock('clockdiv', deadline);
// COUNTDOWN TIMER END
