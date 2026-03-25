/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

// function pluck_divider() {
//   const overhang = parseFloat($('#divider').css('--overhang'));

//   const target = Math.random() * overhang;

//   const impact = (overhang - target) / overhang;

//   console.log(impact);

//   console.log(overhang);


//   // console.log($('#divider').css('--overhang'))
//   const num = Math.random() * -1 * parseFloat($('#divider').css('--overhang'));
//   // console.log(num);
//   $('#divider').animate({
//       top: -target + 'px'
//     },
//     {
//       step: function( now, fx ) {
//         //console.log('now', now);
//         //console.log('fx', fx);
//       },
//       duration: Math.max((1 - impact) * 1000, 500)
//     })
// }

function Paddle($board, ball, is_ai) {
  const $$ = $('<div class=paddle>').appendTo($board);

  $$.css({
    left: is_ai ? $board.width() - $$.outerWidth() : 0,
    top: $board.height() / 2 - $$.outerHeight() / 2,
    borderColor: $board.css('backgroundColor')
  });

  function logic(item) {
    const paddle_side_x = $$.position().left
      + ($$.outerWidth() - $$.innerWidth()) / 2
      + (is_ai ? 0 : $$.innerWidth());

    const ball_side_x = ball.$$.position().left
      + (!is_ai ? 0 : ball.$$.outerWidth());



    // var haha = $$.position().left + ($$.outerWidth() - $$.innerWidth()) / 2
    // haha += is_ai ? 0 : $$.innerWidth()

    // var what = ball.$$.position().left + ball.$$.outerWidth() * (is_ai ? 1 : 0)
    
    // console.log('haha', haha);
    // console.log('what', what);
    // console.log('what-haha', what - haha);
    if ((is_ai ? (-ball_side_x + paddle_side_x) : (ball_side_x - paddle_side_x)) > 0) return console.log('what');
    console.log('flipping');
    ball.speed_x *= -1;

    //console.log($element.position().left + $element.width() * (is_ai ? 0 : 1))

    // if (!is_ai) return;
    // let d_y = $element.position().top + $element.height() / 2;
    // d_y -= ball.$element.position().top + ball.$element.height() / 2;
    // item.speed_y = -Math.sign(d_y) * 0.5;
  }

  return { $$, speed_x: 0, speed_y: 0, logic }
}

function Ball($board, speed_x, speed_y) {
  const $$ = $('<div id=ball>').appendTo($board);

  $$.css({
    left: $board.width() / 2 - $$.outerWidth() / 2,
    top: $board.height() / 2 - $$.outerHeight() / 2
  });

  function logic(item) {
    // $("#haha").text($element.offset().left)
    //console.log($element);
  }

  return { $$, speed_x, speed_y, logic }
}

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  const $board = $('#board');
  const ball = Ball($board, -5, 0);

  // one-time setup
  const interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL, [
    Paddle($board, ball),
    Paddle($board, ball, true),
    ball
  ]);

  $(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame(items) {
    for (const item of items) {
      
      item.$$.css({
        left: `+=${item.speed_x}`,
        top: `+=${item.speed_y}`
      });
      item.logic(item);
    }
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
