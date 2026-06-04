class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, 
                texture, frame, 
                leftKey, rightKey, upKey, downKey) {

        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        //scene.physics.add.existing(this);
        
        this.left = leftKey;
        this.right = rightKey
        this.up = upKey;
        this.down = downKey;

        this.health = 100;
        this.moveSpeed = 300;
        this.swordDamage = 10;
        this.swordLevel = 1;
        
        //this.setCollideWorldBounds(true); 
    }
    update(time, delta){
        let dt = delta / 1000;

        if(this.left.isDown){
            this.x -= (this.moveSpeed * dt);
        } else if(this.right.isDown){
            this.x += (this.moveSpeed * dt);
        }

        if(this.up.isDown){
            this.y -= (this.moveSpeed * dt);
        } if(this.down.isDown){
            this.y += (this.moveSpeed * dt);
        }



    }

    upgradeSword() {
        this.swordLevel += 1;
        this.swordDamage += 5;
    }
}