var makeLevelData = function (window, entity_data) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "New York",
        number: 1,
        speed: -3,
        gameItems: [
          //{ x: 2500, y: 90, type: entity_data.portal },
          { x: 500, y: 10, type: entity_data.sawblade },
          { x: 800, y: 10, type: entity_data.rat },
          { x: 1250, y: 10, type: entity_data.rat },
          { x: 1400, y: 350, type: entity_data.pigeon },

          { x: 1100, y: 50, type: entity_data.dr_bob },

          { x: 1400, y: 15, type: entity_data.spikes },
          { x: 1600, y: 15, type: entity_data.spikes },
          { x: 1850, y: 130, type: entity_data.pigeon },
          { x: 2100, y: 18, type: entity_data.spikes },
          { x: 2500, y: 10, type: entity_data.rat },
          { x: 2650, y: 10, type: entity_data.rat },
          { x: 2500, y: 185, type: entity_data.cannoli },
          { x: 3000, y: 60, type: entity_data.oscar },

          { x: 3100, y: 15, type: entity_data.spikes },
          { x: 3300, y: 15, type: entity_data.spikes },
          { x: 3500, y: 130, type: entity_data.pigeon },

          { x: 3750, y: 10, type: entity_data.rat }, // keeper of the bob
          { x: 3850, y: 50, type: entity_data.dr_bob },
          { x: 3950, y: 15, type: entity_data.spikes },
          { x: 4100, y: 15, type: entity_data.spikes },

          // rat wall
          { x: 4300, y: 10, type: entity_data.rat },
          { x: 4300, y: 140, type: entity_data.rat },
          { x: 4300, y: 265, type: entity_data.rat },
          { x: 4300, y: 390, type: entity_data.rat },

          { x: 4500, y: 50, type: entity_data.dr_bob },
          { x: 4600, y: 15, type: entity_data.spikes },
          { x: 4800, y: 130, type: entity_data.pigeon },
          { x: 5100, y: 60, type: entity_data.oscar },
          { x: 5300, y: 125, type: entity_data.cannoli },


          //{ x: 900, y: 120, type: entity_data.red_square },

          { x: 1000, y: 130, type: entity_data.pigeon },
          { x: 5850, y: 130, type: entity_data.pigeon },
          //{ x: 1500, y: 59, type: entity_data.coin },
          { x: 6250, y: 0, type: entity_data.taxi },
        ],
      },
      {
        name: "RAT AMBUSH!",
        number: 2,
        speed: -15,
        gameItems: [
          { x: 600, y: 10, type: entity_data.rat },
          { x: 800, y: 10, type: entity_data.rat },
          { x: 1000, y: 10, type: entity_data.rat },
          { x: 1200, y:10, type: entity_data.rat },
          { x: 1400, y: 10, type: entity_data.rat },
          { x: 1600, y: 10, type: entity_data.rat },
          { x: 1800, y: 10, type: entity_data.rat },
          { x: 2000, y: 10, type: entity_data.rat },
          { x: 2200, y: 10, type: entity_data.rat },
          { x: 2400, y: 10, type: entity_data.rat },
          { x: 2600, y: 10, type: entity_data.rat },
          { x: 2800, y: 10, type: entity_data.rat },
          { x: 3000, y: 10, type: entity_data.rat },
          { x: 3200, y: 10, type: entity_data.rat },
          { x: 3400, y: 10, type: entity_data.rat },
          { x: 3600, y: 10, type: entity_data.rat },
          { x: 3800, y: 10, type: entity_data.rat },
          { x: 4000, y: 10, type: entity_data.rat },
          { x: 4200, y: 10, type: entity_data.rat },
          { x: 4400, y: 10, type: entity_data.rat },
          { x: 4600, y: 10, type: entity_data.rat },
          { x: 4800, y: 10, type: entity_data.rat },
          { x: 5000, y: 10, type: entity_data.rat },
          { x: 5200, y: 10, type: entity_data.rat },
          { x: 5400, y: 10, type: entity_data.rat },
          { x: 5600, y: 10, type: entity_data.rat },
          { x: 5800, y: 10, type: entity_data.rat },
          { x: 6000, y: 10, type: entity_data.rat },
          { x: 6200, y: 10, type: entity_data.rat },
          { x: 6400, y: 10, type: entity_data.rat },
          { x: 6600, y: 10, type: entity_data.rat },
          { x: 6800, y: 10, type: entity_data.rat },
          { x: 7000, y: 10, type: entity_data.rat },
          { x: 9000, y: 125, type: entity_data.cannoli },
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
