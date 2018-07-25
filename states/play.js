let player;
let keys;

let score;
let scoreText;
let lives;
let livesText;

let bones;
let boneSpawnDelay;

let bombs;
let bombSpawnDelay;

let camera;
let cameraRotation;
let cameraSpinning;

let rotation = 0;
let spinStarted = false;


const isValid = character => {
  const code = character.charCodeAt(0)

  const capital = code >= 65 && code <= 90;
  const lower = code >= 97 && code <= 122;
  const space = code === 32;
  const dash = code === 45;
  return capital || lower || space || dash;
}

const and = (a, b) => a && b

const isStringValid = str => {
  return str.split("").map(isValid)
    .reduce(and)
}

alert("Welcome to the Doge game - based on Elias's game and modified by Ben Cao")
const gotName = () => {
  const askname = prompt ("The doge is asking for your name. Please enter it below.")
  if (askname === null || askname === "" || !isStringValid(askname)) {
    alert("The doge thinks that is not a valid name.")
    return gotName();
  } else {
    const makesure = confirm("Are you sure? Press cancel to rename or ok to proceed.");
    if (makesure === false) {
      return gotName();
    } else {
      return askname;
    }
  }
}

const askname = gotName();

    
 


export default class Play {
  scoreChanged() {
    console.log(`The score is ${score}`)
    if (score % 10 === 0) {
      cameraSpinning = false;
      this.sound.pauseAll()
    } else if (score % 5 === 0) {
      cameraSpinning = true; 
      cameraRotation = 0
      this.physics.pause();
      this.sound.play("spin", {
        loop: true
      })
        this.time.addEvent({
          delay: 100,
          callback: () => {
            this.physics.resume();
          }
        })
    }
  }
  preload() {
    this.load.image("skull", "img/skull.png");
    this.load.image("bone", "img/bone.png");
    this.load.image("bomb", "img/bomb.png");

    this.load.audio("coin", "audio/coin.mp3");
    this.load.audio("scream", "audio/scream.mp3");
    this.load.audio("spin", "audio/spin.mp3");
  }
  init() {
    score = 0;
    lives = 3;
    boneSpawnDelay = 1000;
    bombSpawnDelay = 350;

    cameraSpinning = false;
    cameraRotation = Math.PI;
    
  }
  create() {
    const G = this.add.graphics();
    G.fillStyle(0xeaeaea);
    G.fillRect(0, 0, 400, 400);

    camera = this.cameras.main;

    scoreText = this.add.text(300, 10, "Score: " + score.toString().padStart(3, "0"), {
      color: "#0c0221",
      fontFamily: "Helvetica"
    });

    livesText = this.add.text(30, 10, "Lives: " + lives.toString(), {
      color: "#0c0221",
      fontFamily: "Helvetica"
    });

    player = this.physics.add.sprite(200, 350, "skull");
    player.setScale(0.08);
    player.setCollideWorldBounds(true);
    player.setMaxVelocity(600);


    keys = this.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      Left: Phaser.Input.Keyboard.KeyCodes.LEFT,

      D: Phaser.Input.Keyboard.KeyCodes.D,
      Right: Phaser.Input.Keyboard.KeyCodes.RIGHT,

      W: Phaser.Input.Keyboard.KeyCodes.W,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    bones = this.physics.add.group();
    bones.defaultKey = "bone";

    const spawnBone = () => {
      const bone = bones.create(Math.random() * 380 + 10, 50);
      bone.setGravityY(100);
      bone.setScale(0.085);
      if (boneSpawnDelay > 400) {
        boneSpawnDelay--;
      }
      this.time.addEvent({
        delay: boneSpawnDelay,
        callback: spawnBone
      });
    };
    this.time.addEvent({
      delay: boneSpawnDelay,
      callback: spawnBone
    });

    bombs = this.physics.add.group();
    bombs.defaultKey = "bomb";

    const spawnBomb = () => {
      const bomb = bombs.create(Math.random() * 380 + 10, 50);
      bomb.setScale(0.1)
      bombSpawnDelay-=0.5;
      bomb.setGravityY(100);
      this.time.addEvent({
        delay: bombSpawnDelay,
        callback: spawnBomb
      });
    };
    this.time.addEvent({
      delay: bombSpawnDelay,
      callback: spawnBomb
    });

    this.spinSong = this.sound.add("spin")
  }
  update() {
    
    /*
    if (cameraSpinning && !this.spinSong.isPlaying) {
      this.spinSong.play()
    } else {
      this.spinSong.pause()
    }
    */

    const initSpeed = 520;


    if (keys.A.isDown || keys.Left.isDown) {
      player.setVelocityX(-initSpeed);
    } else if (keys.D.isDown || keys.Right.isDown) {
      if (player.body.velocity.x === 0) {
        player.setVelocityX(initSpeed);
      }
    } else {
      player.setVelocityX(0);
    }   

    this.physics.overlap(player, bones, (player, bone) => {
      // This code is run whenever the player hits a bone
      bone.destroy();
      score +=1
      this.scoreChanged();
      scoreText.setText("Score: " + score.toString().padStart(3, "0"));
      this.sound.play("coin");
    });

    this.physics.overlap(bombs, bones, (bomb, bone) => {
      bomb.destroy();
    });

    if (cameraSpinning) {
      cameraRotation += 0.006
      camera.rotation = cameraRotation
    } else {
      camera.rotation = 0;
    }

    for (let bone of bones.getChildren()) {
      if (bone.y > 405) {
        bone.destroy();
        lives -= 1
        livesText.setText("Lives: " + lives.toString())
        return
        
      }
    }

    if (lives === 0) {
      this.sound.play("scream");
      this.scene.start("gameover")
      this.sound.pauseAll()
      return;
    }

    this.physics.overlap(player, bombs, (player, bomb) => {
      // This code is run whenever the game ends
      this.sound.play("scream");
      this.scene.start("gameover")
      this.sound.pauseAll()
      
    });

    for (let bomb of bombs.getChildren()) {
      if (bomb.y > 405) {
        bomb.destroy();
      }
    }
  }
};

export const getScore = () => score;

export const getName = () => askname;