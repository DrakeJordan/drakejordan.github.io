// Interactive Scene
// Drake Jordan
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gameState = 0;

let bobX = 0;
let bobY = 0;
let bobW = 30;
let bobH = 30;
let bobSpeed = 12;

let strokeColor = 0;
let boundWidth = 14;

let edgeOffset = 48;

let backgroundColor = 220;

let font;

function preload() {
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bobX = height / 2 + bobW + bobW / 2;
  bobX = height / 2 + bobW + bobW / 2;
}

function changeGameState() {
  if (gameState === 0 && mouseIsPressed) {
    gameState = 1;
  }
  if (gameState === 0 && keyIsDown(73)) {
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

function moveBob() {
  //Have bob drop at start
  if (bobY <= height - 46) {
    bobY += bobSpeed;
  }

  //Move right
  if (bobX < width - edgeOffset) {
    if (keyIsDown(39) || keyIsDown(68)) {
      bobX += bobSpeed;
    }
  }

  //Move left
  if (bobX > 9) {
    if (keyIsDown(37) || keyIsDown(65)) {
      bobX -= bobSpeed;
    }
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

function drawBob() {
  fill(255, 164, 107);
  noStroke();
  rect(bobX, bobY, bobH, bobW);
}

function draw() {
  background(backgroundColor);

  changeGameState();

  if (gameState === 0) {
    startScreen();
  } else {
    drawBob();
    moveBob();
    drawBounds();
  }
}
