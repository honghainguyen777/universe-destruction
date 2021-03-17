class Game {
  constructor() {
    this.start = false;
    this.end = false;
    this.win = false;
    this.bossLevel = BOSS_LEVEL;
    this.level = 1;
    this.noGetShotsBoss = BOSS_GET_SHOT;
    this.buttonE;
    this.buttonM;
    this.buttonH;
  }

  setup() {
    this.destroyer = new Destroyer(
      WIDTH / 2 - 50,
      HEIGHT - 100,
      this.imageDestroyer1,
      this.imageBullet1
    );
    this.boss = new Boss(
      this.bossImg,
      this.starshipBullet,
      this.noGetShotsBoss,
      5,
      this.bossLevel
    );

    this.starships = [];
    this.planets = [];
    this.stars = [];
    this.objectTrack = [];
    this.durationStarship = STARSHIP_DURATION;
    this.maxStarshipsApprear = STARSHIP_MAX;
    this.durationPlanets = PLANET_DURATION;
    this.maxPlanetsAppear = PLANET_MAX;
    this.durationStars = STAR_DURATION;
    this.maxStarsAppear = STAR_MAX;
    this.difficulty = DIFFICULTY;
    this.soundOn = true;
    this.setupDifficulty();
  }

  preload() {
    this.shield = loadImage("assets/spaceships/shield.png");
    this.backgroundImage = loadImage("assets/background/space1.png");
    this.starshipImg = loadImage("assets/spaceships/starship.png");
    this.imageDestroyer1 = loadImage("assets/spaceships/destroyer1.png");
    // this.imageDestroyer2 = loadImage('assets/spaceships/destroyer2.png');
    this.imageBullet1 = loadImage("assets/lasers/laserBlue.png");
    // this.imageBullet2 = loadImage('assets/lasers/laserGreen.png');
    this.starshipBullet = loadImage("assets/lasers/laserRed.png");
    this.bossImg = loadImage("assets/objects/poop.gif");
    this.explosionImg = loadImage("assets/spaceships/explosionImg.png");
    this.planetImages = [
      loadImage("assets/objects/earth.png"),
      loadImage("assets/objects/jupiter.png"),
      loadImage("assets/objects/strainge.png"),
    ];
    this.starImages = [
      loadImage("assets/objects/blueStar.jpg"),
      loadImage("assets/objects/whiteStar.png"),
      loadImage("assets/objects/orangeStar.png"),
    ];
    this.start1 = loadImage("assets/startImg/travel.gif");
    this.instr = loadImage("assets/instruction/instruct.png");
    this.youLose = loadImage("assets/endImgs/youLose.gif");
    this.youLoseBgr = loadImage("assets/endImgs/youLostBgr.gif");
    this.youWon = loadImage("assets/endImgs/youWon.gif");
    this.shootingSound = loadSound("assets/musics/shootingSound.ogg");
    this.backgroundSound = loadSound("assets/musics/background.mp3");
    this.victory = loadSound("assets/musics/victory.mp3");
    this.gameoverSound = loadSound("assets/musics/gameover.mp3");
    this.explosionSound1 = loadSound("assets/musics/explosion1.mp3");
    this.explosionSound2 = loadSound("assets/musics/explosion2.mp3");
    this.shieldDownSound = loadSound("assets/musics/shieldDown.ogg");
    this.shieldUpSound = loadSound("assets/musics/shieldUp.ogg");
    this.explosionSound1.setVolume(0.2);
    this.gameoverSound.setVolume(0.5);
    this.victory.setVolume(0.5);
    this.backgroundSound.setVolume(0.3);
    this.explosionSound2.setVolume(0.35);
  }

  draw() {
    this.soundControl();
    if (!this.start) {
      if (!this.end) {
        this.preStart();
      } else {
        if (this.win) {
          this.winGame();
        } else {
          this.endGame();
        }
      }
    } else {
      this.destroyer.draw();
      this.destroyer.multipleFires();
      this.shieldStatus(this.destroyer);
      this.levelUp(this.destroyer);
      if (this.destroyer.shield < 0) {
        this.backgroundSound.stop();
        this.gameoverSound.play();
        this.end = true;
        this.start = false;
      }

      if (this.level < this.bossLevel) {
        this.drawStarship();
        this.drawPlanet();
        // this.drawObj(this.stars)
        this.drawStar();

        this.starships = this.starships.filter((starship) => {
          if (starship.getShot(this.destroyer)) {
            image(
              this.explosionImg,
              starship.x,
              starship.y,
              starship.sizeX + 5 * RATIO,
              starship.sizeY + 5 * RATIO
            );
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
            image(
              this.explosionImg,
              starship.x,
              starship.y,
              starship.sizeX + 5 * RATIO,
              starship.sizeY + 5 * RATIO
            );
            this.explosionSound1.play();
            this.shieldDownSound.play();
            return false;
          }
          // too heavy task to load when using explosion effects here
          starship.multipleFires(this.destroyer);
          return true;
        });

        this.planets = this.planets.filter((planet) => {
          if (planet.getShot(this.destroyer)) {
            image(
              this.explosionImg,
              planet.x + planet.sizeX / 2,
              planet.y + planet.sizeY / 2,
              planet.sizeX / 2,
              planet.sizeY / 2
            );
            planet.shots++;
            this.explosionSound1.play();
            if (planet.shots === 3) {
              this.destroyer.scores += 3;
              image(
                this.explosionImg,
                planet.x,
                planet.y,
                planet.sizeX + 80 * RATIO,
                planet.sizeY + 80 * RATIO
              );
              this.explosionSound2.play();
              return false;
            }
          }
          if (planet.getHit(this.destroyer)) {
            image(
              this.explosionImg,
              planet.x,
              planet.y,
              planet.sizeX + 80 * RATIO,
              planet.sizeY + 80 * RATIO
            );
            this.explosionSound2.play();
            this.shieldDownSound.play();
            return false;
          }

          if (planet.y > height + planet.sizeY) {
            this.destroyer.shield -= 5;
            this.shieldDownSound.play();
            return false;
          }
          return true;
        });

        // if (this.stars.length) {
        //   this.stars = this.eventObj(this.stars, 5, 120);
        // }
        // this.stars = this.eventObj(this.stars, 5, 120);
        // this.eventObj(this.stars, 5, 120);

        this.stars = this.stars.filter((obj) => {
          if (obj.getShot(this.destroyer)) {
            image(
              this.explosionImg,
              obj.x + obj.sizeX / 2,
              obj.y + obj.sizeY / 2,
              obj.sizeX / 2,
              obj.sizeY / 2
            );
            obj.shots++;
            this.explosionSound1.play();
            if (obj.shots === obj.numberOfShot) {
              this.destroyer.scores += 10;
              image(
                this.explosionImg,
                obj.x,
                obj.y,
                obj.sizeX + 120 * RATIO,
                obj.sizeY + 120 * RATIO
              );
              this.explosionSound2.play();
              return false;
            }
          }
          if (obj.getHit(this.destroyer)) {
            image(
              this.explosionImg,
              obj.x,
              obj.y,
              obj.sizeX + 120 * RATIO,
              obj.sizeY + 120 * RATIO
            );
            this.explosionSound2.play();
            this.shieldDownSound.play();
            return false;
          }

          if (obj.y > height + obj.sizeY) {
            this.destroyer.shield -= 8;
            this.shieldDownSound.play();
            return false;
          }
          return true;
        });
      } else {
        // boss appear, start bullet generator
        this.boss.start = true;
        this.boss.draw();
        clearInterval(this.interval);
        clearInterval(this.intervalPlanetGen);
        clearInterval(this.intervalObjGen);
        if (this.starships.length) {
          this.starships.forEach((starship) => {
            image(
              this.explosionImg,
              starship.x,
              starship.y,
              starship.sizeX + 5 * RATIO,
              starship.sizeY + 5 * RATIO
            );
            this.explosionSound1.play();
          });
          this.starships = [];
        }
        if (this.planets.length) {
          this.planets.forEach((planet) => {
            image(
              this.explosionImg,
              planet.x,
              planet.y,
              planet.sizeX + 80 * RATIO,
              planet.sizeY + 80 * RATIO
            );
            this.explosionSound2.play();
          });
          this.planets = [];
        }
        if (this.stars.length) {
          this.stars.forEach((star) => {
            image(
              this.explosionImg,
              star.x,
              star.y,
              star.sizeX + 120 * RATIO,
              star.sizeY + 120 * RATIO
            );
            this.explosionSound2.play();
          });
          this.stars = [];
        }

        if (this.boss.getShot(this.destroyer)) {
          image(
            this.explosionImg,
            this.boss.x,
            this.boss.y,
            this.boss.sizeX,
            this.boss.sizeY
          );
          this.explosionSound1.play();
          if (this.boss.shots > this.boss.noGetShotsBoss) {
            image(
              this.explosionImg,
              50 * RATIO,
              50 * RATIO,
              width - 100 * RATIO,
              width - 100 * RATIO
            );
            this.victory.play();
            this.end = true;
            this.start = false;
            this.win = true;
          }
        }

        if (this.boss.getHit(this.destroyer)) {
          image(
            this.explosionImg,
            this.boss.x,
            this.boss.y,
            this.boss.sizeX + 5 * RATIO,
            this.boss.sizeY + 5 * RATIO
          );
          this.explosionSound1.play();
          this.shieldDownSound.play();
        }
        this.boss.multipleFires(this.destroyer);
        this.bossHealth(this.boss);
      }
    }
  }

  // starships generator -> can use to generate planet and stars
  // once a starship generated, it starts fire its three bullets
  starshipGen() {
    this.interval = setInterval(() => {
      if (this.start) {
        let n = Math.floor(Math.random() * (this.maxStarshipsApprear + 1));
        let noStarships = 0;
        while (noStarships < n) {
          let starship = new Starship(
            this.starshipImg,
            this.level * this.difficulty,
            this.starshipBullet
          );
          if (!this.objectTrack.includes(starship.x)) {
            starship.firesGeneration();
            this.starships.push(starship);
            this.objectTrack.push(starship.x);
            noStarships++;
          }
        }
        this.objectTrack = [];
      }
    }, this.durationStarship * 1000);
  }

  // draw all starship based on their current positions
  drawStarship() {
    if (this.starships.length) {
      this.starships.forEach((starship) => {
        starship.draw();
      });
    }
  }

  planetGen() {
    this.intervalPlanetGen = setInterval(() => {
      if (this.start) {
        let n = Math.floor(Math.random() * (this.maxPlanetsAppear + 1));
        let noPlanets = 0;
        while (noPlanets < n) {
          let img = this.planetImages[
            Math.floor(Math.random() * this.planetImages.length)
          ];
          this.planets.push(new Planet(img, this.level * this.difficulty));
          noPlanets++;
        }
      }
    }, this.durationPlanets * 1000);
  }

  drawPlanet() {
    if (this.planets.length) {
      this.planets.forEach((planet) => {
        planet.draw();
      });
    }
  }

  starGen() {
    this.intervalObjGen = setInterval(() => {
      if (this.start) {
        let n = Math.floor(Math.random() * (this.maxStarsAppear + 1));
        let noObj = 0;
        while (noObj < n) {
          let img = this.starImages[
            Math.floor(Math.random() * this.starImages.length)
          ];
          this.stars.push(
            new UniverseObject(
              img,
              this.level * this.difficulty,
              110 * RATIO,
              110 * RATIO,
              8
            )
          );
          noObj++;
        }
      }
    }, this.durationStars * 1000);
  }

  drawStar() {
    if (this.stars.length) {
      this.stars.forEach((obj) => {
        obj.draw();
      });
    }
  }

  // objGen(objects, images, maxAppear, duration) {
  //   console.log("reun");
  //   this.intervalObjGen = setInterval(() => {
  //     if (this.start) {
  //       let n = Math.floor(Math.random() * (maxAppear + 1));
  //       let noObj = 0;
  //       while(noObj < n) {
  //         let img = images[Math.floor(Math.random() * images.length)];
  //         objects.push(new UniverseObject(img, this.level, 110, 110, 5));
  //         noObj++;
  //       }
  //     }
  //   }, duration*1000)
  // }

  // drawObj(objects) {
  //   if (objects.length) {
  //     objects.forEach(obj => {
  //       obj.draw();
  //     })
  //   }
  // }

  // eventObj(objects, points, extendedExpImgSize) {
  //   // console.log("1: " + objects.length);
  //   // this.stars = objects.filter(obj => {
  //   let newObjects = objects.filter(obj => {
  //     if (obj.getShot(this.destroyer)) {
  //       image(this.explosionImg, obj.x+obj.sizeX/2, obj.y+obj.sizeY/2, obj.sizeX/2, obj.sizeY/2);
  //       obj.shots++;
  //       this.explosionSound1.play();
  //       // console.log(`shots: ${obj.shots} --- max: ${obj.numberOfShot}`);
  //       if (obj.shots === obj.numberOfShot) {
  //         // console.log("True");
  //         this.destroyer.scores+=points;
  //         image(this.explosionImg, obj.x, obj.y, obj.sizeX+extendedExpImgSize, obj.sizeY+extendedExpImgSize);
  //         // big sound here
  //         return false;
  //       }
  //     }
  //     if (obj.getHit(this.destroyer)) {
  //       image(this.explosionImg, obj.x, obj.y, obj.sizeX+extendedExpImgSize, obj.sizeY+extendedExpImgSize);
  //       // big sound here
  //       this.shieldDownSound.play();
  //       return false;
  //     }

  //     if (obj.y > height + obj.sizeY) {
  //       this.destroyer.shield -=8;
  //       this.shieldDownSound.play();
  //       return false;
  //     }
  //     return true
  //   })
  //   // console.log("2: " + objects.length);
  //   // return newObjects;
  // }

  shieldStatus(destroyer) {
    image(this.shield, 10 * RATIO, 10 * RATIO, 50 * RATIO, 50 * RATIO);
    colorMode(RGB, 60);
    fill(255, 255, 255, 10);
    rect(60 * RATIO, 15 * RATIO, 120 * RATIO, 33 * RATIO);

    // turn red if shield < 40%
    if (destroyer.shield < 40) {
      fill(255, 0, 0);
    } else {
      fill(0, 143, 17);
    }

    rect(
      60 * RATIO,
      15 * RATIO,
      ((destroyer.shield * 120) / 100) * RATIO,
      33 * RATIO
    );
    fill(255, 165, 0, 100);
    textSize(28 * RATIO);
    textFont("Orbitron");
    textStyle(BOLD);
    // Center the text in the middle of the progress bar
    if (destroyer.shield === 100) {
      text(`${destroyer.shield}%`, 80 * RATIO, 41 * RATIO);
    } else if (destroyer.shield < 100 && destroyer.shield > 0) {
      text(`${destroyer.shield}%`, 95 * RATIO, 41 * RATIO);
    } else {
      text(`${destroyer.shield}%`, 105 * RATIO, 41 * RATIO);
    }
  }

  levelUp(destroyer) {
    let lvlScores = BASED_SCORE * 2 ** this.level * this.difficulty;
    textSize(28 * RATIO);
    text(`LV ${this.level}:`, 240 * RATIO, 41 * RATIO);

    fill(255, 255, 255, 10);
    rect(325 * RATIO, 15 * RATIO, 120 * RATIO, 33 * RATIO);
    colorMode(RGB, 100);
    fill(255, 166, 77);
    rect(
      325 * RATIO,
      15 * RATIO,
      ((destroyer.scores * 120) / lvlScores) * RATIO,
      33 * RATIO
    );

    colorMode(RGB, 60);
    fill(0, 128, 0);
    textSize(23 * RATIO);
    if (destroyer.scores > 999) {
      text(`${destroyer.scores}`, 352 * RATIO, 39 * RATIO);
    } else if (destroyer.scores < 1000 && destroyer.scores >= 100) {
      text(`${destroyer.scores}`, 355 * RATIO, 39 * RATIO);
    } else if (destroyer.scores < 100 && destroyer.scores >= 10) {
      text(`${destroyer.scores}`, 362 * RATIO, 39 * RATIO);
    } else {
      text(`${destroyer.scores}`, 375 * RATIO, 39 * RATIO);
    }

    if (destroyer.scores > lvlScores) {
      this.level++;
    }
  }

  bossHealth(boss) {
    let health =
      ((boss.noGetShotsBoss - boss.shots) * 120) / boss.noGetShotsBoss;
    image(
      this.bossImg,
      width - 220 * RATIO,
      10 * RATIO,
      50 * RATIO,
      50 * RATIO
    );
    colorMode(RGB, 60);
    fill(255, 255, 255, 10);
    rect(60 * RATIO, 15 * RATIO, 120 * RATIO, 33 * RATIO);

    // turn red if shield < 40%
    if (health * 100 < 40) {
      fill(255, 0, 0);
    } else {
      fill(0, 143, 17);
    }

    rect(width - 170 * RATIO, 15 * RATIO, health * RATIO, 33 * RATIO);
  }

  keyPressed() {
    if (keyCode === 13) {
      this.start = true;
      this.buttonE.remove();
      this.buttonM.remove();
      this.buttonH.remove();
      this.starshipGen();
      this.planetGen();
      this.starGen();
      this.backgroundSound.loop();
      this.boss.firesGeneration();
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
  // before starting the game
  preStart() {
    background(this.start1);
    image(
      this.imageDestroyer1,
      width / 3 - 224 * RATIO,
      height - 270 * RATIO,
      224 * RATIO,
      150 * RATIO
    );
    textStyle(BOLD);
    textFont("Potta One");
    textSize(54 * RATIO);
    textAlign(CENTER);
    text("Universe Destruction", 10, 50 * RATIO, width);

    textSize(38 * RATIO);
    fill("#00af91");
    text("PRESS ENTER KEY TO START", 10, (height * RATIO) / 5, width);

    image(
      this.instr,
      (width * 2) / 3,
      height - 270 * RATIO,
      184 * RATIO,
      150 * RATIO
    );

    textSize(32 * RATIO);
    fill("green");
    text("DIFFICULTY", 10, height / 1.4 - 40 * RATIO, width);

    // textFont('Orbitron')
    // textSize(35*RATIO);
    // fill("white");
    // text('Weed, The Destroyer', 0, height-100, width);
    // textSize(26*RATIO);
    // text("Don't feel bad when wiping all civilizations ", 0, height-50, width);
    // textAlign(LEFT)
    textFont("Orbitron");
    textSize(35 * RATIO);
    fill("white");
    text("Weed, The Destroyer", 0, height - 100 * RATIO, width);
    textSize(26 * RATIO);
    text(
      "Don't feel bad when wiping all civilizations ",
      0,
      height - 50 * RATIO,
      width
    );
    textAlign(LEFT);
  }

  endGame() {
    // gameover, Your shield is down,
    background(this.youLoseBgr);
    textFont("Potta One");
    textSize(60 * RATIO);
    textAlign(CENTER);
    text("YOU LOSE!", 0, 50, width);

    textFont("Orbitron");
    textSize(45 * RATIO);
    text(`Your scores: ${this.destroyer.scores}`, 0, 170, width);

    // Ranking list, later

    image(
      this.youLose,
      0,
      height / 2 - (width * 0.562) / 2,
      width,
      width * 0.562
    );

    textFont("Potta One");
    textSize(50 * RATIO);
    text(
      "PRESS M TO REVENGE",
      0,
      height / 2 + (width * 0.562) / 2 + 100,
      width
    );

    textFont("Orbitron");
    textSize(35 * RATIO);
    fill("white");
    text("Weed, The Destroyer", 0, height - 100 * RATIO, width);
    textSize(26 * RATIO);
    text(
      "Don't feel bad when wiping all civilizations ",
      0,
      height - 50 * RATIO,
      width
    );
    textAlign(LEFT);
  }

  // universe code --> destroy to end the game
  // specify which level to appear universe code
  winGame() {
    background(this.youLoseBgr);
    textFont("Potta One");
    textSize(60 * RATIO);
    textAlign(CENTER);
    text("Congraturation!", 0, 20, width);
    textSize(35 * RATIO);
    text("You have destroyed the entire universe!", 0, 100, width);

    textFont("Orbitron");
    textSize(45 * RATIO);
    text(
      `Your scores: ${this.destroyer.scores}`,
      0,
      height / 2 - (width * 0.562) / 2 - 60,
      width
    );

    // Ranking list, later

    image(
      this.youWon,
      0,
      height / 2 - (width * 0.562) / 2,
      width,
      width * 0.562
    );

    textFont("Potta One");
    textSize(50 * RATIO);
    text("PRESS M TO REPLAY", 0, height / 2 + (width * 0.562) / 2 + 100, width);

    textFont("Orbitron");
    textSize(35 * RATIO);
    fill("white");
    text("Weed, The Destroyer", 0, height - 100 * RATIO, width);
    textSize(26 * RATIO);
    text(
      "Don't feel bad when wiping all civilizations ",
      0,
      height - 50 * RATIO,
      width
    );
    textAlign(LEFT);
  }

  setupDifficulty() {
    // Refactor later for a specific class in css file
    this.buttonE = createButton("EASY");
    this.buttonE.parent("canvas");
    this.buttonE.style("font-size", `${25 * RATIO}px`);
    this.buttonE.style("padding", "0");
    this.buttonE.style("background-color", "green");
    this.buttonE.style("width", `${120 * RATIO}px`);
    this.buttonE.style("position", "relative");
    this.buttonE.position(width / 2 - 200 * RATIO, height / 1.4);
    this.buttonE.mousePressed(() => {
      this.difficulty = 1;
    });

    this.buttonM = createButton("MEDIUM");
    this.buttonM.parent("canvas");
    this.buttonM.style("font-size", `${25 * RATIO}px`);
    this.buttonM.style("padding", "0");
    this.buttonM.style("background-color", "green");
    this.buttonM.style("width", `${120 * RATIO}px`);
    this.buttonM.style("position", "relative");
    this.buttonM.position(width / 2 - 60 * RATIO, height / 1.4);
    this.buttonM.mousePressed(() => {
      this.difficulty = 2;
    });

    this.buttonH = createButton("HARD");
    this.buttonH.parent("canvas");
    this.buttonH.style("font-size", `${25 * RATIO}px`);
    this.buttonM.style("padding", "0");
    this.buttonH.style("background-color", "green");
    this.buttonH.style("width", `${120 * RATIO}px`);
    this.buttonH.style("position", "relative");
    this.buttonH.position(width / 2 + 80 * RATIO, height / 1.4);
    this.buttonH.mousePressed(() => {
      this.difficulty = 3;
    });
  }

  soundControl() {
    let sound = createImg(
      this.soundOn ? "assets/volume/up.png" : "assets/volume/mute.png",
      "SOUND"
    );
    sound.parent("canvas");
    sound.size(40 * RATIO, 40 * RATIO);
    sound.position(width - 50 * RATIO, 10 * RATIO);
    sound.mousePressed(() => {
      if (this.soundOn) {
        masterVolume(0);
        this.soundOn = false;
      } else {
        masterVolume(1);
        this.soundOn = true;
      }
    });
  }
}
