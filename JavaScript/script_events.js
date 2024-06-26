// ################################## EVENT PAGE #######################################
const lista_voluntarios = JSON.parse(localStorage.getItem('voluntarios_users'));
const lista_empresas = JSON.parse(localStorage.getItem('empresas_users'));
const login_check = JSON.parse(localStorage.getItem('login_check'));
let userType = '';

// Função para verificar qual usuário está logado, principal o tipo de usuário
function verifyUser(){
    if (lista_voluntarios) {
        lista_voluntarios.forEach(user => {
            if (login_check.username === user.username) {
                userType = user.profileType;
                document.getElementById('btnCriarNovoEvento').style.display = 'none'; //ocultação do botão Criar Evento. Perfil de voluntário
                document.querySelector('#eventosDisponiveis').style.display = 'block'; //mostra os eventos cadastrados
                return user.profileType;
            }
        });
    }
    if (lista_empresas) {
        lista_empresas.forEach(user => {
            if (login_check.username === user.username) {
                // console.log(user.profileType);
                userType = user.profileType;
                document.getElementById('escolha').innerHTML = `
                <button type="submit" id="btnEventosDisponiveis">Eventos Disponíveis</button>
                <button type="submit" id="btnCriarNovoEvento">Criar Novo Evento</button>  
                `;
                document.querySelector('#eventosDisponiveis').style.display = 'block';
                document.querySelector('#btnEventosDisponiveis').addEventListener("click", mostrarEventosDisponiveis); // Reatribuir os event listeners após a criação dos botões
                document.querySelector('#btnCriarNovoEvento').addEventListener('click', mostrarCriarEvento);
                return user.profileType;
            }
        });
    }
   // posiveis situações para o login_check = item do localStorage responsável por mostrar se o usuario logou ou não 
    if(login_check===false || login_check===null){ 
        alert('Faça seu login para ver os Eventos Disponíveis')
        document.getElementById('escolha').style.display = 'none'
    }
}
//funções realizadas ao carregar a página
window.onload = function(event) {
    event.preventDefault();
    verifyUser();
    pegaEventos();
}

const create_section = document.getElementById('criarEvento');
const eventosDisponiveis = document.querySelector('#eventosDisponiveis');
//pega os eventos do localStorage
let listaEventos = JSON.parse(localStorage.getItem('eventos')) || [];

// Salvar eventos no localStorage
function salvarEventos() {
    localStorage.setItem('eventos', JSON.stringify(listaEventos));
}

// #########CREATE EVENTS
function criaEventos(dados){
    const new_event = {
        id: listaEventos.length + 1,
        owner: dados.owner,
        name_event: dados.name_event,
        data_event: dados.data_event,
        local_event: dados.local_event,
        content: dados.content
    }
    if (new_event.name_event != '' && new_event.data_event != '' && new_event.local_event != '' && new_event.content != '') {
        alert('Evento aceito!');
        listaEventos.push(new_event);
        salvarEventos();
        pegaEventos();
        return true;
    } else {
        alert("Preencha todos os campos!");
        return false;
    }
}

// ###########READ EVENTS
function pegaEventos(){
    eventosDisponiveis.innerHTML = '';
    if (listaEventos.length === 0) {
        let title = document.createElement('h2');
        eventosDisponiveis.append(title);
        eventosDisponiveis.style.display = 'block';
        title.innerHTML = 'Não há eventos disponíveis';
    } else {
        listaEventos.forEach(evento => {
            let new_event = document.createElement('div');
            new_event.id = `evento${evento.id}`;
            new_event.innerHTML = `   
            <div class="evento">
                <h3>${evento.name_event}</h3>
                <p>Usuário: ${evento.owner}</p>
                <p>Data: ${evento.data_event}</p>
                <p>Local: ${evento.local_event}</p>
                <p>Descrição: ${evento.content}</p>
                ${userType === 'empresa' ? `
                <button id="btnUpdate" onclick="atualizarEvento(${evento.id})">Editar</button>
                <button id="btnDelete" onclick="apagarEvento(${evento.id})">Apagar</button>` : `
                <button id="btnInscrever" onclick="inscreverEvento(${evento.id})">Quero me inscrever</button>`}
            </div>
            `;
            eventosDisponiveis.append(new_event);
        });
    } 
}

// ###########UPDATE EVENTS
function atualizarEvento(id){
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
    `;
    document.querySelector(`#evento${id}`).append(update_section);
}   

function salvarAtualizacao(id) {
    const evento = listaEventos.find(evento => evento.id === id);
    if (!evento) return;
    evento.name_event = document.getElementById(`nomeEventoAtualizado${id}`).value;
    evento.data_event = document.getElementById(`dataEventoAtualizado${id}`).value;
    evento.local_event = document.getElementById(`localEventoAtualizado${id}`).value;
    evento.content = document.getElementById(`descricaoEventoAtualizado${id}`).value;
    salvarEventos();
    pegaEventos();
}

// ###########DELETE EVENTS
function apagarEvento(id){
    listaEventos = listaEventos.filter(evento => evento.id !== id);
    salvarEventos();
    pegaEventos();
}

// ###########INSCRIÇÃO EVENTS == PARA USUÁRIOS VOLUNTÁRIOS
function inscreverEvento(id){
    alert("Inscrição realizada!");
}

// ################CADASTRAR EVENTO
function mostrarCriarEvento(event){
    event.preventDefault();
    eventosDisponiveis.style.display = 'none';
    create_section.innerHTML = '';
    let create_form = document.createElement('div');
    create_form.innerHTML = `
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
    `;
    create_section.append(create_form);
    create_section.style.display = 'block';

    const descricao = document.getElementById('descricaoEvento');
    const name_event = document.getElementById('nomeEvento');
    const local_event = document.getElementById('localEvento');
    const data_event = document.getElementById('dataEvento');

    document.querySelector('#cadastrarEvento').addEventListener('click', function(event){
        event.preventDefault();
        let novoevento = criaEventos({  //cria eventos retorna True se todos os campos forem preenchidos
            owner: login_check.username,
            content: descricao.value,
            name_event: name_event.value,
            data_event: data_event.value,
            local_event: local_event.value
        });
        if (novoevento) {
            create_section.innerHTML = '';
            create_section.style.display = 'none';
            eventosDisponiveis.style.display = 'block';
        }
    });
}

//funcao para mostrar os eventos disponiveis, para ambos tipos de usuários
function mostrarEventosDisponiveis(event) {
    event.preventDefault();
    create_section.style.display = 'none';
    eventosDisponiveis.style.display = 'block';
}
