let keys;

        
export default {
    preload() {
        this.load.image("skull", "img/skull.png");
    },
    create() {
        const G = this.add.graphics();
        G.fillStyle(0xEAEAEA);
        G.fillRect(0, 0, 400, 400);


        keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Tab: Phaser.Input.Keyboard.KeyCodes.TAB,
        });

        const spacebar = this.add.text(200, 350, "Press space to play", {
            color: "black"
        }) 

        spacebar.setOrigin(0.5, 0);

        const skullpic = this.add.image(200, 200, "skull")
        skullpic.setScale(0.8);

       this.add.text(50, 40, "Press tab to view instructions",{
           color: "black"
       })

    

    },
    update() {
        if (keys.Space.isDown) {
            this.scene.start("main");
        }
        if (keys.Tab.isDown) {
            console.log("WUT WUT")
            this.scene.start("instructions");
        }
        
    }
}
