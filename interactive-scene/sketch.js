// Interactive Scene
// Drake Jordan
// 10/1/2024
//
// Extra for Experts:
// - Used mouse wheel input as a core gameplay aspect to change background and projectile color.

// Scene variables
let strokeColor = 0;
let backgroundColor = 220;

// Scene constants
const BOUND_WIDTH = 18;
const EDGE_OFFSET = 16;

// Lines shown when starting a game
let introLines = ["please don't let me die", "i have a family...", "i don't wanna be crushed", "why am i here", "i miss my kids"];

// Pick a random line to use
let introLine = introLines[Math.floor(Math.random() * introLines.length)];

let regular; // Regular weight font
let semibold; // Semibold weight font
let mono; // Monospaced font

let bob; // Bob image

let gameState = "startScreen"; // Game state
let bobIsDead = false; // Is bob dead
let gameOffsetTime; // Offset between projectile rows

function preload() {
  // Load fonts and Bob image

  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
  mono = loadFont("SFMono-Semibold.otf");
  bob = loadImage("bob.png");
}

function setup() {
  // Create canvas and put Bob in the middle of the screen
  createCanvas(600, 600);
  bobX = width / 2;
}

function changeGameState() {
  // Change the game state depending on user input

  if (gameState === "startScreen" && mouseIsPressed) {
    projectileStage = 0;
    gameState = "game";
    gameOffsetTime = millis();
  }
  if (gameState === "startScreen" && keyIsDown(73)) {
    gameState = "instructions";
  } 
  else if ((gameState === "instructions" || gameState === "deathScreen" || gameState === "winnerScreen")&& keyIsDown(8)) {
    gameState = "startScreen";
    bobIsDead = false;
    Object.keys(clickStatus).forEach(key => clickStatus[key] = true);
  }
  if (bobIsDead) {
    // Reset key game variables when Bob dies
    gameState === "deathScreen";
    activeLinePositon = 0;
    bobX = width / 2;
    bobY = 0;
    introLine = introLines[Math.floor(Math.random() * introLines.length)];  
  }

}

function startScreen() {
  // Screen shown when game starts

  textAlign(CENTER);
  noStroke();
  fill(strokeColor);

  textSize(35);
  textFont(semibold);
  text("Welcome to Bob's World.", width / 2, height / 2);

  textSize(20);
  textFont(regular);
  text(
    "Click anywhere to start, or press \"i\" for instructions.",
    width / 2 ,
    height - 50
  );
}

function mouseWheel(event) {
  // If mouse wheel moves up, set background to black and stroke to white
  if (event.delta > 0) {
    backgroundColor = 0;
    strokeColor = 220;
  }
  else {
    // If mouse wheel moves down, set background to white and stroke to black
    backgroundColor = 220;
    strokeColor = 0;
  }
}

function drawBounds() {
  strokeWeight(BOUND_WIDTH);
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

function displayIntroLine() {
  // Shows the randomized intro line
  textSize(10);
  fill(100);
  noStroke();
  textAlign(CENTER);
  text(introLine, width /2, height / 2);
}

function draw() {
  // Draw correct screen depending on game state

  background(backgroundColor);
  changeGameState();
  debugInfo();
  if (gameState === "startScreen") {
    startScreen();
  }
  else if (gameState === "game") {
    // Loop all key aspects of gameplay if gameState is game
    
    if (projectileStage === 0) {
      // Show intro line if game has not started
      displayIntroLine();
    }

    dropCurrentRow();

    if (projectileStage < 13) {
      // Show score if within the main levels
      displayScore();
    }
    
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
  else if (gameState === "winnerScreen") {
    winnerScreen();
  }
}