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

        let isMoving = false;

        if (this.left.isDown) {
            this.setVelocityX(-this.moveSpeed);
            this.setFlipX(true);
            isMoving = true;
        } else if (this.right.isDown) {
            this.setVelocityX(this.moveSpeed);
            this.setFlipX(false);
            isMoving = true;
        }

        if (this.up.isDown) {
            this.setVelocityY(-this.moveSpeed);
            isMoving = true;
        } else if (this.down.isDown) {
            this.setVelocityY(this.moveSpeed);
            isMoving = true;
        }

        this.body.velocity.normalize().scale(this.moveSpeed);


        if(isMoving && this.anims.currAnim?.key !== "playerRun"){
            this.anims.play("playerRun", true);
        } else if(!isMoving && this.anims.currAnim?.key !== "playerIdle"){
            this.anims.play("playerIdle", true);
        }
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