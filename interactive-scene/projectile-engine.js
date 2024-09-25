let activeLinePositon = 0;
let secondaryLinePositon = 0;
let tertiaryLinePositon = 0;
let quaternaryLinePositon = 0;

let projectileSpeed = 2;

let projectileStage = 0;

function moveProjectileLines() {
  // Move each line down by the current projectileSpeed
  activeLinePositon += projectileSpeed;
}

function fillProjectile(type) {
  // If type is whtie, always fill black
  if (type === "b") {
    fill(0);
  } 
  // If type is white, always fill white
  else if (type === "w") {
    fill(220);
  } 
  // If type is fluid, fill the oposite of the background
  else if (type === "a") {
    fill(strokeColor);
  }
  else if (type === "r") {
    fill("red");
  }
}

function dropSquare(x, type, size) {
  // Spawn a square
  fillProjectile(type);
  noStroke();
  square(x, activeLinePositon, size);  
}

function dropRect(x, type, w, h) {
  // Spawn a rectangle
  fillProjectile(type);
  noStroke();
  rect(x, activeLinePositon, w, h);  
}

function hidenMiddleWRow() {
  dropRect(width/2+40, "a", width/2, 30);
  dropRect(width/2-40, "w", 80, 30);
  dropRect(0, "a", width/2-40, 30);
}

function fullClickRow() {
  dropRect(0, "r", width, 30);
}

function fullGameRows() {
  if (millis() >= gameOffsetTime + 5000) {
    projectileStage += 1;
    gameOffsetTime = millis();
  }
}