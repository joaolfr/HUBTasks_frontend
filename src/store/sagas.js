import { takeLatest, put, call, select } from 'redux-saga/effects'; 
import axios from 'axios';

import { getUserId } from './selectors';

// const base_url = 'http://localhost:3001'
const base_url = process.env.REACT_APP_HUBTEC_API;


/////////// CONJUNTO DE FUNÇÕES RELACIONADOS AO USUÁRIO /////////

function getUser(user){
    
    return axios({
        method: 'POST',
        url:`${base_url}/authenticate`,
        data:{
            email:user.email,
            password: user.password
        }
    })
}

function* asyncLogIn(action){

    try{
        const response = yield call(getUser, action.payload);        

        yield put({ type: 'LOG_IN', payload: response.data});

        
        //PRÉ CARREGA A LISTA DE TASKS DO USUÁRIO
        const task = yield call(getTasks, response.data._id);
        console.log(task.data);
        
        yield put({type: 'TASK_LIST', payload: task.data});
        
    } catch(e){
        const message = e.response.data.error;
        yield put({type:'ERRO_LOGIN', payload: message});
        //LIMPA A MENSAGEM DO TOAST
        yield put({type:'CLEAR_MESSAGE'});
    }
    
    
}

///CRIAÇÃO DE NOVO USUÁRIO
function newUser(data){
    return axios({
        method:'POST',
        url:`${base_url}/users`,
        data:{
            nome: data.nome,
            email: data.email,
            password: data.senha

        }
    })
}

function* asyncNewUser(action){

    try{
        const response = yield call(newUser, action.payload);
        yield put({ type: 'LOG_IN', payload: response.data});

        
        //PRÉ CARREGA A LISTA DE TASKS DO USUÁRIO
        const task = yield call(getTasks, response.data._id);
        console.log(task.data);
        
        yield put({type: 'TASK_LIST', payload: task.data});

    }catch(e){
        console.log(e.data);
        
    }
}

//////////////// AÇÕES RELACIONADAS AS TASKS ///////////////

//CONSULTA TODAS AS TASKS DE UM USUÁRIO ESPECÍFICO
function getTasks(id){
    return axios({
        method:'GET',
        url:`${base_url}/tasks`,
        headers:{
            user_id:id
        }
    })
}

//TASK ADD 

function addTask(task, user_id){
    return axios({
        method:'POST',
        url:`${base_url}/task`,
        headers:{
            user_id
        },
        data:{
            descricao:task.descricao,
            data_entrega:task.data_entrega
        }
    })
}

function* asyncAddTask(action){

    try{
        const user_id = yield select(getUserId);

        const response = yield call(addTask, action.payload, user_id);
        console.log(response);
        
        yield put({ type:'ADD_SUCESS', payload:"Task criada com sucesso!"});

        
        const task = yield call(getTasks, user_id );
        
        yield put({type: 'TASK_LIST', payload: task.data});
    }catch(e){
        console.log(e.response);
        
    }
}

//TASK EDIT
function editTask(task){
    return axios({
        method:'PUT',
        url:`${base_url}/update/${task.id}`,
        data:{
            descricao:task.descricao,
            data_entrega: task.data_entrega
        }
    })
}

function* asyncTaskEdit(action){
    console.log(action);
    
    try{
        const response = yield call(editTask, action.payload);
        console.log(response);
        
        yield put({ type:'EDIT_SUCESS', payload:"Task editada com sucesso!"});
        
        const user_id = yield select(getUserId);
        
        const task = yield call(getTasks, user_id );
        
        yield put({type: 'TASK_LIST', payload: task.data});
        
    }catch(e){
        console.log(e.response);
        
    }
}

//TASK DELETE
function deleteTask(id){
    return axios({
        method:'PUT',
        url:`${base_url}/delete/${id}`
    })
}
function* asyncDeleteTask(action){
    
    try{
        
        yield call(deleteTask, action.payload);
        
        yield put({ type:'DELETE_SUCESS'})

        const user_id = yield select(getUserId);
        
        const task = yield call(getTasks, user_id );
        yield put({type: 'TASK_LIST', payload: task.data});

    }catch(e){
        console.log(e.data);
        
    }
}

export default function* root(){ 
//////uma alterantiva seria o uso do FORK para combinar diversas sagas em diferentes arquivos, para melhor organização //////    
    yield takeLatest('ASYNC_LOG_IN', asyncLogIn)
    yield takeLatest('ASYNC_NEW_USER', asyncNewUser)

    yield takeLatest('ASYNC_EDIT_TASK', asyncTaskEdit)
    yield takeLatest('ASYNC_DELETE_TASK', asyncDeleteTask)
    yield takeLatest('ASYNC_ADD_TASK', asyncAddTask)
    
}
