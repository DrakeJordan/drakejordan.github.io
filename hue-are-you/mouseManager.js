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

  // Title screen "Instructions" button
  if (mouseX >= width / 2 - 74 && mouseX <= width / 2 - 74 + 150 && mouseY >= height - 180 && mouseY <= height - 180 + 50 && gameState === "title") {
    gameState = "instructions";
  }

  // Game "Pick Hue" button
  if (mouseX >= width / 2 +250 && mouseX <= width / 2 +250 + 400 && mouseY >= height - 140 && mouseY <= height - 140 + 60 && gameState === "game") {
    gameState = "results";
  }
}