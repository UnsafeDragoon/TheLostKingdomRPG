class overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }
    preload(){
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }
    create() {


        this.map = this.make.tilemap({
            key: "overworld"
        });
        this.animatedTiles.init(this.map);

        // 1st param = name of tileset in TILED!      2nd param = name of image in Load.js
        let terrainTiles = this.map.addTilesetImage("Tilemap_color2", "tilemap_terrain1");

        let backgroundTiles = this.map.addTilesetImage("Water Background color", "tilemap_water");

        let treeTiles = this.map.addTilesetImage("Tree1", "tilemap_tree");
        let waterRockTiles = this.map.addTilesetImage("Water Rocks_01", "tilemap_waterRocks");
        let bCastleTiles = this.map.addTilesetImage("Castle", "tilemap_bCastle");
        let bBarrackTiles = this.map.addTilesetImage("Barracks", "tilemap_bBarracks");
        let bArcheryTiles = this.map.addTilesetImage("Archery", "tilemap_bArcher");
        let bTowerTiles = this.map.addTilesetImage("Tower", "tilemap_bTower");
        let yMonasteryTiles = this.map.addTilesetImage("Monastery", "tilemap_yMonastery");
        let yHouseTiles = this.map.addTilesetImage("House1", "tilemap_yHouse");
        let yAltHouseTiles = this.map.addTilesetImage("House2", "tilemap_yHouse2");

        let allDecor = [treeTiles, waterRockTiles, bCastleTiles,
            bBarrackTiles, bArcheryTiles, bTowerTiles, yMonasteryTiles,
            yHouseTiles, yAltHouseTiles
        ];

        this.bgLayer = this.map.createLayer("backgroundLayer", backgroundTiles, 0, 0);
        this.groundLayer = this.map.createLayer("groundLayer", terrainTiles, 0, 0);
        this.decorLayer = this.map.createLayer("decorLayer", allDecor, 0, 0);




        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.up = this.input.keyboard.addKey("W");
        this.down = this.input.keyboard.addKey("S");

        //let sprite = this.add.sprite(0, 0, "playerIdle");

        
        this.player = new Player(this, 550, 2700,  
            "playerIdle", 40,
            this.left, this.right, this.up, this.down);
        this.player.setScale(1);
        this.player.moveSpeed = 600;

        this.anims.create({
            key: "playerIdle",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerIdle", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: "playerRun",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerRun", {
                frames: [0, 1, 2, 3, 4, 5]
            })
        })

        this.player.play("playerIdle");







        
            

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 1, 1); 
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(1);



        this.physics.world.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        );





        this.input.keyboard.on('keydown-ZERO', () => {
            this.scene.start("devSpriteTest");
        });
        this.input.keyboard.on('keydown-NINE', () => {
            this.scene.pause();
            // Pass the player's current damage as an object
            this.scene.launch("battleScene", { damage: this.player.swordDamage });
        });
        
        // Listen for the 'resume' event from the battle scene
        this.events.on('resume', (scene, data) => {
            if (data && data.victory) {
                this.player.upgradeSword();
                console.log(`Victory! Sword upgraded to Level ${this.player.swordLevel}. Damage is now ${this.player.swordDamage}!`);
            }
        });
    }

    update(time, delta) {
//         console.log(
//     this.player.x,
//     this.player.y,
//     this.cameras.main.scrollX,
//     this.cameras.main.scrollY
// );
        this.player.update();
        //console.log(this.game.loop.actualFps);
    }
}
         