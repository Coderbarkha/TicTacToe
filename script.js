var board;
var currentPlayer = 'X';
var gameOver = false;
var movesCount = 0;

window.onload = function() {
    setGame();
    document.getElementById("resetButton").addEventListener("click", resetGame);
}

function setGame() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];
    gameOver = false;
    movesCount = 0;
    updateStatus();

    let boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear previous game state

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let cell = document.createElement('div');
            cell.id = `${r}${c}`;
            cell.addEventListener("click", () => makeMove(r, c));
            boardElement.appendChild(cell);
        }
    }
}

function makeMove(row, col) {
    if (gameOver || board[row][col] !== ' ') return;

    board[row][col] = currentPlayer;
    document.getElementById(`${row}${col}`).innerText = currentPlayer;
    movesCount++;

    if (checkWinner(row, col)) {
        document.getElementById('status').innerText = `${currentPlayer} Wins! 🎉`;
        gameOver = true;
        return;
    }

    if (movesCount === 9) {
        document.getElementById('status').innerText = "It's a Draw! 😞";
        gameOver = true;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function checkWinner(row, col) {
    // Check row
    if (board[row][0] === currentPlayer && board[row][1] === currentPlayer && board[row][2] === currentPlayer) {
        return true;
    }
    // Check column
    if (board[0][col] === currentPlayer && board[1][col] === currentPlayer && board[2][col] === currentPlayer) {
        return true;
    }
    // Check diagonals
    if (row === col && board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (row + col === 2 && board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }
    return false;
}

function updateStatus() {
    document.getElementById('status').innerText = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    setGame();
    document.getElementById('status').innerText = `Player X's Turn`;
}
