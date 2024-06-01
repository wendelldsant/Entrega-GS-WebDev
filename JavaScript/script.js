// ########################## CONST'S ##########################
const btn_cadastrar = document.getElementById('btn-cadastrar');
const char_number_id = 5;
const special_caracteres = ['*', '&', '%', '$', '#', '@', '!'];
const phone_lenght = 11;
// ########################## ERROR MESSAGES ##########################
const error_msg_username = document.getElementById('error-message-username');
const error_msg_name = document.getElementById('error-message-name');
const error_msg_password = document.getElementById('error-message-password');
const error_msg_password_confirm = document.getElementById('error-message-password-confirm');
const error_msg_regiao = document.getElementById('error-message-regiao');
const error_msg_email = document.getElementById('error-message-email');
const error_msg_celular = document.getElementById('error-message-phone');
const error_msg_gender = document.getElementById('error-message-gender');
const error_msg_birthday = document.getElementById('error-message-birthday');
const error_msg_foto = document.getElementById('error-message-foto');
// ############################# ID'S ##############################
const name_id = document.getElementById('name');
const username_id = document.getElementById('username');
const senha_id = document.getElementById('password');
const senha_confirm_id = document.getElementById('password-confirm');
const email_id = document.getElementById('email');
const celular_id = document.getElementById('phone');
const regiao_id = document.getElementById('regiao');
const gender_id = document.getElementById('gender');
const birthday_id = document.getElementById('birthday');
const foto_id = document.getElementById('profile-pic');
// ############################ DECLARAÇÃO FUNÇÕES ############################
function confirmDados(error_msg_id, InputId){
    error_msg_id.innerHTML = '';
    error_msg_id.setAttribute('style', 'color: green; font-size: 12px');
    InputId.setAttribute('style', 'border-color: green; border-width: 2px')
}

function verificaElementos(function_contem_or_not, InputId, error_msg_id, error_msg_text){
    if(function_contem_or_not){
        error_msg_id.innerHTML = '';
        error_msg_id.innerHTML = error_msg_text;
        error_msg_id.setAttribute('style', 'color: red; font-size: 12px');
        InputId.setAttribute('style', 'border-color: red; border-width: 2px');
        return true;
    }
    return false;
}

function containsNumber(inputValue) {
    let has_Number = false;
    inputValue.split('').forEach(char => {
        if (!isNaN(char) && char !== ' ') {
            has_Number = true;
        }
    });
    return has_Number;
}

function passwordRequirements(inputValue){
    let has_Number = false;
    let has_Maiuscula = false;
    let has_SpecialChar = false;
    senha = inputValue.value;
    senha.split('').forEach(char => {
        if (!isNaN(char)) {
            has_Number = true;
        }
        if(isNaN(char)){
            let char_maiusc = char.toUpperCase();
            if(char_maiusc === char){
                has_Maiuscula = true;
            }
        }
        if(caracteresEspeciais(senha_id)){
            has_SpecialChar = true;
        }
    });
    if(has_Number && has_Maiuscula && has_SpecialChar){
        confirmDados(error_msg_password, senha_id);
        return true;
    }
    else{
        verificaElementos(true, senha_id, error_msg_password, 'Sua senha deve ter: letra maiúscula, caracteres especiais e números');
        return false;           
    }
}

function caracteresEspeciais(inputValue) {
    let has_SpecialChar = false;
    senha = inputValue.value;
    senha.split('').forEach(function(char) {
        if (special_caracteres.includes(char)) {
            has_SpecialChar = true;
        }
    });
    return has_SpecialChar;
}

function verificaUsername(){
    let username = username_id.value;
    if(verificaElementos(username === '', username_id, error_msg_username, 'Preencha esse campo.')){
        return false;
    }
    else if(verificaElementos(username.includes(' '), username_id, error_msg_username, 'O ID de usuário não pode conter espaços')){
        return false;
    }
    else if(verificaElementos(username.length<char_number_id, username_id, error_msg_username, `O ID de usuário deve ter no mínimo ${char_number_id} caracteres`)){
        return false;
    }
    else{
        confirmDados(error_msg_username, username_id);
        return true;
    }
}

function verificaName(){
    let name = name_id.value;
    if(verificaElementos(name ==='', name_id, error_msg_name, 'Preencha esse campo.')){
        return false;
    }
    else if(containsNumber(name)){
        verificaElementos(true, name_id, error_msg_name, 'Não pode conter números.')
        return false;
    }
    else{
        confirmDados(error_msg_name, name_id);
        return true;
    }
    
}

function verificaSenha(){
    let senha_check = passwordRequirements(senha_id);
    let senha = senha_id.value;
    let confirm_senha = senha_confirm_id.value;
    if (senha_check){
       if(verificaElementos(senha != confirm_senha, senha_confirm_id, error_msg_password_confirm, 'As senhas não coincidem')){
            return false;
       } 
       else{
            confirmDados(error_msg_password_confirm, senha_confirm_id)        
            return true;
       }
    }

}

function verificaOpcoes(InputId, error_msg_id){
    let value = InputId.value;
    if(verificaElementos(value ==='', InputId, error_msg_id ,'Escolha uma das opções acima.')){
        return false;
    }
    else{
        confirmDados(error_msg_id, InputId);
        return true;       
    }
}

function verificaEmail(){
    let email = email_id.value;
    if(verificaElementos(email === '', email_id, error_msg_email, 'Preencha esse campo.')){
        return false;
    }
    else if(
        (verificaElementos(email.includes(' '), email_id, error_msg_email, 'O email não é válido')) || 
        (verificaElementos(!email.includes('@'), email_id, error_msg_email, 'O email não é válido')) || 
        (verificaElementos(!email.includes('.com'), email_id, error_msg_email, 'O email não é válido'))
    ){
        return false;
    }
    else{
        confirmDados(error_msg_email, email_id);
        return true;
    }

}

function verificaCelular(){
    let celular = celular_id.value;
    if(verificaElementos(celular === '', celular_id, error_msg_celular, 'Preencha esse campo.')){
        return false;
    }
    else if(verificaElementos(celular.length!=phone_lenght, celular_id, error_msg_celular, 'Número inválido')){
        return false;
    }
    else{
        confirmDados(error_msg_celular, celular_id);
        return true;
    }
}

function verificaBirthday(){
    let birthday = birthday_id.value;
    if(verificaElementos(birthday === '', birthday_id, error_msg_birthday, 'Preencha esse campo.')){
        return false;
    }
    else{
        confirmDados(error_msg_birthday, birthday_id);
        return true;
    }
}
function verificaFoto(){
    let foto = foto_id.value;
    if(verificaElementos(foto === '', foto_id, error_msg_foto, 'Preencha esse campo.')){
        return false;
    }
    else{
        confirmDados(error_msg_foto, foto_id);
        return true;
    }
}
// ############################ VALIDAÇÃO ############################

let lista_voluntarios = []
let lista_empresas = []
const btn_voluntario_register = document.getElementById('btn-volunteer');
const btn_empresa_register = document.getElementById('btn-empresa');
const register_form = document.getElementById('registration-form')
var profileType = ''
btn_voluntario_register.addEventListener('click', function(event){
    event.preventDefault();
    register_form.style.display = 'block';
    btn_voluntario_register.style.display = 'none';
    btn_empresa_register.style.display = 'none';
    btn_cadastrar.style.display = 'block';
    let title = document.querySelector('h1');
    title.innerHTML = 'Cadastro de Voluntário'; 
    profileType = 'voluntario'  
});

btn_empresa_register.addEventListener('click', function(event){
    event.preventDefault();
    register_form.style.display = 'block';
    btn_empresa_register.style.display = 'none';
    btn_voluntario_register.style.display = 'none';
    btn_cadastrar.style.display = 'block';
    let title = document.querySelector('h1');
    title.innerHTML = 'Cadastro de Empresa';
    document.querySelector('#campo5').style.display = 'none';
    document.querySelector('#campo9').style.display = 'none';
    document.querySelector('#campo10').style.display = 'none';
    profileType = 'empresario'  
});

btn_cadastrar.addEventListener('click', function(event){
    event.preventDefault();
    if(profileType === 'voluntario'){
    profile_username = verificaUsername();
    profile_name = verificaName();
    profile_senha = verificaSenha();
    profile_regiao = verificaOpcoes(regiao_id, error_msg_regiao);
    profile_gender = verificaOpcoes(gender_id, error_msg_gender);    
    profile_email = verificaEmail();
    profile_celular = verificaCelular();
    profile_birthday = verificaBirthday();
    profile_foto = verificaFoto();
    if(profile_username && profile_name && profile_senha &&
        profile_regiao && profile_gender && profile_email &&
        profile_celular && profile_foto
    ){
        const new_user = {
            username: username_id.value,
            name: name_id.value,
            senha: senha_id.value,
            regiao: regiao_id.value,
            gender: gender_id.value,
            email: email_id.value,
            celular: celular_id.value,
            birthday: birthday_id.value,
            foto: foto_id.value,
        }
        lista_voluntarios.unshift(new_user);
        };

    }
    else{
        profile_username = verificaUsername();
        profile_name = verificaName();
        profile_senha = verificaSenha();
        profile_regiao = verificaOpcoes(regiao_id, error_msg_regiao);   
        profile_email = verificaEmail();
        profile_foto = verificaFoto();
        if(profile_username && profile_name && profile_senha &&
            profile_regiao && profile_email && profile_foto
        ){
            const new_user = {
                username: username_id.value,
                name: name_id.value,
                senha: senha_id.value,
                regiao: regiao_id.value,
                email: email_id.value,
                foto: foto_id.value,
            }
            lista_empresas.unshift(new_user);  // testar com o push
            };
    }
}
 )


// ################################## EVENT PAGE #######################################

const btn_event = document.getElementById("cadastrarEvento");
const event_name = document.getElementById("nomeEvento");
const user_teste = 'wendell_dsant'
const descricao = document.getElementById('descricaoEvento');
const name_event = document.getElementById('nomeEvento');
const local_event = document.getElementById('localEvento');
const data_event = document.getElementById('dataEvento');
const create_section = document.getElementById('criarEvento');


 let listaEventos = []

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
    }

}

// ###########READ

window.onload = pegaEventos();   
const btn_pegaEventos = document.querySelector('#btnEventosDisponiveis');
function pegaEventos(){
    const eventosDisponiveis = document.querySelector('#eventosDisponiveis');
    eventosDisponiveis.innerHTML = ''
    eventosDisponiveis.innerHTML = `
    <button type="submit" id="btnEventosDisponiveis">Eventos Disponíveis</button>
    <button type="submit" id="btnCriarEvento">Criar Novo Evento</button>    
    `
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
                <button onclick = "atualizarEvento(${evento.id})">Editar</button>
                <button onclick = "apagarEvento(${evento.id})">Apagar</button>
            </div>
        `
        eventosDisponiveis.append(new_event);
        }
    
    )
    const btn_new_event = document.getElementById("btnCriarEvento");
    btn_new_event.addEventListener('click', function(event){
    event.preventDefault();
    create_section.style.display = 'block'    
    // document.getElementsByClassName("evento").style.display = 'none'
})
}

// ###########UPDATE
function atualizarEvento(id){
    const evento = listaEventos.find(evento => evento.id === id);
    if (!evento) return;  // se evento for igual a vazio, null, NaN etc, vai fechar a função
    const update_section = document.createElement('section');
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

function criar_novo_evento(){
btn_event.addEventListener('click', function(event){
    event.preventDefault();
    let eventosDisponiveis = document.getElementById("eventosDisponiveis")
    eventosDisponiveis.style.display = 'none'
    let novoevento = criaEventos({
        owner: user_teste,
        content: descricao.value,
        name_event: name_event.value,
        data_event: data_event.value,
        local_event: local_event.value
    });
    if(novoevento){
        create_section.style.display = 'none'        
    }
})
}
btn_pegaEventos.addEventListener("click", function(event){
    event.preventDefault();
    let eventosDisponiveis = document.getElementById("eventosDisponiveis")
    create_section.style.display = 'none'   
    eventosDisponiveis.style.display = 'block'
})



