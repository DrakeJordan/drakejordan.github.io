// Interactive Scene
// Drake Jordan
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = "startScreen";

let strokeColor = 0;
let boundWidth = 18;

let edgeOffset = 16;

let backgroundColor = 220;

let font;
let regular;
let semibold;
let mono;

let gameOffsetTime;

let score = 0;

function preload() {
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
  mono = loadFont("SFMono-Semibold.otf");
}

function setup() {
  createCanvas(600, 600);
  bobX = height / 2;
}

function changeGameState() {
  if (gameState === "startScreen" && mouseIsPressed) {
    gameState = "game";
    gameOffsetTime = millis();
  }
  if (gameState === "startScreen" && keyIsDown(73)) {
    gameState = "instructions";
  } 
  else if (gameState === "instructions" && keyIsDown(8)) {
    gameState = "startScreen";
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
    "Click anywhere to start, or press \"i\" for instructions.",
    width / 2 - 203,
    height - 50
  );
}

function mouseWheel(event) {
  if (event.delta > 0) {
    backgroundColor = 0;
    strokeColor = 220;
  }
  else {
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
    textSize(15);
    noStroke();
    fill(strokeColor);
    text(
      "DEBUG " + mouseY + " TIME: " + Math.round(millis()) + " GSTART:" + Math.round(gameOffsetTime) + " STAGE:" + projectileStage  + " LINE:" + activeLinePositon,
      15,
      30
    );
  }
}

function displayScore() {
  textFont(mono);
  noStroke();
  fill(strokeColor);
  text("Score: " + score, width - 140, 50);
}

function draw() {
  background(backgroundColor);
  changeGameState();
  debugInfo();
  if (gameState === "startScreen") {
    startScreen();
  }
  else if (gameState === "game") {
    if (projectileStage === 1) {
      hidenMiddleWRow();
    } 
    else if (projectileStage === 2) {
      fullClickRow();
    } else if (projectileStage === 3) {
      fullClickRow();
    }
    displayScore();
    fullGameRows();
    drawBob();
    moveBob();
    drawBounds();
  }
  else if (gameState === "instructions") {
    instructions();
  }
}