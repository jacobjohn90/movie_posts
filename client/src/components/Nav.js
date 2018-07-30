import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { fetchUsers, fetchCurrentUserEmail } from '../util/FetchCurrentUser';
import { clearAuthTokens, userIsLoggedIn } from '../util/SessionHeaderUtil';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SignUp from './SignUp';
import SignIn from './SignIn';
import { Button, FontAwesomeStyling, NavWrapper} from '../styled/NavWrapper';

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
        this.props.updateSignedIn(signedIn)
    }

    updateSignedIn = () => {
        this.setState({ signedIn: true })
        this.props.updateSignedIn(true)
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

            <NavWrapper>
                <Link to='/'>Comment Reels</Link>
                {this.state.signedIn
                    ?
                    <div>
                        <Link to={`/user/${userId}`}>
                            <Button>
                                <FontAwesomeStyling>
                                    <p>User Page</p>
                                   <FontAwesomeIcon icon="users-cog" />
                                </FontAwesomeStyling>
                            </Button>
                        </Link>
                        <Button onClick={this.signOut}>
                            <FontAwesomeStyling>
                                <p>Sign Out</p>
                                <FontAwesomeIcon icon="sign-out-alt" />
                            </FontAwesomeStyling>
                        </Button>
                    </div>
                    :
                    <div>
                        <SignUp updateSignedIn={this.updateSignedIn} />
                        <SignIn updateSignedIn={this.updateSignedIn} fetchCurrentUserEmail={this.fetchCurrentUserEmail} fetchCurrentUserId={this.fetchCurrentUserId} />
                    </div>
                }
            </NavWrapper>
        );
    }
}

export default withRouter(Nav);