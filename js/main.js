const game = new Game();
// const destroyer1 = new Destroyer(WIDTH/2, HEIGHT-50);

function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas");
    game.setup();
}

function preload() {
    game.preload();
}

function draw() {
    clear();
    game.draw();
}

function keyPressed() {
    game.keyPressed();
}

// make sheld reduce if collision 10% if get 1 shot, 20% in hit to starship
// if number of of starship passed too many --> loose the game