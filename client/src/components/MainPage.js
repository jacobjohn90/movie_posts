import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Movies from './Movies';
import { userIsLoggedIn, setAxiosDefaults } from '../util/SessionHeaderUtil';

class MainPage extends Component {
    state = {
        signedIn: false
    }

    async componentDidMount(){
        const signedIn = userIsLoggedIn()
        if (signedIn) {
            setAxiosDefaults()
        }
        this.setState({signedIn})
    }

    updateSignedIn = () => {
        this.setState({signedIn: true})
    }

    render() {
        return (
            <div>
                <SignUp updateSignedIn={this.updateSignedIn} />
                <SignIn updateSignedIn={this.updateSignedIn} />
                <Movies />
            </div>
        );
    }
}

export default MainPage;