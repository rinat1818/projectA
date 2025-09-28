'use strict'
var gBoard = []
var glevel
var gLevell

gLevell = {
    SIZE: 16,
    MINES: 2
}


function createCell() {
    return {
        minesAroundCount: 0,
        isRevealed: false,
        isMine: false,
        isMarked: false
    }
}

function initGame(totalCells) {

    if(totalCells===16){
      gLevell.MINES=2
    }else if(totalCells===36){
        gLevell.MINES=6
    }else if(totalCells===64){
        gLevell.MINES===9
    }

    var elWin = document.querySelector('.win')
    elWin.style.display = "none"

    const sizeFloat = Math.sqrt(totalCells);
    const size = Math.floor(sizeFloat);
    if (size * size !== totalCells) {
        
        return;
    }

    // איפוס UI – מציג טבלה, מסתיר מודאל הפסד
    const elTable = document.querySelector('.game-board');
    const elModal = document.querySelector('.modal');
    if (elTable) elTable.style.display = 'table';
    if (elModal) elModal.style.display = 'none';


    gBoard = buildBoard(size);
    console.log(gBoard);

    
    placeMines(gBoard, gLevell.MINES);
    setMinesNegsCount(gBoard)
    renderBoard();
    // console.log(gBoard);
    
    
    console.log('initGame → size:', size, 'board:', gBoard.length + 'x' + gBoard.length);
}

// }


function buildBoard(size) {
    
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        
        for (var j = 0; j < size; j++) {
            
            board[i][j] = createCell()
            
        }
    }
    // if (size > 1) {
    //     board[0][0].isMine = true
    //     board[1][1].isMine = true
    //     board[2][2].isMine = true

    // }


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
            // console.log(CELLID);
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

    const cell = gBoard[i][j];
    if (cell.isMarked || cell.isRevealed) return;

    cell.isRevealed = true;

    if (gBoard[i][j].isMine) {
        elCell.innerHTML = '&#128163;'
        elCell.style.backgroundColor = 'red'

        var lost = setTimeout(() => {
            console.log('kkkk');

            gameOver()
        }, 700


        )

        return
    }
    const n = cell.minesAroundCount | 0;   // להפוך למספר בטוח
    elCell.style.backgroundColor = 'greenyellow';
    elCell.textContent = n > 0 ? n : '';   // מציגים מספר רק אם > 0



    checkGameOver()

}


function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var count = 0;

            for (let x = i - 1; x <= i + 1; x++) {
                if (x < 0 || x >= board.length) continue; // גבול

                for (let y = j - 1; y <= j + 1; y++) {
                    if (y < 0 || y >= board[x].length) continue; // גבול
                    if (x === i && y === j) continue;
                    if (board[x][y].isMine) count++;
                }

            }
            board[i][j].minesAroundCount = count;
        }

    }
}


function gameOver() {

    var elLost = document.querySelector('.modal')
    var elTable = document.querySelector('.game-board')
    console.log(elTable);
    elTable.style.display = "none"
    elLost.style.display = "initial";


}
function onRightClick(ev, elCell, i, j) {
    ev.preventDefault();
    const cell = gBoard[i][j]
    if (cell.isRevealed) return false;
    cell.isMarked = !cell.isMarked;
    elCell.innerHTML = cell.isMarked ? '🚩' : '';

    checkGameOver()
    return false;

}
function checkGameOver() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            // console.log(cell);


            if (cell.isMine) {
                if (!cell.isMarked) return false
            } else {
                if (!cell.isRevealed) return false
            }
        }
    }
    var elWin = document.querySelector('.win')

    elWin.style.display = "initial";


}


function placeMines(board, minesCount) {
  const size = board.length; 
  let placed = 0;

  while (placed < minesCount) {
    const i = Math.floor(Math.random() * size);
    const j = Math.floor(Math.random() * size);

    if (!board[i][j].isMine) {
      board[i][j].isMine = true;
      placed++;
    }
  }
}

