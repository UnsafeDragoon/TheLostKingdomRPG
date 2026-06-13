class Battle extends Phaser.Scene {
    constructor() {
        super('battleScene');
    }

    init(data) {
        console.log("Battle started - Data received:", data);
        // temporary default stats so UI has something to display
        this.playerHealth = 100;
        this.enemyHealth = 30;
        this.playerDamage = data.damage || 10; // default to 10 if something goes wrong
        this.enemyDamage = 5;
    }

    create() {
        // background
        this.add.rectangle(0, 0, 640, 640, 0x4d9262).setOrigin(0, 0);
        this.add.image(100, 100, 'tilemap_tree').setScale(2.5);
        this.add.image(320, 80, 'tilemap_tree').setScale(2.5).setTint(0xdddddd); 
        this.add.image(540, 100, 'tilemap_tree').setScale(2.5);

        // Create animations
        if (!this.anims.exists('playerAttack')) {
            this.anims.create({
                key: "playerAttack",
                frameRate: 12,
                frames: this.anims.generateFrameNumbers("playerAttack", { start: 0, end: 5 })
            });
        }

        if (!this.anims.exists('playerDefend')) {
            this.anims.create({
                key: "playerDefend",
                frameRate: 12,
                repeat: -1,
                frames: this.anims.generateFrameNumbers("playerDefend", { start: 0, end: 5 })
            });
        }

        // Player on the left side
        this.playerSprite = this.add.sprite(160, 350, 'playerIdle').setScale(2);
        this.playerSprite.play('playerIdle');

        // Enemy on the right side
        this.enemySprite = this.add.sprite(480, 350, 'woodIdle').setScale(2).setFlipX(true);
        this.enemySprite.play('woodIdle');

        // Health UI
        this.playerHealthText = this.add.text(120, 205, `HP: ${this.playerHealth}`, { 
            fontSize: '24px', fill: '#00ff00', fontFamily: '"Press Start 2P"'
        });
        this.enemyHealthText = this.add.text(440, 205, `HP: ${this.enemyHealth}`, { 
            fontSize: '24px', fill: '#ff0000', fontFamily: '"Press Start 2P"'
        });

        // Command menu
        this.add.text(20, 520, 'COMMANDS:', { 
            fontSize: '28px', fill: '#ffffff', fontFamily: '"Press Start 2P"' 
        });
        
        this.attackBtn = this.add.text(60, 570, '> Attack', { fontSize: '24px', fill: '#ffff00' });
        this.defendBtn = this.add.text(240, 570, '> Defend', { fontSize: '24px', fill: '#ffff00' });
        this.fleeBtn = this.add.text(420, 570, '> Flee', { fontSize: '24px', fill: '#ffff00' });

        // Menu interactivity
        const buttons = [this.attackBtn, this.defendBtn, this.fleeBtn];

        buttons.forEach(btn => {
            // Make clickable and turn the mouse into a pointer hand
            btn.setInteractive({ useHandCursor: true });

            // Hover in effect: turn text white
            btn.on('pointerover', () => {
                btn.setStyle({ fill: '#ffffff' });
            });

            // Hover out effect: turn text back to yellow
            btn.on('pointerout', () => {
                btn.setStyle({ fill: '#ffff00' });
            });
        });

        // State Machine
        this.turnState = 'PLAYER_TURN';
        this.isDefending = false;

        // Click logic for each specific button
        this.attackBtn.on('pointerdown', () => {
            // If it's not the player's turn, ignore clicks
            if (this.turnState !== 'PLAYER_TURN') return;

            // Lock turn state
            this.turnState = 'ENEMY_TURN';

            // Player Attack Animation
            this.playerSprite.play('playerAttack');

            // Simultaneous lunge tween
            this.tweens.add({
                targets: this.playerSprite,
                x: '+=200',        
                duration: 200,     
                yoyo: true,        
                ease: 'Power2',
                onYoyo: () => {
                    this.enemySprite.setTintFill(0xff0000);
                    this.time.delayedCall(150, () => this.enemySprite.clearTint());

                    this.enemyHealth -= this.playerDamage;
                    this.enemyHealth = Math.max(0, this.enemyHealth); 
                    this.enemyHealthText.setText(`HP: ${this.enemyHealth}`);
                    this.showFloatingDamage(this.enemySprite.x, this.enemySprite.y, this.playerDamage);
                },
                onComplete: () => {
                    // This fires when the player gets back to their starting spot
                    this.playerSprite.play('playerIdle'); 

                    if (this.enemyHealth <= 0) {
                        this.turnState = 'GAME_OVER';
                        this.add.text(200, 100, 'VICTORY!', { fontSize: '48px', fill: '#ffff00', fontFamily: '"Press Start 2P"' });
                        this.time.delayedCall(1500, () => {
                            this.scene.resume('overworld', { victory: true }); 
                            this.scene.stop();              
                        });
                        return; 
                    }

                    this.time.delayedCall(800, this.enemyAttack, [], this);
                }
            });
        });

        this.defendBtn.on('pointerdown', () => {
            if (this.turnState !== 'PLAYER_TURN') return;
            this.turnState = 'ENEMY_TURN';
            
            this.isDefending = true; 
            this.playerSprite.play('playerDefend');
            
            this.showFloatingMessage(this.playerSprite.x, this.playerSprite.y, "DEFEND!");
            
            // Wait a little bit, then let the enemy attack while the shield is raised
            this.time.delayedCall(800, this.enemyAttack, [], this);
        });

        this.fleeBtn.on('pointerdown', () => {
            if (this.turnState !== 'PLAYER_TURN') return;
            this.turnState = 'GAME_OVER'; // Lock the menu

            this.showFloatingMessage(this.playerSprite.x, this.playerSprite.y, "FLED!");
            
            this.playerSprite.setFlipX(true); 
            this.playerSprite.play('playerRun'); 

            // Tween the player running off the left side of the screen
            this.tweens.add({
                targets: this.playerSprite,
                x: '-=200', 
                alpha: 0,
                duration: 800,
                onComplete: () => {
                    this.scene.resume('overworld'); 
                    this.scene.stop();
                }
            });
        });

        // Access the state
        //this.gameState = this.scene.settings.data;

        // Do this upon finishing the battle. Can store data into the persistent gamestate.
    //     this.events.on('resume', (scene, data) => {

    //         if (!data) return;

    //         if (data.swordLevel < this.swordLevel) {
    //             GameState.player.swordLevel = this.player.swordLevel;
    //             GameState.player.damage = this.player.swordDamage;
    //         }

    //         if (data.player) {
    //             GameState.player.health = data.player.health;
    //         }
    //     });

    }

    // Method for enemy turns
    enemyAttack() {
        // Double check we haven't ended the game
        if (this.turnState === 'GAME_OVER') return;
        console.log("Enemy attacks!");

        // Enemy Attack Animation (Bump Forward)
        this.tweens.add({
            targets: this.enemySprite,
            x: '-=250', // Dash left
            duration: 180,
            yoyo: true,
            ease: 'Power2',
            onYoyo: () => {
                this.playerSprite.setTintFill(0xff0000);
                this.time.delayedCall(150, () => this.playerSprite.clearTint());

                // Check if the player is defending
                let finalDamage = this.isDefending ? Math.floor(this.enemyDamage / 2) : this.enemyDamage;

                this.playerHealth -= finalDamage;
                this.playerHealth = Math.max(0, this.playerHealth);
                this.playerHealthText.setText(`HP: ${this.playerHealth}`);
                
                // Show different text depending on if we blocked it
                if (this.isDefending) {
                    this.showFloatingMessage(this.playerSprite.x, this.playerSprite.y, "BLOCKED!");
                    this.showFloatingDamage(this.playerSprite.x, this.playerSprite.y + 40, finalDamage);
                } else {
                    this.showFloatingDamage(this.playerSprite.x, this.playerSprite.y, finalDamage);
                }
            },
            onComplete: () => {
                // Drop the shield and return to idle stance
                this.playerSprite.play('playerIdle');
                this.isDefending = false;

                if (this.playerHealth <= 0) {
                    this.turnState = 'GAME_OVER';
                    this.add.text(200, 100, 'DEFEAT...', { fontSize: '48px', fill: '#ff0000', fontFamily: '"Press Start 2P"' });
                    
                    // Boot player back to overworld after losing
                    this.time.delayedCall(2000, () => {
                        this.scene.resume('overworld');
                        this.scene.stop();
                    });
                    return;
                }

                this.turnState = 'PLAYER_TURN';
            }
        });
    }

    // Methods to show floating damage text and messages
    showFloatingDamage(x, y, amount) {
        let dmgText = this.add.text(x, y - 40, `-${amount}`, { 
            fontSize: '32px', fill: '#ff0000', fontFamily: '"Press Start 2P"', 
            stroke: '#000000', strokeThickness: 4 
        }).setOrigin(0.5);

        // Animate the text floating up and fading out
        this.tweens.add({
            targets: dmgText,
            y: y - 100,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => dmgText.destroy()
        });
    }

    showFloatingMessage(x, y, message) {
        let msgText = this.add.text(x, y - 40, message, { 
            fontSize: '20px', fill: '#ffffff', fontFamily: '"Press Start 2P"', 
            stroke: '#000000', strokeThickness: 4 
        }).setOrigin(0.5);

        this.tweens.add({
            targets: msgText,
            y: y - 80,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => msgText.destroy()
        });
    }

    update() {
        
    }
}