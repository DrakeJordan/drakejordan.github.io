// Traffic Light Demo
// Drake Jordan
// 9/24/2024

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let selectedColor = 0;
let lastSwitchedTime = 0;
const YELLOW_LIGHT_DURATION = 2000;
const RED_GREEN_LIGHT_DURATION = 4000;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawLightBox();
  switchLightsIfNeeded();
}

function drawLightBox() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 12);
}

function switchLightsIfNeeded() {

  function checkAndSwitch(waitTime) {
    if (millis() >= lastSwitchedTime + waitTime) {
      selectedColor += 1;
      lastSwitchedTime = millis();
    }
  }

  drawLights(false, false, true);
    
  if (selectedColor === 0) {
    checkAndSwitch(RED_GREEN_LIGHT_DURATION);
  }
  else if (selectedColor === 1) {
    checkAndSwitch(YELLOW_LIGHT_DURATION);
  }
  else if (selectedColor === 2) {
    checkAndSwitch(RED_GREEN_LIGHT_DURATION);
  }
  else if (selectedColor === 3) {
    selectedColor = 0;
  }
}

function drawLights() {
  function fillLight(color, selection) {
    if (selectedColor === selection) {
      fill(color);
    }
    else {
      fill(255);
    }
  }

  fillLight("red", 2);
  ellipse(width/2, height/2 - 65, 50, 50);

  fillLight("yellow", 1);
  ellipse(width/2, height/2, 50, 50);

  fillLight("green", 0);
  ellipse(width/2, height/2 + 65, 50, 50);
}