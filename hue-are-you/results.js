let finalizedColor; // Final color that the user picks

let periodCount = 0; // How many periods in waiting sentance
let periodPlaceTime = 0; // Start time of period placement timer
let periodPlaceTimeSet = false; // Has the period placement timer been set

let scoreDisplayTime = 0; // Start time of score display timer
let scoreDisplayTimeSet = false; // Has the score display timer been set
let setOffScoreDislpayTime = false; // Has the score display timer been set off

let sharedScoreTime = 0; // Start time of the shared score timer
let sharedScoreTimeSet = false; // Has the score display timer been set

let score = 0; // The users score
let hasScored = false; // Has the user scored

// In multiplayer, check which user is a winner and return as string
function checkWinner() {
  if (partyIsHost()) {
    if (shared.sharedHostScore > shared.sharedGuestScore) {
      return "You win!!!";
    }
    else if (shared.sharedHostScore < shared.sharedGuestScore) {
      return "You lose...";
    } 
    else {
      return "You tied!";
    }
  }
  else {
    if (shared.sharedHostScore < shared.sharedGuestScore) {
      return "You win!!!";
    }
    else if (shared.sharedHostScore > shared.sharedGuestScore) {
      return "You lose...";
    } 
    else {
      return "You tied!";
    }
  }
}

// Screen showing results
function tabulation() { 

  // If the scoring is complete, show the "Show Grid" button. Different values for single and multiplayer
  if (isSinglePlayer) {
    if (hasScored) {
      checkGridButton();
    }
  } 
  else {
    if(shared.sharedScoreTimeComplete) {
      checkGridButton();
    }
  }

  noStroke();
  textAlign(CENTER, CENTER);
  textFont(semibold);
  textSize(40);
  fill(0);

  // If the user(s) are not scored, show waiting text. If they are, show results text. Different values for single and multiplayer
  if (isSinglePlayer) {
    text(!hasScored ? "Interesting choice" + placePeriods(periodCount): "You scored " + Math.floor(score) + "%!", width/2, height/2 - 300);
  }
  else if (partyIsHost()) {
    text(!shared.sharedScoreTimeComplete ? "Waiting for other player" + placePeriods(periodCount): "You scored " + Math.floor(score) + "%. " + checkWinner(), width/2, height/2 - 300);
  }
  else  {
    text(!shared.sharedScoreTimeComplete ? "Waiting for other player" + placePeriods(periodCount): "You scored " + Math.floor(score) + "%. " + checkWinner(), width/2, height/2 - 300);
  }

  fill(64,0,60);
  textFont(regular);
  textSize(22);

  // If the user(s) are not scored, show no text. If they are, show results text. Different values for single and multiplayer
  if (isSinglePlayer) {
    text(hasScored ? "Refresh page to play again" : "", width/2, height/2 - 250);
  } 
  else if (partyIsHost()) {
    text(shared.sharedScoreTimeComplete ? "Refresh page to play again, your opponent scored " + Math.floor(shared.sharedGuestScore) + "%." : "", width/2, height/2 - 250);
  }
  else {
    text(shared.sharedScoreTimeComplete ? "Refresh page to play again, your opponent scored " + Math.floor(shared.sharedHostScore) + "%." : "", width/2, height/2 - 250);
  }

  // Fill preview square with appropriate color
  if (isSinglePlayer) {
    fill(currentlySelectedColor.hue, currentlySelectedColor.saturation, currentlySelectedColor.brightness, currentlySelectedColor.alpha);
  }
  else if (partyIsHost()) {
    fill(shared.sharedHostSelectedColor.hue, shared.sharedHostSelectedColor.saturation, shared.sharedHostSelectedColor.brightness, shared.sharedHostSelectedColor.alpha);
  }
  else {
    fill(shared.sharedGuestSelectedColor.hue, shared.sharedGuestSelectedColor.saturation, shared.sharedGuestSelectedColor.brightness, shared.sharedGuestSelectedColor.alpha);
  }
  square(width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, 45);

  // Calculate the users score
  score = calculateScore();

  // Display correct emotion based on user score, different values for single and multiplayer
  if (isSinglePlayer) {
    if (hasScored) {
      if (score < 70) {
        image(sadReaction, width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, WAITING_COLOR_SIZE);
      } 
      else if (score > 70 && score < 92) {
        image(happyReaction, width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, WAITING_COLOR_SIZE);
      } 
      else {
        image(shockedReaction, width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, WAITING_COLOR_SIZE);
      }
    }
  } 
  else {
    if (shared.sharedScoreTimeComplete) {
      if (checkWinner() === "You lose...") {
        image(sadReaction, width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, WAITING_COLOR_SIZE);
      } 
      else if (checkWinner() === "You win!!!") {
        image(happyReaction, width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, WAITING_COLOR_SIZE);
      } 
      else {
        image(shockedReaction, width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, WAITING_COLOR_SIZE);
      }
    }
  }
  
  // Place periods in waiting sentance on a timer
  if (!periodPlaceTimeSet) {
    periodPlaceTime = millis();
    periodPlaceTimeSet = true;
  }

  if (millis() > periodPlaceTime + 1000 && periodCount !== 3) {
    periodPlaceTime = millis();
    periodCount += 1;
  }
  else {
    setOffScoreDislpayTime = true;
  }
  scoreDisplayTimer();
}

// Wait to show user score with a timer, different values for single and multiplayer
function scoreDisplayTimer() {
  if (!scoreDisplayTimeSet && setOffScoreDislpayTime) {
    scoreDisplayTime = millis();
    scoreDisplayTimeSet = true;
  }
  if (millis() > scoreDisplayTime + 6000) {
    if(isSinglePlayer) {
      hasScored = true;
    }
    else {
    }
  }
  if (!isSinglePlayer && shared.sharedHostHasPicked && shared.sharedGuestHasPicked && !sharedScoreTime && partyIsHost()) {
    sharedScoreTime = millis();
    sharedScoreTimeSet = true;
  }
  if (!isSinglePlayer && millis() > sharedScoreTime + 6000 && sharedScoreTimeSet) {
    shared.sharedScoreTimeComplete = true;
  }
}

// Add appropiate number of periods
function placePeriods(count) {
  let periods = "";
  for(let x = 0; x < count; x++) {
    periods += ".";
  }
  return periods;
}

// Button to check results grid
function checkGridButton() {
  let isHovered = false;

  if (mouseX >= width / 2 - 110 && mouseX <= width / 2 - 110 + 220 && mouseY >= height - 226 && mouseY <= height - 226 + 60) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }

  isHovered ? fill(64, 0, 25) : fill(0);
  rect(width / 2 - 110, height - 226, 220, 60, 18);
  textFont(medium);
  fill(255);
  textSize(29);
  text("Check Grid", width / 2, height - 200);
}

// Calculate the users score, different values for single and multiplayer
function calculateScore() {
  if (isSinglePlayer) {
    let distanceX = finalColorX - selectedColorX; // Find horizontal distance
    let distanceY = finalColorY - selectedColorY; // Find vertical distance
    let distance = sqrt(distanceX * distanceX + distanceY * distanceY); // Calculate straight line between tiles

    let maxDistance = sqrt(GRID_SIZE * GRID_SIZE + GRID_SIZE * GRID_SIZE); // Calculate max distance on grid

    let score = map(distance, 0, maxDistance, 100, 0); // Map the distance to a score, 0 distance is 100 points and maxDistance is 0 points

    return round(score); // return score
  } 
  else if (partyIsHost()) {
    let distanceX = shared.sharedFinalColorX - shared.sharedHostSelectedColorX; 
    let distanceY = shared.sharedFinalColorY - shared.sharedHostSelectedColorY;
    let distance = sqrt(distanceX * distanceX + distanceY * distanceY);

    let maxDistance = sqrt(GRID_SIZE * GRID_SIZE + GRID_SIZE * GRID_SIZE);

    let score = map(distance, 0, maxDistance, 100, 0); 
    shared.sharedHostScore = score;

    return round(score); 
  }
  else {
    let distanceX = shared.sharedFinalColorX - shared.sharedGuestSelectedColorX; 
    let distanceY = shared.sharedFinalColorY - shared.sharedGuestSelectedColorY;
    let distance = sqrt(distanceX * distanceX + distanceY * distanceY);

    let maxDistance = sqrt(GRID_SIZE * GRID_SIZE + GRID_SIZE * GRID_SIZE);

    let score = map(distance, 0, maxDistance, 100, 0); 
    shared.sharedGuestScore = score;

    return round(score); 
  }
}
