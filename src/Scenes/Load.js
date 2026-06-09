class Load extends Phaser.Scene {
    constructor() {
        super('loadScene'); 
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("playerSprite", "placeholder.png");

        this.load.image("tilemap_terrain1", "Tilemap_color2.png");
        this.load.spritesheet("tilemap_terrain_sheet1", "Tilemap_color2.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.image("tilemap_water", "Water Background color.png");

        
        
        
        
        this.load.tilemapTiledJSON("overworld", "overworld.tmj");
    }

    create() {

        this.scene.start('overworld'); 
    }
}