import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Movie from './components/Movie';
import UserPage from './components/UserPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/user/:id" component={UserPage} />
            <Route exact path="/:id" component={Movie} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
