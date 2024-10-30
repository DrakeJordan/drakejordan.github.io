// Character in Grid
// Drake Jordan
// Oct 22, 2024

let tileSize;
let grid;
let GRID_SIZE = 10;
let shouldToggleNeighbours = false;
const OPEN_TILE = 0;
const IMPASSIBLE_TILE = 1;
const PLAYER_TILE = 9;
let player = {
  x: 0,
  y: 0,
};

let concrete;
let grass;
let guy;

function preload() {
  concrete = loadImage("concrete.jpg");
  grass = loadImage("grass.jpg");
  guy = loadImage("guy.png");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  } 
  else {
    createCanvas(windowHeight, windowHeight);
  }
  tileSize = height/GRID_SIZE;

  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // Add player to the grid
  grid[player.y][player.x] = PLAYER_TILE;
}

function draw() {
  background(220);
  displayGrid();
}

function windowResized() {
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  } 
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
  tileSize = height/GRID_SIZE;
}

function displayGrid() {
  noStroke();
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++) {
      if(grid[y][x] === IMPASSIBLE_TILE) {
        image(grass,x*tileSize, y*tileSize, tileSize,tileSize);
      }
      else if (grid[y][x] === OPEN_TILE) {
        image(concrete,x*tileSize, y*tileSize, tileSize,tileSize);
      }
      else if (grid[y][x] === PLAYER_TILE) {
        image(guy,x*tileSize, y*tileSize, tileSize,tileSize);
      }
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      // Choose either 0 or 1 50% of the time
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE_TILE);
      } 
      else {
        newGrid[y].push(OPEN_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }

  if (key === "w") {
    // Move up
    movePlayer(player.x, player.y-1);
  }
  if (key === "a") {
    // Move left
    movePlayer(player.x-1, player.y);
  }
  if (key === "s") {
    // Move down
    movePlayer(player.x, player.y+1);
  }
  if (key === "d") {
    // Move right
    movePlayer(player.x+1, player.y);
  }
}

function movePlayer(x, y) {
  // Don't run off the screen
  if (x >= 0 && y < GRID_SIZE && x < GRID_SIZE && y >= 0) {
    if (grid[y][x] === OPEN_TILE) {
    // When moving, reset to an open spot
    grid[player.y][player.x] = OPEN_TILE;
    // Keep track of player locations
    player.x = x;
    player.y = y;

    // Put player in the grid
    grid[player.y][player.x] = PLAYER_TILE;
    }
  }
}

function mousePressed() {
  let squareY = Math.floor(mouseY/tileSize);
  let squareX = Math.floor(mouseX/tileSize);

  toggleTile(squareX, squareY);
  if (shouldToggleNeighbours) {
    toggleTile(squareX, squareY-1);
    toggleTile(squareX-1, squareY);
    toggleTile(squareX+1, squareY);
    toggleTile(squareX, squareY+1);
  }
}

function toggleTile(squareX, squareY) {
  // Make sure the tile you are toggling is in the grid
  if (squareX >= 0 && squareX < GRID_SIZE && squareY >= 0 && squareY < GRID_SIZE) {
    if (grid[squareY][squareX] === IMPASSIBLE_TILE) {
      grid[squareY][squareX] = OPEN_TILE;
    } 
    else if (grid[squareY][squareX] === OPEN_TILE) {
      grid[squareY][squareX] = IMPASSIBLE_TILE;
    }
  }
}