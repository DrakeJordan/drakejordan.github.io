// Arrays and Object Notation
// Drake Jordan
// 10/8/2024
//
// Extra for Experts:
// - Used p5.party for multiplayer support

let sharedDataStore;
const PLAYER_SPEED = 4;

function preload() {
	  partyConnect(
		  "wss://demoserver.p5party.org", 
		  "multiplayerGame"
	  );
  sharedDataStore = partyLoadShared("shared", { p1x: 100, p1y: 100, p2x: 200, p2y: 200});
}

function setup() {
  createCanvas(700, 700);
  noStroke();
}

function mousePressed() {
  if (keyIsDown(80)) {
    sharedDataStore.p2x = mouseX;
    sharedDataStore.p2y = mouseY;
  } else {
    sharedDataStore.p1x = mouseX;
    sharedDataStore.p1y = mouseY;
  }
}

function movePlayer() {
  // Move player up
  if (keyIsDown(87) || keyIsDown(38)) {
    sharedDataStore.p1y -= PLAYER_SPEED;
  }

  // Move player down
  if (keyIsDown(83) || keyIsDown(40)) {
    sharedDataStore.p1y += PLAYER_SPEED;
  }

  // Move player left
  if (keyIsDown(65) || keyIsDown(37)) {
    sharedDataStore.p1x -= PLAYER_SPEED;
  }

  // Move player right
  if (keyIsDown(68) || keyIsDown(39)) {
    sharedDataStore.p1x += PLAYER_SPEED;
  }
}

function draw() {
  background(0);

  movePlayer();

  console.log("p1X " + sharedDataStore.p1x);
  console.log("p1Y " + sharedDataStore.p1y);
  console.log("p2X " + sharedDataStore.p2x);
  console.log("p2Y " + sharedDataStore.p2y);

  fill(255);
  ellipse(sharedDataStore.p1x, sharedDataStore.p1y, 100, 100);

  fill(255, 200, 0);
  ellipse(sharedDataStore.p2x, sharedDataStore.p2y, 100, 100);
}