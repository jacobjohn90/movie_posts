import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Movies from './Movies';
import { userIsLoggedIn, setAxiosDefaults, clearAuthTokens } from '../util/SessionHeaderUtil';
import Axios from '../../node_modules/axios';

class MainPage extends Component {
    state = {
        signedIn: false
    }

    componentDidMount() {
        const signedIn = userIsLoggedIn()
        if (signedIn) {
            setAxiosDefaults()
        }
        this.setState({ signedIn })
    }

    updateSignedIn = () => {
        this.setState({ signedIn: true })
    }

    signOut = async (event) => {
        event.preventDefault()
        try {
            await Axios.delete('/auth/sign_out')
            clearAuthTokens()
            this.setState({ signedIn: false })
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div>
                {this.state.signedIn
                    ?
                    <button onClick={this.signOut}>Sign Out</button>
                    :
                    <div>
                        <SignUp updateSignedIn={this.updateSignedIn} />
                        <SignIn updateSignedIn={this.updateSignedIn} />
                    </div>
                }
                <Movies />
            </div>
        );
    }
}

export default MainPage;