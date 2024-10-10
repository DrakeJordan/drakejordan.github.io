// Arrays and Object Notation
// Drake Jordan
// 10/8/2024
//
// Extra for Experts:
// - Used p5.party for multiplayer support

let sharedDataStore;
const PLAYER_SPEED = 4;
const PLAYER_SIZE = 20;

let gameState = "titleScreen";

let createMatchButton;
let joinMatchButton;

function preload() {
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
  logo = loadImage("tempGameLogo.png");

	  partyConnect(
		  "wss://demoserver.p5party.org", 
		  "multiplayerGame"
	  );
  sharedDataStore = partyLoadShared("shared", {
    p1x: 100,
    p1y: 100,
    p2x: 200,
    p2y: 200,
    activeJoinCodes: [],
  });
}

function setup() {
  createCanvas(900, 700);
  noStroke();
  createMatchButton = createButton('Create Match', 'createMatch');
  joinMatchButton = createButton('Join Match', 'joinMatch');

  joinMatchButton.position(width-150,700);
  createMatchButton.position(width/2-60,700);

  gameState = "titleScreen";
}

function mousePressed() {
  // DEBUG - TO DELETE: Moves p1 or p2 to mouse press
  if (keyIsDown(80)) {
    sharedDataStore.p2x = mouseX;
    sharedDataStore.p2y = mouseY;
  } 
  else {
    sharedDataStore.p1x = mouseX;
    sharedDataStore.p1y = mouseY;
  }
}

function movePlayer() {
  // THIS IS DEBUG: moves p2 if p is held
  if (keyIsDown(80)) {
  // Move player up
    if (keyIsDown(87) || keyIsDown(38)) {
      sharedDataStore.p2y -= PLAYER_SPEED;
    }

    // Move player down
    if (keyIsDown(83) || keyIsDown(40)) {
      sharedDataStore.p2y += PLAYER_SPEED;
    }

    // Move player left
    if (keyIsDown(65) || keyIsDown(37)) {
      sharedDataStore.p2x -= PLAYER_SPEED;
    }

    // Move player right
    if (keyIsDown(68) || keyIsDown(39)) {
      sharedDataStore.p2x += PLAYER_SPEED;
    }
  }
  else {
    // Move player up
    if (keyIsDown(87) || keyIsDown(38)) {
      sharedDataStore.p1y -= PLAYER_SPEED;
    }
  
    // Move player down
    if (keyIsDown(83) || keyIsDown(40)) {
      sharedDataStore.p1y += PLAYER_SPEED;
    }
  
    // Move player left
    if (keyIsDown(65) || keyIsDown(37)) {
      sharedDataStore.p1x -= PLAYER_SPEED;
    }
  
    // Move player right
    if (keyIsDown(68) || keyIsDown(39)) {
      sharedDataStore.p1x += PLAYER_SPEED;
    }
  }
}

function drawPlayers() {
  fill(0);
  square(sharedDataStore.p1x, sharedDataStore.p1y, PLAYER_SIZE, 4);

  fill(255, 200, 0);
  square(sharedDataStore.p2x, sharedDataStore.p2y, PLAYER_SIZE, 4);
}

function titleScreen() {
  textAlign(CENTER);
  noStroke();
  fill(0);

  image(logo, width/2 - logo.width/5, 100, logo.width/2.5, logo.height/2.5);

  textSize(65);
  textFont(semibold);
  text("Welcome to Tag World!", width / 2, height / 2);

  joinMatchButton.style('font-size', '30px');
  createMatchButton.style('font-size', '30px');

  textSize(20);
  textFont(regular);
  text(
    "",
    width / 2 ,
    height - 50
  );
}

function changeGameState() {
  if (gameState === "titleScreen" && keyIsPressed(56)) {
    gameState = "game";
  }
}


function draw() {
  background(255);

  text(gameState, 50, 50);

  changeGameState();

  if (gameState === "titleScreen") {
    titleScreen();
  }  
  else if (gameState === "matchmaking") {

  } 
  else if (gameState === "game") {
    movePlayer();
    drawPlayers();
  }
}