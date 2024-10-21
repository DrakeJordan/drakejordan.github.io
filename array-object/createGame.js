let buttonSize = 100; // Main button size
let displayCodeSize = 50; // User picked code size
let code = []; // User typed code

let waitingForPlayer = false;
let playerJoined = false; // Track if a player has joined // Whether the user is waiting for a player or not

let timeSet = false;
let timing = 0;
let playersSet = false;
let playersReset = false;

function createGameScreen() {
  textAlign(CENTER);
  textFont(semibold);
  fill(0);
  textSize(45);

  // Title text with instructions
  if (!waitingForPlayer) {
    text("Create a Game Join Code", width / 2, height / 4);
  } 
  else {
    text("Waiting For Player...", width / 2, height / 4);
    if (!sharedDataStoreCodeCreated) {
      sharedDataStoreCode = "";
      for (let item of code) {
        if (item === circleButton) {
          sharedDataStoreCode += "c";
        }
        else if (item === heartButton) {
          sharedDataStoreCode += "h";
        }
        else if (item === starButton) {
          sharedDataStoreCode += "s";
        } 
        else if (item === triangleButton) {
          sharedDataStoreCode += "t";
        }
      }
      console.log(sharedDataStoreCode);
      sharedDataStore = partyLoadShared(sharedDataStoreCode, {
        p1x: width - 40,
        p1y: height/2,
        p2x: 40,
        p2y: height/2,
        p1UUID: "",
        p2UUID: "",
        activeTagger: 0,
        activePlayers: 0,
        gameWinner: 0,
        gameCountdown: 0
      });
      sharedDataStoreCodeCreated = true;
    }

    if (!playersSet) {
      if (!timeSet) {
        timing = millis();
        timeSet = true;
      }
      if(millis() > timing + 3000) {
        sharedDataStore.activePlayers = 1;
        playersSet = true;
      }
    } 
    if (sharedDataStore.activePlayers === 2 && playersSet) {
      activePlayerUUID = random(10000000000);
      sharedDataStore.p1UUID = activePlayerUUID;
      gameState = "pregame";
    }
  }

  // If code is complete, tell user to press enter
  if (code.length === 4 && !waitingForPlayer) {
    textSize(25);
    textFont(regular);
    text("Press \"Enter\" to use this code", width / 2, height / 3-10);
  }

  // Display the code above the main buttons
  let spacing = (width - 4 * buttonSize) / 5;
  for (let i = 0; i < code.length; i++) {
    let x = spacing + i * (buttonSize + spacing);
    tint(255, 255);
    image(code[i], x/2+224, height / 2 - 50, displayCodeSize, displayCodeSize); // Display clicked buttons
  }

  // Display the main buttons if not waiting for player
  if (!waitingForPlayer) {
    for (let i = 0; i < 4; i++) {
      let x = spacing + i * (buttonSize + spacing); 
      codeButton(i, x);
    }
  } 
}

// Button to type join code
function codeButton(buttonImageIndex, x) {
  let y = height / 2 + 130; 

  // If mouse is hovering button, lower opacity
  if (mouseX > x && mouseX < x + buttonSize && mouseY > y && mouseY < y + buttonSize) {
    tint(255, 150); 
  } 
  else {
    tint(255, 255); 
  }
  
  image(buttonImages[buttonImageIndex], x, y, buttonSize, buttonSize);
}

