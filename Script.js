const board = document.getElementById("board");
const movesText = document.getElementById("moves");
const timerText = document.getElementById("timer");
const message = document.getElementById("message");
const newGameButton = document.getElementById("newGame");

let tiles = [];
let moves = 0;
let seconds = 0;
let timer = null;
let gameStarted = false;


// Start a new game
function newGame() {

    tiles = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 0
    ];

    moves = 0;
    seconds = 0;
    gameStarted = false;

    movesText.textContent = "0";
    timerText.textContent = "00:00";
    message.textContent = "";

    clearInterval(timer);

    // Shuffle the puzzle
    for (let i = 0; i < 100; i++) {

        const empty = tiles.indexOf(0);

        const possibleMoves = getPossibleMoves(empty);

        const randomMove =
            possibleMoves[
                Math.floor(
                    Math.random() *
                    possibleMoves.length
                )
            ];

        [tiles[empty], tiles[randomMove]] =
        [tiles[randomMove], tiles[empty]];
    }

    renderBoard();
}


// Find possible moves
function getPossibleMoves(emptyIndex) {

    const moves = [];

    const row = Math.floor(emptyIndex / 3);
    const column = emptyIndex % 3;


    // Up
    if (row > 0) {
        moves.push(emptyIndex - 3);
    }

    // Down
    if (row < 2) {
        moves.push(emptyIndex + 3);
    }

    // Left
    if (column > 0) {
        moves.push(emptyIndex - 1);
    }

    // Right
    if (column < 2) {
        moves.push(emptyIndex + 1);
    }

    return moves;
}


// Display puzzle
function renderBoard() {

    board.innerHTML = "";

    tiles.forEach((number, index) => {

        const button =
            document.createElement("button");

        button.classList.add("tile");

        if (number === 0) {

            button.classList.add("empty");

        } else {

            button.textContent = number;

            button.addEventListener(
                "click",
                () => moveTile(index)
            );
        }

        board.appendChild(button);
    });
}


// Move tile
function moveTile(index) {

    const emptyIndex = tiles.indexOf(0);

    const possibleMoves =
        getPossibleMoves(emptyIndex);


    if (!possibleMoves.includes(index)) {
        return;
    }


    // Start timer after first move
    if (!gameStarted) {

        gameStarted = true;

        timer = setInterval(() => {

            seconds++;

            updateTimer();

        }, 1000);
    }


    // Swap tiles
    [tiles[index], tiles[emptyIndex]] =
    [tiles[emptyIndex], tiles[index]];


    moves++;

    movesText.textContent = moves;

    renderBoard();

    checkWin();
}


// Timer
function updateTimer() {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    timerText.textContent =
        String(minutes).padStart(2, "0")
        + ":" +
        String(remainingSeconds).padStart(2, "0");
}


// Check winning condition
function checkWin() {

    const solved = tiles.every(
        (number, index) => {

            if (index === 8) {
                return number === 0;
            }

            return number === index + 1;
        }
    );


    if (solved) {

        clearInterval(timer);

        message.textContent =
            "🎉 Congratulations! Puzzle Solved!";

        gameStarted = false;
    }
}


newGameButton.addEventListener(
    "click",
    newGame
);


// Start
newGame();
