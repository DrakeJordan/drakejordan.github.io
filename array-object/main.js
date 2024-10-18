// Arrays and Object Notation
// Drake Jordan
// 10/8/2024
//
// Extra for Experts:
// - Used p5.party for multiplayer support

const PLAYER_SPEED = 4;
const PLAYER_SIZE = 20;

let joinGameButtonX = 0;
let joinGameButtonY = 0;

let gameState = "titleScreen";
let sharedDataStore;

let activePlayer = 1;
let activePlayerUUID = "";

let isColliding = false;

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
    activeTagger: 0,
    gameWinner: 0,
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
  let randomTaggerNumeber = random(100); 
  if (randomTaggerNumeber > 50) {
    sharedDataStore.activeTagger = 1;
  } 
  else { 
    sharedDataStore.activeTagger = 2;
  }
}

function joinGameButton() {
  let opacity = 100;

  if (mouseX >= width / 4-80 && mouseX <= width / 4-80 + 165 && mouseY >=  height / 2 + 190 && mouseY <=  height / 2 + 190 + 45) {
    opacity = 150;
  } 
  else {
    opacity = 400;
  }

  textSize(25);
  textFont(semibold);

  fill(10,132,255, opacity);
  rect(width / 4-80, height / 2 + 190, 163, 45, 14);

  fill(255);
  text("Join a Game", width / 4, height / 2 + 220);
}

function createGameButton() {
  let opacity = 100;

  if (mouseX >= width / 4*2.5 && mouseX <= width / 4*2.5 + 186 && mouseY >=  height / 2 + 190 && mouseY <=  height / 2 + 190 + 45) {
    opacity = 150;
  } 
  else {
    opacity = 400;
  }
  textSize(25);
  textFont(semibold);

  fill(10,132,255, opacity);
  rect(width / 4*2.5, height / 2 + 190, 186, 45, 14);

  fill(255);
  text("Create a Game", width / 4*2.5 + 93, height / 2 + 220);
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

  // Check if user is clicking "Create a Game"
  if (mouseX >= width / 4*2.5 && mouseX <= width / 4*2.5 + 186 && mouseY >=  height / 2 + 190 && mouseY <=  height / 2 + 190 + 45 && gameState === "titleScreen") {
    gameState = "createGame";
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
  // Draw Player 1 as black
  fill(0);
  square(sharedDataStore.p1x, sharedDataStore.p1y, PLAYER_SIZE, 4);

  // Draw Player 2 as orange
  fill("orange");
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
  text("Create or join a game to play with a friend.", width / 2 , height/2 + 50);
}

function checkCollision() {
  // If active tagger is Player 1 (black)

  if (
    sharedDataStore.p2x + PLAYER_SIZE >= sharedDataStore.p1x &&
      sharedDataStore.p1x + PLAYER_SIZE >= sharedDataStore.p2x &&
      sharedDataStore.p2y + PLAYER_SIZE >= sharedDataStore.p1y &&
      sharedDataStore.p1y + PLAYER_SIZE >= sharedDataStore.p2y
  ) {
    if (sharedDataStore.activeTagger === 1 ) {
      sharedDataStore.gameWinner = 1;
    } 
    else {
      sharedDataStore.gameWinner = 2;
    }
    isColliding = true; 
    gameState = "winnerScreen";
  }  
  else {
    isColliding = false;
  }
  
}

function debugKeyActions() {
  if (keyIsDown(49)) {
    sharedDataStore.p1UUID = activePlayerUUID;
  }
  else if (keyIsDown(50)) {
    sharedDataStore.p2UUID = activePlayerUUID;
  }

  if (keyIsDown(187)) {
    sharedDataStore.gameWinner = 0;
    sharedDataStore.p1UUID = 0;
    sharedDataStore.p2UUID = 0;

    sharedDataStore.p1x = 100;
    sharedDataStore.p2x = 200;
  }
}

function winnerScreen() {
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);

  textSize(45);
  textFont(semibold);
  if (sharedDataStore.gameWinner === 1) {
    text("Orange Player Wins!", width / 2, height / 2);
  } 
  else {
    text("Black Player Wins!", width / 2, height / 2);
  }
}


function draw() {
  background(255);

 
  debugKeyActions();
  if (gameState === "titleScreen") {
    titleScreen();
    joinGameButton();
    createGameButton();
  }  
  else if (gameState === "createGame") {
    fill(0);
    text("Create a Game Screen", width / 2, height / 2);
  } 
  else if (gameState === "game" && sharedDataStore.gameWinner === 0) {
    text("P1: " + sharedDataStore.p1UUID + " " + "P2: " + sharedDataStore.p2UUID + " Active:" + activePlayerUUID + " Tagger:" + sharedDataStore.activeTagger + " Winner: " + sharedDataStore.gameWinner + " State:" + gameState, 50, 50);
    movePlayer();
    drawPlayers();
    checkCollision();
  }
  else if (gameState === "winnerScreen") {
    winnerScreen();
  }
}