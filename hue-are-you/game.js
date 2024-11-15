let colorGrid = []; // Array holding the color grid
let TILE_SIZE = 25; // Size of tiles on color grid
const GRID_SIZE = 20; // Number of tiles in each direction
let currentlySelectedColor; // Color selected by user

let GAME_SELECTED_PREVIEW_SIZE = 170; // Size of the selected color preview square

let isColorTileSelected = false; // Is a tile currently selected

let selectedColorX; // X cord of selected color
let selectedColorY; // Y cord of selected color

// The main game screen
function gameScreen() {
  drawColorGrid();
  updateColorGridSize();
  drawGamePannel();

  // Only show pick hue button when color selected, change values for multiplayer
  if (isSinglePlayer) {
    if (currentlySelectedColor !== undefined) {
      pickHueButton();
    }
  } 
  else if (!isSinglePlayer && partyIsHost()) {
    if (shared.sharedHostSelectedColor !== undefined) {
      pickHueButton();
    }
  }
  else {
    if (shared.sharedGuestSelectedColor !== undefined) {
      pickHueButton();
    }
  }
}

// Right hand game pannel
function drawGamePannel() {
  fill(0);
  textFont(semibold);
  textSize(30);
  textAlign(LEFT, CENTER);
  text("Find your hue on the grid!", width / 1.44, 250);

  image(gridIcon, width / 1.34, 50, gridIcon.width / 6, gridIcon.height / 6);

  // Only fill in the preview square and show game pannel info if a color is selected, change values for multiplayer
  if(isSinglePlayer && currentlySelectedColor !== undefined) {
    fill(
      currentlySelectedColor.hue,
      currentlySelectedColor.saturation,
      currentlySelectedColor.brightness,
      currentlySelectedColor.alpha
    );
    gamePannelInfo();
  } 
  else if (!isSinglePlayer && partyIsHost() && shared.sharedHostSelectedColor !== undefined){
    fill(
      shared.sharedHostSelectedColor.hue,
      shared.sharedHostSelectedColor.saturation,
      shared.sharedHostSelectedColor.brightness,
      shared.sharedHostSelectedColor.alpha
    );
    gamePannelInfo();
  }
  else if (!isSinglePlayer && shared.sharedGuestSelectedColor !== undefined) {
    fill(
      shared.sharedGuestSelectedColor.hue,
      shared.sharedGuestSelectedColor.saturation,
      shared.sharedGuestSelectedColor.brightness,
      shared.sharedGuestSelectedColor.alpha
    );
    gamePannelInfo();
  }

}

// Info shown on the right hand game panel, including selection preview
function gamePannelInfo() {
  square(width / 2 + 360, height / 2 - GAME_SELECTED_PREVIEW_SIZE / 2, GAME_SELECTED_PREVIEW_SIZE, 35);

  textFont(regular);
  textSize(20);
  fill(64, 0, 60);
  text("Are you sure you want to pick this hue?", width / 1.45, 580);
}


// Button letting user pick their selected hue
function pickHueButton() {
  let isHovered = false;

  if (mouseX >= width / 2 +250 && mouseX <= width / 2 +250 + 400 && mouseY >= height - 140 && mouseY <= height - 140 + 60) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }
  isHovered ? fill(64, 0, 25) : fill(0);
  // Draw background
  noStroke();
  rect(width / 2 +250, height - 140, 400, 60, 18);

  // Draw text
  textFont(medium);
  fill(255);
  textSize(29);
  text("Pick Hue", width / 2 + 395, height - 115);
}

// Create the color grid
function createColorGrid() {
  const MAX_HUE = 280; // Max hue value
  let hueStep = MAX_HUE / (GRID_SIZE - 1); // How much to increase the hue by

  // For each tile in the grid, generate a color with alpha and hue values based on the x,y values
  for (let y = 0; y < GRID_SIZE; y++) {
    colorGrid.push([]);
    let alpha = map(y, 0, GRID_SIZE - 1, 1.0, 0.1); 

    for (let x = 0; x < GRID_SIZE; x++) {
      let hue = x * hueStep; 
      colorGrid[y].push({ hue, saturation: 100, brightness: 100, alpha, isSelected: false });
    }
  }
}

// Draw the color grid
function drawColorGrid() {
  stroke(112);
  strokeWeight(2);
  updateColorGridSize(); // Keep size updated

  for (let y = 0; y < GRID_SIZE; y++) {
    stroke(112);

    for (let x = 0; x < GRID_SIZE; x++) {
      stroke(112);

      // Position tile based on x,y values
      let posX = x * TILE_SIZE;
      let posY = y * TILE_SIZE;

      // Create simple variable for the tile
      let tile = colorGrid[y][x];

      // Create tile
      fill(tile.hue, tile.saturation, tile.brightness, tile.alpha); 
      rect(posX, posY, TILE_SIZE, TILE_SIZE);

      // If on the results grid, show the actual color with a circle
      if (isSinglePlayer && finalColor === colorGrid[y][x] && gameState === "resultsGrid" ) {
        fill(0);
        circle(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, TILE_SIZE / 2);
      }

      // If the user has selected a tile, put a circle on it
      if (tile.isSelected) {
        fill(155);
        stroke(0);
        circle(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, TILE_SIZE / 2);
      }
    }
  }
}

// Update the size of the color grid
function updateColorGridSize() {
  if (width > height) {
    TILE_SIZE = height / GRID_SIZE;
  } 
  else {
    TILE_SIZE = width / GRID_SIZE;
  }
}

// Toggle a tile to either selected or deselected. Different values for single and multiplayer
function toggleTile(squareX, squareY) {
  // If tile is selected, deselected, if not, select it and update values. Uses different values for multiplayer
  if (isSinglePlayer) {
    if (squareX >= 0 && squareX < GRID_SIZE && squareY >= 0 && squareY < GRID_SIZE) {
      if (colorGrid[squareY][squareX].isSelected === false) {
        if (currentlySelectedColor !== undefined) {
          currentlySelectedColor.isSelected = false;
        }
        colorGrid[squareY][squareX].isSelected = true;
        selectedColorX = squareX;
        selectedColorY = squareY;
        currentlySelectedColor = colorGrid[squareY][squareX];
      }
    } 
  } 

  else if (partyIsHost()) {
    if (squareX >= 0 && squareX < GRID_SIZE && squareY >= 0 && squareY < GRID_SIZE) {
      if (colorGrid[squareY][squareX].isSelected === false) {
        if (shared.sharedHostSelectedColor !== undefined) {
          shared.sharedHostSelectedColor.isSelected = false;
        }
        colorGrid[squareY][squareX].isSelected = true;
        shared.sharedHostSelectedColorX = squareX;
        shared.sharedHostSelectedColorY = squareY;
        shared.sharedHostSelectedColor = colorGrid[squareY][squareX];
      }
    } 
  } 

  else {
    if (squareX >= 0 && squareX < GRID_SIZE && squareY >= 0 && squareY < GRID_SIZE) {
      if (colorGrid[squareY][squareX].isSelected === false) {
        if (shared.sharedGuestSelectedColor !== undefined) {
          shared.sharedGuestSelectedColor.isSelected = false;
        }
        colorGrid[squareY][squareX].isSelected = true;
        shared.sharedGuestSelectedColorX = squareX;
        shared.sharedGuestSelectedColorY = squareY;
        shared.sharedGuestSelectedColor = colorGrid[squareY][squareX];
      }
    } 
  }
}

