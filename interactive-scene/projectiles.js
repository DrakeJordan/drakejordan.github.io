let activeLinePositon = 0;
let secondaryLinePositon = 0;
let tertiaryLinePositon = 0;
let quaternaryLinePositon = 0;

let projectileSpeed = 4;

function moveProjectileLines() {
    // Move each line down by the current projectileSpeed
    activeLinePositon += projectileSpeed;
}

function fillProjectile() {
    // If is type black, always fill black
    if (type === 'b') {

    } 
    else if (type === 'w') {

    } else if (type === 'f') {

    }
}

function dropSquare(x, type, size) {
    // Spawn a square
    square(x, activeLinePositon, size);  
}

function dropRect(x, type, w, h) {
    // Spawn a rectangle
    square(x, activeLinePositon, w, h);  
}