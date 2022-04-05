import React from 'react';
import Login from './pages/Login'; 
import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch> 
  );
}
