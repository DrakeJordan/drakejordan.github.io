// Walker OOP- Array
// Drake Jordan
// Nov 14, 2024 

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

let walkerArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let chisom = new Walker(width/2, height/2, 10, 3, "lightpink");
  walkerArray.push(chisom);
}

function draw() {
  for (let walker of walkerArray){
    walker.draw();
    walker.move();
  }
}

function mousePressed() {
  let randomColor = color(random(255), random(255), random(255), random(20, 255));
  walkerArray.push(new Walker(mouseX, mouseY, 10, 3, randomColor));
}