const background_util = {};

// function to create a moon
background_util.create_moon = function(draw) {
    var moon = draw.bitmap('img/moon2.png'); // draws a new bitmap image
    moon.x = 500; // sets the x position
    moon.y = 75; // sets the y position
    moon.scaleX = 0.5; // scales the width
    moon.scaleY = 0.5; // scales the height
    return moon; // returns moon
}

// function to create a tree
background_util.create_tree = function(draw) {
    tree = draw.bitmap("img/tree2.png"); // draws a new bitmap image
    tree.x = 500; // sets the x position
    tree.y = 250; // sets the y position
    return tree; // returns tree
}

// function to create buildings
background_util.create_buildings = function(draw, groundY) {
    const buildings = []; // creates an empty array of buildings
    // for 20 buildings, do the following:
    for (let i = 0; i < 20; i++) {
        const buildingHeight = 300 * Math.random(); // set a random building height from 0 - 300
        const building = draw.rect( // draw a new building with parameters:
            60 + (20 * Math.random()), // set the width to random between 60 - 80
            buildingHeight, // set the height to be the building height
            `hsl(${Math.random()*360}, 100%, 25%)`, "Black", 1 // set the fill color to be random, with a black outline
        );
        building.x = (200 * Math.random()) * i; // sets the building x position to some random offset from its slot in the background
        building.y = groundY - buildingHeight; // sets the building y position
        buildings.push(building); // adds the building to the buildings array
    }
    return buildings; // returns the buildings
}

// function to create stars
background_util.create_stars = function(draw, canvasWidth, groundY) {
    const stars = []; // creates an empty array of stars
    // for 500 stars, do the following:
    for (let i = 0; i < 500; i++) {
        const circle = draw.circle(1 + Math.random(), "white", "LightGray", 2); // Creates a new dot
        circle.x = canvasWidth * Math.random(); // sets a random x position
        circle.y = groundY * Math.random(); // sets a random y position
        stars.push(circle); // adds the star to the array
    }
    return stars; // returns the stars
}

if (typeof process !== "undefined" && typeof process.versions.node !== "undefined") {
    module.exports = background_util;
}