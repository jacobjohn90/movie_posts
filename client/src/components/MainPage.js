import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Movies from './Movies';

class MainPage extends Component {
    state = {
        signedIn: false
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