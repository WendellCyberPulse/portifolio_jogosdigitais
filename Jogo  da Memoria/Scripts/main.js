const emojis = [
    "😈",
    "😈",
    "👽",
    "👽",
    "👾",
    "👾",
    "👻",
    "👻",
    "🤡",
    "🤡",
    "💀",
    "💀",
    "🐱‍👤",
    "🐱‍👤",
    "🤖",
    "🤖",
];

let openCards = [];

let ShufflesEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2: -1))

for (let i=0; i < emojis.length; i++){
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = ShufflesEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".Game").appendChild(box);
}

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
    console.log(openCards);
}


function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        console.log("Cartas são iguais.");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        console.log("Cartas são diferentes!");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Vitória!! Fim de Jogo");
    }
}