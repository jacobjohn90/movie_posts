import React, { Component } from 'react';
import axios from 'axios';
import { saveAuthTokens } from '../util/SessionHeaderUtil';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        password_confirmation: ''
    }

    onChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }
    signUp = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post('/auth', this.state)
            saveAuthTokens(res.headers)
            this.props.updateSignedIn()

        } catch (error) {
            console.error(error)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.signUp}>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input onChange={this.onChange} type="text" name="email" value={this.state.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.onChange} type="text" name="password" value={this.state.password} />
                    </div>
                    <div>
                        <label htmlFor="password_confirmation">Confirm Password: </label>
                        <input onChange={this.onChange} type="text" name="password_confirmation" value={this.state.password_confirmation} />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUp;