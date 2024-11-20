// Connected Nodes OOP-
// Drake Jordan
// Nov 20, 2024

let nodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  addNode(width/2, height/2);
}

function draw() {
  background(255);

  // Move and draw lines
  for (let node of nodes) {
    node.update(nodes);
  }

  // Draw circles after, so they show up on top
  for (let node of nodes) {
    node.draw();
  }
}

function mousePressed() {
  for(let x = 0; x < 50; x++) {
  addNode(mouseX, mouseY);
  }
}

function addNode(x,y) {
  let node = new Node(x, y);
  nodes.push(node);
}

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.speed = 5;
    this.radius = 7;

    this.color = color(random(100, 255), 0, random(200, 255));

    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTile = 0.01;

    this.reach = 180;
    this.minRadius = 7;
    this.maxRadius = 17;
  }

  draw() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.radius*2);
  }

  update(nodes) {
    this.move();
    this.correctEdgeCollision();
    this.connectNode(nodes);
    this.adjustSizeWithMouse();
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < this.reach) {
      let size = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = size;
    } 
    else {
      this.radius = 7;
    }
  }

  move() {
    // Pick random direction for movement
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // Scale to the movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // Move point
    this.x += this.dx;
    this.y += this.dy;

    // Increment on the time axis
    this.xTime += this.deltaTile;
    this.yTime += this.deltaTile;
  }

  correctEdgeCollision() {
    if (this.x <= 0) {
      this.x = width-2;
    } 
    else if (this.x >= width) {
      this.x = 1;
    }
    else if (this.y <= 0) {
      this.y = height-1;
    }
    else if (this.y >= height) {
      this.y = 1;
    }
  }

  connectNode(nodes) {
    for (let otherNode of nodes) {
      // Aviod drawing line to self
      if (this !== otherNode) {
        let pointDistance = dist(this.x, this.y, otherNode.x, otherNode.y);
        if (pointDistance < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherNode.x, otherNode.y);
        }
      }
    }
  }
}