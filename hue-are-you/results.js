let finalizedColor; // Final color that the user picks

let periodCount = 0;
let periodPlaceTime = 0; // Start time of period placement timer
let periodPlaceTimeSet = false; // Has the period placement timer been set

let scoreDisplayTime = 0; // Start time of score display timer
let scoreDisplayTimeSet = false; // Has the score display timer been set
let setOffScoreDislpayTime = false; // Has the score display timer been set off

let score = 0;
let hasScored = false;

function results() {
  textAlign(CENTER, CENTER);
  textFont(semibold);
  textSize(40);
  fill(0);

}


function tabulation() { 
  textAlign(CENTER, CENTER);
  textFont(semibold);
  textSize(40);
  fill(0);
  text(!hasScored ? "Interesting choice" + placePeriods(periodCount): "You scored " + score + "%!", width/2, height/2 - 300);

  fill(currentlySelectedColor.r, currentlySelectedColor.g, currentlySelectedColor.b);
  square(width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, 45);

  if (hasScored) {
    if (score < 40) {
      image(sadReaction, width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, WAITING_COLOR_SIZE);
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
  if (millis() > scoreDisplayTime + 9000) {
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