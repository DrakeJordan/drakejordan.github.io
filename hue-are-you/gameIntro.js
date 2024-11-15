const WAITING_COLOR_SIZE = 250; // Size of the preview color tile while waiting
let perlinTime = 0; // Perlin noise timer

const HUE_GEN_TIME_OFFSET = 10000;
let hueGenTime = 0; // Start time of hue generation timer
let initalHueGenTimeSet = false; // Has the hue generation timer been set
let hueFound = false; // Has the hue generation timer ended

const HUE_MEM_TIME_OFFSET = 1000;
let setOffHueMemTimer = false; // Has the hue memorization timer been set off by the first timer yet
let hueMemTime = 0; // Start time of the hue memorization timer
let initalHueMemTimeSet = false; // Has the hue memorization timer been set
let hueMemed = false; // Has the hue memorization timer ended
let hueMemCounter = 10; // Starting at 10, counting down to start the game

let finalColor; // The final color selected by the game
let finalColorX = 0; // Final color x
let finalColorY = 0; // Final color y

// Screen shown introducing user to new round
function gameIntro() {
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  textSize(65);
  textFont(semibold);

  // If hue has not been found, show waiting text. If it has been found, show memorization text. Uses different values for multiplayer
  if (isSinglePlayer) {
    text(hueFound ? "Hue found! Try to remember it..." : "Get ready... finding your hue", width / 2, 150);
  } 
  else {
    text(shared.sharedFinalColorFound ? "Hue found! Try to remember it..." : "Get ready... finding your hue", width / 2, 150);
  }

  // Find hue and saturation for preview color using perlin noisea
  hueFill = noise(perlinTime) * 495 - 100;
  hueSaturation = noise(perlinTime+1000) * 100;

  // Timer logic for single and multiplayer
  if (isSinglePlayer) {
    if (!hueFound) {
      fill(hueFill, hueSaturation, 100);
    } 
    else {
      fill(finalColor.hue, finalColor.saturation, finalColor.brightness, finalColor.alpha);
    }

    if (!hueFound) {
      perlinTime += 0.01;
    }

    if (!initalHueGenTimeSet) {
      hueGenTime = millis();
      pickRandomColorFromGrid();
      initalHueGenTimeSet = true;
    }

    if (millis() > hueGenTime + HUE_GEN_TIME_OFFSET) {
      hueFound = true;
      setOffHueMemTimer = true;
    }

    if (!initalHueMemTimeSet && setOffHueMemTimer) {
      hueMemTime = millis();
      initalHueMemTimeSet = true;
    }

    if (millis() > hueMemTime + HUE_MEM_TIME_OFFSET && setOffHueMemTimer) {
      hueMemTime = millis();
      hueMemCounter -= 1;
    }

    if (hueMemCounter === 0) {
      gameState = "game";
    }
  } 
  else {
    if (!shared.sharedFinalColorFound ) {
      fill(hueFill, hueSaturation, 100);
    } 
    else {
      fill(shared.sharedFinalColor.hue, shared.sharedFinalColor.saturation, shared.sharedFinalColor.brightness, shared.sharedFinalColor.alpha);
    }

    if (!shared.sharedFinalColorFound) {
      perlinTime += 0.01;
    }

    if (!initalHueGenTimeSet && partyIsHost()) {
      hueGenTime = millis();
      initalHueGenTimeSet = true;
    }

    if (partyIsHost() && millis() > hueGenTime + HUE_GEN_TIME_OFFSET) {
      if (!shared.sharedFinalColorFound) {
        pickRandomColorFromGrid();
      }
      shared.sharedFinalColorFound = true;
      setOffHueMemTimer = true;
    }

    if(!partyIsHost() && shared.sharedFinalColorFound) {
      setOffHueMemTimer = true;
    }

    if (!initalHueMemTimeSet && setOffHueMemTimer) {
      hueMemTime = millis();
      initalHueMemTimeSet = true;
    }

    if (millis() > hueMemTime + HUE_MEM_TIME_OFFSET && setOffHueMemTimer) {
      hueMemTime = millis();
      hueMemCounter -= 1;
    }

    if (hueMemCounter === 0) {
      gameState = "game";
    }
  }

  // Color preview square
  square(width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, 45);
}

function pickRandomColorFromGrid() {
  if (isSinglePlayer) {
  // Pick random x and y within the grid
    let randomX = floor(random(0, GRID_SIZE)); 
    let randomY = floor(random(0, GRID_SIZE));

    finalColorX = randomX;
    finalColorY = randomY;
  
    // Get the color at the randomly selected position
    finalColor = colorGrid[randomY][randomX];
  }
  else {
    // Pick random x and y within the grid
    let randomX = floor(random(0, GRID_SIZE)); 
    let randomY = floor(random(0, GRID_SIZE));
  
    shared.sharedFinalColorX = randomX;
    shared.sharedFinalColorY = randomY;
    
    // Get the color at the randomly selected position
    shared.sharedFinalColor = colorGrid[randomY][randomX];
  }
}