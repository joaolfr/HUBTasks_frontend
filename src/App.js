import React, { Component} from 'react';
import { BrowserRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//file imports
import './App.css';
import Routes from "./routes";
import Login from '../src/pages/Login'
import * as AuthActions from './actions/Auth';
import Nav from './components/Nav';


class App extends Component{
  render(){
    return (
     
      <div className="App">
        
        {this.props.isLogged? (
          
          <BrowserRouter>
            <Nav />
            <Routes />
          </BrowserRouter>
        ):(
          <Login />
        )}
        
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isLogged: state.Auth.isLogged,  
});

const  mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

