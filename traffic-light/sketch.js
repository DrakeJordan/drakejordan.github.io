// Traffic Light Starter Code
// Drake Jordan
// 9/24/2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis
let color = 0;
let lastSwitchedTime = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  switchLightsIfNeeded();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 12);
}

function switchLightsIfNeeded() {

    drawLights(false, false, true);
    
    if (color === 0) {
    if (millis() >= lastSwitchedTime + 4000) {
      color += 1;
      lastSwitchedTime = millis();
    }
  } else if (color === 1) {
    if (millis() >= lastSwitchedTime + 2000) {
      color += 1;
      lastSwitchedTime = millis();
    }
  } else if (color === 2) {
    if (millis() >= lastSwitchedTime + 4000) {
      color += 1;
      lastSwitchedTime = millis();
    }
  } else if (color === 3) {
    color = 0;
  }
}

function drawLights() {
if (color === 2) {
  fill("red");
} else {
  fill(255);
}
  ellipse(width/2, height/2 - 65, 50, 50);

if (color === 1) {
  fill("yellow");
}else {
  fill(255);
}
  ellipse(width/2, height/2, 50, 50);
if (color === 0) {
  fill("green"); 
} else {
  fill(255);
}
  ellipse(width/2, height/2 + 65, 50, 50);
}