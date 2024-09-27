function deathScreen() {
  noStroke();
  fill(strokeColor);
  
  textSize(35);
  textFont(semibold);
  text("Oh! Bob is dead.", width / 2 - 130, height / 2);
  
  textSize(20);
  textFont(regular);
  text("Press \"Backspace\" to return to the start screen.",
    width / 2 - 200,
    height - 50
  );
}