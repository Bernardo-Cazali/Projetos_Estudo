const mensagemStatus = document.getElementById('mensagemStatus');
const painel = document.getElementsByClassName('painel');
const tabuleiroInimigo = document.getElementById('tabuleiroInimigo');
const btnReiniciar = document.getElementById('btnReiniciar');

const totalQuadrados = 100;
let rodadaAtiva = true;
let acertosParaVencer = 9;
let naviosDestruidos = 0;
let tirosRestantes = 30;

const mapaSecreto = Array(totalQuadrados).fill('agua');

mapaSecreto[12] = 'navio';
mapaSecreto[13] = 'navio';
mapaSecreto[14] = 'navio';
mapaSecreto[15] = 'navio';
mapaSecreto[38] = 'navio';
mapaSecreto[48] = 'navio';
mapaSecreto[58] = 'navio';
mapaSecreto[82] = 'navio';
mapaSecreto[83] = 'navio';

for(let i = 0; i < totalQuadrados; i++){
    const quadrado = document.createElement('div');
    quadrado.classList.add('quadrado');
    quadrado.dataset.index = i;

    quadrado.addEventListener('click', function(){
        atirar(quadrado, i);
    });

    tabuleiroInimigo.appendChild(quadrado);
}

function atirar(quadrado, index) {
    if (!rodadaAtiva || quadrado.classList.contains('agua') || quadrado.classList.contains('fogo')) {
        return;
    }

    tirosRestantes--;

    if (mapaSecreto[index] === 'navio') {
        quadrado.classList.add('fogo');
        naviosDestruidos++;

        if (naviosDestruidos === acertosParaVencer) {
            mensagemStatus.innerHTML = '🎖️ VITÓRIA! Você afundou a frota antes de ficar sem munição!';
            rodadaAtiva = false;
            btnReiniciar.classList.remove('escondido');
            return;
        } else {
            mensagemStatus.innerHTML = `💥 DIRETO NO ALVO! Tiros restantes: ${tirosRestantes}`;
        }
    } 
    else{
        quadrado.classList.add('agua');
        mensagemStatus.innerHTML = `• Água! Tiros restantes: ${tirosRestantes}`;
    }
    if (tirosRestantes === 0 && naviosDestruidos < acertosParaVencer) {
        mensagemStatus.innerHTML = '☠️ GAME OVER! Sua munição acabou e a frota inimiga escapou!';
        rodadaAtiva = false;
        btnReiniciar.classList.remove('escondido');
    }
}

btnReiniciar.addEventListener('click', function() {
    window.location.reload();
});
