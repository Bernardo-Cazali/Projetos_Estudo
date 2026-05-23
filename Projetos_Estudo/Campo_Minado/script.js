const mensagemStatus = document.getElementById('mensagemStatus');
const tabuleiro = document.getElementById('tabuleiro');
const btnReiniciar = document.getElementById('btnReiniciar');
const musica = document.getElementById('musicaFundo');
musica.volume = 0.3;

const totalQuadrado = 81;
const totalBombas = 10;
const campoGeral = [];
let rodada = true;

for(let i = 0; i < totalBombas; i++){
    campoGeral.push('bomba');
}

for(let i = 0; i < (totalQuadrado - totalBombas); i++){
    campoGeral.push('vazio');
}

campoGeral.sort(() => Math.random() - 0.5);

for(let i = 0; i < totalQuadrado; i++){

    const quadrado = document.createElement('div');

    quadrado.classList.add('quadrado');

    quadrado.dataset.index = i;

    quadrado.addEventListener('click', function(){

        musica.play();

        if(!rodada){
            return;
        }

        const indice = quadrado.dataset.index;

        const mapaSecreto = campoGeral[indice];

        if(mapaSecreto === 'bomba'){
            musica.pause();
            quadrado.classList.add('bomba');
            quadrado.innerHTML = '💣';
            mensagemStatus.innerHTML = 'voce pisou na bomba';
            btnReiniciar.classList.remove('escondido');
            rodada = false;
        }
        else {
            const totalDeBombasAoRedor = contarBombas(indice);

            quadrado.classList.add('revelado');

            if (totalDeBombasAoRedor > 0) {
                quadrado.innerHTML = totalDeBombasAoRedor;
                quadrado.classList.add('n' + totalDeBombasAoRedor);
            } else {
                quadrado.innerHTML = '';
            }
        }
    });

    tabuleiro.appendChild(quadrado);

}

function contarBombas(indice){
    
    let bombasEncontradas = 0;

    const index = parseInt(indice);

    const esquerda = (index % 9 === 0);
    const direita = (index % 9 === 8);

    const posicao = [
        index - 9,
        index + 9,
        index - 1,
        index + 1,
        index - 10,
        index - 8,
        index + 8,
        index + 10,
    ];

    for (let v of posicao){
        if(v >= 0 && v < 81){
            if (esquerda && (v === index - 1 || v === index - 10 || v === index + 8)) continue;
        
            if(direita && (v === index + 1 || v === index - 8 || v === index + 10)) continue;

            if (campoGeral[v] === 'bomba') {
                bombasEncontradas++;
            }
        }
    }
    return bombasEncontradas;
};

btnReiniciar.addEventListener('click', function(){
    window.location.reload();
});