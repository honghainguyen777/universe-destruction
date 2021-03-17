class Destroyer {
  constructor(posX, posY, imageDestroyer, imageBullet) {
    this.posX = posX;
    this.posY = posY;
    this.image = imageDestroyer;
    this.imageUpgraded;
    this.imageBullet = imageBullet;
    this.sizeX = 112 * RATIO;
    this.sizeY = 75 * RATIO;
    this.bullets = [];
    this.bulletSizeX = 7 * RATIO;
    this.bulletSizeY = 30 * RATIO;
    this.scores = 0;
    this.shield = 100;
  }

  draw() {
    this.posX = constrain(this.posX, 0, width - this.sizeX);
    this.posY = constrain(this.posY, 0, height - this.sizeY);
    image(this.image, this.posX, this.posY, this.sizeX, this.sizeY);
    if (keyIsDown(LEFT_ARROW)) {
      this.posX -= 5 * RATIO;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.posX += 5 * RATIO;
    }

    if (keyIsDown(UP_ARROW)) {
      this.posY -= 5 * RATIO;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.posY += 5 * RATIO;
    }
  }

  fireBullet() {
    let bullet = {
      x: this.posX + this.sizeX / 2 - this.bulletSizeX / 2,
      y: this.posY,
    };
    this.bullets.push(bullet);
  }

  multipleFires() {
    if (this.bullets.length > 0) {
      let clonedBullets = this.bullets.slice();
      clonedBullets.forEach((bullet, index) => {
        image(
          this.imageBullet,
          bullet.x,
          bullet.y,
          this.bulletSizeX,
          this.bulletSizeY
        );
        bullet.y -= 15 * RATIO;
        if (bullet.y < 0) {
          this.bullets.splice(index, 1);
        }
      });
    }
  }

  isLost() {
    if (this.shield < 0) {
      return true;
    }
    return false;
  }

  moveUp() {
    this.posY -= 10 * RATIO;
  }
  moveDown() {
    this.posY += 10 * RATIO;
  }
  moveLeft() {
    this.posX -= 10 * RATIO;
  }
  moveRight() {
    this.posX += 10 * RATIO;
  }
}
