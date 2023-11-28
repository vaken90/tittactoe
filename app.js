const board = document.getElementById('board');
const result = document.getElementById('result');
const newGameBtn = document.getElementById('newGameBtn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerXPoints = 0;
let playerOPoints = 0;

// Event listener for each cell
board.addEventListener('click', handleCellClick);

// Event listener for the new game button
newGameBtn.addEventListener('click', startNewGame);

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.cellIndex;

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        if (checkWinner()) {
            if (updatePoints()) {
                return;
            }
            displayResult(`${currentPlayer} wins! Total points: X(${playerXPoints}), O(${playerOPoints})`);
            return;
        } else if (isBoardFull()) {
            displayResult('It\'s a draw!');
            return;
        }
        switchPlayer();
        updateResult();
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateResult() {
    result.innerText = `${currentPlayer}'s turn`;
}

function displayResult(message) {
    result.innerText = message;
    if (gameActive) {
        if (message.includes('Over')) {
            // If the message includes 'Over', set gameActive to false
            gameActive = false;
        }
        setTimeout(() => {
            result.innerText = '';
            if (gameActive) {
                startNewGame();
            }
        }, 1500);
    }
}

function startNewGame() {
    gameActive = true;
    gameBoard = ['', '', '', '', '', '', '', '', ''];

    // Clear the board
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
    });

    updateResult();
}

function updatePoints() {
    if (currentPlayer === 'X') {
        playerXPoints++;
    } else {
        playerOPoints++;
    }

    if (playerXPoints === 3 || playerOPoints === 3) {
        // Display the result and reset points to zero
        displayResult(`Game Over! Final Points: X(${playerXPoints}), O(${playerOPoints})`);
        playerXPoints = 0;
        playerOPoints = 0;
        return true; // Indicate that the game should end
    }

    return false;
}
