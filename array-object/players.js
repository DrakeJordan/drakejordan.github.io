function drawPlayers() {
  // Draw Player 1 as black
  fill(0);
  square(sharedDataStore.p1x, sharedDataStore.p1y, PLAYER_SIZE, 4);
  
  // Draw Player 2 as orange
  fill("orange");
  square(sharedDataStore.p2x, sharedDataStore.p2y, PLAYER_SIZE, 4);
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