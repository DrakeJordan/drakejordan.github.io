// Arrays and Object Notation
// Drake Jordan
// 10/8/2024
//
// Extra for Experts:
// - Used p5.party for multiplayer support

const PLAYER_SPEED = 4; // Constant player speed
const PLAYER_SIZE = 20; // Constant player size

let gameState = "titleScreen"; // The games current state
let sharedDataStore; // Initalize shared data store

let activePlayer = 1; // The active games player
let activePlayerUUID = ""; // The active games player UUID

let isColliding = false; // If players are colliding or not

let semibold; // Semibold font
let regular; // Regular font


// Code button images
let starButton; 
let heartButton;
let triangleButton;
let circleButton;

// Initalize array for code button images
let buttonImages = [];

let logo; // Game logo
let winnerIcon; // Winner crown image

let sharedDataStoreCode = ""; // Data store server code
let sharedDataStoreCodeCreated = false; // Whether or not the data store server code ahs been created

function preload() {
  // Load fonts and images
  regular = loadFont("SF-Pro-Display-Regular.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");
  logo = loadImage("images/logo.png");
  winnerIcon = loadImage("images/winner.png");
  starButton = loadImage("images/star.button.png");
  heartButton = loadImage("images/heart.button.png");
  triangleButton = loadImage("images/triangle.button.png");
  circleButton = loadImage("images/circle.button.png");

  // Connect to initial p5.party server
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
    gameEndCountdown: 0,
    winnerFound: false
  });
}
 
function setup() {
  createCanvas(900, 700);
  noStroke();

  // Reset shared data store code
  sharedDataStoreCode = "";

  // Create array of code button images
  buttonImages = [starButton, triangleButton, heartButton, circleButton];
}

// Draw and run game code depending on game state
function draw() {
  background(255);
  textSize(15);
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
    movePlayer();
    drawPlayers();
    checkCollision();
    drawCountdown();
  }
  else if (gameState === "winnerScreen") {
    winnerScreen();
  }
}