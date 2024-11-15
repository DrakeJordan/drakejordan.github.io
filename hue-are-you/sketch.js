// Hue are You?
// Drake Jordan 
// Oct 25, 2024
//
// Extra for Experts:
// - Used p5.party for multiplayer support
// - Used map for scoring and grid generation
//
// IMPORTANT NOTE: When "different values for single and multiplayer" is mentioned only the first few lines of code for that section will be commented, this is intentional. It means that the only values that change are variables, not core logic.

let regular; // Regular font
let medium; // Medium font  
let semibold; // Semibold font

let logo; // Logo image
let gridIcon; // Grid icon image
let resultsGridIcon; // Results grid icon image

let shockedReaction; // Shocked reaction image
let happyReaction; // Happy reaction image
let sadReaction; // Sad reaction image

let gameState = "title"; // Game state

let room = prompt("Enter room code or leave blank for single player"); // Prompt asking user for join code or single player mode

let shared; // Shared data store

let isSinglePlayer = false; // Is it a single player game

let sharedFinalColor; // Multiplayer final color
let sharedFinalColorX; // Multiplayer final color x
let sharedFinalColorY; // Multiplayer final color y
let sharedFinalColorFound = false; // Multiplayer show final color

let sharedHostSelectedColor; // Multiplayer host color
let sharedHostSelectedColorX; // Multiplayer host color x
let sharedHostSelectedColorY; // Multiplayer host color y

let sharedGuestSelectedColor; // Multiplayer guest color
let sharedGuestSelectedColorX; // Multiplayer guest color x
let sharedGuestSelectedColorY; // Multiplayer guest color y

let sharedHostHasPicked; // Multiplayer has host picked color
let sharedGuestHasPicked; // Multiplayer has guest picked color

let sharedHostScore; // Multiplayer host score
let sharedGuestScore; // Multiplayer guest score

let sharedScoreTimeComplete; // Multiplayer have both players been scored

// Load images, text, and p5party
function preload() {
  if (room === "") {
    isSinglePlayer = true;
  }
  if (!isSinglePlayer) {
    partyConnect("wss://demoserver.p5party.org", "hue_are_you", room);
    shared = partyLoadShared("shared", {
      sharedFinalColor,
      sharedFinalColorX,
      sharedFinalColorY,
      sharedFinalColorFound,

      sharedHostSelectedColor,
      sharedHostSelectedColorX,
      sharedHostSelectedColorY,

      sharedGuestSelectedColor,
      sharedGuestSelectedColorX,
      sharedGuestSelectedColorY,

      sharedHostHasPicked,
      sharedGuestHasPicked,

      sharedHostScore,
      sharedGuestScore,

      sharedScoreTimeComplete
    });
  }


  regular = loadFont("SF-Pro-Display-Regular.otf");
  medium = loadFont("SF-Pro-Display-Medium.otf");
  semibold = loadFont("SF-Pro-Display-Semibold.otf");

  logo = loadImage("assets/logo.png");
  gridIcon = loadImage("assets/grid.icon.png");
  resultsGridIcon = loadImage("assets/results.grid.icon.png");

  shockedReaction = loadImage("assets/shock.png");
  happyReaction = loadImage("assets/happy.png");
  sadReaction = loadImage("assets/sad.png");

  // Generate the color grid
  createColorGrid(); 
}
 
function setup() {
  // Set color mode to be HSB
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  createCanvas(1500, 900);
  background(255);

  // Show correct screen for game state
  if (gameState === "title") {
    titleScreen();
  }
  else if (gameState === "intro") {
    gameIntro();
  }
  else if (gameState === "game") {
    gameScreen();
  } 
  else if (gameState === "results") {
    tabulation();
  }
  else if (gameState === "resultsGrid") {
    resultsGrid();
  }
}

