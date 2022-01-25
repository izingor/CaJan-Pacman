'use strict';
const WALL = '₪';
const FOOD = '.';
const EMPTY = ' ';
const POWER = '⚡️';
const BONUS = '🥓';


var bonusInterval;
var gFood;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
};

function init() {

    document.querySelector('.msg').innerHTML = '';

    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    bonusInterval = setInterval(bonus, 7000);
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
            if ((i === 1 && j === 1) ||
                (i === 1 && j === SIZE - 2) ||
                (i === SIZE - 2 && j === 1) ||
                (i === SIZE - 2 && j === SIZE - 2)) {
                board[i][j] = POWER;
            }

            if (board[i][j] === FOOD) gFood++;
        }
    }
    return board;
}



function updateScore(diff) {
    // model
    gGame.score += diff;

    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var msg = document.querySelector('.msg');
    msg.innerHTML = '<div class=".game-over">GAME OVER</div><div class ="btn" onclick="init()">PLAY AGAIN</div>';
    gGame.score = 0;
    gFood = 0;
    document.querySelector('h2 span').innerText = gGame.score;

}


function victory() {
    clearInterval(gIntervalGhosts);
    gGame.isOn = false;
    gGame.score = 0;
    gFood = 0;
    var msg = document.querySelector('.msg');
    msg.innerHTML = '<div class=".game-over">VICTORY</div><div class="btn" onclick="init()">PLAY AGAIN</div>';
    document.querySelector('h2 span').innerText = gGame.score;

}


function bonus(board) {
    var cells = [];
    var cell;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                cell = { i: i, j: j };
                cells.push(cell);

            } else {
                continue;
            }
        }
    }
    cells = shuffleArray(cells);
    gBoard[cells[0].i][cells[0].j] = BONUS;
    renderCell(cells[0], BONUS);
}

function foodCounter(board) {

    var foodCount = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (board[i][j] === FOOD) foodCount++;

        }
    }
    return foodCount;
}