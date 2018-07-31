import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import Movie from './components/Movie';
import UserPage from './components/UserPage';
import Nav from './components/Nav';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsersCog, faSignOutAlt, faSignInAlt, faUserPlus, faEdit, faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons'
import { userIsLoggedIn } from './util/SessionHeaderUtil';

library.add(faUsersCog, faSignOutAlt, faSignInAlt, faUserPlus, faEdit, faTimesCircle, faSave)

class App extends Component {
  state = {
    signedIn: ''
  }

  async componentDidMount() {
    const signedIn = await userIsLoggedIn()
    this.setState({signedIn})

  }
  updateSignedIn = (signedIn) => {
    this.setState({ signedIn })
  }
  render() {

    const MainPageComponent = (props) => (
      <MainPage updatedSignedIn={this.state.signedIn} {...props} />
    )

    return (
      <Router>
        <div>
          <Nav updateSignedIn={this.updateSignedIn} />
          <Switch>
            <Route exact path="/" render={MainPageComponent} />
            <Route exact path="/user/:user_id" component={UserPage} />
            <Route exact path="/:movie_id" component={Movie} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
