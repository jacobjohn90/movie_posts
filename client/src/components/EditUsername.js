import React, { Component } from 'react';
import axios from 'axios';
import { setAxiosDefaults } from '../util/SessionHeaderUtil';

class EditUsername extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        currentUser: {}
    }
    
    async componentDidMount(){
        const currentUser = await this.fetchUser()
        this.setState({currentUser})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.handleUpdateShow('username')
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

    handleChange = (event) => {
        const userInput = event.target.value
        const inputName = event.target.name
        const newState = {...this.state}
        newState[inputName] = userInput
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            username: this.state.username
        }
        setAxiosDefaults()
        const res = await axios.patch('/auth', payload)
        this.setState({currentUser: res.data.data})
        this.props.updateUser(res.data.data)
        this.props.handleUpdateShow('username')

    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>New Username: </label>
                        <input placeholder={this.state.currentUser.username} type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        );
    }
}

export default EditUsername;