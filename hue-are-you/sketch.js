// Hue are You?
// Drake Jordan 
// Oct 25, 2024
//
// Extra for Experts:
// - 

let regular;
let medium;
let semibold;

let logo;
let gridIcon; 

let gameState = "title";

function preload() {
  regular = loadFont("SF-Pro-Display-Regular.otf");
  medium = loadFont("SF-Pro-Display-Medium.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");

  logo = loadImage("assets/logo.png");
  gridIcon = loadImage("assets/grid.icon.png");

  createColorGrid();
}
 
function setup() {
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  createCanvas(1500, 900);
  background(255);
  if (gameState === "title") {
    titleScreen();
  }
  else if (gameState === "instructions") {
    instructions();
  }
  else if (gameState === "intro") {
    gameIntro();
  }
  else if (gameState === "game") {
    gameScreen();
  }
}
