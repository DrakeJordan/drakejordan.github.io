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

  fill(64,0,60);
  textFont(regular);
  textSize(22);
  text("Created by Drake Jordan", width / 2, height - 160);

  startGameButton();
} 

// Start game button
function startGameButton() {
  let isHovered = false;

  if (mouseX >= width / 2 - 110 && mouseX <= width / 2 - 110 + 220 && mouseY >= height - 250 && mouseY <= height - 250 + 60) {
    isHovered = true;
  } 
  else {
    isHovered = false;
  }

  isHovered ? fill(64, 0, 25) : fill(0);
  rect(width / 2 - 110, height - 250, 220, 60, 18);
  textFont(medium);
  fill(255);
  textSize(29);
  text("Start!", width / 2, height - 224);
}