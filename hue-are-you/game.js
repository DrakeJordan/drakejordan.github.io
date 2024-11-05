let colorGrid = [];
let TILE_SIZE = 25;
const GRID_SIZE = 30;
const TILE_SPACING = 0;

let isColorTileSelected = false;

function gameScreen() {
  drawColorGrid();
  updateColorGridSize();
  updateIsTileSelected();
  drawGamePannel();
  pickHueButton();
}

function drawGamePannel() {
  fill(0);
  textFont(semibold);
  textSize(30);
  textAlign(LEFT, CENTER);
  text("Find your hue on the grid!", width / 1.44, 250);

  image(gridIcon, width / 1.34, 50, gridIcon.width/6, gridIcon.height/6);
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

function drawColorGrid() {
  stroke(112);
  strokeWeight(2);
  updateColorGridSize();
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      let posX = x * TILE_SIZE;
      let posY = y * TILE_SIZE;
      fill(colorGrid[y][x].r, colorGrid[y][x].g, colorGrid[y][x].b);
      rect(posX, posY, TILE_SIZE, TILE_SIZE);
      if (colorGrid[y][x].isSelected) {
        circle(posX + TILE_SIZE/2, posY + TILE_SIZE/2, TILE_SIZE/2);
      }
    }
  }
}

function createColorGrid() {
  let maxHue = 360; 
  let hueStep = maxHue / GRID_SIZE; 
  let brightness = 100; 

  for (let y = 0; y < GRID_SIZE; y++) {
    colorGrid.push([]);
    let saturation = map(y, 0, GRID_SIZE - 1, 100, 20);
    for (let x = 0; x < GRID_SIZE; x++) {
      let hue = x * hueStep;
      colorGrid[y].push(createColorTile(color(hue, saturation, brightness)));
    }
  }
}

function createColorTile(col) {
  return {
    r: red(col),
    g: green(col),
    b: blue(col),
    isSelected: false,
  };
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
  // Make sure the tile you are toggling is in the grid
  if (squareX >= 0 && squareX < GRID_SIZE && squareY >= 0 && squareY < GRID_SIZE) {
    if (colorGrid[squareY][squareX].isSelected === false) {
      if (!isColorTileSelected) {
        colorGrid[squareY][squareX].isSelected = true;
      }
    } 
  }
}

function updateIsTileSelected() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (colorGrid[y][x].isSelected) {
        isColorTileSelected = true;
      }
    }
  }
}