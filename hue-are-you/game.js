let colorGrid = [];
const TILE_SIZE = 15;
const GRID_SIZE = 100;

function gameScreen() {
  drawColorGrid();
}

function drawColorGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      fill(colorGrid[y][x].r, colorGrid[y][x].g, colorGrid[y][x].b, colorGrid[y][x].a);
      rect(x*TILE_SIZE, y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

function createColorGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    colorGrid.push([]);
    for (let x = 0; x < GRID_SIZE; x++) {
      colorGrid[y].push(createColorTile(y, random(255), random(255), random(255), 255));
    }
  }
}

function createColorTile(y, r, g, b, a) {
  let colorTile = {
    r: r,
    g: g,
    b: b,
    a: a,
  };
  colorGrid[y].push(colorTile);
}