class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {
        this.cameras.main.setBackgroundColor("#1b1b2f");

        this.add.text(320, 140, "THE LOST KINGDOM", {
            fontSize: "48px",
            color: "#ffd700",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(320, 220, "A Top-Down RPG Adventure", {
            fontSize: "22px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(320, 330, "WASD / Arrow Keys - Move", {
            fontSize: "20px",
            color: "#cccccc"
        }).setOrigin(0.5);

        this.add.text(320, 365, "E - Interact", {
            fontSize: "20px",
            color: "#cccccc"
        }).setOrigin(0.5);

        this.add.text(320, 470, "Press SPACE to Start", {
            fontSize: "28px",
            color: "#ffff00"
        }).setOrigin(0.5);

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("overworld");
        });


        this.add.text(320, 520, "Press C for Credits", {
            fontSize: "22px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.input.keyboard.once("keydown-C", () => {
            this.scene.start("creditsScene");
        });
    }
    
}