class Boss {
    constructor(image, imageBullet, noGetShotsBoss, bulletsPerTime, bossLevel) {
        this.sizeX = width/3;
        this.sizeY = width/3;
        this.x = (Math.random() * (WIDTH - this.sizeX));
        this.y = -width/3;
        this.image = image;
        this.imageBullet = imageBullet;
        // this.difficultyLevel = difficultyLevel;
        this.noGetShotsBoss = noGetShotsBoss;
        this.shots = 0;
        this.bullets = [];
        this.bulletSizeX = 10*RATIO;
        this.bulletSizeY = 50*RATIO;
        this.bulletsPerTime = bulletsPerTime;
        this.bossLevel = bossLevel;
        // 0 right, 1 left
        this.direction = 0;
        this.start = false;
    }
    draw() {
        this.y = constrain(this.y, -width/3, 100*RATIO)
        this.y+= 3*RATIO;
        if (this.direction === 0) {
            this.x+= this.bossLevel*RATIO;
        } else {
            this.x-= this.bossLevel*RATIO;
        }
        if (this.x <= 5) {
            this.direction = 0;
        } else if (this.x > width-this.sizeX+5) {
            this.direction = 1;
        }
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);
    }

    fireBullet() {
        let rand = Math.floor(Math.random() * this.sizeX)
        let bullet = {x: this.x + rand, y: this.y + this.sizeY}
        this.bullets.push(bullet);
    }

    firesGeneration() {
        this.bulletGen = setInterval(() => {
            // start the generator when game started, but only when game start, bullets generated
            // when pressed ENTER
            if (this.start) {
                let n = 0;
                while(n < this.bulletsPerTime) {
                    this.fireBullet();
                    n++;
                }
            }
        }, 6000/this.bossLevel)
    }

    multipleFires(destroyerInfor) {
        if (this.bullets.length > 0) {
            this.bullets = this.bullets.filter((bullet, index) => {
                image(this.imageBullet, bullet.x, bullet.y, this.bulletSizeX, this.bulletSizeY);
                let bulletX = bullet.x + this.bulletSizeX/2;
                let bulletY = bullet.y + this.bulletSizeY/2;
                let destroyerX = destroyerInfor.posX + destroyerInfor.sizeX/2;
                let destroyerY = destroyerInfor.posY + destroyerInfor.sizeY/2
                let distance = dist(bulletX, bulletY, destroyerX, destroyerY);
                if (bullet.y > height) {
                    return false;
                } else if (distance < destroyerInfor.sizeY/2 + this.bulletSizeY/2) {
                    destroyerInfor.shield -= 5;
                    return false;
                } else {
                    bullet.y += 2*this.bossLevel*RATIO;
                    return true;
                }
            })
        }
    }

    getShot(destroyerInfo) {
        let bossX = this.x + this.sizeX/2;
        let bossY = this.y + this.sizeY/2;   
        let hit = false;
        destroyerInfo.bullets.forEach((bullet, index) => {
            if (dist(bossX, bossY, bullet.x, bullet.y) <= this.sizeY/2) {
                this.shots += 1;
                destroyerInfo.scores += 1;
                destroyerInfo.bullets.splice(index, 1);
                hit = true;
            }
        });
        return hit;
    }

    getHit(destroyerInfo) {
        let bossX = this.x + this.sizeX/2;
        let bossY = this.y + this.sizeY/2;  
        // get the head position of the destroyer
        let destroyerX = destroyerInfo.posX + destroyerInfo.sizeX/2;
        let destroyerY = destroyerInfo.posY;
        let distance = dist(bossX, bossY, destroyerX, destroyerY);
        if ((distance <= this.sizeY/2 + destroyerInfo.sizeY && destroyerInfo.posY < this.y) || (distance <= this.sizeY/2)) {
            destroyerInfo.shield -= 100;
            return true;
        } else {
            return false;
        }
    }
}