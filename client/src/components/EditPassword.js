import React, { Component } from 'react';
import axios from 'axios';
import { setAxiosDefaults } from '../util/SessionHeaderUtil';
import Button from '../styled/ButtonStyle';

class EditPassword extends Component {
    state = {
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
            password: this.state.password,
            password_confirmation: this.state.password_confirmation

        }
        setAxiosDefaults()
        const res = await axios.patch('/auth/password', payload)
        console.log(res.data.data)
        this.setState({ currentUser: res.data.data })
        this.props.updateUser(res.data.data)
        this.props.handleUpdateShow('password')
    }
    handleCancel = (event) => {
        event.preventDefault()
        this.props.handleUpdateShow('password')
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>New Password: </label>
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Confirm New Password: </label>
                        <input type="text" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
                    </div>
                    <Button type="submit">Save</Button>
                </form>
                <Button onClick={this.handleCancel}>Cancel</Button>
            </div>
        );
    }
}

export default EditPassword;