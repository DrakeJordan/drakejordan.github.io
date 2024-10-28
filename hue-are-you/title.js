// Screen shown when game starts
function titleScreen() {
  image(logo, width / 2 - 165 , height/3+40, logo.width/3, logo.height/3);

  textAlign(CENTER, CENTER);
  noStroke();
  fill(0);
  textSize(65);
  textFont(semibold);
  text("Hue are You?", width / 2, 200);

  textFont(regular);
  fill(117);
  textSize(40);
  text("The color matching game", width / 2, 270);

  startGameButton();
} 

function startGameButton() {
  let isHovered = false;

  if (mouseX >= width / 2 - 110 && mouseX <= width / 2 - 110 + 220 && mouseY >= height - 220 && mouseY <= height - 220 + 60) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }

  isHovered ? fill(60) : fill(0);
  rect(width / 2 - 110, height - 220, 220, 60, 18);
  textFont(regular);
  fill(255);
  textSize(29);
  text("Start!", width / 2, height - 195);
}