let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

const inputTarefa = document.getElementById("inputTarefa")
const listaTarefas = document.getElementById("listaTarefas")
const mensagem = document.getElementById("mensagem")

function adicionarTarefa() {
    
    let tarefa = inputTarefa.value.trim()

    

    if (tarefa == "") {
        let mensagemErro = "Digite uma tarefa para adicioná-la a sua lista!"
        mensagem.textContent = mensagemErro
    } else {
        let mensagemSucesso = "Tarefa adicionada com sucesso!"
        mensagem.textContent = mensagemSucesso
        tarefas.push({
            texto: tarefa,
            concluida: false,
            
            dataHora: new Date().toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        })
        atualizarAplicacao()
    }

    inputTarefa.value = ""
    inputTarefa.focus()
}

function renderizarTarefas() {
    listaTarefas.innerHTML = ""  

    for (let i = 0; i < tarefas.length; i++) {
  
        let novaTarefa = document.createElement("li")
        novaTarefa.className = "tarefa-item"
        if (tarefas[i].concluida) {
            novaTarefa.classList.add("concluida")
        }

        
        let conteudo = document.createElement("div")
        conteudo.className = "conteudo-tarefa"

     
        let textoTarefa = document.createElement("span")
        textoTarefa.textContent = tarefas[i].texto
        textoTarefa.className = "texto-tarefa"

        
        let infoTarefa = document.createElement("span")
        infoTarefa.className = "info-tarefa"
        infoTarefa.textContent = tarefas[i].dataHora

        conteudo.appendChild(textoTarefa)
        conteudo.appendChild(infoTarefa)

      
        let botoes = document.createElement("div")
        botoes.className = "botoes-tarefa"

        let botaoConcluir = document.createElement("button")
        botaoConcluir.className = "concluir"
        botaoConcluir.textContent = tarefas[i].concluida ? "Desfazer" : "Concluir"
        botaoConcluir.onclick = () => concluirTarefa(i)

        let botaoEditar = document.createElement("button")
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => editarTarefa(i)

        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerTarefa(i)

        botoes.appendChild(botaoConcluir)
        botoes.appendChild(botaoEditar)
        botoes.appendChild(botaoRemover)

        
        novaTarefa.appendChild(conteudo)
        novaTarefa.appendChild(botoes)

        listaTarefas.appendChild(novaTarefa)
    }
}

function removerTarefa(i) {
    tarefas.splice(i, 1)
    atualizarAplicacao()
}  
function editarTarefa(i){
    let tarefaEditada = prompt("Edite a tarefa:")
    if(tarefaEditada && tarefaEditada.trim()!== ""){
        tarefas[i].texto = tarefaEditada
        atualizarAplicacao()
    }
}

function limparLista(){
    if (!confirm("Tem certeza que deseja limpar toda a lista?")) return

    tarefas.length = 0
    atualizarAplicacao()
    mensagem.textContent = "Lista de tarefas limpa com sucesso!"
}

function concluirTarefa(i){
    tarefas[i].concluida = !tarefas[i].concluida
    atualizarAplicacao()
}


inputTarefa.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa()
    }
})
function atualizarAplicacao() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    renderizarTarefas()
}
 
document.addEventListener("DOMContentLoaded", () => {
    renderizarTarefas()
    inputTarefa.focus()
})