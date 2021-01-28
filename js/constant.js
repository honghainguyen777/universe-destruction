const HEIGHT = window.innerHeight*0.95;
const WIDTH = HEIGHT*0.75;
// const HEIGHT = 1112;
// const WIDTH = 834;
const BASED_SCORE = 20; // default 20
const BOSS_GET_SHOT = 50 // default 50
const BOSS_LEVEL = 4 // default 4

// Enemy starship
  // when starships appear alternatively in seconds - depend on level (multiply)
const STARSHIP_DURATION = 3; // default 2-3s
// maximum number of starships appear at a time
const STARSHIP_MAX = 4;

// Enemy planet
// when planets appear alternatively in seconds - depend on level (multiply)
const PLANET_DURATION = 5;
// maximum number of planets appear at a time
const PLANET_MAX = 4;

// when stars appear alternatively in seconds - depend on level (multiply)
const STAR_DURATION = 8;
// maximum number of stars appear at a time
const STAR_MAX = 1;

// difficulty
const DIFFICULTY = 1 // default 1
// screen ratio
const RATIO = WIDTH/834;
// const WIDTH = 700;
// const HEIGHT = 900;