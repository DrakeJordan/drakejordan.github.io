// Inheritance
// Drake Jordan
// Dec 3, 2024

// Parent class
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  // Common display for all shapes
  display() {
    noStroke();
    fill(this.color);
  }

  // Common move for all shapes
  move() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
  }
}

// Child class
class Circle extends Shape {
  constructor(x, y, color, radius) {
    super(x, y, color);
    this.radius = radius;
  }

  // Override display function
  display() {
    super.display();
    circle(this.x, this.y, this.radius*2);
  }
}

// Child class
class Square extends Shape {
  constructor(x, y, color, size) {
    super(x, y, color);
    this.size = size;
  }

  display() {
    super.display();
    square(this.x, this.y, this.size);
  }
}

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 500; i += 1) {
    if(random(100) > 50) {
      let circle = new Circle(random(width), random(height), color(random(100, 255), 0, random(100, 255)), random(20,50));
      shapes.push(circle);
    }
    else {
      let square = new Square(random(width), random(height), color(random(100, 255), 0, random(100, 255)), random(10,40));
      shapes.push(square);
    }
  }
}

function displayShapes() {
  for (let shape of shapes) {
    shape.display();
    shape.move();
  }
}

function draw() {
  background(220);
  displayShapes();
}
