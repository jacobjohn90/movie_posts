import React, { Component } from 'react';
import axios from 'axios';
import { saveAuthTokens } from '../util/SessionHeaderUtil';
import { SignUpWrapper } from '../styled/SignUpWrapper';
import Button from '../styled/ButtonStyle';

class SignUp extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
        image: ''
    }

    onChange = (event) => {
        const newState = { ...this.state }
        newState[event.target.name] = event.target.value
        this.setState(newState)
    }
    signUp = async (event) => {
        event.preventDefault()
        const image = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
        this.setState({image})
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
            <SignUpWrapper>
                <div className='animated fadeInLeft'>


                    <h3>Sign Up</h3>
                    <form onSubmit={this.signUp}>
                        <div>
                            <label htmlFor="email">E-mail: </label>
                            <input onChange={this.onChange} type="text" name="email" value={this.state.email} />
                        </div>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input onChange={this.onChange} type="text" name="username" value={this.state.username} />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input onChange={this.onChange} type="password" name="password" value={this.state.password} />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation">Confirm Password: </label>
                            <input onChange={this.onChange} type="password" name="password_confirmation" value={this.state.password_confirmation} />
                        </div>
                        <Button type="submit">Sign Up</Button>
                        <Button onClick={this.props.updateShowSignUp}>Cancel</Button>
                    </form>
                </div>
            </SignUpWrapper>

        );
    }
}

export default SignUp;