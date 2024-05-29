const btn_cadastrar = document.getElementById('btn_cadastrar');
const error_msg_username = document.getElementById('error-message-username');
const error_msg_name = document.getElementById('error-message-name');
const error_msg_password = document.getElementById('error-message-password');
const error_msg_password_confirm = document.getElementById('error-message-password-confirm');
const error_msg_regiao = document.getElementById('error-message-regiao');
const error_msg_email = document.getElementById('error-message-email');
const error_msg_celular = document.getElementById('error-message-phone');
const name_id = document.getElementById('name');
const username_id = document.getElementById('username');
const senha_id = document.getElementById('password');
const senha_confirm_id = document.getElementById('password-confirm');
const email_id = document.getElementById('email');
const celular_id = document.getElementById('phone');
const regiao = document.getElementById('regiao');
const char_number_id = 5;

function verificaElementos(function_contem_or_not, InputId, error_msg_id, error_msg_text){
    let has_Space = false;
    if(function_contem_or_not){
        error_msg_id.innerHTML = error_msg_text;
        error_msg_id.setAttribute('style', 'color: red; font-size: 12px');
        InputId.setAttribute('style', 'border-color: red; border-width: 2px');
        has_Space = true;
    }
    else{
        error_msg_id.innerHTML = '';
        InputId.setAttribute('style', 'border-color: green; border-width: 2px');        
    }
    return has_Space;
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

function verificaUsername(){
    let username = username_id.value;
    if(verificaElementos(username.includes(' '), username_id, error_msg_username, 'O ID de usuário não pode conter espaços')){
        return false;
    }
    else if(username.length<char_number_id){
        error_msg_username.innerHTML = `O ID de usuário deve ter no mínimo ${char_number_id} caracteres e não pode conter espaços` ;
        error_msg_username.setAttribute('style', 'color: red; font-size: 12px');
        username_id.setAttribute('style', 'border-color: red; border-width: 2px');
        return false;
    }
    else{
        error_msg_username.innerHTML = '';
        username_id.setAttribute('style', 'border-color: green; border-width: 2px');
        return true;
    }
}

function verificaName(){
    let name = name_id.value;
    if(name ===''){
        error_msg_name.innerHTML = 'Preencha esse campo' ;
        error_msg_name.setAttribute('style', 'color: red; font-size: 12px');
        name_id.setAttribute('style', 'border-color: red; border-width: 2px');
    }
    else if(containsNumber(name)){
        error_msg_name.innerHTML = 'Não pode conter números' ;
        error_msg_name.setAttribute('style', 'color: red; font-size: 12px');
        name_id.setAttribute('style', 'border-color: red; border-width: 2px');
        return false;
    }
    else{
        error_msg_name.innerHTML = '';
        name_id.setAttribute('style', 'border-color: green; border-width: 2px');
        return true;
    }
    
}

let special_caracteres = ['*', '&', '%', '$', '#', '@', '!'];
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
        error_msg_password.innerHTML = ''
        senha_id.setAttribute('style', 'border-color: green; border-width: 2px');
        return true;
    }
else{
        error_msg_password.innerHTML = ''
        error_msg_password.innerHTML = 'Sua senha deve ter: letra maiúscula, caracteres especiais e números' ;
        error_msg_password.setAttribute('style', 'color: red; font-size: 12px');
        senha_id.setAttribute('style', 'border-color: red; border-width: 2px'); 
        return false;           
    }
}


function verificaSenha(){
    error_msg_password.innerHTML = ''
    error_msg_password_confirm.innerHTML = ''
    let senha_check = passwordRequirements(senha_id);
    let senha = document.getElementById('password').value;
    let confirm_senha = document.getElementById('password-confirm').value;
    if (senha_check){
       if(senha == confirm_senha){
            error_msg_password_confirm.innerHTML = '';
            // console.log('senha aceita')
            senha_confirm_id.setAttribute('style', 'border-color: green; border-width: 2px');
            return true;
       } 
       else{
            error_msg_password_confirm.innerHTML = ''
            error_msg_password_confirm.innerHTML = 'Suas senhas não coincidem' ;
            error_msg_password_confirm.setAttribute('style', 'color: red; font-size: 12px');
            senha_confirm_id.setAttribute('style', 'border-color: red; border-width: 2px'); 
            return false;
       }
    }

}

function verificaRegiao(){
    let regiao_id = document.getElementById('regiao').value;
    console.log(regiao_id)
    if(regiao_id == ''){
        error_msg_regiao.innerHTML = ''
        error_msg_regiao.innerHTML = 'Escolha uma das opções' ;
        error_msg_regiao.setAttribute('style', 'color: red; font-size: 12px');
        regiao.setAttribute('style', 'border-color: red; border-width: 2px'); 
        return true;        
    }
    else{
        error_msg_regiao.innerHTML = ''
        regiao.setAttribute('style', 'border-color: green; border-width: 2px'); 
        return false;       
    }
}

function verificaEmail(){
    let email = email_id.value;
    if(verificaElementos(email.includes(''), email_id, error_msg_email, 'Preencha esse campo.')){
        return false;
    }
    else if(verificaElementos(email.includes(' '), email_id, error_msg_email, 'O email não pode conter espaços'))  {
        return false;
    }
    else if(!verificaElementos(!email.includes('@'), email_id, error_msg_email, 'O email não é válido')){
        return false;
    }
    else if(!verificaElementos(!email.includes('.com'), email_id, error_msg_email, 'O email não é válido')){
        return false;
    }
    else{
        return true;
    }

}

function verificaCelular(){
    let celular = celular_id.value;
    let numbers = [0,1,2,3,4,5,6,7,8,9]
    if(verificaElementos(celular.includes(''), celular_id, error_msg_celular, 'Preencha esse campo.')){
        return false;
    }
    else if(verificaElementos(celular.includes(' '), celular_id, error_msg_celular, 'O campo não pode conter espaços.')){
        return false;
    }
    else if(!containsNumber(celular)){
        return false;
    }
    else{
        return true;
    }
}

btn_cadastrar.addEventListener('click', function(event){
    event.preventDefault();
    console.log(verificaUsername());
    console.log(verificaName());
    console.log(verificaSenha());
    console.log(verificaRegiao());
    console.log(verificaEmail());
    console.log(verificaCelular());
})
