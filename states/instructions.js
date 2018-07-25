
  export default class Instructions {
      create() {
        const G = this.add.graphics();
        G.fillStyle(0xEAEAEA);
        G.fillRect(0, 0, 400, 400);
        this.add.text(10, 150, "Use A and D or the left and right arrow \nkeys to move the doge. Collect as many \nbones as possible and avoid the bombs.", {
            color:"black"
        })
        this.add.text(100, 40, "Press shift to go back", {
            color: "black"
        })
        this.add.text(10, 250, "You have 3 lives. If you miss a bone, \nyou will lose a life. The game ends when \nyou run out of lives.", {
            color: "black"
        })

        this.keys = this.input.keyboard.addKeys({
            Shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        });
        
    }
    update() {
        if (this.keys.Shift.isDown) {
            console.log("switching")
            this.scene.start("intro");
        }
    }
}




      
  

