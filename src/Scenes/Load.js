class Load extends Phaser.Scene {
    constructor() {
        super('loadScene'); 
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("playerSprite", "placeholder.png");
    }

    create() {
        
        this.scene.start('overworld'); 
    }
}