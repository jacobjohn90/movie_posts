import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchUsers, fetchCurrentUserEmail } from '../util/FetchCurrentUser';
import { clearAuthTokens, userIsLoggedIn } from '../util/SessionHeaderUtil';
import axios from 'axios';

import SignUp from './SignUp';
import SignIn from './SignIn';

class Nav extends Component {
    state = {
        signedIn: false,
        currentUserEmail: '',
        currentUserId: '',
    }

    async componentDidMount() {
        const signedIn = userIsLoggedIn()
        if (signedIn) {
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
            this.props.updateSignedIn(false)
            if (this.props.location.pathname.includes("user")) {
                this.props.history.push('/')
            }

        } catch (error) {
            console.error(error)
        }
    }

    fetchCurrentUserId = async () => {
        const currentUserEmail = await fetchCurrentUserEmail()
        this.setState({ currentUserEmail })
        const users = await fetchUsers()
        const currentUser = users.find((user) => user.email === this.state.currentUserEmail)
        this.setState({ currentUserId: currentUser.id })
    }

    render() {
        const userId = this.state.currentUserId
        return (

            <div>
                <h1>Comment Reels</h1>
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
            </div>
        );
    }
}

export default withRouter(Nav);