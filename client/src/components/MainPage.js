import React, { Component } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Movies from './Movies';
import { userIsLoggedIn, setAxiosDefaults, clearAuthTokens } from '../util/SessionHeaderUtil';
import Axios from '../../node_modules/axios';

class MainPage extends Component {
    state = {
        signedIn: false,
        currentUserEmail: '',
        currentUserId: ''
    }

    componentDidMount() {
        const signedIn = userIsLoggedIn()
        if (signedIn) {
            this.fetchCurrentUserEmail()
            this.fetchCurrentUserId()
        }
        this.setState({ signedIn })
    }

    updateSignedIn = () => {
        this.setState({ signedIn: true })
    }

    fetchCurrentUserEmail = ()=> {
        const currentUserEmail = localStorage.getItem("uid")
        console.log('running fetching current email')
        this.setState({currentUserEmail}); 
    }
    
    fetchCurrentUserId = async() => {
        setAxiosDefaults()
        const allUsers = await Axios.get('/api/users')
        console.log(allUsers.data)
        const currentUser = await allUsers.data.find((user) => user.email === this.state.currentUserEmail)
        this.setState({currentUserId: currentUser.id})
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
        const userId = this.state.currentUserId
        return (
            <div>
                {this.state.signedIn
                    ?
                    <div>
                        <a href={`/user/${userId}`}>
                            <button>User Profile</button>
                        </a>
                        <button onClick={this.signOut}>Sign Out</button>
                    </div>
                    :
                    <div>
                        <SignUp updateSignedIn={this.updateSignedIn} />
                        <SignIn updateSignedIn={this.updateSignedIn} fetchCurrentUserEmail={this.fetchCurrentUserEmail} fetchCurrentUserId={this.fetchCurrentUserId}/>
                    </div>
                }
                <Movies />
            </div>
        );
    }
}

export default MainPage;