function instructions() {
  textAlign(CENTER);
  textWrap(WORD);
  fill(strokeColor);
  let textWidthLimit = width * 0.9;
  text(
    "Bob seems to have found himself in a terribly unsafe, and abstract construction zone, and heavy blocks are falling down from the sky! It is your job to make sure Bob can come home to his family tonight, so help him dodge those blocks! Not all paths around the blocks will be visible immediately, try moving your mouse wheel up or down to change the background color and add some contrast (try it now!). Red blocks will need a shove from you to get out of the way, hold down your left-click button and ram the cursor into red blocks to demolish them! Good luck saving Bob.",
    width / 2 - textWidthLimit / 2, 
    height / 2 - 100, 
    textWidthLimit
  );

  text(
    "Press \"Backspace\" to return to the start screen.",
    width / 2 - textWidthLimit / 2,
    height - 50,
    textWidthLimit
  );
}