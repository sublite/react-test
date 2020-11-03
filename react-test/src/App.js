import React from "react";
import Users from './components/Users';
import Albums from './components/Albums';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App() {
    return (
      <Router>
          <Switch>
            <Route exact path="/">
              <Users />
            </Route>
            <Route path="/albums">
              <Albums />
            </Route>
          </Switch> 
      </Router>
    );
  }