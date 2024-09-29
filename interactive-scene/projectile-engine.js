let activeLinePositon = 0;

let isFullClickAlive = true;
let isLeftClickAlive = true;
let isRightClickAlive = true;

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
  // If type is adaptive, fill the oposite of the background
  else if (type === "a") {
    fill(strokeColor);
  }
  //If type is red, always fill red
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

function hidenMiddleBRow() {
  activeLinePositon += projectileSpeed;
  if (strokeColor !== 0) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  } 
  else if (strokeColor === 0 && !(bobX >= width/2-40 && bobX <= width/2+40)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  if (activeLinePositon < height) {
    dropRect(width/2+40, activeLinePositon, "a", width/2, 30);
    dropRect(width/2-40, activeLinePositon, "w", 80, 30);
    dropRect(0, activeLinePositon, "a", width/2 - 40, 30);
  }
  else {
    activeLinePositon = 0;
  }
}

function hidenMiddleWRow() {
  activeLinePositon += projectileSpeed;
  if (strokeColor !== 220) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  } 
  else if (strokeColor === 220 && !(bobX >= width/2-40 && bobX <= width/2+40)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

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
    isFullClickAlive = false;
    activeLinePositon = 0;
  }

  if (activeLinePositon < height && isFullClickAlive) {
    dropRect(0, activeLinePositon, "r", width, 30);
    if (activeLinePositon + 30 >= bobY && isFullClickAlive) {
      bobIsDead = true;
      gameState = "deathScreen";
      isFullClickAlive = false;
    }
  }
  else {
    activeLinePositon = 0;
  }
}

function leftClickRow() {
  activeLinePositon += projectileSpeed;

  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseX >= 0 && mouseX <= 60 && mouseIsPressed) {
    isLeftClickAlive = false;
  }
  if (activeLinePositon < height) {
    dropRect(60, activeLinePositon, "a", width-60, 30)
  }

  if (activeLinePositon < height && isLeftClickAlive) {
    dropRect(0, activeLinePositon, "r", 60, 30);
    if (activeLinePositon + 30 >= bobY && isLeftClickAlive) {
      bobIsDead = true;
      gameState = "deathScreen";
      isLeftClickAlive = false;
    }
  }
}

function rightClickRow() {
  activeLinePositon += projectileSpeed;

  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseX >= width-60 && mouseX <= width && mouseIsPressed) {
    isRightClickAlive = false;
  }
  if (activeLinePositon < height) {
    dropRect(0, activeLinePositon, "a", width-60, 30);
  }

  if (activeLinePositon < height && isRightClickAlive) {
    dropRect(width-60, activeLinePositon, "r", 60, 30);
    if (activeLinePositon + 30 >= bobY && isRightClickAlive) {
      bobIsDead = true;
      gameState = "deathScreen";
      isRightClickAlive = false;
    }
  }
}

function fullGameRows() {
  if (millis() >= gameOffsetTime + 5000) {
    projectileStage += 1;
    activeLinePositon = 0;
    gameOffsetTime = millis();
  }
}

function dropCurrentRow() {
  if (projectileStage === 1) {
    hidenMiddleWRow();
  } 
  else if (projectileStage === 2) {
    fullClickRow();
  } 
  else if (projectileStage === 3) {
    hidenMiddleBRow();
  }
  else if (projectileStage === 4) {
    leftClickRow();
  }
  else if (projectileStage === 5) {
    rightClickRow();
  }
}