var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        let circle; // The current circle being processed.
        let circles = []; // All circles on screen.
        // TODO 2 : Create a function that draws a circle 
        function drawCircle() {
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2); // Create a new circle.
            physikz.addRandomVelocity(circle, canvas, 20, 20); // Add a random velocity to the circle.
            view.addChild(circle); // Draw the circle on the screen.
            circles.push(circle); // Add the circle to the circles array.
        }
        // TODO 3 / 7 : Call the drawCircle() function 
        /*drawCircle();
        drawCircle();
        drawCircle();
        drawCircle();
        drawCircle();*/
        // Draw 100 circles.
        for (let i = 0; i < 100; i++) {
            drawCircle();
        }
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            /*physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]);*/
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
            /*game.checkCirclePosition(circles[0]);
            game.checkCirclePosition(circles[1]);
            game.checkCirclePosition(circles[2]);
            game.checkCirclePosition(circles[3]);
            game.checkCirclePosition(circles[4]);*/
            // TODO 9 : Iterate over the array
            // For every circle, update its physics and
            // enforce position bounds
            circles.forEach(circ => {
                physikz.updatePosition(circ);
                game.checkCirclePosition(circ);
            });
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) {
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if (circle.x < -circle.width) {
                // keep circle x pos from going off left side
                circle.x += canvas.width + circle.width;
            }
            if (circle.y > canvas.height + circle.width) {
                // keep circle y pos from going off the top
                circle.y = -circle.width;
            }
            if (circle.y < -circle.width) {
                // keep circle y pos from going off the bottom
                circle.y = canvas.height + circle.width;
            }
            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
