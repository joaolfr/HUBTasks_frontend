import { combineReducers } from 'redux';

import Auth from './Auth';
import Task from './Task';

export default combineReducers({
    Auth, 
    Task
});