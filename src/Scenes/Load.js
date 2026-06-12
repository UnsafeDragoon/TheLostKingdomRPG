class Load extends Phaser.Scene {
    constructor() {
        super('loadScene'); 
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("playerSprite", "placeholder.png");

        this.load.image("tilemap_terrain1", "tiles/Tilemap_color2.png");
       
        this.load.spritesheet("playerIdle", "sprites/Warrior_Idle.png", {
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet("playerRun", "sprites/Warrior_Run.png", {
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.image("tilemap_water", "tiles/Water Background color.png");
        
        this.load.image("tilemap_yMonastery", "tiles/Monastery.png");
        this.load.image("tilemap_yHouse", "tiles/House1.png");
        this.load.image("tilemap_yHouse2", "tiles/House2.png");

        this.load.image("tilemap_bCastle", "tiles/Castle.png");
        this.load.image("tilemap_bTower", "tiles/Tower.png");
        this.load.image("tilemap_bArcher", "tiles/Archery.png");
        this.load.image("tilemap_bBarracks", "tiles/Barracks.png");

        this.load.image("tilemap_waterRocks", "tiles/Water Rocks_01.png");
        this.load.image("tilemap_tree", "tiles/Tree1.png");

        
        
        
        
        this.load.tilemapTiledJSON("overworld", "overworld.tmj");
    }

    create() {

        this.scene.start('overworld'); 
    }
}