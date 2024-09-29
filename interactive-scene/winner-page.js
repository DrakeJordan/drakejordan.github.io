function winnerScreen() {
  textAlign(CENTER);
  noStroke();
  fill(strokeColor);
    
  textSize(35);
  textFont(semibold);
  text("Omg you won.", width /2, height / 2);
  
  textSize(18);
  textFont(regular);
  text("Bob gets to live because of you", width / 2, height / 2 + 40);
    
  textSize(20);
  textFont(regular);
  text("Press \"Backspace\" to return to the start screen.",
    width / 2 ,
    height - 50
  );
}