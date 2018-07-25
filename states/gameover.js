let keys;

import { getScore, getName } from "./play.js";



export default {
    preload() {
        this.load.image("dead", "img/dead.png");
        
    },
    create() {
        const G = this.add.graphics();
        G.fillStyle(0xEAEAEA);
        G.fillRect(0, 0, 400, 400);

        
        const dead = this.add.image(200, 200, "dead");
        dead.setScale(0.8);

        keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        });

        

        if (getScore()<10) {
         const text = this.add.text(200, 65, "The doge is disappointed in " + getName(), {    
          color: "#D92504",
          fontSize: "10px",
         }); 
         text.setOrigin(0.5)
        }
        else if (getScore()<30) {
            const better = this.add.text(200,65, `The doge thinks ${getName()} can do better`, {
          color: "#D92504",
          fontSize: "10px",   
            })
         better.setOrigin(0.5)   
        }
        else if  (getScore()>=30){
            const good = this.add.text(200, 65, "The doge is proud of " + getName(), {
                color: "#21DF0A",
                fontSize: "10px", 
            })
         good.setOrigin(0.5)    
        }
        else if (getScore()>=50) {
            const god = this.add.text(200, 65, `The doge thinks ${getName()} is a god`, {
            
                color: "#21DF0A",
                fontSize: "10px",    
            })
            god.setOrigin(0.5)
        }
                      

        
        


        const text =this.add.text(200 , 40, "Your score is " + getScore(), 
        {color: "black"})
        text.setOrigin(0.5);


        this.add.text(100, 350, "Press space to restart", {
        color: "black"})

        this.add.text(10, 375, "Press shift to go back to the intro screen", {
            color: "black",
            fontSize: "15px",

        })

        console.log(`The score is ${getScore()}`)

            
    },
    update() {

        if (keys.Space.isDown) {
            this.scene.start("main");
        }
        if (keys.Shift.isDown) {
            this.scene.start("intro")
        }
    }

}
