const quadrados = document.querySelectorAll('.quadrado');
const btnReiniciar = document.getElementById('btnReiniciar');
const mensagemStatus = document.getElementById('mensagemStatus');

let jogadorAtual = "X";
let jogoAtivo = true;
const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]     
];

function verificarVitoria() {
    for (let combinacao of combinacoesVitoria) {
        
        const pos1 = combinacao[0];
        const pos2 = combinacao[1]; 
        const pos3 = combinacao[2]; 

        const texto1 = quadrados[pos1].innerHTML;
        const texto2 = quadrados[pos2].innerHTML;
        const texto3 = quadrados[pos3].innerHTML;

        if (texto1 !== "" && texto1 === texto2 && texto2 === texto3) {
            
            mensagemStatus.innerHTML = "O jogador " + texto1 + " VENCEU! 🎉";
            
            btnReiniciar.classList.remove('escondido');

            jogoAtivo = false;
            
            return true; 
        }
    }
}

quadrados.forEach((quadrado) => {
    quadrado.addEventListener('click', function(){
        if(!jogoAtivo){
            return;
        }

        if(quadrado.innerHTML !== ""){
            return;
        }

        quadrado.innerHTML = jogadorAtual;

        quadrado.classList.add(jogadorAtual.toLowerCase());

        verificarVitoria();

        if (jogoAtivo) {
    
        const todosPreenchidos = Array.from(quadrados).every(q => q.innerHTML !== "");
    
        if (todosPreenchidos) {
        mensagemStatus.innerHTML = "Deu Velha!";
        btnReiniciar.classList.remove('escondido');
        jogoAtivo = false; 
        }
        }

        if(jogadorAtual === "X"){
            jogadorAtual = "O";
        }
        else{
            jogadorAtual = "X"; 
        }

    });
});

btnReiniciar.addEventListener('click', function(){

    jogadorAtual = "X";
    jogoAtivo = true;

    mensagemStatus.innerHTML = "Vez do jogador: X";
    btnReiniciar.classList.add('escondido');

    quadrados.forEach((quadrado) => {
        quadrado.innerHTML = "";
        quadrado.classList.remove('x');
        quadrado.classList.remove('o');
    });
});