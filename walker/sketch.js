// Walker OOP-
// Drake Jordan
// Nov 13, 2024

class Walker {
  constructor(x, y, speed, radius, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
    this.color = color;
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // Move up
      this.y -= this.speed;
    } 
    else if (choice < 50) {
      // Move down
      this.y += this.speed;
    } 
    else if (choice < 75) {
      // Move right
      this.x += this.speed;
    } 
    else {
      // Move left
      this.x -= this.speed;
    }
  }

  draw() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }
}

let drake;
let chisom;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drake = new Walker(width/2, height/2, 20, 8, "orange");
  chisom = new Walker(width/2, height/2, 20, 6, "lightpink");
}

function draw() {
  drake.draw();
  drake.move();

  chisom.draw();
  chisom.move();
}
