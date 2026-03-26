/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

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

    const d_x = (ball_side_x - paddle_side_x) * (is_ai ? -1 : 1);

    const d_y = -ball.$$.position().top - ball.$$.height() / 2
      + $$.position().top + $$.height() / 2;

    // TODO!: SET BOUNDS ON Y COORD

    if (d_x < 0 && Math.abs(d_y) < $$.outerHeight() / 2) ball.speed_x *= -1;

    if (!is_ai) return;
    item.speed_y = -Math.sign(d_y) * 0.5;
  }

  return { $$, speed_x: 0, speed_y: 0, logic }
}

function Ball($board) {
  const $$ = $('<div id=ball>').appendTo($board);

  const center = () => $$.css({
    left: $board.width() / 2 - $$.outerWidth() / 2,
    top: $board.height() / 2 - $$.outerHeight() / 2
  });

  const rng_speed = () => 2 * Math.sign(Math.random() * 2 - 1);
  center();

  function logic(item) {
    if (
      $$.position().top < 0 ||
      $$.position().top + $$.outerHeight() > $board.height()
    ) item.speed_y *= -1;

    if (
      $$.position().left < -$$.outerWidth() ||
      $$.position().left > $board.width() + $$.outerWidth()
    ) {
      center();
      item.speed_x = rng_speed();
      item.speed_y = rng_speed();
    }
  }

  return {
    $$,
    speed_x: rng_speed(),
    speed_y: rng_speed(),
    logic
  }
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
  const ball = Ball($board);

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
