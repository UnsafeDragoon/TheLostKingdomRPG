class overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }
    create() {


        this.input.keyboard.on('keydown-ZERO', () => {
            this.scene.start("devSpriteTest");
        });
    }

    update(time, delta) {
    }
}
         