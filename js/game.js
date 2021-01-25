class Game {

  constructor() {
    this.starshipImg;
    this.imageDestroyer1;
    this.imageDestroyer2;
    this.imageBullet1;
    this.imageBullet2;

    
  }

  setup() {
    // use DOM to get the number of players - 1 or 2
    
    // create a list of players later

    this.destroyer = new Destroyer(WIDTH/2, HEIGHT-50, this.imageDestroyer1, this.imageBullet1);

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
    this.starshipImg = loadImage('assets/spaceships/spaceship_starship.png');
    this.imageDestroyer1 = loadImage('assets/spaceships/spaceship_weed1.png');
    this.imageDestroyer2 = loadImage('assets/spaceships/spaceship_weed2.png');
    this.imageBullet1 = loadImage('assets/lasers/laserBlue.png');
    this.imageBullet2 = loadImage('assets/lasers/laserGreen.png');
  }


  draw() {
    this.drawGrid();
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
      console.log(this.destroyer.scores)
      return true;

    })

    // this.starships.forEach((starship, index) => {
    //   if (starship.getShot(this.destroyer)) {
    //     console.log(starship.getShot(this.destroyer))
    //     console.log('hit')
    //     this.starships.filter();
    //   };
    // })
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

  drawGrid() {
    // Iteration 1
    // Draw the grid
    // https://p5js.org/reference/#/p5/line
    let step = 0;
    // width equals height
    while(step < WIDTH+1) {
      // horizontal lines
      line(0, step, WIDTH, step);
      // vertical lines
      line(step, 0 , step, WIDTH);
      step += 100;
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