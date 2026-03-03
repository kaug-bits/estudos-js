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
            concluida: false
        })
        atualizarAplicacao()
    }

    inputTarefa.value = ""
    inputTarefa.focus()
}

function renderizarTarefas() {
    
    listaTarefas.innerHTML = ""

    for (let i = 0; i < tarefas.length; i++){
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i].texto

        if(tarefas[i].concluida){
            novaTarefa.classList.add("concluida")
        }
        
        let botaoConcluir = document.createElement("button")
        botaoConcluir.className = "concluir"
        botaoConcluir.textContent = tarefas[i].concluida ? "Desfazer" : "Concluir"
        botaoConcluir.onclick = () => concluirTarefa(i)
        
        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerTarefa(i)

        let botaoEditar = document.createElement("button")
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => editarTarefa(i)
        
        novaTarefa.appendChild(botaoConcluir)
        novaTarefa.appendChild(botaoRemover)
        novaTarefa.appendChild(botaoEditar)
        
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