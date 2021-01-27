const game = new Game();
// const destroyer1 = new Destroyer(WIDTH/2, HEIGHT-50);

function preload() {
    soundFormats('mp3', 'ogg');
    game.preload();
}


function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas");
    game.setup();
}

function draw() {
    clear();
    background(game.backgroundImage);
    game.draw();
}

function keyPressed() {
    game.keyPressed();
}

// make sheld reduce if collision 10% if get 1 shot, 20% in hit to starship
// if number of of starship passed too many --> loose the game
// User can choose destroyer 