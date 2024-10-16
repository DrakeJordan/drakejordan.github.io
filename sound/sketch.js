// Sound Effects
// Drake Jordan
// Oct 16, 2024

let music;
let soundEffect;

function preload() {
  music = loadSound("song.mp3");
  soundEffect = loadSound("pot.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
}

function keyPressed() {
  if (!music.isPlaying()) {
    music.loop();
  }
}