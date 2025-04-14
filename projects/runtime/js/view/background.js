var background = function (window, background_util) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        let tree;
        let buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'black');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            const stars = background_util.create_stars(draw, canvasWidth, groundY); // draws new stars
            stars.forEach(star => background.addChild(star)); // adds the stars to the background

            const moon = background_util.create_moon(draw); // draws a new moon (well, not a NEW moon but you get it)
            background.addChild(moon); // adds the moon to the background
            
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            buildings = background_util.create_buildings(draw, groundY); // creates new buildings and adds them to "building" array
            buildings.forEach(building => background.addChild(building)); // for each building, draw it!
            
            // TODO 3: Part 1 - Add a tree
            tree = background_util.create_tree(draw); // creates a new tree
            background.addChild(tree); // adds the tree to the background
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x -= 1; // move the tree one pixel to the left

            if (tree.x < -200) tree.x = canvasWidth; // if the tree is off the screen, move it to the right end
            
            // TODO 4: Part 2 - Parallax
            // for every building:
            for (let building of buildings) {
                building.x -= 0.1; // move the tree 1/10 pixel to the left
                if (building.x > -75) continue; // if it isn't off screen, don't teleport it
                building.x = canvasWidth; // otherwise, warp it to the end of the screen
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
