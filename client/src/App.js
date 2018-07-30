import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Movie from './components/Movie';
import UserPage from './components/UserPage';
import Nav from './components/Nav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsersCog, faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faUsersCog, faSignOutAlt, faSignInAlt, faUserPlus )

class App extends Component {
  state = {
    signedIn: ''
  }

  updateSignedIn = (signedIn) => {
    this.setState({signedIn})
  }
  render() {

    return (
      <Router>
        <div>
          <Nav updateSignedIn={this.updateSignedIn}/>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/user/:user_id" component={UserPage} />
            <Route exact path="/:movie_id" component={Movie} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
