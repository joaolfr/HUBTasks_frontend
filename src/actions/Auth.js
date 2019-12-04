export function log_in(email, password){
    console.log(email, password);
    
    return{
        type:'ASYNC_LOG_IN',
        payload: {
            email,
            password
        }
        
    }
}

export function log_out(){
    return{
        type:'LOG_OUT',
        
    }
}

export function new_user(nome, email, senha){
    return{
        type: 'ASYNC_NEW_USER',
        payload:{
            nome,
            email,
            senha
        }
    }
}