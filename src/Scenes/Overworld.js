
class overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }
    preload(){
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
    }
    create() {
        


        this.dialogueData = {
            "The Chief": [
                "Knight! You must help our townspeople in such dire need!",
                "Thank you hero!"
            ],
            "Meaty Megee": [
                "Aw fiddlesticks! Some dark knights stole my meat supply and won't give it back!",
                "That sserves them right! Nobody touches my product! Nobody!"
            ],
            "Gold Gremlin Gary": [
                "Aw dangnabbit! Some rube robbed me on my way here and scattered my 3 gold pieces somewhere!",
                "I always knew you were an easy mark- I mean... thanks pal."
            ],
            "Lumberjack Larry": [
                "Hot belgian waffles! Some dark knights are squatting in the forrest below where I chop my wood!",
                "Thanks mista, I appreciate you showing those boys how a knight should REALLY fight!"
            ]
        }



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

        this.decorFLayer = this.map.createLayer("decorFrontLayer", allDecor, 0, 0);
        this.decorBLayer = this.map.createLayer("decorBackLayer", allDecor, 0, 0);

        this.decorFLayer.setCollisionByProperty({
            collides: true
        });
        this.decorBLayer.setCollisionByProperty({
            collides: true
        });

        this.invisibleLayer = this.map.createLayer("invisibleWallLayer", terrainTiles, 0, 0);

        this.invisibleLayer.setCollisionByProperty({
            collides: true
        });
        this.invisibleLayer.visible = false;



        
        

        this.anims.create({
            key: "chiefIdle",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("chiefIdle", {
                frames: [0, 1, 2, 3, 4, 5]
            })
        })

        this.anims.create({
            key: "meatIdle",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("meatIdle", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        this.anims.create({
            key: "goldIdle",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("goldIdle", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        this.anims.create({
            key: "woodIdle",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("woodIdle", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        this.anims.create({
            key: "bKnightIdle",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("bKnightIdle", {
                frames: [0, 1, 2, 3, 4, 5, 6, 7]
            })
        })

        this.anims.create({
            key: "goldNugget",
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("goldNugget", {
                frames: [0, 1, 2, 3, 4, 5]
            })
        })

        


        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.up = this.input.keyboard.addKey("W");
        this.down = this.input.keyboard.addKey("S");

        this.interact = this.input.keyboard.addKey("E");

        //let sprite = this.add.sprite(0, 0, "playerIdle");

        
        this.player = new Player(this, 550, 2700,  
            "playerIdle", 1,
            this.left, this.right, this.up, this.down);
        this.player.setScale(1);
        this.player.moveSpeed = 800;
        this.player.nearNPC = null;
        this.nearNPCReset = 50;

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


        this.physics.add.collider(this.player, this.invisibleLayer);
        this.physics.add.collider(this.player, this.decorFLayer);
        this.physics.add.collider(this.player, this.decorBLayer);

        this.player.depth = this.player.y + 1;
        this.decorFLayer.depth = this.player.y + 2;
        this.decorBLayer.depth = this.player.y - 1;
        


        let objectLayer = this.map.getObjectLayer("objectsLayer");

        console.log(objectLayer);
        
        this.npcs = this.add.group();
        this.enemies = this.add.group();
        this.golds = this.add.group();
        this.meats = this.add.group();

        objectLayer.objects.forEach(obj => {
            
            if(obj.properties.find(p => p.name === "type")?.value === "npc"){
                let anim = obj.properties.find(p => p.name === "animation")?.value;
                let npc = new NPC(this, obj.x, obj.y, anim);
                npc.name = obj.properties.find(p => p.name === "name")?.value;
                npc.depth = this.player.y;
                npc.play(anim);
                this.npcs.add(npc);
            } else if(obj.properties.find(p => p.name === "type")?.value === "enemy"){
                let enemy = new Enemy(this, obj.x, obj.y, "bKnightIdle");
                enemy.play("bKnightIdle");
                this.enemies.add(enemy);
            } else if(obj.properties.find(p => p.name === "type")?.value === "gold"){
                const gold = this.physics.add.sprite(obj.x, obj.y, "goldNugget", 1);
                gold.play("goldNugget");
                this.golds.add(gold);
            } else if(obj.properties.find(p => p.name === "type")?.value === "meat"){
                const meat = this.physics.add.sprite(obj.x, obj.y, "meatChunk", 0);
                //this.meat.play("meatChunk");
                this.meats.add(meat);
            }
        });
        
        this.physics.add.overlap(this.player, this.npcs, (obj1, obj2) => {
            //console.log(obj2);
            
            this.nearNPC = obj2;
        });
        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
            // Disable the enemy's physics temporarily so it doesn't trigger the battle 60 times a second
            enemy.body.enable = false;

            // Save which enemy we hit to the scene so we can delete it later if we win
            this.currentEnemy = enemy;

            GameState.player.x = player.x;
            GameState.player.y = player.y;
            GameState.player.damage = player.damage;
            this.scene.pause();
            this.scene.launch("battleScene", structuredClone(GameState));
        });
        this.physics.add.overlap(this.player, this.golds, (obj1, obj2) => {
            obj2.destroy();  
            GameState.world.goldObtained++;
        });
        this.physics.add.overlap(this.player, this.meats, (obj1, obj2) => {
            obj2.destroy();  
            GameState.world.meatObtained++;
        });
        

        
            
        this.input.keyboard.on("keydown-E", () => {
            //GameState.world = {meatObtained: 9, goldObtained: 3, enemySlain: 6};
            console.log(GameState.world);
            
            if(this.nearNPC != null){
                let x = 0;
                if(this.nearNPC.name == "The Chief"){
                    if(GameState.world.goldObtained === 3 && GameState.world.meatObtained === 9 && GameState.world.enemySlain === 6){
                        x = 1;
                        setTimeout(() => {
                            this.scene.pause();
                            this.scene.launch("creditsScene");
                        }, 5000)
                    }
                    
                } else if(this.nearNPC.name == "Meaty Megee" && GameState.world.meatObtained === 9){
                    x = 1;
                } else if(this.nearNPC.name == "Gold Gremlin Gary" && GameState.world.goldObtained === 3){
                    x = 1;
                } else if(this.nearNPC.name == "Lumberjack Larry" && GameState.world.enemySlain === 6){
                    x = 1;
                }

                this.dialogue.setText(`${this.nearNPC.name}: ${this.dialogueData[this.nearNPC.name][x]}`);
                this.dialogue.visible = true;
                setTimeout(() => {
                    this.dialogue.visible = false;
                }, 5000)
            }
        })


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

        this.dialogue = this.add.text(0, 0, "Speaker: Blah blah ", {
            fontSize: "32px",
            fontFamily: '"Press Start 2P"',
            fill: "#00ff00",
            wordWrap: {width: 500}
        }).setScrollFactor(0);
        
        this.dialogue.depth = this.player.y + 20;
        this.dialogue.visible = false;





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
            this.tweens.killTweensOf(this.player);
            this.player.alpha = 1;

            if (data && data.victory) {
                if (this.currentEnemy) {
                    this.currentEnemy.destroy();
                }
                GameState.world.enemySlain++;
                this.player.swordLevel = GameState.player.swordLevel;
                this.player.swordDamage = GameState.player.damage;
                console.log(`Victory! Enemies Slain: ${GameState.world.enemySlain}`);
            } else {
                if (this.currentEnemy) {
                    console.log("Fled! Granting 3 seconds of invincibility...");

                    // Make the player blink so they know they are safe
                    let blinkTween = this.tweens.add({
                        targets: this.player,
                        alpha: 0.2, 
                        duration: 200,
                        yoyo: true,
                        repeat: 7 
                    });

                    // Wait 3 seconds before turning the enemy's physics back on
                    this.time.delayedCall(3000, () => {
                        if (this.currentEnemy && this.currentEnemy.active) {
                            this.currentEnemy.body.enable = true;
                        }
                        this.player.alpha = 1;
                    });
                }
            }
        });


        
    }

    update(time, delta) {

        this.nearNPCReset--;
        if(this.nearNPCReset < 0){
            this.nearNPC = null;
            this.nearNPCReset = 50;  
        }

        this.player.update();
        this.enemies.getChildren().forEach(enemy => {
            enemy.update(this.player);
        });    
    }
}