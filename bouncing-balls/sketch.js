// Bouncing Ball Demo
// Drake Jordan
// Oct 3, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 10; i++) {
    spawnBall(width/2, height/2);
  }
}

function draw() {
  background(220);
  for (let ball of ballArray) {
    // Move ball
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // Bounce if needed
    if (ball.y >= height || ball.y < ball.radius) {
      ball.dy *= -1;
    }
  
    if (ball.x < ball.radius || ball.x + ball.radius >= width) {
      ball.dx *= -1;
    }
  
    //Color the ball
    noStroke();
    fill(ball.red, ball.green, ball.blue, ball.alpha);
  
    // Display the ball
    circle(ball.x, ball.y, ball.radius*2);
  }
}

function mousePressed() {
  for (let i = 0; i < 10; i++) {
    spawnBall(mouseX, mouseY);
  }
}

function spawnBall(x, y) {
  let theBall = {
    x: x,
    y: y,
    radius: random(30,70),
    dx: random(-5, 5),
    dy: random(-5, 5),
    red: random(0, 255),
    green: random(0, 255),
    blue: random(0, 255),
    alpha: random(0, 255),
  };
  ballArray.push(theBall);
}