const INITIAL_STATE = {
    tasks: [],
    id: "",
    message:""
}

export default function Task(state=INITIAL_STATE, action){

    switch(action.type){
        case 'TASK_LIST':
            return{ ...state, tasks: action.payload}
        case 'EDIT_SUCESS':
            return{ ...state, message:action.payload}
        case 'DELETE_SUCESS':
            return{ ...state, message:"Task deletada com sucesso!"}
        default:
            return state;
    }
}