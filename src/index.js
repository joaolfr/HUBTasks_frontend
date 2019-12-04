import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'; //permite a passagem de informação entre vários niveis
import store from './store';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));


