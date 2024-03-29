import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/index';
import Login from './pages/Login/index';
import NewSpot from './pages/NewSpot/index';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={NewSpot} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;