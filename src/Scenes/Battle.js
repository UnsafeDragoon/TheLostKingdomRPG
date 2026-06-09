class Battle extends Phaser.Scene {
    constructor() {
        super('battleScene');
    }

    init(data) {
        console.log("Battle started - Data received:", data);
        // temporary default stats so UI has something to display
        this.playerHealth = 100;
        this.enemyHealth = 30;
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

        // Click logic for each specific button
        this.attackBtn.on('pointerdown', () => {
            console.log("Player chose ATTACK!");
            // Add the actual attack math here later
        });

        this.defendBtn.on('pointerdown', () => {
            console.log("Player chose DEFEND!");
        });

        this.fleeBtn.on('pointerdown', () => {
            console.log("Player chose FLEE!");
        });
    }

    update() {
        
    }
}