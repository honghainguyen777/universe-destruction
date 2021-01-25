class Destroyer {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.image;
        this.imageUpgraded;
        this.sizeX = 50;
        this.sizeY = 50;
    }

    preload() {
        this.image = loadImage('assets/spaceships/spaceship_weed1.png');
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