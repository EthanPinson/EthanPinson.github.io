/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

/**
 * paddles game object
 * @param {*} $board the board
 * @param {*} ball the ball
 * @param {number} speed the speed at which the paddle moves (ai should be scaled / 10)
 * @param {number} ball_speed_mod what to multiply the ball x-speed by when colliding
 * @param {boolean} is_ai is the paddle controlled by AI
 */
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
    // where the ball-facing point on the paddle is
    const paddle_side_x = $$.position().left
      + ($$.outerWidth() - $$.innerWidth()) / 2
      + (is_ai ? 0 : $$.innerWidth());

    // where the paddle-facing point on the ball is
    const ball_side_x = ball.$$.position().left
      + (!is_ai ? 0 : ball.$$.outerWidth());

    // distance from ball-facing face to paddle-facing point on ball
    const d_x = (ball_side_x - paddle_side_x) * (is_ai ? -1 : 1);

    // distance from middle of the ball to the center of the paddle
    const d_y = -ball.$$.position().top - ball.$$.height() / 2
      + $$.position().top + $$.height() / 2;

    // if ball hits paddle, reverse ball x-speed
    if (d_x < 0 && Math.abs(d_y) < $$.outerHeight() / 2)
      ball.speed_x *= -ball_speed_mod;

    // if paddle is ai, set its speed so it follows the ball
    if (!is_ai) return;
    item.speed_y = cap_y_speed(-Math.sign(d_y) * speed);
  }

  // speed multipliers for keys
  const key_mults = {
    87: -1, // up (W)
    38: -1, // up (up arrow)
    83: 1, // down (S)
    40: 1 // down (down arrow)
  };

  function keydown({ which }) {
    // ai cannot be controlled
    if (is_ai) return;
    // move paddle up or down but not off-screen
    // this is a horrible way to do this
    // (many keydowns per frame makes many css changes per frame makes lag!)
    $$.css('top', `+=${cap_y_speed(key_mults[which] * speed)}`)
  }

  return { $$, speed_x: 0, speed_y: 0, logic, keydown }
}

/**
 * score keeper game object
 * @param {*} $board the board
 * @param {number} max_score the max score a player can have before game end
 */
function ScoreKeep($board, max_score) {
  const $$ = $('<div id=score>').appendTo($board);

  // add the visual numbers to the score keep
  $('<span id=left_score>').appendTo($$);
  $('<span id=right_score>').appendTo($$);

  // score values; index 0 is left, index 1 is right
  const score = [0, 0];

  function logic() {
    // set score display
    $('#left_score').text(score[0]);
    $('#right_score').text(score[1]);

    // if a player has more than max_score, reset game
    // this code is stupid
    if ((big_score = Math.max(...score)) < max_score) return;
    alert(`Player ${score.indexOf(big_score) + 1} wins with ${score.join(':')} points!!`);
    score[0] = score[1] = 0;
  }

  return { $$, logic, score }
}

/**
 * ball game object
 * @param {*} $board the board
 * @param {*} score_keep the score keeper
 * @param {number} speed initial ball speed
 */
function Ball($board, score_keep, speed) {
  const $$ = $('<div id=ball>').appendTo($board);

  // function that returns the ball to the center
  // of the board
  const center = () => $$.css({
    left: $board.width() / 2 - $$.outerWidth() / 2,
    top: $board.height() / 2 - $$.outerHeight() / 2
  });

  // gets a random speed for a speed component
  // when the ball gets reset to center
  const rng_speed = () => speed * Math.sign(Math.random() * 2 - 1);
  center();

  function logic(item) {
    // top and bottom wall bounce logic (reverse y-speed)
    if (
      $$.position().top < 0 ||
      $$.position().top + $$.outerHeight() > $board.height()
    ) item.speed_y *= -1;

    // ball going offscreen logic
    if (
      $$.position().left < -$$.outerWidth() ||
      $$.position().left > $board.width() + $$.outerWidth()
    ) {

      // trigger addition of point to appropriate player
      score_keep.score[Number($$.position().left < 0)] += 1;

      // send ball to center and randomize its speed
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

/**
 * divider game element (visual only)
 * @param {*} $board the board
 */
function Divider($board) {
  $('<div id=divider>').appendTo($board);
}

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  
  // Game Item Objects
  const $board = $('#board'); // the board
  const score_keep = ScoreKeep($board, 2); // score keeper
  const ball = Ball($board, score_keep, 3); // the ball

  // put game items in an array for looping
  const items = [
    Paddle($board, ball, 10, 1.1), // left paddle
    Paddle($board, ball, 3, 1.1, true), // right paddle (ai)
    ball,
    score_keep,
    Divider($board) // visual divider (no gameplay)
  ];

  // register keybinds for game objects
  items.forEach(item => $('body').on('keydown', (event) => {
    (item?.keydown || (() => {}))(event)
  }));

  // one-time setup
  const interval = setInterval(newFrame, 1000 / FRAME_RATE, items);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame(items) {
    for (const item of items) {
      if (!item?.$$) continue;
      // move it according to velocity
      item.$$.css({
        left: `+=${item.speed_x || 0}`,
        top: `+=${item.speed_y || 0}`
      });
      // call its logic
      (item.logic || (() => {}))(item);
    }
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    // nah
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  // welcome to the nothing zone
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
