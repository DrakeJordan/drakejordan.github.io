function mousePressed() {
  if (mouseX >= width / 2 - 110 && mouseX <= width / 2 - 110 + 220 && mouseY >= height - 220 && mouseY <= height - 220 + 60 && gameState === "title") {
    gameState = "game";
  }
}