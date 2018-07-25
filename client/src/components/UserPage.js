import React, { Component } from 'react';
import axios from 'axios'
import { setAxiosDefaults } from '../util/SessionHeaderUtil';

class UserPage extends Component {

    state = {
        user: {}
    }

    async componentDidMount() {
        const user = await this.fetchUser()
        this.setState({user})
    }

    fetchUser = async () => {
        const userId = this.props.match.params.id
        try {
            setAxiosDefaults()
            const res = await axios.get(`/api/users/${userId}`)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div>
                <h1>User Page</h1>
            </div>
        );
    }
}

export default UserPage;