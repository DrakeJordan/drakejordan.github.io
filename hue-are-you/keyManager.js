function keyPressed() {
// If on title screen and user presses "I", change game state to instructions
  if (keyCode === 73 && gameState === "title") {
    gameState = "instructions";
  }
}