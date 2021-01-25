class Game {
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