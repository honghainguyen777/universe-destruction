class Game {

  constructor() {
    this.start = false;
    this.end = false;
    this.won = false;
    // if 2 players -> allow three lives for both of them
    this.lives = 1;
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
    this.difficultyLevel = 1;
  }

  preload() {
    this.shield = loadImage('assets/spaceships/shield.png');
    this.backgroundImage = loadImage('assets/background/space1.png');
    this.starshipImg = loadImage('assets/spaceships/starship.png');
    this.imageDestroyer1 = loadImage('assets/spaceships/destroyer1.png');
    this.imageDestroyer2 = loadImage('assets/spaceships/destroyer2.png');
    this.imageBullet1 = loadImage('assets/lasers/laserBlue.png'); 
    this.imageBullet2 = loadImage('assets/lasers/laserGreen.png');
    this.starshipBullet = loadImage('assets/lasers/laserRed.png');
    this.explosionImg = loadImage('assets/spaceships/explosionImg.png')
    this.start1 = loadImage('assets/startImg/travel.gif');
    
    // reduce size of this gif
    this.youLose = loadImage('assets/endImgs/youLose.gif');
    this.youLoseBgr = loadImage('assets/endImgs/youLostBgr.gif');
    
    this.shootingSound = loadSound('assets/musics/shootingSound.ogg');
    this.backgroundSound = loadSound('assets/musics/background.mp3');
    this.gameoverSound = loadSound('assets/musics/gameover.mp3');
    this.explosionSound1 = loadSound('assets/musics/explosion1.mp3')
    //shield
    this.shieldDownSound = loadSound('assets/musics/shieldDown.ogg');
    this.shieldUpSound = loadSound('assets/musics/shieldUp.ogg');
    this.explosionSound1.setVolume(0.2);
    this.gameoverSound.setVolume(0.5)
    this.backgroundSound.setVolume(0.3)
  }


  draw() {
    if (!this.start) {
      if (!this.end) {
        this.preStart();
      } else {
        this.endGame();
      }
    } else {
      this.drawStarship();
      this.destroyer.draw();
      this.destroyer.multipleFires()

      this.starships = this.starships.filter(starship => {
        if (starship.getShot(this.destroyer)) {
          image(this.explosionImg, starship.x, starship.y, starship.sizeX+5, starship.sizeY+5);
          this.explosionSound1.play();
          // clearInterval(starship.fireGen);
          return false;
        }
        // starship passed -> mother ship is going to be destroyed, the shield is down
        if (starship.y > height + starship.sizeY) {
          this.destroyer.shield -= 2;
          this.shieldDownSound.play();
          return false;
        }

        if (starship.getHit(this.destroyer)) {
          image(this.explosionImg, starship.x, starship.y, starship.sizeX+5, starship.sizeY+5);
          this.explosionSound1.play();
          this.shieldDownSound.play();
          return false;
        }
        // too heavy task to load when using explosion effects here
        starship.multipleFires(this.destroyer);
        return true;
      })

      this.shieldStatus(this.destroyer);
      this.levelUp(this.destroyer)

      if (this.destroyer.shield < 0) {
        this.backgroundSound.stop()
        this.gameoverSound.play();
        this.end = true;
        this.start = false;
        
      }
    }
  }

  // before starting the game
  preStart() {
    background(this.start1);
    // background(game.backgroundImage);
    image(this.imageDestroyer1, width/2-112, height-300, 224, 150);
    textStyle(BOLD);
    textFont('Potta One');
    textSize(60);
    text('Universe Destruction', 70, 100);

    
    textSize(42);
    fill("#00af91")
    text('PRESS ENTER KEY TO START', 80, height/1.4);

    textFont('Orbitron')
    textSize(35);
    fill("white");
    text('Weed, The Destroyer', width/4+10, height-100);
    textSize(26);
    text("Don't feel bad when wiping all civilizations ", width/6, height-50);
  }

  endGame() {
    // gameover, Your shield is down,
    background(this.youLoseBgr);
    textFont('Potta One');
    textSize(60);
    text('YOU LOSE!', 240, 120);
    
    textFont('Orbitron')
    textSize(45);
    text(`Your scores: ${this.destroyer.scores}`, width/4+10, 250);

    // Ranking list, later

    image(this.youLose, 0, height/2-(width*0.562/2), width, width*0.562);

    textFont('Potta One');
    textSize(50);
    text('PRESS M TO REVENGE', 110, height/2 + (width*0.562/2) + 100);


    textFont('Orbitron')
    textSize(35);
    fill("white");
    text('Weed, The Destroyer', width/4+10, height-100);
    textSize(26);
    text("Don't feel bad when wiping all civilizations ", width/6, height-50);
  }

  // universe code --> destroy to end the game
  // specify which level to appear universe code
  winGame() {

  }

  instruction() {

  }

  // starships generator -> can use to generate planet and stars
  // once a starship generated, it starts fire its three bullets
  starshipGen() {
    this.interval = setInterval(() => {
      if (this.start) {
        let n = Math.floor(Math.random() * this.maxStarshipsApprear) + 1;
        let noStarships = 0;
        while(noStarships < n) {
          let starship = new Starship(this.starshipImg, this.difficultyLevel, this.starshipBullet);
          if (!this.objectTrack.includes(starship.x)) {
            starship.firesGeneration();
            this.starships.push(starship);
            this.objectTrack.push(starship.x);
            noStarships++;
          }
        }
        this.objectTrack = []
      }
      
    }, this.durationStarship * 1000);
  }


  // draw all starship based on their current positions
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
    fill(255, 255, 255, 10);
    rect(60, 15, 120, 33);

    // turn red if shield < 40%
    if (destroyer.shield < 40) {
      fill(255, 0, 0);
    } else {
      fill(0, 143, 17);
    }

    rect(60, 15, destroyer.shield * 120/100, 33)
    fill(255, 165, 0, 100);
    textSize(28);
    textFont('Orbitron')
    textStyle(BOLD);
    // Center the text in the middle of the progress bar
    if (destroyer.shield === 100) {
      text(`${destroyer.shield}%`, 80, 41);
    } else if (destroyer.shield < 100 && destroyer.shield > 0) {
      text(`${destroyer.shield}%`, 95, 41);
    } else {
      text(`${destroyer.shield}%`, 105, 41);
    }
  }

  levelUp(destroyer) {
    let lvlScores = BASED_SCORE * 2** this.difficultyLevel;
    text(`LV ${this.difficultyLevel}:`, 240, 41);

    fill(255, 255, 255, 10);
    rect(325, 15, 120, 33);
    colorMode(RGB, 100);
    fill(255, 166, 77);
    rect(325, 15, destroyer.scores * 120/lvlScores, 33)
    
    colorMode(RGB, 60);
    fill(0, 128, 0);
    textSize(23);
    if (destroyer.scores > 999) {
      text(`${destroyer.scores}`, 352, 39);
    } else if (destroyer.scores < 1000 && destroyer.scores >= 100) {
      text(`${destroyer.scores}`, 355, 39);
    } else if (destroyer.scores < 100 && destroyer.scores >= 10) {
      text(`${destroyer.scores}`, 362, 39);
    } else {
      text(`${destroyer.scores}`, 375, 39);
    }

    if (destroyer.scores > lvlScores) {
      this.difficultyLevel++;
    }
  }

  keyPressed() {
    if (keyCode === 13) {
      this.start = true;
      this.backgroundSound.loop();
    }

    if (keyCode === 77 && this.end) {
      window.location.reload();
    }

    if (keyCode === 32) {
        this.destroyer.fireBullet();
        this.shootingSound.play();
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