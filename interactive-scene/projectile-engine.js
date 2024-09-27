let activeLinePositon = 0;
let secondaryLinePositon = 0;
let tertiaryLinePositon = 0;
let quaternaryLinePositon = 0;

let isAlive = true;

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

function dropSquare(x, y, type, size) {
  // Spawn a square
  fillProjectile(type);
  noStroke();
  square(x, y, size);  
}

function dropRect(x, y, type, w, h) {
  // Spawn a rectangle
  fillProjectile(type);
  noStroke();
  rect(x, y, w, h);  
}

function hidenMiddleWRow() {
  activeLinePositon += projectileSpeed;

  if (activeLinePositon < height) {
    dropRect(width/2+40, activeLinePositon, "a", width/2, 30);
    dropRect(width/2-40, activeLinePositon, "b", 80, 30);
    dropRect(0, activeLinePositon, "a", width/2 - 40, 30);
  }
  else {
    activeLinePositon = 0;
  }
}
function fullClickRow() {
  activeLinePositon += projectileSpeed;

  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseIsPressed) {
    isAlive = false;
  }

  if (activeLinePositon < height && isAlive) {
    dropRect(0, activeLinePositon, "r", width, 30);
    if (activeLinePositon + 30 >= bobY && isAlive) {
      bobIsDead = true;
      gameState = "deathScreen";
      isAlive = false;
    }
  }
  else {
    activeLinePositon = 0;
  }
}

function fullGameRows() {
  if (millis() >= gameOffsetTime + 5000) {
    projectileStage += 1;
    gameOffsetTime = millis();
  }
}