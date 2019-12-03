import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tasks from '../pages/Task';

export default function Routes(){
    return(
        <Switch>
            <Route path="/" initial exact component={Tasks}></Route>
            
        </Switch>
    )
}