/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function pluck_divider() {
  const overhang = parseFloat($('#divider').css('--overhang'));

  const target = Math.random() * overhang;

  const impact = (overhang - target) / overhang;

  console.log(impact);

  console.log(overhang);


  // console.log($('#divider').css('--overhang'))
  const num = Math.random() * -1 * parseFloat($('#divider').css('--overhang'));
  // console.log(num);
  $('#divider').animate({
      top: -target + 'px',
      'border-width': 5 * (1 - impact) + 'px'
    },
    {
      step: function( now, fx ) {
        //console.log('now', now);
        //console.log('fx', fx);
      },
      duration: Math.max((1 - impact) * 1000, 500),
      complete: function() {
        $('#divider').animate({'border-width': '5px'}, 250)
      }
    })
}


function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  $('#test').on('click', pluck_divider)

  

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
