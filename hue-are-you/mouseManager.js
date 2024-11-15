function mousePressed() {
  // Grid detecting tile presses
  if (gameState === "game") {
    let squareY = Math.floor(mouseY/TILE_SIZE);
    let squareX = Math.floor(mouseX/TILE_SIZE);
  
    toggleTile(squareX, squareY);
  }

  // Title screen "Start!" button
  if (mouseX >= width / 2 - 110 && mouseX <= width / 2 - 110 + 220 && mouseY >= height - 250 && mouseY <= height - 250 + 60 && gameState === "title") {
    gameState = "intro";
  }

  // Game "Pick Hue" button
  if (mouseX >= width / 2 +250 && mouseX <= width / 2 +250 + 400 && mouseY >= height - 140 && mouseY <= height - 140 + 60 && gameState === "game") {
    if (!isSinglePlayer) {
      if (partyIsHost()) {
        shared.sharedHostHasPicked = true;
      }
      else {
        shared.sharedGuestHasPicked = true;
      }
    }
    gameState = "results";
  }

  // "Check Grid" button
  if (mouseX >= width / 2 - 110 && mouseX <= width / 2 - 110 + 220 && mouseY >= height - 226 && mouseY <= height - 226 + 60 && gameState === "results") {
    if (!isSinglePlayer) {
      if (partyIsHost()) {
        currentlySelectedColor = shared.sharedHostSelectedColor;
        finalColor = shared.sharedFinalColor;
      }
      else {
        currentlySelectedColor = shared.sharedGuestSelectedColor;
        finalColor = shared.sharedFinalColor;
      }
    }
    gameState = "resultsGrid";
  }

  // "Go Back"" button
  if (mouseX >= width / 2 +250 && mouseX <= width / 2 +250 + 400 && mouseY >= height - 140 && mouseY <= height - 140 + 60 && gameState === "resultsGrid") {
    gameState = "results";
  }
}