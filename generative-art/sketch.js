// Generative Art Demo
// Drake Jordan
// Oct 4, 2024

const TILE_SIZE = 15;
let tileArray = [];
let offsetTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let y = 0; y < height; y += TILE_SIZE) {
    for(let x = 0; x < width; x += TILE_SIZE) {
      let someTile = spawnTile(x, y);
      tileArray.push(someTile);
    }
}
}

function draw() {
  background(220);
  // Display tile
  for(let tile of tileArray) {
    line(tile.x1, tile.y1 + mouseY, tile.x2, mouseX);
  }
}

function spawnTile(x,y){
  let tile;
  let choice = random(100);
  
  if (choice < 50) {
    // Negative sloped line
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y - TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2,
    };
  } 
  else {
    // Positive sloped line
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y + TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2,
    };
  }

  return tile;
}