class UniverseObject {
    constructor(image, difficultyLevel, sizeX, sizeY, numberOfShot) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.x = (Math.random() * (WIDTH - this.sizeX));
        this.y = 0;
        this.image = image;
        this.difficultyLevel = difficultyLevel*RATIO;
        this.numberOfShot = numberOfShot;
        this.step = 0;
        this.shots = 0;

    }
    draw() {
        this.y += this.difficultyLevel;
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);
        // this.rotateDraw(this.x, this.y, this.sizeX, this.sizeY, 50);
        // this.step+=10;
        // imageMode(CENTER);

        // image(this.image, this.x, this.y, this.sizeX, this.sizeY);
        // imageMode(CORNER);
    }

    // rotateDraw(x, y, widthImg, heightImg, imgAngle){
    //     imageMode(CENTER);
    //     translate(x+widthImg/2, y+heightImg/2);
    //     rotate(PI/180*this.step);
    //     image(this.image, 0, 0, widthImg, heightImg);
    //     rotate(-PI / 180 * imgAngle);
    //     translate(-(x+widthImg/2), -(y+heightImg/2));
    //     imageMode(CORNER);
    //   }

    getShot(destroyerInfo) {
        let objX = this.x + this.sizeX/2;
        let objY = this.y + this.sizeY/2;   
        let hit = false;
        destroyerInfo.bullets.forEach((bullet, index) => {
            if (dist(objX, objY, bullet.x, bullet.y) <= this.sizeY/2) {
                // game.destroyer.scores += 3;
                destroyerInfo.bullets.splice(index, 1);
                hit = true;
            }
        });
        return hit;
    }

    getHit(destroyerInfo) {
        let objX = this.x + this.sizeX/2;
        let objY = this.y + this.sizeY/2;  
        // get the head position of the destroyer
        let destroyerX = destroyerInfo.posX + destroyerInfo.sizeX/2;
        let destroyerY = destroyerInfo.posY;
        let distance = dist(objX, objY, destroyerX, destroyerY);
        if ((distance <= this.sizeY/2 + destroyerInfo.sizeY && destroyerInfo.posY < this.y) || (distance <= this.sizeY/2)) {
            game.destroyer.shield -= 20;
            return true;
        } else {
            return false;
        }
    }
}