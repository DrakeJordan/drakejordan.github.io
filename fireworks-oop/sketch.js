// Fireworks OOP
// Drake Jordan
// Nov 18, 2024

const PARTICLE_COUNT = 150;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    
    this.size = random(5,9);

    this.r = random(120, 255);
    this.g = 0;
    this.b = random(120, 255);

    this.a = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, this.size);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.a -= 1;
  }

  isDead() {
    return this.a <= 0;
  }
}

let theFireworks = [];

function mousePressed() {
  for(let i = 0; i < PARTICLE_COUNT; i++) {
    let someParticle = new Particle(mouseX, mouseY);
    theFireworks.push(someParticle);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let particle of theFireworks) {
    if (particle.isDead()) {
      let index = theFireworks.indexOf(particle);
      theFireworks.splice(index, 1);
    } 
    else {
      particle.display();
      particle.update();
    }
  }
}
