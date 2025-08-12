let gameSeq = [];
let userSeq = [];
let btns = ['red', 'yellow', 'green', 'purple'];

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0;    

let h2 = document.querySelector('h2');

h2.innerHTML = `Press any key to start the game. <br> High Score: ${highScore}`;

document.addEventListener("keydown", startGame);
document.addEventListener("touchstart", startGame);

function startGame() {
    if (started == false) {
        // console.log("Game is started");
        started = true;

        levelUp();
    }
}

function gameFlash(btn) {
    btn.classList.add('flash');
    setTimeout(function() {
        btn.classList.remove('flash');
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level is ${level} <br> High Score: ${highScore}`;

    // random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    // console.log(randIdx);
    // console.log(randBtn);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log('Curr level: ', level);

    if(userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
         if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore); // save high score
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector('body').style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    gameFlash(btn);

    userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(let btn of allBtns) {
    btn.addEventListener('click', btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

