var board = [
    [],
    [],
    []
];

var posX;
var posY;
var player = 'X';
var winner;
var winStateDiv = document.getElementById('winState');
var isWin = false;


for (var i = 0; i < 3; i++) {

    let currentRow = Array.from(document.getElementById('row' + (i +1)).children);

    for (var j = 0; j < 3; j++) {
        board[i].push(currentRow[j]);
        board[i][j].innerText = '';
        board[i][j].addEventListener('click', function(event) {
            getPos(event.target);
            //check if winState display is visible
            if (!isWin){ play(); }
        });
    }


}

function play() {
    if (board[posY][posX].innerText === '') {
        board[posY][posX].innerText = player;
        player = player == 'X' ? 'O' : 'X';
        checkEnd();
    }
}

function checkEnd(){
    if (checkWin()) {
        winState();
        return;
    }else if (checkDraw()){
        drawState();
        return;
    };
}

function getPos(target) {
    posX = target.id[3] - 1;
    posY = target.parentElement.id[3] - 1;
}

function resetBoard(){
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            board[i][j].innerText = '';
        }
    }
    player = 'X';
    winStateDiv.style.display = 'none';
    isWin = false;
}

function checkWin(){
    //rows 
    for (var i = 0; i < 3; i++) {
        if (board[i][0].innerText === board[i][1].innerText && board[i][1].innerText === board[i][2].innerText && board[i][0].innerText !== '') {
            winner = board[i][0].innerText;
            return true;
        }
    }

    //columns
    for (var i = 0; i < 3; i++) {
        if (board[0][i].innerText === board[1][i].innerText && board[1][i].innerText === board[2][i].innerText && board[0][i].innerText !== '') {
            winner = board[0][i].innerText;
            return true;
        }
    }

    //diagonals
    if (board[0][0].innerText === board[1][1].innerText && board[1][1].innerText === board[2][2].innerText && board[0][0].innerText !== '') {
        winner = board[0][0].innerText;
        return true;
    }

    if (board[0][2].innerText === board[1][1].innerText && board[1][1].innerText === board[2][0].innerText && board[0][2].innerText !== '') {
        winner = board[0][2].innerText;
        return true;
    }

    return false;
}

function checkDraw(){
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j].innerText === '') {
                return false;
            }
        }
    }
    return true;
}

function winState(){
    winStateDiv.innerText = winner + ' wins!';
    winStateDiv.style.display = 'block';
    isWin = true;
    if (winStateDiv.innerText.trim() !== '') {
        winStateDiv.classList.add('hasText');
    } else {
        winStateDiv.classList.remove('hasText');
    }
    setTimeout(function(){
        resetBoard();
    }, 2000);
    
}

function drawState(){
    winStateDiv.innerText = 'Draw!';
    winStateDiv.style.display = 'block';
    isWin = true;
    if (winStateDiv.innerText.trim() !== '') {
        winStateDiv.classList.add('hasText');
    } else {
        winStateDiv.classList.remove('hasText');
    }
    setTimeout(function(){
        resetBoard();
    }, 2000);
}

