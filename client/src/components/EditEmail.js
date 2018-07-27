import React, { Component } from 'react';
import { setAxiosDefaults, updateUID } from '../util/SessionHeaderUtil';
import axios from 'axios';

class EditEmail extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        currentUser: {}
    }

    async componentDidMount() {
        const currentUser = await this.fetchUser()
        this.setState({ currentUser })
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
        const newState = { ...this.state }
        newState[inputName] = userInput
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {
            email: this.state.email
        }
        setAxiosDefaults()
        const res = await axios.patch('/auth', payload)
        updateUID(res.data.data.email)
        console.log(res.data.data)
        this.setState({ currentUser: res.data.data })
        this.props.updateUser(res.data.data)
        this.props.handleUpdateShow('email')
    }
    handleCancel = (event) => {
        event.preventDefault()
        this.props.handleUpdateShow('email')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>New Email: </label>
                        <input placeholder={this.state.currentUser.email} type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <button type="submit">Save</button>
                </form>
                <button onClick={this.handleCancel}>Cancel</button>
            </div>
        );
    }
}

export default EditEmail;