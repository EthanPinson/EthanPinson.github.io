'use strict';

const entity_data = {};

// definitions for how entities should behave and interact w/ world
/*
  on_hit - behavior for when player collides with entity
      heal - how much the player's health changes
      die - whether or not to kill the entity
      loot - how much money to give the player
      portal - whether or not to start the next level

  on_shot - behavior for when the entity is shot
      heal - how much the player's health changes
      die - whether or not to kill the entity
      loot - how much money to give the player

  appearance - entity appearance behavior
      spin - how much the entity should spin (0 - 100%)
      size - the diameter of the entity in px
      y_mod - just incase, how much to modify the y size
  
  render - how to render the entity
*/
// fields left blank are set to some default value

entity_data.red_square = {
  on_hit: { heal: -10, die: true },
  on_shot: { loot: 100, die: true },
  appearance: { spin: 1, size: 50 },
  render: (draw) => draw.rect(50, 50, "red", "black", 1),
}

entity_data.rat = {
  on_hit: { heal: -10, die: true },
  on_shot: { loot: 100, die: true },
  appearance: { spin: 0, size: 120 },
  render: (draw) => draw.bitmap("img/goldenrat.png"), // geometric perfection !
}

entity_data.spikes = {
  on_hit: { heal: -20, die: false },
  appearance: { spin: 0, size: 55 },
  render: (draw) => draw.bitmap("img/homeless_architecture.png"), // keeps the rats out
}

entity_data.cannoli = {
  on_hit: { heal: 30, die: true },
  appearance: { spin: 0.25, size: 150 },
  render: (draw) => draw.bitmap("img/cannoli.png"), // good food
}

entity_data.sawblade = {
  on_hit: { heal: -10, die: false },
  on_shot: { die: false },
  appearance: { spin: 2, size: 50 },
  render: (draw) => draw.bitmap("img/sawblade.png"),
}

entity_data.coin = {
  on_hit: { loot: 250, die: true },
  on_shot: { loot: 250, die: true },
  appearance: { spin: 0, size: 50 },
  render: (draw) => draw.bitmap("img/wahoocoin.png"),
}

entity_data.star = {
  on_hit: { loot: 500, heal: 5, die: true },
  on_shot: { loot: 500, heal: 5, die: true },
  appearance: { spin: 0, size: 50 },
  render: (draw) => draw.bitmap("img/wahoostar.png"),
}

entity_data.taxi = {
  on_hit: { portal: true, die: true },
  appearance: { size: 250, y_mod: 0.5 },
  render: (draw) => draw.bitmap("img/taxi.png"), // vroom vroom
}

entity_data.pigeon = {
  on_hit: { portal: false, die: false, heal: -10 },
  appearance: { size: 100 },
  render: (draw) => draw.bitmap("img/pigeon.png"), // hoot hoot
}

entity_data.oscar = {
  on_hit: { heal: -Infinity, die: true },
  on_shot: { loot: 100, die: true },
  appearance: { size: 130 },
  render: (draw) => draw.bitmap("img/oscar.png"), // bleaeeeeeghhh
}

entity_data.dr_bob = {
  on_hit: { heal: 10, die: true },
  appearance: { size: 30, y_mod: 2 },
  render: (draw) => draw.bitmap("img/drbob.png"), // bleaeeeeeghhh
}

if (typeof process !== "undefined" && typeof process.versions.node !== "undefined") {
  module.exports = entity_data;
}