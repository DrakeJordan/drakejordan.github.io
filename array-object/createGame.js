let buttonSize = 100; // Main button size
let displayCodeSize = 50; // User picked code size
let code = []; // User typed code

let waitingForPlayer = false; // Is the user waiting for a player
let playerJoined = false; // Track if a player has joined // Whether the user is waiting for a player or not

let timeSet = false; // Has the timer been set
let timing = 0; // What is the timer at
let playersSet = false; // Have the players been set
let playersReset = false; // Have the player values been reset

// Create game screen
function createGameScreen() {
  textAlign(CENTER);
  textFont(semibold);
  fill(0);
  textSize(45);

  // Title text with instructions, shown if not waiting for other players
  if (!waitingForPlayer) {
    text("Create a Game Join Code", width / 2, height / 4);
  } 
  else {
  // Title text with instructions, shown if waiting for other players
    text("Waiting For Player...", width / 2, height / 4);

    // Convert the button array into a string that p5.party can use
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

      // Connect to the server the user has picked
      sharedDataStore = partyLoadShared(sharedDataStoreCode, {
        p1x: width - 40,
        p1y: height/2,
        p2x: 40,
        p2y: height/2,
        p1UUID: "",
        p2UUID: "",
        activePlayers: 0,
        gameWinner: 0,
        gameCountdown: 0,
        gameEndCountdown: 0,
        winnerFound: false
      });
      sharedDataStoreCodeCreated = true;
    }

    // If the players have not been set, and the timer has not been set, create the player set timer
    if (!playersSet) {
      if (!timeSet) {
        timing = millis();
        timeSet = true;
      }

      // Wait for p5.party connect, mark that server has one player
      if(millis() > timing + 3000) {
        sharedDataStore.activePlayers = 1;
        playersSet = true;
      }
    } 

    // If server has two players, set player UUID and enter pregame waiting screne
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

