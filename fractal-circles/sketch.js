// Fractal Circles
// Drake Jordan
// Dec 18, 2024


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recursiveCircle(width/2, height/2, height/2);
}

function recursiveCircle(x, y, radius) {
  circle(x, y, radius*2);

  // Exit caluse
  if (radius > 3) {
    recursiveCircle(x-radius/2, y, radius/2);
    recursiveCircle(x+radius/2, y, radius/2);
  }
}