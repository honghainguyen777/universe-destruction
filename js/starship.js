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

}