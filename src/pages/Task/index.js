import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';


import * as TaskActions from '../../actions/Task';
import './styles.css';

class Task extends Component {

  state={
    modal_edit: false,
    modal_delete: false,
    modal_add: false,
    descricao:"",
    data_entrega: "",
    task_id:""
  }

  //FUNÇÕES DE MANIPULAÇÃO DAS TASKS
  addTask(){
    const { descricao, data_entrega } = this.state;

    this.setState({
      modal_add: false
    })

    this.props.add_task(descricao, data_entrega);

  }
  editTask(){

    const { descricao, data_entrega, task_id } = this.state;

    this.setState({
      modal_edit:false
    });

    console.log(this.state);
    
    this.props.edit_task(task_id, descricao, data_entrega);

  }

  deleteTask(){
    this.setState({
      modal_delete:false
    })   

    this.props.delete_task(this.state.task_id);
  }


  //FUNÇÕES MANIPULADORAS DAS MODAIS DE EDITAR, DELETAR E CRIAR TASKS
  handleClose(){
    this.setState({
      modal_edit:false,
      modal_delete: false,
      modal_add: false,
    })
  }

  openAddModal(){
    this.setState({
      modal_add: true
    })
  }

  openEditModal(task){
    this.setState({
      modal_edit:true,
      descricao: task.descricao,
      data_entrega:task.data_entrega.slice(0,10),
      task_id:task._id
    })
  }

  openDeleteModal(id){
    this.setState({
      modal_delete:true,
      task_id:id
    })
  }


  //ALTERAÇÃO DOS ESTADOS DAS VARIÁVEIS
  alteraDescricao(descricao){
    this.setState({
      descricao
    })
  }
  alteraData(data){
    console.log(data);
    this.setState({
      data_entrega:data
    })
    
  }


//RENDERIZA A LISTA DE TASKS DO USUÁRIO
renderTasks(){
  return this.props.tasks.map(task => {
    return(
      <div id="card_task" key={task._id}>
        <div>{task.descricao}</div>
        <div>{task.data_entrega.slice(0,10)}</div>
        <EditIcon id="editIcon" onClick={() => this.openEditModal(task)}/>
        <DeleteIcon id="deleteIcon" onClick={() => this.openDeleteModal(task._id)} />
      

      </div>
    )
  })
}

  render() {
    return(
        <div className="container_tasks">
          <div id="div_add" onClick={() => this.openAddModal()}>
            <AddIcon style={{color:"#FFF"}} />
            <span>Nova Task</span>
          </div>
          {this.renderTasks()}

          {/* EDIT MODAL */}
          <Modal
            className="edit_modal"
            open={this.state.modal_add}
            onClose={() => this.handleClose()}
          >
            <div id="div_modal"  >
              <h2 >Add</h2>
              <TextField 
                placeholder="Descrição"
                value={this.state.descricao}
                onChange={e => this.alteraDescricao(e.target.value)}
              />
              <TextField
                id="date"
                label="Deadline"
                type="date"
                value={this.state.data_entrega}
                onChange={date => this.alteraData(date.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <button onClick={() => this.addTask()}>Salvar</button>
              <button onClick={() => this.handleClose()}>Cancelar</button>

            </div>
          </Modal>

          {/* EDIT MODAL */}
          <Modal
            className="edit_modal"
            open={this.state.modal_edit}
            onClose={() => this.handleClose()}
          >
            <div id="div_modal"  >
              <h2 >Edit</h2>
              <TextField 
                placeholder="Descrição"
                value={this.state.descricao}
                onChange={e => this.alteraDescricao(e.target.value)}
              />
              <TextField
                id="date"
                label="Deadline"
                type="date"
                value={this.state.data_entrega}
                onChange={date => this.alteraData(date.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <button onClick={() => this.editTask()}>Salvar</button>
              <button onClick={() => this.handleClose()}>Cancelar</button>

            </div>
          </Modal>

          {/* DELETE MODAL */}
          <Modal
            className="edit_modal"
            open={this.state.modal_delete}
            onClose={() => this.handleClose()}
          >
            <div id="div_modal"  >
              <p>Você tem certeza que deseja deletar a task?</p>
              
              <button onClick={() => this.deleteTask()}>Deletar</button>
              <button onClick={() => this.handleClose()}>Cancelar</button>
            </div>
          </Modal>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  tasks: state.Task.tasks,
});

const  mapDispatchToProps = dispatch =>
  bindActionCreators(TaskActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Task);