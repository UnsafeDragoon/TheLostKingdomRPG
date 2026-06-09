class overworld extends Phaser.Scene {
    constructor() {
        super("overworld");
    }
    create() {


        this.map = this.add.tilemap("overworld", 16, 16, 120, 60);
        //this.animatedTiles.init(this.map);
        this.tileset = this.map.addTilesetImage("monochrome_tilemap_packed", "tilemap_tiles");
        
        // Create a layer
        this.groundLayer = this.map.createLayer("groundLayer", this.tileset, 0, 0);
        this.hazardLayer = this.map.createLayer("hazardLayer", this.tileset, 16, 0);
        this.platformLayer = this.map.createLayer("platformLayer", this.tileset, 0, 0);

        



        this.input.keyboard.on('keydown-ZERO', () => {
            this.scene.start("devSpriteTest");
        });
    }

    update(time, delta) {
    }
}
         