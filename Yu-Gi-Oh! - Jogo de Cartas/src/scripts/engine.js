const state = {
    // definindo o score do player e do rival
    score:{
        playerScore: 0,
        rivalScore: 0,
        scoreBox: document.getElementById("score_points"),

    },

    // definindo as sprites das cartas

    cardSprites:{
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },

    // definindo os lados 

    fieldCard:{
        playerCard: document.getElementById("Player-card"),
        inimieCard: document.getElementById("inimie-card"),
    },

    action:{
    button: document.getElementById("next-duel"),
    },
};



const playerSides = {
    player: "Player",
    rival: "oponente",
}

// instaciando as imagens das cartas

const pathImages = "./src/assets/icons/";

const CardData = [
    {
        id: 0,
        Name: "Dragão Branco de Olhos Azuis",
        Type: "Papel" ,
        img: `${pathImages}dragon.png`,
        WinOf:[1],
        LoseOf:[2],
    },
    
    {
        id: 1,
        Name: "Mago Negro",
        Type: "Pedra" ,
        img: `${pathImages}magician.png`,
        WinOf:[2],
        LoseOf:[0],
    },

    {
        id: 2,
        Name: "Exodia",
        Type: "Tesoura" ,
        img: `${pathImages}exodia.png`,
        WinOf:[0],
        LoseOf:[1],
    },
    
    
];

async function getRandomCardID() {
    const randomIndex  = Math.floor(Math.random() * CardData.length);
    return CardData[randomIndex].id;
}

async function createCardImage(IdCard, fieldSide) {
    const CardImage = document.createElement("img");
    CardImage.setAttribute("height", "100px");
    CardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    CardImage.setAttribute("data-id", IdCard);
    CardImage.classList.add("card");


    if(fieldSide === playerSides.player){
        CardImage.addEventListener("click", () => {
            setCardsField(CardImage.getAttribute("data-id"));
        } );

        CardImage.addEventListener("mouseover", () => drawSelectCard(IdCard) );

    }



    return CardImage;
}

async function setCardsField(cardId){
    await removeAllcardImages();

    // remove todas as cartas 

    let rivalCardId = await getRandomCardID();

    state.fieldCard.playerCard.style.display = "block";
    state.fieldCard.inimieCard.style.display = "block";

    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.cardSprites.avatar.src = "";

    state.fieldCard.playerCard.src = CardData[cardId].img;
    state.fieldCard.inimieCard.src = CardData[rivalCardId].img;

    // checa o resultado de uma carta com outra 

     let duelResult = await resultadoDuelo(cardId, rivalCardId);

    await updateScore();
    await drawButtom(duelResult);
    
}

async function updateScore(){
state.score.scoreBox.innerText = `Win : ${state.score.playerScore} | Lose : ${state.score.rivalScore}`
}

async function resultadoDuelo(playerCardId, RivalCardId){
    let resultadoduelo = "Empate!";
    let cartaJogador = CardData[playerCardId];

    if (cartaJogador.WinOf.includes(RivalCardId)) {
        resultadoduelo = "Vitória!";
        await AudioPlay("win");
        state.score.playerScore++;
    }

    if (cartaJogador.LoseOf.includes(RivalCardId)) {
        resultadoduelo ="Perdeu!";
        await  AudioPlay("lose");
        state.score.rivalScore++;
    }

    return resultadoduelo;
}

async function drawButtom(text){
    state.action.button.innerText = text.toUpperCase();
    state.action.button.style.display = "block";
}

async function removeAllcardImages(){
    let cards = document.querySelector(".card_box.framed#oponente");
    let imageElemente = cards.querySelectorAll("img");
    imageElemente.forEach((img) => img.remove());

    cards = document.querySelector(".card_box.framed#Player");
    imageElemente = cards.querySelectorAll("img") ;
    imageElemente.forEach((img) => img.remove());
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = CardData[index].img;
    state.cardSprites.name.innerText = CardData[index].Name;
    state.cardSprites.type.innerText = "Attribute : " + CardData[index].Type
}

// fazendo as cartas serem aleatorias no nosso deck

async function drawCard(cardNumber, fieldSide) {
    for (let i = 0; i < cardNumber; i++) {
        const randomIDcard = await getRandomCardID();
        const CardImage = await createCardImage(randomIDcard,fieldSide);

        document.getElementById(fieldSide).appendChild(CardImage);
    }
}

async function resetGame() {
    state.cardSprites.avatar.src = "";
    state.action.button.style.display = "none";

    state.fieldCard.playerCard.style.display = "none";
    state.fieldCard.inimieCard.style.display = "none";
    Start();
}

async function AudioPlay(status){
    const audio = new Audio (`./src/assets/audios/${status}.wav`);
    audio.play();
}

// função Start do jogo 
function Start() {
    state.fieldCard.playerCard.style.display = "none";
    state.fieldCard.inimieCard.style.display = "none";

    drawCard(5,playerSides.player);
    drawCard(5,playerSides.rival);

    const som = document.getElementById("trilha-som");

    som.play();
}

Start()