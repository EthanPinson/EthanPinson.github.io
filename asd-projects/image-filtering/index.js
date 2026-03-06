// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  apply_filter(decrease_blue, no_bg);
  apply_filter(increase_green_by_blue, no_bg);
  apply_filter(grayscale);
  apply_filter(increase_green_by_blue);
  //apply_filter(super_blur);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// generic apply filter function
function apply_filter(filter_fun, condition = () => false) {
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (condition(image[i][j])) continue;
      const pixel_arr = rgbStringToArray(image[i][j]);
      pixel_arr.i = i;
      pixel_arr.j = j;
      filter_fun(pixel_arr);
      image[i][j] = rgbArrayToString(pixel_arr);
    }
  }
}

// condition for avoiding background
function no_bg(pixel) {
  return pixel == image[0][0];
}

// TODO 1, 2, 3 & 5: Create the applyFilter function here

// TODO 9 Create the applyFilterNoBackground function

// TODO 6: Create the keepInBounds function
function keep_in_bounds(num) {
  return num < 0 ? 0 : num > 255 ? 255 : num;
}

// TODO 4: Create reddify filter function
function reddify(pixel_arr) {
  pixel_arr[RED] = 200;
}

// TODO 7 & 8: Create more filter functions
function decrease_blue(pixel_arr) {
  pixel_arr[BLUE] = keep_in_bounds(pixel_arr[BLUE] - 50);
}

function increase_green_by_blue(pixel_arr) {
  pixel_arr[GREEN] = keep_in_bounds(pixel_arr[GREEN] + pixel_arr[BLUE]);
}

// CHALLENGE code goes below here
function grayscale(pixel_arr) {
  let avg = 0;
  for (channel of pixel_arr) avg += channel;
  avg /= pixel_arr.length;
  for (let i = 0; i < pixel_arr.length; i++) pixel_arr[i] = avg;
}

function invert(pixel_arr) {
  for (let i = 0; i < pixel_arr.length; i++) {
    pixel_arr[i] = 255 - pixel_arr[i];
  }
}

// const blur_arr = [].concat(image);
// console.log(blur_arr);

// for (let i = 0; i < blur_arr.length; i++) {
//   for (let j = 0; j < blur_arr[i].length; j++) {
//     console.log(j == 0);
//   }
// }

// let blur_arr = [];







// function super_blur(pixel_arr) {
//   if (!pixel_arr.i && !pixel_arr.j) {
//     blur_arr = image;
//     for (let i = 0; i < blur_arr.length; i++) {
//       for (let j = 0; j < blur_arr[i].length; j++) {
//         const vals = [];

//         vals.push(...image[i][j]);
//         console.log(vals);
//         continue;


//         vals.push(image[i][j]);
//         if (i) vals.push(image[i - 1][j]);
//         if (i < blur_arr.length - 1) vals.push(image[i + 1][j]);
//         if (j && j < blur_arr[i].length - 1) vals.push(image[i][j + 1]);
//         if (j) vals.push(image[i][j - 1]);
//         console.log(vals);
//         let val = 0;
//         for (let k = 0; k < vals.length; k++) {
//           val += vals[k];
//         }
//         val /= vals.length;
//         blur_arr[i][j] = val;
//       }
//     }
//   }
//   //console.log(blur_arr);





//   if (pixel_arr.i != image.length - 1) return;
//   if (pixel_arr.j != image[pixel_arr.i].length - 1) return;
//   //console.log(pixel_arr.j);
  
// }