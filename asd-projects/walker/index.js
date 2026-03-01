/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  const idkman = { '-1': [null, null], 0: [null, -5], 1: [-5, null], 2: [null, 5], 3: [5, null] };

  const $WALKERS = $('.walker').map((_, e) => $(e))
    .each((_, $walker) => {
      $walker.speed_x = $walker.speed_y = 0;

      const pos = $walker.pos = $walker.attr('pos').split(',').map(Number);
      $walker.css({ left: `${pos[0]}px`, top: `${pos[1]}px` });

      $walker.controls = $walker.attr('control').split(',').map(Number)
      $walker.css('background', $walker.attr('bg'));

      $walker.speed = function({ which }, up) {
        const i = this.controls.indexOf(which);
        if (speed_x = idkman[String(i)][0]) this.speed_x = up ? 0 : speed_x;
        if (speed_y = idkman[String(i)][1]) this.speed_y = up ? 0 : speed_y;
      }
    })

  const $board = $('#board');

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.
  For example, if you wanted to handle a click event on the document, you would replace 'eventType' with 'click', and if you wanted to execute a function named 'handleClick', you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    $WALKERS.each((_, $w) => move($w))
    $WALKERS.each((_, $w) => wall_collision($w, 0, 'width'))
    $WALKERS.each((_, $w) => wall_collision($w, 1, 'height'))
    $WALKERS.each((_, $w) => draw($w))
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  $(document).on('keydown', e => $WALKERS.each((_, $w) => $w.speed(e, false)));
  $(document).on('keyup', e => $WALKERS.each((_, $w) => $w.speed(e, true)));

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function move($walker) {
    $walker.pos[0] += $walker.speed_x;
    $walker.pos[1] += $walker.speed_y;
  }

  function draw($walker) {
    $walker.css({
      left: $walker.pos[0],
      top: $walker.pos[1]
    })
  }

  function wall_collision($walker, a, b) {
    $walker.pos[a] = Math.min($walker.pos[a] + $walker[b](), $board[b]());
    $walker.pos[a] = Math.max($walker.pos[a] - $walker[b](), 0);
  }
}
