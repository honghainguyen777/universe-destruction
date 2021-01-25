class Starship {
    constructor(image) {
        this.sizeX = 50;
        this.sizeY = 50;
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
        let starShipY = this.y + this.sizeY/2;
        let hit = false;
        destroyerInfo.bullets.forEach((bullet, index) => {
            if (dist(starshipX, starShipY, bullet.x, bullet.y) <= this.sizeY/2) {
                game.destroyer.scores += 1;
                destroyerInfo.bullets.splice(index, 1);
                hit = true;
            }
        });
        return hit;
    }

}