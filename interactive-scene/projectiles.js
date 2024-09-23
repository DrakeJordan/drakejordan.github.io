let activeLinePositon = 0;
let secondaryLinePositon = 0;
let tertiaryLinePositon = 0;
let quaternaryLinePositon = 0;

let projectileSpeed = 4;

function moveProjectileLines() {
    // Move each line down by the current projectileSpeed
    activeLinePositon += projectileSpeed;
}

function fillProjectile(type) {
    // If type is whtie, always fill black
    if (type === 'b') {
        fill(0);
    } 
    // If type is white, always fill white
    else if (type === 'w') {
        fill(255);
    } 
    // If type is fluid, fill the oposite of the background
    else if (type === 'f') {
        fill(strokeColor);
    }
}

function dropSquare(x, type, size) {
    // Spawn a square
    fillProjectile(type);
    noStroke();
    square(x, activeLinePositon, size);  
}

function dropRect(x, type, w, h) {
    // Spawn a rectangle
    noStroke();
    square(x, activeLinePositon, w, h);  
}

function debugRow() {
    dropSquare(20, 'b', 20)
    dropSquare(70, 'b', 20)
}