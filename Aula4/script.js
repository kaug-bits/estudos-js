let tarefas = []
function adicionarTarefa() {

    


    const inputTarefa = document.getElementById("inputTarefa")
    let tarefa = inputTarefa.value.trim()

    const mensagem = document.getElementById("mensagem")

    if (tarefa == ""){
        let mensagemErro = "Digite uma tarefa para adiciona-la na sua lista"
        mensagem.textContent = mensagemErro
    }else{
        
        let mensagemSucesso = "Tarefa adicionada com sucesso!"
        mensagem.textContent = mensagemSucesso

        tarefas.push(tarefa)

        redenrizarTarefas()
    }
    
    

    //limpa o input do usuário
    inputTarefa.value = ""

}

function redenrizarTarefas(){
        const listaTarefas = document.getElementById("listaTarefas")
        listaTarefas.innerHTML = ""
        let i = 0
        for(i; i< tarefas.length; i++)
        {
            let novaTarefa = document.createElement("li")
            novaTarefa.textContent = tarefas[i]
            listaTarefas.appendChild(novaTarefa)
        }

        
}