'use strict'
var gBoard =[]
var glevel
var gLevell

gLevell = { 
    SIZE: 16, 
    MINES: 2 
} 

// פונקציה שמחזירה אובייקט חדש
function createCell() {
  return {
    minesAroundCount:  gCount,
    isRevealed: false,
    isMine: false,
    isMarked: false
  }
}

function initGame(size) {

   buildBoard(size**.5)
   renderBoard(buildBoard(size**.5))
   console.log(gBoard);
   
   
    
}


function buildBoard(gLevel){

    for (var i = 0; i < gLevel; i++) {
        gBoard[i] = []
        
        for (var j = 0; j <gLevel; j++){
            
            gBoard[i][j]= createCell()
      
        }
    }
gBoard[0][0].isMine=true
 gBoard[1][1].isMine=true

// console.log(gBoard);

setMinesNegsCount() 
return gBoard

}

function renderBoard(){
   var strHtml =''

   for(var i =0; i<gBoard.length; i++){
    var row =gBoard[i]
    // console.log(row);
    strHtml += '\n<tr>'
    for(var j = 0; j<row.length; j++){
var csll =row[j]

        var CELLID =`cell-${i}-${j}`
        // console.log(CELLID);
        strHtml +=`\n\t<td id="${CELLID}"
        class="cell"
        onclick="warBomb(this, ${i}, ${j})"
        oncontextmenu =" return onRightClick(event, this, ${i}, ${j})">  </td>`
        //  </td>`
        
    }
     strHtml += '\n</tr>'
   }
   
    var elMat = document.querySelector('.game-board')
    // console.log(elMat);
    
elMat.innerHTML = strHtml

}

function warBomb(elCell, i, j){

const cell = gBoard[i][j];
     if (cell.isMarked || cell.isRevealed) return;

     cell.isRevealed = true;
   
   if(gBoard[i][j].isMine){
    elCell.innerHTML = '&#128163;'
    elCell.style.backgroundColor = 'red'
   
gameOver()
return
   } else if(gBoard[i][j].minesAroundCount!==gCount){
    // console.log(gBoard[i][j].minesAroundCount);
    var numbeBoard =gBoard[i][j].minesAroundCount
    elCell.innerHTML =numbeBoard
    elCell.style.backgroundColor = 'greenyellow'
   }else if(gBoard[i][j].minesAroundCount===0){
    elCell.style.backgroundColor = 'greenyellow'
   }
    
// minesAroundCount:  gCount
}

var gCount
 function setMinesNegsCount() {

    for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j <gBoard[i].length; j++) {
       gCount = 0;

      for (let x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue; // גבול

         for (let y = j - 1; y <= j + 1; y++) {
          if (y < 0 || y >= gBoard[x].length) continue; // גבול
          if (x === i && y === j) continue;  
        if (gBoard[x][y].isMine) gCount++;
      }
      
    }
    gBoard[i][j].minesAroundCount = gCount;
}
    
 }
 }


 function gameOver(){
    console.log('you lost the game');
    
 }
 function onRightClick(ev, elCell, i, j){
ev.preventDefault();
const cell = gBoard[i][j]
  if (cell.isRevealed) return false;
  cell.isMarked = !cell.isMarked;
elCell.innerHTML = cell.isMarked ? '🚩' : '';
return false;

 }





// var gBoard =[]
// var glevel

// //  var roalGame =  
// // { 
// //     minesAroundCount: 4, 
// //     isRevealed: false, 
// //     isMine: false, 
// //     isMarked: false 
// // }

// // פונקציה שמחזירה אובייקט חדש
// function createCell() {
//   return {
//     minesAroundCount: 0,
//     isRevealed: false,
//     isMine: false,
//     isMarked: false
//   }
// }
// // console.log(roalGame);


// function initGame(glevel) {

//      buildBoard(glevel**.5)
//      console.log(glevel**.5);
   
    
// }

// // glevel ** .5
// // glevel
// function buildBoard(glevel) {
//     console.log('llll');
    
//     // var gBoard = []
    
//     for (var i = 0; i < glevel; i++) {
//         gBoard[i] = []
//         for (var j = 0; j <glevel; j++){
//             console.log(glevel);
//             gBoard[i][j]= createCell()
      
//         }
//     }
// gBoard[0][0].isMine=true
// gBoard[1][1].isMine=true

// console.log(gBoard);


// return gBoard


// }

// var gBoard
// function initGame() {
//     gBoard = buildBoard()
//     // renderBoard(gBoard)
// }

// function buildBoard() {
//     var board = []
//     console.log('ooo');
    

//     for (var i = 0; i < 4; i++){
//         board[i] = []

//         for (var j = 0; j < 4; j++){
            
//              board[i][j] = roalGame
//         }
//     }
// }
