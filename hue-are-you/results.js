let finalizedColor; // Final color that the user picks

let periodCount = 0;
let periodPlaceTime = 0; // Start time of period placement timer
let periodPlaceTimeSet = false; // Has the period placement timer been set

let scoreDisplayTime = 0; // Start time of score display timer
let scoreDisplayTimeSet = false; // Has the score display timer been set
let setOffScoreDislpayTime = false; // Has the score display timer been set off

let score = 0;
let hasScored = false;

function tabulation() { 
  if (hasScored) {
    checkGridButton();
  }
  noStroke();
  textAlign(CENTER, CENTER);
  textFont(semibold);
  textSize(40);
  fill(0);
  text(!hasScored ? "Interesting choice" + placePeriods(periodCount): "You scored " + Math.floor(score) + "%!", width/2, height/2 - 300);

  fill(64,0,60);
  textFont(regular);
  textSize(22);
  text(hasScored ? "Refresh page to play again" : "", width/2, height/2 - 250);

  fill(currentlySelectedColor.hue, currentlySelectedColor.saturation, currentlySelectedColor.brightness, currentlySelectedColor.alpha);
  square(width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, 45);

  score = calculateScore();

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

function scoreDisplayTimer() {
  if (!scoreDisplayTimeSet && setOffScoreDislpayTime) {
    scoreDisplayTime = millis();
    scoreDisplayTimeSet = true;
  }
  if (millis() > scoreDisplayTime + 6000) {
    hasScored = true;
  }
}

function placePeriods(count) {
  let periods = "";
  for(let x = 0; x < count; x++) {
    periods += ".";
  }
  return periods;
}

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

function calculateScore() {
  
  let distanceX = finalColorX - selectedColorX; 
  let distanceY = finalColorY - selectedColorY; 
  let distance = sqrt(distanceX * distanceX + distanceY * distanceY);

  let maxDistance = sqrt(GRID_SIZE * GRID_SIZE + GRID_SIZE * GRID_SIZE);

  let score = map(distance, 0, maxDistance, 100, 0); 

  return round(score); 
}