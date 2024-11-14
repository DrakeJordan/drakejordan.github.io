let colorGrid = [];
let TILE_SIZE = 25;
const GRID_SIZE = 20;
const TILE_SPACING = 0;
let currentlySelectedColor;

let GAME_SELECTED_PREVIEW_SIZE = 170;

let isColorTileSelected = false;

let selectedColorX;
let selectedColorY;

function gameScreen() {
  drawColorGrid();
  updateColorGridSize();
  drawGamePannel();
  if (currentlySelectedColor !== undefined) {
    pickHueButton();
  }
}

function drawGamePannel() {
  fill(0);
  textFont(semibold);
  textSize(30);
  textAlign(LEFT, CENTER);
  text("Find your hue on the grid!", width / 1.44, 250);

  image(gridIcon, width / 1.34, 50, gridIcon.width / 6, gridIcon.height / 6);

  if (currentlySelectedColor !== undefined) {
    fill(
      currentlySelectedColor.hue,
      currentlySelectedColor.saturation,
      currentlySelectedColor.brightness,
      currentlySelectedColor.alpha
    );
    square(width / 2 + 360, height / 2 - GAME_SELECTED_PREVIEW_SIZE / 2, GAME_SELECTED_PREVIEW_SIZE, 35);

    textFont(regular);
    textSize(20);
    fill(64, 0, 60);
    text("Are you sure you want to pick this hue?", width / 1.45, 580);
  }
}

function pickHueButton() {
  let isHovered = false;

  if (mouseX >= width / 2 +250 && mouseX <= width / 2 +250 + 400 && mouseY >= height - 140 && mouseY <= height - 140 + 60) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }
  noStroke();
  isHovered ? fill(64, 0, 25) : fill(0);
  rect(width / 2 +250, height - 140, 400, 60, 18);
  textFont(medium);
  fill(255);
  textSize(29);
  text("Pick Hue", width / 2 + 395, height - 115);
}

function createColorGrid() {
  let maxHue = 280; 
  let hueStep = maxHue / (GRID_SIZE - 1); 

  for (let y = 0; y < GRID_SIZE; y++) {
    colorGrid.push([]);
    let alpha = map(y, 0, GRID_SIZE - 1, 1.0, 0.1); 

    for (let x = 0; x < GRID_SIZE; x++) {
      let hue = x * hueStep; 
      colorGrid[y].push({ hue, saturation: 100, brightness: 100, alpha, isSelected: false });
    }
  }
}

function drawColorGrid() {
  stroke(112);
  strokeWeight(2);
  updateColorGridSize();
  for (let y = 0; y < GRID_SIZE; y++) {
    stroke(112);
    for (let x = 0; x < GRID_SIZE; x++) {
      stroke(112);
      let posX = x * TILE_SIZE;
      let posY = y * TILE_SIZE;
      let tile = colorGrid[y][x];
      fill(tile.hue, tile.saturation, tile.brightness, tile.alpha); 
      rect(posX, posY, TILE_SIZE, TILE_SIZE);
      if (finalColor === colorGrid[y][x] && gameState === "resultsGrid") {
        fill(0);
        circle(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, TILE_SIZE / 2);
      }
      if (tile.isSelected) {
        fill(155);
        stroke(0);
        circle(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, TILE_SIZE / 2);
      }
    }
  }
}


function updateColorGridSize() {
  if (width > height) {
    TILE_SIZE = height / GRID_SIZE;
  } 
  else {
    TILE_SIZE = width / GRID_SIZE;
  }
}

function toggleTile(squareX, squareY) {
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
