let gameEndTimer = 30; // Time till the game ends
let gameEndTimerTime = 0; // Initial game end timer starting time
let gameEndTimerSet = false; // Whether or not the game end timer has been set


function drawPlayers() {
  // Draw Player 1 as black
  fill(0);
  square(sharedDataStore.p1x, sharedDataStore.p1y, PLAYER_SIZE, 4);
  
  // Draw Player 2 as orange
  fill("orange");
  square(sharedDataStore.p2x, sharedDataStore.p2y, PLAYER_SIZE, 4);
}

function drawCountdown() {
  // Draw countdown until the game ends
  if (gameEndTimer !== 0) {
    textSize(70);
    textFont(semibold);
    text(gameEndTimer, width / 2 , height/2 + 190);
  } 
  else {
    // When countdown ends, set winner
    sharedDataStore.gameWinner = 2;
    gameState = "winnerScreen";
  }

  // If game timer has not been set, set it
  if (!gameEndTimerSet){
    gameEndTimerTime = millis();
    gameEndTimerSet = true;
  }

  // Count down game timer every 1 second
  if (millis() > gameEndTimerTime + 1000) {
    gameEndTimerTime = millis();
    gameEndTimer -= 1;
  }
}
  
// Check if players are colliding
function checkCollision() {

  // If game winner is found, change game state
  if (sharedDataStore.winnerFound) {
    gameState = "winnerScreen";
  }
  
  // If players collide, set collision and winners
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
    sharedDataStore.gameWinner = 1;
    sharedDataStore.winnerFound = true;
    gameState = "winnerScreen";
  }  
  else {
    isColliding = false;
  }
    
}

function movePlayer() {
  if (sharedDataStore.p1UUID === activePlayerUUID) {
    // Move player 2 up
    if ((keyIsDown(87) || keyIsDown(38)) && sharedDataStore.p2y >= 0) {
      sharedDataStore.p2y -= PLAYER_SPEED;
    }
  
    // Move player 2 down
    if ((keyIsDown(83) || keyIsDown(40)) && sharedDataStore.p2y <= height-22) {
      sharedDataStore.p2y += PLAYER_SPEED;
    }
  
    // Move player 2 left
    if ((keyIsDown(65) || keyIsDown(37)) && sharedDataStore.p2x >= 0) {
      sharedDataStore.p2x -= PLAYER_SPEED;
    }
  
    // Move player 2 right
    if ((keyIsDown(68) || keyIsDown(39)) && sharedDataStore.p2x <= width-22) {
      sharedDataStore.p2x += PLAYER_SPEED;
    }
  }
  else if (sharedDataStore.p2UUID === activePlayerUUID) {
    // Move player 1 up
    if ((keyIsDown(87) || keyIsDown(38)) && sharedDataStore.p1y >= 0) {
      sharedDataStore.p1y -= PLAYER_SPEED;
    }
    
    // Move player 1 down
    if ((keyIsDown(83) || keyIsDown(40)) && sharedDataStore.p1y <= height-22) {
      sharedDataStore.p1y += PLAYER_SPEED;
    }
    
    // Move player 1 left
    if ((keyIsDown(65) || keyIsDown(37)) && sharedDataStore.p1x >= 0) {
      sharedDataStore.p1x -= PLAYER_SPEED;
    }
    
    // Move player 1 right
    if ((keyIsDown(68) || keyIsDown(39)) && sharedDataStore.p1x <= width-22) {
      sharedDataStore.p1x += PLAYER_SPEED;
    }
  }
}