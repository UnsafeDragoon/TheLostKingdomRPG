class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.health = 100;
        this.swordDamage = 10;
        this.swordLevel = 1;

        this.setCollideWorldBounds(true); 
    }

    upgradeSword() {
        this.swordLevel += 1;
        this.swordDamage += 5;
    }
}