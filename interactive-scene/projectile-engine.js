// Clicked status of all clickable projectiles
let clickStatus = {
  isFullClickAlive: true,
  isLeftClickAlive: true,
  isRightClickAlive: true,
  isFullClick2Alive: true,
  isLeftClick2Alive: true,
  isRightClick2Alive: true
};

let activeLinePositon = 0; // Position of the active projectile line
let projectileSpeed = 2; // Current projectile speed  
let projectileStage = 0; // Curent level
let offsetTime = 5000; // Current time between projectiles

function fillProjectile(type) {
  // If type b, always fill black
  if (type === "b") {
    fill(0);
  }
  // If type w, always fill white
  else if (type === "w") {
    fill(220);
  }
  // If type a (adaptive), always fill the oposite of the background color
  else if (type === "a") {
    fill(strokeColor);
  }
  // If type r, always fill red
  else if (type === "r") {
    fill("red");
  }
}

function dropRect(x, y, type, w, h) {
  // Drop a rectangle with specified location, size, and type
  fillProjectile(type);
  noStroke();
  rect(x, y, w, h);
}

function hidenMiddleBRow() {
  // Drop projectile row with a hidden middle passageway revealed when backgrond is black
  activeLinePositon += projectileSpeed;

  // If background is not black, kill Bob when touched
  if (strokeColor !== 0) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }
  // If background is black, kill Bob if not within middle section
  else if (strokeColor === 0 && !(bobX >= width / 2 - 40 && bobX <= width / 2 + 40)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  // Drop adaptive left and right sections, and white middle section
  if (activeLinePositon < height) {
    dropRect(width / 2 + 40, activeLinePositon, "a", width / 2, 30);
    dropRect(width / 2 - 40, activeLinePositon, "w", 80, 30);
    dropRect(0, activeLinePositon, "a", width / 2 - 40, 30);
  }
  else {
    // Reset row position
    activeLinePositon = 0;
  }
}

function hidenMiddleWRow() {
  // Drop projectile row with a hidden middle passageway revealed when backgrond is white
  activeLinePositon += projectileSpeed;

  // If background is not white, kill Bob when touched
  if (strokeColor !== 220) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }
  // If background is white, kill Bob if not within middle section
  else if (strokeColor === 220 && !(bobX >= width / 2 - 40 && bobX <= width / 2 + 40)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  // Drop adaptive left and right sections, and black middle section
  if (activeLinePositon < height) {
    dropRect(width / 2 + 40, activeLinePositon, "a", width / 2, 30);
    dropRect(width / 2 - 40, activeLinePositon, "b", 80, 30);
    dropRect(0, activeLinePositon, "a", width / 2 - 40, 30);
  }
  else {
    // Reset row position
    activeLinePositon = 0;
  }
}

function fullClickRow(clickStatus, key) {
  // Drop projectile row that is full width clickable
  activeLinePositon += projectileSpeed;

  // If mouse is pressed and hits the row, set is alive key to false and remove it
  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseIsPressed) {
    clickStatus[key] = false;
    activeLinePositon = 0;
  }

  // If row is alive and has not reached the bottom, show it
  if (activeLinePositon < height && clickStatus[key]) {
    dropRect(0, activeLinePositon, "r", width, 30);

    // If row is alive and touches Bob, kill Bob
    if (activeLinePositon + 30 >= bobY && clickStatus[key]) {
      bobIsDead = true;
      gameState = "deathScreen";
      clickStatus[key] = false;
    }
  }
  else {
    // Reset row position
    activeLinePositon = 0;
  }
}

function leftClickRow(clickStatus, key) {
  // Drop projectile row with a small, left side clickable section
  activeLinePositon += projectileSpeed;

  // If mouse is within clickable region and is pressed, set is alive key to false and remove it
  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseX >= 0 && mouseX <= 60 && mouseIsPressed) {
    clickStatus[key] = false;
  }

  // If row is not at bottom, show row
  if (activeLinePositon < height) {
    dropRect(60, activeLinePositon, "a", width - 60, 30);
  }

  // If Bob touches non clickable section, kill Bob
  if (activeLinePositon + 30 >= bobY && bobX >= 60) {
    bobIsDead = true;
    gameState = "deathScreen";
  }

  // If clickable row is alive and not at bottom, show row
  if (activeLinePositon < height && clickStatus[key]) {
    dropRect(0, activeLinePositon, "r", 60, 30);

    // If Bob touches clickable section when it has not been clicked, kill Bob
    if (activeLinePositon + 30 >= bobY && clickStatus[key]) {
      bobIsDead = true;
      gameState = "deathScreen";
      clickStatus[key] = false;
    }
  }
}

function rightClickRow(clickStatus, key) {
  // Drop projectile row with a small, right side clickable section
  activeLinePositon += projectileSpeed;

  // If mouse is within clickable region and is pressed, set is alive key to false and remove it
  if (mouseY >= activeLinePositon && mouseY <= activeLinePositon + 30 && mouseX >= width - 60 && mouseX <= width && mouseIsPressed) {
    clickStatus[key] = false;
  }

  // If row is not at bottom, show row non-clickable row
  if (activeLinePositon < height) {
    dropRect(0, activeLinePositon, "a", width - 60, 30);
  }

  // If Bob touches non clickable section, kill Bob
  if (activeLinePositon + 30 >= bobY && !(bobX >= width-60)) {
    bobIsDead = true;
    gameState = "deathScreen";
  }

  // If clickable row is alive and not at bottom, show row
  if (activeLinePositon < height && clickStatus[key]) {
    dropRect(width - 60, activeLinePositon, "r", 60, 30);

    // If Bob touches clickable section when it has not been clicked, kill Bob
    if (activeLinePositon + 30 >= bobY && clickStatus[key]) {
      bobIsDead = true;
      gameState = "deathScreen";
      clickStatus[key] = false;
    }
  }
}

function hidenLeftRow() {
// Drop projectile row with a hidden left passageway revealed when backgrond is black
  activeLinePositon += projectileSpeed;

  // If background is not black, kill Bob when touched
  if (strokeColor !== 0) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  // If background is black, kill Bob if not within middle section
  else if (strokeColor === 0 && !(bobX >= width / 2 - 150 && bobX <= width / 2 - 150 + 70)) {
    if (activeLinePositon + 30 >= bobY) {
      bobIsDead = true;
      gameState = "deathScreen";
    }
  }

  // Drop adaptive left and right sections, and white left section
  if (activeLinePositon < height) {
    dropRect(width / 2 - 150 + 70, activeLinePositon, "a", width, 30);
    dropRect(width / 2 - 150, activeLinePositon, "w", 70, 30);
    dropRect(0, activeLinePositon, "a", width / 2 - 150, 30);
  }
  else {
    // Reset row position
    activeLinePositon = 0;
  }
}

function checkerboardRow() {
  // Drop finish line with checkerboard pattern
  activeLinePositon += projectileSpeed;

  const TILE_SIZE = 20; 

  // Two rows of alternating black and white squares
  if (activeLinePositon < height) {
    for (let x = 0; x < width; x += TILE_SIZE) {
      let type = Math.floor(x / TILE_SIZE) % 2 === 0 ? "b" : "w"; 
      dropRect(x, activeLinePositon, type, TILE_SIZE, TILE_SIZE);
      dropRect(x+TILE_SIZE, activeLinePositon+TILE_SIZE, type , TILE_SIZE, TILE_SIZE);
    }
  }
  else {
    // Reset row position
    activeLinePositon = 0;
  }
}

function fullGameRows() {
  // Increment projectile stage when offset time reached
  if (millis() >= gameOffsetTime + offsetTime) {
    projectileStage += 1;
    activeLinePositon = 0;
    gameOffsetTime = millis();

    // When projectile stage reaches 7, double the speed and half the offset time
    if (projectileStage > 6) {
      offsetTime = 5000 / 2;
      projectileSpeed = 4;
    }
    // Set base projectile speed and offset time
    else {
      offsetTime = 5000;
      projectileSpeed = 2;
    }
  }
}

function dropCurrentRow() {
  // Drop correct row for projectile stage

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
    // Show winner page and reset values
    gameState = "winnerScreen";
    activeLinePositon = 0;
    bobX = width / 2;
    bobY = 0;
    introLine = introLines[Math.floor(Math.random() * introLines.length)];  
  }
}