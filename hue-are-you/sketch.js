// Hue are You?
// Drake Jordan 
// Oct 25, 2024
//
// Extra for Experts:
// - 

let regular;
let semibold;

let logo;

let gameState = "game";

function preload() {
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");

  logo = loadImage("assets/logo.png");

  createColorGrid();
}

function setup() {
 
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  if (gameState === "title") {
    titleScreen();
  } else {
    gameScreen();
  }
}
