class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {
        this.cameras.main.setBackgroundColor("#111122");

        this.add.text(320, 90, "CREDITS", {
            fontSize: "48px",
            color: "#ffd700",
            fontStyle: "bold"
        }).setOrigin(0.5);

        this.add.text(320, 180, "The Lost Kingdom", {
            fontSize: "30px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(320, 250, "Created by:", {
            fontSize: "24px",
            color: "#cccccc"
        }).setOrigin(0.5);

        this.add.text(320, 295, "Andrew Gayed", {
            fontSize: "24px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(320, 335, "Aaron Tan", {
            fontSize: "24px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(320, 375, "Donovan Burrola", {
            fontSize: "24px",
            color: "#ffffff"
        }).setOrigin(0.5);

        this.add.text(320, 455, "Assets: Tiny Swords by Pixel Frog", {
            fontSize: "20px",
            color: "#cccccc"
        }).setOrigin(0.5);

        this.add.text(320, 490, "https://pixelfrog-assets.itch.io/tiny-swords", {
            fontSize: "16px",
            color: "#88ccff"
        }).setOrigin(0.5);

        this.add.text(320, 570, "Press SPACE to return to Title", {
            fontSize: "22px",
            color: "#ffff00"
        }).setOrigin(0.5);

        this.input.keyboard.once("keydown-SPACE", () => {
            resetGameState();

            this.scene.stop("overworld");
            this.scene.stop("battleScene");
            
            this.scene.start("titleScene");
        });
    }
}