// Arrays and Object Notation
// Drake Jordan
// 10/8/2024
//
// Extra for Experts:
// - Used p5.party for multiplayer support

//TO-DO
//Work out edge cases and fix multiplayer pairing
//Complete game logic
//Add winner screen
//User will have to refresh window to start a new game to reset key values

const PLAYER_SPEED = 4;
const PLAYER_SIZE = 20;

let gameState = "titleScreen";
let sharedDataStore;

let activePlayer = 1;
let activePlayerUUID = "";

let isColliding = false;

let semibold;
let regular;

let starButton;
let heartButton;
let triangleButton;
let circleButton;

let buttonImages = [];

let logo;
let winnerIcon;

let sharedDataStoreCode = "";
let sharedDataStoreCodeCreated = false;

function preload() {
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
  logo = loadImage("images/logo.png");
  winnerIcon = loadImage("images/winner.png");

  starButton = loadImage("images/star.button.png");
  heartButton = loadImage("images/heart.button.png");
  triangleButton = loadImage("images/triangle.button.png");
  circleButton = loadImage("images/circle.button.png");

  partyConnect(
		  "wss://demoserver.p5party.org", 
		  "multiplayerGame"
	  );
  sharedDataStore = partyLoadShared("placeholder", {
    p1x: width - 40,
    p1y: height/2,
    p2x: 40,
    p2y: height/2,
    p1UUID: "",
    p2UUID: "",
    activePlayers: 0,
    gameWinner: 0,
    gameCountdown: 0,
    gameEndCountdown: 0
  });
}
 
function setup() {
  createCanvas(900, 700);
  noStroke();

  sharedDataStoreCode = "";

  buttonImages = [starButton, triangleButton, heartButton, circleButton];
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

function draw() {
  background(255);
  debugKeyActions();
  textSize(15);
  //text(sharedDataStore.activePlayers, width / 2, 200);
  if (gameState === "titleScreen") {
    titleScreen();
  }  
  else if (gameState === "createGame") {
    createGameScreen();
  } 
  else if (gameState === "joinGame") {
    joinGameScreen();
  }
  else if (gameState === "pregame") {
    pregameScreen();
  }
  else if (gameState === "game" && sharedDataStore.gameWinner === 0) {
    //text("P1: " + sharedDataStore.p1UUID + " " + "P2: " + sharedDataStore.p2UUID + " Active:" + activePlayerUUID + " Tagger:" + sharedDataStore.activeTagger + " Winner: " + sharedDataStore.gameWinner + " State:" + gameState, 50, 50);
    movePlayer();
    drawPlayers();
    checkCollision();
    drawCountdown();
  }
  else if (gameState === "winnerScreen") {
    winnerScreen();
  }
}