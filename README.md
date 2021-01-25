# Universe Destruction

## Introduction to Universe Destruction
One day, in this vast universe, a strong force appears to destroy the interstellar federation. The Federation are trying their best to protect their civilizations from extinction in the whole universe. YOU with your BEST FRIEND or alone will control your own spaceship which can travel millions of light-years with a blink of an eye. The spaceship is named after its creation name, Weed, the Destroyer. Weed, the Destroyer is an ultimately advanced spaceship. It can make a planet vaporize in a few shots, a big star collapse, and turn into a black hole in a few seconds of continuous shooting mode.  YOU are, fortunately, not part of the federation alliance. YOU ARE THEIR BIGGEST ENEMY OF ALL TIME.

## Weed, the Destroyer - features 
- A continuous shooting gun
- Kill alliance spaceship in one shot
- Explose a planet in 3 shots
- Collapse a star in 6 shots
- Upon receiving an upgrade gun package, two more guns installed for 10s, collect maintaining package to increase using time of the extra gun
- If a distinction package collected, a random vast extinction feature provided in a short time. Features: Laser gun (3 lines for 5 seconds), blackhole gun (3 blackholes at once, large affected areas), or even instant extinction.

## Starship and Alliances - features
- A continuous shooting gun
- 12 shots to kill Weed, the Destroyer
- Planets and stars as alliances
- Planet: 3 hits (1 hit = 4 shots) to kill Weed, the Destroyer
- Star: 1 hit to destruct Weed, the Destroyer

## Extra features
- Multiple players (max. 2)
- Keyboard keys for first player: arrow -up, -down, -left, -right and left-mouse-click (or P) for shooting, O for using distinction package
- Keyboard keys for second player: W-up, S-down, A-left, D-right, space-shooting, and R for using distinction package
- Score killing count: 1-starship, 3-planet, 6-star
- Upgrade gun package: every 20-30s (if the package existed, +10s using)
- Maintaining package: +10s using upgraded gun
- Distinction package: laser gun (uncommon - every 20-40s), blackhole gun (rare every 40-60s), instant extinction (very rare, 60-120s)

## Order of coding priority (MVP approach)
### Step 1: Basic functionalities (Minimal version)
- 1 Weed, the Destroyer (moving, shooting) - class Destroyer
- Alliance starships (vertical moving and shooting) - class Starship
- Game class
- Starships disappeared upon shooted
- Gameover when the Destroyer get destroyed by starships
- Scoring
- Movement speed of starship and time to appear when the destroyer killed 50, 200, 500, 1000 starships

### Step 2: Extra feature 1
- Explosion feature upon killed or destructed - Class explosion based on size of objects
- Background moving
- Add planets into game (just moving vertically) - Class Planet
- Upon getting 3 shots -> disappear
- Add stars (bigger size than planet) into game (just moving vertically) - Class Star
- Upon getting 6 shots -> disappear
- Upgrade and maintaining gun packages - class Gun

### Step 3: Extra feature 2
- Add laser gun and blackhole gun into Gun class
- Add instant extinction feature - kill all starships, planets, stars on the screen
- Add second player
- Star turned into Blackhole