var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function make_obstacle() {}
    function make_item() {}
    function make_enemy() {}

    function startLevel() {
      // TODO 13 goes below here
      const current_data = levelData[currentLevel]; // Fetches the data for the current level

      // For every game item, create it!:
      for (const item of current_data.gameItems) {
        let thing; // Container for entity data
        const attributes = item.type; // Fetches the data for the entity's type

        thing = game.createGameItem('fasdfasfasf', attributes.appearance?.size/2 || 25); // Create the entity, with the appropriate size

        thing.x = item.x; // Sets the entity's x position
        thing.y = groundY - item.y; // Sets the entity's y position relative to the ground
        thing.velocityX = current_data.speed; // Sets how fast the entity moves across the screen

        thing.rotationalVelocity = current_data.speed*attributes.appearance?.spin || 0; // Sets how fast the entity spins appropriately

        const visual = attributes.render(draw); // Draws the entity

        visual.x = -attributes.appearance?.size/2 || -25; // Sets a horizontal translation to fit the hitbox
        visual.y = -attributes.appearance?.size/2 || -25; // Sets a vertical translation to fit the hitbox

        visual.image = visual.image || new Image(); // Stupid Hack

        // Once the graphics have loaded, scale them to the specified size using the image dimensions
        visual.image.onload = () => {
          visual.scaleX = attributes.appearance?.size/visual.image.naturalWidth || 1;
          visual.scaleY = attributes.appearance?.size/visual.image.naturalHeight || 1;
          visual.scaleY *= attributes.appearance?.y_mod || 1; // stupid
        }
  
        thing.addChild(visual); // Adds the visual to the entity
        
        // handle behavior for touching the player
        thing.onPlayerCollision = () => {
          game.changeIntegrity(attributes.on_hit?.heal || 0); // Change the player's health appropriately
          game.increaseScore(attributes.on_hit?.loot || 0); // Add the appropriate amount of money
          if (attributes.on_hit?.die) thing.fadeOut(); // If the entity is set to die, then kill it
          if (attributes.on_hit?.portal) startLevel(); // If the entity is set to change the level, then do so
        }
        
        // handle behavior for being shot
        thing.onProjectileCollision = () => {
          game.changeIntegrity(attributes.on_shot?.heal || 0); // Change the player's health appropriately
          game.increaseScore(attributes.on_shot?.loot || 0); // Add the appropriate amount of money
          if (attributes.on_shot?.die) thing.fadeOut(); // If the entity is set to die, then kill it
        }

        game.addGameItem(thing); // Adds the entity to the game!
      }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {qqqqqqq:
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
