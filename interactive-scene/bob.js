// Bob's movement variables
let bobX = 0;
let bobY = 0;
let bobW = 30;
let bobH = 30;
let bobSpeed = 10;

function moveBob() {
  // Have bob drop at start
  if (bobY <= height - 46) {
    bobY += bobSpeed;
  }
  
  // Move right
  if (bobX < width - edgeOffset - bobH) {
    if (keyIsDown(39) || keyIsDown(68)) {
      bobX += bobSpeed;
    }
  }
  
  // Move left
  if (bobX > edgeOffset ) {
    if (keyIsDown(37) || keyIsDown(65)) {
      bobX -= bobSpeed;
    }
  }
}

function drawBob() {
  // Draw bob
  fill(255, 164, 107);
  noStroke();
  image(bob, bobX, bobY, bobH, bobW);
}
