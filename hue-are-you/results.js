let finalizedColor; // Final color that the user picks

let periodCount = 0;
let periodPlaceTime = 0; // Start time of period placement timer
let periodPlaceTimeSet = false; // Has the period placement timer been set


function tabulation() { 
  textAlign(CENTER, CENTER);
  textFont(semibold);
  textSize(40);
  fill(0);
  text("Interesting choice" + placePeriods(periodCount), width/2, height/2 - 300);

  fill(currentlySelectedColor.r, currentlySelectedColor.g, currentlySelectedColor.b);
  square(width/2 - WAITING_COLOR_SIZE/2, height/2 - WAITING_COLOR_SIZE/2, WAITING_COLOR_SIZE, 45);

  if (!periodPlaceTimeSet) {
    periodPlaceTime = millis();
    periodPlaceTimeSet = true;
  }

  if (millis() > periodPlaceTime + 1000 && periodCount !== 3) {
    periodPlaceTime = millis();
    periodCount += 1;
  }
}

function placePeriods(count) {
  let periods = "";
  for(let x = 0; x < count; x++) {
    periods += ".";
  }
  return periods;
}