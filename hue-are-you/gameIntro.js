const WAITING_COLOR_SIZE = 250;
let perlinTime = 0;

let hueGenTime = 0; // Start time of hue generation timer
let initalHueGenTimeSet = false; // Has the hue generation timer been set
let hueFound = false; // Has the hue generation timer ended

let setOffHueMemTimer = false; // Has the hue memorization timer been set off by the first timer yet
let hueMemTime = 0; // Start time of the hue memorization timer
let initalHueMemTimeSet = false; // Has the hue memorization timer been set
let hueMemed = false; // Has the hue memorization timer ended
let hueMemCounter = 10; // Starting at 10, counting down to start the game

let finalColor;
let finalColorX = 0;
let finalColorY = 0;

function gameIntro() {
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  textSize(65);
  textFont(semibold);
  text(hueFound ? "Hue found! Try to remember it..." : "Get ready... finding your hue", width / 2, 150);

  hueFill = (noise(perlinTime) * 495) -100;
  saturationFill = noise(perlinTime+1000) * 100;

  if (!hueFound) {
    fill(hueFill, saturationFill, 100);
  } else {
    fill(finalColor.hue, finalColor.saturation, finalColor.brightness, finalColor.alpha);
  }

  if (!hueFound) {
    perlinTime += 0.01;
  }

  if (!initalHueGenTimeSet) {
    hueGenTime = millis();
    initalHueGenTimeSet = true;
  }

  if (millis() > hueGenTime + 10000) {
    hueFound = true;
    setOffHueMemTimer = true;
  }

  if (!initalHueMemTimeSet && setOffHueMemTimer) {
    hueMemTime = millis();
    initalHueMemTimeSet = true;
  }

  if (millis() > hueMemTime + 1000 && setOffHueMemTimer) {
    hueMemTime = millis();
    hueMemCounter -= 1;
  }

  if (hueMemCounter === 0) {
    gameState = "game";
  }

  square(width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, 45);
}

function pickRandomColorFromGrid() {
  // Pick random x and y within the grid
  let randomX = floor(random(0, GRID_SIZE)); 
  let randomY = floor(random(0, GRID_SIZE));

  finalColorX = randomX;
  finalColorY = randomY;
  
  // Get the color at the randomly selected position
  finalColor = colorGrid[randomY][randomX];
}