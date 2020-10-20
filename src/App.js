import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './containers/Home'
import Dashboard from './containers/Dashboard'
import Store from './containers/Store'
import StoreEdit from './containers/StoreEdit'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/stores/:storeId" exact>
            <Store />
          </Route>
          <Route path="/stores/edit/:storeId">
            <StoreEdit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
