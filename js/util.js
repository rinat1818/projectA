'use strict'

// function buildBoard(rows, cols) {
//     const mat = []
//     for (var i = 0; i < rows; i++) {
//         const row = []
//         for (var j = 0; j < cols; j++) {
//             row.push('')
//         }
//         mat.push(row)
//     }
//     return mat
// }

// function getRandomInt(min, max) {
//   const minCeiled = Math.ceil(min);
//   const maxFloored = Math.floor(max);
//   return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
// }



function shuffle(items) {
    for (var i = items.length - 1; i > 0; i--) {
        const idx = Math.floor(Math.random() * (i + 1))
        const temp = items[i]
        items[i] = items[idx]
        items[idx] = temp
    }
}
// function getFormatedTimePassed(timeDiff) {
//     const seconds = Math.floor(timeDiff / 1000)
//     const milliSeconds = ((timeDiff - seconds * 1000) + '').padStart(3, '0')
//     return `${(seconds +'').padStart(2, '0')} : ${milliSeconds}`
//   }
//   function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
// }

// function renderBoard(mat, selector) {

//     var strHTML = '<table><tbody>'
//     for (var i = 0; i < mat.length; i++) {

//         strHTML += '<tr>'
//         for (var j = 0; j < mat[0].length; j++) {

//             const cell = mat[i][j]
//             const className = `cell cell-${i}-${j}`

//             strHTML += `<td class="${className}">${cell}</td>`
//         }
//         strHTML += '</tr>'
//     }
//     strHTML += '</tbody></table>'
    
//     const elContainer = document.querySelector(selector)
//     // elContainer.innerHTML = strHTML
// }
// function shuffle(items) {
//     for (var i = items.length - 1; i > 0; i--) {
//         const idx = Math.floor(Math.random() * (i + 1))
//         const temp = items[i]
//         items[i] = items[idx]
//         items[idx] = temp
//     }
// }


// const BOMBS_IMG = '<img src ="img/bomb.jpg"'
// console.log(BOMBS_IMG);




// var gNums = []

// var ggg
// var gcurrNums
// var glevel


// var BOMBS = 'BOMBS'

// function initGame(glevel) {
//     modelBombs(glevel)
//     renderBoard(glevel ** .5)
// }
// // gone()
// function modelBombs(glevel) {
//     // gNums = [];

//     for (var i = 0; i < glevel; i++) {

//         // gNums[1] = gNums[2] = BOMBS
//         gNums[i] = ''




//     }

//     shuffle(gNums)

//     //  return gNums

//     console.log(gNums);
// }


// renderBoard()
// function renderBoard(size) {



//     var elTable = document.querySelector('table')
//     // console.log(gNums);


//     // console.log(gNums);
//     const nums = gNums.slice();
//     // var nums = ['','','','','','','','','','','','','','','','']
//     // console.log(nums);

//     // console.log(elTable);
//     console.log(gNums);

//     var strHtml = ''
//     // var rootNum = Math.sqrt(gNums.length)
//     console.log();

//     // console.log(rootNum);

//     for (var i = 0; i <size; i++) {
//         strHtml += '<tr>'

//         for (var j = 0; j < size; j++) {
//             var currNum = nums.pop()
//             // console.log(currNum);
//             if (currNum === BOMBS) {
//                 currNum = BOMBS_IMG
//             }
//             var elImg = document.querySelector('img')
//             // console.log(el);


//             strHtml += `<td> 
//                                 <button onclick="onCellClicked(this, ${currNum})">
//                                 ${currNum}</td>`
//         }
//         strHtml += '</tr>'
//     }
//     elTable.innerHTML = strHtml


// }

// function onCellClicked(elBtn, square) {

//     console.log(elBtn);




// }

// // function onSetLevel(level){

// //     glevel = level
// //     initGame()
// // }