const defaultState = {
    player: {
        x: 0,
        y: 0,
        health: 1,
        swordLevel: 1,
        damage: 10
    },
    world: {
        enemyAlive: [true, true, true, true, true, true],
        meatObtained: [false, false, false, false, false,
            false, false, false, false
        ],
        goldObtained: [false, false, false]
    }
}

const GameState = structuredClone(defaultState);

function resetGameState() {
    Object.assign(GameState, structuredClone(defaultState));
}