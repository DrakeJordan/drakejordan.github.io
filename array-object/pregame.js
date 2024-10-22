let gameStartTimer = 5; // Time until the game starts
let gameStartTimerTime = 0; // Initial time for the game start timer
let gameStartTimerSet = false; // Has the game start timer been set

// Screen shown before the game starts
function pregameScreen() {
  textAlign(CENTER);

  // Reset the game winner
  sharedDataStore.gameWinner = 0;

  // Info shown if player is the tagger
  if (activePlayerUUID ===  sharedDataStore.p1UUID) {
    textSize(65);
    textFont(semibold);
    fill(0);
    text("You are the tagger!", width / 2, height / 2-50-40);

    fill("orange");
    text("Your color is orange.", width / 2, height / 2+30-40);
    
    textSize(20);
    textFont(regular);
    fill(0);
    text("Try to tag the player colored black to win!", width / 2 , height/2 + 90-40);
  }

  // Info shown if player is the runner
  else if (activePlayerUUID ===  sharedDataStore.p2UUID) {
    textSize(65);
    textFont(semibold);
    fill(0);
    text("You are the runner!", width / 2, height / 2-50-40);

    text("Your color is black.", width / 2, height / 2+30-40);
    
    textSize(20);
    textFont(regular);
    fill(0);
    text("Try to run from the player colored orange to win!", width / 2 , height/2 + 90-40);
    text(gameStartTimer + gameStartTimerTime, width / 2 , height/2 + 90);
  }

  // Show the game start timer
  if (gameStartTimer !== 0) {
    textSize(70);
    textFont(semibold);
    text(gameStartTimer, width / 2 , height/2 + 190);
  } 
  else {
    // Start the game when timer ends
    gameState = "game";
  }

  // If the game start timer has not been set, set it
  if (!gameStartTimerSet){
    gameStartTimerTime = millis();
    gameStartTimerSet = true;
  }

  // Count down game start timer every one second
  if (millis() > gameStartTimerTime + 1000) {
    gameStartTimerTime = millis();
    gameStartTimer -= 1;
  }

}