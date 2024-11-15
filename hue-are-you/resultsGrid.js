// Show grid with game results
function resultsGrid() {
  drawColorGrid();
  updateColorGridSize();
  drawResultsPannel();
  goBackButton();
}

// Draw the results right hand information panel
function drawResultsPannel() {
  fill(0);
  textFont(semibold);
  textSize(30);
  textAlign(LEFT, CENTER);
  text("Here's how you did!", width / 1.39, 250);
  
  image(resultsGridIcon, width / 1.34, 50, gridIcon.width / 6, gridIcon.height / 6);
  
  // Show user selected color compared to actual color
  if (currentlySelectedColor !== undefined && finalColor !== undefined) {
    text("Yours", width / 2 + 292, 580);

    text("Actual", width / 2 + 542, 580);

    noStroke();
    fill(
      currentlySelectedColor.hue,
      currentlySelectedColor.saturation,
      currentlySelectedColor.brightness,
      currentlySelectedColor.alpha
    );
    square(width / 2 + 250, height / 2 - GAME_SELECTED_PREVIEW_SIZE / 2, GAME_SELECTED_PREVIEW_SIZE, 35);

    stroke(0);
    strokeWeight(5);
    fill(
      finalColor.hue,
      finalColor.saturation,
      finalColor.brightness,
      finalColor.alpha
    );
    square(width / 2 + 500, height / 2 - GAME_SELECTED_PREVIEW_SIZE / 2, GAME_SELECTED_PREVIEW_SIZE, 35);
  } 

}

// Button to go back to results page
function goBackButton() {
  let isHovered = false;
  
  if (mouseX >= width / 2 +250 && mouseX <= width / 2 +250 + 400 && mouseY >= height - 140 && mouseY <= height - 140 + 60) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }
  noStroke();
  isHovered ? fill(64, 0, 25) : fill(0);
  rect(width / 2 + 250, height - 140, 400, 60, 18);
  textFont(medium);
  fill(255);
  textSize(29);
  text("Go Back", width / 2 + 395, height - 115);
}