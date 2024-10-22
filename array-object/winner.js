function winnerScreen() {
  // If user is the tagger
  if (sharedDataStore.p1UUID === activePlayerUUID) {
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
  
    textSize(45);
    textFont(semibold);
    if (sharedDataStore.gameWinner === 1) {
      image(winnerIcon, width/2 - winnerIcon.width/5, 100, winnerIcon.width/2.5, winnerIcon.height/2.5);
      text("Great job! You win.", width / 2, height / 2);
      textSize(20);
      textFont(regular);
      text("You tagged the other player in time.", width / 2 , height/2 + 55);
    } 
    else {
      text("Better luck next time.", width / 2, height / 2);
      textSize(20);
      textFont(regular);
      text("You did not tag the other player in time.", width / 2 , height/2 + 55);
    }

    text("Refresh the page to play again.", width / 2 , height - 55);
  } 
  // If user is the runner
  else if (sharedDataStore.p2UUID === activePlayerUUID) {
    textAlign(CENTER, CENTER);
    noStroke();
    fill(0);
  
    textSize(45);
    textFont(semibold);
    if (sharedDataStore.gameWinner === 2) {
      image(winnerIcon, width/2 - winnerIcon.width/5, 100, winnerIcon.width/2.5, winnerIcon.height/2.5);
      text("Great job! You win.", width / 2, height / 2);
      textSize(20);
      textFont(regular);
      text("You avoided the tagger.", width / 2 , height/2 + 55);
    } 
    else {
      text("Better luck next time.", width / 2, height / 2);
      textSize(20);
      textFont(regular);
      text("You got tagged by the tagger.", width / 2 , height/2 + 55);
    }

    text("Refresh the page to play again.", width / 2 , height - 55);
}
}