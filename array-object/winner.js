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