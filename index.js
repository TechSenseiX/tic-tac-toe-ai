let currentPlayer = "X";
let arr = Array(9).fill(null);

function checkWinner() {
    const winnerMessage = document.getElementById('winnerMessage');
    
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
            winnerMessage.innerHTML = `Winner is ${arr[a]}! 🎉`;
            disableBoard();
            return true;
        }
    }

    if (!arr.some((e) => e === null)) {
        winnerMessage.innerHTML = 'It\'s a Draw! 🤝';
        return true;
    }

    return false;
}

function handleClick(el) {
    const id = Number(el.id);
    if (arr[id] !== null || currentPlayer !== 'X') return;
    arr[id] = currentPlayer;
    el.innerText = currentPlayer;
    if (!checkWinner()) {
        currentPlayer = 'O';
        aiMove();
    }
}

function aiMove() {
    let emptyCells = arr.map((value, index) => value === null ? index : null).filter(v => v !== null);
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    arr[move] = currentPlayer;
    document.getElementById(move).innerText = currentPlayer;
    if (!checkWinner()) {
        currentPlayer = 'X';
    }
}

function disableBoard() {
    const cells = document.getElementsByClassName('col');
    for (let cell of cells) {
        cell.onclick = null;
    }
}



