class Load extends Phaser.Scene {
    constructor() {
        super('loadScene'); 
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("playerSprite", "placeholder.png");

        this.load.image("tilemap_terrain1", "tiles/Tilemap_color2.png");       
        this.load.image("meatChunk", "sprites/Meat Resource.png");

        this.load.spritesheet("playerIdle", "sprites/Warrior_Idle.png", {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet("playerRun", "sprites/Warrior_Run.png", {
            frameWidth: 100,
            frameHeight: 100
        });

        this.load.spritesheet("playerAttack", "sprites/Warrior_Attack1.png", {
            frameWidth: 192,
            frameHeight: 192
        });

        this.load.spritesheet("playerDefend", "sprites/Warrior_Guard.png", {
            frameWidth: 192, 
            frameHeight: 192
        });

        this.load.spritesheet("chiefIdle", "sprites/Idle.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("meatIdle", "sprites/Pawn_Idle Meat.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("goldIdle", "sprites/Pawn_Idle Gold.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("woodIdle", "sprites/Pawn_Idle Wood.png", {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.spritesheet("bKnightIdle", "sprites/bWarrior_Idle.png", {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.spritesheet("bKnightAttack", "sprites/bWarrior_Attack1.png", {
            frameWidth: 192,
            frameHeight: 192
        });


        
        this.load.spritesheet("goldNugget", "sprites/Gold_Resource_Highlight.png", {
            frameWidth: 128,
            frameHeight: 128
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





        this.load.audio("bgm_main", "audio/A Great Journey - Overworld.wav");
        this.load.audio("bgm_battle", "audio/Gearing Up - Battle.wav");


    }

    create() {

        this.scene.start('titleScene'); 
    }
}