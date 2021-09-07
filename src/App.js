import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from 'components/Navbar';
import TodosList from 'components/TodosList';
import CreateTodos from 'components/CreateTodos';
import EditTodos from 'components/EditTodos';
import DeleteTodos from 'components/DeleteTodos';
import Auth from 'components/Auth';
import Error from './Error';

function App() {

  

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <TodosList />
          </Route>
          <Route path="/create">
            <CreateTodos />
          </Route>
          <Route path="/edit/:id">
            <EditTodos />
          </Route>
          <Route path="/delete/:id">
            <DeleteTodos />
          </Route>
          <Route path="/signin">
            <Auth />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
