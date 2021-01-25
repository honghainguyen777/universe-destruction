class Game {

  constructor() {
    this.backgroundImage;
    this.starshipImg;
    this.imageDestroyer1;
    this.imageDestroyer2;
    this.imageBullet1;
    this.imageBullet2;
    // this.start = false;
  }

  setup() {
    // use DOM to get the number of players - 1 or 2
    
    // create a list of players later

    this.destroyer = new Destroyer(WIDTH/2-50, HEIGHT-100, this.imageDestroyer1, this.imageBullet1);

    this.starships = [];
    this.objectTrack = [];
    // when starship appear alternatively in seconds - depend on level - interval
    // change later 
    this.durationStarship = 3;
    // number of starships appear at a time
    this.maxStarshipsApprear = 4;
    // the SetInterval
    this.interval;
    this.starshipGen();
  }

  preload() {
    // Loading images - before starting the game

    // load shield
    this.shield = loadImage('assets/spaceships/shield.png');

    this.backgroundImage = loadImage('assets/background/space1.png');
    this.starshipImg = loadImage('assets/spaceships/starship.png');
    this.imageDestroyer1 = loadImage('assets/spaceships/destroyer1.png');
    this.imageDestroyer2 = loadImage('assets/spaceships/destroyer2.png');
    this.imageBullet1 = loadImage('assets/lasers/laserBlue.png'); 
    this.imageBullet2 = loadImage('assets/lasers/laserGreen.png');
  }


  draw() {
    // this.drawGrid();
    this.drawStarship();

    this.destroyer.draw();
    this.destroyer.multipleFires()

    this.starships = this.starships.filter(starship => {
      if (starship.getShot(this.destroyer)) {
        return false;
      }
      // let it here for further scoring
      if (starship.y > height + starship.sizeY) {
        return false;
      }

      if (starship.getHit(this.destroyer)) {
        return false;
      }
      return true;
    })

    this.shieldStatus(this.destroyer);
    this.levelUp(this.destroyer)

    if (this.destroyer.isLost()) {
      // performing stop here -> loose
    }
  }

  // starships generator -> can use to generate planet and stars
  starshipGen() {
    this.interval = setInterval(() => {
      let n = Math.floor(Math.random() * this.maxStarshipsApprear) + 1;
      let noStarships = 0;
      while(noStarships < n) {
        let starship = new Starship(this.starshipImg);
        if (!this.objectTrack.includes(starship.x)) {
          this.starships.push(starship);
          this.objectTrack.push(starship.x);
          noStarships++;
        }
      }
      // for (let i=0; i<n; i++) {

      //   this.starships.push(new Starship(this.starshipImg));
      // }
      this.objectTrack = []
    }, this.durationStarship * 1000);
  }

  drawStarship() {
    if (this.starships.length) {
      this.starships.forEach(starship => {
        starship.draw();
      })
    }
  }

  shieldStatus(destroyer) {
    image(this.shield, 10, 10, 50, 50);
    colorMode(RGB, 60);
    fill(255, 255, 255, 0);
    rect(60, 15, 120, 33);
    fill(0, 143, 17, 100);
    rect(60, 15, destroyer.shield * 120/100, 33)
    fill(255, 165, 0, 100);
    textSize(28);
    textFont('Orbitron')
    textStyle(BOLD);
    if (destroyer.shield === 100) {
      text(`${destroyer.shield}%`, 80, 41);
    } else if (destroyer.shield < 100 && destroyer.shield > 0) {
      text(`${destroyer.shield}%`, 95, 41);
    } else {
      text(`${destroyer.shield}%`, 105, 41);
    }
  }

  levelUp(destroyer) {
    textSize(28);
    textFont('Orbitron')
    textStyle(BOLD);
    text(`LV ${destroyer.level}`, 200, 41);

    colorMode(RGB, 60);
    fill(255, 255, 255, 0);
    rect(60, 15, 120, 33);
    fill(0, 143, 17, 100);
    rect(60, 15, destroyer.shield * 120/100, 33)
    fill(255, 165, 0, 100);
    textSize(28);
    textFont('Orbitron')
    textStyle(BOLD);
    if (destroyer.shield === 100) {
      text(`${destroyer.shield}%`, 80, 41);
    } else if (destroyer.shield < 100 && destroyer.shield > 0) {
      text(`${destroyer.shield}%`, 95, 41);
    } else {
      text(`${destroyer.shield}%`, 105, 41);
    }
  }

  keyPressed() {
    if (keyCode === 32) {
        this.destroyer.fireBullet();
    }
    if (keyCode === 38) {
      this.destroyer.moveUp();
    }
    if (keyCode === 40) {
      this.destroyer.moveDown();
    }
    if (keyCode === 37) {
      this.destroyer.moveLeft();
    }
    if (keyCode === 39) {
      this.destroyer.moveRight();
    }
  }
}