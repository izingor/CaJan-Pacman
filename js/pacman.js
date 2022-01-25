'use strict';
const PACMAN = `<img id = "pacman" src="../imgs/pacman.gif" />`;

var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;
    var direction = ev.key;
    var rotationAngle;
    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];
    if (nextCellContent === WALL) return;
    if (gPacman.isSuper && nextCellContent === GHOST) {

        for (var idx = 0; idx < gGhosts.length; idx++) {
            if (gGhosts[idx].location.i === nextLocation.i &&
                gGhosts[idx].location.j === nextLocation.j) {
                deadGhost.push(gGhosts.splice(idx, 1));
            }
        }
    } else if (nextCellContent === GHOST) {
        gameOver();
        return;
    };

    if (nextCellContent === FOOD) {
        updateScore(1);
        gFood = foodCounter(gBoard);
        console.log(gFood);
    }
    if (nextCellContent === BONUS) {
        updateScore(10);
    }
    if (gFood === 1) {
        victory();
        return;
    }
    if (nextCellContent === POWER) {
        if (gPacman.isSuper) return;
        power();
    }

    switch (direction) {
        case 'ArrowDown':
            rotationAngle = 'down';
            break;
        case 'ArrowUp':
            rotationAngle = 'up';
            break;
        case 'ArrowLeft':
            rotationAngle = 'left';
            break;
        case 'ArrowRight':
            rotationAngle = '';
            break;
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    renderCell(gPacman.location, EMPTY);
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    renderCell(gPacman.location, `<div  class = "${rotationAngle}">${PACMAN}</div>`);
}


function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j,
        key: ev.key
    };

    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }

    return nextLocation;
}


function power() {
    var cell = document.querySelectorAll('.cell');
    gPacman.isSuper = true;

    for (var i = 0; i < cell.length; i++) {
        cell[i].classList.add('power');
    }

    setTimeout(() => {
        for (var i = 0; i < cell.length; i++) {
            cell[i].classList.remove('power');
        }
        gPacman.isSuper = false;
        for (var i = 0; i < deadGhost.length; i++) {
            createGhost(gBoard);
        }
        deadGhost = [];
    }, 5000);
    // clearTimeout(timeOut);
    return;
};