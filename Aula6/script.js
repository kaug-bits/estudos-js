let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

function adicionarTarefa() {
    const inputTarefa = document.getElementById("inputTarefa")
    let tarefa = inputTarefa.value.trim()

    const mensagem = document.getElementById("mensagem")

    if (tarefa == "") {
        let mensagemErro = "Digite uma tarefa para adicioná-la a sua lista!"
        mensagem.textContent = mensagemErro
    } else {
        let mensagemSucesso = "Tarefa adicionada com sucesso!"
        mensagem.textContent = mensagemSucesso
        tarefas.push(tarefa)
        localStorage.setItem("tarefas", JSON.stringify(tarefas))
        renderizarTarefas()
    }

    inputTarefa.value = ""
}

function renderizarTarefas() {
    const listaTarefas = document.getElementById("listaTarefas")
    listaTarefas.innerHTML = ""

    for (let i = 0; i < tarefas.length; i++){
        let novaTarefa = document.createElement("li")
        novaTarefa.textContent = tarefas[i]
        
        let botaoRemover = document.createElement("button")
        botaoRemover.className = "remover"
        botaoRemover.textContent = "Remover"
        botaoRemover.onclick = () => removerTarefa(i)

        let botaoEditar = document.createElement("button")
        botaoEditar.className = "editar"
        botaoEditar.textContent = "Editar"
        botaoEditar.onclick = () => editarTarefa(i)
        
        novaTarefa.appendChild(botaoRemover)
        novaTarefa.appendChild(botaoEditar)
        listaTarefas.appendChild(novaTarefa)
    }
}

function removerTarefa(i) {
    tarefas.splice(i, 1)
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    renderizarTarefas()
}   

function editarTarefa(i){
    let tarefaEditada = prompt("Edite a tarefa:")
    if(tarefaEditada && tarefaEditada.trim()!== ""){
        tarefas[i] = tarefaEditada
        localStorage.setItem("tarefas", JSON.stringify(tarefas))
        renderizarTarefas()
    }
}

function limparLista(){
    tarefas.length = 0
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    renderizarTarefas()
    const mensagem = document.getElementById("mensagem")
    mensagem.textContent = "Lista de tarefas limpa com sucesso!"
    
}
window.onload = function() {
    renderizarTarefas()
}