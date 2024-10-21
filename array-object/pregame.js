let gameStartTimer = 5;
let gameStartTimerTime = 0;
let gameStartTimerSet = false;

function pregameScreen() {
  textAlign(CENTER);
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

  if (gameStartTimer !== 0) {
    textSize(70);
    textFont(semibold);
    text(gameStartTimer, width / 2 , height/2 + 190);
  } 
  else {
    gameState = "game";
  }


  if (!gameStartTimerSet){
    gameStartTimerTime = millis();
    gameStartTimerSet = true;
  }

  if (millis() > gameStartTimerTime + 1000) {
    gameStartTimerTime = millis();
    gameStartTimer -= 1;
  }

}