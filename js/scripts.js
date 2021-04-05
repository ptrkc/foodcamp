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
const elementosSelecionados = { prato: "", bebida: "", sobremesa: "" }
const overlay = document.getElementById("overlay-fechar-pedido");
let elementoSelecionado = "";
function selecionarOpcao(event) {
    console.clear() //debug
    const elementoClicado = event.currentTarget;
    const idPai = elementoClicado.parentNode.id;
    let categoria = ""
    if (idPai === "selecao-prato") {
        categoria = "prato"
    } else if (idPai === "selecao-bebida") {
        categoria = "bebida"
    } else {
        categoria = "sobremesa"
    }
    if (elementoClicado !== elementosSelecionados[categoria]) {
        pedido[categoria].item = elementoClicado.querySelector(".item").innerHTML;
        pedido[categoria].preco = elementoClicado.querySelector(".preco").innerHTML.slice(3);
        elementoClicado.classList.add("selecionado");
        elementoClicado.querySelector(".check").classList.remove("escondido");
        if (elementosSelecionados[categoria] !== "") {
            elementosSelecionados[categoria].classList.remove("selecionado");
            elementosSelecionados[categoria].querySelector(".check").classList.add("escondido");
        }
        elementosSelecionados[categoria] = elementoClicado
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
    botaoPedir.textContent = "Fechar pedido"
}
function fecharPedido() {
    overlay.style.display = "flex";
    overlay.querySelector(".resumo").innerHTML = `
    <li><span>${pedido.prato.item}</span>${pedido.prato.preco}</li >
    <li><span>${pedido.bebida.item}</span>${pedido.bebida.preco}</li >
    <li><span>${pedido.sobremesa.item}</span>${pedido.sobremesa.preco}</li >
    <li><span>TOTAL</span>R$  ${pedido.calcularTotal()}</li>`
    const botaoTudoCerto = overlay.querySelector(".botao-tudo-certo");
    const botaoCancelar = overlay.querySelector(".botao-cancelar");
    botaoTudoCerto.addEventListener("click", tudoCerto);
    botaoCancelar.addEventListener("click", cancelarPedido);
}
function cancelarPedido() {
    overlay.style.display = "none";
    overlay.querySelector(".erro").classList.add("escondido");
}
function tudoCerto() {
    pedido.nome = overlay.querySelector(".nome").value
    pedido.endereco = overlay.querySelector(".endereco").value
    if (pedido.nome !== "" && pedido.endereco !== "") {
        let mensagem = `Olá, gostaria de fazer o pedido:
- Prato: ${pedido.prato.item}
- Bebida: ${pedido.bebida.item}
- Sobremesa: ${pedido.sobremesa.item}
Total: R$ ${pedido.calcularTotal()}\n
Nome: ${pedido.nome}
Endereço: ${pedido.endereco}`
        mensagem = encodeURIComponent(mensagem)
        whatsappUrl = "https://wa.me/5511999910621?text=" + mensagem;
        window.open(whatsappUrl, '_blank');
    } else {
        overlay.querySelector(".erro").classList.remove("escondido");
    }
}
const listaOpcoes = document.querySelectorAll(".opcao");
listaOpcoes.forEach(opcao => opcao.addEventListener("click", selecionarOpcao));