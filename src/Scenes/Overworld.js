class overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }
    create() {


        this.map = this.make.tilemap({
            key: "overworld"
        });
        //this.animatedTiles.init(this.map);

        // 1st param = name of tileset in TILED!      2nd param = name of image in Load.js
        let terrainTiles = this.map.addTilesetImage("Tilemap_color2", "tilemap_terrain1");
        let backgroundTiles = this.map.addTilesetImage("Water Background color", "tilemap_water");


        this.bgLayer = this.map.createLayer("backgroundLayer", backgroundTiles, 0, 0);
        this.groundLayer = this.map.createLayer("groundLayer", terrainTiles, 0, 0);




        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.up = this.input.keyboard.addKey("W");
        this.down = this.input.keyboard.addKey("S");

        
        this.player = new Player(this, 550, 2700,  
            "playerSprite", null,
            this.left, this.right, this.up, this.down);
        this.player.setScale(3);
        this.player.moveSpeed = 600;
        
            

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
            this.scene.start("battleScene");
        });
    }

    update(time, delta) {
        console.log(
    this.player.x,
    this.player.y,
    this.cameras.main.scrollX,
    this.cameras.main.scrollY
);
        this.player.update();
        //console.log(this.game.loop.actualFps);
    }
}
         