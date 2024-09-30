let activeLinePositon = 0;

let clickStatus = {
  isFullClickAlive: true,
  isLeftClickAlive: true,
  isRightClickAlive: true,
  isFullClick2Alive: true,
  isLeftClick2Alive: true,
  isRightClick2Alive: true
};

let projectileSpeed = 2;
let projectileStage = 0;
let offsetTime = 5000;

function moveProjectileLines() {
  activeLinePositon += projectileSpeed;
}

function fillProjectile(type) {
  if (type === "b") {
    fill(0);
  }
  else if (type === "w") {
    fill(220);
  }
  else if (type === "a") {
    fill(strokeColor);
  }
  else if (type === "r") {
    fill("red");
  }
}

function dropSquare(x, y, type, size) {
  fillProjectile(type);
  noStroke();
  square(x, y, size);
}

function dropRect(x, y, type, w, h) {
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
  else if (strokeColor === 0 && !(bobX >= width / 2 - 40 && bobX <= width / 2 + 40)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  if (activeLinePositon < height) {
    dropRect(width / 2 + 40, activeLinePositon, "a", width / 2, 30);
    dropRect(width / 2 - 40, activeLinePositon, "w", 80, 30);
    dropRect(0, activeLinePositon, "a", width / 2 - 40, 30);
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
  else if (strokeColor === 220 && !(bobX >= width / 2 - 40 && bobX <= width / 2 + 40)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  if (activeLinePositon < height) {
    dropRect(width / 2 + 40, activeLinePositon, "a", width / 2, 30);
    dropRect(width / 2 - 40, activeLinePositon, "b", 80, 30);
    dropRect(0, activeLinePositon, "a", width / 2 - 40, 30);
  }
  else {
    activeLinePositon = 0;
  }
}

function fullClickRow(clickStatus, key) {
  activeLinePositon += projectileSpeed;

  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseIsPressed) {
    clickStatus[key] = false;
    activeLinePositon = 0;
  }

  if (activeLinePositon < height && clickStatus[key]) {
    dropRect(0, activeLinePositon, "r", width, 30);
    if (activeLinePositon + 30 >= bobY && clickStatus[key]) {
      bobIsDead = true;
      gameState = "deathScreen";
      clickStatus[key] = false;
    }
  }
  else {
    activeLinePositon = 0;
  }
}

function leftClickRow(clickStatus, key) {
  activeLinePositon += projectileSpeed;

  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseX >= 0 && mouseX <= 60 && mouseIsPressed) {
    clickStatus[key] = false;
  }
  if (activeLinePositon < height) {
    dropRect(60, activeLinePositon, "a", width - 60, 30);
  }

  if (activeLinePositon < height && clickStatus[key]) {
    dropRect(0, activeLinePositon, "r", 60, 30);
    if (activeLinePositon + 30 >= bobY && clickStatus[key]) {
      bobIsDead = true;
      gameState = "deathScreen";
      clickStatus[key] = false;
    }
  }
}

function rightClickRow(clickStatus, key) {
  activeLinePositon += projectileSpeed;

  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseX >= width - 60 && mouseX <= width && mouseIsPressed) {
    clickStatus[key] = false;
  }
  if (activeLinePositon < height) {
    dropRect(0, activeLinePositon, "a", width - 60, 30);
  }

  if (activeLinePositon < height && clickStatus[key]) {
    dropRect(width - 60, activeLinePositon, "r", 60, 30);
    if (activeLinePositon + 30 >= bobY && clickStatus[key]) {
      bobIsDead = true;
      gameState = "deathScreen";
      clickStatus[key] = false;
    }
  }
}

function hidenLeftRow() {
  activeLinePositon += projectileSpeed;
  if (strokeColor !== 0) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }
  else if (strokeColor === 0 && !(bobX >= width / 2 - 150 && bobX <= width / 2 - 150 + 70)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  if (activeLinePositon < height) {
    dropRect(width / 2 - 150 + 70, activeLinePositon, "a", width, 30);
    dropRect(width / 2 - 150, activeLinePositon, "w", 70, 30);
    dropRect(0, activeLinePositon, "a", width / 2 - 150, 30);
  }
  else {
    activeLinePositon = 0;
  }
}

function fullGameRows() {
  if (millis() >= gameOffsetTime + offsetTime) {
    projectileStage += 1;
    activeLinePositon = 0;
    gameOffsetTime = millis();
    if (projectileStage > 6) {
      offsetTime = 5000 / 2;
      projectileSpeed = 4;
    }
    else {
      offsetTime = 5000;
      projectileSpeed = 2;
    }
  }
}
function checkerboardRow() {
  activeLinePositon += projectileSpeed;

  const TILE_SIZE = 20; 

  if (activeLinePositon < height) {
    for (let x = 0; x < width; x += TILE_SIZE) {
      let type = Math.floor(x / TILE_SIZE) % 2 === 0 ? "b" : "w"; 
      dropSquare(x, activeLinePositon, type, TILE_SIZE);
      dropSquare(x+TILE_SIZE, activeLinePositon+TILE_SIZE, type , TILE_SIZE);
    }
  }
  else {
    activeLinePositon = 0;
  }
}

function dropCurrentRow() {
  if (projectileStage === 1) {
  hidenMiddleWRow();
  }
  else if (projectileStage === 2) {
    fullClickRow(clickStatus, "isFullClickAlive");
  }
  else if (projectileStage === 3) {
    hidenMiddleBRow();
  }
  else if (projectileStage === 4) {
    leftClickRow(clickStatus, "isLeftClickAlive");
  }
  else if (projectileStage === 5) {
    rightClickRow(clickStatus, "isRightClickAlive");
  }
  else if (projectileStage === 6) {
    hidenLeftRow();
  }
  else if (projectileStage === 7) {
    hidenMiddleBRow();
  }
  else if (projectileStage === 8) {
    rightClickRow(clickStatus, "isRightClick2Alive");
  }
  else if (projectileStage === 9) {
    hidenMiddleWRow();
  }
  else if (projectileStage === 10) {
    leftClickRow(clickStatus, "isLeftClick2Alive");
  }
  else if (projectileStage === 11) {
    fullClickRow(clickStatus, "isFullClick2Alive");
  }
  else if (projectileStage === 12) {
    hidenLeftRow();
  } 
  else if (projectileStage === 13) {
    checkerboardRow();
  }
  else if (projectileStage === 14) {
    gameState = "winnerScreen";
    activeLinePositon = 0;
    bobX = width / 2;
    bobY = 0;
    introLine = introLines[Math.floor(Math.random() * introLines.length)];  
  }
}