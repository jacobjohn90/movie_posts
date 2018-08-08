import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setAxiosDefaults, userIsLoggedIn } from '../util/SessionHeaderUtil';
import swal from 'sweetalert';

import EditUsername from './EditUsername';
import EditEmail from './EditEmail';
import EditPassword from './EditPassword';
import { UserInfoStyle, UserTextStyle, UserPageWrapper, EditUserStyle, UserCommentStyle } from '../styled/UserPageWrapper';
import Button from '../styled/ButtonStyle';

class UserPage extends Component {

    state = {
        user: {},
        comments: [],
        movies: [],
        signedIn: false,
        showEdit: {
            username: false,
            email: false,
            password: false
        }
    }

    async componentDidMount() {
        const user = await this.fetchUser()
        const signedIn = userIsLoggedIn()
        const comments = await this.fetchUserComments()
        const movies = await this.fetchMovies()
        this.setState({ user, signedIn, comments, movies })
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
    fetchMovies = async () => {
        try {
            const res = await axios.get('/api/movies')
            return res.data
        } catch (error) {
            console.error(error);
        }
    }
    handleUpdateShow = (input) => {
        if ((input === 'email' || input === 'password') && this.state.user.email === "test@tester.com") {
            swal({
                icon: "error",
                text: "This is the test user, thus changing the email/password is not permitted"
            })
        } else {
            const showEdit = { ...this.state.showEdit }
            showEdit[input] = !showEdit[input]
            this.setState({ showEdit })
        }
    }
    updateUser = (user) => {
        this.setState({ user })
    }

    render() {
        const user = this.state.user
        const commentList = this.state.comments.map((comment) => {
            const movie = this.state.movies.find((movie) => movie.id === comment.movie_id)
            return (
                <UserCommentStyle key={comment.id}>
                    <li>"{comment.content}", which was written in <Link to={`/${movie.id}`}>{movie.title}</Link></li>
                </UserCommentStyle>
            )
        })
        return (
            <UserPageWrapper>
                <h1>{user.username}'s Info</h1>
                <UserInfoStyle>
                    <img src={user.image} alt={`${user.username}`} />
                    <UserTextStyle>
                        {this.state.showEdit.username
                            ?
                            <EditUsername handleUpdateShow={this.handleUpdateShow} updateUser={this.updateUser} {...this.props} />
                            :
                            <EditUserStyle>
                                <p>Username: {user.username}</p>
                                <Button onClick={() => this.handleUpdateShow('username')}>Edit Username</Button>
                            </EditUserStyle>
                        }
                        {this.state.showEdit.email
                            ?
                            <EditEmail handleUpdateShow={this.handleUpdateShow} updateUser={this.updateUser} {...this.props} />
                            :
                            <EditUserStyle>
                                <p>Email: {user.email}</p>
                                <Button onClick={() => this.handleUpdateShow('email')}>Edit Email</Button>
                            </EditUserStyle>
                        }
                        {this.state.showEdit.password
                            ?
                            <EditPassword handleUpdateShow={this.handleUpdateShow} updateUser={this.updateUser} {...this.props} />
                            :
                            <EditUserStyle>
                                <Button onClick={() => this.handleUpdateShow('password')}>Edit Password</Button>
                            </EditUserStyle>
                        }
                    </UserTextStyle>
                </UserInfoStyle>

                <h1>My Comments</h1>
                <ul>
                    {commentList}
                </ul>
            </UserPageWrapper>
        );
    }
}

export default UserPage;