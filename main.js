import intro from "./states/intro.js";
import play from "./states/play.js";
import gameover from "./states/gameover.js";

const config = {
    pixelArt: true,
    width: 400,
    height: 400,
    physics: {
        default: "arcade",
    },
};

const game = new Phaser.Game(config);

game.scene.add("intro", intro);
game.scene.add("main", play);
game.scene.add("gameover", gameover);

game.scene.start("intro");
