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

function gameIntro() {
  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  textSize(65);
  textFont(semibold);
  text(hueFound ? "Hue found! Try to remember it..." : "Get ready... finding your hue", width / 2, 150);

  textSize(20);
  text(hueMemCounter + " "  + hueMemed + " " + hueMemTime + " " + initalHueMemTimeSet, width / 2, 200);

  hue = noise(perlinTime) * 495;
  saturation = noise(perlinTime+1000) * 100;

  fill(hue-100, saturation, 100);

  if (!hueFound) {
    perlinTime += 0.005;
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