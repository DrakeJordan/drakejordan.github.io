// Image Demo
// Sept 23, 2024

let timCook;

function preload() {
timCook = loadImage('timCook.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(timCook, mouseX, mouseY, timCook.width * 1.5, timCook.height * 1.5);
}
