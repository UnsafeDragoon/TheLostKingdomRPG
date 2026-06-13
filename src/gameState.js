const defaultState = {
    player: {
        x: 0,
        y: 0,
        health: 1,
        swordLevel: 1,
        damage: 10
    },
    world: {
        enemySlain: 0,
        meatObtained: 0,
        goldObtained: 0
    }
}

const GameState = structuredClone(defaultState);

function resetGameState() {
    Object.assign(GameState, structuredClone(defaultState));
}