const pedido = { prato: {}, bebida: {}, sobremesa: {}, endereco: "", calcularTotal: function () { return (this.prato.preco + this.bebida.preco + this.sobremesa.preco).toFixed(2) } };

function selecionarOpcao(event) {

    console.clear() //debug

    const elementoSelecionado = event.currentTarget;
    const idPai = elementoSelecionado.parentNode.id
    const itemSelecionado = elementoSelecionado.querySelector(".item").innerHTML
    let precoSelecionado = elementoSelecionado.querySelector(".preco").innerHTML
    precoSelecionado = parseFloat(precoSelecionado.slice(3).replace(/,/, '.'));

    let categoriaSelecionada = "";

    if (idPai === "selecao-prato") {
        categoriaSelecionada = pedido.prato
    } else if (idPai === "selecao-bebida") {
        categoriaSelecionada = pedido.bebida
    } else {
        categoriaSelecionada = pedido.sobremesa
    }

    categoriaSelecionada.item = itemSelecionado
    categoriaSelecionada.preco = precoSelecionado

    console.log(pedido) //debug

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