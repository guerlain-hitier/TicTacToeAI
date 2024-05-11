var board = [
    [],
    [],
    []
];

const human = 'X';
const ai = 'O';
var player = human;

for (var i = 0; i < 3; i++) {

    let currentRow = Array.from(document.getElementById('row' + (i +1)).children);

    for (var j = 0; j < 3; j++) {
        board[i].push(currentRow[j]);
        board[i][j].innerText = '';
        board[i][j].addEventListener('click', function(event) {
            place(getPos(event.target), player);
            player = ai;
            place(bestMove(), player);
            player = human;
        });
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j].innerText === '') {
                board[i][j].innerText = ai;
                let score = minimax(board, 0, false);
                board[i][j].innerText = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = {i, j};
                }
            }
        }
    }
    return move;
}

values = {
    X: -1,
    O: 1,
    tie: 0
}

async function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
        return values[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j].innerText === '') {
                    board[i][j].innerText = ai;
                    await new Promise(r => setTimeout(r, 1000));
                    let score = minimax(board, depth + 1, false);
                    board[i][j].innerText = '';
                    bestScore = Math.max(score, bestScore);

                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j].innerText === '') {
                    board[i][j].innerText = human;
                    await new Promise(r => setTimeout(r, 0));
                    let score = minimax(board, depth + 1, true);
                    board[i][j].innerText = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function place(pos, player) {
    board[pos.y][pos.x].innerText = player;
}

function getPos(target) {
    let x = target.id[3] - 1;
    let y = target.parentElement.id[3] - 1;
    return {x, y};
}

function resetBoard(){
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            board[i][j].innerText = '';
        }
    }
    player = 'X';
}

function checkWinner(){
    // Check rows
    for (var i = 0; i < 3; i++) {
        if (board[i][0].innerText === board[i][1].innerText && board[i][1].innerText === board[i][2].innerText && board[i][0].innerText !== '') {
            return board[i][0].innerText;
        }
    }

    // Check columns
    for (var i = 0; i < 3; i++) {
        if (board[0][i].innerText === board[1][i].innerText && board[1][i].innerText === board[2][i].innerText && board[0][i].innerText !== '') {
            return board[0][i].innerText;
        }
    }

    // Check diagonals
    if (board[0][0].innerText === board[1][1].innerText && board[1][1].innerText === board[2][2].innerText && board[0][0].innerText !== '') {
        return board[0][0].innerText;
    }

    if (board[0][2].innerText === board[1][1].innerText && board[1][1].innerText === board[2][0].innerText && board[0][2].innerText !== '') {
        return board[0][2].innerText;
    }

    return null;
}

