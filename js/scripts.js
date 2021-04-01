function selecionarOpcao(event) {

    console.clear() //debug

    const elementoSelecionado = event.currentTarget;
    const pai = elementoSelecionado.parentNode.id

    console.log(elementoSelecionado)
    console.log(pai)

}

// lista com todas as opções clicáveis
const listaOpcoes = document.querySelectorAll(".opcao");
for (let i = 0; i < listaOpcoes.length; i++) {
    listaOpcoes[i].addEventListener("click", selecionarOpcao);
}