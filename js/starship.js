class Starship {
    constructor(image, difficultyLevel, imageBullet) {
        this.sizeX = 60;
        this.sizeY = 60;
        this.x = (Math.random() * (WIDTH - this.sizeX));
        this.y = 0;
        this.image = image;
        this.imageBullet = imageBullet;
        this.difficultyLevel = difficultyLevel;
        this.bullets = [];
        this.bulletSizeX = 6;
        this.bulletSizeY = 20;
        // time interval each starship can fire
        this.interval = Math.floor(Math.random() * 3) + 1
        // each of them can only fire 3 times
        this.firesMax = 2;
        this.fires = 0;
    }

    draw() {
        this.y += this.difficultyLevel;
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);        
    }

    fireBullet() {
        if (this.fires < this.firesMax) {
            let bullet = {x: this.x + this.sizeX/2, y: this.y + this.sizeY}
            this.bullets.push(bullet);
            this.fires++;
        } else {
            clearInterval(this.fireGen);
        }
    }

    // generate bullets for each starships - later change time of generation
    firesGeneration() {
        this.fireGen = setInterval(() => {
            this.fireBullet();
        }, (this.interval+1)*1000)
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
                    //&& bullet.posY + bullet.bulletSizeY === destroyerInfor.posY
                } else if (distance < destroyerInfor.sizeY/2 + this.bulletSizeY/2) {
                    destroyerInfor.shield -= 5;
                    return false;
                } else {
                    // bullet flies twice as much as speed of the starship
                    bullet.y += 2*this.difficultyLevel
                    return true;
                }
            })

            // let clonedBullets = this.bullets.slice();
            // clonedBullets.forEach((bullet, index) => {
            //     image(this.imageBullet, bullet.x, bullet.y, this.bulletSizeX, this.bulletSizeY);
            //     bullet.y -= 15;
            //     if (bullet.y < 0) {
            //         this.bullets.splice(index, 1);
            //     }
            // })
        }
    }

    getShot(destroyerInfo) {
        let starshipX = this.x + this.sizeX/2;
        let starshipY = this.y + this.sizeY/2;   
        let hit = false;
        destroyerInfo.bullets.forEach((bullet, index) => {
            if (dist(starshipX, starshipY, bullet.x, bullet.y) <= this.sizeY/2) {
                game.destroyer.scores += 1;
                destroyerInfo.bullets.splice(index, 1);
                hit = true;
            }
        });
        return hit;
    }

    getHit(destroyerInfo) {
        let starshipX = this.x + this.sizeX/2;
        let starshipY = this.y + this.sizeY/2;
        // get the head position of the destroyer
        let destroyerX = destroyerInfo.posX + destroyerInfo.sizeX/2;
        let destroyerY = destroyerInfo.posY;
        let distance = dist(starshipX, starshipY, destroyerX, destroyerY);
        if ((distance <= this.sizeY/2 + destroyerInfo.sizeY && destroyerInfo.posY < this.y) || (distance <= this.sizeY/2)) {
            game.destroyer.shield -= 10;
            return true;
        } else {
            return false;
        }
    }
}