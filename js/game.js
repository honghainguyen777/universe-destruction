class Game {

  constructor() {
    this.starships = [];
    // when starship appear alternatively in seconds - depend on level - interval
    // change later 
    this.durationStarship = 3;
    // number of starships appear at a time
    this.maxStarshipsApprear = 4;
    // the SetInterval
    this.interval;
    this.starshipImg;
    // keep track of the first appearance with no overlapping
    this.objectTrack = [];
  }

  // starships generator -> can use to generate planet and stars
  starshipGen() {
    this.interval = setInterval(() => {
      let n = Math.floor(Math.random() * this.maxStarshipsApprear) + 1;
      let noStarships = 0;
      while(noStarships < n) {
        let starship = new Starship(this.starshipImg);
        if (!this.objectTrack.includes(starship.x)) {
          this.starships.push(starship);
          this.objectTrack.push(starship.x);
          noStarships++;
        }
      }
      // for (let i=0; i<n; i++) {

      //   this.starships.push(new Starship(this.starshipImg));
      // }
      this.objectTrack = []
    }, this.durationStarship * 1000);
  }

  drawStarship() {
    if (this.starships.length) {
      this.starships.forEach(starship => {
        starship.draw();
      })
    }
  }

  preload() {
    this.starshipImg = loadImage('assets/spaceships/spaceship_starship.png');
  }



  drawGrid() {
      // Iteration 1
      // Draw the grid
      // https://p5js.org/reference/#/p5/line
      let step = 0;
      // width equals height
      while(step < WIDTH+1) {
        // horizontal lines
        line(0, step, WIDTH, step);
        // vertical lines
        line(step, 0 , step, WIDTH);
        step += 100;
      }
    }
}