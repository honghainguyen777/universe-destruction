const game = new Game();
// const destroyer1 = new Destroyer(WIDTH/2, HEIGHT-50);

function preload() {
  soundFormats("mp3", "ogg");
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

// User can choose destroyer
// change the difficulty and boss level
// Boss said in interval of time: You die! This en
// destroyer: So, you are the one who control this dirty universe?
// tao se xoa bo toan bo vu tru nay
