// timeLimit: time to complete the game
// collectionSize: how many items have to collect to win
// floors: list of floors
    // position: absolute top position where line starts
    // speed: how fast item on the line moves in pixels
    // ratio: portion for random "good to bad" items
    // time: how often item appears/spawns

export default {
    timeLimit: 600,
    collectionSize: 30,
    floors: [
        {
            speed: 200,
            ratio: 0.5,
            time: {
                min: 1,
                max: 2
            }
        },
        {
            speed: 200,
            ratio: 0.5,
            time: {
                min: 1,
                max: 2
            }
        },
        {
            speed: 200,
            ratio: 0.5,
            time: {
                min: 1,
                max: 2
            }
        },
        {
            speed: 200,
            ratio: 0.5,
            time: {
                min: 1,
                max: 2
            }
        }
    ]
}