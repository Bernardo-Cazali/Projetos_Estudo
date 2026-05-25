const btnChutar = document.getElementById('btnChutar');
const btnReiniciar = document.getElementById('btnReiniciar');
const mensagemFeedback = document.getElementById('mensagemFeedback');
const mensagemTentativas = document.getElementById('mensagemTentativas');
const inputPalpite = document.getElementById('inputPalpite');
const mensagemRecorde = document.getElementById('mensagemRecorde');

let numeroAleatorio = Math.floor(Math.random() * 100) + 1;
console.log(numeroAleatorio);
let tentativas = 0;
let recorde = Infinity;
let JogoValido = true;

btnChutar.addEventListener('click', function(){

    let palpiteUsuario = parseInt(inputPalpite.value);

    if(JogoValido === false){
        return;
    }

    if (isNaN(palpiteUsuario) || palpiteUsuario < 1 || palpiteUsuario > 100){
        mensagemFeedback.innerHTML = "Por favor, digite um número válido entre 1 e 100!";
        return;
    }

    tentativas++;
    mensagemTentativas.innerHTML = 'Tentativas: ' + tentativas;

    if(inputPalpite.ariaPlaceholder === '0'){
        mensagemFeedback.innerHTML = "Digite um número";
    }

    if(palpiteUsuario > numeroAleatorio){
        mensagemFeedback.innerHTML = "Valor do chute maior que o número!";
    }
    else if(palpiteUsuario < numeroAleatorio){
        mensagemFeedback.innerHTML = "Valor do chute menor que o número";
    }
    else{

        if(tentativas < recorde){
            recorde = tentativas;
            mensagemRecorde.innerHTML = 'Melhor Pontuação: ' + recorde;
        }

        JogoValido = false;
        mensagemFeedback.innerHTML = "Parabéns! Você acertou";
        btnReiniciar.classList.remove('escondido');

    }

});

btnReiniciar.addEventListener('click', function(){
    JogoValido = true;
    tentativas = 0;
    mensagemTentativas.innerHTML = 'Tentativas: ' + tentativas;

    mensagemFeedback.innerHTML = "Boa sorte! Faça o seu primeiro chute.";

    numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    console.log(numeroAleatorio);

    btnReiniciar.classList.add('escondido');
});
