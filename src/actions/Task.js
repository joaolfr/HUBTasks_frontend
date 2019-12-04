export function listTasks(id){
    return{
        type: 'ASYNC_TASK_LIST',
        payload:id
    }
}

export function add_task(descricao, data_entrega){
    return{
        type: 'ASYNC_ADD_TASK',
        payload:{
            descricao,
            data_entrega
        }
    }
}

export function edit_task(id, descricao, data_entrega){
    return{
        type: 'ASYNC_EDIT_TASK',
        payload:{
            id,
            descricao,
            data_entrega
        }
    }
}

export function delete_task(id){
    return{
        type: 'ASYNC_DELETE_TASK',
        payload:id
    }
}