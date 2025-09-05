const board = document.getElementById('board');
const scoresDiv = document.getElementById('scores');

let currentPlayer = 'X';
let boardState = Array(9).fill('');
let gameOver = false;

function generateBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(e) {
    const cellIndex = e.target.getAttribute('data-index');
    if (boardState[cellIndex] || gameOver) return;

    boardState[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    e.target.classList.add(currentPlayer === 'X' ? 'player-x' : 'player-o');

    if (checkWin(currentPlayer)) {
        gameOver = true;
        showWinner(currentPlayer);
        return;
    }

    if (checkDraw()) {
        gameOver = true;
        scoresDiv.innerHTML = `<h2>It's a draw!</h2>`;
        addResetButton();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(([a, b, c]) =>
        boardState[a] === player &&
        boardState[b] === player &&
        boardState[c] === player
    );
}

function checkDraw() {
    return !boardState.includes('');
}

function showWinner(winner) {
    scoresDiv.innerHTML = `<h2>Player ${winner} wins!</h2>`;
    addResetButton();
}

function addResetButton() {
    const resetBtn = document.createElement('button');
    resetBtn.textContent = "Play Again";
    resetBtn.classList.add('reset-btn');
    resetBtn.addEventListener('click', resetGame);
    scoresDiv.appendChild(resetBtn);
}

function resetGame() {
    boardState = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    scoresDiv.innerHTML = '';
    generateBoard();
}

function init() {
    generateBoard();
}

init();