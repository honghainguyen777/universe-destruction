class Destroyer {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.image;
        this.imageUpgraded;
        this.imageBullet;
        this.sizeX = 70;
        this.sizeY = 60;
        this.bullets = [];
        this.bulletSizeX = 4;
        this.bulletSizeY = 20;
    }

    preload() {
        this.image = loadImage('assets/spaceships/spaceship_weed1.png');
        this.imageBullet = loadImage('assets/lasers/laserBlue.png');
    }

    draw() {
        image(this.image, this.posX, this.posY, this.sizeX, this.sizeY);
        if (keyIsDown(LEFT_ARROW)) {
            this.posX -= 5;
        }
    
        if (keyIsDown(RIGHT_ARROW)) {
            this.posX += 5;
        }
    
        if (keyIsDown(UP_ARROW)) {
            this.posY -= 5;
        }
    
        if (keyIsDown(DOWN_ARROW)) {
            this.posY += 5;
        }
    }

    fireBullet() {
        let bullet = {x: this.posX + this.sizeX/2 - this.bulletSizeX/2, y: this.posY}
        this.bullets.push(bullet);
    }

    multipleFires() {
        if (this.bullets.length > 0) {
            let clonedBullets = this.bullets.slice();
            clonedBullets.forEach((bullet, index) => {
                image(this.imageBullet, bullet.x, bullet.y, this.bulletSizeX, this.bulletSizeY);
                bullet.y -= 15;
                console.log('fire');
                if (bullet.y < 0) {
                    this.bullets.splice(index, 1);
                }
            })
        }
    }

    moveUp() {
        this.posY -= 10;
    }
    moveDown() {
        this.posY += 10;
    }
    moveLeft() {
        this.posX -= 10;
    }
    moveRight() {
        this.posX += 10;
    }
}