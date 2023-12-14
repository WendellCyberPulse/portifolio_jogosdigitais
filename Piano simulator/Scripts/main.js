// Seleciona todas as teclas do piano
const pianoKeys = document.querySelectorAll(".piano-keys .keys");

// Seleciona o controle deslizante de volume
const volumeSlider = document.querySelector(".Volume-control input");

//controle do chek box
const KeysCheck = document.querySelector(".keys-Check input");


// Cria uma instância de áudio com um som padrão
let audio = new Audio("./sonds/a.wav");


// Array para mapear as teclas do piano
let mapedKeys = [];


// Função para reproduzir uma nota ao clicar em uma tecla
const playTune = (key) => {
    audio.src = `sonds/${key}.wav`;
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);

    // Verifica se clickedKey é diferente de null antes de acessar sua classList
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => {
            clickedKey.classList.remove("active");
        }, 150);
    }
};

// Adiciona um ouvinte de evento de clique para cada tecla do piano
pianoKeys.forEach((key) => {
    console.log(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

// Adiciona um ouvinte de evento para a tecla do teclado
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    playTune(e.key);
    console.log(e.key);
});

// Função para lidar com a mudança de volume
const handleVolume = (e) => {
    // Converte o valor para um número entre 0 e 10
    const volumeValue = Math.min(10, Math.max(0, parseFloat(e.target.value)));
    
    // Normaliza o valor para o intervalo [0, 1] dividindo por 10
    const normalizedVolume = volumeValue / 10;
    
    audio.volume = normalizedVolume;
}



volumeSlider.addEventListener("input", handleVolume);

const showHidekeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

KeysCheck.addEventListener("click",showHidekeys)