class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.health = 30;
        this.baseDamage = 5;
        this.moveSpeed = 90;
        this.chaseRange = 150;

        this.setCollideWorldBounds(true);
    }


    update(player) {
        if (!player || !player.active) return;

        let distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (distance < this.chaseRange) {
            this.scene.physics.moveToObject(this, player, this.moveSpeed);
        } else {
            this.setVelocity(0, 0);
        }
    }


    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.destroy();
    }
}