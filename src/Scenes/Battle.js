class Battle extends Phaser.Scene {
    constructor() {
        super('battleScene');
    }

    init(data) {
        console.log("Battle started - Data received:", data);
        // temporary default stats so UI has something to display
        this.playerHealth = 100;
        this.enemyHealth = 30;
        this.playerDamage = 10;
        this.enemyDamage = 5;
    }

    create() {
        // background
        this.add.rectangle(0, 0, 640, 640, 0x333333).setOrigin(0, 0);

        // Player on the left side
        this.playerSprite = this.add.sprite(160, 320, 'playerSprite').setScale(3);

        // Enemy on the right side
        this.enemySprite = this.add.sprite(480, 320, 'playerSprite').setScale(3);
        this.enemySprite.setTint(0xff0000);

        // Health UI
        this.playerHealthText = this.add.text(100, 200, `HP: ${this.playerHealth}`, { 
            fontSize: '24px', fill: '#00ff00' 
        });
        this.enemyHealthText = this.add.text(420, 200, `HP: ${this.enemyHealth}`, { 
            fontSize: '24px', fill: '#ff0000' 
        });

        // Command menu
        this.add.text(20, 520, 'COMMANDS:', { fontSize: '28px', fill: '#ffffff' });
        
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

        // Click logic for each specific button
        this.attackBtn.on('pointerdown', () => {
            // If it's not the player's turn, ignore clicks
            if (this.turnState !== 'PLAYER_TURN') return;
            console.log("Player chose ATTACK!");

            // Lock turn state
            this.turnState = 'ENEMY_TURN';

            // Deal dmg and update text on screen
            this.enemyHealth -= this.playerDamage;
            this.enemyHealthText.setText(`HP: ${this.enemyHealth}`);

            // Check for win condition
            if (this.enemyHealth <= 0) {
                console.log("Victory!");
                this.turnState = 'GAME_OVER';
                // TODO: Return to overworld scene
                return;
            }

            // If enemy still alive, trigger their turn after 1 second delay
            this.time.delayedCall(1000, this.enemyAttack, [], this);
        });

        this.defendBtn.on('pointerdown', () => {
            if (this.turnState !== 'PLAYER_TURN') return;
            console.log("Player chose DEFEND!");
            this.turnState = 'ENEMY_TURN';
            this.time.delayedCall(1000, this.enemyAttack, [], this);
        });

        this.fleeBtn.on('pointerdown', () => {
            if (this.turnState !== 'PLAYER_TURN') return;
            console.log("Player chose FLEE!");
        });

    }

    // Method for enemy turns
    enemyAttack() {
        // Double check we haven't ended the game
        if (this.turnState === 'GAME_OVER') return;
        console.log("Enemy attacks!");

        // Deal damage to player
        this.playerHealth -= this.enemyDamage;
        this.playerHealthText.setText(`HP: ${this.playerHealth}`);

        // Check for loss condition
        if (this.playerHealth <= 0) {
            console.log("Defeat! Game Over.");
            this.turnState = 'GAME_OVER';
            return;
        }

        // If player survives, give the turn back to them
        this.turnState = 'PLAYER_TURN';
        console.log("It's your turn");
    }

    update() {
        
    }
}