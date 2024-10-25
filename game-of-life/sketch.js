// Grid Demo
// Drake Jordan
// Oct 22, 2024

// If hardcoding grid, use something like this
// let grid = [
//  [1, 0, 1, 0],
//  [0,0, 1, 1],
//  [1, 1, 1, 0], 
//  [0, 1, 1, 0],
// ];

let grid;
let GRID_SIZE = 40;
let tileSize;
let shouldToggleNeighbours = false;
let autoPlayIsOn = false;
let renderOnFrameMultiple = 5;
let gosperGun;

function preload() {
  gosperGun = loadJSON("gosper.json");
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
}

function draw() {
  background(220);
  if (autoPlayIsOn && frameCount%5 === 0) {
    grid = updateGrid();
  }
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
  for (let y = 0; y < GRID_SIZE; y++){
    for (let x = 0; x < GRID_SIZE; x++) {
      if(grid[y][x] === 1) {
        fill(0);
      }
      else if (grid[y][x] === 0) {
        fill(255);
      }
      square(x*tileSize, y*tileSize, tileSize);
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
        newGrid[y].push(1);
      } 
      else {
        newGrid[y].push(0);
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
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function updateGrid() {
  // Make a new array to hold the next turn grid
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  // Look at every cell
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++)  {
      // Count tile neighbours
      let neighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          // Account for edge cases
          if (y+i >= 0 && y+i < GRID_SIZE && x+j >= 0 && x+j < GRID_SIZE) {
            neighbours += grid[y+i][x+j];
          }
        }
      }
      
      // Don't count yourself
      neighbours -= grid[y][x];

      // Apply rules
      if(grid[y][x] === 0) {
        // Tile is dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        } 
        else {
          nextTurn[y][x];
        }
      } 
      if (grid[y][x] === 1) {
        // Tile is alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
 return nextTurn;
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
  if (key === " ") {
    grid = updateGrid();
  }
  if (key === "a") {
    autoPlayIsOn = !autoPlayIsOn;
  }
  if (key === "g") {
    grid = gosperGun;
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
    if (grid[squareY][squareX] === 0) {
      grid[squareY][squareX] = 1;
    } 
    else if (grid[squareY][squareX] === 1) {
      grid[squareY][squareX] = 0;
    }
  }
}