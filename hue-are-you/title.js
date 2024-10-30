// Screen shown when game starts
function titleScreen() {
  image(logo, width / 2 - 165 , height/3-10, logo.width/3, logo.height/3);

  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  textSize(65);
  textFont(semibold);
  text("Hue are You?", width / 2, 150);

  fill(64,0,60);
  textFont(regular);
  textSize(40);
  text("The color matching game", width / 2, 220);

  startGameButton();
  instructionsButton();
} 

function startGameButton() {
  let isHovered = false;

  if (mouseX >= width / 2 - 110 && mouseX <= width / 2 - 110 + 220 && mouseY >= height - 270 && mouseY <= height - 270 + 60) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }

  isHovered ? fill(64, 0, 25) : fill(0);
  rect(width / 2 - 110, height - 270, 220, 60, 18);
  textFont(regular);
  fill(255);
  textSize(29);
  text("Start!", width / 2, height - 245);
}

function instructionsButton() {
  let isHovered = false;

  if (mouseX >= width / 2 - 74 && mouseX <= width / 2 - 74 + 150 && mouseY >= height - 180 && mouseY <= height - 180 + 50) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }

  isHovered ? fill(64, 0, 25) : fill(0);
  rect(width / 2 - 74, height - 180, 150, 50, 100);

  textFont(regular);
  fill(255);
  textSize(20);
  text("Instructions", width / 2, height - 158);
}