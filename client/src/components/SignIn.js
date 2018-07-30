import React, { Component } from 'react';
import axios from 'axios';
import { saveAuthTokens } from '../util/SessionHeaderUtil';
import { SignInWrapper } from '../styled/SignInWrapper';
import { Button } from '../styled/NavWrapper';

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    onChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }

    signIn = async (event) => {
        event.preventDefault()
        try {
            const res = await axios.post('/auth/sign_in', this.state)
            saveAuthTokens(res.headers)
            this.props.updateSignedIn()
            this.props.fetchCurrentUserId()
            this.props.updateShowSignIn()
        } catch (error) {
            console.error(error)
        }
    }



    render() {
        return (
            <SignInWrapper>

                <div className='animated fadeInRight'>
                    <h3>Sign In</h3>
                    <form onSubmit={this.signIn}>
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <input onChange={this.onChange} type="text" name="email" value={this.state.email} />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input onChange={this.onChange} type="text" name="password" value={this.state.password} />
                        </div>

                        <Button type="submit">Sign In</Button>
                        <Button onClick={this.props.updateShowSignIn}>Cancel</Button>
                    </form>
                </div>

            </SignInWrapper>
        );
    }
}

export default SignIn;