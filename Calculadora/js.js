const btnLimpar = document.getElementById('btn-limpar');
const btnDeletar = document.getElementById('btn-deletar');
const btnNumero = document.querySelectorAll('.botao-numero');
const btnOperador = document.querySelectorAll('.botao-operador');
const btnIgual = document.querySelector('.botao-igual');
const visor = document.querySelector('.visor');

let primeiroNumero = "";
let operacaoEscolhida = "";
let novoNumero = false;

btnLimpar.addEventListener('click', function(){

    visor.innerHTML = "0";
    primeiroNumero = "";
    operacaoEscolhida = "";
    novoNumero = false;

});

btnDeletar.addEventListener('click', function(){

    let deletar = visor.innerHTML.slice(0, -1);

    if(deletar === ""){
        visor.innerHTML = "0";
    }
    else{
        visor.innerHTML = deletar;
    }
    
});

btnIgual.addEventListener('click', function(){

    if(operacaoEscolhida === ""){
        return;
    }

    let segundoNumero = visor.innerHTML;
    let resultado = 0;

    let n1 = parseFloat(primeiroNumero);
    let n2 = parseFloat(segundoNumero);

    if(operacaoEscolhida === "+"){
        resultado = n1 + n2;
    }
    else if(operacaoEscolhida === "-"){
        resultado = n1 - n2;
    }
    else if(operacaoEscolhida === "*"){
        resultado = n1 * n2;
    }
    else if(operacaoEscolhida === "/"){
        resultado = n1 / n2;
    }

    visor.innerHTML = resultado;

    primeiroNumero = "";
    operacaoEscolhida = ""
    novoNumero = true;

});

btnOperador.forEach(operador => {
    operador.addEventListener('click', function(){

        if(primeiroNumero !== "" && operacaoEscolhida !== ""){
            let segundoNumero = visor.innerHTML;
            let n1 = parseFloat(primeiroNumero);
            let n2 = parseFloat(segundoNumero);
            let resultado = 0;

            if(operacaoEscolhida === "+"){
                resultado = n1 + n2;
            }
            else if(operacaoEscolhida === "-"){
                resultado = n1 - n2;
            }
            else if(operacaoEscolhida === "*"){
                resultado = n1 * n2;
            }
            else if(operacaoEscolhida === "/"){
                resultado = n1 / n2;
            }

            visor.innerHTML = resultado;

            primeiroNumero = resultado.toString();
        }
        else{
            primeiroNumero = visor.innerHTML;
        }

        operacaoEscolhida = operador.textContent;
        novoNumero = true;

    });
});

btnNumero.forEach(numero => {
    numero.addEventListener('click', function(){

        let numeroClicado = numero.textContent;

            if(novoNumero === true){

                visor.innerHTML = numeroClicado;
                novoNumero = false;

            }
            else{

                if(visor.innerHTML === "0"){
                    visor.innerHTML = numeroClicado;
                }
                else{
                    visor.innerHTML += numeroClicado;
                }

            }

    });
});


