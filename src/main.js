// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    width: 640,         // 10 tiles, each 16 pixels, scaled 4x
    height: 640,
    scene: [Load, overworld, Battle, devSpriteTest]
}

const game = new Phaser.Game(config);