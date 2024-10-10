// Bubble Object Demo
// Drake Jordan
// Oct 10, 2024

let theBubbles = [];
let deadBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 5; i++) {
    spawnBubble();
  }

  // Create a new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(245);
  // moveBubblesRandomly();
  moveBubblesWithNoise();
  displayGraves();
  displayBubbles();
}

function mousePressed() {
  for (let bubble of theBubbles) {
    if (clickedOnBubble(mouseX, mouseY, bubble)) {
      let index = theBubbles.indexOf(bubble);
      theBubbles.splice(index, 1);

      spawnGrave(mouseX, mouseY);
    }
  }
}

function clickedOnBubble(x, y, theBubble) {
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);

  return distanceAway < theBubble.radius;
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    bubble.x = noise(bubble.timeX) * width;
    bubble.y = noise(bubble.timeY) * height;

    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 50) {
      // Move up
      bubble.y -= bubble.speed;
    } 
    else if (choice < 65) {
      // Move down
      bubble.y += bubble.speed;
    }
    else if (choice < 75) {
      // Move right
      bubble.x += bubble.speed;
    }
    else {
      // Move left
      bubble.x -= bubble.speed;
    }
  }
}

function displayBubbles() {
  for(let bubble of theBubbles) {
    noStroke();
    fill(bubble.r, bubble.g, bubble.b, bubble.a);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function displayGraves() {
  for(let grave of deadBubbles) {
    textAlign(CENTER, CENTER)
    fill(0);
    textSize(20);
    text("X", grave.x, grave.y);
  }
}

function spawnBubble() {
  let someBubble = {
    x: random(0, width),
    y: height + random(0, 50),
    speed: random(2, 5),
    radius: random(20, 50),

    r: random(20, 255),
    g: random(20, 255),
    b: random(20, 255),
    a: random(255),

    timeX: random(100000000),
    timeY: random(100000000000),
    deltaTime: 0.002,
  };

  theBubbles.push(someBubble);
}

function spawnGrave(x, y) {
  let someGrave = {
    x: x,
    y: y,
  };
  deadBubbles.push(someGrave);
}