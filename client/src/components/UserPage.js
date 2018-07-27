import React, { Component } from 'react';
import axios from 'axios';
import { setAxiosDefaults, userIsLoggedIn } from '../util/SessionHeaderUtil';

class UserPage extends Component {

    state = {
        user: {},
        comments: [],
        signedIn: 'false'
    }

    async componentDidMount() {
        const user = await this.fetchUser()
        const signedIn = userIsLoggedIn()
        const comments = await this.fetchUserComments()
        this.setState({user, signedIn, comments})
    }

    fetchUser = async () => {
        const userId = this.props.match.params.user_id
        try {
            setAxiosDefaults()
            const res = await axios.get(`/api/users/${userId}`)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }
    fetchUserComments = async () => {
        const userId = this.props.match.params.user_id
        try {
            setAxiosDefaults()
            const res = await axios.get(`/api/users/${userId}/comments`)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        const user = this.state.user
        
        return (
            <div>
                <h1>{user.username}'s Info</h1>
                <h4>Username: {user.username}</h4>
                <h4>Email: {user.email}</h4>
                <button>Edit Email</button>
                <button>Edit Password</button>
                <h1>My Comments</h1>
            </div>
        );
    }
}

export default UserPage;