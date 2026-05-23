const boneco = document.getElementById('boneco');
const chute = document.getElementById('inputLetra');
const btnChutar = document.getElementById('btnChutar');
const temaPalavra = document.getElementById('temaPalavra');
const btnReiniciar = document.getElementById('btnReiniciar');
const listaErradas = document.getElementById('listaErradas');
const palavraSecreta = document.getElementById('palavraSecreta');
const mensagemStatus = document.getElementById('mensagemStatus');

const bancoDePalavras = [
    {palavra: 'COMPUTADOR', dica: 'Tecnologia'},
    {palavra: 'INTERNET', dica: 'Tecnologia'},
    {palavra: 'CELULAR', dica: 'Tecnologia'},
    {palavra: 'PROGRAMADOR', dica: 'Tecnologia'},
    {palavra: 'JAVASCRIPT', dica: 'Tecnologia'}
];

const fasesBoneco = [
    `  +---+
  |   |
      |
      |
      |
      |
=========`, 
    `  +---+
  |   |
  O   |
      |
      |
      |
=========`, 
    `  +---+
  |   |
  O   |
  |   |
      |
      |
=========`, 
    `  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`, 
    `  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`, 
    `  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`, 
    `  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
========= 
*Deu forca*` 
];

let palavraEscolhida = "";
let dicaEscolhida = "";
let letrasAcertadas = [];
let letrasErradas = [];

function iniciarJogo(){
    const indiceAleatorio = Math.floor(Math.random() * bancoDePalavras.length);
    const itemSorteado = bancoDePalavras[indiceAleatorio];

    palavraEscolhida = itemSorteado.palavra.toUpperCase();
    dicaEscolhida = itemSorteado.dica;

    temaPalavra.innerHTML = dicaEscolhida;

    let visualPalavra = '';
    for (let i = 0; i < palavraEscolhida.length; i++){
        visualPalavra += '_ ';
    }

    palavraSecreta.innerHTML = visualPalavra;

    listaErradas.innerHTML = 'Nenhuma';
};  

btnChutar.addEventListener('click', function(){
    const letra = chute.value.trim().toUpperCase();

    chute.value = '';
    chute.focus();

    if(letra === ''){
        mensagemStatus.innerHTML = "Digite uma letra antes de chutar!";
        return;
    }

    if(letrasAcertadas.includes(letra) || letrasErradas.includes(letra)){
        mensagemStatus.innerHTML = "Essa letra já foi escolhida!";
        return;
    }

    if(palavraEscolhida.includes(letra)){
        letrasAcertadas.push(letra);
        mensagemStatus.innerHTML = `Boa, a letra ${letra} existe!`;
        atualizarPalavraNaTela();
    }
    else{
        letrasErradas.push(letra);
        mensagemStatus.innerHTML = `Hmm, a letra ${letra} não existe`;

        atualizarErrosNaTela();
    }
});

function atualizarPalavraNaTela(){
    let visualPalavra = '';

    for(let i = 0; i < palavraEscolhida.length; i++){
        const letraAtual = palavraEscolhida[i];

        if(letrasAcertadas.includes(letraAtual)){
            visualPalavra += letraAtual + ' ';
        }
        else{
            visualPalavra += '_ ';
        }
    }

    palavraSecreta.innerHTML = visualPalavra;

    if(!visualPalavra.includes('_')){
        mensagemStatus.innerHTML = "Parabéns, Você ganhou!";
        btnReiniciar.classList.remove('escondido');
        btnChutar.disabled = true;
    }
};

function atualizarErrosNaTela() {

    listaErradas.innerHTML = letrasErradas.join(', ');

    const totalErros = letrasErradas.length;

    boneco.innerHTML = fasesBoneco[totalErros];

    if (totalErros === 6) {
        mensagemStatus.innerHTML = `Fim de Jogo! A palavra era: ${palavraEscolhida}`;
        btnReiniciar.classList.remove('escondido');
        btnChutar.disabled = true; 
    }
}

btnReiniciar.addEventListener('click', function(){
    window.location.reload();
});


iniciarJogo();








