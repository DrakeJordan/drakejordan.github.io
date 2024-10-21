let timing2 = 0;
let timeSet2 = false;
let playersSet2 = false;

function joinGameScreen() {
  textAlign(CENTER);
  textFont(semibold);
  fill(0);
  textSize(45);
  
  // Title text with instructions
  if (!waitingForPlayer) {
    text("Enter a Game Join Code", width / 2, height / 4);
  } 
  else {
    text("Waiting For Player...", width / 2, height / 4);
    if (!sharedDataStoreCodeCreated) {
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
        activePlayers: sharedDataStore.activePlayers,
        gameWinner: 0,
        gameCountdown: 0
      });
      sharedDataStoreCodeCreated = true;
    }
    if (!timeSet2) {
      timing2 = millis();
      timeSet2 = true;
    }
    if(millis() > timing2 + 5000) {
      sharedDataStore.activePlayers = 2;
    }
    if (sharedDataStore.activePlayers === 2 && timeSet2) {
      activePlayerUUID = random(10000000000);
      sharedDataStore.p2UUID = activePlayerUUID;
      gameState = "pregame";
    }
  }
  let spacing = (width - 4 * buttonSize) / 5;
  // If code is complete, tell user to press enter
  if (code.length === 4 && !waitingForPlayer) {
    textSize(25);
    textFont(regular);
    text("Press \"Enter\" to use this code", width / 2, height / 3-10);
  }
  
  // Display the code above the main buttons
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
  
  