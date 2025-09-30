'use strict'


function getFormatedTimePassed(timeDiff) {
    const seconds = Math.floor(timeDiff / 1000)
    const milliSeconds = ((timeDiff - seconds * 1000) + '').padStart(3, '0')
    return `${(seconds + '').padStart(2, '0')} : ${milliSeconds}`
}

function startTimer() {
    if (gIntervalId != null) return;
    const elTimer = document.querySelector(".timer");
    const startTime = Date.now();

    gIntervalId = setInterval(() => {
        const timeDiff = Date.now() - startTime;
        const timePassed = getFormatedTimePassed(timeDiff);
        elTimer.innerText = timePassed;
    }, 31);
}

function stopTimer() {
    if (gIntervalId) {
        clearInterval(gIntervalId);
        gIntervalId = null;
    }
}

function getColorByCount(count) {
    switch (count) {
        case 1: return 'blue';
        case 2: return 'red';
        case 3: return 'purple';
        case 4: return 'orange';
        case 5: return 'maroon';
        case 6: return 'turquoise';
        case 7: return 'black';
        case 8: return 'gray';
    }
}


function checkGameOver() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = gBoard[i][j]
            
            if (cell.isMine) {
                if (!cell.isMarked) return false
            } else {
                if (!cell.isRevealed) return false
            }

        }
    }
    stopTimer();                 // ← לעצור את הטיימר כאן
    gIsGameOver = true;
    var elWin = document.querySelector('.win')
    elWin.style.display = "initial";

    gelPlay.innerHTML = '🥳'
    return true;
}


function gameOver() {

    if (gIsGameOver) return;  
    stopTimer();

    revealAllMines();
    gIsGameOver = true

    var elLostGame = document.querySelector('.losing')
    elLostGame.style.display = "initial";


    gelPlay.innerHTML = '🤮'
}