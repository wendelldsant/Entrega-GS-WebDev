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
        if (isNaN(char)){
            let char_maiusc = char.toUpperCase();
            if (char_maiusc === char && char.toLowerCase() !== char) { // Verificação corrigida
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
    else if(verificaElementos(username.length < char_number_id, username_id, error_msg_username, `O ID de usuário deve ter no mínimo ${char_number_id} caracteres`)){
        return false;
    }
    else if(verificaUsernameExistente(username)){
        return false;
    }
    else{
        confirmDados(error_msg_username, username_id);
        return true;
    }
}

function verificaUsernameExistente(username){
    if(lista_voluntarios.some(user => user.username === username)){
        verificaElementos(true, username_id, error_msg_username, 'Este ID de usuário já está em uso');
        return true;
    }
    else if(lista_empresas.some(user => user.username === username)){
        verificaElementos(true, username_id, error_msg_username, 'Este ID de usuário já está em uso');
        return true;
    }
    else {
        return false;
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

function verificaLoginVoluntarios(){
    return lista_voluntarios.some(voluntario => voluntario.username === username_id.value);
}
function verificaLoginEmpresas(){
    return lista_empresas.some(empresa => empresa.username === username_id.value);
}
function verificarSenhaxLogin(){
    for (let voluntario of lista_voluntarios) {
        if (voluntario.username === username_id.value) {
            return voluntario.senha;
        }
    }
    for (let empresa of lista_empresas) {
        if (empresa.username === username_id.value) {
            return empresa.senha;
        }
    }
    return ''; 
}
// ############################ VALIDAÇÃO ############################
var login_check = JSON.parse(localStorage.getItem('login_check'));
localStorage.setItem('login_check', JSON.stringify(login_check));
let lista_voluntarios = [];
let lista_empresas = [];

// Carregar dados do localStorage
if (localStorage.getItem('voluntarios_users')) {
    lista_voluntarios = JSON.parse(localStorage.getItem('voluntarios_users'));
}
if (localStorage.getItem('empresas_users')) {
    lista_empresas = JSON.parse(localStorage.getItem('empresas_users'));
}

const register_form = document.getElementById('registration-form');
const btnlogin_in = document.getElementById('btn-login');
const btncadastrar_se = document.getElementById('btnCadastreSe');

btnlogin_in.addEventListener('click', function(event){
    event.preventDefault();
    register_form.style.display = 'block';
    let lista_block = [campo2,campo3,campo4,campo5,campo6,campo8,campo9,campo10];
    lista_block.forEach(campo =>{
        campo.style.display = 'none';
    })
    btncadastrar_se.style.display = 'none'
    document.getElementById("buttons").innerHTML = ''
    document.getElementById("buttons").innerHTML = `
    <div class="button-container">
        <button type="submit" id="btn-entrar">Entrar</button>
    </div>
    `
    document.getElementById("btn-entrar").addEventListener('click', function(event){
    error_msg_password.innerHTML = ''
    error_msg_username.innerHTML = ''
    event.preventDefault(); 
    let verificarCadastro_Volunt = verificaLoginVoluntarios();
    let verificarCadastro_Empresas = verificaLoginEmpresas();
    if(verificarCadastro_Volunt!='' || verificarCadastro_Empresas!=''){
        confirmDados(error_msg_username, username_id);
        let senhaXuser = verificarSenhaxLogin()
        if(senhaXuser!=''){
            if(senhaXuser===senha_id.value){
                let container = document.querySelector('.container')
                container.innerHTML = ''
                container.innerHTML = `
                <div class="container">
                <h3>Login realizado!</h3>
                    <div class="button-container">
                        <button type="submit"><a href="index.html" style = "text-decoration: none; color: #ffffff">Página Inicial - Sobre nós</button>
                    </div>
                `
                let user_online = {
                    username: username_id.value,
                    senha: senha_id.value,
                }
                login_check = user_online;
                localStorage.setItem('login_check', JSON.stringify(login_check));
            }
            else{
                verificaElementos(true,senha_id, error_msg_password, 'Senha inválida.')
            }
        }
    }
    else{
        verificaElementos(true, username_id, error_msg_username, 'Usuário inexistente')
    }
})   

})

btncadastrar_se.addEventListener('click', function(event){
    event.preventDefault();
    register_form.style.display = 'none';
    divBtns = document.getElementById("buttons")
    divBtns.innerHTML = `
    <div class="button-container" id = "btn-volunteer">
        <button type="submit" id="btn-volunteer">Eu quero ajudar!</button>
        <div class="descricao-opcoes" id="descricao-volunteer">Seja um voluntário ativo em nossa plataforma.</div>
    </div>
    <div class="button-container" id = "btn-empresa">
        <button type="submit" id="btn-empresa">Eu preciso de ajuda!</button>
        <div class="descricao-opcoes" id="descricao-empresa">Seja uma organização parceira em nossa plataforma.</div>
    </div
    `
    const btn_voluntario_register = document.getElementById('btn-volunteer');
    const btn_empresa_register = document.getElementById('btn-empresa');
    const btnSubmitCadastro = document.getElementById("btn-cadastrar");

    btn_voluntario_register.addEventListener('click', function(event){
        event.preventDefault();
        register_form.style.display = 'block';
        btn_voluntario_register.style.display = 'none';
        btn_empresa_register.style.display = 'none';
        btnSubmitCadastro.style.display = 'block';
        let title = document.querySelector('h3');
        title.innerHTML = 'Cadastro de Voluntário'; 
        profileType = 'voluntario'  
    });

    btn_empresa_register.addEventListener('click', function(event){
        event.preventDefault();
        register_form.style.display = 'block';
        btn_empresa_register.style.display = 'none';
        btn_voluntario_register.style.display = 'none';
        btnSubmitCadastro.style.display = 'block';
        let title = document.querySelector('h3');
        title.innerHTML = 'Cadastro de Empresa';
        document.querySelector('#campo9').style.display = 'none';
        document.querySelector('#campo10').style.display = 'none';
        profileType = 'empresa'  
    });
})


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
            profileType: 'voluntario'
        }
        lista_voluntarios.push(new_user);
        let container = document.querySelector('.container')
        container.innerHTML = ''
        container.innerHTML = `
        <div class="container">
        <h3>Cadastro realizado!</h3>
            <div class="button-container">
                <button type="submit"><a href="index.html" style = "text-decoration: none; color: #ffffff">Página Inicial - Sobre nós</button>
            </div>
            <div class="button-container">
                <button type="submit"><a href="events.html" style = "text-decoration: none; color: #ffffff">Eventos Disponíveis!</a></button>
            </div>
        </div>
        `
        let user_online = {
            username: username_id.value,
            senha: senha_id.value
        }
        login_check = user_online;
        localStorage.setItem('login_check', JSON.stringify(login_check));
        localStorage.setItem('voluntarios_users', JSON.stringify(lista_voluntarios));
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
                celular: celular_id.value,
                foto: foto_id.value,
                profileType: 'empresa'
            }
            lista_empresas.push(new_user);
            let container = document.querySelector('.container')
            container.innerHTML = ''
            container.innerHTML = `
            <div class="container">
            <h3>Cadastro realizado!</h3>
                <div class="button-container">
                    <button type="submit"><a href="index.html" style = "text-decoration: none; color: #ffffff">Página Inicial - Sobre nós</button>
                </div>
                <div class="button-container">
                    <button type="submit"><a href="events.html" style = "text-decoration: none; color: #ffffff">Crie Eventos!</a></button>
                </div>
            </div>
            `
            let user_online = {
                username: username_id.value,
                senha: senha_id.value,
            }
            login_check = user_online;
            localStorage.setItem('login_check', JSON.stringify(login_check));
            localStorage.setItem('empresas_users', JSON.stringify(lista_empresas));
            };
    }
}
 )


