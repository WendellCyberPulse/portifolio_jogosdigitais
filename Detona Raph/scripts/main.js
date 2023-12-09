const state ={
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        Time: document.querySelector("#Time-left"),
        score: document.querySelector("#score"),
    },

    values:{
        TimerID: null,
        countDownTimerID: setInterval(countDown,1000),
        gamerVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.Time.textContent = state.values.currentTime;


    if (state.values.currentTime <= 0) {
        clearInterval(state.values.countDownTimerID);
        clearInterval(state.values.TimerID);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

// Insere o som do jogo

function Sound() {
    let audio = new Audio("./src/sound/");
    audio.volume = 0.2;
    audio.play();
}

// move o detona ralph na tela
function moveEnemy() {
    state.values.TimerID = setInterval(randomSquare, state.values.gamerVelocity);

}

// define a aleatoriade do movimento do Ralph

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    } );

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

// indetifica o clique do mouse no Ralph e soma os Scores.

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                Sound();
            }
        })
    })
}

function start() {
    randomSquare();
    moveEnemy();
    addListenerHitBox();
}

start();