// Arrays and Object Notation
// Drake Jordan
// 10/8/2024
//
// Extra for Experts:
// - Used p5.party for multiplayer support

const PLAYER_SPEED = 4;
const PLAYER_SIZE = 20;

let gameState = "game";
let sharedDataStore

let activePlayer = 1;
let activePlayerUUID = "";

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
    p1UUID: "",
    p2UUID: "",
    activeJoinCodes: [],
  });
}

function setup() {
  createCanvas(900, 700);
  noStroke();
  if (sharedDataStore.p1UUID === "") {
    activePlayerUUID = random(10000000000);
    sharedDataStore.p1UUID = activePlayerUUID;
  } 
  else {
    activePlayerUUID = random(10000000000);
    sharedDataStore.p2UUID = activePlayerUUID;
  }
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
  if (sharedDataStore.p1UUID === activePlayerUUID) {
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
  else if (sharedDataStore.p2UUID === activePlayerUUID) {
    // Move player up
    if ((keyIsDown(87) || keyIsDown(38)) && sharedDataStore.p1y >= 0) {
      sharedDataStore.p1y -= PLAYER_SPEED;
    }
  
    // Move player down
    if ((keyIsDown(83) || keyIsDown(40)) && sharedDataStore.p1y <= height-22) {
      sharedDataStore.p1y += PLAYER_SPEED;
    }
  
    // Move player left
    if ((keyIsDown(65) || keyIsDown(37)) && sharedDataStore.p1x >= 0) {
      sharedDataStore.p1x -= PLAYER_SPEED;
    }
  
    // Move player right
    if ((keyIsDown(68) || keyIsDown(39)) && sharedDataStore.p1x <= width-22) {
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

  textSize(20);
  textFont(regular);
  text(
    "",
    width / 2 ,
    height - 50
  );
}

function showDebugInfo() {
  if (keyIsDown(189)) {
    text(activePlayerUUID, sharedDataStore.p1UUID, 50, 50);
  }
}


function draw() {
  background(255);

  showDebugInfo();
  text("P1: " + sharedDataStore.p1UUID + " " + "P2: " + sharedDataStore.p2UUID + " Active:" + activePlayerUUID, 50, 50);
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