import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login/index';
import Home from './pages/Home/index';

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path={['/', '/login']} exact component={Login} />
        <Route path='/home' exact component={Home} />
      </Switch>
    </BrowserRouter>
  )
}