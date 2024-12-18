// Sierpinski Triangle
// Drake Jordan
// Dec 18th, 2024

let initialTrinagle = [
{x: 50, y: 900},
{x:500, y: 50},
{x:950, y: 900},
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinski(initialTrinagle, 13);
}

function sierpinski(points, depth) {
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  
  // Exit clause
  if(depth > 0) {
    //draw upper triangle
    sierpinski([points[0],
      midpoint(points[0], points[1]),
      midpoint(points[0], points[2])],
    depth - 1);

    //draw left triangle
    sierpinski([points[1],
      midpoint(points[0], points[1]),
      midpoint(points[1], points[2])],
    depth - 1);

    //draw right triangle
    sierpinski([points[2],
      midpoint(points[0], points[2]),
      midpoint(points[1], points[2])],
    depth - 1);
  }
}

function midpoint(point1, point2) {
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  
  return {x: midX, y: midY};
}