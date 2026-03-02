/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // maps controls to velocity changes
  // 0=up 1=left 2=down 3=right
  // (null = no change) (-1 is used for no match on key input)
  const control_map = { '-1': [null, null], 0: [null, -5], 1: [-5, null], 2: [null, 5], 3: [5, null] };

  // iterate over all walkers and do logic
  const $WALKERS = $('.walker').map((_, e) => $(e))
    .each((i, $walker) => {
      $walker.attr('id', i);

      // set speeds to zero
      $walker.speed_x = $walker.speed_y = 0;

      // set placeholder center
      $walker.cent = [i * 100, i * 100];

      // get predefined position and draw walker there
      const pos = $walker.pos = $walker.attr('pos').split(',').map(Number);
      $walker.css({ left: `${pos[0]}px`, top: `${pos[1]}px` });

      // parse the controls
      $walker.controls = $walker.attr('control').split(',').map(Number);

      // set background color
      $walker.css('background', $walker.attr('bg'));

      // function that handles key inputs and assigns velocity
      $walker.speed = function({ which }, up) {
        const i = this.controls.indexOf(which);
        if (speed_x = control_map[String(i)][0]) this.speed_x = up ? 0 : speed_x;
        if (speed_y = control_map[String(i)][1]) this.speed_y = up ? 0 : speed_y;
      }
    })

  // get the board
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
    $WALKERS.each((_, $w) => move($w));
    $WALKERS.each((_, $w) => wall_collision($w, 0, 'width'));
    $WALKERS.each((_, $w) => wall_collision($w, 1, 'height'));
    $WALKERS.each((_, $w) => draw($w));
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  $(document).on('keydown', e => $WALKERS.each((_, $w) => $w.speed(e, false)));
  $(document).on('keyup', e => $WALKERS.each((_, $w) => $w.speed(e, true)));

  // register random color to on click
  $(document).on('click', rng_color);

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // function to assign a random color to a random walker
  function rng_color() {
    const $walker = $WALKERS.get(Math.floor(Math.random() * $WALKERS.length));
    $walker.css('filter', `hue-rotate(${Math.random() * 360}deg)`);
  }

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  // moves a walker depending on its velocity and checks other walkers
  function move($walker) {
    $walker.pos[0] += $walker.speed_x;
    $walker.pos[1] += $walker.speed_y;

    // set the center of the walker for collision detection
    $walker.cent = [
      $walker.pos[0] + $walker.width()/2,
      $walker.pos[1] + $walker.height()/2
    ]

    // compare center with all other centers to determine collision
    // doing this every frame instead of only updating when positions change is dumb but i dont got time for that
    $WALKERS.each((i, $w) => {
      // walker target vs origin info
      if (String(i) == $walker.attr('id')) return;
      const id = `Block ${i} touches Block ${$walker.attr('id')}`

      // get offsets
      // ignore the possibility of simplifying this
      const x = Math.abs($walker.cent[0] - $w.cent[0]);
      const y = Math.abs($walker.cent[1] - $w.cent[1]);

      // if not close enough, dont make text; otherwise do
      if (x > 50 || y > 50) return $(`p[id="${id}"]`).remove()
      if (!$(`p[id="${id}"]`).length) $(`<p id="${id}">`)
        .text(id)
        .appendTo('body');
    })
  }

  // draws the walker in its new spot
  function draw($walker) {
    $walker.css({
      left: $walker.pos[0],
      top: $walker.pos[1]
    });
  }

  // checks for collision with walls
  function wall_collision($walker, a, b) {
    $walker.pos[a] = Math.min($walker.pos[a] + $walker[b](), $board[b]());
    $walker.pos[a] = Math.max($walker.pos[a] - $walker[b](), 0);
  }
}
