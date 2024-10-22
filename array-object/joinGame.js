let timing2 = 0;  // What is the timer at
let timeSet2 = false; // Has the timer been set
let playersSet2 = false; // Have the players been set


// Join game screen
function joinGameScreen() {
  textAlign(CENTER);
  textFont(semibold);
  fill(0);
  textSize(45);
  
  // Title text with instructions, shown if not waiting for other players
  if (!waitingForPlayer) {
    text("Enter a Game Join Code", width / 2, height / 4);
  } 
  else {
    // Title text with instructions, shown if waiting for other players
    text("Waiting For Player...", width / 2, height / 4);

    // Convert the button array into a string that p5.party can use
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

      // Connect to the server the user has picked
      sharedDataStore = partyLoadShared(sharedDataStoreCode, {
        p1x: width - 40,
        p1y: height/2,
        p2x: 40,
        p2y: height/2,
        p1UUID: "",
        p2UUID: "",
        activePlayers: sharedDataStore.activePlayers,
        gameWinner: 0,
        gameCountdown: 0,
        gameEndCountdown: 0,
        winnerFound: false
      });
      sharedDataStoreCodeCreated = true;
    }

    // If the timer has not been set, create the player set timer
    if (!timeSet2) {
      timing2 = millis();
      timeSet2 = true;
    }

    // Wait for p5.party connect, mark that server has two players
    if(millis() > timing2 + 5000) {
      sharedDataStore.activePlayers = 2;
    }

    // If server has two players, set player UUID and enter pregame waiting screne
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
  
  