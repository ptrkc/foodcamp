const pratoSelecionado = {};
const bebidaSelecionada = {};
const sobremesaSelecionada = {};

function selecionarOpcao(event) {

    console.clear() //debug
    const elementoSelecionado = event.currentTarget;
    const idPai = elementoSelecionado.parentNode.id
    const itemSelecionado = elementoSelecionado.querySelector(".item").innerHTML
    const precoSelecionado = elementoSelecionado.querySelector(".preco").innerHTML
    if (idPai === "selecao-prato") {
        pratoSelecionado.prato = itemSelecionado
        pratoSelecionado.preco = precoSelecionado
    } else if (idPai === "selecao-bebida") {
        bebidaSelecionada.prato = itemSelecionado
        bebidaSelecionada.preco = precoSelecionado
    } else {
        sobremesaSelecionada.prato = itemSelecionado
        sobremesaSelecionada.preco = precoSelecionado
    }

    elementoSelecionado.classList.add("selecionado");
    elementoSelecionado.querySelector(".check").classList.remove("escondido");
    const outrasOpcoes = document.getElementById(idPai).querySelectorAll(".opcao");
    for (let i = 0; i < outrasOpcoes.length; i++) {
        if (outrasOpcoes[i] !== elementoSelecionado) {
            outrasOpcoes[i].classList.remove("selecionado");
            outrasOpcoes[i].querySelector(".check").classList.add("escondido");
        }
    }
}

// lista com todas as opções clicáveis
const listaOpcoes = document.querySelectorAll(".opcao");
for (let i = 0; i < listaOpcoes.length; i++) {
    listaOpcoes[i].addEventListener("click", selecionarOpcao);
}