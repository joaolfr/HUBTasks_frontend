import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from '../../actions/Auth';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './styles.css';

class Nav extends Component {
  render() {
    return(
        <div className="container_navbar">
            <div id="logo">
              <p>HUB<span>tasks</span></p>
            </div>
            <div id="menu">
               
            Bem vindo ao HUBtasks  <strong style={{margin: "0 0 0 7px"}}> {this.props.user}</strong>, aqui você gerencia suas tarefas de maneira rápida e fácil!

            </div>
            <div id="btnLogout" onClick={() => this.props.log_out()}>
              <ExitToAppIcon fontSize="large" id="logout-icon" />
            </div>
        </div>
    );
  }
}


const mapStateToProps = state => ({
  isLogged: state.Auth.isLogged,  
  user: state.Auth.user
});

const  mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
