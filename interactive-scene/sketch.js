// Interactive Scene
// Drake Jordan
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = "startScreen";

let strokeColor = 0;
let boundWidth = 20;

let edgeOffset = 17;

let backgroundColor = 220;

let font;

function preload() {
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bobX = height / 2;
}

function changeGameState() {
  if (gameState === "startScreen" && mouseIsPressed) {
    gameState = "game";
  }
  if (gameState === "startScreen" && keyIsDown(73)) {
    gameState = "instructions";
  } 
  else if (gameState === "instructions" && keyIsDown(8)) {
    gameState = "startScreen"
  }

}

function startScreen() {
  noStroke();
  fill(strokeColor);

  textSize(35);
  textFont(semibold);
  text("Welcome to Bob's World", width / 2 - 190, height / 2);

  textSize(20);
  textFont(regular);
  text(
    'Click anywhere to start, or press "i" for instructions.',
    width / 2 - 203,
    height - 50
  );
}

function mouseWheel(event) {
  if (event.delta > 0) {
    backgroundColor = 0;
    strokeColor = 220;
  } else {
    backgroundColor = 220;
    strokeColor = 0;
  }
}

function drawBounds() {
  strokeWeight(boundWidth);
  stroke(strokeColor);
  //Top bound
  line(0, 3, width, 3);

  //Bottom bound
  line(0, height - 3, width, height - 3);

  //Right bound
  line(width - 3, 0, width - 3, height - 5);

  //Left bound
  line(3, 0, 3, height - 5);
}

function debugInfo() {
  if (keyIsDown(189)) {
  text(
    "DEBUG: " + gameState,
    15,
    30
  );
}
}

function draw() {
  background(backgroundColor);
  changeGameState();
  debugInfo();
  if (gameState === "startScreen") {
    startScreen();
  } else if (gameState === "game") {
    drawBob();
    moveBob();
    drawBounds();
    moveProjectileLines();
    debugRow();
  } else if (gameState === "instructions") {
    instructions();
  }
}