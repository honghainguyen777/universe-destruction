const game = new Game();
const destroyer1 = new Destroyer(WIDTH/2, HEIGHT-50);

function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas");
}

function preload() {
    destroyer1.preload();
}

function draw() {
    clear();
    game.drawGrid();
    destroyer1.draw();
}

function keyPressed() {
    if (keyCode === 38) {
        destroyer1.moveUp();
    }
    if (keyCode === 40) {
        destroyer1.moveDown();
    }
    if (keyCode === 37) {
        destroyer1.moveLeft();
    }
    if (keyCode === 39) {
        destroyer1.moveRight();
    }
}