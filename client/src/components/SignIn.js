import React, { Component } from 'react';
import axios from 'axios';
import { saveAuthTokens } from '../util/SessionHeaderUtil';

class SignIn extends Component {
    
    state = {
        email: '',
        password: ''
    }

    onChange = (event) => {
        const newState = {...this.state}
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }
    
    signIn = async(event) => {
        event.preventDefault()
        try{
            const res = await axios.post('auth/sign_in', this.state)
            saveAuthTokens(res.headers)
            this.props.updateSignedIn()
        } catch (error){
            console.error(error)
        }
    }
    
    
    
    render() {
        return (
            <div>
                <form onSubmit={this.signIn}>
                    <div>
                        <label htmlFor="email">E-mail: </label>
                        <input onChange={this.onChange} type="text" name="email" value={this.state.email} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input onChange={this.onChange} type="text" name="password" value={this.state.password} />
                    </div>

                    <button type="submit">Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;