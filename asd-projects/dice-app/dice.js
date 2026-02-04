function makeDot(top, left, elementID) {
  $("<div class=dot>").css({
    top: top,
    left: left
  }).appendTo(elementID);
}

function rollDie() {
  $(this).empty();
  var randomNum = Math.ceil(Math.random() * 6);
  if (randomNum === 1) {
    makeDot(50, 50, this); // middle middle
  } else if (randomNum === 2) {
    makeDot(25, 25, this); // top left
    makeDot(75, 75, this); // bottom right
  } else if (randomNum === 3) {
    makeDot(25, 25, this); // top left
    makeDot(75, 75, this); // bottom right
    makeDot(50, 50, this); // middle middle
  } else if (randomNum === 4) {
    makeDot(75, 75, this); // bottom right
    makeDot(25, 25, this); // top left
    makeDot(25, 75, this); // bottom left
    makeDot(75, 25, this); // top right
  } else if (randomNum === 5) {
    makeDot(50, 50, this); // middle middle
    makeDot(75, 75, this); // bottom right
    makeDot(25, 25, this); // top left
    makeDot(25, 75, this); // bottom left
    makeDot(75, 25, this); // top right
  } else if (randomNum === 6) {
    makeDot(75, 75, this); // bottom right
    makeDot(25, 25, this); // top left
    makeDot(25, 75, this); // bottom left
    makeDot(75, 25, this); // top right
    makeDot(50, 25, this);
    makeDot(50, 75, this);
  }
}

$(document).ready(() => $('.die').on('click', rollDie));
