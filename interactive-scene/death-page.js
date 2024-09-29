function deathScreen() {
  textAlign(CENTER);
  noStroke();
  fill(strokeColor);
  
  textSize(35);
  textFont(semibold);
  text("Oh! Bob is dead.", width /2, height / 2);

  textSize(18);
  textFont(regular);
  text("You made it to level " + projectileStage, width / 2, height / 2 + 40);
  
  textSize(20);
  textFont(regular);
  text("Press \"Backspace\" to return to the start screen.",
    width / 2 ,
    height - 50
  );
}