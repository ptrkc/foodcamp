const pedido = {
    prato: {},
    bebida: {},
    sobremesa: {},
    endereco: "",
    calcularTotal: function () {
        const Total = Number(this.prato.preco.replace(",", '.')) + Number(this.bebida.preco.replace(",", '.')) + Number(this.sobremesa.preco.replace(",", '.'));
        return String(Total.toFixed(2)).replace(".", ',');
    }
};

function selecionarOpcao(event) {

    console.clear() //debug

    const elementoSelecionado = event.currentTarget;
    const idPai = elementoSelecionado.parentNode.id;
    const itemSelecionado = elementoSelecionado.querySelector(".item").innerHTML;
    const precoSelecionado = elementoSelecionado.querySelector(".preco").innerHTML.slice(3);

    let categoriaSelecionada = "";

    if (idPai === "selecao-prato") {
        categoriaSelecionada = pedido.prato;
    } else if (idPai === "selecao-bebida") {
        categoriaSelecionada = pedido.bebida;
    } else {
        categoriaSelecionada = pedido.sobremesa;
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

    if (pedido.prato.item !== undefined &&
        pedido.bebida.item !== undefined &&
        pedido.sobremesa.item !== undefined) {
        ativarBotaoPedido();
    }
}

function ativarBotaoPedido() {
    const botaoPedir = document.getElementById("botao-pedir");
    botaoPedir.classList.replace('pedir-desativado', 'pedir-ativado');
    botaoPedir.addEventListener("click", fecharPedido);
    botaoPedir.innerHTML = "Fechar pedido"
}

function fecharPedido() {
    const overlay = document.getElementById("overlay-fechar-pedido");
    overlay.style.display = "flex";
    overlay.querySelector(".resumo").innerHTML = `
    <li><span>${pedido.prato.item}</span>${pedido.prato.preco
        }</li >
    <li><span>${pedido.bebida.item}</span>${pedido.bebida.preco
        }</li >
    <li><span>${pedido.sobremesa.item}</span>${pedido.sobremesa.preco
        }</li >
    <li><span>TOTAL</span>R$  ${pedido.calcularTotal()}</li>`
}

// lista com todas as opções clicáveis
const listaOpcoes = document.querySelectorAll(".opcao");
for (let i = 0; i < listaOpcoes.length; i++) {
    listaOpcoes[i].addEventListener("click", selecionarOpcao);
}