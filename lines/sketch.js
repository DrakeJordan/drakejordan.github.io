// Lines
// Drake Jordan
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  for(x = 10; x < width; x+= 60) {
     for(y = 10; y < height; y+= 60) {
       stroke(170)
       fill(255);
       square(x, y, 4)
       line(x+2, y+2, mouseX, mouseY);
     }
  }
}