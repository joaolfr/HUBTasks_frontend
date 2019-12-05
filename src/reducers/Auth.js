const INITAL_STATE = {
    isLogged:false,
    message: "",
    user: "",
    id: "",
    loader:false
}

export default function Auth(state= INITAL_STATE, action){
    
    switch(action.type){
        case 'LOG_IN':
           return{ ...state, isLogged: true, id: action.payload._id, user:action.payload.nome, loader:false}
        case 'LOADER':
            return { ...state, loader:true}
        case 'ERRO_LOGIN':
            return{ ...state, message: action.payload}
        case 'CLEAR_MESSAGE':
            return { ...state, message: ""}
        case 'LOG_OUT':
            return{ ...state, isLogged: false}
        default:
            return state;
    }
}