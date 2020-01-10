import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cliente from './pages/cliente';
import ClienteForm from './pages/clienteForm';
import Login from './pages/Login';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/clientes' component={Cliente} />
            <Route exact path='/clientes/new' component={ClienteForm} />
            <Route exact path='/clientes/:id/edit' component={ClienteForm} />
        </Switch>
    </BrowserRouter >
)

export default Routes;
