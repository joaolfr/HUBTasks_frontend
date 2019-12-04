import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import * as AuthActions from '../../actions/Auth';
import './styles.css';

class Login extends Component {

  state={
    name:"",
    email: "",
    password: "",
    modal:false
  }

  

  logIn(){
    this.props.log_in(this.state.email, this.state.password);
    if(this.props.message !== ""){
      this.notify();

    }
  }

  cadastrar(){
    const { name, email, password } = this.state;
    this.props.new_user(name, email, password);
  }

  ////////////// MANIPULANDO TOAST //////////////
  notify = () => {
    toast(`${this.props.message}`, {
      className:"toast",
      progressClassName:"toast_progress",
      bodyClassName: "body_toast",

    });
   
  }

  renderToast(){
    if(this.props.message !== ""){
      this.notify();

    }
  }
//////////////// MANIPULANDO A MODAL /////////////////////
  openModal(){
    this.setState({
      modal:true
    })
  }

  handleClose(){
    this.setState({
      modal:false
    })
  }

  //////////////// ALTERAÇÃO DE VARIÁVEIS ///////////////
  alteraName(name){
    this.setState({
      name
    })
  }
  alteraEmail(email){
    this.setState({
      email
    })
  }
  alteraPassword(password){
    this.setState({
      password
    })
  }

  render() {
    return(
      <div className="container_screen">
        <div className="container_login">
          {this.renderToast()}
            <p>HUB<span>tasks</span></p>
            <div className="container_inputs">
              
              <TextField 
                id="input" 
                value={this.state.email}
                label="Login" 
                onChange={email => this.setState({email:email.target.value})}
                onKeyPress={e => {
                  if(e.key === 'Enter'){
                    this.logIn();
                  }
                }}
              />
              <TextField 
                id="input" 
                value={this.state.password}
                onChange={password => this.setState({password:password.target.value})}
                label="Password" 
                onKeyPress={e => {
                  if(e.key === 'Enter'){
                    this.logIn();
                  }
                }}
              />

              <button onClick={() => this.logIn()}>Sign IN</button>
              <p id="cadastrar">New user? <span id="signUp" onClick={() => this.openModal()}>SIGN UP!</span></p>
              <ToastContainer autoClose={3000} />

              {/* CRIAÇÃO DE USUÁRIO */}
              <Modal
                className="edit_modal"
                open={this.state.modal}
                onClose={() => this.handleClose()}
              >
                <div id="div_modal"  >
                  <h2 >New User</h2>
                  <TextField 
                    placeholder="Name"
                    value={this.state.name}
                    onChange={e => this.alteraName(e.target.value)}
                  />
                  <TextField
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.alteraEmail(e.target.value)}
                    
                  />
                  <TextField
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={e => this.alteraPassword(e.target.value)}
                    
                  />
                  <button onClick={() => this.cadastrar()}>Salvar</button>
                  <button onClick={() => this.handleClose()}>Cancelar</button>

                </div>
              </Modal>
            </div>
            
        </div>
      </div>
        
    );
  }
}


const mapStateToProps = state => ({
  isLogged: state.Auth.isLogged,  
  message: state.Auth.message
});

const  mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
