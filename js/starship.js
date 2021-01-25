class Starship {
    constructor(image) {
        this.sizeX = 60;
        this.sizeY = 60;
        this.x = (Math.random() * (WIDTH - this.sizeX));
        this.y = 0;
        this.image = image;
    }

    draw() {
        this.y++;
        image(this.image, this.x, this.y, this.sizeX, this.sizeY);
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