import './App.css';
import React, { useContext, createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from 'components/Navbar';
import TodosList from 'components/TodosList';
import CreateTodos from 'components/CreateTodos';
import EditTodos from 'components/EditTodos';
import DeleteTodos from 'components/DeleteTodos';
import Auth from 'components/Auth';
import Error from './Error';

function App() {
  
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    return (
    <Router>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Switch>
          <Route exact path="/">
            <TodosList user={user} setUser={setUser} />
          </Route>
          <Route path="/create">
            <CreateTodos user={user}/>
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
