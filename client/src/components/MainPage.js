import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Movies from './Movies';
import { userIsLoggedIn, clearAuthTokens } from '../util/SessionHeaderUtil';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchCurrentUserEmail, fetchUsers } from '../util/FetchCurrentUser';

class MainPage extends Component {
    state = {
        signedIn: false,
        currentUserEmail: '',
        currentUserId: ''
    }

    async componentDidMount() {
        const signedIn = userIsLoggedIn()
        if (signedIn) {
            const currentUserEmail = await fetchCurrentUserEmail()
            this.setState({ currentUserEmail })
            this.fetchCurrentUserId()
        }
        this.setState({ signedIn })
    }

    updateSignedIn = () => {
        this.setState({ signedIn: true })
    }

    signOut = async (event) => {
        event.preventDefault()
        try {
            await axios.delete('/auth/sign_out')
            clearAuthTokens()
            this.setState({ signedIn: false })
        } catch (error) {
            console.error(error)
        }
    }

    fetchCurrentUserId = async()=> {
        const users = await fetchUsers()
        const currentUser = users.find((user)=> user.email === this.state.currentUserEmail)
        this.setState({currentUserId: currentUser.id})
    }

    render() {
        const userId = this.state.currentUserId
        return (
            <div>
                {this.state.signedIn
                    ?
                    <div>
                        <Link to={`/user/${userId}`}>
                            <button>User Profile</button>
                        </Link>
                        <button onClick={this.signOut}>Sign Out</button>
                    </div>
                    :
                    <div>
                        <SignUp updateSignedIn={this.updateSignedIn} />
                        <SignIn updateSignedIn={this.updateSignedIn} fetchCurrentUserEmail={this.fetchCurrentUserEmail} fetchCurrentUserId={this.fetchCurrentUserId} />
                    </div>
                }
                <Movies currentUserId={this.state.currentUserId} />
            </div>
        );
    }
}

export default MainPage;