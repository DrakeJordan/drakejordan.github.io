// Interactive Scene
// Drake Jordan
// 9/19/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let strokeColor = 0;
let boundWidth = 18;

let edgeOffset = 16;

let backgroundColor = 220;

let introLines = ["please don't let me die", "i have a family btw", "i don't wanna be crushed"];
let introLine = introLines[Math.floor(Math.random() * introLines.length)];

//Make font vars
let font;
let regular;
let semibold;
let mono;
let bob;

//Make game vars
let gameState = "startScreen";
let bobIsDead = false;
let gameOffsetTime;
let score = 0;

function preload() {
  //Load fonts
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
  mono = loadFont("SFMono-Semibold.otf");
  bob = loadImage("bob.png");
}

function setup() {
  createCanvas(600, 600);
  bobX = height / 2;
}

function changeGameState() {
  if (gameState === "startScreen" && mouseIsPressed) {
    projectileStage = 0;
    gameState = "game";
    gameOffsetTime = millis();
  }
  if (gameState === "startScreen" && keyIsDown(73)) {
    gameState = "instructions";
  } 
  else if ((gameState === "instructions" || gameState === "deathScreen")&& keyIsDown(8)) {
    gameState = "startScreen";
    bobIsDead = false;
    isFullClickAlive = true;
    isLeftClickAlive = true;
    isRightClickAlive = true;
  }
  if (bobIsDead) {
    gameState === "deathScreen";
    activeLinePositon = 0;
    bobX = width / 2;
    bobY = 0;
    introLine = introLines[Math.floor(Math.random() * introLines.length)];
  }

}

function startScreen() {
  textAlign(CENTER);
  noStroke();
  fill(strokeColor);

  textSize(35);
  textFont(semibold);
  text("Welcome to Bob's World", width / 2, height / 2);

  textSize(20);
  textFont(regular);
  text(
    "Click anywhere to start, or press \"i\" for instructions.",
    width / 2 ,
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
  //Show debug info if "-" is held
  if (keyIsDown(189)) {
    textSize(15);
    noStroke();
    fill(strokeColor);
    text(
      gameState + " DED?:" + bobIsDead + " TIME: " + Math.round(millis()) + " GSTART:" + Math.round(gameOffsetTime) + " STAGE:" + projectileStage  + " LINE:" + activeLinePositon,
      15,
      30
    );
  }
}

function displayScore() {
  //Display current level in top right
  textAlign(LEFT);
  textFont(mono);
  noStroke();
  textSize(20);
  fill(strokeColor);
  text("Level: " + projectileStage, width - 140, 50);
}

function draw() {
  background(backgroundColor);
  changeGameState();
  debugInfo();
  if (gameState === "startScreen") {
    startScreen();
  }
  else if (gameState === "game") {
    if (projectileStage === 0) {
      textSize(10);
      fill(100);
      noStroke();
      textAlign(CENTER);
      text(introLine, width /2, height / 2);
    }
    dropCurrentRow();
    displayScore();
    fullGameRows();
    drawBob();
    moveBob();
    drawBounds();
  }
  else if (gameState === "instructions") {
    instructions();
  }
  else if (gameState === "deathScreen") {
    deathScreen();
  }
}