// Local Storage
// Drake Jordan
// Dec 2, 2024

let clickCount = 0;
let highestClickCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Only get the high score if it exists
  if (getItem("highestClickCount")) {
    highestClickCount = getItem("highestClickCount");
  }
}

function draw() {
  background(255);
  displayClicks();
  displayHighScore();
}

function displayClicks() {
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(75);
  text(clickCount, width/2, height/2);
}

function displayHighScore() {
  textAlign(CENTER, CENTER);
  fill("green");
  textSize(50);
  text("High Score: " + highestClickCount, width-300, 200);
}

function mousePressed() {
  clickCount += 1;
  if (clickCount > highestClickCount) {
    highestClickCount = clickCount;
    storeItem("highestClickCount", highestClickCount);
  }
}