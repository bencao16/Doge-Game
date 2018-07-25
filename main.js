// Load the game states
import intro from "./states/intro.js";
import play from "./states/play.js";
import gameover from "./states/gameover.js";
import instructions from "./states/instructions.js";

// Create the game configuration
const config = {
  pixelArt: true,
  width: 400,
  height: 400,
  physics: {
    default: "arcade"
  }
};

// Create the game
const game = new Phaser.Game(config);

// Add each scene
game.scene.add("intro", intro);
game.scene.add("main", play);
game.scene.add("gameover", gameover);
game.scene.add("instructions", instructions);

// Start the intro scene
game.scene.start("intro");
