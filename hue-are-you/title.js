// Screen shown when game starts
function titleScreen() {
  textAlign(CENTER);
  noStroke();
  fill(0);
    
  textSize(65);
  textFont(semibold);
  text("Hue are You?", width / 2, height / 2);
    
  textSize(20);
  textFont(regular);
  text("Create or join a game to play with a friend.", width / 2 , height/2 + 50);
  
  joinGameButton();
  createGameButton();
}
  
// Button allowing user to join a game
function joinGameButton() {
  let opacity = 100;
    
  // If mouse is hovering button, lower opacity
  if (mouseX >= width / 4-80 && mouseX <= width / 4-80 + 165 && mouseY >=  height / 2 + 190 && mouseY <=  height / 2 + 190 + 45) {
    opacity = 150;
  } 
  else {
    opacity = 400;
  }
    
  textSize(25);
  textFont(semibold);
    
  fill(10,132,255, opacity);
  rect(width / 4-80, height / 2 + 190, 163, 45, 14);
    
  fill(255);
  text("Join a Game", width / 4, height / 2 + 220);
}
    
  
// Button allowing user to create a game
function createGameButton() {
  let opacity = 100;
    
  // If mouse is hovering button, lower opacity
  if (mouseX >= width / 4*2.5 && mouseX <= width / 4*2.5 + 186 && mouseY >=  height / 2 + 190 && mouseY <=  height / 2 + 190 + 45) {
    opacity = 150;
  } 
  else {
    opacity = 400;
  }
  textSize(25);
  textFont(semibold);
    
  fill(10,132,255, opacity);
  rect(width / 4*2.5, height / 2 + 190, 186, 45, 14);
    
  fill(255);
  text("Create a Game", width / 4*2.5 + 93, height / 2 + 220);
}