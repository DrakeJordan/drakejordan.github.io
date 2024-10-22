function mousePressed() {
  let spacing = (width - 4 * buttonSize) / 5;
  let y = height / 2 + 130;
    
  // Check if each button is being clicked
  for (let i = 0; i < 4; i++) {
    let x = spacing + i * (buttonSize + spacing);
      
    if (mouseX > x && mouseX < x + buttonSize && mouseY > y && mouseY < y + buttonSize) {
      if (code.length < 4) {
        // Push the button that is clicked
        code.push(buttonImages[i]);
      }
    }
  }
  
  // Create game button
  if (mouseX >= width / 4*2.5 && mouseX <= width / 4*2.5 + 186 && mouseY >=  height / 2 + 190 && mouseY <=  height / 2 + 190 + 45 && gameState === "titleScreen") {
    gameState = "createGame";
  }
    
  // Join game button
  if (mouseX >= width / 4-80 && mouseX <= width / 4-80 + 165 && mouseY >=  height / 2 + 190 && mouseY <=  height / 2 + 190 + 45 && gameState === "titleScreen") {
    gameState = "joinGame";
  }
}
  
// Remove last element of code if user presses backspace/delete
function keyPressed() {
  if (keyCode === BACKSPACE && !waitingForPlayer) {
    code.pop();
  }
  if (keyCode === ENTER && code.length === 4) {
    waitingForPlayer = true;
  }
  if (keyCode === TAB) {
    gameState = "winnerScreen";
  }
}