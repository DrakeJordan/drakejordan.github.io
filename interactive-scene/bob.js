function moveBob() {
    //Have bob drop at start
    if (bobY <= height - 46) {
      bobY += bobSpeed;
    }
  
    //Move right
    if (bobX < width - edgeOffset - bobH) {
      if (keyIsDown(39) || keyIsDown(68)) {
        bobX += bobSpeed;
      }
    }
  
    //Move left
    if (bobX > edgeOffset ) {
      if (keyIsDown(37) || keyIsDown(65)) {
        bobX -= bobSpeed;
      }
    }
  }

  function drawBob() {
    //Draw bob
    fill(255, 164, 107);
    noStroke();
    rect(bobX, bobY, bobH, bobW);
  }
