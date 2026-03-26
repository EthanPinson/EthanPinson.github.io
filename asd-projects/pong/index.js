/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

const KEYS = {
  87: -1,
  83: 1
};

function Paddle($board, ball, speed, ball_speed_mod, is_ai) {
  const $$ = $('<div class=paddle>').appendTo($board);

  // position the new paddle to the appropriate place
  // depending on whether or not this paddle is the ai
  $$.css({
    left: is_ai ? $board.width() - $$.outerWidth() : 0,
    top: $board.height() / 2 - $$.outerHeight() / 2,
    borderColor: $board.css('backgroundColor')
  });

  // function to check if some new y-speed will cause
  // the paddle to overflow off the board; steps down
  // the y-speed to a speed that will stop the paddle
  // from overflowing
  const cap_y_speed = d_y => {
    for (let i = 1; i >= 0; i -= 0.25) {
      const new_y = $$.position().top + d_y * i;
      if (
        new_y < 0 ||
        new_y > $board.height() - $$.outerHeight()
      ) continue;
      return d_y * i;
    }
  }

  function logic(item) {
    const paddle_side_x = $$.position().left
      + ($$.outerWidth() - $$.innerWidth()) / 2
      + (is_ai ? 0 : $$.innerWidth());

    const ball_side_x = ball.$$.position().left
      + (!is_ai ? 0 : ball.$$.outerWidth());

    const d_x = (ball_side_x - paddle_side_x) * (is_ai ? -1 : 1);

    const d_y = -ball.$$.position().top - ball.$$.height() / 2
      + $$.position().top + $$.height() / 2;

    if (d_x < 0 && Math.abs(d_y) < $$.outerHeight() / 2)
      ball.speed_x *= -ball_speed_mod;

    if (!is_ai) return;
    item.speed_y = cap_y_speed(-Math.sign(d_y) * speed);
  }

  function keydown({ which }) {
    if (is_ai) return; // ai cannot be controlled
    $$.css('top', `+=${cap_y_speed(KEYS[which] * speed)}`)
  }

  return { $$, speed_x: 0, speed_y: 0, logic, keydown }
}

function Ball($board, speed_mult) {
  const $$ = $('<div id=ball>').appendTo($board);

  // function that returns the ball to the center
  // of the board
  const center = () => $$.css({
    left: $board.width() / 2 - $$.outerWidth() / 2,
    top: $board.height() / 2 - $$.outerHeight() / 2
  });

  // gets a random speed for a speed component
  // when the ball gets reset to center
  const rng_speed = () => speed_mult * Math.sign(Math.random() * 2 - 1);
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
  const ball = Ball($board, 3);

  $("#test").on('click', () => { ball.$$.css('top', '999px')})

  const items = [
    Paddle($board, ball, 10, 1.1),
    Paddle($board, ball, 3, 1.1, true),
    ball
  ];
  items.forEach(item => $('body').on('keydown', (event) => {
    (item.keydown || (() => {}))(event)
  }));

  // one-time setup
  const interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL, items);

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
