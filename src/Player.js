class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, 
                texture, frame, 
                leftKey, rightKey, upKey, downKey) {

        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.left = leftKey;
        this.right = rightKey
        this.up = upKey;
        this.down = downKey;

        this.health = 100;
        this.moveSpeed = 180;
        this.swordDamage = 10;
        this.swordLevel = 1;
        
        this.setCollideWorldBounds(true); 
    }


    update(time, delta) {
        this.setVelocity(0);

        if (this.left.isDown) {
            this.setVelocityX(-this.moveSpeed);
        } else if (this.right.isDown) {
            this.setVelocityX(this.moveSpeed);
        }

        if (this.up.isDown) {
            this.setVelocityY(-this.moveSpeed);
        } else if (this.down.isDown) {
            this.setVelocityY(this.moveSpeed);
        }

        this.body.velocity.normalize().scale(this.moveSpeed);
    }

    takeDamage(amount) {
        this.health -= amount;

        if (this.health <= 0) {
            this.health = 0;
            console.log("Player defeated");
        }
    }

    upgradeSword() {
        this.swordLevel += 1;
        this.swordDamage += 5;
    }
}