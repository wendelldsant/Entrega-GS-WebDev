// ################################## EVENT PAGE #######################################
const lista_voluntarios = JSON.parse(localStorage.getItem('voluntarios_users'));
const lista_empresas = JSON.parse(localStorage.getItem('empresas_users'));
const login_check = JSON.parse(localStorage.getItem('login_check'));


function verifyUser(){
lista_voluntarios.forEach(user =>{
    if(login_check.username === user.username){
        console.log(user.profileType)
        document.getElementById('btnCriarNovoEvento').style.display = 'none'  
        return user.profileType;

    }
})
lista_empresas.forEach(user =>{
    if(login_check.username === user.username){
        console.log(user.profileType)
        document.getElementById('btnCriarNovoEvento').style.display = 'block'
        return user.profileType;

    }
})
}

window.onload = verifyUser()

const btn_event = document.getElementById("cadastrarEvento");
const event_name = document.getElementById("nomeEvento");
const user_teste = 'wendell_dsant'
// const descricao = document.getElementById('descricaoEvento');
// const name_event = document.getElementById('nomeEvento');
// const local_event = document.getElementById('localEvento');
// const data_event = document.getElementById('dataEvento');
const create_section = document.getElementById('criarEvento');
const eventosDisponiveis = document.querySelector('#eventosDisponiveis');
const btn_pegaEventos = document.querySelector('#btnEventosDisponiveis');
const btn_new_event = document.querySelector('#btnCriarNovoEvento');
const btn_cadastrar_event = document.querySelector('#cadastrarEvento');
let listaEventos = [];

// #######CRUD

// #########CREATE
function criaEventos(dados){
    const new_event = {
            id: listaEventos.length+1,
            owner: dados.owner,
            name_event: dados.name_event,
            data_event: dados.data_event,
            local_event: dados.local_event,
            content: dados.content
        }
    if(new_event.name_event!='' && new_event.data_event!='' && new_event.local_event!='' &&  new_event.content!=''){
        alert('Evento aceito!')
        listaEventos.push(new_event);
        pegaEventos();
        return true;
    }
    else{
        alert("Preencha todos os campos!")
        return false;
    }

}

// ###########READ

window.onload = pegaEventos();   

function pegaEventos(){
    eventosDisponiveis.innerHTML = ''
    if(listaEventos.length === 0){
        let title = document.createElement('h2');
        eventosDisponiveis.append(title)
        eventosDisponiveis.style.display = 'block'
        title.innerHTML = 'Não há eventos disponíveis'
    }
    else{
        listaEventos.forEach(evento => {
            let new_event = document.createElement('div');
            new_event.id = `evento${evento.id}`;
            new_event.innerHTML = `   
            <div class = "evento">
                <h3>${evento.name_event}</h3>
                <p>Usuário:${evento.owner}</p>
                <p>Data: ${evento.data_event}</p>
                <p>Local:${evento.local_event}</p>
                <p>Descrição:${evento.content}</p>
                <button id = "btnUpdate" onclick = "atualizarEvento(${evento.id})">Editar</button>
                <button id = "btnDelete" onclick = "apagarEvento(${evento.id})">Apagar</button>
            </div>
        `
        eventosDisponiveis.append(new_event);
        })
    } 

    }

// ###########UPDATE
function atualizarEvento(id){
    pegaEventos();
    const evento = listaEventos.find(evento => evento.id === id);
    if (!evento) return;  // se evento for igual a vazio, null, NaN etc, vai fechar a função
    const update_section = document.createElement('div');
    update_section.id = `updateEvent${id}`;
    update_section.innerHTML = `
    <h2>Atualizar Evento</h2>
    <form id="formAtualizarEvento${id}">
        <label for="nomeEventoAtualizado${id}">Nome do Evento:</label>
        <input type="text" id="nomeEventoAtualizado${id}" value="${evento.name_event}" required>
        
        <label for="dataEventoAtualizado${id}">Data:</label>
        <input type="date" id="dataEventoAtualizado${id}" value="${evento.data_event}" required>
        
        <label for="localEventoAtualizado${id}">Local:</label>
        <input type="text" id="localEventoAtualizado${id}" value="${evento.local_event}" required>
        
        <label for="descricaoEventoAtualizado${id}">Descrição:</label>
        <textarea id="descricaoEventoAtualizado${id}" rows="4" required>${evento.content}</textarea>
        
        <button type="button" onclick="salvarAtualizacao(${id})">Salvar</button>
    </form>
    `   
    document.querySelector(`#evento${id}`).append(update_section);
}   

function salvarAtualizacao(id) {
    const evento = listaEventos.find(evento => evento.id === id);
    if (!evento) return;
    evento.name_event = document.getElementById(`nomeEventoAtualizado${id}`).value;
    evento.data_event = document.getElementById(`dataEventoAtualizado${id}`).value;
    evento.local_event = document.getElementById(`localEventoAtualizado${id}`).value;
    evento.content = document.getElementById(`descricaoEventoAtualizado${id}`).value; 
    pegaEventos();
}   

// ###########DELETE

function apagarEvento(id){
    const evento = listaEventos.find(evento => evento.id === id);
    if (!evento) return;
    listaEventos.splice(evento,1);
    pegaEventos();
}

// ################CADASTRAR EVENTO
btn_new_event.addEventListener('click', function(event){
    event.preventDefault();
    eventosDisponiveis.style.display = 'none'
    create_section.innerHTML = ''
    create_form = document.createElement('div')
    create_form.innerHTML= `
        <h2>Criar Novo Evento</h2>
        <form id="formCriarEvento">
            <label for="nomeEvento">Nome do Evento:</label>
            <input class="campo" type="text" id="nomeEvento" name="nomeEvento" input>
            
            <label for="dataEvento">Data:</label>
            <input class="campo" type="date" id="dataEvento" name="dataEvento" input>

            <label for="localEvento">Local:</label>
            <input class="campo" type="text" id="localEvento" name="localEvento" input>
            
            <label for="descricaoEvento">Descrição:</label>
            <textarea class="campo" id="descricaoEvento" name="descricaoEvento" rows="4"></textarea>
            
            <button type="submit" id="cadastrarEvento">Cadastrar Evento</button>
        </form>
    `
    create_section.append(create_form);
    create_section.style.display = 'block'; 

    const descricao = document.getElementById('descricaoEvento');
    const name_event = document.getElementById('nomeEvento');
    const local_event = document.getElementById('localEvento');
    const data_event = document.getElementById('dataEvento');

    document.querySelector('#cadastrarEvento').addEventListener('click', function(event){
        event.preventDefault();
        let novoevento = criaEventos({
            owner: user_teste,
            content: descricao.value,
            name_event: name_event.value,
            data_event: data_event.value,
            local_event: local_event.value
        });
        if(novoevento){
            create_section.innerHTML = ''
            create_form = document.createElement('div')
            create_form.innerHTML= `
                <h2>Criar Novo Evento</h2>
                <form id="formCriarEvento">
                    <label for="nomeEvento">Nome do Evento:</label>
                    <input class="campo" type="text" id="nomeEvento" name="nomeEvento" input>
                    
                    <label for="dataEvento">Data:</label>
                    <input class="campo" type="date" id="dataEvento" name="dataEvento" input>
    
                    <label for="localEvento">Local:</label>
                    <input class="campo" type="text" id="localEvento" name="localEvento" input>
                    
                    <label for="descricaoEvento">Descrição:</label>
                    <textarea class="campo" id="descricaoEvento" name="descricaoEvento" rows="4"></textarea>
                    
                    <button type="submit" id="cadastrarEvento">Cadastrar Evento</button>
                </form>
            `
            create_section.append(create_form);
            create_section.style.display = 'none'
            eventosDisponiveis.style.display = 'block'
        }
    })


})


btn_pegaEventos.addEventListener("click", function(event){
    event.preventDefault();
    create_section.style.display = 'none' 
    eventosDisponiveis.style.display = 'block'
})