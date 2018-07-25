import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Movies from './Movies';
import { userIsLoggedIn, setAxiosDefaults, clearAuthTokens } from '../util/SessionHeaderUtil';
import Axios from '../../node_modules/axios';

class MainPage extends Component {
    state = {
        signedIn: false,
        currentUserId: ''
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

    updateCurrentUserId = (currentUserId) => {
        this.setState({currentUserId})
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
                    <div>
                        <button onClick={this.signOut}>Sign Out</button>
                    </div>
                    :
                    <div>
                        <SignUp updateSignedIn={this.updateSignedIn} />
                        <SignIn updateSignedIn={this.updateSignedIn} updateCurrentUserId={this.updateCurrentUserId} />
                    </div>
                }
                <Movies />
            </div>
        );
    }
}

export default MainPage;