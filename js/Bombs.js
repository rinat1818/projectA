'use strict'

var gBoard = []
var gMercy
var gFirstClick = true;
var gIsGameOver = false;

var gIntervalId;
var gTimerStarted = false;

var glevel
var gLevell

var gelPlay = document.querySelector('.play span')



gLevell = {
    SIZE: 16,
    MINES: 2
}
var sizeBombs = gLevell.MINES

function createCell() {
    return {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false
    }
}


function initGame(totalCells) {

    gMercy = 3
    gFirstClick = true;
    gelPlay.innerHTML = '😀'

    stopTimer();
    gTimerStarted = false;
    const elTimer = document.querySelector('.timer');
    if (elTimer) elTimer.innerText = '00 : 000';

    gIsGameOver = false;

    if (totalCells === 16) {
        gLevell.MINES = 2
    } else if (totalCells === 36) {
        gLevell.MINES = 6
    } else if (totalCells === 64) {
        gLevell.MINES = 9
    } else {
        gLevell.MINES = 11
    }

    var elHeart1 = document.querySelector('.life1')
    var elHeart2 = document.querySelector('.life2')
    var elHeart3 = document.querySelector('.life3')

    if (elHeart1) { elHeart1.style.display = 'inline'; elHeart1.style.visibility = 'visible'; }
    if (elHeart2) { elHeart2.style.display = 'inline'; elHeart2.style.visibility = 'visible'; }
    if (elHeart3) { elHeart3.style.display = 'inline'; elHeart3.style.visibility = 'visible'; }


    var elspan = document.querySelector('h1 span')
    elspan.innerHTML = gLevell.MINES

    sizeBombs = gLevell.MINES

    var elWin = document.querySelector('.win')
    elWin.style.display = "none"

    var elLostGame = document.querySelector('.losing')
    elLostGame.style.display = "none"

    const sizeFloat = Math.sqrt(totalCells);
    const size = Math.floor(sizeFloat);

    if (size * size !== totalCells) {
        return;
    }

    gBoard = buildBoard(size);

    // placeMines(gBoard, gLevell.MINES);
    // setMinesNegsCount(gBoard)
    renderBoard();

}

function buildBoard(size) {

    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []

        for (var j = 0; j < size; j++) {

            board[i][j] = createCell()

        }
    }
    return board
}

function renderBoard() {
    var strHtml = ''

    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i]

        strHtml += '\n<tr>'
        for (var j = 0; j < row.length; j++) {
            var csll = row[j]

            var CELLID = `cell-${i}-${j}`

            strHtml += `\n\t<td id="${CELLID}"
            
            class="cell"
            onclick="warBomb(this, ${i}, ${j})"
            oncontextmenu =" return onRightClick(event, this, ${i}, ${j})">  </td>`
        }
        strHtml += '\n</tr>'
    }
    var elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHtml
}


function warBomb(elCell, i, j) {
    if (gIsGameOver) return;

    const cell = gBoard[i][j];
    if (cell.isMarked || cell.isRevealed) return;

    if (!gTimerStarted) {
        gTimerStarted = true;
        startTimer();
    }

    if (gFirstClick) {
        gFirstClick = false;


        placeMines(gBoard, gLevell.MINES);
        // console.log(gBoard);

        if (gBoard[i][j].isMine) {
            gBoard[i][j].isMine = false;

            while (true) {
                const x = Math.floor(Math.random() * gBoard.length);
                const y = Math.floor(Math.random() * gBoard.length);
                if ((x !== i || y !== j) && !gBoard[x][y].isMine) {
                    gBoard[x][y].isMine = true;
                    break;
                }
            }
        }

        setMinesNegsCount(gBoard);
    }

    cell.isRevealed = true;

    if (gBoard[i][j].isMine) {

        gMercy--
        // console.log(gMercy);

        elCell.innerHTML = '&#128163;'
        elCell.style.backgroundColor = 'red'

        if (gMercy === 2) {
            var elHeart1 = document.querySelector('.life1')
            elHeart1.style.display = 'none'

            setTimeout(() => {
                elCell.innerHTML = ''
                elCell.style.backgroundColor = 'yellow';
                gBoard[i][j].isRevealed = false
            }, 500)

        }
        if (gMercy === 1) {
            var elHeart2 = document.querySelector('.life2')
            elHeart2.style.display = 'none'
            setTimeout(() => {
                elCell.innerHTML = ''
                elCell.style.backgroundColor = 'yellow';
                gBoard[i][j].isRevealed = false
            }, 500)
        }
        if (gMercy === 0) {
            var elHeart3 = document.querySelector('.life3')
            elHeart3.style.display = 'none'

            gameOver()
        }

        return
    }

    const n = Number(cell.minesAroundCount) || 0;
    elCell.style.backgroundColor = 'greenyellow';

    if (n > 0) {
        elCell.innerText = n;
        elCell.style.color = getColorByCount(n);
    } else {
        elCell.innerText = '';

    }

    if (n === 0) expandReveal(gBoard, elCell, i, j)

    checkGameOver()
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var count = 0;

            for (let x = i - 1; x <= i + 1; x++) {
                if (x < 0 || x >= board.length) continue; 

                for (let y = j - 1; y <= j + 1; y++) {
                    if (y < 0 || y >= board[x].length) continue; 
                    if (x === i && y === j) continue;
                    if (board[x][y].isMine) count++;
                }
            }
            board[i][j].minesAroundCount = count;
        }
    }
}


function onRightClick(ev, elCell, i, j) {
    ev.preventDefault();
    if (gIsGameOver) return false;

    const cell = gBoard[i][j]
    if (cell.isRevealed) return false;

    if (!gTimerStarted) {
        gTimerStarted = true;
        startTimer();
    }

    cell.isMarked = !cell.isMarked;
    elCell.innerHTML = cell.isMarked ? '🚩' : '';

    if (cell.isMarked) {
        sizeBombs--;
    } else {
        sizeBombs++;
    }

    var elspan = document.querySelector('h1 span')
    elspan.innerHTML = sizeBombs

    checkGameOver()
    return false;

}

function expandReveal(board, elCell, i, j) {
    const size = board.length;
    const queue = [[i, j]];
    const seen = new Set([`${i},${j}`]);

    const revealCell = (cell, el) => {
        if (cell.isMarked || cell.isRevealed) return;
        cell.isRevealed = true;
        el.style.backgroundColor = 'greenyellow';
        el.innerText = cell.minesAroundCount || '';
        if (cell.minesAroundCount) {
            el.style.color = getColorByCount(cell.minesAroundCount);
        }
    };

    revealCell(board[i][j], elCell);

    while (queue.length) {
        const [ci, cj] = queue.shift();
        if (board[ci][cj].minesAroundCount > 0) continue;

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const [x, y] = [ci + dx, cj + dy];
                const key = `${x},${y}`;

                if (dx === 0 && dy === 0 || x < 0 || x >= size ||
                    y < 0 || y >= size || seen.has(key)) continue;

                const neighbor = board[x][y];
                if (neighbor.isMine || neighbor.isMarked) continue;

                seen.add(key);
                const el = document.getElementById(`cell-${x}-${y}`);
                if (el) revealCell(neighbor, el);

                if (!neighbor.minesAroundCount) queue.push([x, y]);
            }
        }
    }
}

function placeMines(board, minesCount) {
    const size = board.length;
    var placed = 0;

    while (placed < minesCount) {
        const i = Math.floor(Math.random() * size);
        const j = Math.floor(Math.random() * size);

        if (!board[i][j].isMine) {
            board[i][j].isMine = true;
            placed++;
        }
    }
}

function revealAllMines() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine) {
                gBoard[i][j].isRevealed = true;
                const elCell = document.querySelector(`#cell-${i}-${j}`);
                if (elCell) {
                    elCell.innerHTML = '💣';
                    elCell.style.backgroundColor = 'red';
                }
            }
        }
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////


