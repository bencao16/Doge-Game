let keys;
        
export default {
    preload() {
        this.load.image("skull", "img/skull.png");
        this.load.image("instructions", "img/instructions.png");
    },
    create() {
        const G = this.add.graphics();
        G.fillStyle(0xEAEAEA);
        G.fillRect(0, 0, 400, 400);

        const skull = this.add.image(200, 200, "skull");
        skull.setScale(5);

        keys = this.input.keyboard.addKeys({
            Space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            Enter: Phaser.Input.Keyboard.KeyCodes.ENTER,
        });

        const instructions = this.add.image(200, 300, "instructions");

        // This centers the instructions images
        instructions.setOrigin(0.5, 0);
    },
    update() {
        if (keys.Space.isDown || keys.Enter.isDown) {
            this.scene.start("main");
        }
    }
}
