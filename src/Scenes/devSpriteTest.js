class devSpriteTest extends Phaser.Scene {
    constructor() {
        super("devSpriteTest");
    }
    create() {
        //this.add.sprite(30, 345, "playerSprite", null);

        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.up = this.input.keyboard.addKey("W");
        this.down = this.input.keyboard.addKey("S");

        
        this.player = new Player(this, 200, 200,  
            "playerSprite", null,
            this.left, this.right, this.up, this.down);
        
        this.player.setScale(3);
        console.log(this.player);
            
        
            
        
    }

    update(time, delta) {
        this.player.update(time, delta);
    }
}
         