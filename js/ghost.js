'use strict';


const GHOST = '👻';
// '&#9781;';

var deadGhost = [];
var gGhosts = [];
var gIntervalGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: randomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 1000);
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
    }
}

function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    };
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    if (gBoard[ghost.location.i][ghost.location.j] === BONUS) ghost.currCellContent = BONUS;
    if (nextCellContent === PACMAN) {
        if (gPacman.isSuper) return;
        gameOver();
        return;
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    renderCell(ghost.location, ghost.currCellContent);
    ghost.location = nextLocation;
    ghost.currCellContent = nextCellContent;
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    renderCell(ghost.location, `<span style="color:${ghost.color}">${GHOST}</span>`);
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}


function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`;
}